import { blogArticles, fleetPages, servicePages } from "@/lib/site-content";

export type SitemapLink = {
  label: string;
  href: string;
  description?: string;
};

export type SitemapCategory = {
  id: string;
  category: string;
  badge: string;
  description: string;
  links: SitemapLink[];
};

export const sitemapCategories: SitemapCategory[] = [
  {
    id: "main-pages",
    category: "Main Pages & Company",
    badge: "Company Overview",
    description: "Core website pages for bookings, fleet exploration, rates, and company background.",
    links: [
      { label: "Home", href: "/", description: "Homepage and private transportation booking overview." },
      { label: "Services Directory", href: "/services", description: "Comprehensive directory of NYC chauffeured transportation services." },
      { label: "Our Fleet", href: "/fleet", description: "Overview of luxury Sprinter vans, SUVs, and limousines." },
      { label: "Rates & Packages", href: "/rates", description: "Pricing information, hourly charter rates, and quote factors." },
      { label: "About NY Travel Limo", href: "/about-us", description: "Company history, chauffeur standards, and service values." },
      { label: "Frequently Asked Questions", href: "/frequently-asked-questions", description: "Answers to booking, airport, vehicle, and payment questions." },
      { label: "Fleet Gallery", href: "/gallery", description: "High-resolution photos of vehicles, interiors, and amenities." },
      { label: "Contact Us & Quote", href: "/contact-us", description: "Request an estimate or speak directly with dispatch." },
    ],
  },
  {
    id: "fleet-options",
    category: "Luxury Fleet Options",
    badge: "Vehicles",
    description: "Detailed vehicle specifications, passenger seating capacities, and cabin amenities.",
    links: fleetPages.map((page) => ({
      label: page.title,
      href: `/${page.slug}`,
      description: page.description,
    })),
  },
  {
    id: "nyc-services",
    category: "NYC Chauffeured Services",
    badge: "Services",
    description: "Specialized transportation solutions across the five boroughs, airports, and regional destinations.",
    links: servicePages
      .filter((page) => page.slug !== "contact-us")
      .map((page) => ({
        label: page.title,
        href: `/${page.slug}`,
        description: page.description,
      })),
  },
  {
    id: "travel-guides",
    category: "Travel Guides & Blog",
    badge: "Guides & Articles",
    description: "Informative articles, vehicle comparisons, airport tips, and regional touring advice.",
    links: [
      { label: "All Travel Guides & Blog", href: "/blog", description: "Index of all transportation advice and travel articles." },
      ...blogArticles.map((article) => ({
        label: article.title,
        href: `/blog/${article.slug}`,
        description: article.description,
      })),
    ],
  },
  {
    id: "legal-policies",
    category: "Legal & Policies",
    badge: "Legal & Compliance",
    description: "Website terms, privacy protection, and cookie preferences.",
    links: [
      { label: "Terms and Conditions", href: "/terms-and-conditions", description: "Reservation rules, cancellation policies, and company agreements." },
      { label: "Privacy Policy", href: "/privacy-policy", description: "Information handling, data protection, and privacy standards." },
      { label: "Cookie Policy", href: "/cookie-policy", description: "Use of cookies and browsing technologies." },
    ],
  },
];

export const pageLinks: { label: string; href: string }[] = sitemapCategories.flatMap((cat) =>
  cat.links.map((link) => ({ label: link.label, href: link.href }))
);
