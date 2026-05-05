import { Suspense } from 'react'
import SignageHubClient from '@/components/signage/SignageHubClient'
import { signageCategories } from '@/lib/signage-data'

export const metadata = {
    title: 'Custom Signage & Print Beaumont TX | Pixel & Panel',
    description:
        'Custom signs, banners, vehicle wraps, window graphics, trade show displays, safety signs, and print materials for businesses in Beaumont, Port Arthur, and Orange TX. Get a free quote from Pixel & Panel.',
    openGraph: {
        title: 'Custom Signage & Print | Pixel & Panel — Beaumont TX',
        description:
            'Storefront signs to vehicle wraps — full-service signage and print for Texas businesses.',
        url: 'https://pixelnpanel.com/signage',
    },
}

const CATEGORY_ORDER = [
    'banners',
    'yard-real-estate-signs',
    'exterior-signs',
    'vehicle-graphics',
    'safety-industrial-signs',
    'vinyl-decals-graphics',
    'window-wall-graphics',
    'a-frames-sidewalk-signs',
    'rigid-signs',
    'flags-outdoor-displays',
    'posters-large-format',
    'trade-show-event-displays',
    'tents-table-covers',
    'print-marketing-materials',
    'apparel-transfers',
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