import type { Metadata } from "next";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import FeaturedVideo from "@/components/FeaturedVideo";
import FinalCTA from "@/components/FinalCTA";
import FleetOptions from "@/components/FleetOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import ServicesGrid from "@/components/ServicesGrid";
import Steps from "@/components/Steps";
import WeddingEventSpotlight from "@/components/WeddingEventSpotlight";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Book Private Transportation in NYC | NY Travel Limo";
  const description =
    "Private Transportation in NY With a Chauffeur Service for Airport Transfers, Business Schedules, Group Travel & Events. Compare Sprinter Vans, SUVs & Limousines";
  const isPublicSite = await isPublicSiteRequest();

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: isPublicSite ? `${siteUrl}/` : undefined,
      images: [
        {
          url: "/images/nyc-sprinter-van-hero.avif",
          alt: "A black Mercedes-Benz Sprinter van on a New York City street",
        },
      ],
    },
  };
}

export default function HomePage() {
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NY Travel Limo",
    url: "https://www.nytravellimo.com/",
    telephone: "+1-516-256-2892",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Manhattan, New York" },
      { "@type": "AdministrativeArea", name: "Brooklyn, New York" },
      { "@type": "AdministrativeArea", name: "Queens, New York" },
      { "@type": "AdministrativeArea", name: "Bronx, New York" },
      { "@type": "AdministrativeArea", name: "Staten Island, New York" },
      { "@type": "AdministrativeArea", name: "New Jersey" },
      { "@type": "Place", name: "John F. Kennedy International Airport (JFK)" },
      { "@type": "Place", name: "LaGuardia Airport (LGA)" },
      { "@type": "Place", name: "Newark Liberty International Airport (EWR)" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <Hero />

        <FeaturedVideo />
        <FleetOptions
          heading="Chauffeur-Driven Mercedes-Benz Sprinter Van Rental in NYC"
          description="Reserve executive 10- to 14-passenger Sprinter vans with licensed professional drivers for corporate itineraries, airport travel, and group events."
          images={{
            sprinter: { src: "/images/services/Sprinter-Van-Rental-Rates-in-NYC.webp", alt: "Black Sprinter van ready for private group transportation" },
            suv: { src: "/images/services/suv-transportation.png", alt: "Private SUV transportation vehicle" },
            limousine: { src: "/images/services/limousines-transportation.png", alt: "Limousine ready for a New York special occasion" },
          }}
        />
        <ServicesGrid />

        {/* Commercial Standards & Fleet Guidance Section */}
        <section aria-labelledby="home-guide-title" className="section-pad bg-white">
          <div className="mx-auto max-w-content">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3 text-brand-secondary">Premium Executive Transportation</p>
              <h2 className="section-heading text-3xl sm:text-4xl" id="home-guide-title">
                Private Chauffeur Service in NYC: Standards, Fleet &amp; Booking
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                Since 1998, NY Travel Limo has provided reliable, chauffeur-driven black car and luxury van transportation across New York City and the Tri-State area. Whether you need a discreet airport transfer, an executive corporate roadshow, or coordinated group transportation, our private fleet is maintained to the highest standards.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-brand-primary/10 bg-brand-soft/40 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-dark">Licensed TLC Chauffeurs</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Every journey is operated by an experienced, background-checked professional chauffeur in formal executive attire who knows NYC streets, bridges, and terminals intimately.
                </p>
              </div>

              <div className="rounded-xl border border-brand-primary/10 bg-brand-soft/40 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-dark">Punctual Airport Tracking</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Real-time flight telemetry monitoring for JFK, LaGuardia, and Newark Liberty ensures your driver’s arrival is automatically synchronized with your actual flight landing.
                </p>
              </div>

              <div className="rounded-xl border border-brand-primary/10 bg-brand-soft/40 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-dark">Tailored Fleet Matching</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Choose from 10–14 passenger <a className="text-link" href="/sprinter-van-rental-with-driver-new-york-nyc">Mercedes-Benz Sprinters</a>, 6-passenger <a className="text-link" href="/luxury-suv-rental-nyc">luxury executive SUVs</a>, or classic <a className="text-link" href="/lincoln-stretch-limo-rental-nyc">stretch limousines</a>.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-brand-primary/15 bg-brand-soft p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark">Vehicle, Passenger &amp; Luggage Recommendations</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-brand-muted">
                    <li className="flex items-start gap-2">
                      <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                      <span><strong>Mercedes Sprinter Vans:</strong> Accommodates 10 to 14 passengers with 10 to 14 large suitcases in a stand-up high-roof cabin.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                      <span><strong>Executive Luxury SUVs:</strong> Accommodates up to 6 passengers with 4 to 6 suitcases for private corporate or family rides.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span aria-hidden="true" className="font-bold text-brand-primary">✓</span>
                      <span><strong>Lincoln Stretch Limos:</strong> Accommodates 8 to 10 guests with classic lounge seating for weddings, galas, and celebrations.</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-start justify-center gap-4 lg:items-end">
                  <p className="text-sm text-brand-muted lg:text-right">
                    Full service coverage across Manhattan, Brooklyn, Queens, Bronx, Staten Island, Long Island, and New Jersey.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-secondary px-7 text-sm font-bold text-brand-accent transition hover:bg-brand-accent hover:text-brand-secondary"
                      href="/contact-us"
                    >
                      Request a Custom Quote
                    </a>
                    <a
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-accent bg-transparent px-6 text-sm font-bold text-brand-accent transition hover:bg-brand-accent hover:text-white"
                      href="/fleet"
                    >
                      Explore Our Fleet
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WeddingEventSpotlight />
        <Steps />
        <ServiceAreas />
        <Reviews />
        <FAQ />
        <BlogPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
