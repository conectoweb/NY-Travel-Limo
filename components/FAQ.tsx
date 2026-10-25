const questions = [
  {
    question: "What can I use a Sprinter Van for?",
    answer:
      "Mercedes-Benz Sprinter Vans are a featured option for private group transportation, including airport transfers, corporate travel, tours, cruise transfers and events. Visit the Sprinter page for vehicle information.",
    link: "/sprinter-van-rental-with-driver-new-york-nyc",
    linkLabel: "Explore Sprinter Vans",
  },
  {
    question: "When should I consider an SUV?",
    answer:
      "A private SUV can suit airport trips, business travel, family transportation or a direct ride around New York. Share passenger and luggage details to discuss whether it fits your trip.",
    link: "/luxury-suv-rental-nyc",
    linkLabel: "Explore SUVs",
  },
  {
    question: "Can I book a limousine for a wedding or event?",
    answer:
      "NY Travel Limo arranges limousine transportation for weddings, celebrations, evenings out and special occasions. Include your schedule and passenger count when requesting a quote.",
    link: "/lincoln-stretch-limo-rental-nyc",
    linkLabel: "Explore Limousines",
  },
  {
    question: "Do you provide transportation to New York airports?",
    answer:
      "Airport transportation is listed for JFK, LaGuardia and Newark. Include your airport, pickup details and destination when you request a quote.",
  },
  {
    question: "Can I arrange corporate transportation or a roadshow?",
    answer:
      "Corporate transportation and roadshow transportation are available service categories. Share your itinerary and trip requirements to request a quote.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Use the reservation request form and provide your trip date, pickup and drop-off locations, passenger count and transportation needs.",
    link: "/reservations",
    linkLabel: "Request a Quote",
  },
];

export default function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="section-pad bg-brand-soft" id="faq">
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
