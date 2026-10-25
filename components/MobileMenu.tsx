"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PhoneLinks } from "@/components/PhoneLinks";

type NavigationItem = {
  label: string;
  href: string;
  emphasized?: boolean;
  menu?: { label: string; href: string }[];
};

export default function MobileMenu({ navigation }: { navigation: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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
              {navigation.map((item) => {
                const active = pathname === item.href || item.menu?.some((link) => pathname === link.href);
                const expanded = openSubmenu === item.href;
                return (
                  <li key={`${item.label}-${item.href}`}>
                    <div className="flex items-center gap-2">
                      {item.emphasized ? (
                        <a
                          aria-current={pathname === item.href ? "page" : undefined}
                          className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-secondary px-5 py-3 font-bold text-brand-accent shadow-sm transition hover:bg-white focus-visible:outline-offset-4"
                          href={item.href}
                          onClick={() => setOpen(false)}
                        >
                          {item.label} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <>
                          <a
                            aria-current={active ? "page" : undefined}
                            className={`block flex-1 border-b border-white/20 px-3 py-3 font-semibold transition-colors hover:text-brand-secondary focus-visible:text-brand-secondary aria-[current=page]:text-brand-secondary aria-[current=page]:underline aria-[current=page]:decoration-brand-secondary aria-[current=page]:underline-offset-4 ${active ? "text-brand-secondary" : "text-white"}`}
                            href={item.href}
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </a>
                          {item.menu && (
                            <button
                              type="button"
                              aria-label={`${item.label} submenu`}
                              aria-expanded={expanded}
                              aria-controls={`mobile-submenu-${item.label.toLowerCase()}`}
                              onClick={() => setOpenSubmenu(expanded ? null : item.href)}
                              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/25 text-brand-secondary"
                            >
                              <svg aria-hidden="true" className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 12 8">
                                <path d="m1 1.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    {item.menu && (
                      <ul id={`mobile-submenu-${item.label.toLowerCase()}`} hidden={!expanded} className="ml-3 border-l border-brand-secondary/50 py-1 pl-3">
                        {item.menu.map((link) => (
                          <li key={link.href}>
                            <a
                              aria-current={pathname === link.href ? "page" : undefined}
                              className="block rounded px-3 py-2.5 text-sm text-white/85 hover:text-brand-secondary focus-visible:text-brand-secondary aria-[current=page]:font-bold aria-[current=page]:text-brand-secondary"
                              href={link.href}
                              onClick={() => setOpen(false)}
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-5 border-t border-white/20 pt-5 text-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/70">Call us</p>
            <PhoneLinks compact />
          </div>
      </div>
    </div>
  );
}
