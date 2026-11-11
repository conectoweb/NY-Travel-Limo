import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["terms-and-conditions"];
  const base = await pageMetadata("/terms-and-conditions", page.seoTitle || "Terms and Conditions | NY Travel Limo", page.description);

  return {
    ...base,
    alternates: {
      canonical: "/terms-and-conditions",
    },
  };
}

export default function TermsAndConditionsPage() {
  return <ContentPage page={marketingPages["terms-and-conditions"]} />;
}
