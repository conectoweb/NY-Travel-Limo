import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        // Canonical host: permanently redirect the apex domain to www,
        // preserving the path and query string. The host condition only
        // matches the bare apex, so www requests never loop.
        source: "/:path*",
        has: [{ type: "host", value: "nytravellimo.com" }],
        destination: "https://www.nytravellimo.com/:path*",
        statusCode: 301,
      },
      {
        source: "/hourly-transportation-nyc",
        destination: "/transportation-by-hours-in-new-york",
        statusCode: 301,
      },
      {
        // Direct root request for Sprinter van rental cost guide → canonical blog URL
        source: "/how-much-does-it-cost-to-rent-a-sprinter-van-in-new-york",
        destination: "/blog/how-much-does-it-cost-to-rent-a-sprinter-van-in-new-york",
        statusCode: 301,
      },
      {
        // Direct root request for Sprinter van everything you need to know guide → canonical blog URL
        source: "/rent-mercedes-benz-sprinter-van-in-new-york-everything-you-need-to-know",
        destination: "/blog/rent-mercedes-benz-sprinter-van-in-new-york-everything-you-need-to-know",
        statusCode: 301,
      },
      {
        // Typo redirect for corporate transportation
        source: "/corporate-transportation-service-whit-driver-in-new-york",
        destination: "/corporate-transportation-service-with-driver-in-new-york",
        statusCode: 301,
      },
      {
        // Old WordPress URL (with /nylimo/ prefix) → equivalent fleet page.
        // Query strings are preserved automatically by Next.js.
        source: "/nylimo/sprinter-van-rental-with-driver-new-york-nyc",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        // Brooklyn Sprinter page → main Sprinter van page.
        source: "/sprinter-van-rental-brooklyn-nyc-with-driver",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        // Old 14-passenger van page → current Sprinter van service page.
        source: "/14-passenger-van-rental-with-driver-in-new-york-nyc",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        // Old party van rental page → current group transportation page.
        source: "/party-vans-for-rent-with-driver-in-new-york",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        // Brewery Tours → página de transporte grupal.
        source: "/brewery-tours-transportation-service-from-new-york",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        // Sweet Sixteen → página de transporte grupal.
        source: "/sweet-sixteen-transportation-in-new-york",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        // Old limousine transportation page → current Lincoln Stretch Limo page.
        source: "/nylimo/limousine-services-new-york",
        destination: "/lincoln-stretch-limo-rental-nyc",
        statusCode: 301,
      },
      {
        // Old brooklyn Sprinter van transportation page → current Sprinter van service page.
        source: "/sprinter-van-rental-with-driver-in-brooklyn-new-york",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        // Old NYLimo homepage → current homepage.
        source: "/nylimo",
        destination: "/",
        statusCode: 301,
      },
      {
        // Old Mercedes-Benz Sprinter van page → current Sprinter van service page.
        source: "/mercedes-benz-sprinter-van-rental-in-new-york",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        // Old NYLimo fleet page → current fleet page.
        source: "/nylimo/fleet",
        destination: "/fleet",
        statusCode: 301,
      },
      {
        // Old fleet.htm page → current fleet page.
        source: "/fleet.htm",
        destination: "/fleet",
        statusCode: 301,
      },
      {
        // Old Sprinter van page → current Sprinter van service page.
        source: "/vehicles/sprinter",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        // Old chauffeured limousine rental service page → current Lincoln Stretch Limo page.
        source: "/chauffeured-limousine-rental-service-ny",
        destination: "/lincoln-stretch-limo-rental-nyc",
        statusCode: 301,
      },
      {
        // Old rates page.
        source: "/package-rate",
        destination: "/rates",
        statusCode: 301,
      },
      {
        // Old quote page.
        source: "/quote",
        destination: "/contact-us",
        statusCode: 301,
      },
      {
        // Old wine tour package rate page.
        source: "/packages/wine-tour---10-hours",
        destination: "/wine-tours-transportation-service-from-new-york",
        statusCode: 301,
      },
      {
        // Old six-passenger SUV page.
        source: "/luxury-6-passenger-suv-rental-nyc",
        destination: "/luxury-suv-rental-nyc",
        statusCode: 301,
      },
      {
        // Old Atlantic City limousine page.
        source: "/nylimo/limousine-service-atlantic-city",
        destination: "/luxury-casino-transportation-service-to-atlantic-city",
        statusCode: 301,
      },
      {
        // Old funeral page → current funeral landing page.
        source: "/funeral-transportation-services-nyc",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },
      {

        source: "/funeral-transport-solutions-in-queens-nyc",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },
      {
        // Old family transportation for funeral services page.
        source: "/family-transportation-funeral-services-manhattan",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },
      {
        // Old funeral transfer services page in Bronx.
        source: "/funeral-transfer-services-bronx",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },
      {
        // Old memorial transportation services page in Brooklyn.
        source: "/memorial-transportation-services-brooklyn",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },
      {
        // Old night out transportation page in NYC using Mercedes Sprinter vans.
        source: "/night-out-transportation-in-nyc-mercedes-sprinter-vans",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      // Legacy event, group and transportation pages
      {
        source: "/sports-events-nyc-transportation",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/luxury-prom-transportation-in-new-york",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/concert-transportation-nyc-nj-pa",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/concert-transportation-in-nyc-group-vip-event-travel",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/private-luxury-special-events-transportation-nyc",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/christmas-lights-tour-in-new-york-city",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/thanksgiving-parade-transportation-guide-2025",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/bus-rental-service-new-york-city",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/36-passenger-bus-rental-new-york-ny-near-me",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/36-passenger-bus-rental-nyc",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/washington-dc-transportation-service-in-new-york",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },

      // Legacy airport pages
      {
        source: "/airport-transportation-ny",
        destination: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
        statusCode: 301,
      },
      {
        source: "/airport-transportation-nyc",
        destination: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
        statusCode: 301,
      },
      {
        source: "/airport-transportation-resources.html",
        destination: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
        statusCode: 301,
      },

      // Legacy Sprinter pages
      {
        source: "/sprinter-van-service-nyc",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/group-adventures-discover-our-sprinter-van-rental-service-in-new-york",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/sprinter-van-rental-service-for-funeral-transportation-by-ny-travel-limo",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },

      // Legacy limousine, SUV and funeral pages
      {
        source: "/premium-car-service-rentals-new-york",
        destination: "/luxury-suv-rental-nyc",
        statusCode: 301,
      },
      {
        source: "/limousine-in-new-york.html",
        destination: "/lincoln-stretch-limo-rental-nyc",
        statusCode: 301,
      },
      {
        source: "/new-york-limousines.html",
        destination: "/lincoln-stretch-limo-rental-nyc",
        statusCode: 301,
      },
      {
        source: "/hummer-limousine-new-york.html",
        destination: "/lincoln-stretch-limo-rental-nyc",
        statusCode: 301,
      },
      {
        source: "/funeral-transportation-brooklyn",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },
      {
        source: "/funeral-transportation-in-nyc-dignified-professional-services",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },

      // Old NY Limo routes
      {
        source: "/nylimo/services",
        destination: "/services",
        statusCode: 301,
      },
      {
        source: "/nylimo/rates",
        destination: "/rates",
        statusCode: 301,
      },
      {
        source: "/nylimo/36-passenger-bus-rental-new-york-ny-near-me",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/nylimo/book-sprinter-vans",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/nylimo/sprinter-van-rental-in-new-york-near-me",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/nylimo/mini-bus-rentals",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/nylimo/best-plans-for-groups-in-new-york-and-how-to-get-there-easily",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/nylimo/top-destinations-to-visit-in-a-sprinter-van-in-new-york",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/nylimo/what-are-the-best-wine-tours-from-new-york",
        destination: "/blog/the-10-best-wine-tasting-tours-in-new-york",
        statusCode: 301,
      },
      {
        source: "/nylimo/cheap-and-expensive-hotels-to-stay-in-new-york-according-to-your-budget",
        destination: "/blog",
        statusCode: 301,
      },
      {
        source: "/nylimo/exploring-art-and-culture-the-best-museums-to-visit-as-a-group-in-new-york",
        destination: "/new-york-city-tour-with-professional-chauffeurs",
        statusCode: 301,
      },

      // Previous site prefix
      {
        source: "/ny-travel-limo",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/14-passenger-van-rental-with-driver-in-new-york-nyc",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/blog",
        destination: "/blog",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/contact-us",
        destination: "/contact-us",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/group-transportation-in-new-york-near-me",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/quote",
        destination: "/contact-us",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/rates",
        destination: "/rates",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/services",
        destination: "/services",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/sprinter-van-rental-with-driver-new-york-nyc",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/ny-travel-limo/terms",
        destination: "/terms-and-conditions",
        statusCode: 301,
      },

      // Old blog URLs with no equivalent article
      {
        source: "/blog/discovering-what-to-do-in-new-york-in-a-unique-way-enhance-your-adventure-with-a-sprinter-van",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/blog/how-to-plan-corporate-roadshow-new-york-city",
        destination: "/corporate-transportation-service-with-driver-in-new-york",
        statusCode: 301,
      },
      {
        source: "/blog/how-wine-tour-month-unfolded-in-new-york-with-ny-travel-limo",
        destination: "/wine-tours-transportation-service-from-new-york",
        statusCode: 301,
      },
      {
        source: "/blog/september-2026-united-nations-new-york-key-global-events-luxury-transportation",
        destination: "/corporate-transportation-service-with-driver-in-new-york",
        statusCode: 301,
      },
      {
        source: "/blog/the-ultimate-guide-to-business-travel-in-new-york",
        destination: "/corporate-transportation-service-with-driver-in-new-york",
        statusCode: 301,
      },
      {
        source: "/blog/top-destinations-to-visit-in-a-sprinter-van-in-new-york",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      },
      {
        source: "/what-are-the-best-wine-tours-from-new-york-2",
        destination: "/blog/the-10-best-wine-tasting-tours-in-new-york",
        statusCode: 301,
      },

      // These specific /post URLs MUST be before /post/:slug
      {
        source: "/post/corporate-and-hotel-transfers-in-nyc-professional-airport-transportation-for-business-travelers-and",
        destination: "/corporate-transportation-service-with-driver-in-new-york",
        statusCode: 301,
      },
      {
        source: "/post/how-to-arrange-transportation-for-funeral-guests-in-new-york",
        destination: "/funeral-transportation-services-nyc-dignified-professional",
        statusCode: 301,
      },
      {
        source: "/post/how-to-plan-corporate-roadshow-new-york-city",
        destination: "/corporate-transportation-service-with-driver-in-new-york",
        statusCode: 301,
      },
      {
        source: "/post/how-wine-tour-month-unfolded-in-new-york-with-ny-travel-limo",
        destination: "/wine-tours-transportation-service-from-new-york",
        statusCode: 301,
      },
      {
        source: "/post/the-ultimate-guide-to-business-travel-in-new-york",
        destination: "/corporate-transportation-service-with-driver-in-new-york",
        statusCode: 301,
      },
      {
        source: "/post/the-best-gastronomic-route-in-new-york-exploring-the-flavors-of-the-big-apple",
        destination: "/new-york-city-tour-with-professional-chauffeurs",
        statusCode: 301,
      },
      {
        source: "/post/cheap-and-expensive-hotels-to-stay-in-new-york-according-to-your-budget",
        destination: "/blog",
        statusCode: 301,
      },
      {
        // Legacy post URL for wine tasting tours → current canonical blog article
        source: "/post/the-10-best-wine-tasting-tours-in-new-york",
        destination: "/blog/the-10-best-wine-tasting-tours-in-new-york",
        statusCode: 301,
      },
      {
        // Legacy post URL for sprinter rental cost → current canonical blog article
        source: "/post/how-much-does-it-cost-to-rent-a-sprinter-van-in-new-york",
        destination: "/blog/how-much-does-it-cost-to-rent-a-sprinter-van-in-new-york",
        statusCode: 301,
      },

      // Legacy WordPress post URL structure (/post/:slug) to current blog guide path.
      {
        source: "/post/:slug",
        destination: "/blog/:slug",
        statusCode: 301,
      },

      // Legacy language and malformed internal link
      {
        source: "/servicios",
        destination: "/services",
        statusCode: 301,
      },
      {
        source: "/faqsvg",
        destination: "/frequently-asked-questions",
        statusCode: 301,
      },
      {
        // Old airport limousine service page with .html extension.
        source: "/airport-limousine-service-new-york.html",
        destination: "/lincoln-stretch-limo-rental-nyc",
        statusCode: 301,
      },
      {
        // Old pick-up and drop-off service page in NYC using Mercedes Sprinter vans.
        source: "/pick-up-drop-off-service-in-nyc-mercedes-sprinter-vans",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301 
      },
      {
        // Old bachelorette transportation page in NYC using luxury Sprinter vans and party buses.
        source: "/bachelorette-transportation-in-nyc-luxury-sprinter-vans-party-buses",
        destination: "/group-transportation-in-new-york-near-me",
        statusCode: 301 
      },
      {
        // Old bachelorette transportation page in NYC using luxury Sprinter vans and party buses.
        source: "/faq",
        destination: "/frequently-asked-questions",
        statusCode: 301 
      },
      {
        // Old JFK airporter shuttle page in NYC.
        source: "/jfk-airporter-shuttle-nyc",
        destination: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
        statusCode: 301 
      },
      {
        // Old terms page.
        source: "/terms",
        destination: "/terms-and-conditions",
        statusCode: 301 
      },
      {
        // Old airport limousine service page in New York.
        source: "/airport-limousine-service-new-york",
        destination: "/lincoln-stretch-limo-rental-nyc",
        statusCode: 301 
      },
      {
        // Legacy wine tours guide URL → current canonical wine tours article
        source: "/blog/what-are-the-best-wine-tours-from-new-york",
        destination: "/blog/the-10-best-wine-tasting-tours-in-new-york",
        statusCode: 301,
      },
      {
        // Legacy airport transfer NYC landing → current airport service landing
        source: "/airport-transfer-nyc",
        destination: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
        statusCode: 301,
      },
      {
        // Legacy JFK airport transportation service landing → current airport service landing
        source: "/jfk-airport-transportation-service",
        destination: "/airport-transportation-services-in-nyc-with-professional-chauffeurs",
        statusCode: 301,
      },
      {
        // Legacy sprinter van rental in Brooklin → current sprinter van rental in NYC
        source: "/sprinter-van-rental-with-driver-in-brooklin-new-york",
        destination: "/sprinter-van-rental-with-driver-new-york-nyc",
        statusCode: 301,
      }, 
      {
        // Legacy reservation page → current reservation page
        source: "/reservation",
        destination: "/reservation.nytravelimo.com",
        statusCode: 301,
      },
      {
        // Legacy reservation page → current reservation page
        source: "/thank-you",
        destination: "/contact-us",
        statusCode: 301,
      },
      {
        // Legacy blog post → current blog page
        source: "/2025/04/27",
        destination: "/blog",
        statusCode: 301,
      },
      {
        // Legacy blog category → current blog page
        source: "/blog/categories/airport-limos",
        destination: "/blog",
        statusCode: 301,
      },
      {
        // Legacy blog post → current blog page
        source: "/the-ultimate-guide-to-business-travel-in-new-york",
        destination: "/blog",
        statusCode: 301,
      },
      {
        // Legacy terms and conditions URL with typo → current terms and conditions page  
        source: "/terms-and-conditionshttps",
        destination: "/terms-and-conditions",
        statusCode: 301,
      }

    ];
  },
};

export default nextConfig;