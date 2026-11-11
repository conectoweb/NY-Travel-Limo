import type { Metadata } from "next";
import Image from "next/image";
import FleetOptions from "@/components/FleetOptions";
import Footer from "@/components/Footer";
import Header, { QuoteLink, ReservationLink } from "@/components/Header";
import FinalCTA from "@/components/FinalCTA";
import ServiceAreas from "@/components/ServiceAreas";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const base = await pageMetadata(
    "/fleet",
    "NY Travel Limo Fleet | Sprinter Vans, SUVs & Limousines",
    "Explore the NY Travel Limo fleet in NYC, including Mercedes-Benz Sprinter vans, private SUVs and limousines for chauffeur-driven travel."
  );

  return {
    ...base,
    alternates: {
      canonical: "/fleet",
    },
  };
}

const fleetSpecs = [
  {
    name: "Mercedes-Benz Sprinter Van",
    passengers: "10 to 14 Passengers",
    luggage: "10 to 14 Suitcases + Carry-ons",
    idealFor: "Corporate roadshows, group airport transfers, wedding party shuttles, family trips",
    features: [
      "Stand-up high-roof cabin with center aisle",
      "Executive leather captain chairs or row seating",
      "Dual-zone passenger climate control",
      "110V/USB device charging ports at seats",
      "Dedicated partition-separated rear luggage bay",
      "Tinted privacy glass and interior accent lighting",
    ],
    href: "/sprinter-van-rental-with-driver-new-york-nyc",
    linkText: "View Sprinter Van Details",
  },
  {
    name: "Luxury Executive SUV",
    passengers: "Up to 6 Passengers",
    luggage: "4 to 6 Suitcases",
    idealFor: "Executive business travel, airport transfers, direct city rides, couples & small families",
    features: [
      "Cadillac Escalade or Chevrolet Suburban models",
      "Plush leather captain chairs and heated seating",
      "Tri-zone automatic climate control",
      "Deep-tinted privacy glass and acoustic glass quiet cabin",
      "Spacious cargo hold for oversized luggage or golf bags",
      "Nimble NYC traffic handling and hotel turnaround access",
    ],
    href: "/luxury-suv-rental-nyc",
    linkText: "View Luxury SUV Details",
  },
  {
    name: "Lincoln Stretch Limousine",
    passengers: "Up to 8 to 10 Passengers",
    luggage: "3 to 4 Suitcases",
    idealFor: "Weddings, milestone anniversaries, galas, prom nights, romantic evenings in NYC",
    features: [
      "Signature J-lounge leather wrap-around seating",
      "Fiber-optic starlight ceiling and mood lighting",
      "Chauffeur privacy partition divider",
      "Premium surround sound audio system with Bluetooth",
      "Interior bar console with glassware and ice bin",
      "Classic formal exterior presentation",
    ],
    href: "/lincoln-stretch-limo-rental-nyc",
    linkText: "View Stretch Limo Details",
  },
];

const includedFeatures = [
  {
    title: "Licensed Professional Chauffeur",
    desc: "Every ride includes an experienced, TLC-licensed chauffeur in formal executive attire committed to punctual, safe, and discreet service.",
  },
  {
    title: "Full Commercial Insurance",
    desc: "Comprehensive passenger livery insurance coverage adhering strictly to NYC Taxi & Limousine Commission and Port Authority requirements.",
  },
  {
    title: "Flight Monitoring for JFK, LGA & EWR",
    desc: "Automated flight tracking for airport arrivals with coordinated curbside or terminal meet-and-greet pickup timing.",
  },
  {
    title: "Sanitized & Climate-Controlled Cabins",
    desc: "Pristine vehicles detailed prior to every dispatch, equipped with complimentary bottled water and device charging capabilities.",
  },
  {
    title: "Transparent Charter Pricing",
    desc: "Clear upfront quotes detailing vehicle charter, travel time, and inclusions so your corporate or personal budget is protected.",
  },
  {
    title: "Dedicated Dispatch Coordination",
    desc: "24/7 reservation and live dispatch support for itinerary updates, schedule adjustments, and multi-vehicle coordination.",
  },
];

