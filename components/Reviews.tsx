const reviews = [
  {
    quote:
      "Ruben and the Team at NY Travel Limo are a great company to work with. They have great vehicles and professional drivers. They are always on Time and Ruben is always available to help!",
    author: "Jordi Zarroca",
  },
  {
    quote:
      "The whole tour was awesome. Their limo service in New York is tremendous. We really enjoyed a comfortable ride to the resort and spent a super cool weekend. The driver was very kind and humble.",
    author: "Rodney Hamlin",
  },
  {
    quote:
      "Great experience, great price and great communication. Driver was personable and a pleasure to do business with.",
    author: "Pablo Hernandez",
  },
];

export default function Reviews() {
  return (
    <section
      aria-labelledby="reviews-title"
      className="section-pad bg-brand-light"
      id="reviews"
    >
      <div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow mb-4">Client reviews</p>
          <h2 className="section-heading" id="reviews-title">
            Client success stories.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-brand-muted">
            Reviews published on the NY Travel Limo website.
          </p>
        </div>
        <ul className="grid gap-4">
          {reviews.map((review) => (
            <li className="border border-brand-text/10 bg-brand-soft p-6 sm:p-7" key={review.author}>
              <figure>
                <blockquote className="font-display text-xl leading-8 text-brand-dark">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-brand-accent">
                  {review.author}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
