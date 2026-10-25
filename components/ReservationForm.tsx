"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { eventTypes, vehicleOptions } from "@/lib/contact-form-options";
import RecaptchaCheckbox, { type RecaptchaCheckboxHandle } from "@/components/RecaptchaCheckbox";

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-lg border border-white/20 bg-white px-3 text-base font-normal text-brand-text shadow-sm placeholder:text-brand-muted focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/40";

const isPreviewMode = process.env.NEXT_PUBLIC_APP_MODE !== "production";

declare global {
  interface Window {
    CommunicationHandler?: {
      onReceiveCommunication: (message: { qstr: string; parent: string }) => void;
    };
  }
}

function ReservationField({
  label,
  name,
  required = false,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-white" htmlFor={name}>
        {label}
        {required && <span aria-hidden="true" className="ml-1 text-brand-secondary">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
    </div>
  );
}

export default function ReservationForm() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "notice">("success");
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [hostedPageToken, setHostedPageToken] = useState("");
  const [hostedFormAction, setHostedFormAction] = useState("");
  const [paymentSession, setPaymentSession] = useState("");
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [sandboxSession, setSandboxSession] = useState("");
  const [sandboxEmail, setSandboxEmail] = useState("");
  const [sandboxStatus, setSandboxStatus] = useState("");
  const [sandboxStatusType, setSandboxStatusType] = useState<"success" | "error">("success");
  const [sandboxSubmitting, setSandboxSubmitting] = useState(false);
  const recaptchaRef = useRef<RecaptchaCheckboxHandle>(null);
  const hostedFormRef = useRef<HTMLFormElement>(null);
  const submittedHostedTokenRef = useRef("");

  useEffect(() => {
    window.CommunicationHandler = {
      onReceiveCommunication: ({ qstr }) => {
        if (typeof qstr !== "string") return;
        const parameters = new URLSearchParams(qstr.replace(/^#/, "").replace(/^\?/, ""));
        const action = parameters.get("action");
        if (action === "successfulSave") {
          setPaymentSaved(true);
          setStatusType("success");
          setStatus("Payment method saved securely in the Authorize.Net Sandbox. No live charge was made.");
          recaptchaRef.current?.reset();
        } else if (action === "cancel") {
          setPaymentSaved(false);
          setStatusType("notice");
          setStatus("Payment setup was cancelled. Save a method in the secure Sandbox form to continue.");
        }
      },
    };
    return () => {
      delete window.CommunicationHandler;
    };
  }, []);

  useEffect(() => {
    if (hostedPageToken && submittedHostedTokenRef.current !== hostedPageToken) {
      submittedHostedTokenRef.current = hostedPageToken;
      hostedFormRef.current?.submit();
    }
  }, [hostedPageToken]);

  async function runSandboxCharge(result: "approved" | "declined") {
    if (!recaptchaToken) {
      setSandboxStatusType("error");
      setSandboxStatus("Complete reCAPTCHA before running the Sandbox charge test.");
      return;
    }

    setSandboxSubmitting(true);
    setSandboxStatus("");
    try {
      const response = await fetch("/api/reservation/sandbox-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentSession: sandboxSession,
          email: sandboxEmail,
          recaptchaToken,
          companyWebsite: "",
          result,
        }),
      });
      const outcome = await response.json() as { message?: string };
      setSandboxStatusType(response.ok ? "success" : "error");
      setSandboxStatus(outcome.message ?? "The Sandbox test could not be completed.");
    } catch {
      setSandboxStatusType("error");
      setSandboxStatus("We couldn't reach the server for the Sandbox test.");
    } finally {
      recaptchaRef.current?.reset();
      setSandboxSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    if (isPreviewMode) {
      setStatusType("notice");
      setStatus("This reservation form is in preview mode. Submissions are disabled.");
      return;
    }
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setSubmitting(true);
    setStatus(paymentSaved ? "Submitting your reservation request…" : "Preparing secure Sandbox payment setup…");
    setStatusType("success");
    const values = new FormData(form);

    try {
      if (!paymentSaved) {
        const response = await fetch("/api/authorize-net/hosted-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.get("name"),
            email: values.get("email"),
            recaptchaToken,
            termsAccepted: values.get("termsAccepted") === "on",
            companyWebsite: values.get("companyWebsite"),
          }),
        });
        const result = await response.json() as {
          message?: string;
          token?: string;
          action?: string;
          session?: string;
        };
        if (!response.ok || !result.token || !result.action || !result.session) {
          setStatusType(response.status === 503 ? "notice" : "error");
          setStatus(result.message ?? "We couldn't open the secure Sandbox payment form. Please try again.");
          recaptchaRef.current?.reset();
          return;
        }
        if (result.action !== "https://test.authorize.net/customer/addPayment") {
          setStatusType("error");
          setStatus("The payment form did not return the Authorize.Net Sandbox address.");
          recaptchaRef.current?.reset();
          return;
        }
        setPaymentSession(result.session);
        setSandboxSession(result.session);
        setSandboxEmail(String(values.get("email") ?? ""));
        setHostedFormAction(result.action);
        setHostedPageToken(result.token);
        setStatusType("notice");
        setStatus("Add your payment method in the secure Authorize.Net Sandbox form below. Card details are sent directly to Authorize.Net.");
        recaptchaRef.current?.reset();
        return;
      }

      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recaptchaToken,
          paymentSession,
          name: values.get("name"),
          phone: values.get("phone"),
          email: values.get("email"),
          pickupTime: values.get("pickupTime"),
          pickupDate: values.get("pickupDate"),
          eventType: values.get("eventType"),
          vehicle: values.get("vehicle"),
          passengers: values.get("passengers"),
          pickupPlace: values.get("pickupPlace"),
          dropoffPlace: values.get("dropoffPlace"),
          serviceHours: values.get("serviceHours"),
          stops: values.get("stops"),
          instructions: values.get("instructions"),
          termsAccepted: values.get("termsAccepted") === "on",
          companyWebsite: values.get("companyWebsite"),
        }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        const message = result.message ?? "We couldn't submit your reservation request. Please try again or call 718-397-1333.";
        setStatusType(response.status === 503 ? "notice" : "error");
        setStatus(message);
        recaptchaRef.current?.reset();
        return;
      }

      setReservationSubmitted(true);
      recaptchaRef.current?.reset();
      setStatusType("success");
      setStatus(result.message ?? "Thank you. Your reservation request has been sent successfully.");
    } catch {
      setStatusType("error");
      setStatus("We couldn't reach the server. Please try again or call 718-397-1333.");
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    <form aria-busy={submitting} className="space-y-8 rounded-b-3xl bg-brand-accent p-5 sm:p-8 lg:p-10" onSubmit={handleSubmit}>
      <fieldset className="space-y-5">
        <legend className="mb-5 text-xl font-bold text-white">Client Information</legend>
        <ReservationField label="First & Last Name" name="name" required>
          <input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="First & Last Name" className={fieldClassName} />
        </ReservationField>
        <ReservationField label="Phone Number" name="phone" required>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={40}
            pattern="\+?[0-9\(\) .\-]{7,40}"
            title="Enter a valid phone number, including your country code if needed."
            placeholder="Enter your phone number"
            className={fieldClassName}
          />
        </ReservationField>
        <ReservationField label="Email" name="email" required>
          <input id="email" name="email" required readOnly={Boolean(paymentSession)} type="email" maxLength={254} autoComplete="email" placeholder="Email" className={fieldClassName} />
        </ReservationField>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-5 text-xl font-bold text-white">Event Information</legend>
        <ReservationField label="Pick up Time" name="pickupTime" required>
          <input id="pickupTime" name="pickupTime" required type="time" className={fieldClassName} />
        </ReservationField>
        <ReservationField label="Pick up Date" name="pickupDate" required>
          <input id="pickupDate" name="pickupDate" required type="date" className={fieldClassName} />
        </ReservationField>
        <ReservationField label="Event Type" name="eventType" required>
          <select id="eventType" name="eventType" required defaultValue="" className={fieldClassName}>
            <option value="" disabled>Select One</option>
            {eventTypes.map((eventType) => <option key={eventType} value={eventType}>{eventType}</option>)}
          </select>
        </ReservationField>
        <ReservationField label="Select Vehicle" name="vehicle" required>
          <select id="vehicle" name="vehicle" required defaultValue="" className={fieldClassName}>
            <option value="" disabled>Select One</option>
            {vehicleOptions.map((vehicle) => <option key={vehicle} value={vehicle}>{vehicle}</option>)}
          </select>
        </ReservationField>
        <ReservationField label="Passengers" name="passengers" required>
          <input id="passengers" name="passengers" required type="number" min="1" max="999" step="1" inputMode="numeric" placeholder="Enter number of passengers" className={fieldClassName} />
          <span className="mt-2 block text-sm text-white/75">You can enter any number from 1 to 999 passengers.</span>
        </ReservationField>
        <ReservationField label="Pick up Place" name="pickupPlace" required>
          <input id="pickupPlace" name="pickupPlace" required maxLength={200} autoComplete="street-address" placeholder="Airport, airline, flight number, address" className={fieldClassName} />
        </ReservationField>
        <ReservationField label="Drop off Place" name="dropoffPlace" required>
          <input id="dropoffPlace" name="dropoffPlace" required maxLength={200} placeholder="Airport, address, or destination" className={fieldClassName} />
        </ReservationField>
        <ReservationField label="Service Hours" name="serviceHours" required>
          <input id="serviceHours" name="serviceHours" required type="number" min="1" max="999" step="1" inputMode="numeric" placeholder="How many hours?" className={fieldClassName} />
        </ReservationField>
        <ReservationField label="Stops" name="stops">
          <input id="stops" name="stops" type="number" min="0" max="999" step="1" inputMode="numeric" placeholder="Number of additional stops (optional)" className={fieldClassName} />
        </ReservationField>
        <ReservationField label="Special Instructions / Stops" name="instructions">
          <textarea id="instructions" name="instructions" rows={6} maxLength={3000} placeholder="Special instructions, additional stops, or other details" className={`${fieldClassName} min-h-40 py-3`} />
        </ReservationField>
      </fieldset>

      <fieldset className="space-y-3 border-t border-white/20 pt-6">
        <legend className="text-xl font-bold text-white">Payment Information</legend>
        <p className="text-sm leading-6 text-white/85">
          Save a payment method with the secure Authorize.Net Sandbox form. Card number, CVV and expiration date are entered directly with Authorize.Net and are never sent to this website or by email. Saving a method does not make a live charge.
        </p>
        <a
          href="https://developer.authorize.net/hello_world/testing_guide.html"
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-sm font-semibold text-brand-secondary underline underline-offset-4"
        >
          Official Authorize.Net Sandbox test data
        </a>
        {!isPreviewMode && !hostedPageToken && (
          <p className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/85">
            Complete the reservation details and reCAPTCHA, then continue to load the secure Sandbox form.
          </p>
        )}
        {!isPreviewMode && hostedPageToken && hostedFormAction && (
          <iframe
            title="Secure Authorize.Net Sandbox payment profile form"
            name="authorizeNetHostedProfile"
            className="w-full rounded-lg border-0 bg-white"
            referrerPolicy="strict-origin"
            style={{ height: 640 }}
          />
        )}
        {paymentSaved && (
          <p className="text-sm font-semibold text-white" role="status">
            Payment method saved in the Sandbox Customer Profile. Complete reCAPTCHA again to send the reservation.
          </p>
        )}
      </fieldset>

      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="reservationWebsite">Leave this field empty</label>
        <input id="reservationWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white">
        <input name="termsAccepted" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-brand-secondary" />
        <span>
          I accept the <a className="font-semibold text-brand-secondary underline underline-offset-4" href="/terms-and-conditions">Terms and Conditions</a> and authorize NY Travel Limo to use my information to respond to this request.
          <span aria-hidden="true" className="ml-1 text-brand-secondary">*</span>
          <span className="sr-only"> Required</span>
        </span>
      </label>

      {!isPreviewMode && <RecaptchaCheckbox ref={recaptchaRef} onTokenChange={setRecaptchaToken} />}

      {isPreviewMode && (
        <p className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold leading-6 text-white" role="status">
          Preview mode: this form is for display only. Reservation requests are disabled.
        </p>
      )}

      {status && (
        <p
          aria-live="polite"
          role={statusType === "error" ? "alert" : "status"}
          className={`rounded-lg border p-4 text-sm font-semibold ${
            statusType === "error"
              ? "border-red-300 bg-red-50 text-red-900"
              : statusType === "notice"
                ? "border-white/25 bg-white/10 text-white"
                : "border-white/30 bg-white/10 text-white"
          }`}
        >
          {status}
        </p>
      )}

      <button
        disabled={
          isPreviewMode ||
          submitting ||
          !recaptchaToken ||
          !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
          reservationSubmitted
        }
        type="submit"
        className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-brand-secondary px-8 py-3 text-base font-bold text-brand-accent shadow-sm transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
      >
        {isPreviewMode
          ? "Sending disabled in preview"
          : submitting
          ? "Please wait…"
          : reservationSubmitted
          ? "Reservation Request Sent"
          : paymentSaved
          ? "Submit Reservation Request"
          : "Continue to Secure Sandbox Payment"}
      </button>

      <div className="border-t border-white/20 pt-5 text-xs leading-5 text-white/75">
        <p className="font-bold text-brand-secondary">Important</p>
        <p className="mt-2">
          {isPreviewMode
            ? "This preview does not send or store a reservation request."
            : "Submitting sends your trip details to our team and does not confirm a booking. Payment will be coordinated separately. The optional Sandbox buttons below simulate $1.00 test transactions and do not move real funds."}
        </p>
      </div>
    </form>
    {!isPreviewMode && (
      <form
        ref={hostedFormRef}
        action={hostedFormAction}
        method="post"
        target="authorizeNetHostedProfile"
        aria-hidden="true"
        className="hidden"
      >
        <input type="hidden" name="token" value={hostedPageToken} />
      </form>
    )}
    {paymentSaved && (
      <section aria-labelledby="sandbox-test-heading" className="space-y-4 rounded-b-2xl bg-brand-accent p-5 sm:p-8">
        <h3 className="text-lg font-bold text-white" id="sandbox-test-heading">Sandbox charge tests</h3>
        <p className="text-sm leading-6 text-white/85">
          Each button submits a $1.00 Sandbox transaction using the saved Customer Profile. For the official declined test, the server uses postal code 46282; the approved test uses 10001. Complete reCAPTCHA above before each attempt.
        </p>
        {sandboxStatus && (
          <p
            aria-live="polite"
            role={sandboxStatusType === "error" ? "alert" : "status"}
            className={`rounded-lg border p-4 text-sm font-semibold ${
              sandboxStatusType === "error"
                ? "border-red-300 bg-red-50 text-red-900"
                : "border-white/30 bg-white/10 text-white"
            }`}
          >
            {sandboxStatus}
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={sandboxSubmitting || !recaptchaToken}
            onClick={() => void runSandboxCharge("approved")}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold text-brand-accent disabled:cursor-wait disabled:opacity-60"
          >
            {sandboxSubmitting ? "Please wait…" : "Test approved $1.00 charge"}
          </button>
          <button
            type="button"
            disabled={sandboxSubmitting || !recaptchaToken}
            onClick={() => void runSandboxCharge("declined")}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/50 px-5 py-3 text-sm font-bold text-white disabled:cursor-wait disabled:opacity-60"
          >
            {sandboxSubmitting ? "Please wait…" : "Test declined $1.00 charge"}
          </button>
        </div>
      </section>
    )}
    </>
  );
}