const fleetFaqs = [
  {
    question: "How do I choose the right vehicle for my passenger count and luggage?",
    answer:
      "For solo executives, couples, or families of up to 6 with 4 to 6 suitcases, our luxury SUVs (Cadillac Escalade) offer quiet agility. For groups of 7 to 14 passengers traveling with full-sized luggage, our Mercedes-Benz Sprinter vans are the ideal choice with dedicated cargo bays. For celebratory evenings or weddings, our Lincoln Stretch Limousines accommodate 8 to 10 passengers with light luggage.",
  },
  {
    question: "Do you offer self-drive rentals or bare vehicle leases?",
    answer:
      "No. All vehicles at NY Travel Limo are operated exclusively by licensed, professional chauffeurs. We do not provide self-drive rentals, car rentals without a driver, or bare commercial leases under any circumstances.",
  },
  {
    question: "How far in advance should I reserve a vehicle?",
    answer:
      "We recommend reserving at least 48 to 72 hours in advance for standard airport and point-to-point transfers. For high-demand dates—including corporate roadshows, UN General Assembly week, holiday seasons, and weekend weddings—we recommend booking 2 to 4 weeks ahead to guarantee availability.",
  },
  {
    question: "Are child safety seats or booster seats available?",
    answer:
      "Yes, age-appropriate forward-facing, rear-facing, or booster child safety seats can be arranged upon request. Please specify the age, weight, and seat type needed when submitting your quote request so our dispatch team can equip the vehicle prior to pickup.",
  },
  {
    question: "What happens if our flight into JFK, LGA, or EWR is delayed?",
    answer:
      "When you provide your airline and flight number during booking, our dispatch team tracks your flight in real time. Your chauffeur's arrival time is automatically adjusted to align with your actual landing time, minimizing waiting stress.",
  },
];

