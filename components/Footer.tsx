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

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/NEWYORKTRAVELLIMO/", icon: "facebook" },
  { label: "X", href: "https://x.com/i/jf/onboarding/web?mode=login&redirect_after_login=%2FNYTravelLimo", icon: "x" },
  { label: "Pinterest", href: "https://co.pinterest.com/NYTravellimoCorp/", icon: "pinterest" },
  { label: "Instagram", href: "https://www.instagram.com/nytravellimo/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@NYTravelLimo", icon: "youtube" },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  if (name === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="19" fill="currentColor" />
        <path d="M22.4 34V21.7h4.1l.6-4.8h-4.7v-3.1c0-1.4.4-2.3 2.4-2.3h2.6V7.2c-.5-.1-2.1-.2-4-.2-4 0-6.7 2.4-6.7 6.9v3h-4.5v4.8h4.5V34h5.7Z" fill="var(--color-brand-dark)" />
      </svg>
    );
  }

  if (name === "x") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10" fill="currentColor">
        <path d="M6.3 5h8.2l7.5 10 8.8-10h3.1L23.4 17l10.3 18h-8.2l-8.2-11-9.7 11H4.5l11.5-13.2L6.3 5Zm5.3 2.5 15.2 25h2.1L13.7 7.5h-2.1Z" />
      </svg>
    );
  }

  if (name === "pinterest") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="19" fill="currentColor" />
        <path d="M18.2 27.2c-.7 3.7-1.6 7.3-4.1 9.2-.8-5.5 1.2-9.6 2.1-14-.4-.8-.5-1.9-.2-3 .6-2.4 3.5-3.7 4.9-1.4 1.7 2.7-1.5 7.7.7 9 2.5 1.5 7.1-5.2 6.6-10.8-.4-4.4-5.1-6.6-9.5-4.8-5 2-6.1 7.4-4 10.2.5.7 1.6 1.1 1.3 2.3-.2.8-.4 1.6-1.3 1.3-2.3-.7-3.5-3.3-3.6-6-.2-6.3 5.6-10.7 11-11.3 6.2-.7 11.7 3.4 12.1 9.4.4 6.8-3.7 14.2-10.1 14.1-1.7 0-3.2-.9-4.1-2.2-.5 2.5-1 4.8-2.2 6.6-1.1.1-2.2.1-3.3-.1.9-3 1.8-6.1 2.7-9.2Z" fill="var(--color-brand-dark)" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="3.2">
        <rect x="4" y="4" width="32" height="32" rx="9" />
        <circle cx="20" cy="20" r="7.5" />
        <circle cx="29.5" cy="10.8" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10">
      <path d="M37.2 11.4a4.6 4.6 0 0 0-3.2-3.2C31.2 7.4 20 7.4 20 7.4s-11.2 0-14 .8a4.6 4.6 0 0 0-3.2 3.2C2 14.2 2 20 2 20s0 5.8.8 8.6A4.6 4.6 0 0 0 6 31.8c2.8.8 14 .8 14 .8s11.2 0 14-.8a4.6 4.6 0 0 0 3.2-3.2C38 25.8 38 20 38 20s0-5.8-.8-8.6Z" fill="currentColor" />
      <path d="m16.5 26 9.3-6-9.3-6v12Z" fill="var(--color-brand-dark)" />
    </svg>
  );
}

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
          <nav
            aria-label="Social media"
            className="mt-6 flex flex-wrap items-center gap-4 text-brand-secondary [&_svg]:h-10 [&_svg]:w-10"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                aria-label={`NY Travel Limo on ${link.label}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-brand-dark"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <SocialIcon name={link.icon} />
              </a>
            ))}
          </nav>
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
            <a
              className="underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              href="https://maps.app.goo.gl/DdHar5D8wdmmSgbZ8"
              rel="noopener noreferrer"
              target="_blank"
            >
              358 W 56th St, Suite 4D
              <br />
              New York, NY 10019
            </a>
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
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-3">
              <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/sitemap">Sitemap</a>
              <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/privacy-policy">Privacy Policy</a>
              <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/cookie-policy">Cookie Policy</a>
              <a className="transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary" href="/terms-and-conditions">Terms and Conditions</a>
              <CookieSettingsButton />
            </nav>
            <a
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-brand-secondary/60 px-4 py-2 font-bold text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              href="#top"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2">
                <path d="m4 11 6-6 6 6M10 5v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
