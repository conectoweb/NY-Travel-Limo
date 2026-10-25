const trustSignals = [
  "Private chauffeur transportation",
  "Sprinter vans for group travel",
  "SUV and limousine options",
  "Quote based on your itinerary",
];

export default function TrustSignals() {
  return (
    <section aria-label="Why travel with NY Travel Limo" className="mt-10 text-white sm:mt-12">
      <ul className="flex max-w-full flex-wrap gap-x-6 gap-y-3 sm:gap-x-7 lg:flex-nowrap">
        {trustSignals.map((signal) => (
          <li className="flex items-center gap-2 text-sm font-semibold leading-5" key={signal}>
            <span aria-hidden="true" className="text-base text-brand-secondary">✦</span>
            <span>{signal}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
