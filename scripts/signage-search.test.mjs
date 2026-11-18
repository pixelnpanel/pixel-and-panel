import assert from 'node:assert/strict'
import test from 'node:test'
import { indexSignageProducts, searchSignageProducts } from '../lib/signage/search.js'

const index = indexSignageProducts([
    { slug: 'standard-retractable', name: 'Standard Retractable', categorySlug: 'banner-stands' },
    { slug: 'retractable-banner-stand-hardware', name: 'Retractable Banner Stand Hardware', categorySlug: 'hardware' },
    { slug: 'event-tent', name: 'Event Tent', categorySlug: 'event-tents' },
    { slug: 'large-event-tent', name: 'Large Event Tent', categorySlug: 'event-tents' },
    { slug: '20ft-seg-fabric-display', name: '20ft SEG Fabric Display', categorySlug: 'seg-displays' },
    { slug: 'coroplast-yard-signs', name: 'Coroplast Yard Signs', categorySlug: 'rigid-and-metal-signs' },
])

const results = (query) => searchSignageProducts(index, query)
const firstSlug = (query) => results(query).products[0]?.slug

test('normalizes catalog dimensions without inventing a nearby size', () => {
    assert.equal(firstSlug('20′ SEG'), '20ft-seg-fabric-display')
    assert.equal(firstSlug('20 ft SEG'), '20ft-seg-fabric-display')
    assert.equal(firstSlug('10 × 10 tent'), 'event-tent')
    assert.equal(firstSlug('10x15 tent'), 'large-event-tent')
    assert.deepEqual(results('11 x 10 tent').products, [])
})

test('ranks complete products first and keeps hardware findable', () => {
    assert.equal(firstSlug('retractable banner'), 'standard-retractable')
    assert.equal(firstSlug('roll-up banner'), 'standard-retractable')
    assert.equal(firstSlug('replacement banner base'), 'retractable-banner-stand-hardware')
})

test('distinguishes a close spelling match from exact matches and empty results', () => {
    assert.equal(results('yard signs').closeMatches, false)
    assert.equal(results('yard sings').closeMatches, true)
    assert.equal(firstSlug('yard sings'), 'coroplast-yard-signs')
    assert.deepEqual(results('zzzxxx qqqyyy'), { products: [], closeMatches: false })
})
