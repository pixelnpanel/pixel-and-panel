// lib/signage/data.js
// Data-driven signage catalog sourced from ONE published Google Sheet (CSV).
//
// Set SIGNAGE_SHEET_CSV_URL (server-side only — never NEXT_PUBLIC_) to the
// sheet's "Publish to web → CSV" URL. Edits to the sheet appear on the live
// site within ~15 min via ISR (Google's own publish cache adds up to ~5 min).
// Use an on-demand revalidate if a change must go live sooner.
//
// Everything is generated from the data: adding rows/categories to the sheet
// adds products/categories with ZERO code changes across all categories.
//
// Public API (server-only):
//   getCategories()                       -> ordered categories w/ products
//   getCategory(categorySlug)             -> one category or null
//   getProduct(categorySlug, productSlug) -> one product or null
//   getCatalog()                          -> { categories } (raw)

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { cache } from 'react'
import { CATEGORY_ORDER, PRODUCT_ORDER, CATEGORY_IMAGES, CATEGORY_META, CATEGORY_SEARCH_SYNONYMS, PRODUCT_SEARCH_SYNONYMS } from './catalog-config.js'
import { slugify, parsePrice, parseCsv, rowsToRecords, rowsToContent } from './parsers.js'
export { slugify, formatPrice } from './parsers.js'

const CSV_URL = process.env.SIGNAGE_SHEET_CSV_URL

// Optional product-content source (one row per product: long-form copy, specs,
// FAQs, SEO). Joined to the price rows by slug. If unset/unpublished, pages
// degrade gracefully to the generated copy with zero errors.
const CONTENT_CSV_URL = process.env.SIGNAGE_CONTENT_CSV_URL

// Revalidate window for the underlying fetch (seconds). Pages also set their
// own segment-level `revalidate` (keep them equal to this), but this guards
// the data source directly. 15 min: near-immediate sheet-to-site sync without
// going fully dynamic. This ceiling also governs the sitemap and both home
// pages, which inherit it via getCategories().
const REVALIDATE_SECONDS = 900
// A missing feed is useful for a local shell build, but a Vercel build must
// fail rather than publish an empty catalog and sitemap. Runtime fetch errors
// also throw on Vercel so ISR can retain its previous successful response.
const CATALOG_REQUIRED = process.env.VERCEL === '1'

// Locale / brand constants — SEO-only surfaces (meta descriptions, image alt
// text, JSON-LD). Visible page copy stays location-free by design.
const SERVICE_AREA = 'Beaumont, Port Arthur & Nederland TX'

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
        const res = await fetch(CONTENT_CSV_URL, {
            next: { revalidate: REVALIDATE_SECONDS },
            signal: AbortSignal.timeout(10000),
        })
        if (!res.ok) throw new Error(`Content CSV fetch failed with ${res.status}.`)
        const text = await res.text()
        if (text.trimStart().startsWith('<')) throw new Error('Content source returned HTML instead of CSV.')
        const records = rowsToContent(parseCsv(text))
        if (!records.some((record) => record.intro)) throw new Error('Content source returned no product descriptions.')
        const map = new Map()
        for (const c of records) {
            if (!map.has(c.slug)) map.set(c.slug, c)
            const byProduct = slugify(c.product)
            if (byProduct && !map.has(byProduct)) map.set(byProduct, c)
        }
        return map
    } catch (err) {
        // A configured feed must not silently remove the indexed copy during
        // revalidation. Throwing lets Next retain the last successful page.
        if (CATALOG_REQUIRED) throw new Error(`[signage] Product content feed unavailable: ${err.message}`)
        console.warn('[signage] content CSV fetch threw — rendering without product content.', err)
        return new Map()
    }
}

// ── Catalog assembly ─────────────────────────────────────────────────────────

// Cache existence checks per process; ISR restarts pick up newly added files.
const categoryImageCache = new Map()

/** Public URL for the hand-made category cover, or null if the file isn't there yet. */
function resolveCategoryImage(slug) {
    if (categoryImageCache.has(slug)) return categoryImageCache.get(slug)
    const filename = CATEGORY_IMAGES[slug]
    let url = null
    if (filename) {
        const onDisk = join(process.cwd(), 'public', 'images', 'signage', 'categories', filename)
        if (existsSync(onDisk)) url = `/images/signage/categories/${filename}`
    }
    categoryImageCache.set(slug, url)
    return url
}

const productImageCache = new Map()

/**
 * Sheet-supplied product image, but only if the file is actually on disk.
 *
 * The sheet is edited by hand, so a path can easily be filled in before the
 * photo lands — which renders a broken next/image on a live product page and
 * puts a dead URL in that page's og:image and JSON-LD. Categories have always
 * been guarded this way; products were not. Returning '' instead lets the
 * product page fall back to its placeholder until the photo shows up.
 */
