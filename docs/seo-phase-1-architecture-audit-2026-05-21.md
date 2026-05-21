# Phase 1 SEO Architecture Audit and Mapping

Generated: 2026-05-21

Scope: Map the Gemini SEO recommendations to the actual Pixel & Panel Next.js app before changing production copy or metadata.

No source behavior was changed in this phase.

## Inputs Reviewed

- Gemini blueprint HTML: `/Users/fastsigns/Desktop/pixel-and-panel-blueprint.html`
- User-pasted Gemini recommendations in the current thread
- Current Next.js App Router structure under `app/(en)`, `app/(es)`, `components`, and `lib`
- Rendered route metadata from local `next dev --webpack -p 3000` using a Googlebot-like user agent
- Current sitemap source: `app/sitemap.js`
- Current alternate-route map: `lib/i18n.js`

## Current Architecture

The site uses Next.js 16.2.6 App Router with separate English and Spanish route groups:

- English root layout: `app/(en)/layout.js`
- Spanish root layout: `app/(es)/layout.js`
- English public pages and dynamic routes under `app/(en)`
- Spanish public pages and dynamic routes under `app/(es)/es`
- Shared business schema component: `components/seo/LocalBusinessJsonLd.jsx`
- Main route inventory source: `app/sitemap.js`
- English/Spanish route pairing source: `lib/i18n.js`

The rendered route audit crawled 168 routes:

- 166 sitemap routes
- `/track-order`
- `/es/rastrear-pedido`

Rendered metadata coverage:

- Missing titles: 0
- Missing meta descriptions: 0
- Missing canonicals: 0
- Titles over 60 characters: 78
- Meta descriptions over 155 characters: 67
- Routes missing rendered alternate links: 13

## Current Schema Coverage

Already present:

- Global `LocalBusiness` + `ProfessionalService` schema is injected through English and Spanish root layouts.
- Homepage has `FAQPage` schema.
- Signage hub pages have `BreadcrumbList` and `ItemList`.
- Pricing pages have `FAQPage` and offer/list schema.
- English signage product pages have `BreadcrumbList`, `FAQPage`, and `Service` + `Product` schema.
- Spanish signage product pages have `BreadcrumbList`, `FAQPage`, and `Service` + `Product` schema.
- English digital service pages have `BreadcrumbList`, `FAQPage`, and `Service` + `Product` schema.
- Learning Center articles have `BreadcrumbList`, `Article`, and `FAQPage` schema in both languages.

Gaps found:

- Spanish digital service pages have `BreadcrumbList` and `FAQPage`, but no `Service` or `Product` schema.
- English city-service pages have `BreadcrumbList` and `FAQPage`, but no page-specific `Service` schema.
- Spanish city-service pages have `BreadcrumbList` and `FAQPage`, but no page-specific `Service` schema.

## Canonical Findings

All crawled public routes render a canonical URL.

Gemini suggested that city/service pages like `/service-area/beaumont-tx/vehicle-graphics` should canonical back to the main service hub unless the copy is at least 80 percent unique.

Current finding:

- The city/service pages are not thin duplicates. They contain city-specific context, industries, process, pricing notes, FAQs, and local use cases.
- A rendered text comparison against the main hub pages showed meaningful shared template language but low direct word-set overlap.
- The highest duplicate-risk group is local SEO and Google Business Profile city pages because the service topic itself repeats more heavily, but the pages still have city-specific context.

Recommendation:

- Do not apply a blanket canonical-to-hub rule.
- Keep self-canonicals for current city/service pages.
- Improve page-specific schema and metadata instead.
- Revisit canonical-to-hub only if a future page is truly thin or mostly duplicated.

## Hreflang / Alternate Findings

Rendered alternates are missing on:

- `/learning-center`
- 11 English Learning Center article pages
- `/track-order`

Spanish Learning Center pages appear to render alternates, so the issue is mainly English-side parity.

Recommendation:

- In Phase 2, add `languages` alternates to `app/(en)/learning-center/page.js`.
- In Phase 2, add `languages` alternates to `app/(en)/learning-center/[slug]/page.js` using the existing English-to-Spanish mapping.
- Add `languages` alternates to `/track-order` and `/es/rastrear-pedido` if both should be indexable bilingual equivalents.

