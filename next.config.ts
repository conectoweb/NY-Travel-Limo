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
    ];
  },
};

export default nextConfig;
