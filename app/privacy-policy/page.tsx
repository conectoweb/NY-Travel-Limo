import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["privacy-policy"];
  return pageMetadata("/privacy-policy", page.title, page.description);
}

export default function PrivacyPolicyPage() {
  return <ContentPage page={marketingPages["privacy-policy"]} />;
}
