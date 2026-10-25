"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fleetOptions, servicePages } from "@/lib/site-content";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: servicePages.filter((page) => page.slug !== "contact-us") },
  { label: "Fleet", href: "/fleet", menu: fleetOptions.map((vehicle) => ({ title: vehicle.title, slug: vehicle.href.slice(1) })) },
  { label: "Rates", href: "/rates" },
 // { label: "Reservations", href: "/reservations" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
];

const serviceLabels: Record<string, string> = {
  "airport-transportation-services-in-nyc-with-professional-chauffeurs": "Airport Transportation",
  "corporate-transportation-service-with-driver-in-new-york": "Corporate Transportation",
  "roadshow-transportation-nyc": "Roadshow Transportation",
  "cruise-terminal-transportation-services-in-new-york-with-driver": "Cruise Terminal Transportation",
  "luxury-wedding-transportation-in-nyc-with-chauffeur-driven-sprinter-vans": "Wedding Transportation",
  "transportation-by-hours-in-new-york": "Hourly Transportation Services",
  "new-york-city-tour-with-professional-chauffeurs": "Private NYC Tours",
  "point-to-point-transportation-service-in-new-york": "Point-to-Point Transportation",
  "wine-tours-transportation-service-from-new-york": "Wine Tour Transportation",
  "group-transportation-in-new-york-near-me": "Group Transportation",
};

export default function NavigationLinks() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-4 xl:gap-5 lg:flex">
      {navigation.map((item) => {
        const active = pathname === item.href || (item.menu && item.menu.some((entry) => pathname === `/${entry.slug}`));
        return (
          <div className="relative flex items-center gap-1" key={item.href}>
            <a
              aria-current={pathname === item.href ? "page" : undefined}
              className={`relative inline-flex items-center gap-1 py-3 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-primary after:transition-transform hover:text-brand-primary hover:after:scale-x-100 focus-visible:text-brand-primary focus-visible:after:scale-x-100 ${active ? "text-brand-primary after:scale-x-100" : "text-brand-accent"}`}
              href={item.href}
            >
              {item.label}
            </a>
            {item.menu && (
              <>
              <button
                type="button"
                aria-label={`${item.label} submenu`}
                aria-expanded={openMenu === item.href}
                aria-haspopup="true"
                aria-controls={`desktop-menu-${item.href.slice(1)}`}
                onClick={() => setOpenMenu((current) => current === item.href ? null : item.href)}
                className="inline-flex min-h-10 min-w-8 items-center justify-center rounded text-brand-secondary hover:bg-brand-soft focus-visible:outline-offset-2"
              >
                <svg aria-hidden="true" className={`h-3 w-3 transition-transform ${openMenu === item.href ? "rotate-180" : ""}`} fill="none" viewBox="0 0 12 8">
                  <path d="m1 1.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </button>
              <div id={`desktop-menu-${item.href.slice(1)}`} hidden={openMenu !== item.href} className="absolute left-0 top-full z-50 w-max min-w-[21rem] max-w-[min(28rem,90vw)] rounded-b-2xl border-t-[3px] border-brand-secondary bg-brand-accent px-5 py-4 shadow-xl">
                <ul className="max-h-[min(70vh,32rem)] space-y-0.5 overflow-y-auto">
                  {item.menu.map((entry) => {
                    const slug = "slug" in entry ? entry.slug : "";
                    const href = item.href === "/fleet" ? `/${slug}` : `/${slug}`;
                    const label = item.href === "/fleet"
                      ? entry.title
                      : serviceLabels[slug] ?? entry.title;
                    return (
                      <li key={href}>
                        <a
                          aria-current={pathname === href ? "page" : undefined}
                          className="block px-1 py-2.5 text-base font-medium text-white transition-colors hover:text-brand-secondary focus-visible:text-brand-secondary aria-[current=page]:text-brand-secondary"
                          href={href}
                          onClick={() => setOpenMenu(null)}
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
