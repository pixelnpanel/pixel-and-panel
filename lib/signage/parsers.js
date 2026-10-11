// Pure catalog transformations: no filesystem, network, or framework dependencies.
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
export function parsePrice(raw) {
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
export function parseCsv(text) {
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
export function rowsToRecords(rows) {
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
export function rowsToContent(rows) {
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

