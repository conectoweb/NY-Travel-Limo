export type FleetCardProps = {
  name: string;
  eyebrow: string;
  description: string;
  href: string;
  linkLabel: string;
  featured?: boolean;
};

export default function FleetCard({
  name,
  eyebrow,
  description,
  href,
  linkLabel,
  featured = false,
}: FleetCardProps) {
  return (
    <article
      className={`group ${featured ? "bg-brand-dark text-white" : "border border-brand-text/10 bg-white text-brand-text"}`}
    >
      <div
        aria-hidden="true"
        className={`photo-placeholder ${featured ? "min-h-[22rem] bg-brand-dark sm:min-h-[28rem]" : "min-h-[17rem]"}`}
      >
        <span>Vehicle image to be added</span>
      </div>
      <div className="p-6 sm:p-8">
        <p className={`eyebrow mb-3 ${featured ? "text-brand-secondary" : ""}`}>{eyebrow}</p>
        <h3 className="font-display text-3xl leading-tight">{name}</h3>
        <p className={`mt-4 max-w-lg text-sm leading-6 ${featured ? "text-white/75" : "text-brand-muted"}`}>
          {description}
        </p>
        <a
          className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline decoration-brand-secondary decoration-2 underline-offset-4 transition-colors hover:text-brand-secondary ${featured ? "text-white" : "text-brand-accent"}`}
          href={href}
        >
          {linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
