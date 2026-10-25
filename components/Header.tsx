import Image from "next/image";
import { PhoneLinks } from "@/components/PhoneLinks";
import MobileMenu from "@/components/MobileMenu";
import NavigationLinks from "@/components/NavigationLinks";

const mobileNavigation = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    menu: [
      { label: "Airport Transfers", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
      { label: "Corporate Transportation", href: "/corporate-transportation-service-with-driver-in-new-york" },
      { label: "Roadshow Transportation", href: "/roadshow-transportation-nyc" },
      { label: "Cruise Terminal Transfers", href: "/cruise-terminal-transportation-services-in-new-york-with-driver" },
      { label: "Wedding Transportation", href: "/luxury-wedding-transportation-in-nyc-with-chauffeur-driven-sprinter-vans" },
      { label: "Hourly Transportation", href: "/transportation-by-hours-in-new-york" },
      { label: "City Tours", href: "/new-york-city-tour-with-professional-chauffeurs" },
      { label: "Point-to-Point Transportation", href: "/point-to-point-transportation-service-in-new-york" },
      { label: "Wine Tours", href: "/wine-tours-transportation-service-from-new-york" },
      { label: "Group Transportation", href: "/group-transportation-in-new-york-near-me" },
    ],
  },
  {
    label: "Fleet",
    href: "/fleet",
    menu: [
      { label: "Sprinter Vans", href: "/sprinter-van-rental-with-driver-new-york-nyc" },
      { label: "SUVs", href: "/luxury-suv-rental-nyc" },
      { label: "Limousines", href: "/lincoln-stretch-limo-rental-nyc" },
    ],
  },
  { label: "Rates", href: "/rates" },
  { label: "Reservations", href: "/reservations" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
  { label: "Reservation Now", href: "/reservations", emphasized: true },
];

export function QuoteLink({
  className = "",
  label = "Reservation Now",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-secondary px-7 py-3 text-sm font-bold text-brand-accent shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent hover:text-brand-secondary hover:shadow-md ${className}`}
      href="/reservations"
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Header() {
  return (
    <header className="relative z-30">
      <div className="bg-brand-dark px-5 py-2 text-xs text-white sm:px-8">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="font-semibold text-white/85">
            <span aria-hidden="true" className="mr-1 text-brand-secondary">✦</span>
            instant quote — no commitment
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span className="text-white/65">Call:</span>
            <PhoneLinks />
          </div>
        </div>
      </div>

      <div className="border-b border-brand-text/10 bg-brand-light">
        <div className="mx-auto flex max-w-content items-center justify-between gap-5 px-5 py-3 sm:px-8 sm:py-4">
          <a aria-label="NY Travel Limo home" className="flex shrink-0 items-center" href="/">
            <Image
              src="/images/Logo NY Travel Limo.png"
              alt="NY Travel Limo"
              width={200}
              height={44}
              className="h-11 w-[200px] object-contain"
              priority
            />
          </a>
          <NavigationLinks />
          <div className="hidden shrink-0 lg:block">
            <QuoteLink />
          </div>
          <MobileMenu navigation={mobileNavigation} />
        </div>
      </div>
    </header>
  );
}
