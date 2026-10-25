const steps = [
  {
    number: "01",
    title: "Request a Quote",
    description:
      "Share your trip date, pickup and drop-off locations, passenger count and transportation needs.",
  },
  {
    number: "02",
    title: "Review Your Quote",
    description:
      "Review the transportation details and quote prepared for your itinerary.",
  },
  {
    number: "03",
    title: "Complete Your Reservation",
    description:
      "Continue through the reservation system to confirm your trip and receive your booking details.",
  },
];

export default function Steps() {
  return (
    <section
      aria-labelledby="steps-title"
      className="section-pad bg-brand-dark text-white"
      id="how-it-works"
    >
      <div className="mx-auto max-w-content">
        <p className="eyebrow mb-4 text-brand-secondary">From quote to reservation</p>
        <h2 className="section-heading max-w-2xl" id="steps-title">
          How it works
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <li className="border-t border-white/25 pt-6" key={step.number}>
              <span className="font-display text-3xl text-brand-secondary">{step.number}</span>
              <h3 className="mt-6 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
