// app/signage/[category]/page.js
import { notFound } from 'next/navigation'
import SignageCategoryClient from '@/components/signage/SignageCategoryClient'
import { signageCategories } from '@/lib/signage-data'

export function generateStaticParams() {
    return signageCategories.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }) {
    const { category: categorySlug } = await params
    const category = signageCategories.find((c) => c.slug === categorySlug)

    if (!category) {
        return {
            title: 'Signage | Pixel & Panel',
        }
    }

    return {
        title: category.seo.title,
        description: category.seo.description,
        openGraph: {
            title: category.seo.title,
            description: category.seo.description,
            url: `https://pixelnpanel.com/signage/${category.slug}`,
        },
    }
}

export default async function CategoryPage({ params }) {
    const { category: categorySlug } = await params
    const category = signageCategories.find((c) => c.slug === categorySlug)

    if (!category) notFound()

    return (
        <SignageCategoryClient
            category={category}
            allCategories={signageCategories}
        />
    )
}