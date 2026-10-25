import { Resend } from "resend";
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

function optionalInteger(value: unknown, minimum: number, maximum: number): number | null | undefined {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "number" && (typeof value !== "string" || !/^\d{1,3}$/.test(value))) {
    return undefined;
  }
  const number = Number(value);
  return Number.isInteger(number) && number >= minimum && number <= maximum ? number : undefined;
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
      { message: "This form is in preview mode. Requests are disabled; nothing was sent or saved." },
      { status: 503 },
    );
  }

  const limited = getRateLimitResponse(request);
  if (limited) return limited;

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: "Submit the quote request using the website form." }, { status: 415 });
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
    return Response.json({ message: "Please submit a valid quote request." }, { status: 400 });
  }
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ message: "Please submit a valid quote request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (typeof data.qf_8a1d === "string" && data.qf_8a1d.trim()) {
    return Response.json({ message: "We couldn't accept this request." }, { status: 400 });
  }

  const name = requiredText(data.name, 100);
  const email = requiredText(data.email, 254);
  const phone = requiredText(data.phone, 40);
  const pickupDate = optionalText(data.pickupDate, 10);
  const pickupTime = optionalText(data.pickupTime, 5);
  const eventType = optionalText(data.eventType, 100);
  const vehicle = optionalText(data.vehicle, 100);
  const passengers = optionalInteger(data.passengers, 1, 999);
  const stops = optionalInteger(data.stops, 0, 999);
  const pickupPlace = optionalText(data.pickupPlace, 200);
  const dropoffPlace = optionalText(data.dropoffPlace, 200);
  const serviceHours = optionalInteger(data.serviceHours, 1, 999);
  const instructions = optionalText(data.instructions, 3000);
  const recaptchaToken = requiredText(data.recaptchaToken, 4096);

  if (
    !name || name.length < 2 ||
    !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !phone || !/^\+?[0-9() .-]{7,40}$/.test(phone) ||
    data.consent !== true ||
    (pickupDate !== null && (pickupDate === undefined || !validDate(pickupDate))) ||
    (pickupTime !== null && (pickupTime === undefined || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(pickupTime))) ||
    eventType === undefined || (eventType !== null && !allowedEventTypes.has(eventType)) ||
    vehicle === undefined || (vehicle !== null && !allowedVehicles.has(vehicle)) ||
    passengers === undefined ||
    stops === undefined ||
    pickupPlace === undefined ||
    dropoffPlace === undefined ||
    serviceHours === undefined ||
    instructions === undefined ||
    !recaptchaToken
  ) {
    return Response.json(
      { message: "Check your details, consent and trip information before submitting the quote request." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.QUOTE_EMAIL?.trim();
  const sender = process.env.RESEND_FROM?.trim();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!apiKey || !recipient || !sender || !siteKey || !secretKey) {
    console.error("Quote request rejected because Resend, quote recipient or reCAPTCHA environment variables are missing.");
    return Response.json(
      { message: "Online quote requests are temporarily unavailable. Please call 718-397-1333." },
      { status: 503 },
    );
  }

  try {
    const verification = await verifyRecaptcha(recaptchaToken, secretKey);
    if (verification.invalidSecret) {
      console.error("Quote request rejected because the reCAPTCHA secret key is invalid.");
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
    console.error("Google reCAPTCHA verification for the quote request is unavailable.", error);
    return Response.json(
      { message: "We couldn't verify reCAPTCHA right now. Please try again or call 718-397-1333." },
      { status: 503 },
    );
  }

  const display = (value: string | number | null) => value ?? "Not provided";
  const emailText = [
    "NEW QUOTE REQUEST",
    "=================",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Pickup date: ${display(pickupDate)}`,
    `Pickup time: ${display(pickupTime)}`,
    `Event type: ${display(eventType)}`,
    `Vehicle: ${display(vehicle)}`,
    `Passengers: ${display(passengers)}`,
    `Additional stops: ${display(stops)}`,
    `Pickup place: ${display(pickupPlace)}`,
    `Destination: ${display(dropoffPlace)}`,
    `Service hours: ${display(serviceHours)}`,
    "",
    "Question / Special Instructions:",
    display(instructions),
  ].join("\n");
  const subjectName = name.replace(/[\r\n]+/g, " ").trim();

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `New quote request — ${subjectName}`,
      text: emailText,
    });

    if (error) {
      console.error("Resend could not send the quote request notification.", error);
      return Response.json(
        { message: "We couldn't email your quote request. Please try again or call 718-397-1333." },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Resend could not send the quote request notification.", error);
    return Response.json(
      { message: "We couldn't email your quote request. Please try again or call 718-397-1333." },
      { status: 503 },
    );
  }

  return Response.json(
    { message: "Thank you. Your quote request has been sent to our team." },
    { status: 201 },
  );
}
