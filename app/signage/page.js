// app/signage/page.js
import SignageHubClient from '@/components/signage/SignageHubClient'
import { signageCategories } from '@/lib/signage-data'

export const metadata = {
    title: 'Custom Signage & Print Beaumont TX | Pixel & Panel',
    description:
        'Custom signs, banners, vehicle wraps, window graphics, trade show displays, and print materials for businesses in Beaumont, Port Arthur, and Orange TX. Get a free quote from Pixel & Panel.',
    openGraph: {
        title: 'Custom Signage & Print | Pixel & Panel — Beaumont TX',
        description:
            'Storefront signs to vehicle wraps — full-service signage and print for Texas businesses. Every sign includes QR tracking.',
        url: 'https://pixelnpanel.com/signage',
    },
}

export default function SignagePage() {
    return <SignageHubClient categories={signageCategories} />
}