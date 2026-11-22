export const SITE_URL = "https://www.nytravellimo.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "NY Travel Limo",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/images/Logo%20NY%20Travel%20Limo.png`,
    contentUrl: `${SITE_URL}/images/Logo%20NY%20Travel%20Limo.png`,
    caption: "NY Travel Limo logo",
  },
  description:
    "Private chauffeur-driven transportation in New York City and New Jersey, including airport transfers, corporate travel, group transportation, Sprinter vans, SUVs and limousines.",
  telephone: "+1-516-256-2892",
  contactPoint: [
    {
      "@type": "ContactPoint",
      "@id": `${SITE_URL}/#customer-service`,
      telephone: "+1-516-256-2892",
      contactType: "customer service",
      areaServed: "US",
    },
  ],
  address: {
    "@type": "PostalAddress",
    "@id": `${SITE_URL}/#address`,
    streetAddress: "358 W 56th St Suite 4D",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10019",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/NEWYORKTRAVELLIMO/",
    "https://www.instagram.com/nytravellimo/",
    "https://www.youtube.com/@NYTravelLimo",
  ],
  areaServed: [
    {
      "@type": "AdministrativeArea",
      "@id": `${SITE_URL}/#area-manhattan`,
      name: "Manhattan, New York",
    },
    {
      "@type": "AdministrativeArea",
      "@id": `${SITE_URL}/#area-brooklyn`,
      name: "Brooklyn, New York",
    },
    {
      "@type": "AdministrativeArea",
      "@id": `${SITE_URL}/#area-queens`,
      name: "Queens, New York",
    },
    {
      "@type": "AdministrativeArea",
      "@id": `${SITE_URL}/#area-bronx`,
      name: "Bronx, New York",
    },
    {
      "@type": "AdministrativeArea",
      "@id": `${SITE_URL}/#area-staten-island`,
      name: "Staten Island, New York",
    },
    {
      "@type": "AdministrativeArea",
      "@id": `${SITE_URL}/#area-new-jersey`,
      name: "New Jersey",
    },
    {
      "@type": "Place",
      "@id": `${SITE_URL}/#airport-jfk`,
      name: "John F. Kennedy International Airport (JFK)",
    },
    {
      "@type": "Place",
      "@id": `${SITE_URL}/#airport-lga`,
      name: "LaGuardia Airport (LGA)",
    },
    {
      "@type": "Place",
      "@id": `${SITE_URL}/#airport-ewr`,
      name: "Newark Liberty International Airport (EWR)",
    },
  ],
};
