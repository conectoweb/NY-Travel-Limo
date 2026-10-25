import Header, { QuoteLink } from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

export type ContentPageData = {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  links?: { label: string; href: string }[];
};

export default function ContentPage({ page }: { page: ContentPageData }) {
  return (
    <>
      <Header />
      <main>
        <header className="services-hero-enter bg-brand-dark px-5 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-content">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
              <ol className="flex gap-2">
                <li><a className="underline underline-offset-4 hover:text-white" href="/">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{page.title}</li>
              </ol>
            </nav>
            <p className="eyebrow mb-5 text-brand-secondary">{page.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {page.intro}
            </p>
          </div>
        </header>
        <article className="section-pad bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-10">
              {page.sections.map((section, index) => (
                <section aria-labelledby={`content-section-${index}`} key={section.heading}>
                  <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl" id={`content-section-${index}`}>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-brand-muted">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 list-inside list-disc space-y-2 text-base leading-7 text-brand-muted">
                      {section.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            {page.links && (
              <nav aria-label="Related pages" className="mt-12 border-t border-brand-text/10 pt-8">
                <h2 className="text-xl font-bold text-brand-dark">Explore related pages</h2>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {page.links.map((link) => (
                    <li key={link.href}><a className="text-link" href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="mt-12 flex flex-col gap-4 border-t border-brand-text/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-brand-dark">Questions about a New York trip?</p>
              <QuoteLink label="Request a Quote" />
            </div>
          </div>
        </article>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
