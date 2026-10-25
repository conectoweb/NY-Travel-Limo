import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const sessionLifetimeMs = 20 * 60 * 1000;

type AuthorizeNetEnvironment = "sandbox" | "production";
type AuthorizeNetResponse = Record<string, unknown>;

function getConfiguration() {
  const loginId = process.env.AUTHORIZE_NET_API_LOGIN_ID?.trim();
  const transactionKey = process.env.AUTHORIZE_NET_TRANSACTION_KEY?.trim();
  const sessionSecret = process.env.AUTHORIZE_NET_SESSION_SECRET?.trim();
  const environment = process.env.AUTHORIZE_NET_ENVIRONMENT?.trim();
  const siteUrl = process.env.AUTHORIZE_NET_SITE_URL?.trim();
  let validSiteUrl: URL | null = null;
  try {
    validSiteUrl = siteUrl ? new URL(siteUrl) : null;
  } catch {
    return null;
  }

  if (
    !loginId ||
    !transactionKey ||
    !sessionSecret ||
    sessionSecret.length < 32 ||
    (environment !== "sandbox" && environment !== "production") ||
    !validSiteUrl ||
    validSiteUrl.protocol !== "https:" ||
    validSiteUrl.username ||
    validSiteUrl.password ||
    validSiteUrl.search ||
    validSiteUrl.hash ||
    (validSiteUrl.pathname !== "" && validSiteUrl.pathname !== "/")
  ) {
    return null;
  }

  const apiUrl = environment === "production"
    ? "https://api.authorize.net/xml/v1/request.api"
    : "https://apitest.authorize.net/xml/v1/request.api";
  const hostedBaseUrl = environment === "production"
    ? "https://accept.authorize.net"
    : "https://test.authorize.net";

  return {
    loginId,
    transactionKey,
    sessionSecret,
    environment: environment as AuthorizeNetEnvironment,
    siteUrl: validSiteUrl.origin,
    apiUrl,
    hostedBaseUrl,
  };
}

export function isAuthorizeNetConfigured(): boolean {
  return getConfiguration() !== null;
}

