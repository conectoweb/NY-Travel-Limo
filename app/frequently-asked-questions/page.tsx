import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { marketingPages } from "@/lib/marketing-pages";
import { pageMetadata } from "@/lib/page-metadata";
import { buildFaqPageSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const page = marketingPages["frequently-asked-questions"];
  const base = await pageMetadata("/frequently-asked-questions", page.seoTitle || "NYC Chauffeur & Sprinter Van FAQ | 24/7 Booking Guide", page.description);

  return {
    ...base,
    alternates: {
      canonical: "/frequently-asked-questions",
    },
  };
}

export default function FrequentlyAskedQuestionsPage() {
  const page = marketingPages["frequently-asked-questions"];
  const visibleFaqs: { question: string; answer: string }[] = [];

  for (const section of page.sections) {
    for (const paragraph of section.paragraphs) {
      const match = paragraph.match(/^\*\*([^*]+)\*\*\s*(.+)$/);
      if (match) {
        visibleFaqs.push({ question: match[1].trim(), answer: match[2].trim() });
      }
    }
  }

  const faqSchema = visibleFaqs.length > 0 ? buildFaqPageSchema(visibleFaqs) : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <ContentPage page={page} />
    </>
  );
}
