// lib/signage/data.js
// Data-driven signage catalog sourced from ONE published Google Sheet (CSV).
//
// Set SIGNAGE_SHEET_CSV_URL (server-side only — never NEXT_PUBLIC_) to the
// sheet's "Publish to web → CSV" URL. Edits to the sheet appear on the live
// site within ~1–2 min via ISR (Google's own publish cache adds up to ~5 min).
//
// Everything is generated from the data: adding rows/categories to the sheet
// adds products/categories with ZERO code changes across all categories.
//
// Public API (server-only):
//   getCategories()                       -> ordered categories w/ products
//   getCategory(categorySlug)             -> one category or null
//   getProduct(categorySlug, productSlug) -> one product or null
//   getCatalog()                          -> { categories } (raw)

const CSV_URL = process.env.SIGNAGE_SHEET_CSV_URL

// Optional product-content source (one row per product: long-form copy, specs,
// FAQs, SEO). Joined to the price rows by slug. If unset/unpublished, pages
// degrade gracefully to the generated copy with zero errors.
const CONTENT_CSV_URL = process.env.SIGNAGE_CONTENT_CSV_URL

// Revalidate window for the underlying fetch (seconds). Pages also set their
// own segment-level `revalidate`, but this guards the data source directly.
const REVALIDATE_SECONDS = 60

// Locale / brand constants surfaced in generated copy + alt fallbacks.
const SERVICE_AREA = 'Beaumont, Port Arthur & Orange TX'

// Preferred category order on the hub. Unknown categories (added later in the
// sheet) fall to the end, alphabetically — still zero-code.
const CATEGORY_ORDER = ['banners', 'banner-stands', 'banner-stand-hardware']

// Optional human-written copy per category. Anything missing is generated, so
// brand-new categories from the sheet still render with sensible defaults.
const CATEGORY_META = {
    banners: {
        tagline: 'Vinyl, mesh, fabric & pole banners — built for Texas weather.',
        description:
            'Custom banners for storefronts, events, fences, and streets across the Golden Triangle. Indoor and outdoor, single- or double-sided, with grommets and finishing included.',
        seoDescription:
            'Custom vinyl, mesh, fabric, blockout, pole, and backlit banners in Beaumont, Port Arthur & Orange TX. Preset sizes with instant pricing or a fast quote.',
    },
    'banner-stands': {
        tagline: 'Retractable, tension-fabric, X-stand & step-and-repeat displays.',
        description:
            'Portable banner stands and backdrops for trade shows, lobbies, and events. Stand-plus-graphic packages with preset sizes, plus custom sizes by quote.',
        seoDescription:
            'Retractable, deluxe, SD, tension-fabric, X-stand, tabletop, and step-and-repeat banner stands in Beaumont, Port Arthur & Orange TX.',
    },
    'banner-stand-hardware': {
        tagline: 'Replacement frames, bases & LED lights for your banner stands.',
        description:
            'Replacement hardware and accessories for retractable, tension-fabric, X-stand, and step-and-repeat displays. Priced per request — tell us your model and we will match it.',
        seoDescription:
            'Replacement banner stand hardware, frames, bases, and LED lights in Beaumont, Port Arthur & Orange TX. Quote-based to match your existing display.',
    },
}

// ── String + price helpers ──────────────────────────────────────────────────

