# Pixel & Panel

Bilingual signage, print, and digital-services website built with Next.js App Router and React. English and Spanish marketing routes share components; private order tracking has a separate layout. Typography uses Inter and Montserrat.

## Local setup

Use Node.js 24 (`.nvmrc`) and npm. Dependency versions are locked in `package-lock.json`.

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Copy the environment template only for a new setup; keep existing `.env.local` values. Open http://localhost:3000. Never commit credentials or copy production customer data into fixtures.

Read `AGENTS.md` before changes. This project's Next.js version has local documentation under `node_modules/next/dist/docs/`; consult it before relying on older framework conventions.

## Environment and integrations

| Feature | Configuration | Behavior without configuration |
| --- | --- | --- |
| Live signage catalog | `SIGNAGE_SHEET_CSV_URL` — published-to-web CSV | Local builds allow an empty catalog. Vercel builds require a valid feed. |
| Product descriptions, specs, FAQs | `SIGNAGE_CONTENT_CSV_URL` — optional published CSV | Product pages use generated fallback copy. |
| Contact and quote email | `ZOHO_SMTP_HOST`, `ZOHO_SMTP_PORT`, `ZOHO_SMTP_USER`, `ZOHO_SMTP_PASS`; recipient variables in `.env.example` | Submissions cannot deliver email. |
| Order storage and shared rate limits | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Order operations unavailable; public forms use per-instance rate limits. |
| Admin sign-in | `ADMIN_ORDERS_PASSWORD`, `ADMIN_SESSION_SECRET`, working Supabase rate-limit RPC | Sign-in returns 503 if shared rate limiting is unavailable. |
| Catalog health cron | `CRON_SECRET`, optional `CATALOG_ALERT_TO_EMAIL` | Health endpoint rejects unauthenticated requests. |
| Optional analytics | `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | Corresponding optional integration disabled. Marketing layouts also include GTM, Vercel Analytics, and Speed Insights. |

Published catalog sheets must contain public product information only. Keep the service-role key, SMTP password, admin password, session secret, and cron secret server-side. Never prefix secrets with `NEXT_PUBLIC_`.

Catalog fetch revalidation is 900 seconds; upstream Google publishing caches can add delay. Local pages can differ from production if the optional content feed is absent.

For Supabase schema and setup, see [order tracking setup](docs/order-tracking-setup.md), [orders SQL](docs/order-tracking-supabase.sql), and [rate-limit SQL](docs/rate-limit-supabase.sql). Review SQL, including sample records, before applying it to a database. The application does not apply migrations automatically. Admin login requires `public.check_rate_limit` and service-role access.

## Source map

| Path | Responsibility |
| --- | --- |
| `app/(en)/` | English marketing pages, homepage, quote form |
| `app/(es)/es/` | Spanish pages and localized copy |
| `app/(private)/track/[trackingToken]/` | Private customer tracking; separate layout and indexing policy |
| `app/admin/`, `app/api/admin/` | Admin UI and authenticated order APIs |
| `app/api/quote/`, `app/api/contact/` | Form validation and email delivery |
| `components/signage/` | Catalog, product detail, calculator, shared quote selection |
| `lib/signage/data.js` | Published CSV fetching and catalog assembly |
| `lib/signage/parsers.js`, `lib/signage/catalog-config.js` | Pure parsing helpers, display order, editorial metadata, and search terms |
| `lib/quote-selection.js` | Product-option validation and language-link handoff |
| `lib/customer-order.js` | Explicit customer-safe order projection |
| `lib/admin-auth.js`, `lib/rate-limit.js` | Signed sessions and shared request limits |
| `lib/seo.js`, `app/sitemap.js`, `app/robots.js` | Metadata and indexing |
| `content/`, `lib/signage-products*.js` | Editorial and legacy localized content; still used by existing routes |
| `scripts/*.test.mjs` | Unit and security regression tests |

Do not delete legacy catalog modules without checking their imports. Keep internal notes, costs, contact details, database IDs, and private file URLs out of customer order responses. Private tracking routes must remain excluded from marketing analytics and public indexing.

## Verification

```bash
npm run lint -- --max-warnings=0
npm test
npm run build
npm run start
```

With the production server running, use another terminal:

```bash
npm run check:seo -- http://localhost:3000
```

The SEO crawl checks public sitemap pages, metadata, language alternates, structured data, images, internal links, and missing-page responses. It does not submit forms or open private customer tracking URLs. Configure the catalog feed for representative coverage.

For UI changes, check English and Spanish pages, narrow mobile layouts, keyboard focus, and the full product → calculator → quote path. Email delivery and database mutations require a dedicated test environment; unit tests mock rate-limit network calls and never contact Supabase.

## Continuous integration

`.github/workflows/ci.yml` runs clean installation, zero-warning lint, unit tests, and a production build on main pushes and pull requests. Set repository **variables** `SIGNAGE_SHEET_CSV_URL` and optionally `SIGNAGE_CONTENT_CSV_URL` to public published CSV URLs to enable catalog coverage and the public SEO crawl. No production database or SMTP credentials are needed in CI.

A passing CI build without the catalog variable is limited shell coverage, not verification of the live catalog. GitHub branch protection and required checks must be configured separately.

## Current operational limits

Quote requests currently rely on synchronous SMTP delivery; there is no durable lead inbox or retry outbox. Order creation and its initial timeline event use separate database operations. Fixing these requires database migrations and end-to-end verification against a reachable test database.

Admin login fails closed during a shared rate-limit outage. To restore access, verify the Supabase hostname, service-role configuration, and rate-limit SQL deployment; do not weaken the login policy to work around an outage.
