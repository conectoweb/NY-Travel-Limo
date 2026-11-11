import type { Metadata } from "next";
import Image from "next/image";
import BlogPreview from "@/components/BlogPreview";
import FinalCTA from "@/components/FinalCTA";
import FleetOptions from "@/components/FleetOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ServiceAreas from "@/components/ServiceAreas";
import Steps from "@/components/Steps";
import { servicePages } from "@/lib/site-content";
import { serviceLandingContent } from "@/lib/service-landing-content";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "NYC Private Chauffeur Services Directory | NY Travel Limo";
  const description = "Explore Transportation Services in NYC, Including Private Airport, Corporate, Cruise, Wedding, Hourly, City Tour & Group Transportation with a Chauffeur.";
  const isPublicSite = await isPublicSiteRequest();

  return {
    title,
    description,
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: isPublicSite ? `${siteUrl}/services` : undefined,
      images: [
        {
          url: "/images/nyc-sprinter-van-hero.avif",
          alt: "A black Mercedes-Benz Sprinter van on a New York City street",
        },
      ],
    },
  };
}

const services = servicePages.filter((service) => service.slug !== "contact-us");

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section
          aria-labelledby="services-hero-title"
          className="services-hero-enter relative isolate flex min-h-[35rem] overflow-hidden bg-brand-dark text-white sm:min-h-[39rem]"
        >
          <Image
            alt="Black Mercedes-Benz Sprinter van on a New York City street"
            className="absolute inset-0 z-0 object-cover object-center"
            fill
            priority
            sizes="100vw"
            src="/images/nyc-sprinter-van-hero.avif"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(9,79,89,0.48)_0%,rgba(9,79,89,0.30)_48%,rgba(41,37,33,0.10)_100%)]"
          />
          <div className="relative z-20 mx-auto flex w-full max-w-content flex-col items-start justify-center px-5 py-16 sm:px-8 sm:py-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary sm:text-sm">
              Chauffeur transportation services in NYC
            </p>
            <h1
              className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
              id="services-hero-title"
            >
              Transportation Services in NYC, Planned Around You
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Explore private transportation services in NYC for airport transfers, business
              schedules, cruises, weddings and group outings. Compare Sprinter vans, private SUVs
              and limousines, then share your itinerary to discuss the right fit.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand-secondary px-8 py-3 text-base font-bold text-brand-accent transition-colors hover:bg-brand-accent hover:text-brand-secondary"
                href="/contact-us"
              >
                Request a Quote <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="service-list-title" className="section-pad bg-brand-light">
          <div className="mx-auto max-w-content">
            <div className="mb-10 max-w-3xl sm:mb-12">
              <p className="eyebrow mb-4">Travel your way</p>
              <h2 className="section-heading" id="service-list-title">Explore our services</h2>
              <p className="mt-5 text-base leading-7 text-brand-muted">
                Whether you need a direct ride or transportation for a full itinerary, start with
                the service that best describes your plans. Each page explains what to consider
                and what to include when requesting a quote.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const image = serviceLandingContent[service.slug];
                return (
                  <li
                    className="service-card group flex flex-col overflow-hidden rounded-xl border border-brand-text/10 bg-white shadow-[0_8px_30px_rgba(41,37,33,0.045)]"
                    key={service.slug}
                  >
                    <a aria-label={`Explore ${service.title}`} className="relative block h-44 overflow-hidden bg-brand-accent" href={`/${service.slug}`}>
                      <Image
                        alt={image?.imageAlt ?? service.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        src={image ? `/images/${image.expectedImage}` : "/images/services/private-transportation.webp"}
                      />
                      <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-brand-accent/90 px-3 py-1.5 text-xs font-semibold text-white">
                        SERVICE {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="text-xl font-bold leading-snug text-brand-dark">
                        <a className="transition-colors hover:text-brand-primary" href={`/${service.slug}`}>
                          {service.title}
                        </a>
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-brand-muted">
                        {service.description}
                      </p>
                      <a
                        className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-accent underline decoration-brand-secondary decoration-2 underline-offset-4 transition-colors hover:text-brand-primary"
                        href={`/${service.slug}`}
                      >
                        Explore this service <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* What is Included Across All Services */}
        <section aria-labelledby="services-included-heading" className="section-pad bg-white">
          <div className="mx-auto max-w-content">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3 text-brand-secondary">Service Standards &amp; Inclusions</p>
              <h2 className="section-heading text-3xl sm:text-4xl" id="services-included-heading">
                What Is Included in Every NY Travel Limo Chauffeur Service
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                Whether booking a 30-minute airport transfer or a full-day multi-stop corporate roadshow, our clients receive consistent, premium executive standards from start to finish.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-brand-primary/10 bg-brand-soft/40 p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-sm">
                  01
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-dark">Dedicated TLC Chauffeur</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Fully licensed, vetted professional drivers in formal executive attire with intimate knowledge of NYC traffic, bridges, and expressways.
                </p>
              </div>

              <div className="rounded-xl border border-brand-primary/10 bg-brand-soft/40 p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-sm">
                  02
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-dark">Automated Flight Tracking</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Arrival monitoring for JFK, LGA, and EWR so chauffeur pickup timing adjusts dynamically if your flight is delayed or lands early.
                </p>
              </div>

              <div className="rounded-xl border border-brand-primary/10 bg-brand-soft/40 p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-sm">
                  03
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-dark">Private Dedicated Vehicle</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Exclusively reserved for your party with zero ride-sharing, sanitized cabins, climate control, and complimentary charging ports.
                </p>
              </div>

              <div className="rounded-xl border border-brand-primary/10 bg-brand-soft/40 p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-sm">
                  04
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-dark">Transparent Custom Quotes</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Upfront, clearly outlined pricing without hidden billing surprises, tailored directly to your passenger count and schedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle & Luggage Matching Guide */}
        <section aria-labelledby="matching-heading" className="section-pad bg-brand-soft">
          <div className="mx-auto max-w-content">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow mb-3 text-brand-secondary">Fleet Matching Guide</p>
                <h2 className="section-heading text-3xl sm:text-4xl" id="matching-heading">
                  Matching Your Service to the Ideal Vehicle
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-brand-muted">
                  <p>
                    <strong>Solo Travelers &amp; Small Groups (1–6 Passengers):</strong> Choose a <a className="text-link" href="/luxury-suv-rental-nyc">luxury executive SUV</a> (Cadillac Escalade) for swift airport transfers, meetings in Midtown or Wall Street, and private hotel transfers with up to 6 suitcases.
                  </p>
                  <p>
                    <strong>Group Travel &amp; Teams (7–14 Passengers):</strong> Choose a <a className="text-link" href="/sprinter-van-rental-with-driver-new-york-nyc">Mercedes-Benz Sprinter van</a> with high-roof walk-in height, individual leather seats, and a dedicated rear luggage partition holding 10 to 14 large suitcases.
                  </p>
                  <p>
                    <strong>Celebrations &amp; Weddings (Up to 10 Passengers):</strong> Choose a <a className="text-link" href="/lincoln-stretch-limo-rental-nyc">Lincoln stretch limousine</a> for formal arrivals, prom nights, milestone anniversaries, and evening galas.
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent underline decoration-brand-secondary decoration-2 underline-offset-4 hover:text-brand-primary"
                    href="/fleet"
                  >
                    Compare full fleet capacity &amp; specifications <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-primary/15 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-xl font-bold text-brand-dark">Advance Reservation Guidance</h3>
                <ul className="mt-4 space-y-3 text-sm text-brand-muted">
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                    <span><strong>Standard Transfers:</strong> Book 48 to 72 hours in advance to guarantee your preferred vehicle category.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                    <span><strong>Airport Pickups:</strong> Include airline, flight number, and terminal for real-time landing coordination.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                    <span><strong>Multi-Stop Charters:</strong> List stops sequentially with estimated meeting durations for accurate quoting.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                    <span><strong>Weddings &amp; Galas:</strong> Reserve 2 to 4 weeks early during peak spring and autumn event seasons.</span>
                  </li>
                </ul>
                <div className="mt-6 pt-5 border-t border-brand-text/10 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-secondary px-6 text-sm font-bold text-brand-accent transition hover:bg-brand-accent hover:text-brand-secondary"
                    href="/contact-us"
                  >
                    Request a Service Quote
                  </a>
                  <a
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-accent bg-transparent px-6 text-sm font-bold text-brand-accent transition hover:bg-brand-accent hover:text-white"
                    href="tel:5162562892"
                  >
                    Call (516) 256-2892
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services FAQ */}
        <section aria-labelledby="services-faq-title" className="section-pad bg-white" id="services-faq">
          <div className="mx-auto grid max-w-content gap-9 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow mb-4 text-brand-secondary">Frequently Asked Questions</p>
              <h2 className="section-heading text-3xl sm:text-4xl" id="services-faq-title">
                NYC Chauffeur Service FAQs
              </h2>
              <p className="mt-4 text-sm leading-6 text-brand-muted">
                Answers to common client questions regarding our transportation services, airport pickups, and hourly reservations.
              </p>
            </div>
            <div className="border-t border-brand-text/15">
              <details className="group border-b border-brand-text/15 py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                  What is the difference between point-to-point and hourly chauffeur service?
                  <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                  Point-to-point transportation provides direct transport from one specific pickup address to a single destination (such as an airport transfer or hotel-to-venue ride). Hourly chauffeur service assigns a dedicated vehicle and driver on standby for a set block of time (typically 3+ hours), permitting unlimited stops, dynamic routing, and waiting between meetings or events.
                </p>
              </details>
              <details className="group border-b border-brand-text/15 py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                  How are airport pickups coordinated at JFK, LGA, and EWR?
                  <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                  Clients provide their flight details during reservation. Our dispatch team tracks flight status in real time. Once your plane touches down, your chauffeur contacts you directly via SMS or phone call to coordinate curbside passenger pickup, or meets you inside the terminal with an executive greeting sign if meet-and-greet service was selected.
                </p>
              </details>
              <details className="group border-b border-brand-text/15 py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                  Can NY Travel Limo coordinate multi-vehicle corporate roadshows or large delegations?
                  <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                  Yes. We frequently manage multi-vehicle fleets combining Mercedes-Benz Sprinter vans and luxury executive SUVs for corporate conferences, roadshows, board meetings, and large wedding parties across Manhattan, Brooklyn, Queens, and New Jersey. Dedicated dispatch coordination ensures synchronized arrivals.
                </p>
              </details>
              <details className="group border-b border-brand-text/15 py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                  What details do I need to provide when requesting a quote?
                  <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
                  To receive an accurate and timely quote, please share your travel date, pickup time, pickup and drop-off addresses, passenger count, luggage count, vehicle preference, and any intermediate stops or flight details.
                </p>
              </details>
            </div>
          </div>
        </section>

        <FleetOptions
          heading="Find the right ride for your plans."
          description="Sprinter vans are a featured option for groups. We also arrange private SUV transportation and limousines for special occasions."
        />
        <Steps />
        <ServiceAreas />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
