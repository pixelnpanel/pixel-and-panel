import SignageHubOverview from '@/components/signage/SignageHubOverview'
import { getCategories } from '@/lib/signage/data'
import { withDefaultSocialImage } from '@/lib/seo'
import { reviewsExcludingChannel } from '@/lib/reviews'
import { attachReviewImages } from '@/lib/review-images'

export const revalidate = 900

const SITE = 'https://www.pixelnpanel.com'
const DESCRIPTION = 'Shop custom signs, banners, and print for Beaumont, Houston, and businesses nationwide. Compare sizes and materials, request a quote, and get your order shipped.'

export const metadata = withDefaultSocialImage({
    metadataBase: new URL(SITE),
    title: 'Custom Signs & Print in Beaumont TX',
    description: DESCRIPTION,
    alternates: {
        canonical: '/signage',
        languages: {
            'en-US': '/signage',
            "x-default": '/signage',
            'es-US': '/es/letreros',
        },
    },
    openGraph: {
        title: 'Custom Signs & Print in Beaumont TX | Pixel & Panel',
        description: DESCRIPTION,
        url: '/signage',
        siteName: 'Pixel & Panel',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Custom Signs & Print in Beaumont TX | Pixel & Panel',
        description: DESCRIPTION,
    },
})

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
    // Show only reviews about sign and print work.
    // Images resolved here (server) so the client hub never touches the filesystem.
    const signageReviews = attachReviewImages(reviewsExcludingChannel('digital', 'general'))

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
        description: DESCRIPTION,
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
            <SignageHubOverview
                categories={categories.map(({ slug, name, image, tagline, productCount, products }) => ({
                    slug, name, image, tagline, productCount,
                    // Browsing needs card/search data, not every size, FAQ and
                    // specification from the product detail pages.
                    products: products.map(({ slug, name, categorySlug, categoryName, image, alt, description, cardSummary, isLive, lowestPrice }) => ({
                        slug, name, categorySlug, categoryName, image, alt, description, cardSummary, isLive, lowestPrice,
                    })),
                }))}
                reviews={signageReviews}
            />
        </>
    )
}
