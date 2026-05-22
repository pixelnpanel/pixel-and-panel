# Phase 7: Technical SEO Validation

Date: 2026-05-21
Site: https://pixelnpanel.com
Local validation target: http://localhost:3000

## Scope

Phase 7 checked technical SEO signals after the metadata architecture updates:

- Production build health
- Sitemap availability and sitemap route coverage
- Robots output
- Canonical tags on sitemap URLs
- Index/noindex conflicts
- Hreflang alternates
- Open Graph URL metadata
- JSON-LD structured data presence on representative page types
- Title and meta description length warnings

## Validation Commands

```bash
npm run build
npm run start -- -p 3000
```

The production crawl inspected `/sitemap.xml`, `/robots.txt`, and every URL listed in the generated sitemap.

## Passed Checks

- `npm run build` completed successfully.
- `/sitemap.xml` returned `200`.
- `/robots.txt` returned `200`.
- Sitemap contains `166` URLs.
- Sitemap duplicate count: `0`.
- Every sitemap URL returned `200`.
- Every sitemap URL had a title.
- Every sitemap URL had a meta description.
- Every sitemap URL had a canonical tag.
- No sitemap URL rendered `noindex`.
- No noindex utility pages were included in the sitemap.
- Every sitemap URL had English/Spanish alternate links.
- Representative schema checks passed:
  - Homepage: `LocalBusiness`, `ProfessionalService`, `FAQPage`
  - Signage hub: `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `ItemList`
  - Signage product: `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`, `Service`, `Product`
  - Digital service: `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`, `Service`, `Product`
  - City service page: `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`, `Service`
  - Spanish product and city-service pages have matching structured data types.

## Robots Output

```txt
User-Agent: *
Allow: /
Disallow: /api/

Host: https://pixelnpanel.com
Sitemap: https://pixelnpanel.com/sitemap.xml
```

This is appropriate for Google because public pages are crawlable, API routes are blocked, and the sitemap is declared.

## Sitemap Coverage

The production route manifest was compared against sitemap URLs.

Expected exclusions:

- `/track-order`
- `/es/rastrear-pedido`
- Admin routes
- API routes
- Generated metadata image routes
- Internal Next.js routes
- `/robots.txt`
- `/sitemap.xml`

No indexable content page was missing from the sitemap in this pass.

## Remaining Warnings

The remaining warnings are metadata copy-length warnings, not blocking indexability errors.

High-volume warning category:

- Several titles exceed the 60-character target after the layout template appends `| Pixel & Panel`.
- Several descriptions exceed the 155-character target, mostly in signage product and learning-center pages.

Examples:

- `/pricing`: title `79`, description `172`
- `/learning-center`: title `81`
- `/service-area/beaumont-tx`: title `70`, description `169`
- `/signage/backlit-banners`: title `105`, description `168`
- `/digital/local-seo`: title `80`
- `/learning-center/rank-on-google-maps-southeast-texas`: title `99`
- `/es/centro-de-aprendizaje`: title `96`

Recommended next step: handle these as a focused metadata copy pass, not as a technical architecture change. The safest fix is to create shorter page-specific SEO titles and descriptions rather than truncating strings programmatically.

## Google Search Console Actions

After this phase is pushed live:

1. Submit `https://pixelnpanel.com/sitemap.xml` in Google Search Console.
2. Inspect these priority URLs:
   - `https://pixelnpanel.com/`
   - `https://pixelnpanel.com/signage`
   - `https://pixelnpanel.com/digital`
   - `https://pixelnpanel.com/free-visibility-check`
   - `https://pixelnpanel.com/service-area/beaumont-tx`
   - `https://pixelnpanel.com/service-area/beaumont-tx/vehicle-graphics`
   - `https://pixelnpanel.com/es`
   - `https://pixelnpanel.com/es/letreros`
3. Request indexing only after the deployment is live.
4. Monitor:
   - Page indexing
   - Duplicate without user-selected canonical
   - Alternate page with proper canonical tag
   - Crawled currently not indexed
   - Discovered currently not indexed

## Phase 8 Recommendation

Phase 8 should be a metadata copy cleanup pass:

- Shorten hub-page titles.
- Shorten service-area hub titles and descriptions.
- Shorten signage product titles and descriptions.
- Shorten learning-center article titles for search display.
- Keep current canonical, sitemap, robots, schema, and route architecture unchanged unless Search Console reports a specific issue.
