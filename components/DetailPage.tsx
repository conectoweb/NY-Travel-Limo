import type { DetailPage as DetailPageContent } from "@/lib/site-content";
import Image from "next/image";
import { QuoteLink } from "@/components/Header";
import FleetOptions from "@/components/FleetOptions";
import ServiceAreas from "@/components/ServiceAreas";
import { fleetPages, servicePages } from "@/lib/site-content";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import ServiceLanding from "@/components/ServiceLanding";
import { serviceLandingContent } from "@/lib/service-landing-content";

const relatedServiceSlugs: Record<string, string[]> = {
  "airport-transportation-services-in-nyc-with-professional-chauffeurs": [
    "cruise-terminal-transportation-services-in-new-york-with-driver",
    "point-to-point-transportation-service-in-new-york",
    "group-transportation-in-new-york-near-me",
  ],
  "corporate-transportation-service-with-driver-in-new-york": [
    "roadshow-transportation-nyc",
    "airport-transportation-services-in-nyc-with-professional-chauffeurs",
    "transportation-by-hours-in-new-york",
  ],
  "roadshow-transportation-nyc": [
    "corporate-transportation-service-with-driver-in-new-york",
    "transportation-by-hours-in-new-york",
    "point-to-point-transportation-service-in-new-york",
  ],
  "cruise-terminal-transportation-services-in-new-york-with-driver": [
    "airport-transportation-services-in-nyc-with-professional-chauffeurs",
    "group-transportation-in-new-york-near-me",
    "point-to-point-transportation-service-in-new-york",
  ],
  "luxury-wedding-transportation-in-nyc-with-chauffeur-driven-sprinter-vans": [
    "group-transportation-in-new-york-near-me",
    "transportation-by-hours-in-new-york",
    "point-to-point-transportation-service-in-new-york",
  ],
  "transportation-by-hours-in-new-york": [
    "new-york-city-tour-with-professional-chauffeurs",
    "roadshow-transportation-nyc",
    "wine-tours-transportation-service-from-new-york",
  ],
  "new-york-city-tour-with-professional-chauffeurs": [
    "transportation-by-hours-in-new-york",
    "wine-tours-transportation-service-from-new-york",
    "point-to-point-transportation-service-in-new-york",
  ],
  "point-to-point-transportation-service-in-new-york": [
    "airport-transportation-services-in-nyc-with-professional-chauffeurs",
    "transportation-by-hours-in-new-york",
    "corporate-transportation-service-with-driver-in-new-york",
  ],
  "wine-tours-transportation-service-from-new-york": [
    "new-york-city-tour-with-professional-chauffeurs",
    "group-transportation-in-new-york-near-me",
    "transportation-by-hours-in-new-york",
  ],
  "group-transportation-in-new-york-near-me": [
    "airport-transportation-services-in-nyc-with-professional-chauffeurs",
    "cruise-terminal-transportation-services-in-new-york-with-driver",
    "luxury-wedding-transportation-in-nyc-with-chauffeur-driven-sprinter-vans",
  ],
};

const sprinterVideoSlug = "sprinter-van-rental-with-driver-new-york-nyc";

const fleetHeroImages: Record<string, { src: string; alt: string }> = {
  "sprinter-van-rental-with-driver-new-york-nyc": {
    src: "/images/services/Sprinter-Van-Rental-Rates.png",
    alt: "Sprinter van for group transportation in New York",
  },
  "luxury-suv-rental-nyc": {
    src: "/images/services/suv-transportation-6-passanger.png",
    alt: "Private SUV transportation in New York",
  },
  "lincoln-stretch-limo-rental-nyc": {
    src: "/images/services/limousines-transportation-7-passanger.webp",
    alt: "Limousine transportation for a New York occasion",
  },
};

