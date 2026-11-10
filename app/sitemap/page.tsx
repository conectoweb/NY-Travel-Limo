import type { Metadata } from "next";
import Header, { QuoteLink } from "@/components/Header";
import Footer from "@/components/Footer";
import { sitemapCategories } from "@/app/sitemap-page-data";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const base = await pageMetadata(
    "/sitemap",
    "Website Sitemap | NY Travel Limo",
    "Browse our complete, organized directory of luxury fleet options, private chauffeur services, travel guides, and company resources across New York and New Jersey."
  );

  return {
    ...base,
    alternates: {
      canonical: "/sitemap",
    },
  };
}

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main>
        <header className="services-hero-enter bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-content">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
              <ol className="flex gap-2">
                <li>
                  <a className="underline underline-offset-4 hover:text-white" href="/">
                    Home
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Website Sitemap</li>
              </ol>
            </nav>
            <p className="eyebrow mb-5 text-brand-secondary">EXPLORE THE WEBSITE</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl">
              Website Sitemap
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              A comprehensive and organized directory of all public pages, luxury fleet vehicles,
              private chauffeured transportation services, travel planning guides, and company resources.
            </p>

            <nav aria-label="Sitemap quick navigation" className="mt-8 flex flex-wrap gap-2.5">
              {sitemapCategories.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-secondary hover:text-brand-dark"
                >
                  {section.category}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <section className="section-pad bg-brand-light">
          <div className="mx-auto max-w-content">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {sitemapCategories.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="flex flex-col rounded-2xl border border-brand-text/10 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
                      {section.badge}
                    </span>
                    <span className="text-xs font-medium text-brand-muted">
                      {section.links.length} {section.links.length === 1 ? "page" : "pages"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-brand-dark">
                    {section.category}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">
                    {section.description}
                  </p>

                  <ul className="mt-6 divide-y divide-brand-text/10 border-t border-brand-text/10">
                    {section.links.map((link) => (
                      <li key={link.href} className="py-3">
                        <a
                          href={link.href}
                          className="group block transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="font-semibold text-brand-accent transition-colors group-hover:text-brand-primary">
                              {link.label}
                            </span>
                            <span
                              aria-hidden="true"
                              className="text-xs text-brand-secondary transition-transform group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </div>
                          {link.description && (
                            <p className="mt-0.5 text-xs leading-5 text-brand-muted line-clamp-2">
                              {link.description}
                            </p>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-brand-text/10 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-xl font-bold text-brand-dark">
                  Need private transportation in New York?
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Request a custom quote for Sprinter vans, executive SUVs, or stretch limousines.
                </p>
              </div>
              <div className="mt-5 sm:mt-0 sm:shrink-0">
                <QuoteLink label="Request a Quote" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
