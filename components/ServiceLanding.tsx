import Image from "next/image";
import type { DetailPage } from "@/lib/site-content";
import type { ServiceLandingContent } from "@/lib/service-landing-content";
import { QuoteLink } from "@/components/Header";
import FleetOptions from "@/components/FleetOptions";
import FinalCTA from "@/components/FinalCTA";
import { servicePages } from "@/lib/site-content";

function BenefitCards({ items }: { items: ServiceLandingContent["benefits"] }) {
  return (
    <ul className="services-card-enter mt-9 grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <li
          className="service-card group rounded-xl border border-brand-primary/10 bg-white p-6 shadow-[0_12px_35px_rgba(41,37,33,0.055)] sm:p-7"
          key={item.title}
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-accent transition-transform duration-300 group-hover:scale-110">
            {index === 0 ? (
              <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
            ) : index === 1 ? (
              <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 13.5h18l-1.5-5a2 2 0 0 0-1.9-1.4H6.4A2 2 0 0 0 4.5 8.5L3 13.5Z" />
                <path d="M4 13.5v4h16v-4M7 17.5v2m10-2v2M6 10h12" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <h3 className="mt-5 text-xl font-bold text-brand-dark">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-brand-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

function ServiceFAQs({ items }: { items: ServiceLandingContent["faqs"] }) {
  return (
    <section aria-labelledby="service-faq-title" className="section-pad bg-brand-soft">
      <div className="mx-auto grid max-w-content gap-9 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow mb-4">Before you book</p>
          <h2 className="section-heading text-3xl sm:text-4xl" id="service-faq-title">
            Frequently asked questions
          </h2>
        </div>
        <div className="border-t border-brand-text/15">
          {items.map((item) => (
            <details className="group border-b border-brand-text/15 py-5" key={item.question}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-xl text-brand-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function MidPageCTA({ content }: { content: ServiceLandingContent }) {
  return (
    <section aria-labelledby="service-mid-cta-title" className="overflow-hidden bg-brand-accent text-white">
      <div className="mx-auto flex max-w-content flex-col gap-7 px-5 py-12 sm:px-8 sm:py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3 text-brand-secondary">Plan your ride</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl" id="service-mid-cta-title">{content.midCtaHeading}</h2>
          <p className="mt-3 text-sm leading-6 text-white/80">{content.midCtaDescription}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <QuoteLink className="min-h-12" label="Request a Quote" />
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/55 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-brand-secondary hover:text-brand-secondary"
            href="tel:7183971333"
          >
            718-397-1333
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ServiceLanding({
  page,
  content,
}: {
  page: DetailPage;
  content: ServiceLandingContent;
}) {
  const relatedServices = servicePages.filter((service) => service.slug !== page.slug && service.slug !== "contact-us");
  const serviceImage = `/images/${content.expectedImage}`;

  return (
    <main>
      <section aria-labelledby="detail-title" className="services-hero-enter relative isolate flex min-h-[39rem] overflow-hidden bg-brand-dark text-white sm:min-h-[43rem]">
        <Image
          alt={content.imageAlt}
          className="absolute inset-0 z-0 object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={serviceImage}
        />
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(9,79,89,0.48)_0%,rgba(9,79,89,0.30)_48%,rgba(41,37,33,0.10)_100%)]" />
        <div className="relative z-20 mx-auto flex w-full max-w-content items-center px-5 py-14 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/70">
              <ol className="flex flex-wrap gap-2">
                <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                <li aria-hidden="true">/</li>
                <li><a className="underline underline-offset-4 hover:text-white" href="/services">Services</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{page.title}</li>
              </ol>
            </nav>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary sm:text-sm">{page.eyebrow}</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl" id="detail-title">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteLink className="min-h-14 px-8 text-base" label="Request a Quote" />
              <a className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/60 px-7 py-3 text-sm font-bold text-white transition-colors hover:border-brand-secondary hover:text-brand-secondary" href="tel:7183971333">
                718-397-1333
              </a>
            </div>
            <p className="mt-6 text-xs font-medium tracking-wide text-white/65">
              Sprinter vans · SUVs · Limousines
            </p>
          </div>
        </div>
        <span aria-hidden="true" className="absolute bottom-0 right-8 hidden h-24 w-px bg-brand-secondary/80 lg:block" />
      </section>

      <section aria-labelledby="service-intro-title" className="section-pad overflow-hidden bg-white">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{content.audienceHeading}</p>
            <h2 className="section-heading text-3xl sm:text-5xl" id="service-intro-title">{content.introHeading}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-brand-muted">{content.audience}</p>
          </div>
          <div className="relative min-h-[17rem] overflow-hidden rounded-2xl bg-brand-dark shadow-[0_20px_50px_rgba(9,79,89,0.18)] sm:min-h-[23rem]">
            <Image
              alt={content.introImageAlt}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              src={`/images/${content.introImage}`}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-brand-dark/75 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              Private transportation in New York
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="service-benefits-title" className="section-pad bg-brand-soft">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-4">A considered ride</p>
          <h2 className="section-heading text-3xl sm:text-5xl" id="service-benefits-title">Make the trip easier to coordinate.</h2>
          <BenefitCards items={content.benefits} />
        </div>
      </section>

      <section aria-labelledby="service-steps-title" className="section-pad bg-white">
        <div className="mx-auto max-w-content">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">From itinerary to reservation</p>
            <h2 className="section-heading text-3xl sm:text-5xl" id="service-steps-title">A clear way to arrange your ride.</h2>
          </div>
          <ol className="mt-10 grid gap-0 border-y border-brand-text/15 md:grid-cols-3 md:divide-x md:divide-brand-text/15">
            {content.steps.map((step, index) => (
              <li className="py-6 md:px-7 md:py-8 first:md:pl-0 last:md:pr-0" key={step.title}>
                <span className="font-display text-4xl font-bold text-brand-primary/60">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-bold text-brand-dark">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <section
          aria-labelledby={`detail-section-${index + 1}`}
          className={`section-pad ${index % 2 === 0 ? "bg-brand-soft" : "bg-white"}`}
          key={section.heading}
        >
          <div className={`mx-auto grid max-w-content gap-8 lg:grid-cols-2 lg:gap-16 ${index % 2 ? "" : "lg:[&>*:first-child]:order-2"}`}>
            <div>
              <p className="eyebrow mb-4">Service details</p>
              <h2 className="section-heading text-3xl sm:text-4xl" id={`detail-section-${index + 1}`}>{section.heading}</h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-brand-muted">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul className="space-y-3 pt-2">
                  {section.bullets.map((item) => (
                    <li className="flex gap-3 text-sm leading-6 text-brand-dark" key={item}>
                      <span aria-hidden="true" className="mt-0.5 font-bold text-brand-primary">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="service-journey-title" className="section-pad bg-white">
        <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-4">During the ride</p>
            <h2 className="section-heading text-3xl sm:text-5xl" id="service-journey-title">{content.journeyHeading}</h2>
          </div>
          <ol className="space-y-0 border-l border-brand-primary/25">
            {content.journey.map((item, index) => (
              <li className="relative py-1 pl-8 pb-7 last:pb-0" key={item}>
                <span aria-hidden="true" className="absolute -left-[0.4rem] top-2 h-3 w-3 rounded-full border-2 border-white bg-brand-primary shadow-[0_0_0_1px_rgba(46,115,110,0.3)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Step {index + 1}</span>
                <p className="mt-2 text-base leading-7 text-brand-muted">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="service-planning-title" className="section-pad bg-[#f2f6f2]">
        <div className="mx-auto grid max-w-content gap-8 rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-[0_14px_45px_rgba(41,37,33,0.045)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">A little preparation</p>
            <h2 className="section-heading text-3xl sm:text-4xl" id="service-planning-title">{content.planningHeading}</h2>
          </div>
          <ul className="space-y-4">
            {content.planningTips.map((tip) => (
              <li className="flex gap-3 text-sm leading-6 text-brand-text" key={tip}>
                <span aria-hidden="true" className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-primary">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FleetOptions
        keys={page.recommendedFleet}
        heading="Choose a vehicle for your itinerary"
        description="Compare the existing Sprinter van, SUV and limousine options. Share passenger and luggage details to confirm vehicle fit and availability."
      />

      <MidPageCTA content={content} />

      <ServiceFAQs items={content.faqs} />

      <section aria-labelledby="related-services-title" className="section-pad bg-white">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-4">Keep planning</p>
          <h2 className="section-heading text-3xl sm:text-4xl" id="related-services-title">Related transportation services</h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.slice(0, 3).map((service, index) => (
              <li className="service-card rounded-lg border border-brand-text/10 p-5" key={service.slug}>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Related service {index + 1}</span>
                <a className="mt-3 block font-bold leading-6 text-brand-dark hover:text-brand-primary" href={`/${service.slug}`}>
                  {service.title} <span aria-hidden="true">↗</span>
                </a>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{service.description}</p>
              </li>
            ))}
            <li className="service-card rounded-lg border border-brand-primary/20 bg-brand-soft p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Explore the fleet</span>
              <a className="mt-3 block font-bold leading-6 text-brand-dark hover:text-brand-primary" href="/fleet">
                Compare Sprinter vans, SUVs and limousines <span aria-hidden="true">↗</span>
              </a>
              <p className="mt-2 text-sm leading-6 text-brand-muted">Review the existing vehicle categories and share your passenger and luggage needs.</p>
            </li>
          </ul>
        </div>
      </section>

      <FinalCTA
        eyebrow={page.eyebrow}
        heading="Ready to plan this ride?"
        description="Share your date, locations, passenger count and itinerary to request a quote."
      />
    </main>
  );
}
