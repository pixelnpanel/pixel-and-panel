import QuoteRequestClient from "./QuoteRequestClient";

export const metadata = {
  title: "Request a Quote",
  description:
    "Request a free quote from Pixel & Panel for signage, print, websites, local SEO, QR campaigns, and branding services.",
  alternates: {
    canonical: "/quote-request",
    languages: {
      "en-US": "/quote-request",
      "es-US": "/es/solicitar-cotizacion",
    },
  },
  openGraph: {
    title: "Request a Quote | Pixel & Panel",
    description:
      "Tell Pixel & Panel what you need and get a free quote for signage, print, websites, local SEO, and QR-powered marketing.",
    url: "/quote-request",
  },
};

export default async function QuoteRequestPage({ searchParams }) {
  const params = await searchParams;
  const selectedProduct = params?.product || "";
  const selectedCategory = params?.category || "";

  return (
    <QuoteRequestClient
      selectedProduct={selectedProduct}
      selectedCategory={selectedCategory}
    />
  );
}
