import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PhoneLinks } from "@/components/PhoneLinks";
import { reservationUrl } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NY Travel Limo",
  description:
    "The page you are looking for could not be found. Explore NY Travel Limo's luxury chauffeur services, Sprinter van rentals, and private transportation across NYC.",
  robots: {
    index: false,
    follow: true,
  },
};

const popularServices = [
  {
    title: "Airport Transportation",
    description: "Private pickups and transfers to JFK, LaGuardia, and Newark.",
    href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
  },
  {
    title: "Sprinter Van Rental",
    description: "Luxury 10- to 14-passenger vans with professional chauffeurs.",
    href: "/sprinter-van-rental-with-driver-new-york-nyc",
  },
  {
    title: "Corporate Transportation",
    description: "Executive travel, meetings, and business itineraries in NYC.",
    href: "/corporate-transportation-service-with-driver-in-new-york",
  },
  {
    title: "Funeral Family Transportation",
    description: "Dignified passenger travel for families and memorial guests.",
    href: "/funeral-transportation-services-nyc-dignified-professional",
  },
  {
    title: "Group Transportation",
    description: "Coordinated travel for events, weddings, outings, and teams.",
    href: "/group-transportation-in-new-york-near-me",
  },
  {
    title: "Hourly Chauffeur Service",
    description: "Flexible, dedicated vehicles and drivers by the hour.",
    href: "/transportation-by-hours-in-new-york",
  },
];

const fleetLinks = [
  { label: "Mercedes-Benz Sprinter Vans", href: "/sprinter-van-rental-with-driver-new-york-nyc" },
  { label: "Private Luxury SUVs", href: "/luxury-suv-rental-nyc" },
  { label: "Lincoln Stretch Limousines", href: "/lincoln-stretch-limo-rental-nyc" },
  { label: "Explore Our Full Fleet", href: "/fleet" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-brand-soft">
        {/* Hero Section */}
        <section
          aria-labelledby="not-found-title"
          className="services-hero-enter relative isolate flex min-h-[38rem] overflow-hidden bg-brand-dark px-5 py-20 text-white sm:px-8 sm:py-28"
        >
          <Image
            alt="New York City street with luxury chauffeur vehicle"
            className="absolute inset-0 z-0 object-cover object-center opacity-40"
            fill
            priority
            sizes="100vw"
            src="/images/nyc-sprinter-van-hero.avif"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(41,37,33,0.92)_0%,rgba(9,79,89,0.78)_55%,rgba(41,37,33,0.92)_100%)]"
          />

          <div className="relative z-20 mx-auto flex w-full max-w-content flex-col items-center text-center">
            <span className="font-display text-7xl font-extrabold tracking-tight text-brand-secondary sm:text-9xl">
              404
            </span>
            <p className="eyebrow mt-3 mb-4 text-xs sm:text-sm">Destination Not Found</p>
            <h1
              className="max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-5xl"
              id="not-found-title"
            >
              We couldn&apos;t find the route you&apos;re looking for.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              The page may have been moved, renamed, or is no longer available. Let us help get your
              New York travel plans back on schedule.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-secondary px-7 py-3 text-sm font-bold text-brand-accent shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                href="/"
              >
                Back to Homepage
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                href="/services"
              >
                Explore Services <span aria-hidden="true" className="ml-1.5">↗</span>
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-secondary/70 px-7 py-3 text-sm font-bold text-brand-secondary transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-secondary hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                href="/contact-us"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section aria-labelledby="suggested-routes-title" className="section-pad bg-white">
          <div className="mx-auto max-w-content">
            <div className="mb-10 text-center sm:mb-12">
              <p className="eyebrow mb-3">Popular Destinations</p>
              <h2 className="section-heading mx-auto text-3xl sm:text-4xl" id="suggested-routes-title">
                Where would you like to travel next?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-muted">
                Choose from our most requested chauffeured services or explore our luxury vehicle fleet.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {popularServices.map((service) => (
                <Link
                  className="group flex flex-col justify-between rounded-xl border border-brand-text/10 bg-brand-soft/40 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/40 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  href={service.href}
                  key={service.href}
                >
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark transition-colors group-hover:text-brand-primary">
                      {service.title} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                      {service.description}
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-accent underline decoration-brand-secondary underline-offset-4">
                    Learn More
                  </span>
                </Link>
              ))}
            </div>

            {/* Quick Fleet Links Bar */}
            <div className="mt-10 rounded-2xl border border-brand-primary/20 bg-brand-soft p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="eyebrow mb-1">Our Vehicles</p>
                  <h3 className="text-xl font-bold text-brand-dark">
                    Looking for a specific vehicle?
                  </h3>
                  <p className="mt-1 text-sm text-brand-muted">
                    Compare Sprinter vans, private SUVs, and stretch limousines with professional drivers.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {fleetLinks.map((fleet) => (
                    <li key={fleet.href}>
                      <Link
                        className="inline-block rounded-lg border border-brand-text/15 bg-white px-4 py-2.5 text-xs font-bold text-brand-dark transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary hover:shadow-sm"
                        href={fleet.href}
                      >
                        {fleet.label} <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Assistance CTA Bar */}
        <section aria-labelledby="direct-help-title" className="border-t border-brand-text/10 bg-brand-accent px-5 py-12 text-white sm:px-8 sm:py-14">
          <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <p className="eyebrow mb-2 text-brand-secondary">Need Immediate Assistance?</p>
              <h2 className="text-2xl font-bold sm:text-3xl" id="direct-help-title">
                Speak directly with our 24/7 reservation team
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Call us anytime for urgent bookings, airport pickups, or customized itineraries.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <PhoneLinks compact />
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-secondary px-6 py-2.5 text-sm font-bold text-brand-accent shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                href={reservationUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Book Online Now <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

