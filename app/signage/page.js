import { Suspense } from 'react'
import SignageHubClient from '@/components/signage/SignageHubClient'
import { signageCategories } from '@/lib/signage-data'

export const metadata = {
    title: 'Custom Signage & Print Beaumont TX',
    description:
        'Custom banners, yard signs, vehicle graphics, window graphics, storefront signs, rigid signs, event displays, and print marketing materials for businesses in Beaumont, Nederland, and Port Arthur, TX.',
    alternates: {
        canonical: '/signage',
        languages: {
            'en-US': '/signage',
            'es-US': '/es/letreros',
        },
    },
    openGraph: {
        title: 'Custom Signage & Print | Pixel & Panel — Beaumont TX',
        description:
            'Browse Pixel & Panel signage products by category and request a custom quote for your business.',
        url: '/signage',
        siteName: 'Pixel & Panel',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Custom Signage & Print | Pixel & Panel — Beaumont TX',
        description:
            'Browse Pixel & Panel signage products by category and request a custom quote for your business.',
    },
}

function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    )
}

const CATEGORY_ORDER = [
    'banners',
    'yard-real-estate-signs',
    'vehicle-graphics',
    'vinyl-decals-window-graphics',
    'business-storefront-signs',
    'rigid-signs',
    'a-frame-event-displays',
    'print-marketing-materials',
]

function getOrderedCategories() {
    const orderMap = new Map(CATEGORY_ORDER.map((slug, index) => [slug, index]))

    return signageCategories.map((category, index) => ({ category, index })).sort((a, b) => {
        const aOrder = orderMap.has(a.category.slug) ? orderMap.get(a.category.slug) : 999
        const bOrder = orderMap.has(b.category.slug) ? orderMap.get(b.category.slug) : 999

        return aOrder - bOrder || a.index - b.index
    }).map(({ category }) => category)
}

export default function SignagePage() {
    const ordered = getOrderedCategories()

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pixelnpanel.com' },
            { '@type': 'ListItem', position: 2, name: 'Signage & Print', item: 'https://pixelnpanel.com/signage' },
        ],
    }

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Signage & Print Categories',
        description: 'Custom signage and print products for businesses in Beaumont, Nederland, and Port Arthur, TX.',
        url: 'https://pixelnpanel.com/signage',
        numberOfItems: ordered.length,
        itemListElement: ordered.map((cat, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: cat.name,
            description: cat.description,
            url: `https://pixelnpanel.com/signage/${cat.slug}`,
        })),
    }

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={itemListSchema} />
            <Suspense fallback={null}>
                <SignageHubClient categories={ordered} />
            </Suspense>
        </>
    )
}
