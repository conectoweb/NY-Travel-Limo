import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailPage from "@/components/DetailPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { findDetailPage, detailPages } from "@/lib/site-content";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return detailPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findDetailPage(slug);

  if (!page) {
    return { title: "Page Not Found | NY Travel Limo" };
  }

  const url = `${siteUrl}/${page.slug}`;
  const isPublicSite = await isPublicSiteRequest();

  return {
    title: `${page.title} | NY Travel Limo`,
    description: page.description,
    alternates: isPublicSite ? { canonical: url } : undefined,
    openGraph: {
      title: `${page.title} | NY Travel Limo`,
      description: page.description,
      type: "website",
      url: isPublicSite ? url : undefined,
      images: [
        {
          url: "/images/nyc-sprinter-van-hero.avif",
          alt: "Chauffeur-driven private transportation in New York",
        },
      ],
    },
  };
}

export default async function DetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findDetailPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header />
      <DetailPage page={page} />
      <Footer />
    </>
  );
}
