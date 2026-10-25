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
  const title = "Transportation Services NYC | NY Travel Limo";
  const description = "Explore Transportation Services in NYC, Including Private Airport, Corporate, Cruise, Wedding, Hourly, City Tour & Group Transportation with a Chauffeur.";
  const isPublicSite = await isPublicSiteRequest();

  return {
    title,
    description,
    alternates: isPublicSite ? { canonical: `${siteUrl}/services` } : undefined,
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
              <a
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/65 px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-secondary hover:text-brand-secondary"
                href="tel:7183971333"
              >
                718-397-1333
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
