import Link from "next/link";
import SignageHubClient from "@/components/signage/SignageHubClient";
import { signageCategoriesEs as rawSignageCategoriesEs, signageHubSlugMapEs } from "@/lib/signage-products-es";
import { withResolvedImagesEs } from "@/lib/signage/es-images";

// Broken <img> on a catalog page reads as a dead store — see lib/signage/es-images.js.
const signageCategoriesEs = withResolvedImagesEs(rawSignageCategoriesEs);
import { withDefaultSocialImage } from "@/lib/seo";

const spanishCopy = {
  eyebrow: "Letreros e Impresión",
  h1Start: "Letreros comerciales, banners de vinilo",
  h1Highlight: "e impresión profesional",
  mobileH1Start: "Letreros comerciales",
  mobileH1Highlight: "e imprenta local.",
  mobileHeroCopy:
    "Letreros exteriores, banners, rotulación para camionetas y papelería comercial premium.",
  heroCopy:
    "Maximiza el impacto visual de tu local y tus camionetas de trabajo con letreros para fachadas, lonas publicitarias, gráficos para vidrios e impresos comerciales.",
  quoteCta: "Solicitar cotización",
  viewProducts: "Ver productos",
  intro:
    "Elige una categoría y encuentra productos para que clientes vean tu negocio, entiendan el mensaje y tomen el siguiente paso.",
  categoriesHeading: "Categorías",
  productsLabel: "productos",
  productLabelSingular: "producto",
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

export const metadata = withDefaultSocialImage({
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: {
    absolute: "Letreros Comerciales, Banners e Imprenta | Pixel & Panel",
  },
  description:
    "Ordena letreros comerciales, lonas de vinilo resistentes, imanes vehiculares y volantes impresos en Beaumont, TX.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/letreros",
    languages: {
      "en-US": "https://www.pixelnpanel.com/signage",
      "x-default": "https://www.pixelnpanel.com/signage",
      "es-US": "https://www.pixelnpanel.com/es/letreros",
    },
  },
  openGraph: {
    title: "Letreros Comerciales, Banners e Imprenta | Pixel & Panel",
    description:
      "Ordena letreros comerciales, lonas de vinilo resistentes, imanes vehiculares y volantes impresos en Beaumont, TX.",
    url: "https://www.pixelnpanel.com/es/letreros",
    locale: "es_US",
  },
});

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// This directory remains available in the HTML and after hydration, including
// products outside the currently selected category.
function SpanishProductDirectory() {
  return (
    <section className="bg-[#FAF8F4] px-6 py-12" aria-labelledby="spanish-product-directory">
      <div className="mx-auto max-w-7xl">
        <h2 id="spanish-product-directory" className="text-2xl font-extrabold text-[#1C1917]">
          Todos nuestros letreros e impresos
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Compara materiales, tamaños y usos antes de pedir tu cotización. Atendemos en español a negocios de Beaumont, Nederland, Port Arthur y Houston.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {signageCategoriesEs.map((category) => (
            <details key={category.slug} className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-[#0369A1]">{category.name}</summary>
              <p className="mt-3 text-sm text-slate-700">{category.description}</p>
              <ul className="mt-3 space-y-2">
                {category.products.map((product) => (
                  <li key={product.slug}>
                    <Link href={"/es/letreros/" + (signageHubSlugMapEs[product.slug] || product.slug)} className="text-[#0369A1] underline underline-offset-4">
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SpanishSignagePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.pixelnpanel.com/es" },
      { "@type": "ListItem", position: 2, name: "Letreros e Impresión", item: "https://www.pixelnpanel.com/es/letreros" },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Productos de letreros e impresión",
    description:
      "Productos de letreros e impresión para negocios en Beaumont, Nederland y Port Arthur, TX.",
    url: "https://www.pixelnpanel.com/es/letreros",
    numberOfItems: signageCategoriesEs.flatMap((category) => category.products).length,
    itemListElement: signageCategoriesEs.flatMap((category) => category.products).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      description: product.description,
      url: `https://www.pixelnpanel.com/es/letreros/${signageHubSlugMapEs[product.slug] || product.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <SignageHubClient categories={signageCategoriesEs} copy={spanishCopy} />
      <SpanishProductDirectory />
    </>
  );
}
