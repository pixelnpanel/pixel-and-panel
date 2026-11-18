import { CATEGORY_SEARCH_SYNONYMS, PRODUCT_SEARCH_SYNONYMS } from './catalog-config.js'

const STOP_WORDS = new Set(['a', 'an', 'for', 'in', 'of', 'the', 'with'])

export function normalizeSignageSearch(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[’′]/g, "'")
        .replace(/\ba[\s-]+frame\b/g, 'aframe')
        .replace(/\b(\d+(?:\.\d+)?)\s*(?:ft\.?|feet|foot|')(?=\s|$)/g, '$1ft')
        .replace(/\b(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)\b/g, '$1x$2')
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/)
        .filter((word) => word && !STOP_WORDS.has(word))
        .map((word) => {
            if (/(?:ches|shes|xes|sses)$/.test(word)) return word.slice(0, -2)
            return word.length > 3 && /[^s]s$/.test(word) ? word.slice(0, -1) : word
        })
        .join(' ')
}

const normalizeTerms = (terms = []) => terms.map(normalizeSignageSearch).filter(Boolean)
const includesPhrase = (value, phrase) => ` ${value} `.includes(` ${phrase} `)

export function indexSignageProducts(products) {
    return products.map((product) => {
        const name = normalizeSignageSearch(product.name)
        const aliases = normalizeTerms(PRODUCT_SEARCH_SYNONYMS[product.slug])
        const categories = normalizeTerms([product.categoryName, ...(CATEGORY_SEARCH_SYNONYMS[product.categorySlug] || [])])
        const text = [name, ...aliases, ...categories, normalizeSignageSearch(product.description)].join(' ')
        return { product, name, aliases, categories, words: new Set(text.split(' ')), nameWords: new Set(name.split(' ')) }
    })
}

function isCloseWord(query, word) {
    if (query.length < 4 || /\d/.test(query) || Math.abs(query.length - word.length) > 1) return false
    const [short, long] = query.length <= word.length ? [query, word] : [word, query]
    let index = 0
    while (index < short.length && short[index] === long[index]) index++
    if (short.length !== long.length) return short.slice(index) === long.slice(index + 1)
    if (short.slice(index + 1) === long.slice(index + 1)) return true
    return short[index] === long[index + 1] &&
        short[index + 1] === long[index] &&
        short.slice(index + 2) === long.slice(index + 2)
}

export function searchSignageProducts(index, query) {
    const normalized = normalizeSignageSearch(query)
    if (!normalized) return { products: [], closeMatches: false }

    const words = normalized.split(' ')
    const wantsHardware = words.some((word) => ['hardware', 'base', 'frame', 'pole', 'replacement', 'part', 'accessory'].includes(word))
    const matched = []
    const similar = []

    for (const entry of index) {
        const missing = words.filter((word) => !entry.words.has(word))
        const hardwareAdjustment = entry.product.categorySlug === 'hardware' ? (wantsHardware ? 30 : -40) : 0
        if (missing.length) {
            if (missing.length === 1 && [...entry.words].some((word) => isCloseWord(missing[0], word))) {
                similar.push({ product: entry.product, score: words.filter((word) => entry.nameWords.has(word)).length * 10 + hardwareAdjustment })
            }
            continue
        }
        let score = hardwareAdjustment
        if (entry.name === normalized) score += 120
        else if (includesPhrase(entry.name, normalized)) score += 80
        if (entry.aliases.includes(normalized)) score += 65
        else if (entry.aliases.some((alias) => includesPhrase(alias, normalized))) score += 45
        if (entry.categories.some((category) => includesPhrase(category, normalized))) score += 25
        score += words.filter((word) => entry.nameWords.has(word)).length * 8
        matched.push({ product: entry.product, score })
    }

    const results = matched.length ? matched : similar
    return {
        products: results.sort((a, b) => b.score - a.score).map(({ product }) => product),
        closeMatches: matched.length === 0 && similar.length > 0,
    }
}
