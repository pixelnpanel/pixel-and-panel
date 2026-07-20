import { notFound } from 'next/navigation'
import SignageProductDetail from '@/components/signage/SignageProductDetail'
import ViewContentTracker from '@/components/analytics/ViewContentTracker'
import { getCategories, getProduct } from '@/lib/signage/data'
import { withDefaultSocialImage } from '@/lib/seo'

export const revalidate = 21600

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
    const content = p.content || null
    // The (en) layout applies a `%s | Pixel & Panel` title template, so the brand
    // suffix is added automatically — don't repeat it here.
    const title = content?.seoTitle
        ? content.seoTitle
        : `Custom ${p.name} in Beaumont TX`
    const description = content?.metaDescription
        ? content.metaDescription.slice(0, 160)
        : p.notes
            ? `${p.name} — ${p.notes}`.slice(0, 155)
            : `Order a custom ${p.name.toLowerCase()} in ${c.name.toLowerCase()} for Beaumont, Port Arthur & Nederland TX. Preset sizes with instant pricing or a fast, free quote.`
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
    const content = p.content || null
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
        description: content?.intro || p.notes || p.description,
        category: c.name,
        brand: { '@type': 'Brand', name: 'Pixel & Panel' },
        ...(p.isLive && p.lowestPrice != null
            ? {
                offers: (() => {
                    const prices = (p.sizes || [])
                        .flatMap((s) => [s.single, s.double])
                        .filter((v) => v != null)
                    const highest = prices.length ? Math.max(...prices) : p.lowestPrice
                    return {
                        '@type': 'AggregateOffer',
                        lowPrice: p.lowestPrice.toFixed(2),
                        highPrice: highest.toFixed(2),
                        priceCurrency: 'USD',
                        offerCount: Math.max(prices.length, 1),
                        availability: 'https://schema.org/InStock',
                        url,
                    }
                })(),
            }
            : {}),
    }

    // FAQPage — only when the content row supplies non-empty Q/A pairs.
    const faqSchema = content?.faqs?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
        }
        : null

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={productSchema} />
            {faqSchema && <JsonLd data={faqSchema} />}
            <ViewContentTracker
                contentName={p.name}
                contentCategory={c.name}
                contentId={p.slug}
                value={typeof p.lowestPrice === 'number' ? p.lowestPrice : undefined}
            />
            <SignageProductDetail product={p} category={c} />
        </>
    )
}
