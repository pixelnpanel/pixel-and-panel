import { notFound } from "next/navigation";
import SignageProductPage from "@/components/signage/SignageProductPage";
import { getSignageProduct, signageProducts } from "@/lib/signage-products";
import { signageSeoOverrides } from "@/lib/seo-copy-overrides";
import { signageSlugMap } from "@/lib/signage-products-es";

export function generateStaticParams() {
    return signageProducts.map((product) => ({
        category: product.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { category } = await params;
    const product = getSignageProduct(category);

    if (!product) {
        return {
            title: "Signage & Print",
        };
    }

    const seo = signageSeoOverrides[product.slug] || {};
    const title = seo.title || product.title;
    const description = seo.description || product.description;

    return {
        title,
        description,
        alternates: {
            canonical: `/signage/${product.slug}`,
            languages: {
                "en-US": `/signage/${product.slug}`,
                "es-US": `/es/letreros/${signageSlugMap[product.slug] || ""}`,
            },
        },
        openGraph: {
            title: `${title} | Pixel & Panel`,
            description,
            url: `https://pixelnpanel.com/signage/${product.slug}`,
            siteName: "Pixel & Panel",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Pixel & Panel`,
            description,
        },
    };
}

export default async function SignageProductRoute({ params }) {
    const { category } = await params;
    const product = getSignageProduct(category);

    if (!product) notFound();

    return <SignageProductPage product={product} />;
}