## Gemini Recommendation Mapping

| Gemini item | Current site reality | Phase decision |
|---|---|---|
| Use `PixelNPanel` in formulas | Brand is `Pixel & Panel`; URLs use `pixelnpanel.com` | Use `Pixel & Panel` in copy and metadata |
| Add Orange as a main location | Current approved SEO cities are Beaumont, Nederland, Port Arthur | Do not add Orange without approval |
| `/website-design` | Actual route is `/digital/web-development` | Map website-design recommendations to `/digital/web-development` |
| `/vehicle-graphics` | Actual route is `/signage/vehicle-graphics`; city pages are `/service-area/[city]/vehicle-graphics` | Map to current route structure |
| Dynamic title/meta for deep service area routes | Already dynamic, but formulas can be tightened | Phase 2 metadata helper |
| LocalBusiness schema on home/location pages | Already globally injected across English and Spanish layouts | Keep, possibly refine but do not duplicate blindly |
| Product/Service schema on product pages | Present on EN signage, ES signage, and EN digital | Add missing ES digital and city-service schema |
| Canonical city pages back to hubs | Current city pages are substantial local pages | Reject blanket rule; keep self-canonical |
| Phygital internal linking | Existing cross-sells exist in city-service and related pages | Phase 5 reusable callouts for product/service templates |
| Mobile hides long feature cards | Not an SEO architecture item; risks content loss | Phase 6 only after visual/content review |
| Keep order tracker states unchanged | Correct | Do not touch order tracking structures |
| Do not change fixed package baselines without approval | Correct | Do not change pricing/packages in SEO phases |

## Route and File Mapping for Later Phases

### Global / Shared Copy

Candidate files:

- `components/layout/Navbar.jsx`
- `components/layout/Footer.jsx`
- `app/(en)/HomeClient.jsx`
- `app/(en)/HomeSections.jsx`
- `app/(es)/es/page.js`
- Shared CTA surfaces inside product and service templates

Phase:

- Phase 3

Notes:

- Preserve quote-first flows.
- Do not replace all quote CTAs with visibility-check CTAs.

### Homepage English

Route:

- `/`

Files:

- `app/(en)/page.js`
- `app/(en)/HomeClient.jsx`
- `app/(en)/HomeSections.jsx`

Current issue:

- Title and description are slightly long.
- Existing copy is already aligned with websites, signs, print, Google visibility, and local customers.

Phase:

- Phase 3

### Homepage Spanish

Route:

- `/es`

Files:

- `app/(es)/es/page.js`

Current issue:

- Title and description are long.
- Copy is structurally lighter than English but currently intentional and readable.

Phase:

- Phase 3, with Spanish parity review.

### Digital Hub

Route:

- `/digital`

Files:

- `app/(en)/digital/page.js`
- `app/(en)/digital/DigitalClient.jsx`

Current issue:

- Metadata can be stronger and tighter.
- Gemini copy maps here as hub-level copy, not `/website-design`.

Phase:

- Phase 3

### Spanish Digital Hub

Route:

- `/es/servicios-digitales`

Files:

- `app/(es)/es/servicios-digitales/page.js`
- `app/(es)/es/servicios-digitales/DigitalClientEs.jsx`

Current issue:

- Metadata and Spanish parity can be tightened.

Phase:

- Phase 3

### Website Development

Routes:

- `/digital/web-development`
- `/es/servicios-digitales/desarrollo-web`
- `/service-area/[city]/web-development`
- `/es/area-de-servicio/[city]/desarrollo-web`

Files:

- `lib/digital-services.js`
- `lib/digital-services-es.js`
- `app/(en)/digital/[service]/page.js`
- `app/(es)/es/servicios-digitales/[servicio]/page.js`
- `lib/city-service-pages.js`
- `lib/city-service-pages-es.js`
- `app/(en)/service-area/[city]/[service]/page.js`
- `app/(es)/es/area-de-servicio/[ciudad]/[servicio]/page.js`

Phase:

- Metadata/schema in Phase 2
- Copy rewrite in Phase 4

### Vehicle Graphics

Routes:

- `/signage/vehicle-graphics`
- `/es/letreros/graficos-para-vehiculos`
- `/service-area/[city]/vehicle-graphics`
- `/es/area-de-servicio/[city]/graficos-para-vehiculos`

