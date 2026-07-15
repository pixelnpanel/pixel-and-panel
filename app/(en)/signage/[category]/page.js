import { notFound } from 'next/navigation'
import SignageCategoryClient from '@/components/signage/SignageCategoryClient'
import { getCategories, getCategory } from '@/lib/signage/data'
import { getCategoryGuide } from '@/lib/signage/category-guides'
import { houstonCatalogNotes } from '@/content/houston'
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

    // The (en) layout applies a `%s | Pixel & Panel` title template — don't
    // repeat the brand here, and keep the title inside Google's ~60-char limit.
    const title = `Custom ${cat.name} in Beaumont TX`
    const description = cat.seoDescription
    const ogImage = cat.image || cat.products.find((p) => p.image)?.image || null

    return withDefaultSocialImage({
        title,
        description,
        alternates: { canonical: `/signage/${cat.slug}` },
        openGraph: {
            title: `${title} | Pixel & Panel`,
            description,
            url: `${SITE}/signage/${cat.slug}`,
            siteName: 'Pixel & Panel',
            locale: 'en_US',
            type: 'website',
            ...(ogImage ? { images: [{ url: `${SITE}${ogImage}` }] } : {}),
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

    // FAQPage schema mirrors the visible buying-guide FAQ rendered in the client.
    const guide = getCategoryGuide(cat.slug, cat.name)
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map(([question, answer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
    }

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={itemListSchema} />
            <JsonLd data={faqSchema} />
            <SignageCategoryClient
                category={cat}
                allCategories={categories}
                regionNote={houstonCatalogNotes[cat.slug] || null}
            />
        </>
    )
}
