import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["frequently-asked-questions"];
  return pageMetadata("/frequently-asked-questions", page.title, page.description);
}

export default function FrequentlyAskedQuestionsPage() {
  return <ContentPage page={marketingPages["frequently-asked-questions"]} />;
}
