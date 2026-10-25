import { blogArticles } from "@/lib/site-content";
import BlogCard from "@/components/BlogCard";

export default function BlogPreview() {
  return (
    <section aria-labelledby="latest-articles-title" className="section-pad bg-brand-light">
      <div className="mx-auto max-w-content">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">Travel notes</p>
            <h2 className="section-heading" id="latest-articles-title">
              Helpful guides for getting around New York.
            </h2>
          </div>
          <a className="text-link text-sm" href="/blog">Explore all articles</a>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {blogArticles.map((article) => (
            <li key={article.slug}><BlogCard article={article} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
