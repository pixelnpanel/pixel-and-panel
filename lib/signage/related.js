// Related-product selection for the product page.
//
// Every product page used to carry exactly one inbound internal link — from
// its category page — and no outbound link to another product. That starves
// the pages that actually sell from internal link equity and leaves a visitor
// who is nearly-but-not-quite interested with nowhere to go but the back
// button. Siblings alone fix most of it: in a ten-product category each
// product picks up nine inbound links instead of one.
//
// The smallest category holds two products, so there is always at least one
// sibling; the cross-sell map only tops the row up to a useful length, and
// pairs categories a buyer would genuinely consider together (a banner and the
// stand it hangs on, business cards and the flyers that go with them).
const CROSS_SELL = {
    banners: ['banner-stands', 'flags'],
    'banner-stands': ['trade-show-displays', 'seg-displays'],
    'rigid-and-metal-signs': ['real-estate-signs', 'sidewalk-a-frame-signs'],
    'real-estate-signs': ['rigid-and-metal-signs', 'flags'],
    flags: ['banners', 'event-tents'],
    'sidewalk-a-frame-signs': ['sign-holders-and-display-frames', 'rigid-and-metal-signs'],
    'vinyl-decals-and-window-graphics': ['dimensional-letters', 'rigid-and-metal-signs'],
    'dimensional-letters': ['vinyl-decals-and-window-graphics', 'rigid-and-metal-signs'],
    'trade-show-displays': ['banner-stands', 'table-covers-and-throws'],
    'seg-displays': ['trade-show-displays', 'banner-stands'],
    'event-tents': ['table-covers-and-throws', 'flags'],
    'table-covers-and-throws': ['event-tents', 'trade-show-displays'],
    'dtf-transfers': ['labels-stickers-and-packaging', 'magnets-and-clings'],
    'canvas-and-poster-prints': ['sign-holders-and-display-frames', 'banners'],
    'sign-holders-and-display-frames': ['canvas-and-poster-prints', 'sidewalk-a-frame-signs'],
    hardware: ['banner-stands', 'flags'],
    'business-cards': ['flyers-brochures-and-booklets', 'magnets-and-clings'],
    'flyers-brochures-and-booklets': ['postcards-and-direct-mail', 'business-cards'],
    'postcards-and-direct-mail': ['flyers-brochures-and-booklets', 'cards-invitations-and-event-print'],
    'cards-invitations-and-event-print': ['postcards-and-direct-mail', 'stationery-and-business-forms'],
    'labels-stickers-and-packaging': ['magnets-and-clings', 'dtf-transfers'],
    'stationery-and-business-forms': ['business-cards', 'flyers-brochures-and-booklets'],
    'magnets-and-clings': ['labels-stickers-and-packaging', 'business-cards'],
}

const withCategory = (category) => (product) => ({
    ...product,
    categorySlug: category.slug,
    categoryName: category.name,
    href: `/signage/${category.slug}/${product.slug}`,
})

/**
 * Siblings first (closest intent), then cross-sell categories until `limit`.
 * Returns [] rather than throwing if the catalog shape is ever unexpected, so
 * a sheet edit can never take a product page down over a related-items row.
 */
export function getRelatedProducts({ product, category, allCategories = [], limit = 6 }) {
    if (!product || !category) return []

    const siblings = (category.products || [])
        .filter((p) => p.slug !== product.slug)
        .map(withCategory(category))

    if (siblings.length >= limit) return siblings.slice(0, limit)

    const byslug = new Map(allCategories.map((c) => [c.slug, c]))
    const crossSell = (CROSS_SELL[category.slug] || []).flatMap((slug) => {
        const c = byslug.get(slug)
        return c ? (c.products || []).map(withCategory(c)) : []
    })

    return [...siblings, ...crossSell].slice(0, limit)
}
