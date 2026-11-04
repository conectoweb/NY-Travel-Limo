import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header, { QuoteLink } from "@/components/Header";
import { blogArticles, findBlogArticle } from "@/lib/site-content";
import { siteUrl } from "@/lib/seo";
import FormattedText from "@/components/FormattedText";

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findBlogArticle(slug);

  if (!article) {
    return { title: "Article Not Found | NY Travel Limo" };
  }

  const url = `${siteUrl}/blog/${article.slug}`;
  const pageTitle = article.seoTitle || `${article.title} | NY Travel Limo`;

  return {
    title: pageTitle,
    description: article.description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: article.description,
      type: "article",
      url,
      images: [{
        url: article.image?.src ?? "/images/nyc-sprinter-van-hero.avif",
        alt: article.image?.alt ?? article.title,
      }],
      publishedTime: article.updated,
      modifiedTime: article.updated,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findBlogArticle(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.updated,
    dateModified: article.updated,
    author: { "@type": "Organization", name: "NY Travel Limo" },
    publisher: {
      "@type": "Organization",
      name: "NY Travel Limo",
      url: "https://www.nytravellimo.com/",
    },
    mainEntityOfPage: `${siteUrl}/blog/${article.slug}`,
  };

  const itemListSchema =
    article.items && article.items.length > 0
      ? {
          "@type": "ItemList",
          name: article.title,
          description: article.description,
          numberOfItems: article.items.length,
          itemListElement: article.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.url,
          })),
        }
      : null;

  const structuredData = itemListSchema
    ? {
        "@context": "https://schema.org",
        "@graph": [articleSchema, itemListSchema],
      }
    : {
        "@context": "https://schema.org",
        ...articleSchema,
      };
  const relatedLink = article.slug.includes("wine")
    ? { label: "Wine tour transportation from NYC to regional vineyards", href: "/wine-tours-transportation-service-from-new-york" }
    : article.slug.includes("airport")
      ? { label: "Private airport transportation in New York", href: "/airport-transportation-services-in-nyc-with-professional-chauffeurs" }
      : article.slug.includes("group")
        ? { label: "Private group transportation in New York", href: "/group-transportation-in-new-york-near-me" }
        : { label: "Compare Sprinter vans, SUVs and limousines", href: "/fleet" };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <article>
          <header className="bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
            <div className="mx-auto max-w-4xl">
              <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
                <ol className="flex flex-wrap gap-2">
                  <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                  <li aria-hidden="true">/</li>
                  <li><a className="underline underline-offset-4 hover:text-white" href="/blog">Travel Guides</a></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">{article.title}</li>
                </ol>
              </nav>
              <p className="eyebrow mb-5 text-brand-secondary">{article.category}</p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{article.intro}</p>
              <p className="mt-5 text-sm text-white/60">
                Updated{" "}
                <time dateTime={article.updated}>
                  {new Date(`${article.updated}T12:00:00`).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </p>
            </div>
          </header>
          <div className="section-pad bg-white">
            <div className="mx-auto max-w-3xl">
              {article.image && (
                <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-brand-secondary/30 bg-brand-dark shadow-[0_12px_35px_rgba(9,79,89,0.12)]">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="space-y-10">
                {article.sections.map((section, index) => (
                  <section aria-labelledby={`article-section-${index + 1}`} key={section.heading}>
                    <h2
                      className="text-2xl font-bold leading-tight text-brand-dark sm:text-3xl"
                      id={`article-section-${index + 1}`}
                    >
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-7 text-brand-muted">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>
                          <FormattedText text={paragraph} />
                        </p>
                      ))}
                    </div>
                    {section.table && (
                      <div className="mt-6 overflow-x-auto rounded-lg border border-brand-text/15">
                        <table className="w-full min-w-full divide-y divide-brand-text/10 text-left text-sm">
                          <thead className="bg-brand-soft">
                            <tr>
                              {section.table.headers.map((header) => (
                                <th
                                  key={header}
                                  className="px-4 py-3 font-bold text-brand-dark"
                                  scope="col"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-text/10 bg-white">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="transition-colors hover:bg-brand-soft/40">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 text-brand-muted align-top">
                                    <FormattedText text={cell} />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {section.bullets && (
                      <ul className="mt-5 list-inside list-disc space-y-2 text-base leading-7 text-brand-muted">
                        {section.bullets.map((item) => (
                          <li key={item}>
                            <FormattedText text={item} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
              <div className="mt-12 flex flex-col items-start gap-5 border-t border-brand-text/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-brand-dark">Planning a New York ride?</h2>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Explore our services or request a quote for your itinerary.
                  </p>
                </div>
                <p className="mt-6 text-sm">
                  Related: <a className="text-link" href={relatedLink.href}>{relatedLink.label}</a>
                </p>
                <QuoteLink className="shrink-0" label="Request a Quote" />
              </div>
              <p className="mt-8 text-sm">
                <a className="text-link" href="/blog">Back to all travel guides</a>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
