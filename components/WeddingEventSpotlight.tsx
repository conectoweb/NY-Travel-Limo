import Image from "next/image";
import Link from "next/link";
import { QuoteLink } from "@/components/Header";

export default function WeddingEventSpotlight() {
  return (
    <section
      aria-labelledby="wedding-events-title"
      className="section-pad border-t border-brand-text/10 bg-white"
      id="weddings-events"
    >
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-dark shadow-[0_12px_35px_rgba(41,37,33,0.08)] lg:order-1">
            <Image
              alt="Luxury chauffeur transportation for weddings and private events in New York"
              className="object-cover transition-transform duration-500 hover:scale-105"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/services/wedding-transportation-in-nyc.webp"
            />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-brand-accent/90 px-4 py-2 text-xs font-semibold text-white">
              Weddings &amp; Galas
            </span>
          </div>

          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-3">Weddings &amp; Special Occasions</p>
            <h2 className="section-heading text-3xl sm:text-4xl" id="wedding-events-title">
              Luxury Transportation for NYC Weddings and Special Events
            </h2>
            <p className="mt-5 text-base leading-7 text-brand-muted">
              Make your special day effortless with coordinated private chauffeur service for the
              wedding couple, bridal parties, families, and honored guests. From historic Manhattan
              venues and Brooklyn waterfront receptions to Long Island estates and New Jersey
              destinations, our team ensures punctual arrivals and seamless venue transfers.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-sm text-brand-dark">
                <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                <span>
                  <strong>Coordinated Group Logistics:</strong> 10- to 14-passenger Mercedes-Benz
                  Sprinter vans keep wedding parties and families traveling together comfortably.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-brand-dark">
                <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                <span>
                  <strong>Timely Multi-Stop Shuttles:</strong> Flawless scheduling between hotels,
                  photo locations, ceremony sites, and reception ballrooms.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-brand-dark">
                <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                <span>
                  <strong>Licensed Chauffeur Service:</strong> Professional, discreet, and
                  attentive chauffeurs dedicated exclusively to your celebration timeline.
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuoteLink className="min-h-12 px-7" label="Request Event Quote" />
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-accent px-6 py-3 text-sm font-bold text-brand-accent transition hover:bg-brand-soft"
                href="/luxury-wedding-transportation-in-nyc-with-chauffeur-driven-sprinter-vans"
              >
                Wedding Transportation Details <span aria-hidden="true" className="ml-1.5">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
