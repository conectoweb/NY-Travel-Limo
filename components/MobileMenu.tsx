"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { QuoteLink } from "@/components/Header";
import { PhoneLinks } from "@/components/PhoneLinks";

type NavigationItem = { label: string; href: string };

export default function MobileMenu({ navigation }: { navigation: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function closeOnOutsideClick(event: MouseEvent | TouchEvent) {
      if (event.target instanceof Node && !panelRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
    };
  }, [open]);

  return (
    <div className="relative lg:hidden" ref={panelRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-brand-accent/20 text-brand-accent"
      >
        {open ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="absolute right-0 top-[calc(100%+0.75rem)] z-40 max-h-[calc(100svh-8rem)] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto rounded-b-2xl border-t-[3px] border-brand-secondary bg-brand-accent p-5 text-white shadow-xl"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
        }}
      >
          <nav aria-label="Mobile navigation">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block border-b border-white/20 px-3 py-3 font-semibold text-white transition-colors hover:text-brand-secondary hover:underline hover:decoration-brand-secondary hover:underline-offset-4 focus-visible:text-brand-secondary aria-[current=page]:text-brand-secondary aria-[current=page]:underline aria-[current=page]:decoration-brand-secondary aria-[current=page]:underline-offset-4"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <QuoteLink className="mt-4 w-full" />
          <div className="mt-5 border-t border-white/20 pt-5 text-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/70">Call us</p>
            <PhoneLinks compact />
          </div>
      </div>
    </div>
  );
}
