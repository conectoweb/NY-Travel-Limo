import Image from "next/image";
import { servicePages } from "@/lib/site-content";

const services = servicePages.filter((service) => service.slug !== "contact-us");
const featuredServiceSlugs = [
  "airport-transportation-services-in-nyc-with-professional-chauffeurs",
  "corporate-transportation-service-with-driver-in-new-york",
  "group-transportation-in-new-york-near-me",
];
const featuredServices = featuredServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service) => service !== undefined);

export default function ServicesGrid() {
  return (
    <section aria-labelledby="services-title" className="section-pad bg-brand-soft" id="services">
      <div className="mx-auto max-w-content">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">NYC transportation services</p>
            <h2 className="section-heading" id="services-title">The right ride for what brings you to New York.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-brand-muted">
            From private airport transportation to business schedules and group travel, explore
            service options shaped around your itinerary.
          </p>
          <a className="text-link text-sm" href="/services">
            Explore all services
          </a>
        </div>

        <ul className="grid gap-5 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <li className="service-card group overflow-hidden rounded-2xl border border-brand-text/10 bg-white shadow-[0_12px_35px_rgba(41,37,33,0.07)]" key={service.slug}>
              <a aria-label={`Explore ${service.title}`} className="relative block h-52 overflow-hidden bg-brand-accent sm:h-60" href={`/${service.slug}`}>
                <Image
                  alt="NY Travel Limo Mercedes-Benz Sprinter van in New York, shown as a temporary service image"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src="/images/nyc-sprinter-van-hero.avif"
                />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-brand-accent/90 px-4 py-2 text-xs font-semibold text-white">
                  Private chauffeur service
                </span>
              </a>
              <div className="p-6 sm:p-7">
                <p className="eyebrow mb-3">NY Travel Limo service</p>
                <h3 className="text-xl font-bold leading-snug text-brand-dark sm:text-2xl">
                  <a className="transition-colors hover:text-brand-primary" href={`/${service.slug}`}>
                    {service.title}
                  </a>
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{service.description}</p>
                <a
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-accent underline decoration-brand-secondary decoration-2 underline-offset-4 transition-colors hover:text-brand-primary"
                  href={`/${service.slug}`}
                >
                  Explore service <span aria-hidden="true">↗</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl border border-brand-primary/15 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-bold text-brand-dark">More ways to travel</h3>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {services.filter((service) => !featuredServiceSlugs.includes(service.slug)).map((service) => (
              <li key={service.slug}>
                <a className="text-sm font-semibold text-brand-accent underline decoration-brand-secondary underline-offset-4 transition-colors hover:text-brand-primary" href={`/${service.slug}`}>
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
