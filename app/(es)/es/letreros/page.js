import { Suspense } from "react";
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

// Server-rendered Suspense fallback. SignageHubClient calls useSearchParams,
// which bails the whole subtree out of SSR — with fallback={null} crawlers got
// this page with no H1 at all and ~160 words, while the English hub (which
// renders its client component without a Suspense boundary) served a full one.
//
// This mirrors the client hero exactly — same gradient, same single H1 text
// node — so the swap after hydration is seamless, and lists every product so
// the Spanish product pages are reachable from the raw HTML. They were only
// linked from the client-rendered browser before, which left several of them
// with no crawlable path from anywhere on the site.
function SpanishSignageFallback() {
  const products = signageCategoriesEs.flatMap((category) =>
    (category.products || []).map((product) => ({
      ...product,
      href: `/es/letreros/${signageHubSlugMapEs[product.slug] || product.slug}`,
    }))
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FAF8F4] text-[#1C1917]">
      <section className="pnp-mobile-hero-compact relative overflow-hidden bg-gradient-to-br from-[#061B35] via-[#0369A1] to-[#0EA5E9] px-6 pb-8 pt-24 text-white md:py-28">
        <div className="absolute inset-0 opacity-40">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)",
              backgroundSize: "34px 34px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="section-label mb-4" style={{ color: "#F59E0B" }}>
            {spanishCopy.eyebrow}
          </p>
          <h1
            className="pnp-mobile-hero-title mx-auto break-words md:max-w-[980px] md:text-[clamp(2rem,3.5vw,3rem)] md:leading-tight"
            style={{ color: "white" }}
          >
            {spanishCopy.h1Start}{" "}
            <span className="mt-2 block text-[#F59E0B] md:mt-0 md:inline">
              {spanishCopy.h1Highlight}
            </span>
          </h1>
          <p className="pnp-mobile-hero-copy mx-auto mt-6 break-words md:hidden">
            {spanishCopy.mobileHeroCopy}
          </p>
          <p className="mx-auto mt-7 hidden max-w-3xl break-words leading-relaxed text-white/75 md:block md:text-xl">
            {spanishCopy.heroCopy}
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 pt-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-brand-muted">
            {spanishCopy.intro}
          </p>
          <h2 className="mt-12 font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">
            {spanishCopy.allHeading}
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.href}>
                <Link
                  href={product.href}
                  className="font-semibold text-[#0369A1] underline-offset-2 hover:underline"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
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
    name: "Categorías de letreros e impresión",
    description:
      "Productos de letreros e impresión para negocios en Beaumont, Nederland y Port Arthur, TX.",
    url: "https://www.pixelnpanel.com/es/letreros",
    numberOfItems: signageCategoriesEs.length,
    itemListElement: signageCategoriesEs.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      description: category.description,
      url: `https://www.pixelnpanel.com/es/letreros?category=${category.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <Suspense fallback={<SpanishSignageFallback />}>
        <SignageHubClient
          categories={signageCategoriesEs}
          copy={spanishCopy}
        />
      </Suspense>
    </>
  );
}
