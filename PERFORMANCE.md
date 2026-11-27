# Performance Audit & Optimization Report — nytravellimo.com

## 1. Root Cause of High TTFB (3.0–3.7s)
Previously, `isPublicSiteRequest()` in `lib/seo.ts` called `await headers()` from `next/headers`. Because `app/layout.tsx`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, and `lib/page-metadata.ts` all awaited `isPublicSiteRequest()`, Next.js marked **every public route** (`/`, `/robots.txt`, `/sitemap.xml`, `/rates`, `/fleet`, `/services`, `/blog`, etc.) as **`ƒ (Dynamic)`**. Every page load forced server-side rendering instead of serving pre-rendered static/ISR responses from the CDN edge cache.

---

## 2. Files Changed

| File | Change Summary |
| :--- | :--- |
| `lib/seo.ts` | Removed per-request `headers()` call from `isPublicSiteRequest()`, switching to build/environment detection (`VERCEL_ENV`). |
| `next.config.ts` | Added `images.formats: ["image/avif", "image/webp"]` and `images.minimumCacheTTL: 31536000`. Added `X-Robots-Tag: noindex, nofollow` for non-production hosts via `missing` host condition, immutable cache headers for `/_next/static/:path*` and `/images/:path*`, and host-scoped caching for `/`. |
| `app/page.tsx`, `app/fleet/page.tsx`, `app/services/page.tsx`, `app/rates/page.tsx`, `app/about-us/page.tsx`, `app/frequently-asked-questions/page.tsx`, `app/gallery/page.tsx`, `app/blog/page.tsx`, `app/sitemap/page.tsx`, `app/privacy-policy/page.tsx`, `app/cookie-policy/page.tsx`, `app/terms-and-conditions/page.tsx`, `app/[slug]/page.tsx`, `app/blog/[slug]/page.tsx` | Added `export const revalidate = 86400` (24-hour ISR) so public marketing routes are statically generated at build time and cached at the edge. |
| `components/YouTubeFacade.tsx` | Added lightweight click-to-play YouTube thumbnail facade so the YouTube player iframe and third-party scripts are not downloaded until user interaction. |
| `components/FeaturedVideo.tsx` | Replaced eager YouTube `<iframe>` on the homepage with `<YouTubeFacade />` using the local poster image (`/images/gallery/sprinter-van-rental-with-driver-in-new-york-nyc-video-poster.jpg`) with `loading="lazy"`. |
| `components/ServicesGrid.tsx` | Refined `sizes` to `(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw` to prevent oversized image downloads on tablet viewports. |

---

## 3. Route Rendering Strategy (Static, ISR, Dynamic)

| Route(s) | Strategy | Revalidate | Reason |
| :--- | :--- | :--- | :--- |
| `/robots.txt`, `/sitemap.xml`, `/icon.png`, `/_not-found`, `/reservations` | **Static (`○`)** | Build-time | Purely static metadata/redirect routes with no per-request `headers()` dependency. |
| `/`, `/fleet`, `/services`, `/rates`, `/about-us`, `/frequently-asked-questions`, `/gallery`, `/blog`, `/sitemap`, `/privacy-policy`, `/cookie-policy`, `/terms-and-conditions` | **Static + ISR (`○`)** | `86400s` (1 day) | Public marketing pages that do not depend on request headers or user sessions; safe for edge caching. |
| `/[slug]`, `/blog/[slug]` | **SSG + ISR (`●`)** | `86400s` (1 day) | Pre-rendered via `generateStaticParams()` for all fleet, service, and blog routes. |
| `/api/quote` | **Dynamic (`ƒ`)** | None | Handles form submissions, server-side spam filtering, reCAPTCHA verification, MySQL persistence, and Resend email dispatch. |

---

## 4. Cache Header & Preview Protection Behavior

- **Preview / Staging Protection:** Any request whose `host` does not match `nytravellimo.com` or `www.nytravellimo.com` receives `X-Robots-Tag: noindex, nofollow` in HTTP headers (via `next.config.ts`), preserving preview protection without disabling Static Generation / ISR.
- **`/_next/static/:path*` and `/images/:path*`:** Configured with `Cache-Control: public, max-age=31536000, immutable`.
- **`/_next/image` (Optimized Images):** `images.minimumCacheTTL` raised from the 60s default to `31536000` (1 year), with `image/avif` and `image/webp` enabled.
- **Homepage (`/`):** `Cache-Control: public, max-age=0, s-maxage=86400, stale-while-revalidate=86400` and `CDN-Cache-Control: max-age=86400, stale-while-revalidate=86400` scoped to production hosts (`nytravellimo.com` / `www.nytravellimo.com`).
- **Uncached Routes:** `/api/*`, `/contact-us`, `/reservations`, and non-production hosts do not receive public HTML caching headers.

---

## 5. Before / After Build Output & Bundle Observations

### Before (Forced Dynamic via `headers()`)
- All top-level routes (`/`, `/robots.txt`, `/sitemap.xml`, `/fleet`, `/rates`, `/services`, `/blog`, `/about-us`, etc.) compiled as **`ƒ (Dynamic)`** (`18` dynamic routes).
- Homepage first-load JS: `131 kB` (shared `103 kB`), plus eager third-party YouTube iframe payload on initial page load.

### After (Static + ISR + YouTube Facade)
- **`45/46` routes** are now **Static (`○`) / SSG (`●`) with 1-day ISR (`Revalidate: 1d, Expire: 1y`)**. Only `/api/quote` remains `ƒ (Dynamic)`.
- Homepage JS: `1.03 kB` route chunk / `132 kB` First Load JS (`+0.84 kB` for the click-to-play `YouTubeFacade`), while **eliminating the initial YouTube player iframe & third-party script download** (~500 KB+ saved on initial load).
- Homepage hero image (`/images/nyc-sprinter-van-hero.avif`) retains `priority` and `sizes="100vw"` for optimal LCP; below-the-fold images remain lazy-loaded.
- Google Tag Manager (`GTM-P9P2ND9`) remains unchanged with `afterInteractive` strategy in `app/layout.tsx` to preserve conversion attribution.

---

## 6. Remaining Hosting-Level Limitations
The measured 3.0–3.7s TTFB on `/robots.txt` and `/_next/static/*` assets indicates a **hosting/origin or proxy-layer bottleneck** outside Next.js application code:
1. **Origin Cold Starts / Non-Edge Server:** If the app is hosted on a traditional Node server or sleeping container (rather than an edge-cached CDN or serverless platform with warm edge POPs), the first request to any uncached asset (even static JS chunks) pays container wake-up + TLS/origin latency.
2. **CDN / DNS Proxy Configuration:** Ensure the production DNS (`www.nytravellimo.com`) routes through a CDN/edge cache (e.g., Vercel Edge Network or Cloudflare) that honors `s-maxage`, `stale-while-revalidate`, and `immutable` headers for `/_next/static/*`, `/robots.txt`, `/sitemap.xml`, and ISR HTML.
3. **Database & API Proximity:** `/api/quote` connects to MySQL (`mysql2`); ensure the database host is in the same region as the application server so quote submissions remain fast.
