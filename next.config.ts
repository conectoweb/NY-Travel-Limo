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
    ];
  },
};

export default nextConfig;