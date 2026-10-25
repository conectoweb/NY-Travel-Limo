import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages.rates;
  return pageMetadata("/rates", page.title, page.description);
}

export default function RatesPage() {
  return <ContentPage page={marketingPages.rates} />;
}
