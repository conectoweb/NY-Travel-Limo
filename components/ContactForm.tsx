"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { eventTypes, vehicleOptions } from "@/lib/contact-form-options";
import RecaptchaCheckbox, { type RecaptchaCheckboxHandle } from "@/components/RecaptchaCheckbox";

const isPreviewMode = process.env.NEXT_PUBLIC_APP_MODE !== "production";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const controlClassName =
  "mt-2 min-h-12 w-full min-w-0 rounded-lg border border-brand-text/20 bg-white px-3 text-base font-normal text-brand-text shadow-sm transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20";

function Field({
  label,
  name,
  required = false,
  children,
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-brand-dark" htmlFor={name}>
        {label}
        {required && <span aria-hidden="true" className="ml-1 text-brand-primary">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [dialog, setDialog] = useState<{ type: "success" | "error" | "notice"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef<RecaptchaCheckboxHandle>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!dialog) return;

    dialogCloseRef.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setDialog(null);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [dialog]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDialog(null);
    if (isPreviewMode) {
      setDialog({ type: "notice", message: "This form is in preview mode. Requests are disabled; nothing was sent or saved." });
      return;
    }
    setSubmitting(true);
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setDialog({ type: "error", message: "Please complete the required fields and correct the highlighted information before submitting." });
      setSubmitting(false);
      return;
    }

    const values = new FormData(form);
    const month = values.get("pickupMonth");
    const day = values.get("pickupDay");
    const year = values.get("pickupYear");
    const hasAnyDatePart = Boolean(month || day || year);
    if (hasAnyDatePart && !(month && day && year)) {
      setDialog({ type: "error", message: "Enter the pickup month, day and year, or leave the entire date blank." });
      setSubmitting(false);
      return;
    }
    const pickupDate = month && day && year
      ? `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      : "";
    if (pickupDate) {
      const [dateYear, dateMonth, dateDay] = pickupDate.split("-").map(Number);
      const parsedDate = new Date(dateYear, dateMonth - 1, dateDay);
      if (
        parsedDate.getFullYear() !== dateYear ||
        parsedDate.getMonth() !== dateMonth - 1 ||
        parsedDate.getDate() !== dateDay
      ) {
        setDialog({ type: "error", message: "Enter a valid pickup date." });
        setSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recaptchaToken,
          name: values.get("name"),
          email: values.get("email"),
          phone: values.get("phone"),
          pickupDate,
          pickupTime: values.get("pickupTime"),
          eventType: values.get("eventType"),
          vehicle: values.get("vehicle"),
          passengers: values.get("passengers"),
          stops: values.get("stops"),
          pickupPlace: values.get("pickupPlace"),
          dropoffPlace: values.get("dropoffPlace"),
          serviceHours: values.get("serviceHours"),
          instructions: values.get("instructions"),
          consent: values.get("consent") === "on",
          qf_8a1d: values.get("qf_8a1d"),
        }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        const message = result.message ?? "We couldn't submit your request. Please review the form and try again.";
        setDialog({ type: response.status === 503 ? "notice" : "error", message });
        recaptchaRef.current?.reset();
        return;
      }
      form.reset();
      recaptchaRef.current?.reset();
      setDialog({ type: "success", message: result.message ?? "Thank you. Your transportation request was received." });
    } catch {
      setDialog({ type: "error", message: "We couldn't reach the server. Please try again or call 718-397-1333." });
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    <section aria-labelledby="contact-form-title" className="mt-12 overflow-hidden rounded-2xl border border-brand-text/10 bg-white shadow-[0_18px_55px_rgba(41,37,33,0.08)]">
      <div className="border-b border-brand-text/10 bg-brand-soft px-5 py-6 sm:px-8">
        <p className="eyebrow mb-2">Contact and transportation inquiry</p>
        <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl" id="contact-form-title">
          Tell us about your trip
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-muted">
          {isPreviewMode
            ? "Explore the contact form in preview mode. Submissions are disabled."
            : "Complete the details below and the team can review your quote request."}
        </p>
        {isPreviewMode && (
          <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950" role="status">
            Preview mode: this form is for display only. Sending and saving requests are disabled.
          </p>
        )}
      </div>

      <form aria-busy={submitting} className="space-y-8 p-5 sm:p-8" onSubmit={handleSubmit} noValidate>
        <fieldset className="min-w-0">
          <legend className="w-full border-b border-brand-text/10 pb-3 text-lg font-bold text-brand-accent">
            Client Information
          </legend>
          <div className="mt-5 grid min-w-0 gap-5 md:grid-cols-2">
            <Field label="First & Last Name" name="name" required>
              <input id="name" name="name" required maxLength={100} autoComplete="name" className={controlClassName} />
            </Field>
            <Field label="Email" name="email" required>
              <input id="email" name="email" required type="email" maxLength={254} autoComplete="email" className={controlClassName} />
            </Field>
            <Field label="Phone Number" name="phone" required className="md:col-span-2">
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
                aria-describedby="phone-help"
                className={controlClassName}
              />
              <span className="mt-1 block text-xs font-normal text-brand-muted" id="phone-help">
                Include your country code if you are calling from outside the United States.
              </span>
            </Field>
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="w-full border-b border-brand-text/10 pb-3 text-lg font-bold text-brand-accent">
            Event Information
          </legend>
          <div className="mt-5 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <span className="block text-sm font-semibold text-brand-dark">Pick up Date</span>
              <div className="mt-2 grid min-w-0 grid-cols-3 gap-3">
                <label className="sr-only" htmlFor="pickupMonth">Pick up month</label>
                <select id="pickupMonth" name="pickupMonth" className={controlClassName.replace("mt-2 ", "")} defaultValue="">
                  <option value="">Month</option>
                  {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                </select>
                <label className="sr-only" htmlFor="pickupDay">Pick up day</label>
                <input id="pickupDay" name="pickupDay" type="number" min="1" max="31" step="1" inputMode="numeric" className={controlClassName.replace("mt-2 ", "")} placeholder="Day" aria-label="Pick up day" />
                <input id="pickupYear" name="pickupYear" type="text" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} className={controlClassName.replace("mt-2 ", "")} placeholder="Year" aria-label="Pick up year" />
              </div>
              <p className="mt-1 text-xs text-brand-muted">Optional. If you enter a date, select a month, day and year.</p>
            </div>

            <Field label="Pick up Time" name="pickupTime">
              <input id="pickupTime" name="pickupTime" type="time" className={controlClassName} />
            </Field>
            <Field label="Event Type" name="eventType">
              <select id="eventType" name="eventType" defaultValue="" className={controlClassName}>
                <option value="">Select One</option>
                {eventTypes.map((eventType) => <option key={eventType} value={eventType}>{eventType}</option>)}
              </select>
            </Field>
            <Field label="Select Vehicle" name="vehicle">
              <select id="vehicle" name="vehicle" defaultValue="" className={controlClassName}>
                <option value="">Select a vehicle</option>
                {vehicleOptions.map((vehicle) => <option key={vehicle} value={vehicle}>{vehicle}</option>)}
              </select>
            </Field>
            <Field label="Number of Passengers" name="passengers">
              <input id="passengers" name="passengers" type="number" min="1" max="999" step="1" inputMode="numeric" className={controlClassName} />
            </Field>
            <Field label="Add stop" name="stops">
              <input id="stops" name="stops" type="number" min="0" max="999" step="1" inputMode="numeric" className={controlClassName} />
            </Field>
            <Field label="Service Hours" name="serviceHours">
              <input id="serviceHours" name="serviceHours" type="number" min="1" max="999" step="1" inputMode="numeric" className={controlClassName} />
            </Field>
            <Field label="Pick up Place" name="pickupPlace" className="sm:col-span-2 lg:col-span-3">
              <input id="pickupPlace" name="pickupPlace" maxLength={200} autoComplete="street-address" className={controlClassName} />
            </Field>
            <Field label="Drop off Place" name="dropoffPlace" className="sm:col-span-2 lg:col-span-3">
              <input id="dropoffPlace" name="dropoffPlace" maxLength={200} className={controlClassName} />
            </Field>
            <Field label="Question / Special Instructions" name="instructions" className="sm:col-span-2 lg:col-span-3">
              <textarea id="instructions" name="instructions" rows={5} maxLength={3000} className={`${controlClassName} min-h-32 py-3`} />
            </Field>
          </div>
        </fieldset>

        <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor="qf_8a1d">Leave this field empty</label>
          <input
            id="qf_8a1d"
            name="qf_8a1d"
            type="text"
            tabIndex={-1}
            autoComplete="new-password"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        <div className="rounded-xl border border-brand-primary/15 bg-brand-soft/70 p-4 sm:p-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-brand-text">
            <input
              name="consent"
              type="checkbox"
              required
              className="mt-1 h-5 w-5 shrink-0 accent-brand-primary"
            />
            <span>
              I agree that NY Travel Limo may use the information I provide to respond to my request.
              Read the <a className="text-link" href="/privacy-policy">Privacy Policy</a>.
              <span aria-hidden="true" className="ml-1 text-brand-primary">*</span>
              <span className="sr-only"> Required</span>
            </span>
          </label>
        </div>

        {submitting && (
          <p aria-live="polite" className="text-sm font-semibold text-brand-accent" role="status">
            Submitting your request…
          </p>
        )}

        {!isPreviewMode && <RecaptchaCheckbox ref={recaptchaRef} onTokenChange={setRecaptchaToken} />}

        <div className="flex flex-col gap-3 border-t border-brand-text/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-brand-muted">
            Required fields are marked <span className="font-bold text-brand-primary">*</span>.
          </p>
          <button
            disabled={isPreviewMode || submitting || !recaptchaToken || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            type="submit"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-brand-secondary px-9 py-3 text-base font-bold text-brand-accent shadow-sm transition hover:bg-brand-accent hover:text-brand-secondary focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {isPreviewMode ? "Sending disabled in preview" : submitting ? "Submitting…" : "Submit Request"}
          </button>
        </div>
      </form>
    </section>
    {dialog && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/70 p-4 backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) setDialog(null);
        }}
      >
        <div
          aria-describedby="contact-form-dialog-message"
          aria-labelledby="contact-form-dialog-title"
          aria-modal="true"
          className="w-full max-w-md rounded-2xl border border-brand-text/10 bg-white p-6 shadow-2xl sm:p-8"
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.preventDefault();
              dialogCloseRef.current?.focus();
            }
          }}
          role={dialog.type === "error" ? "alertdialog" : "dialog"}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${
            dialog.type === "success"
              ? "bg-brand-soft text-brand-primary"
              : dialog.type === "error"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-800"
          }`} aria-hidden="true">
            {dialog.type === "success" ? "✓" : dialog.type === "error" ? "!" : "i"}
          </div>
          <h2 className="mt-5 text-2xl font-bold text-brand-dark" id="contact-form-dialog-title">
            {dialog.type === "success" ? "Message sent" : dialog.type === "error" ? "Unable to send" : "Please note"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-brand-muted" id="contact-form-dialog-message">
            {dialog.message}
          </p>
          <button
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-primary focus-visible:outline-offset-4"
            onClick={() => setDialog(null)}
            ref={dialogCloseRef}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    )}
    </>
  );
}
