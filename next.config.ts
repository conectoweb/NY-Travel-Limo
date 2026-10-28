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
    ];
  },
};

export default nextConfig;
