import { Suspense } from "react";
import SignageHubClient from "@/components/signage/SignageHubClient";
import { signageCategoriesEs, signageHubSlugMapEs } from "@/lib/signage-products-es";

const spanishCopy = {
  eyebrow: "Letreros e Impresión",
  h1Start: "Letreros e impresión para hacer tu negocio",
  h1Highlight: "más visible",
  mobileH1Start: "Letreros que",
  mobileH1Highlight: "se ven.",
  mobileHeroCopy:
    "Explora letreros, banners, gráficos para vehículos, tarjetas y productos impresos por categoría.",
  heroCopy:
    "Explora productos de letreros e impresión para escaparates, vehículos, eventos, promociones y negocios locales.",
  quoteCta: "Solicitar cotización",
  viewProducts: "Ver productos",
  intro:
    "Elige una categoría y encuentra productos para que clientes vean tu negocio, entiendan el mensaje y tomen el siguiente paso.",
  categoriesHeading: "Categorías",
  productsLabel: "productos",
  allProducts: "Todos los productos",
  allHeading: "Todos los productos de letreros e impresión",
  selectedCategory: "Categoría seleccionada",
  productsAvailable: "productos disponibles",
  mobileCategoryHeading: "Elige una categoría",
  mobileCategoryHelp: "Desliza hacia los lados y baja para ver productos.",
  findProduct: "Buscar producto",
  searchPlaceholder: "Buscar letreros, banners, vinilos, tarjetas...",
  searchAria: "Buscar productos de letreros",
  searchResultsFor: "Resultados para",
  matchingProduct: "producto encontrado",
  matchingProducts: "productos encontrados",
  clearSearch: "Limpiar búsqueda",
  learnMore: "Ver detalles",
  requestQuote: "Solicitar cotización",
  bestFor: "Ideal para:",
  noResultsTitle: "No encontramos productos.",
  noResultsCopy: "Prueba buscar banner, lona, vehículo, ventana, menú, tarjeta, coroplast, metal o QR.",
  requestHelp: "Pedir ayuda",
  helpTitle: "¿Necesitas ayuda para elegir?",
  helpCopy:
    "Cuéntanos tamaño, cantidad, logo, fecha y dónde se usará. Te ayudamos a elegir un producto práctico.",
  helpQuote: "Solicitar cotización",
  helpVisibility: "Revisar visibilidad primero",
  bottomTitle: "¿Listo para hacer tu negocio más visible?",
  bottomCopy:
    "Envíanos lo que necesitas y te ayudaremos a elegir material, tamaño, acabado y siguiente paso.",
  bottomQuote: "Solicitar cotización",
  bottomVisibility: "Chequeo gratis",
  mobileSearchLabel: "Buscar productos",
  mobileSearchPlaceholder: "Buscar banners, lonas, menús, tarjetas...",
  mobileNoResultsCopy: "Prueba banner, lona, vehículo, ventana, menú, coroplast, metal o QR.",
  quoteCategoryFallback: "Letreros",
  quoteCategoryOverride: "Letreros",
  quoteHelpProduct: "Ayuda con letreros",
  productAltSuffix: "letreros personalizados de Pixel & Panel",
  basePath: "/es/letreros",
  quotePath: "/es/solicitar-cotizacion",
  visibilityPath: "/es/chequeo-gratis-de-visibilidad",
  productSlugMap: signageHubSlugMapEs,
};

export const metadata = {
  metadataBase: new URL("https://pixelnpanel.com"),
  title: {
    absolute: "Letreros e Impresión | Pixel & Panel — Letreros Personalizados",
  },
  description:
    "Letreros personalizados, banners, tarjetas, volantes, gráficos para vehículos y materiales impresos para negocios del sureste de Texas.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/letreros",
    languages: {
      "en-US": "https://pixelnpanel.com/signage",
      "es-US": "https://pixelnpanel.com/es/letreros",
    },
  },
  openGraph: {
    title: "Letreros e Impresión | Pixel & Panel",
    description:
      "Letreros personalizados, banners, tarjetas, volantes, gráficos para vehículos y materiales impresos para negocios locales.",
    url: "https://pixelnpanel.com/es/letreros",
    locale: "es_US",
  },
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function SpanishSignagePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pixelnpanel.com/es" },
      { "@type": "ListItem", position: 2, name: "Letreros e Impresión", item: "https://pixelnpanel.com/es/letreros" },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Categorías de letreros e impresión",
    description:
      "Productos de letreros e impresión para negocios en Beaumont, Nederland y Port Arthur, TX.",
    url: "https://pixelnpanel.com/es/letreros",
    numberOfItems: signageCategoriesEs.length,
    itemListElement: signageCategoriesEs.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      description: category.description,
      url: `https://pixelnpanel.com/es/letreros?category=${category.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <Suspense fallback={null}>
        <SignageHubClient
          categories={signageCategoriesEs}
          copy={spanishCopy}
        />
      </Suspense>
    </>
  );
}
