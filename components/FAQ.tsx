import { buildFaqPageSchema } from "@/lib/schema";

const questions = [
  {
    question: "How are NY Travel Limo rates calculated for NYC and airport transfers?",
    answer:
      "Rates depend on vehicle type (Mercedes Sprinter Van, Luxury SUV, or Stretch Limousine), pickup and drop-off locations (including JFK, LGA, and EWR), trip duration or hourly charter schedule, and passenger count. Request an instant quote online for exact all-inclusive pricing.",
    link: "/rates",
    linkLabel: "View Rates & Pricing",
  },
  {
    question: "Do you track flights and include airport wait time at JFK, LGA, and EWR?",
    answer:
      "Yes. Our 24/7 dispatch monitors commercial flight arrivals in real time at JFK, LaGuardia (LGA), and Newark (EWR) so your chauffeur adjusts automatically for flight delays and greets you once you land.",
    link: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
    linkLabel: "Explore Airport Transfers",
  },
  {
    question: "How many passengers and suitcases fit in a Mercedes Sprinter Van vs. a Luxury SUV?",
    answer:
      "Our Mercedes-Benz Sprinter Vans seat 10 to 14 passengers with space for 10 to 14 standard suitcases. Executive Luxury SUVs accommodate up to 6 passengers with 4 to 6 suitcases, and Lincoln Stretch Limousines seat 8 to 10 guests.",
    link: "/sprinter-van-rental-with-driver-new-york-nyc",
    linkLabel: "Explore Sprinter Vans",
  },
  {
    question: "Are all NY Travel Limo vehicles chauffeur-driven?",
    answer:
      "Yes. Every reservation includes a licensed, experienced private chauffeur. We do not offer self-drive vehicle rentals.",
    link: "/fleet",
    linkLabel: "Explore Our Fleet",
  },
  {
    question: "Can I arrange corporate transportation, weddings, or hourly charters?",
    answer:
      "Yes. We provide private chauffeur service for corporate roadshows, weddings, group tours, cruise terminals, and hourly as-directed charters across NYC and New Jersey.",
    link: "/contact-us",
    linkLabel: "Request a Quote",
  },
];

export default function FAQ() {
  const faqSchema = buildFaqPageSchema(questions);

  return (
    <section aria-labelledby="faq-title" className="section-pad bg-brand-soft" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-4">Frequently asked questions</p>
          <h2 className="section-heading" id="faq-title">
            Good to know.
          </h2>
        </div>
        <div className="border-t border-brand-text/20">
          {questions.map((item) => (
            <details className="group border-b border-brand-text/20 py-5" key={item.question}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-xl text-brand-primary">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-muted">
                {item.answer}
                {item.link && (
                  <>
                    {" "}
                    <a className="text-link" href={item.link}>
                      {item.linkLabel}
                    </a>
                    .
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
