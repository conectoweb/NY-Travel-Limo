import type { BlogArticle } from "@/lib/site-content";

export default function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <article className="flex h-full flex-col border border-brand-text/10 bg-white p-6 shadow-[0_8px_30px_rgba(41,37,33,0.045)] sm:p-8">
      <p className="eyebrow">{article.category}</p>
      <h3 className="mt-4 text-xl font-bold leading-snug text-brand-dark sm:text-2xl">
        <a className="hover:text-brand-primary" href={`/blog/${article.slug}`}>
          {article.title}
        </a>
      </h3>
      <p className="mt-4 flex-1 text-sm leading-6 text-brand-muted">{article.description}</p>
      <a
        className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-accent underline decoration-brand-secondary decoration-2 underline-offset-4"
        href={`/blog/${article.slug}`}
      >
        Read article <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
