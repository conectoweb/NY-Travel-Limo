"use client";

import { useEffect, useState } from "react";

type Consent = { necessary: true; analytics: boolean; advertising: boolean };
const STORAGE_KEY = "nytl-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(STORAGE_KEY) === null);
    } catch {
      setVisible(true);
      setStorageError("Your browser could not save this choice. Please review your browser storage settings.");
    }

    function openPreferences() {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            const values = parsed as Record<string, unknown>;
            setAnalytics(values.analytics === true);
            setAdvertising(values.advertising === true);
          }
        }
      } catch {
        setStorageError("Your saved cookie choice could not be read. Please make a new selection.");
      }
      setVisible(true);
      setPreferencesOpen(true);
    }
    window.addEventListener("nytl:cookie-settings", openPreferences);
    return () => window.removeEventListener("nytl:cookie-settings", openPreferences);
  }, []);

  function saveConsent(consent: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      setStorageError("");
      setVisible(false);
      setPreferencesOpen(false);
    } catch {
      setStorageError("We could not save your choice. Check your browser storage settings and try again.");
    }
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-xl border border-brand-text/15 bg-white p-5 shadow-2xl sm:inset-x-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-lg font-bold text-brand-dark">Your cookie choices</h2>
          <p className="mt-2 text-sm leading-6 text-brand-muted">
            Essential browser storage remembers your choice. Optional analytics and advertising
            technologies are not currently configured on this website.
          </p>
          {storageError && <p role="alert" className="mt-2 text-sm font-semibold text-red-800">{storageError}</p>}
        </div>
        <div className="flex flex-col gap-2 sm:min-w-52">
          <button type="button" className="min-h-11 rounded-full bg-brand-accent px-5 text-sm font-bold text-white hover:bg-brand-primary" onClick={() => saveConsent({ necessary: true, analytics: true, advertising: true })}>
            Accept all
          </button>
          <button type="button" className="min-h-11 rounded-full border border-brand-primary px-5 text-sm font-bold text-brand-accent hover:bg-brand-soft" onClick={() => saveConsent({ necessary: true, analytics: false, advertising: false })}>
            Reject non-essential
          </button>
          <button type="button" className="min-h-11 text-sm font-bold text-brand-accent underline underline-offset-4" aria-expanded={preferencesOpen} onClick={() => setPreferencesOpen((open) => !open)}>
            Cookie preferences
          </button>
        </div>
      </div>
      {preferencesOpen && (
        <div className="mt-5 border-t border-brand-text/10 pt-4">
          <h3 className="font-bold text-brand-dark">Choose optional categories</h3>
          <label className="mt-3 flex min-h-11 items-center justify-between gap-4 text-sm">
            <span><span className="font-semibold">Strictly necessary</span><span className="block text-brand-muted">Always active; stores your consent choice.</span></span>
            <input type="checkbox" checked readOnly aria-label="Strictly necessary cookies always active" />
          </label>
          <label className="mt-2 flex min-h-11 items-center justify-between gap-4 text-sm">
            <span><span className="font-semibold">Analytics</span><span className="block text-brand-muted">Not currently configured.</span></span>
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
          </label>
          <label className="mt-2 flex min-h-11 items-center justify-between gap-4 text-sm">
            <span><span className="font-semibold">Advertising</span><span className="block text-brand-muted">Not currently configured.</span></span>
            <input type="checkbox" checked={advertising} onChange={(event) => setAdvertising(event.target.checked)} />
          </label>
          <button type="button" className="mt-4 min-h-11 rounded-full bg-brand-accent px-5 text-sm font-bold text-white hover:bg-brand-primary" onClick={() => saveConsent({ necessary: true, analytics, advertising })}>
            Save preferences
          </button>
        </div>
      )}
    </aside>
  );
}
