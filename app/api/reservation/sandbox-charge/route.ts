import { NextResponse } from "next/server";
import { isAuthorizeNetSandboxConfigured, runSandboxProfileCharge } from "@/lib/authorize-net";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

const requestLimit = 4;
const requestWindowMs = 30 * 60 * 1000;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function getClientAddress(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",").at(-1)?.trim() || "unknown";
}

function getRateLimitResponse(request: Request): NextResponse | null {
  const now = Date.now();
  const address = getClientAddress(request);
  let entry = requestCounts.get(address);
  if (!entry || entry.resetAt <= now) {
    if (requestCounts.size >= 10_000) {
      for (const [key, value] of requestCounts) {
        if (value.resetAt <= now) requestCounts.delete(key);
      }
    }
    if (requestCounts.size >= 10_000) {
      return NextResponse.json(
        { message: "Too many test attempts. Please wait and try again." },
        { status: 429, headers: { "Retry-After": "1800" } },
      );
    }
    entry = { count: 0, resetAt: now + requestWindowMs };
    requestCounts.set(address, entry);
  }

  entry.count += 1;
  if (entry.count > requestLimit) {
    return NextResponse.json(
      { message: "Too many test attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((entry.resetAt - now) / 1000))) } },
    );
  }
  return null;
}

export async function POST(request: Request) {
  if (process.env.APP_MODE !== "production") {
    return NextResponse.json({ message: "Sandbox payment tests are disabled in preview mode." }, { status: 503 });
  }

  const limited = getRateLimitResponse(request);
  if (limited) return limited;

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Submit the sandbox test using the reservation page." }, { status: 415 });
  }

  let data: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 8_000) {
      return NextResponse.json({ message: "The sandbox test request is too large." }, { status: 413 });
    }
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ message: "Please submit a valid sandbox test request." }, { status: 400 });
  }
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json({ message: "Please submit a valid sandbox test request." }, { status: 400 });
  }

  const values = data as Record<string, unknown>;
  if (typeof values.companyWebsite === "string" && values.companyWebsite.trim()) {
    return NextResponse.json({ message: "We couldn't accept this request." }, { status: 400 });
  }
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const session = typeof values.paymentSession === "string" ? values.paymentSession.trim() : "";
  const recaptchaToken = typeof values.recaptchaToken === "string" ? values.recaptchaToken.trim() : "";
  const result = values.result;
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !session || session.length > 2048 ||
    !recaptchaToken || recaptchaToken.length > 4096 ||
    (result !== "approved" && result !== "declined")
  ) {
    return NextResponse.json({ message: "Complete reCAPTCHA and select a valid Sandbox test." }, { status: 400 });
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!siteKey || !secretKey || !isAuthorizeNetSandboxConfigured()) {
    console.error("Sandbox charge test unavailable because server configuration is incomplete.");
    return NextResponse.json(
      { message: "Sandbox payment testing is not configured. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const verification = await verifyRecaptcha(recaptchaToken, secretKey);
    if (verification.invalidSecret) {
      console.error("Sandbox charge test rejected because the reCAPTCHA secret key is invalid.");
      return NextResponse.json({ message: "Online verification is temporarily unavailable." }, { status: 503 });
    }
    if (!verification.success) {
      return NextResponse.json(
        { message: "The reCAPTCHA check failed or expired. Please verify the checkbox again." },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("reCAPTCHA verification for the Sandbox charge test is unavailable.", error);
    return NextResponse.json({ message: "We couldn't verify reCAPTCHA right now." }, { status: 503 });
  }

  try {
    const outcome = await runSandboxProfileCharge(session, email, result);
    if (!outcome) {
      return NextResponse.json(
        { message: "The saved Sandbox payment profile could not be verified. Save it again and retry." },
        { status: 400 },
      );
    }
    if (result === "approved" && outcome.approved) {
      return NextResponse.json(
        { message: "Sandbox test approved for $1.00. No real funds were moved.", approved: true },
        { status: 200 },
      );
    }
    if (result === "declined" && outcome.responseCode === "2") {
      return NextResponse.json(
        { message: "Sandbox returned the expected declined result for $1.00. No real funds were moved.", approved: false },
        { status: 200 },
      );
    }

    console.error("Authorize.Net Sandbox returned a different result than requested for the profile test transaction.");
    return NextResponse.json(
      {
        message: outcome.approved
          ? "Sandbox approved the transaction when a decline was expected. The $1.00 test charge may appear in the Sandbox account."
          : outcome.responseCode === "2"
            ? "Sandbox declined the transaction when approval was expected. Check the saved Sandbox test payment method."
            : "Authorize.Net Sandbox could not complete this test transaction. Please check the Sandbox account and try again.",
      },
      { status: 502 },
    );
  } catch (error) {
    console.error("Authorize.Net Sandbox profile test transaction failed.", error);
    return NextResponse.json(
      { message: "Authorize.Net Sandbox is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
}
