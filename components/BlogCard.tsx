import Image from "next/image";
import type { BlogArticle } from "@/lib/site-content";

function readingTime(article: BlogArticle): number {
  const articleText = [
    article.title,
    article.description,
    article.intro,
    ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
  ].join(" ");
  return Math.max(1, Math.ceil(articleText.trim().split(/\s+/).length / 200));
}

function updatedDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-secondary/80 bg-brand-accent text-white shadow-[0_12px_35px_rgba(9,79,89,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(9,79,89,0.24)]">
      <a
        aria-label={`Read ${article.title}`}
        className="relative block aspect-[16/9] overflow-hidden bg-brand-dark"
        href={`/blog/${article.slug}`}
        tabIndex={-1}
      >
        <Image
          src="/images/nyc-sprinter-van-hero.avif"
          alt="Chauffeur-driven Sprinter van for private transportation in New York City"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/75">
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src="/images/Logo NY Travel Limo.png"
              alt=""
              aria-hidden="true"
              width={92}
              height={24}
              className="h-6 w-[92px] rounded-sm bg-white object-contain p-0.5"
            />
            <span className="font-semibold text-white">NY Travel Limo</span>
          </div>
          <time dateTime={article.updated}>Updated {updatedDate(article.updated)}</time>
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">{article.category}</p>
        <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-white sm:text-[1.7rem]">
          <a className="transition-colors hover:text-brand-secondary focus-visible:text-brand-secondary" href={`/blog/${article.slug}`}>
            {article.title}
          </a>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-white/75">{article.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-brand-secondary/40 pt-4 text-xs font-semibold text-white/80">
          <span className="inline-flex items-center gap-2">
            <svg aria-hidden="true" className="h-4 w-4 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {readingTime(article)} min read
          </span>
          <span className="inline-flex items-center gap-2 text-brand-secondary transition-transform group-hover:translate-x-1">
            Read article
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