async function callAuthorizeNet(body: Record<string, unknown>): Promise<AuthorizeNetResponse> {
  const configuration = getConfiguration();
  if (!configuration) throw new Error("Authorize.Net is not configured.");
  const [requestName, requestData] = Object.entries(body)[0] ?? [];
  if (!requestName || !requestData || typeof requestData !== "object") {
    throw new Error("Authorize.Net request is invalid.");
  }

  const response = await fetch(configuration.apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      [requestName]: {
        ...(requestData as Record<string, unknown>),
        merchantAuthentication: {
          name: configuration.loginId,
          transactionKey: configuration.transactionKey,
        },
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Authorize.Net returned HTTP ${response.status}.`);
  const result: unknown = await response.json();
  if (result === null || typeof result !== "object") {
    throw new Error("Authorize.Net returned an invalid response.");
  }
  return result as AuthorizeNetResponse;
}

function messagesAreSuccessful(response: AuthorizeNetResponse): boolean {
  const messages = response.messages;
  return messages !== null &&
    typeof messages === "object" &&
    "resultCode" in messages &&
    messages.resultCode === "Ok";
}

function createPaymentSession(customerProfileId: string, email: string): string {
  const configuration = getConfiguration();
  if (!configuration) throw new Error("Authorize.Net is not configured.");

  const payload = Buffer.from(JSON.stringify({
    customerProfileId,
    email: email.toLowerCase(),
    expiresAt: Date.now() + sessionLifetimeMs,
  })).toString("base64url");
  const signature = createHmac("sha256", configuration.sessionSecret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

function readPaymentSession(session: string, email: string): string | null {
  const configuration = getConfiguration();
  if (!configuration) return null;

  const [payload, signature, extra] = session.split(".");
  if (!payload || !signature || extra !== undefined) return null;
  const expected = createHmac("sha256", configuration.sessionSecret)
    .update(payload)
    .digest();
  let actual: Buffer;
  try {
    actual = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  try {
    const claims: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      claims === null ||
      typeof claims !== "object" ||
      !("customerProfileId" in claims) ||
      !("email" in claims) ||
      !("expiresAt" in claims) ||
      typeof claims.customerProfileId !== "string" ||
      !/^\d{1,20}$/.test(claims.customerProfileId) ||
      typeof claims.email !== "string" ||
      claims.email.toLowerCase() !== email.toLowerCase() ||
      typeof claims.expiresAt !== "number" ||
      claims.expiresAt <= Date.now()
    ) {
      return null;
    }
    return claims.customerProfileId;
  } catch {
    return null;
  }
}

export async function createHostedPaymentProfile(
  name: string,
  email: string,
): Promise<{ token: string; action: string; session: string }> {
  const configuration = getConfiguration();
  if (!configuration) throw new Error("Authorize.Net is not configured.");

  const profileResponse = await callAuthorizeNet({
    createCustomerProfileRequest: {
      profile: {
        merchantCustomerId: randomUUID().replaceAll("-", "").slice(0, 20),
        description: `NY Travel Limo reservation for ${name.slice(0, 80)}`,
        email,
      },
      validationMode: configuration.environment === "production" ? "liveMode" : "testMode",
    },
  });
  if (!messagesAreSuccessful(profileResponse)) {
    throw new Error("Authorize.Net could not create a customer profile.");
  }
  const profileId = profileResponse.customerProfileId;
  if (typeof profileId !== "string" && typeof profileId !== "number") {
    throw new Error("Authorize.Net did not return a customer profile ID.");
  }
  const customerProfileId = String(profileId);
  if (!/^\d{1,20}$/.test(customerProfileId)) {
    throw new Error("Authorize.Net returned an invalid customer profile ID.");
  }

  const hostedPageResponse = await callAuthorizeNet({
    getHostedProfilePageRequest: {
      customerProfileId,
      hostedProfileSettings: {
        setting: [
          {
            settingName: "hostedProfilePageBorderVisible",
            settingValue: "false",
          },
          {
            settingName: "hostedProfileIFrameCommunicatorUrl",
            settingValue: `${configuration.siteUrl}/authorize-net-communicator.html`,
          },
          {
            settingName: "hostedProfileSaveButtonText",
            settingValue: "Save payment",
          },
        ],
      },
    },
  });
  if (!messagesAreSuccessful(hostedPageResponse) || typeof hostedPageResponse.token !== "string") {
    throw new Error("Authorize.Net could not create a hosted payment form.");
  }

  return {
    token: hostedPageResponse.token,
    action: `${configuration.hostedBaseUrl}/customer/addPayment`,
    session: createPaymentSession(customerProfileId, email),
  };
}

export async function verifyHostedPaymentProfile(
  session: string,
  email: string,
): Promise<{ customerProfileId: string; paymentProfileId: string } | null> {
  const customerProfileId = readPaymentSession(session, email);
  if (!customerProfileId) return null;

  const response = await callAuthorizeNet({
    getCustomerProfileRequest: {
      customerProfileId,
      unmaskExpirationDate: false,
    },
  });
  if (!messagesAreSuccessful(response)) return null;

  const profile = response.profile;
  if (profile === null || typeof profile !== "object") return null;
  const profileEmail = "email" in profile && typeof profile.email === "string"
    ? profile.email
    : null;
  if (profileEmail && profileEmail.toLowerCase() !== email.toLowerCase()) return null;
  const paymentProfiles = "paymentProfiles" in profile ? profile.paymentProfiles : null;
  const paymentProfile = Array.isArray(paymentProfiles)
    ? paymentProfiles[0]
    : paymentProfiles;
  if (paymentProfile === null || typeof paymentProfile !== "object") return null;
  const paymentProfileId = "customerPaymentProfileId" in paymentProfile
    ? paymentProfile.customerPaymentProfileId
    : null;
  if (
    (typeof paymentProfileId !== "string" && typeof paymentProfileId !== "number") ||
    !/^\d{1,20}$/.test(String(paymentProfileId))
  ) {
    return null;
  }

  return {
    customerProfileId,
    paymentProfileId: String(paymentProfileId),
  };
}
