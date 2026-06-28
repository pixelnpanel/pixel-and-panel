import { Suspense } from 'react'
import SignageHubClient from '@/components/signage/SignageHubClient'
import { getCategories } from '@/lib/signage/data'
import { withDefaultSocialImage } from '@/lib/seo'

export const revalidate = 60

const SITE = 'https://www.pixelnpanel.com'

export const metadata = withDefaultSocialImage({
    metadataBase: new URL(SITE),
    title: 'Custom Signs & Print in Beaumont TX',
    description:
        'Custom banners, banner stands, and signage for businesses in Beaumont, Port Arthur & Orange, TX. Preset sizes with instant pricing or a fast, free quote.',
    alternates: {
        canonical: '/signage',
        languages: {
            'en-US': '/signage',
            'es-US': '/es/letreros',
        },
    },
    openGraph: {
        title: 'Custom Signs & Print in Beaumont TX | Pixel & Panel',
        description:
            'Custom banners, banner stands, and signage for businesses in Beaumont, Port Arthur & Orange, TX.',
        url: '/signage',
        siteName: 'Pixel & Panel',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Custom Signs & Print in Beaumont TX | Pixel & Panel',
        description:
            'Custom banners, banner stands, and signage for businesses in Beaumont, Port Arthur & Orange, TX.',
    },
})

// EN catalog uses nested /signage/<category>/<product> product paths and reads
// product slugs straight from the sheet (no legacy slug remap).
const HUB_COPY = { nestedProductPaths: true, productSlugMap: {} }

function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    )
}

export default async function SignagePage() {
    const categories = await getCategories()

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Signage & Print', item: `${SITE}/signage` },
        ],
    }

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Signage & Print Categories',
        description: 'Custom signage and print products for businesses in Beaumont, Port Arthur & Orange, TX.',
        url: `${SITE}/signage`,
        numberOfItems: categories.length,
        itemListElement: categories.map((cat, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: cat.name,
            description: cat.description,
            url: `${SITE}/signage/${cat.slug}`,
        })),
    }

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={itemListSchema} />
            <Suspense fallback={null}>
                <SignageHubClient categories={categories} copy={HUB_COPY} />
            </Suspense>
        </>
    )
}
