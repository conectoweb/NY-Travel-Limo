"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="underline underline-offset-4 hover:text-white"
      onClick={() => window.dispatchEvent(new Event("nytl:cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}
