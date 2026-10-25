import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["terms-and-conditions"];
  return pageMetadata("/terms-and-conditions", page.title, page.description);
}

export default function TermsAndConditionsPage() {
  return <ContentPage page={marketingPages["terms-and-conditions"]} />;
}
