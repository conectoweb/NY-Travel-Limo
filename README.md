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

The site can be built and deployed for visual review without MySQL, Resend, Authorize.Net or reCAPTCHA credentials. With `APP_MODE` and `NEXT_PUBLIC_APP_MODE` unset (or set to `preview`), all pages render normally, and the contact and reservation forms visibly identify themselves as previews. Form submission, database storage and payment setup are disabled; no request is accepted or represented as sent.

For a preview, no environment variables are required. If configuring Hostinger from `.env.example`, keep both mode variables set to `preview`. The public mode value is compiled into the browser bundle, so set `NEXT_PUBLIC_APP_MODE` before building. The server independently defaults to preview unless `APP_MODE=production`, so a missing or mismatched setting never enables the APIs.

## MySQL and Hostinger setup

Quote and reservation submissions use Resend and reCAPTCHA; these two forms do not require MySQL and do not store their submissions in a database. Configure the following database settings only if another enabled application feature requires the site's MySQL database:

1. Create a MySQL database and database user in hPanel. Grant the application user only the permissions needed by the site.
2. Configure the environment variables in Hostinger's Node.js application settings, or copy `.env.example` to `.env.local` for local production testing. Do not commit `.env` files.
3. Set `DB_HOST=127.0.0.1` for the local MySQL server on Hostinger, and set `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_NAME` to the values from hPanel.
4. Run `database/migrations/001_create_quote_requests.sql` on a new database, then run migrations 002 and 004 in order. For an existing installation, apply any missing migrations in order.
5. Set `APP_MODE=production` and `NEXT_PUBLIC_APP_MODE=production`, plus the required services below, before running `npm run build`. The two mode variables must both be set explicitly to production to enable form or payment APIs. Point the domain to the deployed Node.js application and enable HTTPS.

The Contact Us quote form posts to `/api/quote`; the reservation form posts separately to `/api/reservation`. Each verifies its own reCAPTCHA token on the server and emails only the submitted request details through Resend without storing submissions in MySQL. Configure `QUOTE_EMAIL` for quote notifications and `RESERVATION_EMAIL=sales@nytravellimo.com` for reservation notifications, plus `RESEND_API_KEY` and a sender address verified with Resend in `RESEND_FROM`. The quote form has no payment fields or instructions. The reservation form does not collect payment credentials; payment arrangements are handled separately after the team reviews the request.

### Authorize.Net secure payment profiles

The reservation request form does not collect or process payment information. The remaining Authorize.Net integration is separate from that form. If enabling a separate hosted payment flow, use Authorize.Net's provider-hosted fields; never collect or email complete card details in this application.

These credentials are not required for the reservation request form. If a separate hosted payment flow is enabled in the future, configure its credentials as server-only environment variables in Hostinger. Use sandbox credentials and `AUTHORIZE_NET_ENVIRONMENT=sandbox` for testing, then switch to live credentials and `production` for launch. Generate a random session secret of at least 32 characters. Set `AUTHORIZE_NET_SITE_URL` to the HTTPS site origin used by the hosted-form iframe communicator, without a trailing path. Never add provider credentials to client code or commit them.

### Google reCAPTCHA v2 Checkbox

1. In the Google reCAPTCHA Admin Console, register a **reCAPTCHA v2 → "I'm not a robot" Checkbox** site for the new site domain.
2. Add the exact production domain(s) and each test/staging domain you will use. Add `localhost` if you need local testing.
3. Copy the site key to `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and the secret key to `RECAPTCHA_SECRET_KEY`. The site key is public; the secret must remain server-side. Never commit real keys.
4. In Hostinger hPanel, open the Node.js application's environment variables and set both variables there, along with the existing database and Resend variables. Rebuild/restart the application after changing environment variables. These keys are required only when production forms are enabled; preview does not load the widget or accept submissions.

If either reCAPTCHA key is missing, the server logs the configuration problem, rejects requests, and the form shows a brief friendly notice with the phone number. The API also checks a hidden honeypot field and limits each client address to 5 submission attempts per 15-minute window per running application process. For deployments with multiple application processes, configure an edge/WAF rate limit as well.

## Environment variables

No variables are required for preview. Production requires both mode variables set to `production` and the service variables listed below. Keep all secret values in server-side Hostinger settings; only `NEXT_PUBLIC_*` variables are exposed to the browser. `NEXT_PUBLIC_APP_MODE` is embedded at build time, so rebuild after changing it.

| Variable | Description |
| --- | --- |
| `APP_MODE` | Server mode. Leave unset or use `preview` to disable submissions and payments; set explicitly to `production` to enable APIs |
| `NEXT_PUBLIC_APP_MODE` | Browser display mode; set to `preview` or `production` to match `APP_MODE` before building |
| `DB_HOST` | **Production required.** Hostinger local MySQL host; use `127.0.0.1` on the same server |
| `DB_PORT` | **Production required.** MySQL port, usually `3306` |
| `DB_USER` | **Production required.** Database username |
| `DB_PASSWORD` | **Production required.** Database password; keep it in Hostinger environment settings |
| `DB_NAME` | **Production required.** Database name |
| `RESEND_API_KEY` | **Production required.** Resend API key, configured as a secret in the hosting environment |
| `QUOTE_EMAIL` | **Production required.** Recipient for Contact Us quote notifications; set to the temporary test mailbox or intended quote inbox |
| `RESERVATION_EMAIL` | **Production required.** Reservation notification recipient; set to `sales@nytravellimo.com` |
| `RESEND_FROM` | **Production required.** Sender identity verified with Resend |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | **Production required.** Google reCAPTCHA v2 Checkbox site key |
| `RECAPTCHA_SECRET_KEY` | **Production required.** Google reCAPTCHA v2 secret key; server only, never expose to browser code |
| `AUTHORIZE_NET_API_LOGIN_ID` | Optional, server-only credential for a separately enabled Authorize.Net payment flow |
| `AUTHORIZE_NET_TRANSACTION_KEY` | Optional, server-only credential for a separately enabled Authorize.Net payment flow |
| `AUTHORIZE_NET_ENVIRONMENT` | Optional. `sandbox` for testing or `production` for a separate live payment flow |
| `AUTHORIZE_NET_SESSION_SECRET` | Optional server-only secret of at least 32 characters for a separate hosted payment flow |
| `AUTHORIZE_NET_SITE_URL` | Optional HTTPS origin for the separate hosted payment iframe communicator |

## SEO and test domain

Canonical URLs and the public sitemap are emitted only for `nytravellimo.com` and `www.nytravellimo.com`. Other hosts receive `noindex` metadata and an empty sitemap. Preserve the existing service and article slugs when editing content. The previous `/hourly-transportation-nyc` path permanently redirects to `/transportation-by-hours-in-new-york`.

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
