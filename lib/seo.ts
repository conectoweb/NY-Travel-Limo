import { headers } from "next/headers";

export const siteUrl = "https://www.nytravellimo.com";

export async function isPublicSiteRequest() {
  const requestHeaders = await headers();
  const hostname = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "")
    .split(":")[0]
    .toLowerCase();

  return hostname === "nytravellimo.com" || hostname === "www.nytravellimo.com";
}
