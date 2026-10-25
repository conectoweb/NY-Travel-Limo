import { NextResponse } from "next/server";
import { getDatabasePool } from "@/lib/db";
import { eventTypes, vehicleOptions } from "@/lib/contact-form-options";
import { verifyHostedPaymentProfile } from "@/lib/authorize-net";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

const notificationRecipient = "sales@nytravellimo.com";
const requestLimit = 5;
const requestWindowMs = 15 * 60 * 1000;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function getClientAddress(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",").at(-1)?.trim() || "unknown";
}

function rateLimitResponse(request: Request): NextResponse | null {
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
        { message: "Too many requests. Please wait a few minutes and try again." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }
    entry = { count: 0, resetAt: now + requestWindowMs };
    requestCounts.set(address, entry);
  }

  entry.count += 1;
  if (entry.count > requestLimit) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return NextResponse.json(
      { message: "Too many requests. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
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

function optionalInteger(
  value: unknown,
  minimum: number,
  maximum: number,
): number | null | undefined {
  if (value === undefined || value === null || value === "") return null;
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(number) || number < minimum || number > maximum) return undefined;
  return number;
}

function validDate(value: string | null): string | null | undefined {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return undefined;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() !== Number(month) - 1 ||
    date.getUTCDate() !== Number(day)
  ) {
    return undefined;
  }
  return value;
}

