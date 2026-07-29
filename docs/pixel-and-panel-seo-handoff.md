# Pixel & Panel — SEO context & tracking brief

Paste this at the start of a new Claude chat to bring it fully up to speed.

---

You're helping me with SEO strategy for my business. Here's the full context. Please read it all before responding, then just confirm you've got it and ask what I need — don't dump a plan on me yet.

## The business

**Pixel & Panel** (pixelnpanel.com) — a one-stop sign shop in Beaumont, TX. Custom signs, banners, yard signs, real estate signs, vehicle graphics, and print. I also build websites and do Google visibility work, but **signage is the core business and digital is secondary** — I have no digital-only clients yet, so please don't position me as an agency.

**I moved to Houston in early August 2026.** Beaumont, Nederland, and Port Arthur remain fully served. Houston is an addition, not a replacement.

Site is Next.js on Vercel. I have a developer setup (Claude Code) for actual code changes — in this chat I mainly want strategy, review, copy, and help tracking whether the work paid off.

## Key decisions already made (please don't relitigate these)

1. **Beaumont stays primary in the homepage and global page titles.** Beaumont ranks at positions 4–18 and earns nearly all my current clicks. Houston is built as a parallel set of pages at `/houston/*`. Making Houston the lead market was considered and rejected as too risky.
2. **Houston runs as a service-area business.** My Houston address is residential and is deliberately never published — no street address on the site, none in the structured data. Coverage is expressed as a service area instead.
3. **No fabricated proof.** I have no Houston customers or digital clients yet, so no testimonials, case studies, client counts, or results claims anywhere until they're real.
4. **Pricing must stay identical between Beaumont and Houston** for the same product.

## Current published pricing (keep any advice consistent with this)

- Vinyl banners: 3'×8' **$60–$120**; large job-site 4'×12'+ **$100–$250**
- Yard signs: 18"×24" coroplast w/ H-stakes **$3–$8 each**, best pricing at 50+
- Websites: **$299** Launch Page / **$499** Starter / **$799** Local Business Site / **$999** Site + Visibility Setup
- Local SEO: **$300–$800** one-time, or **$150–$400/month**
- Google Business Profile: **$199** one-time, **$79/month** ongoing

## What was just done (late July 2026)

**Houston build:**
- Rewrote all Houston pages from ~150-word placeholders to 1,000–1,350 words each, with real Houston specifics (sign permitting via Houston Public Works, no-zoning-but-regulated signage, hurricane/UV material guidance, suburb rules).
- Pages now live: `/houston`, `/houston/banners`, `/houston/event-banners`, `/houston/yard-signs`, `/houston/real-estate-signs`, `/houston/web-design`, `/houston/local-seo`, plus Spanish versions of the signage ones.
- Added Greater Houston suburb coverage as a content section (Katy, Cypress, Sugar Land, The Woodlands, Pearland, Spring, etc.) rather than thin per-suburb pages.
- Added a homepage section linking all four city hubs — `/houston` previously had no homepage link at all.

**Beaumont fixes — the site had four keyword cannibalization conflicts:**

Pairs of pages were competing for the same queries with near-identical title tags, so Google split the signal and ranked neither well. Fixed by making the `/digital/*` pages service-level hubs and letting the `/service-area/beaumont-tx/*` pages own the exact city-qualified queries.

- Web design: hub retitled, city page now "Web Design Beaumont TX | Small Business Sites from $299"
- Local SEO: same split, city page now "Local SEO Beaumont TX | Small Business SEO from $300"
- Google Business Profile: the two pages had **byte-identical H1s**; city page now "Google Business Profile Optimization Beaumont TX | From $199"
- Also fixed: three titles that rendered the brand twice, a redirect that discarded city intent, and Nederland/Port Arthur pages titled "Google Profile in [city]" — a phrase nobody searches.

Verified across all 214 pages: zero duplicate titles, zero duplicate meta descriptions, zero duplicate H1s.

**Site health & technical SEO (also done):**
- **Sitemap now emits `<lastmod>` on all 214 URLs**, dated from real content-change dates (Houston/digital 2026-07-28, signage catalog 07-19, portfolio 07-10, learning center 07-02) — not "today" on every deploy, which would train Google to ignore the signal. It had no lastmod at all before; this helps Google prioritize recrawling the pages that actually changed.
- **Homepage hero images now eager-load.** They were lazy-loading the LCP element, which hurt mobile page speed. The two top-row images also get a high fetch-priority hint.
- **Migrated three product-page hero images** off the `priority` prop that Next.js 16 deprecated (to `loading="eager"` + `fetchPriority="high"`).

