import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["cookie-policy"];
  return pageMetadata("/cookie-policy", page.title, page.description);
}

export default function CookiePolicyPage() {
  return <ContentPage page={marketingPages["cookie-policy"]} />;
}
