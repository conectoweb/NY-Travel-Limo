import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { blogArticles } from "@/lib/site-content";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const title = "New York Travel Guides | NY Travel Limo";
  const description =
    "Practical guides to choosing a vehicle, planning airport transfers and arranging group transportation in New York.";
  const isPublicSite = await isPublicSiteRequest();

  return {
    title,
    description,
    alternates: isPublicSite ? { canonical: `${siteUrl}/blog` } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: isPublicSite ? `${siteUrl}/blog` : undefined,
      images: [{
        url: "/images/nyc-sprinter-van-hero.avif",
        alt: "Sprinter van for private transportation in New York",
      }],
    },
  };
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-content">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
              <ol className="flex gap-2">
                <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Travel Guides</li>
              </ol>
            </nav>
            <p className="eyebrow mb-5 text-brand-secondary">NY Travel Limo journal</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl">
              Helpful guides for getting around New York.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Straightforward advice for planning airport transportation, group travel and a ride
              that fits your plans.
            </p>
          </div>
        </section>
        <section aria-labelledby="articles-title" className="section-pad bg-brand-light">
          <div className="mx-auto max-w-content">
            <div className="mb-10">
              <p className="eyebrow mb-4">Travel planning</p>
              <h2 className="section-heading" id="articles-title">Explore our latest articles</h2>
            </div>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {blogArticles.map((article) => (
                <li key={article.slug}><BlogCard article={article} /></li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
