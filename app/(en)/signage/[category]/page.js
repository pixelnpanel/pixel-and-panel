import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SignageCategoryClient from '@/components/signage/SignageCategoryClient'
import { getCategories, getCategory } from '@/lib/signage/data'
import { getCategoryGuide } from '@/lib/signage/category-guides'
import { houstonCatalogNotes } from '@/content/houston'
import { titleWithinLimit, withDefaultSocialImage } from '@/lib/seo'
import { esPathForEnCatalog, languageAlternates } from '@/lib/signage/es-en-pairs'
import { reviews } from '@/lib/reviews'
import { resolveReviewImage } from '@/lib/review-images'

export const revalidate = 900

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
    //
    // Built from cat.h1 rather than cat.name so a category that had to rename
    // itself away from a same-named product (see categoryMetaFor) stays clear
    // of that product in the title too, not just in the heading.
    const isBannerCatalog = cat.slug === 'banners'
    const title = isBannerCatalog ? 'Custom Vinyl, Mesh & Fabric Banners' : `${cat.h1} in Beaumont TX`
    const description = isBannerCatalog
        ? 'Compare custom vinyl, mesh, fabric, and blockout banners for storefronts, fences, and events. See sizes, finishing options, and pricing.'
        : cat.seoDescription
    const ogImage = cat.image || cat.products.find((p) => p.image)?.image || null

    return withDefaultSocialImage({
        title: titleWithinLimit(title),
        description,
        alternates: {
            canonical: `/signage/${cat.slug}`,
            // Reciprocity is mandatory: an hreflang pair only counts when both
            // sides declare it, and the Spanish twins were declaring this one
            // alone. Undefined for categories with no Spanish counterpart.
            languages: languageAlternates({
                enPath: `/signage/${cat.slug}`,
                esPath: esPathForEnCatalog(`/signage/${cat.slug}`),
            }),
        },
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

    const regionNotes = [
        cat.slug === 'banners' && {
            text: 'Ordering for a Beaumont business or event?',
            href: '/service-area/beaumont-tx/vinyl-banners',
            label: 'See Beaumont banner pricing and turnaround',
        },
        houstonCatalogNotes[cat.slug],
    ].filter(Boolean)
    const windowReview = cat.slug === 'vinyl-decals-and-window-graphics'
        ? reviews.find((review) => review.slug === 'jafeth-velasquez')
        : null
    const windowPhoto = resolveReviewImage(windowReview?.slug)

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

    // The category page only needs slug/name/count for its related links.
    // Avoid serializing every product in every category into the client/RSC
    // payload when the page itself is already fully server-rendered.
    const relatedCategories = categories.map(({ slug, name, productCount }) => ({
        slug,
        name,
        productCount,
    }))

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={itemListSchema} />
            <JsonLd data={faqSchema} />
            <SignageCategoryClient
                category={cat}
                allCategories={relatedCategories}
                regionNotes={regionNotes}
            >
                {windowPhoto && (
                    <section className="bg-white px-6 py-12 md:py-16" aria-labelledby="window-project-heading">
                        <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#FAF8F4]">
                                <Image
                                    src={windowPhoto}
                                    alt="JC Repair Pro storefront window with a logo, service icons, and store hours"
                                    fill
                                    sizes="(max-width: 767px) 100vw, 496px"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 id="window-project-heading">Storefront Window Graphics for JC Repair Pro</h2>
                                <p className="mt-4 leading-7 text-slate-600">
                                    The front window carries the shop’s logo, repair services, and opening hours so customers can see what the shop does before they walk in.
                                </p>
                                <figure className="my-5 border-l-2 border-[#F59E0B] pl-4">
                                    <blockquote className="text-slate-700">&ldquo;{windowReview.quote}&rdquo;</blockquote>
                                    <figcaption className="mt-2 text-sm text-slate-600">{windowReview.name} · Google review</figcaption>
                                </figure>
                                <Link href={`/quote-request?category=${encodeURIComponent(cat.name)}`} className="btn-amber">
                                    Request a Window Graphics Quote
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </SignageCategoryClient>
        </>
    )
}
