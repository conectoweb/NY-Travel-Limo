"use client";

import Script from "next/script";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

export type RecaptchaCheckboxHandle = {
  reset: () => void;
};

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const RecaptchaCheckbox = forwardRef<
  RecaptchaCheckboxHandle,
  { onTokenChange: (token: string) => void }
>(function RecaptchaCheckbox({ onTokenChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const tokenCallbackRef = useRef(onTokenChange);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [captchaMessage, setCaptchaMessage] = useState("");
  const [scriptAttempt, setScriptAttempt] = useState(0);

  useEffect(() => {
    tokenCallbackRef.current = onTokenChange;
  }, [onTokenChange]);

  useImperativeHandle(ref, () => ({
    reset() {
      tokenCallbackRef.current("");
      setCaptchaMessage("");
      if (widgetIdRef.current !== null) {
        window.grecaptcha?.reset(widgetIdRef.current);
      }
    },
  }), []);

  useEffect(() => {
    if (!siteKey || !scriptLoaded || !containerRef.current || widgetIdRef.current !== null) {
      return;
    }
    if (!window.grecaptcha) {
      setScriptFailed(true);
      setCaptchaMessage("reCAPTCHA could not be loaded. Check your connection and try again.");
      return;
    }

    let cancelled = false;
    const recaptcha = window.grecaptcha;
    recaptcha.ready(() => {
      const container = containerRef.current;
      if (cancelled || !container || widgetIdRef.current !== null) return;

      try {
        widgetIdRef.current = recaptcha.render(container, {
          sitekey: siteKey,
          callback: (token) => {
            setCaptchaMessage("");
            tokenCallbackRef.current(token);
          },
          "expired-callback": () => {
            tokenCallbackRef.current("");
            setCaptchaMessage("reCAPTCHA expired. Please check “I'm not a robot” again.");
          },
          "error-callback": () => {
            tokenCallbackRef.current("");
            setCaptchaMessage("reCAPTCHA could not be verified. Please retry the checkbox.");
          },
        });
      } catch (error) {
        console.error("reCAPTCHA checkbox initialization failed.", error);
        setScriptFailed(true);
        setCaptchaMessage("reCAPTCHA could not be initialized. Please retry the checkbox.");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [scriptLoaded]);

  function retryCaptcha() {
    setCaptchaMessage("");
    setScriptFailed(false);
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    } else {
      setScriptLoaded(false);
      setScriptAttempt((attempt) => attempt + 1);
    }
  }

  return (
    <div className="space-y-2" aria-label="reCAPTCHA verification" role="group">
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=explicit&retry=${scriptAttempt}`}
          strategy="afterInteractive"
          onReady={() => setScriptLoaded(true)}
          onError={() => {
            setScriptFailed(true);
            setCaptchaMessage("reCAPTCHA could not be loaded. Check your connection and try again.");
          }}
        />
      )}
      {!siteKey ? (
        <p className="max-w-xl rounded-lg border border-brand-text/10 bg-brand-soft px-4 py-3 text-sm leading-6 text-brand-muted" role="status">
          Online verification is temporarily unavailable. Please try again later or call 718-397-1333.
        </p>
      ) : (
        <>
          <div className="max-w-full overflow-x-auto" ref={containerRef} />
          {!scriptLoaded && !scriptFailed && (
            <p className="text-sm text-brand-muted" role="status">Loading reCAPTCHA…</p>
          )}
          {captchaMessage && (
            <p className="text-sm font-medium text-red-800" role="alert">{captchaMessage}</p>
          )}
          {(scriptFailed || captchaMessage) && (
            <button
              className="text-sm font-semibold text-brand-accent underline underline-offset-4"
              onClick={retryCaptcha}
              type="button"
            >
              Retry reCAPTCHA
            </button>
          )}
        </>
      )}
    </div>
  );
});

export default RecaptchaCheckbox;
