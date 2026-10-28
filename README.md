# NY Travel Limo

Next.js website for NY Travel Limo, with service and fleet information, blog routes, cookie preferences and a quote inquiry form.

## Install and run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. To run the production build locally:

```bash
npm run build
npm start
```

## Preview deployment

The site can be built and deployed for visual review without MySQL, Resend or reCAPTCHA credentials. With `APP_MODE` and `NEXT_PUBLIC_APP_MODE` unset (or set to `preview`), all pages render normally and the Contact Us quote form visibly identifies itself as a preview. Form submission and database storage are disabled; no request is accepted or represented as sent. Reservation links open the separate reservation site.

For a preview, no environment variables are required. If configuring Hostinger from `.env.example`, keep both mode variables set to `preview`. The public mode value is compiled into the browser bundle, so set `NEXT_PUBLIC_APP_MODE` before building. The server independently defaults to preview unless `APP_MODE=production`, so a missing or mismatched setting never enables the APIs.

## MySQL and Hostinger setup

Quote submissions are validated with reCAPTCHA and the honeypot, saved to the private MySQL `quotes` table, and emailed with Resend. No public endpoint reads quote records. The separate reservation site is not connected to this website's database.

1. Create a MySQL database and database user in hPanel. Grant the application user only the permissions needed by the site.
2. Configure the environment variables in Hostinger's Node.js application settings, or copy `.env.example` to `.env.local` for local production testing. Do not commit `.env` files.
3. Set `DB_HOST=127.0.0.1` for the local MySQL server on Hostinger, and set `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_NAME` to the values from hPanel.
4. Run `database/migrations/005_create_quotes.sql` once to create the quote submission table. This table is separate from the legacy `quote_requests` table and does not require the earlier quote-request migrations.
5. Set `APP_MODE=production` and `NEXT_PUBLIC_APP_MODE=production`, plus the required services below, before running `npm run build`. The two mode variables must both be set explicitly to production to enable the quote API. Point the domain to the deployed Node.js application and enable HTTPS.

The Contact Us quote form posts to `/api/quote`, validates the request, verifies its reCAPTCHA token and honeypot on the server, saves contact and trip details to MySQL, then emails the request through Resend. Only the server can write quote records; there is no public quote lookup endpoint. Do not add card numbers, CVV, expiration dates or other payment data to this form or table. Configure `QUOTE_EMAIL`, `RESEND_API_KEY` and a sender address verified with Resend in `RESEND_FROM`. Reservation buttons, including the navigation and footer controls, open [reservation.nytravellimo.com](https://reservation.nytravellimo.com/); `/reservations` redirects there. Reservation processing and payment are handled by that separate platform, not by this website.

### Google reCAPTCHA v2 Checkbox

1. In the Google reCAPTCHA Admin Console, register a **reCAPTCHA v2 → "I'm not a robot" Checkbox** site for the new site domain.
2. Add the exact production domain(s) and each test/staging domain you will use. Add `localhost` if you need local testing.
3. Copy the site key to `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and the secret key to `RECAPTCHA_SECRET_KEY`. The site key is public; the secret must remain server-side. Never commit real keys.
4. In Hostinger hPanel, open the Node.js application's environment variables and set both variables there, along with the existing database and Resend variables. Rebuild/restart the application after changing environment variables. These keys are required only for the production Contact Us quote form; preview does not load the widget or accept submissions.

If either reCAPTCHA key is missing, the server logs the configuration problem, rejects quote requests, and the form shows a brief friendly notice with the phone number. The API also checks a hidden honeypot field and limits each client address to 5 submission attempts per 15-minute window per running application process. For deployments with multiple application processes, configure an edge/WAF rate limit as well.

## Environment variables

No variables are required for preview. Production requires both mode variables set to `production` and the service variables listed below. Keep all secret values in server-side Hostinger settings; only `NEXT_PUBLIC_*` variables are exposed to the browser. `NEXT_PUBLIC_APP_MODE` is embedded at build time, so rebuild after changing it.

| Variable | Description |
| --- | --- |
| `APP_MODE` | Server mode. Leave unset or use `preview` to disable submissions; set explicitly to `production` to enable the quote API |
| `NEXT_PUBLIC_APP_MODE` | Browser display mode; set to `preview` or `production` to match `APP_MODE` before building |
| `DB_HOST` | **Production required.** Hostinger local MySQL host; use `127.0.0.1` on the same server |
| `DB_PORT` | **Production required.** MySQL port, usually `3306` |
| `DB_USER` | **Production required.** Database username |
| `DB_PASSWORD` | **Production required.** Database password; keep it in Hostinger environment settings |
| `DB_NAME` | **Production required.** Database name |
| `RESEND_API_KEY` | **Production required.** Resend API key, configured as a secret in the hosting environment |
| `QUOTE_EMAIL` | **Production required.** Recipient for Contact Us quote notifications; set to the temporary test mailbox or intended quote inbox |
| `RESEND_FROM` | **Production required.** Sender identity verified with Resend |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | **Production required.** Google reCAPTCHA v2 Checkbox site key |
| `RECAPTCHA_SECRET_KEY` | **Production required.** Google reCAPTCHA v2 secret key; server only, never expose to browser code |

## SEO and test domain

`https://www.nytravellimo.com` is the canonical primary domain: `siteUrl`, canonical tags, Open Graph URLs and the sitemap all use it. Requests to the apex `nytravellimo.com` are permanently redirected (301) to the same path on `www`, preserving query strings. Canonical URLs and the public sitemap are emitted only for `nytravellimo.com` and `www.nytravellimo.com`. Other hosts receive `noindex` metadata and an empty sitemap. Preserve the existing service and article slugs when editing content. The previous `/hourly-transportation-nyc` path permanently redirects to `/transportation-by-hours-in-new-york`.

## Legal and privacy review before launch

The privacy, cookie and terms pages contain clearly marked placeholders. The responsible business owner should complete and have them reviewed, including:

- Legal business name, privacy contact and confirmed business address.
- Actual purposes for handling inquiry data, recipients/service providers, and retention periods.
- Applicable privacy rights and the process/contact for requests.
- Cookie/technology providers and retention disclosures if any optional analytics or advertising tools are later integrated.
- Terms effective date, governing law and venue, and any business-specific terms.

The current website has no analytics or advertising tags. Cookie choices are stored in browser local storage; optional technologies must remain disabled unless the visitor grants the relevant consent. These draft pages are not a guarantee of legal compliance.

## Service landing images

Each service has a descriptive expected image filename in `public/images/` (for example, `airport-transportation.jpg` or `wedding-transportation.jpg`). Until that file is added, the landing automatically uses the existing `nyc-sprinter-van-hero.avif` image. Add each image at its expected filename to replace the temporary fallback without changing the route or layout.
