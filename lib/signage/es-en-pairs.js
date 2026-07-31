// Which Spanish catalog page corresponds to which English one, for hreflang.
//
// The Spanish product data still carries `enSlug` values from the retired flat
// /signage/<product> catalog, so 30 of the 87 Spanish pages were pointing their
// en-US alternate at a URL that 301-redirects. hreflang has to resolve to the
// final canonical URL — a redirecting target invalidates the pair, so Google
// was discarding those declarations entirely.
//
// Two rules govern this table, and both matter more than coverage does:
//
//   1. Every value must be a live 200 URL, never a redirect.
//   2. The mapping must be 1:1. Several Spanish pages have no distinct English
//      counterpart (menus, monument/pylon/ADA/lobby signs), and several would
//      otherwise collide on the same English page. Pointing two Spanish pages
//      at one English page is an invalid cluster, so those are left out on
//      purpose. A missing hreflang is neutral; a wrong one is discarded along
//      with its partner.
//
// Left out for now, and why — these want a distinct English page before they
// can be paired: menus, letreros-monumento, letreros-pylon, letreros-ada
// (no English equivalent exists); letreros-de-coroplast, letreros-para-lobby,
// wraps-parciales-de-vehiculos, rotulacion-de-vehiculos,
// vinil-esmerilado-para-privacidad, letreros-para-negocios (would collide with
// a pair already claimed below, or match only loosely).
const ES_TO_EN = {
    'banners-de-vinilo': '/signage/banners/13oz-vinyl-banner',
    'banners-de-malla': '/signage/banners/mesh-banner',
    'banners-retroiluminados': '/signage/banners/backlit-banner',
    'banners-de-tela': '/signage/banners/9oz-fabric-banner',
    'banners-retractiles': '/signage/banner-stands/standard-retractable',
    'fondos-step-and-repeat': '/signage/banner-stands/step-and-repeat-backdrop',
    'letreros-para-jardin': '/signage/rigid-and-metal-signs/coroplast-yard-signs',
    'imanes-para-vehiculos': '/signage/rigid-and-metal-signs/car-and-vehicle-magnets',
    'letreros-de-metal': '/signage/rigid-and-metal-signs/aluminum-metal-signs',
    'letreros-de-acrilico': '/signage/rigid-and-metal-signs/acrylic-signs',
    'graficos-para-vehiculos': '/signage/vinyl-decals-and-window-graphics/vehicle-wrap-vinyl',
    'graficos-perforados-para-ventanas': '/signage/vinyl-decals-and-window-graphics/perforated-window-vinyl',
    'graficos-para-ventanas': '/signage/vinyl-decals-and-window-graphics',
    'letreros-tipo-a': '/signage/sidewalk-a-frame-signs',
    'manteles-personalizados': '/signage/table-covers-and-throws',
    'letras-canal': '/signage/dimensional-letters/standard-channel-letters',
    volantes: '/signage/flyers-brochures-and-booklets/flyers',
    folletos: '/signage/flyers-brochures-and-booklets/brochures',
    postales: '/signage/postcards-and-direct-mail/postcards',
    posters: '/signage/canvas-and-poster-prints/poster-print',
    'letreros-inmobiliarios': '/signage/real-estate-signs',
    'tarjetas-de-presentacion': '/signage/business-cards',
    'carpas-para-eventos': '/signage/event-tents',
    'letras-dimensionales': '/signage/dimensional-letters',
}

const EN_TO_ES = Object.fromEntries(
    Object.entries(ES_TO_EN).map(([es, en]) => [en, `/es/letreros/${es}`])
)

/** English path for a Spanish product slug, or null when there is no 1:1 twin. */
export function enPathForEsProduct(esSlug) {
    return ES_TO_EN[esSlug] || null
}

/** Spanish path for an English catalog path, or null when there is no 1:1 twin. */
export function esPathForEnCatalog(enPath) {
    return EN_TO_ES[enPath] || null
}

/**
 * Build the `alternates` block for a page that may or may not have a twin.
 * Always emits x-default alongside the pair — the site had none anywhere, so
 * Google had to guess which version to show a searcher with no language match.
 * x-default points at English, the default the site actually serves.
 */
export function languageAlternates({ enPath, esPath }) {
    if (!enPath || !esPath) return undefined
    return {
        'en-US': enPath,
        'es-US': esPath,
        'x-default': enPath,
    }
}