**Code audit conclusion:** the site's code is in good shape. Confirmed things already done right — no self-serving review/AggregateRating schema (which risks a Google manual action), all images use `next/image` with alt text, fonts load with `display: swap`. **The remaining gains are off-page — Google Business Profile, citations, reviews — not in the codebase.** Don't send me down a rabbit hole of more code tweaks; that well is mostly dry.

**Known open code item (for my dev setup, not this chat):** the `/quote-request` page and its Spanish twin each render the same H1 twice — flagged, not yet fixed. Minor; doesn't need strategy input.

## Baseline data — Google Search Console, May 8 – Jul 26 2026 (before the changes)

**Site totals:** 108 clicks / 2,669 impressions / avg position 22.5. Trend was impressions rising sharply (245 → 800 → 1,624 monthly) while average position fell (15.3 → 27.8) — that's new pages entering the index at low positions, not a penalty.

**Track these queries — this is the "did it work" list:**

| Query | Clicks | Impr | Position |
|---|---|---|---|
| custom banners beaumont | 5 | 94 | 17.8 |
| **web design beaumont tx** | 0 | 95 | **40.8** |
| google business profile optimization beaumont tx | 2 | 87 | 4.0 |
| google maps seo beaumont tx | 0 | 66 | 13.6 |
| banners beaumont | 0 | 57 | 22.1 |
| signs in beaumont tx | 4 | 27 | 35.3 |
| website design beaumont tx | 0 | 20 | 31.1 |
| **seo beaumont tx** | 0 | 15 | **59.5** |
| **seo company beaumont tx** | 0 | 12 | **72.3** |
| event banners houston tx | 0 | 18 | 32.8 |
| houston banner printing | 0 | 18 | 47.3 |
| banners houston | 0 | 11 | 54.5 |
| real estate signs houston | 0 | 9 | 28.8 |
| yard signs houston tx | 0 | 8 | 42.5 |
| custom signs houston | 0 | 4 | 68.8 |

**Page baselines:** `/houston` 32 impr @ 39.3 · `/houston/banners` 107 impr @ 40.5 · `/houston/yard-signs` 27 impr @ 51.0 · `/houston/real-estate-signs` 28 impr @ 29.9 · `/digital/web-development` 369 impr @ 33.3

**Note:** Houston already had ~170 impressions across ~30 Houston queries before any of this work — the demand is real, the rankings just weren't there.

## What I still need to do (in priority order)

**1. Houston Google Business Profile — the biggest lever, bigger than anything on the website.**
- Create it as a service-area business with the address hidden
- Verification (postcard or video) takes days to weeks — start early
- **Critical: do not move, rename, or re-verify the Beaumont profile.** It ranks position 4–5 and produces my only digital clicks. Separate listing.

**2. Houston citations** — Beaumont ones don't transfer. Consistent name/phone across Houston-area directories.

**3. Houston reviews** — roughly 20–30 at 4.5+ is the realistic floor for a local 3-pack in a market this size.

**4. Search Console housekeeping** — resubmit the sitemap (it now carries lastmod dates, so a resubmit is more useful than before) and request indexing on the four newest URLs: `/houston/event-banners`, `/houston/web-design`, `/houston/local-seo`, `/es/houston/banners-para-eventos`.

**5. Content still missing** — Houston testimonials (sections stay hidden until real ones exist), Spanish versions of the two Houston digital pages, possibly a Houston version of my Google Maps article (the Southeast Texas one pulls ~100 impressions at position 13–14).

## How to help me

- **Timeline expectations:** Beaumont title consolidation should show in 4–8 weeks. Houston content is a 3–6 month arc. The two Houston digital pages start from literally zero demand — treat them as a long play.
- **Don't panic-revert:** rankings often dip for a week or two during title consolidation while Google re-decides which page owns a query. That's expected.
- **Be blunt with me.** If something I want to do is a bad idea, say so. If a tactic won't move the needle, tell me instead of humoring it. I'd rather hear "that won't work" than get a polite plan.
- **Never invent numbers, reviews, clients, or results** in anything you write for me.
- When I paste a new Search Console export, compare it against the baseline above and tell me specifically what moved and what didn't.
