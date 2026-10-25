"use client";

import { FormEvent, useRef, useState } from "react";
import { eventTypes, vehicleOptions } from "@/lib/contact-form-options";
import RecaptchaCheckbox, { type RecaptchaCheckboxHandle } from "@/components/RecaptchaCheckbox";

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-lg border border-white/20 bg-white px-3 text-base font-normal text-brand-text shadow-sm placeholder:text-brand-muted focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/40";

const isPreviewMode = process.env.NEXT_PUBLIC_APP_MODE !== "production";

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
  const recaptchaRef = useRef<RecaptchaCheckboxHandle>(null);

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
    setStatus("Submitting your reservation request…");
    setStatusType("success");
    const values = new FormData(form);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recaptchaToken,
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

      form.reset();
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
          <input id="email" name="email" required type="email" maxLength={254} autoComplete="email" placeholder="Email" className={fieldClassName} />
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
          This form does not collect or process payment information. Our team will coordinate any payment separately after reviewing your reservation request.
        </p>
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
          !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        }
        type="submit"
        className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-brand-secondary px-8 py-3 text-base font-bold text-brand-accent shadow-sm transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
      >
        {isPreviewMode
          ? "Sending disabled in preview"
          : submitting
          ? "Please wait…"
          : "Submit Reservation Request"}
      </button>

      <div className="border-t border-white/20 pt-5 text-xs leading-5 text-white/75">
        <p className="font-bold text-brand-secondary">Important</p>
        <p className="mt-2">
          {isPreviewMode
            ? "This preview does not send or store a reservation request."
            : "Submitting this form sends a reservation request only. It does not confirm a booking or request or process payment information. The team will follow up to confirm availability and arrangements."}
        </p>
      </div>
    </form>
    </>
  );
}
