// Server-only image guard for the Spanish catalog.
//
// The English catalog already drops image paths whose file is not on disk, so a
// missing photo renders as a clean placeholder. The Spanish catalog is static
// data with no such guard, and 18 of the 30 paths it references have no file —
// every one of them was rendering as a broken image on /es/letreros and the
// Spanish product pages. Alt text was present, which is why the accessibility
// pass never caught it; the files simply 404.
//
// Same approach as resolveProductImage in lib/signage/data.js: check once at
// build time, keep the result, and hand the client a null it already knows how
// to render. Drop the file into public/ and the photo returns with no code
// change.

import { existsSync } from 'node:fs'
import { join } from 'node:path'

const cache = new Map()

function onDisk(src) {
    if (!src || !src.startsWith('/')) return null
    if (cache.has(src)) return cache.get(src)

    const resolved = existsSync(join(process.cwd(), 'public', src)) ? src : null
    if (!resolved) {
        console.warn(`[signage/es] image referenced by the Spanish catalog is not on disk, hiding it: ${src}`)
    }
    cache.set(src, resolved)
    return resolved
}

/** Strip unusable image paths from one Spanish product. */
export function withResolvedImageEs(product) {
    if (!product) return product
    return { ...product, image: onDisk(product.image) }
}

/** Strip unusable image paths from the Spanish category tree. */
export function withResolvedImagesEs(categories) {
    return categories.map((category) => ({
        ...category,
        image: onDisk(category.image),
        products: (category.products || []).map(withResolvedImageEs),
    }))
}
