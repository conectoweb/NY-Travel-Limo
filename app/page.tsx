import type { Metadata } from "next";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FleetOptions from "@/components/FleetOptions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import ServicesGrid from "@/components/ServicesGrid";
import Steps from "@/components/Steps";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Private Transportation in NYC | NY Travel Limo";
  const description =
    "Explore private transportation in NYC with a chauffeur service for airport transfers, business schedules, group travel and events. Compare Sprinter vans, SUVs and limousines.";
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
    "@type": "LocalBusiness",
    name: "NY Travel Limo",
    url: "https://www.nytravellimo.com/",
    telephone: ["+1-718-397-1333", "+1-516-256-2892"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "358 W 56th St, Suite 4D",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10019",
      addressCountry: "US",
    },
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

        <FleetOptions
          heading="Room for the ride ahead."
          description="Explore our vehicle categories, with Mercedes-Benz Sprinter vans at the center of the experience."
        />
        <ServicesGrid />
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
