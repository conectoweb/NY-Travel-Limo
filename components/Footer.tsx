import { PhoneLinks } from "@/components/PhoneLinks";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { ReservationLink } from "@/components/Header";

const exploreLinks = [
  { label: "Sprinter Vans", href: "/sprinter-van-rental-with-driver-new-york-nyc" },
  { label: "SUVs", href: "/luxury-suv-rental-nyc" },
  { label: "Limousines", href: "/lincoln-stretch-limo-rental-nyc" },
  { label: "Airport Transportation", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
  { label: "Corporate Transportation", href: "/corporate-transportation-service-with-driver-in-new-york" },
  { label: "Corporate Roadshows", href: "/roadshow-transportation-nyc" },
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
];

const companyLinks = [
  { label: "Rates", href: "/rates" },
  { label: "About Us", href: "/about-us" },
  { label: "Frequently Asked Questions", href: "/frequently-asked-questions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-brand-secondary bg-brand-dark text-white" id="contact">
      <div className="mx-auto grid max-w-content items-start gap-x-8 gap-y-10 px-5 pb-12 pt-14 sm:px-8 sm:pb-14 sm:pt-16 md:grid-cols-2 lg:grid-cols-[1.05fr_1.8fr_0.9fr_1fr] lg:gap-x-10">
        <div>
          <a aria-label="NY Travel Limo home" href="/">
            <span className="font-display text-3xl font-bold">NY Travel <span className="text-brand-secondary">Limo</span></span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
            Private chauffeur transportation in New York City, with Mercedes-Benz Sprinter Vans,
            SUVs and limousines.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8">
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-secondary">
              Explore
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-secondary">
              Company
            </h2>
            <ul className="space-y-3 text-sm text-white/80">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-secondary">
            Our location
          </h2>
          <address className="text-sm not-italic leading-6 text-white/80">
            358 W 56th St, Suite 4D
            <br />
            New York, NY 10019
          </address>
          <a
            className="mt-3 inline-block text-sm font-semibold text-white/80 underline decoration-brand-secondary underline-offset-4 hover:text-brand-secondary"
            href="/contact-us"
          >
            Contact NY Travel Limo
          </a>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-secondary">
            Contact
          </h2>
          <PhoneLinks compact />
          <ReservationLink className="mt-5" />
        </div>
      </div>
      <div className="border-t border-white/15 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-content flex-col gap-4 text-xs text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NY Travel Limo. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-3">
            <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/sitemap">Sitemap</a>
            <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/privacy-policy">Privacy Policy</a>
            <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/cookie-policy">Cookie Policy</a>
            <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/terms-and-conditions">Terms and Conditions</a>
            <CookieSettingsButton />
          </nav>
        </div>
      </div>
    </footer>
  );
}
