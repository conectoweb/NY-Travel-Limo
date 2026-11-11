import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["cookie-policy"];
  const base = await pageMetadata("/cookie-policy", page.seoTitle || "Cookie Policy | NY Travel Limo", page.description);

  return {
    ...base,
    alternates: {
      canonical: "/cookie-policy",
    },
  };
}

export default function CookiePolicyPage() {
  return <ContentPage page={marketingPages["cookie-policy"]} />;
}
