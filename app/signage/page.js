import { Suspense } from 'react'
import SignageHubClient from '@/components/signage/SignageHubClient'
import { signageCategories } from '@/lib/signage-data'

export const metadata = {
    title: 'Custom Signage & Print Beaumont TX',
    description:
        'Custom banners, yard signs, vehicle graphics, window graphics, storefront signs, rigid signs, event displays, and print marketing materials for businesses in Beaumont, Nederland, and Port Arthur, TX.',
    alternates: {
        canonical: '/signage',
    },
    openGraph: {
        title: 'Custom Signage & Print | Pixel & Panel — Beaumont TX',
        description:
            'Browse Pixel & Panel signage products by category and request a custom quote for your business.',
        url: '/signage',
    },
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

    return [...signageCategories].sort((a, b) => {
        const aOrder = orderMap.has(a.slug) ? orderMap.get(a.slug) : 999
        const bOrder = orderMap.has(b.slug) ? orderMap.get(b.slug) : 999

        return aOrder - bOrder
    })
}

export default function SignagePage() {
    return (
        <Suspense fallback={null}>
            <SignageHubClient categories={getOrderedCategories()} />
        </Suspense>
    )
}
