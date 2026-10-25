import type { Metadata } from "next";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";

export async function pageMetadata(path: string, title: string, description: string): Promise<Metadata> {
  const isPublicSite = await isPublicSiteRequest();
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: isPublicSite ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: isPublicSite ? url : undefined,
      images: [{
        url: "/images/nyc-sprinter-van-hero.avif",
        alt: "Chauffeur-driven Sprinter van for private transportation in New York",
      }],
    },
  };
}
