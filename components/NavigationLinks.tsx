"use client";

import { usePathname } from "next/navigation";
import { fleetOptions, servicePages } from "@/lib/site-content";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: servicePages.filter((page) => page.slug !== "contact-us") },
  { label: "Fleet", href: "/fleet", menu: fleetOptions.map((vehicle) => ({ title: vehicle.title, slug: vehicle.href.slice(1) })) },
  { label: "Rates", href: "/rates" },
  { label: "Reservations", href: "/reservations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
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

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
      {navigation.map((item) => {
        const active = pathname === item.href || (item.menu && item.menu.some((entry) => pathname === `/${entry.slug}`));
        return (
          <div className="group relative flex items-center" key={item.href}>
            <a
              aria-current={pathname === item.href ? "page" : undefined}
              className={`relative inline-flex items-center gap-2 py-3 text-[1.1rem] font-medium transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-primary after:transition-transform hover:text-brand-primary hover:after:scale-x-100 focus-visible:text-brand-primary focus-visible:after:scale-x-100 ${active ? "text-brand-primary after:scale-x-100" : "text-brand-accent"}`}
              href={item.href}
            >
              {item.label}
              {item.menu && (
                <svg aria-hidden="true" className="h-3 w-3 text-brand-secondary transition-transform group-hover:rotate-180 group-focus-within:rotate-180" fill="none" viewBox="0 0 12 8">
                  <path d="m1 1.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              )}
            </a>
            {item.menu && (
              <div className="invisible absolute left-0 top-full z-50 w-max min-w-[21rem] max-w-[min(28rem,90vw)] -translate-y-1 rounded-b-2xl border-t-[3px] border-brand-secondary bg-brand-accent px-5 py-4 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
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
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
