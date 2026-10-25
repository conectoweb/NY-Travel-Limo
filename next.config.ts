import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/hourly-transportation-nyc",
        destination: "/transportation-by-hours-in-new-york",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
