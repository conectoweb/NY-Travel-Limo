import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header, { QuoteLink, ReservationLink } from "@/components/Header";
import Reviews from "@/components/Reviews";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";

const vanImage = "/images/nyc-sprinter-van-hero.avif";
const vehicleImages = {
  sprinter: {
    src: "/images/services/sprinter-vans-rental.webp",
    label: "Sprinter van",
    alt: "Mercedes-Benz Sprinter van for group transportation",
  },
  suv: {
    src: "/images/services/suv-transportation.png",
    label: "Private SUV",
    alt: "Private SUV for chauffeur-driven transportation",
  },
  limousine: {
    src: "/images/services/limousines-transportation.png",
    label: "Limousine",
    alt: "Stretch limousine for special occasions",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const title = "NYC Private Transportation Rates & Quotes | NY Travel Limo";
  const description =
    "Compare NY Travel Limo Sprinter van, airport, hourly and event rates in New York City, then request a quote for your itinerary.";
  const isPublicSite = await isPublicSiteRequest();
  const url = `${siteUrl}/rates`;

  return {
    title,
    description,
    alternates: {
      canonical: "/rates",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: isPublicSite ? url : undefined,
      images: [{ url: vanImage, alt: "Sprinter van for private transportation in New York" }],
    },
  };
}

type RateVehicleImage = (typeof vehicleImages)[keyof typeof vehicleImages];

function RateImage({ images }: { images: RateVehicleImage[] }) {
  return (
    <div className={`grid min-h-64 min-w-0 overflow-hidden rounded-xl bg-brand-accent sm:min-h-80 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {images.map((image, index) => (
        <div
          className={`relative min-h-64 min-w-0 overflow-hidden sm:min-h-80 ${images.length === 3 && index === 2 ? "col-span-2" : ""}`}
          key={image.label}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
          <span className="absolute bottom-4 left-3 rounded-full border border-white/60 bg-brand-dark/75 px-3 py-1 text-xs font-semibold text-white sm:left-4">
            {image.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function RateFeature({
  id,
  eyebrow,
  title,
  description,
  images,
  reverse = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  images: RateVehicleImage[];
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-brand-text/10 py-12 last:border-b-0 sm:py-16">
      <div className={`grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <RateImage images={images} />
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
  { label: "Funeral transportation", href: "/funeral-transportation-services-nyc-dignified-professional" },
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
              Sprinter Van Rental Rates &amp; Charter Pricing in NYC
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
              images={[vehicleImages.sprinter]}
            >
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-secondary/60 bg-white px-5 py-3 text-lg font-bold text-brand-accent shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-accent hover:text-brand-secondary hover:shadow-md"
              >
                Contact Us for Pricing <span aria-hidden="true">↗</span>
              </a>
            </RateFeature>

            <RateFeature
              id="airport"
              eyebrow="JFK · LGA · EWR"
              title="Airport Transportation"
              description="Airport rates by pickup or destination airport and vehicle. Passenger ranges are shown as provided."
              images={[vehicleImages.suv, vehicleImages.sprinter]}
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
              images={[vehicleImages.sprinter, vehicleImages.limousine, vehicleImages.suv]}
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
              images={[vehicleImages.limousine, vehicleImages.sprinter]}
              reverse
            >
              <PackageList />
            </RateFeature>

            <RateFeature
              id="bachelor-bachelorette"
              eyebrow="Within the five boroughs"
              title="Bachelor and Bachelorette Packages"
              description="Three-hour event packages for bachelor and bachelorette transportation."
              images={[vehicleImages.limousine, vehicleImages.sprinter]}
            >
              <PackageList />
            </RateFeature>

            <RateFeature
              id="sweet-sixteen"
              eyebrow="Within the five boroughs"
              title="Sweet Sixteen Packages"
              description="Three-hour event packages for Sweet Sixteen transportation."
              images={[vehicleImages.limousine, vehicleImages.sprinter]}
              reverse
            >
              <PackageList />
            </RateFeature>

            <RateFeature
              id="atlantic-city"
              eyebrow="Casino transportation"
              title="Atlantic City Casino"
              description="Sprinter van service for 1–14 passengers between New York and Atlantic City."
              images={[vehicleImages.sprinter]}
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

            {/* Pricing Breakdown & Inclusions */}
            <section aria-labelledby="pricing-factors-title" className="border-t border-brand-text/10 py-12 sm:py-16">
              <div className="max-w-3xl">
                <p className="eyebrow mb-3 text-brand-secondary">Transparent Billing</p>
                <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl" id="pricing-factors-title">
                  How NY Travel Limo Pricing Works
                </h2>
                <p className="mt-3 text-base leading-7 text-brand-muted">
                  We believe in upfront, transparent pricing so our corporate and private clients can plan itineraries without surprises. Every custom quote reflects:
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-brand-primary/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-brand-dark">Vehicle &amp; Chauffeur Charter</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Base rates cover the private vehicle exclusively for your party, professional TLC-licensed chauffeur, and fuel for the reserved itinerary.
                  </p>
                </div>
                <div className="rounded-xl border border-brand-primary/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-brand-dark">Tolls &amp; Port Authority Fees</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    New York bridge, tunnel, and highway tolls or airport access fees are itemized transparently in your personalized quote.
                  </p>
                </div>
                <div className="rounded-xl border border-brand-primary/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-brand-dark">Gratuity &amp; Overtime</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Industry-standard chauffeur gratuity (15–20%) can be included in your upfront invoice for seamless corporate expense accounting.
                  </p>
                </div>
              </div>
            </section>

            {/* Rates FAQ */}
            <section aria-labelledby="rates-faq-title" className="border-t border-brand-text/10 py-12 sm:py-16" id="rates-faq">
              <div className="grid gap-9 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <p className="eyebrow mb-4 text-brand-secondary">Rates &amp; Payment</p>
                  <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl" id="rates-faq-title">
                    Pricing FAQs
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-brand-muted">
                    Common questions regarding payments, flight wait times, cancellations, and corporate accounts.
                  </p>
                </div>
                <div className="border-t border-brand-text/15">
                  <details className="group border-b border-brand-text/15 py-5">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                      Are bridge and tunnel tolls included in the airport transfer rates?
                      <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                      Base airport rates cover the vehicle and chauffeur service. Major NYC bridge and tunnel crossings (such as the Queens-Midtown Tunnel, Lincoln Tunnel, or Triborough Bridge) and airport parking access fees are calculated based on your exact route and included in your finalized quote.
                    </p>
                  </details>
                  <details className="group border-b border-brand-text/15 py-5">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                      What is the policy for delayed flights at JFK, LGA, or EWR?
                      <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                      We track your flight in real time using automated flight telemetry. If your flight is delayed, your chauffeur’s arrival is automatically updated to correspond with your actual wheels-down time, minimizing unnecessary waiting fees.
                    </p>
                  </details>
                  <details className="group border-b border-brand-text/15 py-5">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                      What payment methods are accepted and can corporate clients be invoiced?
                      <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                      We accept all major credit cards (Visa, MasterCard, American Express, Discover) through our secure booking portal. For recurring corporate accounts and financial institutions coordinating roadshows, direct corporate billing and consolidated itemized invoicing are available upon approval.
                    </p>
                  </details>
                  <details className="group border-b border-brand-text/15 py-5">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                      Is there a minimum hourly commitment for Sprinter or Limousine rentals?
                      <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                      Yes. Sprinter van hourly charters within the five boroughs typically require a 3-hour minimum. Wedding and event packages also operate on 3-hour blocks with clear hourly rates for any additional time required.
                    </p>
                  </details>
                </div>
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