Files:

- `lib/signage-products.js`
- `lib/signage-products-es.js`
- `components/signage/SignageProductPage.jsx`
- `app/(es)/es/letreros/[producto]/page.js`
- `lib/city-service-pages.js`
- `lib/city-service-pages-es.js`

Phase:

- Metadata/schema in Phase 2
- Copy rewrite in Phase 4
- Phygital linking in Phase 5

### Commercial Exterior Signage

Gemini examples:

- Channel letters
- Monument signs
- Pylon signs

Actual routes:

- `/signage/channel-letters`
- `/signage/monument-signs`
- `/signage/pylon-signs`
- `/es/letreros/letras-canal`
- `/es/letreros/letreros-monumento`
- `/es/letreros/letreros-pylon`

Related city route:

- `/service-area/[city]/storefront-signs`
- `/es/area-de-servicio/[city]/letreros-para-negocios`

Files:

- `lib/signage-products.js`
- `lib/signage-products-es.js`
- `lib/city-service-pages.js`
- `lib/city-service-pages-es.js`

Phase:

- Product copy in Phase 4
- City/storefront copy only if explicitly included in Phase 4 scope

### Print Marketing

Routes:

- `/signage/brochures`
- `/signage/postcards`
- `/es/letreros/folletos`
- `/es/letreros/postales`

Files:

- `lib/signage-products.js`
- `lib/signage-products-es.js`

Phase:

- Phase 4

### Backend / Admin / Email Strings

Files likely involved:

- `app/(en)/contact/ContactClient.jsx`
- `app/(en)/free-visibility-check/VisibilityCheckForm.jsx`
- `app/(en)/quote-request/QuoteRequestClient.jsx`
- `app/admin/orders/AdminOrdersClient.jsx`
- `lib/order-tracking.js`
- `lib/admin-orders.js`

Phase:

- Phase 7 only.

Do not change:

- Order tracking state logic
- Project/order IDs
- Database field mapping
- Quote/contact/visibility email delivery provider

## Phase 2 Recommended Scope

Phase 2 should focus only on SEO infrastructure, not broad copy rewrites:

1. Add shared metadata helper(s) for deep routes so title/description formulas are consistent.
2. Tighten dynamic city-service metadata to keep titles closer to 60 characters and descriptions closer to 155 characters.
3. Add page-specific `Service` schema to English city-service pages.
4. Add page-specific `Service` schema to Spanish city-service pages.
5. Add `Service` schema to Spanish digital service pages.
6. Add missing English-side hreflang alternates for Learning Center pages.
7. Add track-order bilingual alternates if both order tracking pages should stay indexable.
8. Keep existing self-canonicals for city/service pages.

## Phase 2 Files Expected

Likely files:

- `app/(en)/service-area/[city]/[service]/page.js`
- `app/(es)/es/area-de-servicio/[ciudad]/[servicio]/page.js`
- `app/(en)/service-area/CityServiceLanding.jsx`
- `app/(es)/es/area-de-servicio/CityServiceLandingEs.jsx`
- `app/(es)/es/servicios-digitales/[servicio]/page.js`
- `app/(en)/learning-center/page.js`
- `app/(en)/learning-center/[slug]/page.js`
- `app/(en)/track-order/page.js`
- `app/(es)/es/rastrear-pedido/page.js`
- Possibly a new small helper under `lib/seo.js` or `lib/metadata.js`

## Items Requiring Approval Before Later Phases

- Adding Orange, TX as a service-area city.
- Creating new route aliases such as `/website-design`.
- Changing package prices, care plan names, or fixed-fee production claims.
- Canonicalizing city/service pages back to hub pages.
- Hiding long mobile content globally instead of tightening specific sections.
- Rewriting order tracking statuses or structural admin/order logic.

## Phase 1 Conclusion

The site already has the core SEO architecture: routes, sitemap coverage, titles, descriptions, canonicals, global LocalBusiness schema, bilingual route mapping, and product/service templates.

The best next move is not a broad rewrite. The best next move is Phase 2: tighten reusable metadata/schema infrastructure and missing alternates, while preserving the current self-canonical city/service strategy.
