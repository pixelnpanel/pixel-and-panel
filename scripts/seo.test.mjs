import test from 'node:test'
import assert from 'node:assert/strict'
import { createCatalogProductSchema } from '../lib/signage/product-schema.js'
import { withDefaultSocialImage, SITE_URL } from '../lib/seo.js'

const category = { slug: 'banners', name: 'Banners' }
const product = {
    name: 'Vinyl Banner', slug: 'vinyl-banner', isLive: true,
    image: '/images/banner.webp', description: 'A custom printed banner.',
    sizes: [
        { label: '4 x 6 ft', single: 120, double: 160 },
        { label: '2 x 3 ft', single: 49, double: 75 },
    ],
}

test('product markup describes the cheapest real option from one seller', () => {
    const schema = createCatalogProductSchema(product, category)
    assert.equal(schema['@type'], 'Product')
    assert.equal(schema.offers['@type'], 'Offer')
    assert.equal(schema.offers.price, '49.00')
    assert.match(schema.offers.name, /2 x 3 ft.*Single-Sided/)
    assert.equal(schema.offers.seller['@id'], `${SITE_URL}/#localbusiness`)
    assert.equal(schema.image, `${SITE_URL}/images/banner.webp`)
    assert.equal(schema.offers.availability, undefined)
})

test('quote-only and invalid prices never advertise a free product', () => {
    for (const input of [
        { ...product, isLive: false },
        { ...product, sizes: [] },
        { ...product, sizes: [{ label: 'Custom', single: 0, double: -20 }] },
    ]) {
        const schema = createCatalogProductSchema(input, category)
        assert.equal(schema['@type'], 'Service')
        assert.equal(schema.offers, undefined)
        assert.equal(schema.potentialAction['@type'], 'QuoteAction')
        assert.equal(new URL(schema.potentialAction.target).searchParams.get('product'), product.name)
    }
})

test('flag options retain their actual kit labels', () => {
    const schema = createCatalogProductSchema({
        ...product, slug: 'econo-feather-flag', sizes: [{ label: 'Standard', single: null, double: 99 }],
    }, { slug: 'flags', name: 'Flags' })
    assert.match(schema.offers.name, /Flag\+Pole$/)
})

test('Twitter uses the same product image as Open Graph unless overridden', () => {
    const images = [{ url: `${SITE_URL}/images/banner.webp` }]
    const metadata = withDefaultSocialImage({ title: 'Banner', description: 'Custom banner', openGraph: { images } })
    assert.deepEqual(metadata.twitter.images, images)
    assert.equal(metadata.twitter.title, 'Banner')
    assert.equal(metadata.twitter.description, 'Custom banner')
    const custom = withDefaultSocialImage({ openGraph: { images }, twitter: { images: ['/custom.jpg'] } })
    assert.deepEqual(custom.twitter.images, ['/custom.jpg'])
})


// Product choices must survive the calculator-to-quote handoff in both languages.
import { validQuantity, quoteSelectionLines } from '../lib/quote-selection.js'
test('quote selection retains custom dimensions, kit options and requested quantity', () => {
    assert.deepEqual(quoteSelectionLines({ size: 'Custom — 48 × 96 in', side: 'Flag+Pole', quantity: '10' }), ['Size: Custom — 48 × 96 in', 'Option: Flag+Pole', 'Quantity: 10'])
    assert.deepEqual(quoteSelectionLines({ size: '4 × 8 ft', side: 'Doble cara', quantity: '5', language: 'Spanish' }), ['Tamaño: 4 × 8 ft', 'Opción: Doble cara', 'Cantidad: 5'])
})
test('invalid or missing quantities never become a requested order quantity', () => {
    for (const value of ['', '0', '-1', '1.5', 'Infinity', '100001', 'hello']) assert.equal(validQuantity(value), '')
    assert.deepEqual(quoteSelectionLines({ quantity: '0' }), [])
})
