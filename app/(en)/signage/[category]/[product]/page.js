import { notFound } from 'next/navigation'
import SignageProductDetail from '@/components/signage/SignageProductDetail'
import { getCategories, getProduct } from '@/lib/signage/data'
import { withDefaultSocialImage } from '@/lib/seo'

export const revalidate = 60

const SITE = 'https://www.pixelnpanel.com'

export async function generateStaticParams() {
    const categories = await getCategories()
    return categories.flatMap((category) =>
        category.products.map((product) => ({
            category: category.slug,
            product: product.slug,
        }))
    )
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
    const { category, product } = await params
    const found = await getProduct(category, product)

    if (!found) return { title: 'Signage & Print | Pixel & Panel' }

    const { product: p, category: c } = found
    const title = `${p.name} — Custom Signs in Beaumont, Port Arthur & Orange TX | Pixel & Panel`
    const description = p.notes
        ? `${p.name} — ${p.notes}`.slice(0, 155)
        : `Order a custom ${p.name.toLowerCase()} in ${c.name.toLowerCase()} for Beaumont, Port Arthur & Orange TX. Preset sizes with instant pricing or a fast, free quote.`
    const url = `${SITE}/signage/${c.slug}/${p.slug}`

    return withDefaultSocialImage({
        title,
        description,
        alternates: { canonical: `/signage/${c.slug}/${p.slug}` },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Pixel & Panel',
            locale: 'en_US',
            type: 'website',
            ...(p.image ? { images: [{ url: `${SITE}${p.image}` }] } : {}),
        },
    })
}

export default async function SignageProductRoute({ params }) {
    const { category, product } = await params
    const found = await getProduct(category, product)
    if (!found) notFound()

    const { product: p, category: c } = found
    const url = `${SITE}/signage/${c.slug}/${p.slug}`

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Signage & Print', item: `${SITE}/signage` },
            { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE}/signage/${c.slug}` },
            { '@type': 'ListItem', position: 4, name: p.name, item: url },
        ],
    }

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        ...(p.image ? { image: `${SITE}${p.image}` } : {}),
        description: p.notes || p.description,
        category: c.name,
        brand: { '@type': 'Brand', name: 'Pixel & Panel' },
        ...(p.isLive && p.lowestPrice != null
            ? {
                offers: {
                    '@type': 'Offer',
                    price: p.lowestPrice.toFixed(2),
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    url,
                },
            }
            : {}),
    }

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={productSchema} />
            <SignageProductDetail product={p} category={c} />
        </>
    )
}