export async function POST(request: Request) {
  const limited = rateLimitResponse(request);
  if (limited) return limited;

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 12_000) {
    return NextResponse.json({ message: "Your request is too large. Please shorten the instructions." }, { status: 413 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Submit the inquiry using the website form." }, { status: 415 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 12_000) {
      return NextResponse.json({ message: "Your request is too large. Please shorten the instructions." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Please submit a valid request form." }, { status: 400 });
  }
  if (body === null || typeof body !== "object") {
    return NextResponse.json({ message: "Please submit a valid request form." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (typeof data.companyWebsite === "string" && data.companyWebsite.trim() !== "") {
    return NextResponse.json({ message: "We couldn't accept this request." }, { status: 400 });
  }

  const recaptchaToken = requiredText(data.recaptchaToken, 4096);
  const paymentSession = requiredText(data.paymentSession, 2048);
  const requestType = data.requestType === undefined ? "contact" : data.requestType;
  const name = requiredText(data.name, 100);
  const email = requiredText(data.email, 254);
  const phone = requiredText(data.phone, 40);
  const pickupDateInput = optionalText(data.pickupDate, 10);
  const pickupDate = pickupDateInput === undefined ? undefined : validDate(pickupDateInput);
  const pickupTime = optionalText(data.pickupTime, 5);
  const eventType = optionalText(data.eventType, 100);
  const vehicle = optionalText(data.vehicle, 30);
  const passengers = optionalInteger(data.passengers, 1, 999);
  const stops = optionalInteger(data.stops, 0, 999);
  const pickupPlace = optionalText(data.pickupPlace, 200);
  const dropoffPlace = optionalText(data.dropoffPlace, 200);
  const serviceHours = optionalInteger(data.serviceHours, 1, 999);
  const instructions = optionalText(data.instructions, 3000);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9() .-]{7,40}$/;
  const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  const allowedEventTypes = new Set<string>(eventTypes);
  const allowedVehicles = new Set<string>(vehicleOptions);
  const isReservation = requestType === "reservation";
  const consentGiven = isReservation
    ? data.termsAccepted === true
    : data.consent === true;

  const invalid =
    (requestType !== "contact" && !isReservation) ||
    !name ||
    name.length < 2 ||
    !email ||
    !emailPattern.test(email) ||
    !phone ||
    !phonePattern.test(phone) ||
    !consentGiven ||
    (isReservation && !paymentSession) ||
    pickupDate === undefined ||
    pickupTime === undefined ||
    (pickupTime !== null && !timePattern.test(pickupTime)) ||
    eventType === undefined ||
    (eventType !== null && !allowedEventTypes.has(eventType)) ||
    vehicle === undefined ||
    (vehicle !== null && !allowedVehicles.has(vehicle)) ||
    passengers === undefined ||
    stops === undefined ||
    pickupPlace === undefined ||
    dropoffPlace === undefined ||
    serviceHours === undefined ||
    instructions === undefined ||
    (isReservation &&
      (!pickupDate ||
        !pickupTime ||
        !eventType ||
        !vehicle ||
        passengers === null ||
        !pickupPlace ||
        !dropoffPlace ||
        serviceHours === null));

  if (invalid) {
    return NextResponse.json(
      { message: "Check your details, accept the required terms and provide valid trip information." },
      { status: 400 },
    );
  }

  if (!recaptchaToken) {
    return NextResponse.json(
      { message: "Complete the “I'm not a robot” reCAPTCHA checkbox before submitting." },
      { status: 400 },
    );
  }

  let paymentProfile: { customerProfileId: string; paymentProfileId: string } | null = null;
  if (isReservation && paymentSession) {
    try {
      paymentProfile = await verifyHostedPaymentProfile(paymentSession, email);
    } catch (error) {
      console.error("Authorize.Net payment profile verification is unavailable.", error);
      return NextResponse.json(
        { message: "Secure payment verification is temporarily unavailable. Please try again or call 718-397-1333." },
        { status: 503 },
      );
    }
    if (!paymentProfile) {
      return NextResponse.json(
        { message: "Save your payment method in the secure Authorize.Net form before submitting the reservation request." },
        { status: 400 },
      );
    }
  }

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!recaptchaSiteKey || !recaptchaSecretKey) {
    console.error("Quote form submission rejected because reCAPTCHA environment variables are missing.");
    return NextResponse.json(
      { message: "Online verification is temporarily unavailable. Please try again later or call 718-397-1333." },
      { status: 503 },
    );
  }

  if (!isReservation) {
    try {
      const verification = await verifyRecaptcha(recaptchaToken, recaptchaSecretKey);
      if (verification.invalidSecret) {
        console.error("Google reCAPTCHA verification failed because the configured secret key is invalid.");
        return NextResponse.json(
          { message: "reCAPTCHA is misconfigured. Please contact us by phone." },
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
      console.error("Google reCAPTCHA verification is unavailable.", error);
      return NextResponse.json(
        { message: "We couldn't verify reCAPTCHA right now. Please try again or call 718-397-1333." },
        { status: 503 },
      );
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!resendApiKey || !sender) {
    return NextResponse.json(
      { message: "Email notifications are not configured yet. Please call 718-397-1333." },
      { status: 503 },
    );
  }

  try {
    await getDatabasePool().execute(
      `INSERT INTO quote_requests
        (name, email, phone, trip_details, pickup_date, pickup_time, event_type, vehicle,
         passenger_count, stop_count, pickup_place, dropoff_place, service_hours, instructions, consent,
         authorize_customer_profile_id, authorize_payment_profile_id)
       VALUES (?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone,
        pickupDate,
        pickupTime,
        eventType,
        vehicle,
        passengers,
        stops,
        pickupPlace,
        dropoffPlace,
        serviceHours,
        instructions,
        true,
        paymentProfile?.customerProfileId ?? null,
        paymentProfile?.paymentProfileId ?? null,
      ],
    );
  } catch (error) {
    console.error("Quote request could not be stored.", error);
    if (error instanceof Error && error.message === "Database configuration is incomplete or invalid.") {
      return NextResponse.json({ message: "The inquiry form is temporarily unavailable. Please call 718-397-1333." }, { status: 503 });
    }
    return NextResponse.json({ message: "We couldn't save your inquiry right now. Please call 718-397-1333." }, { status: 503 });
  }

  const display = (value: string | number | null) => value ?? "Not provided";
  const subjectName = name.replace(/[\r\n]+/g, " ").trim();
  const emailText = isReservation
    ? [
        "NEW RESERVATION REQUEST",
        "======================",
        "",
        "CLIENT INFORMATION",
        "------------------",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        "",
        "EVENT INFORMATION",
        "-----------------",
        `Pick up Time: ${display(pickupTime)}`,
        `Pick up Date: ${display(pickupDate)}`,
        `Event Type: ${display(eventType)}`,
        `Vehicle: ${display(vehicle)}`,
        `Passengers: ${display(passengers)}`,
        "",
        "Pick up Place:",
        display(pickupPlace),
        "",
        "Drop off Place:",
        display(dropoffPlace),
        "",
        `Service Hours: ${display(serviceHours)}`,
        `Stops: ${display(stops)}`,
        "",
        "Special Instructions / Stops:",
        display(instructions),
        "",
        "PAYMENT INFORMATION",
        "-------------------",
        "Payment will be coordinated securely after our team reviews the reservation request.",
        "The payment method was securely tokenized by Authorize.Net. NY Travel Limo stores only provider profile IDs; card numbers and CVV are not received or emailed.",
        "",
        "-------------------",
        "Terms Accepted: Yes",
        "",
        "Sent from:",
        "NY Travel Limo",
        "https://www.nytravellimo.com",
      ].join("\n")
    : [
        "NEW CONTACT REQUEST",
        "===================",
        "",
        "CLIENT INFORMATION",
        "------------------",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        "",
        "TRIP INFORMATION",
        "----------------",
        `Pick up Date: ${display(pickupDate)}`,
        `Pick up Time: ${display(pickupTime)}`,
        `Event Type: ${display(eventType)}`,
        `Vehicle: ${display(vehicle)}`,
        `Passengers: ${display(passengers)}`,
        `Pick up Place: ${display(pickupPlace)}`,
        `Drop off Place: ${display(dropoffPlace)}`,
        `Service Hours: ${display(serviceHours)}`,
        `Stops: ${display(stops)}`,
        "",
        "Message / Special Instructions:",
        display(instructions),
        "",
        "Sent from:",
        "NY Travel Limo",
        "https://www.nytravellimo.com",
      ].join("\n");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [notificationRecipient],
        reply_to: email,
        subject: `[NY Travel Limo] ${isReservation ? "New reservation" : "New contact"} from ${subjectName}`,
        text: emailText,
      }),
      cache: "no-store",
    });

    if (!emailResponse.ok) {
      console.error("Quote notification email could not be sent.", emailResponse.status);
      return NextResponse.json(
        { message: "Your request was saved, but we couldn't email the team. Please call 718-397-1333." },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Quote notification email could not be sent.", error);
    return NextResponse.json(
      { message: "Your request was saved, but we couldn't email the team. Please call 718-397-1333." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      message: isReservation
        ? "Your reservation request has been received. This is not a booking confirmation; our team will contact you to confirm availability, arrangements and secure payment."
        : "Thank you. Your transportation request has been received.",
    },
    { status: 201 },
  );
}
