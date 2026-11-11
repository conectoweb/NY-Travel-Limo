export default function FeaturedVideo() {
  return (
    <section aria-labelledby="featured-video-title" className="section-pad bg-brand-dark text-white">
      <div className="mx-auto grid max-w-content gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow mb-4">See the NY Travel Limo experience</p>
          <h2 className="section-heading text-3xl text-white sm:text-5xl" id="featured-video-title">
            Your New York ride, up close.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
            Take a closer look at our vehicles and the people behind private chauffeur
            transportation in New York.
          </p>
          <a
            className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-brand-secondary/70 px-6 py-3 text-sm font-bold text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-brand-dark focus-visible:outline-offset-4"
            href="https://www.youtube.com/watch?v=hc9LNuJKvmA&t=3s"
            rel="noopener noreferrer"
            target="_blank"
          >
            Watch on YouTube
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src="https://www.youtube-nocookie.com/embed/hc9LNuJKvmA?start=3&rel=0"
            title="NY Travel Limo private transportation in New York"
          />
        </div>
      </div>
    </section>
  );
}
