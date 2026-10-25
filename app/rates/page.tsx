import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header, { QuoteLink, ReservationLink } from "@/components/Header";
import Reviews from "@/components/Reviews";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";

const vanImage = "/images/nyc-sprinter-van-hero.avif";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Sprinter Van Rental Rates in NYC | NY Travel Limo";
  const description =
    "Compare NY Travel Limo Sprinter van, airport, hourly and event rates in New York City, then request a quote for your itinerary.";
  const isPublicSite = await isPublicSiteRequest();
  const url = `${siteUrl}/rates`;

  return {
    title,
    description,
    alternates: isPublicSite ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: isPublicSite ? url : undefined,
      images: [{ url: vanImage, alt: "Sprinter van for private transportation in New York" }],
    },
  };
}

function RateImage({ alt }: { alt: string }) {
  return (
    <div className="relative min-h-64 min-w-0 overflow-hidden rounded-xl bg-brand-accent sm:min-h-80">
      <Image
        src={vanImage}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-dark/45 to-transparent" />
      <span className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-brand-dark/70 px-3 py-1 text-xs font-semibold text-white">
        NY Travel Limo fleet
      </span>
    </div>
  );
}

function RateFeature({
  id,
  eyebrow,
  title,
  description,
  alt,
  reverse = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  alt: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-brand-text/10 py-12 last:border-b-0 sm:py-16">
      <div className={`grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <RateImage alt={alt} />
        <div className="min-w-0">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-brand-dark sm:text-4xl" id={`${id}-title`}>
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-muted">{description}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

function RateTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="max-w-full min-w-0 overflow-x-auto rounded-xl border border-brand-text/10">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <thead className="bg-brand-accent text-white">
          <tr>
            {headers.map((header) => <th className="px-4 py-3 font-bold" key={header} scope="col">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-t border-brand-text/10 odd:bg-white even:bg-brand-soft/70" key={row.join("-")}>
              {row.map((cell, index) => (
                index === 0
                  ? <th className="px-4 py-3 font-semibold text-brand-dark" key={`${cell}-${index}`} scope="row">{cell}</th>
                  : <td className="px-4 py-3 text-brand-text" key={`${cell}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PackageList() {
  return (
    <RateTable
      headers={["Vehicle", "Passengers", "3-hour package", "Additional hour"]}
      rows={[
        ["MKT Limo", "1–10", "$600", "$150"],
        ["Sprinter", "1–14", "$450", "$150"],
      ]}
    />
  );
}

const relatedServices = [
  { label: "Airport transfers", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
  { label: "Cruise terminal transfers", href: "/cruise-terminal-transportation-services-in-new-york-with-driver" },
  { label: "Wedding transportation", href: "/luxury-wedding-transportation-in-nyc-with-chauffeur-driven-sprinter-vans" },
  { label: "Corporate transportation", href: "/corporate-transportation-service-with-driver-in-new-york" },
  { label: "Wine tours", href: "/wine-tours-transportation-service-from-new-york" },
  { label: "Bachelorette and group transportation", href: "/group-transportation-in-new-york-near-me" },
  { label: "City tours", href: "/new-york-city-tour-with-professional-chauffeurs" },
  { label: "Roadshow transportation", href: "/roadshow-transportation-nyc" },
  { label: "Prom and night out limousines", href: "/lincoln-stretch-limo-rental-nyc" },
  { label: "Hourly van rentals", href: "/transportation-by-hours-in-new-york" },
];

export default function RatesPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="rates-hero-title" className="relative isolate overflow-hidden bg-black text-white">
          <Image
            src={vanImage}
            alt="Sprinter van for private chauffeur transportation in New York City"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35" />
          <div className="relative mx-auto flex min-h-[32rem] max-w-content flex-col justify-center px-5 py-20 sm:min-h-[38rem] sm:px-8 sm:py-28">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/70">
              <ol className="flex gap-2">
                <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Rates</li>
              </ol>
            </nav>
            <p className="eyebrow mb-4 text-brand-secondary">NYC private transportation</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl" id="rates-hero-title">
              Sprinter Van Rental Rates in NYC
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Pricing depends on duration, distance, season, event and the services requested. Explore the listed rates and share your itinerary for a personalized quote.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-secondary px-7 py-3 font-bold text-brand-accent transition hover:bg-white" href="#rates">
                View Rates
              </a>
              <QuoteLink className="border border-white/70 bg-transparent text-white hover:bg-white hover:text-brand-dark" label="Get a Quote" />
            </div>
          </div>
        </section>

        <section aria-labelledby="intro-title" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-content gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">NY Travel Limo</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-brand-dark sm:text-4xl" id="intro-title">
                Private chauffeur transportation in NYC and Long Island
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                NY Travel Limo provides private transportation with a chauffeur across New York City and Long Island. Choose a listed rate as a guide, then request a personalized quote for your dates, route and service needs.
              </p>
            </div>
            <QuoteLink label="Request a Custom Quote" />
          </div>
        </section>

        <section id="rates" aria-labelledby="rates-title" className="scroll-mt-16 bg-brand-soft px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-content">
            <div className="mb-4 max-w-3xl">
              <p className="eyebrow mb-3">Service pricing</p>
              <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl" id="rates-title">NYC transportation rates</h2>
              <p className="mt-3 text-base leading-7 text-brand-muted">Review the rates provided for each service. Request a quote to discuss your specific itinerary.</p>
            </div>

            <RateFeature
              id="wine-tours"
              eyebrow="March through November"
              title="Private Wine Tours"
              description="Private 10-hour Sprinter van wine tour. Taxes and gratuity are included. Contact us for pricing."
              alt="NY Travel Limo Sprinter van shown as a temporary image for private wine tour transportation"
            >
              <p className="inline-flex rounded-lg border border-brand-secondary/60 bg-white px-4 py-3 text-lg font-bold text-brand-accent">
                Contact us for pricing
              </p>
            </RateFeature>

            <RateFeature
              id="airport"
              eyebrow="JFK · LGA · EWR"
              title="Airport Transportation"
              description="Airport rates by pickup or destination airport and vehicle. Passenger ranges are shown as provided."
              alt="NY Travel Limo Sprinter van shown as a temporary image for airport transfer pricing"
              reverse
            >
              <RateTable
                headers={["Airport", "Vehicle", "Passengers", "Rate"]}
                rows={[
                  ["LGA", "SUV", "1–6", "$160"],
                  ["LGA", "Sprinter", "1–14", "$360"],
                  ["JFK", "SUV", "1–6", "$160"],
                  ["JFK", "Sprinter", "1–14", "$360"],
                  ["EWR", "SUV", "1–6", "$185"],
                  ["EWR", "Sprinter", "1–14", "$400"],
                ]}
              />
            </RateFeature>

            <RateFeature
              id="hourly"
              eyebrow="Flexible private service"
              title="Hourly Rates"
              description="The Sprinter rate applies within the five boroughs. The 3-hour minimum is listed for Sprinter service only."
              alt="NY Travel Limo Sprinter van shown as a temporary image for hourly transportation pricing"
            >
              <RateTable
                headers={["Vehicle", "Rate", "Minimum"]}
                rows={[
                    ["Sprinter (within five boroughs)", "$150 per hour", "3 hours"],
                    ["Limousines & SUVs (1–6 passengers)", "$90 per hour", "Not specified"],
                ]}
              />
              <p className="mt-3 text-sm leading-6 text-brand-muted">No minimum duration is listed for limousine or SUV hourly service.</p>
            </RateFeature>

            <RateFeature
              id="weddings"
              eyebrow="Within the five boroughs"
              title="Wedding Packages"
              description="Three-hour packages for wedding transportation, with the listed price for each additional hour."
              alt="NY Travel Limo Sprinter van shown as a temporary image for wedding transportation packages"
              reverse
            >
              <PackageList />
            </RateFeature>

            <RateFeature
              id="bachelor-bachelorette"
              eyebrow="Within the five boroughs"
              title="Bachelor and Bachelorette Packages"
              description="Three-hour event packages for bachelor and bachelorette transportation."
              alt="NY Travel Limo Sprinter van shown as a temporary image for group celebration transportation"
            >
              <PackageList />
            </RateFeature>

            <RateFeature
              id="sweet-sixteen"
              eyebrow="Within the five boroughs"
              title="Sweet Sixteen Packages"
              description="Three-hour event packages for Sweet Sixteen transportation."
              alt="NY Travel Limo Sprinter van shown as a temporary image for Sweet Sixteen transportation"
              reverse
            >
              <PackageList />
            </RateFeature>

            <RateFeature
              id="atlantic-city"
              eyebrow="Casino transportation"
              title="Atlantic City Casino"
              description="Sprinter van service for 1–14 passengers between New York and Atlantic City."
              alt="NY Travel Limo Sprinter van shown as a temporary image for Atlantic City casino transportation"
            >
              <RateTable
                headers={["Trip", "Vehicle", "Passengers", "Rate"]}
                rows={[
                  ["One way", "Sprinter", "1–14", "$900"],
                  ["Round trip", "Sprinter", "1–14", "$1,600"],
                ]}
              />
            </RateFeature>

            <section aria-labelledby="amenities-title" className="border-t border-brand-text/10 py-12 sm:py-16">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="eyebrow mb-3">Onboard features</p>
                  <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl" id="amenities-title">Ride amenities</h2>
                  <p className="mt-4 text-base leading-7 text-brand-muted">
                    Netflix, Wi-Fi, air conditioning, a private chauffeur and TV are listed features. Confirm availability of each feature when making your reservation.
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {["Netflix", "Wi-Fi", "Air conditioning", "Private chauffeur", "TV"].map((amenity) => (
                    <li className="flex items-center gap-3 rounded-xl border border-brand-text/10 bg-white p-4 font-semibold text-brand-accent shadow-sm" key={amenity}>
                      <span aria-hidden="true" className="text-brand-primary">✓</span>{amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </section>

        <section aria-labelledby="related-services-title" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-content">
            <p className="eyebrow mb-3">Explore transportation</p>
            <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl" id="related-services-title">Related services</h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <li key={service.href}>
                  <a className="flex min-h-14 items-center justify-between rounded-lg border border-brand-text/10 bg-brand-soft px-4 py-3 font-semibold text-brand-accent transition hover:border-brand-primary hover:bg-white hover:text-brand-primary" href={service.href}>
                    {service.label}<span aria-hidden="true" className="ml-3 text-brand-secondary">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Reviews />

        <section aria-labelledby="rates-cta-title" className="border-t-4 border-brand-secondary bg-brand-accent px-5 py-16 text-white sm:px-8 sm:py-20">
          <div className="mx-auto flex max-w-content flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow mb-3 text-brand-secondary">Plan your next ride</p>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl" id="rates-cta-title">Need a Sprinter van in New York?</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/80">Share your itinerary with NY Travel Limo to request a personalized quote.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ReservationLink label="Reserve Today" />
              <QuoteLink className="border border-white/60 bg-transparent text-white hover:bg-white hover:text-brand-accent" label="Get a Quote" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
