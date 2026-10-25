import type { MetadataRoute } from "next";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isPublicSite = await isPublicSiteRequest();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(isPublicSite ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
