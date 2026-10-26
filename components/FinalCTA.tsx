import { QuoteLink } from "@/components/Header";

export default function FinalCTA({
  eyebrow = "New York private transportation",
  heading = "Tell us about your trip.",
  description = "Request a quote for private transportation with a professional chauffeur.",
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="bg-[#e8f1ed] text-brand-dark"
    >
      <div className="mx-auto flex max-w-content flex-col gap-8 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-5xl" id="final-cta-title">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-brand-muted">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row md:flex-col lg:flex-row">
          <QuoteLink className="min-h-12" label="Request a Quote" />
        </div>
      </div>
    </section>
  );
}