export default function FleetPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="services-hero-enter relative isolate flex min-h-[26rem] sm:min-h-[50rem] overflow-hidden bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
          <Image
            alt="NY Travel Limo Mercedes-Benz Sprinter van, a featured example from the fleet"
            className="absolute inset-0 z-0 object-cover object-[100%_center]"
            fill
            priority
            sizes="100vw"
            src="/images/services/ny-travel-limo-fleet.png"
          />
          <div aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(9,79,89,0.48)_0%,rgba(9,79,89,0.3)_52%,rgba(41,37,33,0.08)_100%)]" />
          <div className="relative z-20 mx-auto grid w-full max-w-content items-center gap-8 py-6 md:grid-cols-[1fr_1fr] md:gap-14">
            <div className="max-w-2xl">
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
                <ol className="flex gap-2">
                  <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Fleet</li>
                </ol>
              </nav>
              <p className="eyebrow mb-5 text-brand-secondary">Vehicles for your itinerary</p>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl">
                Explore Our Luxury Chauffeur Fleet in New York
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                Compare Mercedes-Benz Sprinter vans, executive private SUVs, and stretch limousines. Every vehicle in our fleet is maintained to executive standards and chauffeured by TLC-licensed professionals across New York City and New Jersey.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <QuoteLink className="min-h-12 px-7 text-sm font-bold" label="Request a Fleet Quote" />
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/60 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-dark"
                  href="#specifications"
                >
                  Compare Specifications ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Fleet Selection */}
        <FleetOptions
          heading="Start with the right vehicle category"
          description="Vehicle configurations and availability vary. Confirm passenger and luggage fit with our reservation team."
          images={{
            sprinter: { src: "/images/services/sprinter-vans-rental.webp", alt: "Mercedes-Benz Sprinter van for group travel" },
            suv: { src: "/images/services/suv-transportation.png", alt: "Private SUV for chauffeur-driven transportation" },
            limousine: { src: "/images/services/limousines-transportation.png", alt: "Limousine for New York special occasions" },
          }}
        />

        {/* Detailed Vehicle Guidance & Specifications */}
        <section id="specifications" aria-labelledby="specs-heading" className="section-pad scroll-mt-20 bg-white">
          <div className="mx-auto max-w-content">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3 text-brand-secondary">Vehicle Guidance & Capacity</p>
              <h2 className="section-heading text-3xl sm:text-4xl" id="specs-heading">
                Passenger &amp; Luggage Breakdown by Vehicle
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                Selecting the right vehicle ensures comfort and avoids luggage capacity issues. Review our vehicle specifications below before submitting your itinerary.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {fleetSpecs.map((spec) => (
                <div
                  key={spec.name}
                  className="flex flex-col justify-between rounded-2xl border border-brand-text/15 bg-brand-soft/50 p-6 shadow-sm transition hover:border-brand-primary/40 hover:bg-white hover:shadow-md sm:p-8"
                >
                  <div>
                    <span className="inline-block rounded-full bg-brand-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-accent">
                      Executive Fleet
                    </span>
                    <h3 className="mt-4 text-2xl font-bold text-brand-dark">{spec.name}</h3>

                    <div className="mt-5 space-y-3 border-y border-brand-text/10 py-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-brand-dark">Max Passengers:</span>
                        <span className="font-bold text-brand-primary">{spec.passengers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-brand-dark">Luggage Capacity:</span>
                        <span className="font-bold text-brand-primary">{spec.luggage}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs font-medium text-brand-muted">
                      <strong className="text-brand-dark">Best for:</strong> {spec.idealFor}
                    </p>

                    <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-brand-secondary">
                      Key Cabin Features
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-brand-muted">
                      {spec.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-brand-text/10">
                    <a
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-accent underline decoration-brand-secondary underline-offset-4 hover:text-brand-primary"
                      href={spec.href}
                    >
                      {spec.linkText} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is Included Section */}
        <section aria-labelledby="included-heading" className="section-pad bg-brand-soft">
          <div className="mx-auto max-w-content">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3 text-brand-secondary">Standards of Excellence</p>
              <h2 className="section-heading text-3xl sm:text-4xl" id="included-heading">
                What Is Included with Every NY Travel Limo Charter
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                From solo executive airport transfers to 14-passenger corporate Sprinter shuttles, every charter is operated with uncompromising dedication to quality, safety, and client convenience.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {includedFeatures.map((item) => (
                <div key={item.title} className="rounded-xl border border-brand-primary/10 bg-white p-6 shadow-sm">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand-primary font-bold">
                    ✓
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <ServiceAreas />

        {/* Advance Reservation Guidance */}
        <section aria-labelledby="booking-guidance-heading" className="section-pad bg-white">
          <div className="mx-auto max-w-content">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow mb-3 text-brand-secondary">Simple 3-Step Process</p>
                <h2 className="section-heading text-3xl sm:text-4xl" id="booking-guidance-heading">
                  How to Reserve Your Vehicle with NY Travel Limo
                </h2>
                <div className="mt-6 space-y-6 text-base leading-7 text-brand-muted">
                  <div className="flex gap-4">
                    <span className="font-display text-2xl font-bold text-brand-secondary">01</span>
                    <div>
                      <h3 className="font-bold text-brand-dark">Submit Your Travel Itinerary</h3>
                      <p className="text-sm mt-1">
                        Share your date, pickup point, drop-off location, schedule, passenger count, and luggage expectations through our <a className="text-link" href="/contact-us">quote form</a>.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-display text-2xl font-bold text-brand-secondary">02</span>
                    <div>
                      <h3 className="font-bold text-brand-dark">Confirm Vehicle Setup &amp; Pricing</h3>
                      <p className="text-sm mt-1">
                        Our team reviews vehicle availability, recommends the best seating configuration, and provides an all-inclusive transparent quote.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-display text-2xl font-bold text-brand-secondary">03</span>
                    <div>
                      <h3 className="font-bold text-brand-dark">Receive Chauffeur Dispatch Details</h3>
                      <p className="text-sm mt-1">
                        Your reservation is finalized with 24/7 dispatch coordination. Prior to departure, chauffeur contact details and vehicle tracking are delivered for a smooth pickup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-primary/15 bg-brand-soft p-8">
                <h3 className="text-xl font-bold text-brand-dark">Need Immediate Fleet Assistance?</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">
                  Our reservation specialists are on call 24/7 to answer fleet questions, discuss multi-vehicle corporate bookings, or schedule airport transfers.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <QuoteLink className="min-h-12 px-6 text-sm" label="Request a Quote Online" />
                  <a
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-accent bg-brand-accent px-6 text-sm font-bold text-white transition hover:bg-brand-primary"
                    href="tel:5162562892"
                  >
                    Call (516) 256-2892
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fleet FAQ Section */}
        <section aria-labelledby="fleet-faq-title" className="section-pad bg-brand-soft" id="fleet-faq">
          <div className="mx-auto grid max-w-content gap-9 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow mb-4 text-brand-secondary">Frequently Asked Questions</p>
              <h2 className="section-heading text-3xl sm:text-4xl" id="fleet-faq-title">
                Fleet &amp; Vehicle Answers
              </h2>
              <p className="mt-4 text-sm leading-6 text-brand-muted">
                Common questions from corporate coordinators, travelers, and event planners about our fleet capabilities.
              </p>
            </div>
            <div className="border-t border-brand-text/15">
              {fleetFaqs.map((faq) => (
                <details className="group border-b border-brand-text/15 py-5" key={faq.question}>
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
