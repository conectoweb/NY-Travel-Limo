export default function ServiceAreas() {
  const areas = [
    { label: "Manhattan", href: "/point-to-point-transportation-service-in-new-york" },
    { label: "Brooklyn", href: "/sprinter-van-rental-with-driver-new-york-nyc" },
    { label: "Queens", href: "/group-transportation-in-new-york-near-me" },
    { label: "The Bronx", href: "/transportation-by-hours-in-new-york" },
    { label: "Staten Island", href: "/funeral-transportation-services-nyc-dignified-professional" },
    { label: "Long Island", href: "/wine-tours-transportation-service-from-new-york" },
    { label: "New Jersey", href: "/corporate-transportation-service-with-driver-in-new-york" },
    { label: "JFK Airport", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
    { label: "LaGuardia Airport", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
    { label: "Newark Airport", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" },
    { label: "NYC Cruise Ports", href: "/cruise-terminal-transportation-services-in-new-york-with-driver" },
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
          <p className="mt-2 text-sm text-brand-muted">
            Explore private chauffeured transportation services across the five boroughs, airports and regional destinations.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {areas.map((area) => (
            <li key={area.label}>
              <a
                className="inline-block rounded-lg border border-brand-text/15 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary hover:bg-white hover:text-brand-primary hover:shadow-sm"
                href={area.href}
              >
                {area.label} <span aria-hidden="true" className="text-xs text-brand-primary">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
