export const siteUrl = "https://www.nytravellimo.com";

/**
 * Evaluates whether the current build/runtime is production without reading
 * per-request `headers()`, allowing public pages and sitemaps to be statically
 * generated and cached. Host-level preview `noindex` is enforced via
 * `X-Robots-Tag` in `next.config.ts`.
 */
export async function isPublicSiteRequest() {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return false;
  }
  return true;
}
