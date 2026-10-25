import { NextResponse } from "next/server";
import { createHostedPaymentProfile, isAuthorizeNetConfigured } from "@/lib/authorize-net";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

const requestLimit = 3;
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
        { message: "Too many requests. Please wait and try again." },
        { status: 429, headers: { "Retry-After": "1800" } },
      );
    }
    entry = { count: 0, resetAt: now + requestWindowMs };
    requestCounts.set(address, entry);
  }

  entry.count += 1;
  if (entry.count > requestLimit) {
    return NextResponse.json(
      { message: "Too many secure payment attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((entry.resetAt - now) / 1000))) } },
    );
  }
  return null;
}

export async function POST(request: Request) {
  if (process.env.APP_MODE !== "production") {
    return NextResponse.json(
      { message: "This form is in preview mode. Payment setup is disabled." },
      { status: 503 },
    );
  }

  const limited = getRateLimitResponse(request);
  if (limited) return limited;

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Submit the reservation using the website form." }, { status: 415 });
  }

  let data: unknown;
  try {
    const text = await request.text();
    if (text.length > 8_000) {
      return NextResponse.json({ message: "Your request is too large." }, { status: 413 });
    }
    data = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Please submit a valid reservation form." }, { status: 400 });
  }
  if (data === null || typeof data !== "object") {
    return NextResponse.json({ message: "Please submit a valid reservation form." }, { status: 400 });
  }

  const values = data as Record<string, unknown>;
  if (typeof values.companyWebsite === "string" && values.companyWebsite.trim()) {
    return NextResponse.json({ message: "We couldn't accept this request." }, { status: 400 });
  }
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const recaptchaToken = typeof values.recaptchaToken === "string" ? values.recaptchaToken.trim() : "";
  if (
    name.length < 2 ||
    name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    values.termsAccepted !== true ||
    !recaptchaToken ||
    recaptchaToken.length > 4096
  ) {
    return NextResponse.json(
      { message: "Enter a valid name and email address, accept the terms and complete reCAPTCHA." },
      { status: 400 },
    );
  }

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!recaptchaSiteKey || !recaptchaSecretKey) {
    console.error("Authorize.Net profile request rejected because reCAPTCHA environment variables are missing.");
    return NextResponse.json(
      { message: "Online verification is temporarily unavailable. Please try again later or call 718-397-1333." },
      { status: 503 },
    );
  }
  try {
    const verification = await verifyRecaptcha(recaptchaToken, recaptchaSecretKey);
    if (verification.invalidSecret) {
      console.error("Authorize.Net profile request rejected because the reCAPTCHA secret key is invalid.");
      return NextResponse.json(
        { message: "Online verification is temporarily unavailable. Please call 718-397-1333." },
        { status: 503 },
      );
    }
    if (!verification.success) {
      return NextResponse.json(
        { message: "The reCAPTCHA check failed or expired. Please verify the checkbox again." },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("reCAPTCHA verification for Authorize.Net profile setup is unavailable.", error);
    return NextResponse.json(
      { message: "We couldn't verify reCAPTCHA right now. Please try again or call 718-397-1333." },
      { status: 503 },
    );
  }

  if (!isAuthorizeNetConfigured()) {
    console.error("Secure payment profile setup is unavailable because Authorize.Net is not configured.");
    return NextResponse.json(
      { message: "Secure payment setup is not available yet. Please try again later or call 718-397-1333." },
      { status: 503 },
    );
  }

  try {
    const paymentForm = await createHostedPaymentProfile(name, email);
    return NextResponse.json(paymentForm, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Authorize.Net could not prepare a hosted payment profile.", error);
    return NextResponse.json(
      { message: "We couldn't open the secure payment form. Please try again or call 718-397-1333." },
      { status: 503 },
    );
  }
}
