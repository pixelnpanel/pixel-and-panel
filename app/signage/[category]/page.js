import { notFound } from "next/navigation";
import SignageProductPage from "@/components/signage/SignageProductPage";
import { getSignageProduct, signageProducts } from "@/lib/signage-products";

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

    return {
        title: product.title,
        description: product.description,
        alternates: {
            canonical: `/signage/${product.slug}`,
        },
        openGraph: {
            title: `${product.title} | Pixel & Panel`,
            description: product.description,
            url: `/signage/${product.slug}`,
        },
    };
}

export default async function SignageProductRoute({ params }) {
    const { category } = await params;
    const product = getSignageProduct(category);

    if (!product) notFound();

    return <SignageProductPage product={product} />;
}
