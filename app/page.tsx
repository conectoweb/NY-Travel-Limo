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
    alternates: isPublicSite ? { canonical: `${siteUrl}/` } : undefined,
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
