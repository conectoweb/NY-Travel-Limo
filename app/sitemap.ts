import type { MetadataRoute } from "next";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";
import { blogArticles, fleetPages, servicePages } from "@/lib/site-content";

const publicPages = [
  "/",
  "/services",
  "/fleet",
  "/rates",
  "/about-us",
  "/frequently-asked-questions",
  "/gallery",
  "/sitemap",
  "/contact-us",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-and-conditions",
  "/blog",
  ...fleetPages.map((page) => `/${page.slug}`),
  ...servicePages.map((page) => `/${page.slug}`),
  ...blogArticles.map((article) => `/blog/${article.slug}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!(await isPublicSiteRequest())) {
    return [];
  }

  const uniquePages = [...new Set(publicPages)];
  return uniquePages.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
