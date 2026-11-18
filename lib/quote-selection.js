// Requested quantities are inquiry details, not confirmed order prices.
export function validQuantity(value) {
    const quantity = Number(value)
    return Number.isInteger(quantity) && quantity > 0 && quantity <= 100000 ? String(quantity) : ''
}

export function validReplyPhone(value) {
    if (typeof value !== 'string' || !/^\+?[\d ().-]+$/.test(value.trim())) return false
    const length = value.replace(/\D/g, '').length
    return length >= 7 && length <= 15
}

export function quoteSelectionLines({ size = '', side = '', material = '', quantity = '', language = 'English' }) {
    const spanish = language === 'Spanish'
    return [
        size && `${spanish ? 'Tamaño' : 'Size'}: ${size}`,
        side && `${spanish ? 'Opción' : 'Option'}: ${side}`,
        material && `Material: ${material}`,
        validQuantity(quantity) && `${spanish ? 'Cantidad' : 'Quantity'}: ${validQuantity(quantity)}`,
    ].filter(Boolean)
}

export function signageQuoteHref(category = 'Signage & Print') {
    return `/quote-request?${new URLSearchParams({ request: 'signage', category })}`
}

// Only inquiry options cross locales. Never copy contact details or arbitrary
// tracking/query parameters into language links.
export function quoteLanguageHref(href, searchParams) {
    if (!['/quote-request', '/es/solicitar-cotizacion'].includes(href)) return href
    const params = new URLSearchParams()
    if (searchParams.get('request') === 'signage') params.set('request', 'signage')
    for (const key of ['product', 'package', 'category', 'size', 'side', 'material', 'quantity']) {
        const value = searchParams.get(key)
        if (value) params.set(key, key === 'quantity' ? validQuantity(value) : value.slice(0, 200))
    }
    if (!params.get('quantity')) params.delete('quantity')
    if (params.has('product')) params.delete('package')
    const query = params.toString()
    return query ? `${href}?${query}` : href
}