/** slugify per spec: lowercase, & -> and, strip non [a-z0-9 -], collapse to '-'. */
export function slugify(input) {
    return String(input || '')
        .trim()
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/** Parse a price cell: strip $ , spaces; non-numeric / blank / em/en-dash -> null. */
function parsePrice(raw) {
    if (raw == null) return null
    const cleaned = String(raw).replace(/[$,\s]/g, '')
    if (cleaned === '') return null
    const n = Number(cleaned)
    return Number.isFinite(n) ? n : null
}

/** Format a number as USD currency, e.g. 129.99 -> "$129.99". */
export function formatPrice(value) {
    if (value == null || !Number.isFinite(value)) return null
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

// ── Robust CSV parser (handles quoted fields, embedded commas + newlines) ─────

/** Parse CSV text into an array of string arrays. RFC-4180-ish. */
function parseCsv(text) {
    const rows = []
    let row = []
    let field = ''
    let inQuotes = false
    // Normalize CRLF/CR to LF so embedded newlines behave predictably.
    const src = String(text).replace(/\r\n?/g, '\n')

    for (let i = 0; i < src.length; i += 1) {
        const ch = src[i]

        if (inQuotes) {
            if (ch === '"') {
                if (src[i + 1] === '"') {
                    field += '"'
                    i += 1
                } else {
                    inQuotes = false
                }
            } else {
                field += ch
            }
            continue
        }

        if (ch === '"') {
            inQuotes = true
        } else if (ch === ',') {
            row.push(field)
            field = ''
        } else if (ch === '\n') {
            row.push(field)
            rows.push(row)
            row = []
            field = ''
        } else {
            field += ch
        }
    }

    // Flush trailing field/row (no final newline).
    if (field !== '' || row.length > 0) {
        row.push(field)
        rows.push(row)
    }

    return rows
}

/** Map parsed CSV rows to objects keyed by our canonical column names. */
function rowsToRecords(rows) {
    if (!rows.length) return []
    const headers = rows[0].map((h) => h.trim())

    // Resolve column indexes flexibly (en-dash vs hyphen, casing).
    const find = (predicate) => headers.findIndex(predicate)
    const idx = {
        image: find((h) => h.toLowerCase() === 'image link'),
        category: find((h) => h.toLowerCase() === 'category'),
        product: find((h) => h.toLowerCase() === 'product'),
        size: find((h) => h.toLowerCase() === 'size'),
        single: find((h) => /price/i.test(h) && /single/i.test(h)),
        double: find((h) => /price/i.test(h) && /double/i.test(h)),
        mode: find((h) => /pricing\s*mode/i.test(h)),
        notes: find((h) => h.toLowerCase() === 'notes'),
        alt: find((h) => /seo\s*alt/i.test(h)),
    }

    const at = (cols, i) => (i >= 0 && i < cols.length ? String(cols[i]).trim() : '')

    return rows.slice(1).map((cols) => ({
        image: at(cols, idx.image),
        category: at(cols, idx.category),
        product: at(cols, idx.product),
        size: at(cols, idx.size),
        single: at(cols, idx.single),
        double: at(cols, idx.double),
        mode: at(cols, idx.mode),
        notes: at(cols, idx.notes),
        alt: at(cols, idx.alt),
    }))
}

// ── Product content (one row per product) ────────────────────────────────────

/** Split a " | " (space-pipe-space) delimited list cell into trimmed items. */
function splitList(raw) {
    return String(raw || '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean)
}

/** Map the content tab's rows to per-product content objects, keyed by header. */
function rowsToContent(rows) {
    if (!rows.length) return []
    const headers = rows[0].map((h) => h.trim().toLowerCase())
    const col = (name) => headers.indexOf(name.toLowerCase())
    const at = (cols, i) => (i >= 0 && i < cols.length ? String(cols[i]).trim() : '')

    const idx = {
        slug: col('slug'),
        product: col('product'),
        h1: col('h1'),
        seoTitle: col('seo title'),
        metaDescription: col('meta description'),
        priceChip: col('price chip'),
        intro: col('intro'),
        highlights: col('highlights'),
        perfectFor: col('perfect for'),
        imageAlt: col('image alt'),
    }

    return rows
        .slice(1)
        .map((cols) => {
            // Only non-empty spec groups (need both a title and at least one item).
            const specGroups = []
            for (let n = 1; n <= 4; n += 1) {
                const title = at(cols, col(`spec group ${n} title`))
                const items = splitList(at(cols, col(`spec group ${n} items`)))
                if (title && items.length) specGroups.push({ title, items })
            }
            // Only non-empty FAQ pairs (need both a question and an answer).
            const faqs = []
            for (let n = 1; n <= 4; n += 1) {
                const question = at(cols, col(`faq ${n} q`))
                const answer = at(cols, col(`faq ${n} a`))
                if (question && answer) faqs.push({ question, answer })
            }
            const product = at(cols, idx.product)
            const slug = slugify(at(cols, idx.slug) || product)
            return {
                slug,
                product,
                h1: at(cols, idx.h1),
                seoTitle: at(cols, idx.seoTitle),
                metaDescription: at(cols, idx.metaDescription),
                priceChip: at(cols, idx.priceChip),
                intro: at(cols, idx.intro),
                highlights: splitList(at(cols, idx.highlights)),
                perfectFor: splitList(at(cols, idx.perfectFor)),
                specGroups,
                faqs,
                imageAlt: at(cols, idx.imageAlt),
            }
        })
        .filter((c) => c.slug)
}

let warnedMissingContentEnv = false

/** Fetch + index product content by slug (and by slugified product as fallback). */
async function fetchContentMap() {
    if (!CONTENT_CSV_URL) {
        if (!warnedMissingContentEnv) {
            console.warn(
                '[signage] SIGNAGE_CONTENT_CSV_URL is not set — rendering products ' +
                'without long-form content. Add it to .env.local and Vercel env vars.'
            )
            warnedMissingContentEnv = true
        }
        return new Map()
    }

    try {
        const res = await fetch(CONTENT_CSV_URL, { next: { revalidate: REVALIDATE_SECONDS } })
        if (!res.ok) {
            console.warn(`[signage] content CSV fetch failed (${res.status}) — rendering without product content.`)
            return new Map()
        }
        const text = await res.text()
        const records = rowsToContent(parseCsv(text))
        const map = new Map()
        for (const c of records) {
            if (!map.has(c.slug)) map.set(c.slug, c)
            const byProduct = slugify(c.product)
            if (byProduct && !map.has(byProduct)) map.set(byProduct, c)
        }
        return map
    } catch (err) {
        console.warn('[signage] content CSV fetch threw — rendering without product content.', err)
        return new Map()
    }
}

// ── Catalog assembly ─────────────────────────────────────────────────────────

function categoryMetaFor(name, slug) {
    const override = CATEGORY_META[slug] || {}
    return {
        tagline: override.tagline || `Custom ${name} for ${SERVICE_AREA}.`,
        description:
            override.description ||
            `Custom ${name.toLowerCase()} for businesses across the Golden Triangle — ${SERVICE_AREA}.`,
        seoDescription:
            override.seoDescription ||
            `Custom ${name.toLowerCase()} in ${SERVICE_AREA}. Preset sizes with instant pricing or a fast, free quote from Pixel & Panel.`,
        h1: `Custom ${name} in ${SERVICE_AREA}`,
    }
}

/** Build a single product object from its grouped rows. */
function buildProduct(categoryName, categorySlug, productName, rows) {
    const slug = slugify(productName)

    // Inherit image + alt from the first row that supplies them.
    const image = rows.find((r) => r.image)?.image || ''
    const altRaw = rows.find((r) => r.alt)?.alt || ''
    const notes = rows.find((r) => r.notes)?.notes || ''
    const modeRaw = rows.find((r) => r.mode)?.mode || ''
    const isQuoteMode = modeRaw.trim().toLowerCase() !== 'live'

    // A size is selectable only if it carries at least one numeric price.
    const priced = rows
        .map((r) => ({
            label: r.size,
            single: parsePrice(r.single),
            double: parsePrice(r.double),
            note: r.note || r.notes || '',
        }))
        .filter((s) => s.single != null || s.double != null)

    // Disambiguate duplicate size labels (e.g. step-and-repeat graphic vs frame).
    const labelCounts = priced.reduce((acc, s) => {
        acc[s.label] = (acc[s.label] || 0) + 1
        return acc
    }, {})
    const sizes = priced.map((s, i) => {
        const dup = labelCounts[s.label] > 1
        const notePrefix = s.note ? s.note.split('(')[0].trim() : ''
        const displayLabel = dup && notePrefix ? `${s.label} — ${notePrefix}` : s.label || 'Standard'
        return {
            id: String(i),
            label: displayLabel,
            single: s.single,
            double: s.double,
        }
    })

    const hasSingle = sizes.some((s) => s.single != null)
    const hasDouble = sizes.some((s) => s.double != null)
    const availableSides = []
    if (hasSingle) availableSides.push('single')
    if (hasDouble) availableSides.push('double')

    const isLive = !isQuoteMode && sizes.length > 0

    const allPrices = sizes.flatMap((s) =>
        [s.single, s.double].filter((p) => p != null)
    )
    const lowestPrice = isLive && allPrices.length ? Math.min(...allPrices) : null

    const alt = altRaw || `Custom ${productName} in ${SERVICE_AREA}`
    // Fallback blurb only — real cards use the sheet's product Intro. Kept
    // benefit-led and location-light so nothing reads as area-restricted.
    const description = `Custom ${productName} with free design help, fast turnaround, and nationwide shipping.`

    return {
        name: productName,
        slug,
        categoryName,
        categorySlug,
        image: image || null,
        alt,
        imageAlt: alt,
        notes,
        description,
        sizes,
        availableSides,
        isLive,
        pricingMode: isLive ? 'Live' : 'Quote',
        lowestPrice,
        // Search hints for the existing hub search UI.
        searchKeywords: [productName, categoryName, ...productName.toLowerCase().split(/\s+/)],
    }
}

/** Build the full catalog (ordered categories with products) from CSV records. */
function buildCatalog(records) {
    // Preserve sheet order; group strictly by Category + Product.
    const categoryOrder = []
    const categoryMap = new Map()

    for (const rec of records) {
        const categoryName = rec.category.trim()
        const productName = rec.product.trim()
        if (!categoryName || !productName) continue

        if (!categoryMap.has(categoryName)) {
            categoryMap.set(categoryName, new Map())
            categoryOrder.push(categoryName)
        }
        const products = categoryMap.get(categoryName)
        if (!products.has(productName)) products.set(productName, [])
        products.get(productName).push(rec)
    }

    let categories = categoryOrder.map((categoryName) => {
        const categorySlug = slugify(categoryName)
        const productsMap = categoryMap.get(categoryName)
        const products = []
        for (const [productName, rows] of productsMap) {
            products.push(buildProduct(categoryName, categorySlug, productName, rows))
        }
        const meta = categoryMetaFor(categoryName, categorySlug)
        return {
            name: categoryName,
            slug: categorySlug,
            ...meta,
            products,
            productCount: products.length,
        }
    })

    // Apply preferred ordering; unknown categories sort to the end A→Z.
    const orderIndex = new Map(CATEGORY_ORDER.map((slug, i) => [slug, i]))
    categories = categories
        .map((c, i) => ({ c, i }))
        .sort((a, b) => {
            const ao = orderIndex.has(a.c.slug) ? orderIndex.get(a.c.slug) : 500
            const bo = orderIndex.has(b.c.slug) ? orderIndex.get(b.c.slug) : 500
            return ao - bo || a.c.name.localeCompare(b.c.name) || a.i - b.i
        })
        .map(({ c }) => c)

    return { categories }
}

// ── Fetch + cache ────────────────────────────────────────────────────────────

let warnedMissingEnv = false

async function fetchCatalog() {
    if (!CSV_URL) {
        if (!warnedMissingEnv) {
            console.warn(
                '[signage] SIGNAGE_SHEET_CSV_URL is not set — rendering an empty catalog. ' +
                'Add it to .env.local and Vercel project env vars.'
            )
            warnedMissingEnv = true
        }
        return { categories: [] }
    }

    try {
        const res = await fetch(CSV_URL, { next: { revalidate: REVALIDATE_SECONDS } })
        if (!res.ok) {
            console.warn(`[signage] CSV fetch failed (${res.status}) — rendering empty catalog.`)
            return { categories: [] }
        }
        const text = await res.text()
        const records = rowsToRecords(parseCsv(text))
        return buildCatalog(records)
    } catch (err) {
        console.warn('[signage] CSV fetch threw — rendering empty catalog.', err)
        return { categories: [] }
    }
}

// Memoize per render pass; ISR handles freshness across requests.
export async function getCatalog() {
    // Pull the price rows and the content rows together, then join on slug.
    const [catalog, contentMap] = await Promise.all([fetchCatalog(), fetchContentMap()])
    for (const category of catalog.categories) {
        for (const product of category.products) {
            // Graceful degrade: a product with no content row gets null.
            product.content = contentMap.get(product.slug) || null
        }
    }
    return catalog
}

export async function getCategories() {
    const { categories } = await getCatalog()
    return categories
}

export async function getCategory(categorySlug) {
    const { categories } = await getCatalog()
    return categories.find((c) => c.slug === categorySlug) || null
}

export async function getProduct(categorySlug, productSlug) {
    const category = await getCategory(categorySlug)
    if (!category) return null
    const product = category.products.find((p) => p.slug === productSlug)
    if (!product) return null
    return { product, category }
}
