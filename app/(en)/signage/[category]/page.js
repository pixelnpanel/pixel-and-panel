import { notFound } from 'next/navigation'
import SignageCategoryClient from '@/components/signage/SignageCategoryClient'
import { getCategories, getCategory } from '@/lib/signage/data'
import { withDefaultSocialImage } from '@/lib/seo'

export const revalidate = 60

const SITE = 'https://www.pixelnpanel.com'

export async function generateStaticParams() {
    const categories = await getCategories()
    return categories.map((category) => ({ category: category.slug }))
}

function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    )
}

export async function generateMetadata({ params }) {
    const { category } = await params
    const cat = await getCategory(category)

    if (!cat) return { title: 'Signage & Print | Pixel & Panel' }

    const title = `${cat.name} — Custom Signs in Beaumont, Port Arthur & Orange TX | Pixel & Panel`
    const description = cat.seoDescription

    return withDefaultSocialImage({
        title,
        description,
        alternates: { canonical: `/signage/${cat.slug}` },
        openGraph: {
            title,
            description,
            url: `${SITE}/signage/${cat.slug}`,
            siteName: 'Pixel & Panel',
            locale: 'en_US',
            type: 'website',
        },
    })
}

export default async function SignageCategoryRoute({ params }) {
    const { category } = await params
    const categories = await getCategories()
    const cat = categories.find((c) => c.slug === category)
    if (!cat) notFound()

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Signage & Print', item: `${SITE}/signage` },
            { '@type': 'ListItem', position: 3, name: cat.name, item: `${SITE}/signage/${cat.slug}` },
        ],
    }

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${cat.name} Products`,
        url: `${SITE}/signage/${cat.slug}`,
        numberOfItems: cat.products.length,
        itemListElement: cat.products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: `${SITE}/signage/${cat.slug}/${p.slug}`,
        })),
    }

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={itemListSchema} />
            <SignageCategoryClient category={cat} allCategories={categories} />
        </>
    )
}
