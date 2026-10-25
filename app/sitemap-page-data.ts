import { blogArticles, fleetPages, servicePages } from "@/lib/site-content";

export const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Services directory", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "Rates", href: "/rates" },
  { label: "Reservations", href: "/reservations" },
  { label: "About Us", href: "/about-us" },
  { label: "Frequently Asked Questions", href: "/frequently-asked-questions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ...fleetPages.map((page) => ({ label: page.title, href: `/${page.slug}` })),
  ...servicePages.filter((page) => page.slug !== "contact-us").map((page) => ({ label: page.title, href: `/${page.slug}` })),
  ...blogArticles.map((article) => ({ label: article.title, href: `/blog/${article.slug}` })),
];
