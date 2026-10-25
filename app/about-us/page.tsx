import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["about-us"];
  return pageMetadata("/about-us", page.title, page.description);
}

export default function AboutUsPage() {
  return <ContentPage page={marketingPages["about-us"]} />;
}
