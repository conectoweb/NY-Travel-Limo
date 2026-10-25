import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { pageLinks } from "@/app/sitemap-page-data";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/sitemap",
    "Website Sitemap | NY Travel Limo",
    "Browse NY Travel Limo service, fleet, travel guide and information pages."
  );
}

export default function SitemapPage() {
  return (
    <ContentPage
      page={{
        title: "Website Sitemap",
        description: "Browse website pages.",
        eyebrow: "Explore the website",
        intro: "Use this list to browse NY Travel Limo pages and travel guides.",
        sections: [{ heading: "All pages", paragraphs: ["Choose a page below to learn about transportation services, vehicle categories, trip planning and business information."] }],
        links: pageLinks,
      }}
    />
  );
}
