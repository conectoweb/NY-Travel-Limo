export default function ServiceAreas() {
  const areas = [
    "Manhattan",
    "Brooklyn",
    "Queens",
    "The Bronx",
    "Staten Island",
    "Long Island",
    "New Jersey",
    "JFK",
    "LaGuardia",
    "Newark",
  ];

  return (
    <section
      aria-labelledby="areas-title"
      className="border-y border-brand-text/10 bg-brand-light"
      id="service-areas"
    >
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="mb-8">
          <p className="eyebrow mb-2">Service areas</p>
          <h2 className="font-display text-3xl text-brand-dark" id="areas-title">
            New York City and beyond
          </h2>
        </div>
        <ul className="flex flex-wrap gap-3">
          {areas.map((area) => (
            <li
              className="border border-brand-text/15 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark"
              key={area}
            >
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
