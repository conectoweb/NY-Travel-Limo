import { Resend } from "resend";
import { isAuthorizeNetSandboxConfigured, verifyHostedPaymentProfile } from "@/lib/authorize-net";
import { eventTypes, vehicleOptions } from "@/lib/contact-form-options";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

const requestLimit = 5;
const requestWindowMs = 15 * 60 * 1000;
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const allowedEventTypes = new Set<string>(eventTypes);
const allowedVehicles = new Set<string>(vehicleOptions);

function getClientAddress(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",").at(-1)?.trim() || "unknown";
}

function getRateLimitResponse(request: Request): Response | null {
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
      return Response.json(
        { message: "Too many requests. Please wait and try again." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }
    entry = { count: 0, resetAt: now + requestWindowMs };
    requestCounts.set(address, entry);
  }

  entry.count += 1;
  if (entry.count > requestLimit) {
    return Response.json(
      { message: "Too many requests. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((entry.resetAt - now) / 1000))) } },
    );
  }
  return null;
}

function requiredText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned.length > 0 && cleaned.length <= maxLength ? cleaned : null;
}

function optionalText(value: unknown, maxLength: number): string | null | undefined {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim();
  return cleaned.length <= maxLength ? cleaned || null : undefined;
}

function integer(value: unknown, minimum: number, maximum: number): number | null {
  if (typeof value !== "number" && (typeof value !== "string" || !/^\d{1,3}$/.test(value))) {
    return null;
  }
  const number = Number(value);
  return Number.isInteger(number) && number >= minimum && number <= maximum ? number : null;
}

function validDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day);
}

export async function POST(request: Request) {
  if (process.env.APP_MODE !== "production") {
    return Response.json(
      { message: "This reservation form is in preview mode. Requests are disabled." },
      { status: 503 },
    );
  }

  const limited = getRateLimitResponse(request);
  if (limited) return limited;

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: "Submit the reservation using the website form." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length") ?? "0") > 12_000) {
    return Response.json({ message: "Your request is too large. Please shorten the instructions." }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 12_000) {
      return Response.json({ message: "Your request is too large. Please shorten the instructions." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ message: "Please submit a valid reservation form." }, { status: 400 });
  }
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ message: "Please submit a valid reservation form." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (typeof data.companyWebsite === "string" && data.companyWebsite.trim()) {
    return Response.json({ message: "We couldn't accept this request." }, { status: 400 });
  }

  const name = requiredText(data.name, 100);
  const phone = requiredText(data.phone, 40);
  const email = requiredText(data.email, 254);
  const pickupTime = requiredText(data.pickupTime, 5);
  const pickupDate = requiredText(data.pickupDate, 10);
  const eventType = requiredText(data.eventType, 100);
  const vehicle = requiredText(data.vehicle, 100);
  const passengers = integer(data.passengers, 1, 999);
  const pickupPlace = requiredText(data.pickupPlace, 200);
  const dropoffPlace = requiredText(data.dropoffPlace, 200);
  const serviceHours = integer(data.serviceHours, 1, 999);
  const stops = data.stops === "" || data.stops === null || data.stops === undefined
    ? null
    : integer(data.stops, 0, 999);
  const instructions = optionalText(data.instructions, 3000);
  const recaptchaToken = requiredText(data.recaptchaToken, 4096);
  const paymentSession = requiredText(data.paymentSession, 2048);
  if (
    !name || name.length < 2 ||
    !phone || !/^\+?[0-9() .-]{7,40}$/.test(phone) ||
    !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !pickupTime || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(pickupTime) ||
    !pickupDate || !validDate(pickupDate) ||
    !eventType || !allowedEventTypes.has(eventType) ||
    !vehicle || !allowedVehicles.has(vehicle) ||
    passengers === null ||
    !pickupPlace ||
    !dropoffPlace ||
    serviceHours === null ||
    (stops === null && data.stops !== "" && data.stops !== null && data.stops !== undefined) ||
    instructions === undefined ||
    data.termsAccepted !== true ||
    !recaptchaToken ||
    !paymentSession
  ) {
    return Response.json(
      { message: "Check the required fields and provide valid trip information before submitting." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.RESERVATION_EMAIL?.trim();
  const sender = process.env.RESEND_FROM?.trim();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!apiKey || !recipient || !sender || !siteKey || !secretKey || !isAuthorizeNetSandboxConfigured()) {
    console.error("Reservation request rejected because Resend, reCAPTCHA or Authorize.Net Sandbox configuration is incomplete.");
    return Response.json(
      { message: "Online reservation submissions are temporarily unavailable. Please call 718-397-1333." },
      { status: 503 },
    );
  }

  try {
    const verification = await verifyRecaptcha(recaptchaToken, secretKey);
    if (verification.invalidSecret) {
      console.error("Reservation request rejected because the reCAPTCHA secret key is invalid.");
      return Response.json(
        { message: "Online verification is temporarily unavailable. Please call 718-397-1333." },
        { status: 503 },
      );
    }
    if (!verification.success) {
      return Response.json(
        { message: "The reCAPTCHA check failed or expired. Please verify the checkbox again." },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Google reCAPTCHA verification for the reservation is unavailable.", error);
    return Response.json(
      { message: "We couldn't verify reCAPTCHA right now. Please try again or call 718-397-1333." },
      { status: 503 },
    );
  }

  try {
    const paymentProfile = await verifyHostedPaymentProfile(paymentSession, email);
    if (!paymentProfile) {
      return Response.json(
        { message: "Save your payment method in the secure Authorize.Net Sandbox form before submitting the reservation." },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Authorize.Net Sandbox profile verification for the reservation is unavailable.", error);
    return Response.json(
      { message: "Secure payment profile verification is temporarily unavailable. Please try again." },
      { status: 503 },
    );
  }

  const fields = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Pickup time", pickupTime],
    ["Pickup date", pickupDate],
    ["Event type", eventType],
    ["Vehicle", vehicle],
    ["Passengers", passengers],
    ["Pickup place", pickupPlace],
    ["Destination", dropoffPlace],
    ["Service hours", serviceHours],
    ["Additional stops", stops ?? "Not provided"],
    ["Special instructions", instructions ?? "Not provided"],
  ] as const;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: "New reservation request — NY Travel Limo",
      text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
    });

    if (error) {
      console.error("Resend could not send the reservation notification.", error);
      return Response.json(
        { message: "We couldn't email your reservation request. Please try again or call 718-397-1333." },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Resend could not send the reservation notification.", error);
    return Response.json(
      { message: "We couldn't email your reservation request. Please try again or call 718-397-1333." },
      { status: 503 },
    );
  }

  return Response.json(
    { message: "Your reservation request has been sent. Our team will contact you to confirm availability and arrangements." },
    { status: 201 },
  );
}
