import Image from "next/image";
import { fleetOptions } from "@/lib/site-content";

type FleetImages = Record<string, { src: string; alt: string }>;

export default function FleetOptions({
  keys,
  images,
  heading = "Choose the right vehicle for your trip",
  description = "From group transportation in a Mercedes-Benz Sprinter van to a private SUV or limousine, choose the option that fits your plans.",
}: {
  keys?: readonly string[];
  images?: FleetImages;
  heading?: string;
  description?: string;
}) {
  const options = keys
    ? fleetOptions.filter((option) => keys.includes(option.key))
    : fleetOptions;

  return (
    <section
      aria-labelledby="fleet-options-title"
      className="section-pad bg-white"
      id="fleet"
    >
      <div className="mx-auto max-w-content">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow mb-4">Our fleet</p>
          <h2 className="section-heading" id="fleet-options-title">
            {heading}
          </h2>
          <p className="mt-5 text-base leading-7 text-brand-muted">{description}</p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {options.map((option) => (
            <li
              className={`service-card group relative flex flex-col overflow-hidden rounded-2xl border-t-4 p-6 shadow-[0_12px_35px_rgba(41,37,33,0.06)] sm:p-8 ${
                option.key === "sprinter"
                  ? "border-brand-secondary border-x border-b border-x-brand-accent border-b-brand-accent bg-brand-accent text-white"
                  : "border-brand-primary border-x-brand-text/10 border-b-brand-text/10 bg-white text-brand-dark"
              }`}
              key={option.key}
            >
              {images?.[option.key] && (
                <div className="relative -mx-6 -mt-6 mb-6 h-52 overflow-hidden sm:-mx-8 sm:-mt-8 sm:h-60">
                  <Image
                    alt={images[option.key].alt}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    src={images[option.key].src}
                  />
                </div>
              )}
              <p className={`eyebrow mb-4 ${option.key === "sprinter" ? "text-brand-secondary" : ""}`}>
                {option.key === "sprinter"
                  ? "Featured vehicle"
                  : option.key === "suv"
                    ? "Private travel"
                    : "Special occasions"}
              </p>
              <h3 className="text-2xl font-bold leading-tight">{option.title}</h3>
              <p
                className={`mt-4 flex-1 text-sm leading-6 ${
                  option.key === "sprinter" ? "text-white/75" : "text-brand-muted"
                }`}
              >
                {option.description}
              </p>
              <a
                className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline decoration-brand-secondary decoration-2 underline-offset-4 ${
                  option.key === "sprinter" ? "text-white" : "text-brand-accent"
                }`}
                href={option.href}
              >
                Explore {option.key === "sprinter" ? "Sprinter Vans" : option.title}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