function resolveProductImage(raw) {
    const url = String(raw || '').trim()
    if (!url) return ''
    // Only local /images/... paths can be checked; leave anything remote alone.
    if (!url.startsWith('/')) return url
    if (productImageCache.has(url)) return productImageCache.get(url)
    const onDisk = join(process.cwd(), 'public', url.split('?')[0])
    const resolved = existsSync(onDisk) ? url : ''
    if (!resolved) {
        console.warn(`[signage] image referenced in the sheet is not on disk, hiding it: ${url}`)
    }
    productImageCache.set(url, resolved)
    return resolved
}

function categoryMetaFor(name, slug, products = []) {
    const override = CATEGORY_META[slug] || {}

    // A category page and a product page inside it must never share an H1:
    // Google splits the ranking signal between them and neither one wins.
    // Business cards surfaced this — the category holds a product of the same
    // name, so both pages rendered "Custom Business Cards". Any category whose
    // sheet gains a same-named product hits it, so the guard is generic; the
    // CATEGORY_META h1 override is there when a category deserves better copy
    // than the fallback (business cards wants the "printing" query).
    const collidesWithProduct = products.some(
        (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
    )

    // Visible copy (tagline, description, h1) stays location-free — the site
    // should read national/international. Cities live in seoDescription only,
    // which feeds meta tags and JSON-LD.
    return {
        tagline: override.tagline || `Custom ${name.toLowerCase()} with free design help and fast turnaround.`,
        description:
            override.description ||
            `Custom ${name.toLowerCase()} printed to order — free design help, fast turnaround, and nationwide shipping.`,
        seoDescription:
            override.seoDescription ||
            `Custom ${name.toLowerCase()} in ${SERVICE_AREA}. Preset sizes with instant pricing or a fast, free quote from Pixel & Panel.`,
        h1: override.h1 || (collidesWithProduct ? `All ${name}` : `Custom ${name}`),
        image: resolveCategoryImage(slug),
    }
}

/** Build a single product object from its grouped rows. */
function buildProduct(categoryName, categorySlug, productName, rows) {
    const slug = slugify(productName)

    // Keep sheet artwork first. A product-specific local mockup fills gaps when
    // the sheet has no image (or references a file that has not arrived yet).
    const localImage = `/images/signage/${categorySlug}/${slug}-beaumont-tx.webp`
    const image = resolveProductImage(rows.find((r) => r.image)?.image) ||
        (existsSync(join(process.cwd(), 'public', localImage)) ? localImage : '')
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
        // Search hints for the existing hub search UI: the product/category
        // names, individual name tokens, plus curated synonyms (alternate names
        // buyers type — "pull up banner", "lawn sign", etc.) at both the
        // category and product level. De-duplicated to keep the blob compact.
        searchKeywords: [
            ...new Set([
                productName,
                categoryName,
                ...productName.toLowerCase().split(/\s+/),
                ...(CATEGORY_SEARCH_SYNONYMS[categorySlug] || []),
                ...(PRODUCT_SEARCH_SYNONYMS[slug] || []),
            ]),
        ],
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
        // Demand-ranked ordering; unranked products keep sheet order at the end
        // (Array#sort is stable).
        const rankIndex = new Map((PRODUCT_ORDER[categorySlug] || []).map((slug, i) => [slug, i]))
        products.sort((a, b) => {
            const ar = rankIndex.has(a.slug) ? rankIndex.get(a.slug) : 500
            const br = rankIndex.has(b.slug) ? rankIndex.get(b.slug) : 500
            return ar - br
        })
        const meta = categoryMetaFor(categoryName, categorySlug, products)
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
        if (CATALOG_REQUIRED) {
            throw new Error('SIGNAGE_SHEET_CSV_URL is required on Vercel.')
        }
        return { categories: [] }
    }

    try {
        const res = await fetch(CSV_URL, {
            next: { revalidate: REVALIDATE_SECONDS },
            signal: AbortSignal.timeout(10000),
        })
        if (!res.ok) throw new Error(`CSV fetch failed with ${res.status}.`)
        const text = await res.text()
        if (text.trimStart().startsWith('<')) throw new Error('CSV source returned HTML instead of CSV.')
        const records = rowsToRecords(parseCsv(text))
        if (!records.some((record) => record.category && record.product)) {
            throw new Error('CSV source returned no catalog rows.')
        }
        return buildCatalog(records)
    } catch (err) {
        if (CATALOG_REQUIRED) throw new Error(`[signage] Catalog feed unavailable: ${err.message}`)
        console.warn('[signage] CSV fetch threw — rendering empty catalog.', err)
        return { categories: [] }
    }
}

// Memoize per render pass; ISR handles freshness across requests.
export const getCatalog = cache(async function getCatalog() {
    // Pull the price rows and the content rows together, then join on slug.
    const [catalog, contentMap] = await Promise.all([fetchCatalog(), fetchContentMap()])
    for (const category of catalog.categories) {
        for (const product of category.products) {
            // Graceful degrade: a product with no content row gets null.
            product.content = contentMap.get(product.slug) || null
        }
    }
    return catalog
})

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
