import { absoluteUrl, BUSINESS_SCHEMA_REF } from '../seo.js'

// A size/side choice is a variant from one seller, not an AggregateOffer
// across merchants. Describe the real starting option shown on the page.
export function createCatalogProductSchema(product, category) {
    const url = absoluteUrl(`/signage/${category.slug}/${product.slug}`)
    const pricedOptions = (product.sizes || []).flatMap((size) =>
        ['single', 'double'].flatMap((side) => {
            const price = size[side]
            if (!Number.isFinite(price) || price <= 0) return []
            const option = category.slug === 'flags' && product.slug === 'econo-feather-flag'
                ? (side === 'single' ? 'Flag Only' : 'Flag+Pole')
                : (side === 'single' ? 'Single-Sided' : 'Double-Sided')
            return [{ price, name: `${product.name} — ${size.label} — ${option}` }]
        })
    ).sort((a, b) => a.price - b.price)
    const startingOffer = product.isLive ? pricedOptions[0] : null
    const common = {
        '@context': 'https://schema.org',
        '@id': `${url}#${startingOffer ? 'product' : 'service'}`,
        name: product.name,
        description: product.content?.intro || product.notes || product.description,
        url,
        mainEntityOfPage: url,
        category: category.name,
        ...(product.image ? { image: absoluteUrl(product.image) } : {}),
    }

    if (!startingOffer) {
        return {
            ...common,
            '@type': 'Service',
            serviceType: `Custom ${product.name}`,
            provider: BUSINESS_SCHEMA_REF,
            potentialAction: {
                '@type': 'QuoteAction',
                name: 'Request a quote',
                target: absoluteUrl(`/quote-request?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category.name)}`),
            },
        }
    }

    return {
        ...common,
        '@type': 'Product',
        brand: { '@type': 'Brand', name: 'Pixel & Panel' },
        offers: {
            '@type': 'Offer',
            name: startingOffer.name,
            price: startingOffer.price.toFixed(2),
            priceCurrency: 'USD',
            url,
            seller: { '@id': BUSINESS_SCHEMA_REF['@id'] },
        },
    }
}