export default function DetailPage({ page }: { page: DetailPageContent }) {
  const isContactPage = page.slug === "contact-us";
  const isFleetPage = fleetPages.some((fleetPage) => fleetPage.slug === page.slug);
  const fleetHeroImage = fleetHeroImages[page.slug];
  const sectionHref = isContactPage ? "/contact-us" : isFleetPage ? "/#fleet" : "/services";
  const sectionLabel = isContactPage ? "Contact" : isFleetPage ? "Our Fleet" : "Services";
  const structuredData = isContactPage
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "NY Travel Limo",
        url: "https://www.nytravellimo.com/contact-us",
        hasMap: "https://maps.app.goo.gl/DdHar5D8wdmmSgbZ8",
        telephone: ["+1-516-256-2892", "+1-718-397-1333"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "358 W 56th St, Suite 4D",
          addressLocality: "New York",
          addressRegion: "NY",
          postalCode: "10019",
          addressCountry: "US",
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.title,
        description: page.description,
        provider: {
          "@type": "LocalBusiness",
          name: "NY Travel Limo",
          url: "https://www.nytravellimo.com/",
          telephone: "+1-718-397-1333",
        },
        areaServed: [
          { "@type": "City", name: "New York City" },
          { "@type": "AdministrativeArea", name: "New York" },
          { "@type": "AdministrativeArea", name: "New Jersey" },
        ],
      };

  const serviceLanding = serviceLandingContent[page.slug];
  if (serviceLanding) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <ServiceLanding page={page} content={serviceLanding} />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <section
          aria-labelledby="detail-title"
          className={`services-hero-enter relative isolate overflow-hidden bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24 ${fleetHeroImage ? "min-h-[34rem]" : ""}`}
        >
          {fleetHeroImage && (
            <>
              <Image
                alt={fleetHeroImage.alt}
                className="absolute inset-0 z-0 object-cover object-center"
                fill
                priority
                sizes="100vw"
                src={fleetHeroImage.src}
              />
              <div aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(9,79,89,0.72)_0%,rgba(9,79,89,0.48)_55%,rgba(41,37,33,0.2)_100%)]" />
            </>
          )}
          <div className="relative z-20 mx-auto max-w-content">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
              <ol className="flex flex-wrap gap-2">
                <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                <li aria-hidden="true">/</li>
                <li>
                  <a className="underline underline-offset-4 hover:text-white" href={sectionHref}>
                    {sectionLabel}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{page.title}</li>
              </ol>
            </nav>
            <p className="eyebrow mb-5 text-brand-secondary">{page.eyebrow}</p>
            <h1
              className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl"
              id="detail-title"
            >
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteLink className="min-h-14 px-8 text-base" label="Request a Quote" />
            </div>
          </div>
        </section>

        {page.slug === sprinterVideoSlug && (
          <section aria-label="Sprinter van video" className="bg-white px-5 pt-10 sm:px-8 sm:pt-14">
            <div className="mx-auto max-w-4xl">
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-brand-dark shadow-lg">
                <iframe
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src="https://www.youtube.com/embed/bvVhjvuMQyk?start=14&autoplay=0&rel=0"
                  title="NY Travel Limo Mercedes-Benz Sprinter van with driver in New York City"
                />
              </div>
            </div>
          </section>
        )}

        <article className="section-pad bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="services-card-enter mt-12 space-y-12">
              {page.sections.map((section, index) => (
                <section
                  aria-labelledby={`detail-section-${index + 1}`}
                  key={section.heading}
                >
                  <h2
                    className="text-2xl font-bold leading-tight text-brand-dark sm:text-3xl"
                    id={`detail-section-${index + 1}`}
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-brand-muted">
                    {section.paragraphs.map((paragraph) => {
                      const address = "358 W 56th St, Suite 4D, New York, NY 10019";
                      if (isContactPage && paragraph.includes(address)) {
                        const [beforeAddress, afterAddress] = paragraph.split(address);
                        return (
                          <p key={paragraph}>
                            {beforeAddress}
                            <a
                              className="font-semibold text-brand-accent underline decoration-brand-secondary underline-offset-4 hover:text-brand-primary"
                              href="https://maps.app.goo.gl/DdHar5D8wdmmSgbZ8"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {address}
                            </a>
                            {afterAddress}
                          </p>
                        );
                      }
                      return <p key={paragraph}>{paragraph}</p>;
                    })}
                    {isContactPage && section.heading === "Visit our New York office" && (
                      <a
                        className="text-link inline-flex min-h-11 items-center"
                        href="https://maps.app.goo.gl/DdHar5D8wdmmSgbZ8"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Get directions on Google Maps <span aria-hidden="true" className="ml-2">↗</span>
                      </a>
                    )}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((item) => (
                        <li className="flex gap-3 text-sm leading-6 text-brand-dark" key={item}>
                          <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            {isContactPage && <ContactForm />}
          </div>
        </article>

        {!isContactPage && !isFleetPage && (
          <section aria-labelledby="related-services-title" className="section-pad bg-white">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-brand-dark" id="related-services-title">Related transportation services</h2>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {(relatedServiceSlugs[page.slug] ?? [])
                  .map((slug) => servicePages.find((service) => service.slug === slug))
                  .filter((service): service is (typeof servicePages)[number] => service !== undefined)
                  .map((service) => (
                    <li key={service.slug}>
                      <a className="text-link" href={`/${service.slug}`}>{service.title}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        )}
        <FleetOptions
          keys={page.recommendedFleet}
          heading="A vehicle that fits the way you travel"
          description="NY Travel Limo offers chauffeur-driven Mercedes-Benz Sprinter vans, SUVs and limousines. Share your passenger count, luggage and itinerary to discuss the best fit."
        />
        <ServiceAreas />
        <FinalCTA />
      </main>
    </>
  );
}
