import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe2,
  Home,
  Image as ImageIcon,
  Info,
  Layers,
  MapPin,
  Package,
  QrCode,
  Ruler,
  Search,
  Sparkles,
} from "lucide-react";
import {
  getRelatedSignageProductsEs,
  getSignageProductEs,
  signageProductsEs,
} from "@/lib/signage-products-es";
import { cityServiceCities, cityServiceServices } from "@/lib/city-service-pages";
import { getSpanishCityServicePath } from "@/lib/city-service-pages-es";

const enlacesDigitales = [
  {
    label: "Diseño web",
    href: "/es/servicios-digitales/desarrollo-web",
    description: "Envía el tráfico de letreros, impresos y vehículos a una página rápida que explica tus servicios y captura cotizaciones.",
    icon: Globe2,
  },
  {
    label: "SEO local",
    href: "/es/servicios-digitales/seo-local",
    description: "Ayuda a que clientes que ven tu marca en persona también puedan encontrarte cuando buscan cerca de ellos.",
    icon: Search,
  },
  {
    label: "Campañas con QR",
    href: "/es/servicios-digitales/campanas-con-qr",
    description: "Conecta flyers, banners, ventanas y vehículos con menús, ofertas, formularios o páginas medibles.",
    icon: QrCode,
  },
];

const defaultSpecs = {
  turnaround:
    "Normalmente 3-5 días hábiles después de aprobar el diseño. Proyectos con instalación, medidas especiales o materiales de pedido pueden tardar más.",
  minOrder: "Depende del producto; muchas piezas se pueden cotizar desde 1 unidad.",
  materials: [
    "Material recomendado según uso interior o exterior",
    "Opciones resistentes para calor, humedad y uso local",
    "Material rígido, vinilo o papel según el tipo de pieza",
  ],
  sizes: [
    "Tamaños estándar disponibles",
    "Medidas personalizadas según ubicación",
    "Formato ajustado a distancia de lectura y cantidad",
  ],
  finishing: [
    "Corte a medida",
    "Acabado mate o brillante cuando aplica",
    "Ojales, laminado o montaje según el producto",
    "Preparación para QR, URL corta o llamada a la acción",
  ],
  notAFitWhen:
    "No conviene cargar la pieza con demasiada información. Si el cliente debe leer muchos detalles, es mejor usar el letrero o impreso para llamar la atención y enviar a una página, menú, formulario o cotización con más contexto.",
};

const specsByCategorySlug = {
  "print-marketing-materials": {
    materials: [
      "Cartulina o papel recomendado según uso",
      "Opciones mate, brillante o laminadas",
      "Peso y acabado según evento, entrega o promoción",
    ],
    sizes: [
      "Tamaños estándar para tarjetas, volantes, menús o postales",
      "Medidas personalizadas disponibles",
      "Formato ajustado al método de entrega",
    ],
    finishing: [
      "Corte final limpio",
      "Acabado mate o brillante",
      "Doble cara cuando aplica",
      "QR, URL corta o datos de contacto claros",
    ],
  },
  "vehicle-graphics": {
    turnaround:
      "Normalmente 5-7 días hábiles después de medidas y aprobación del diseño.",
    materials: [
      "Vinilo para vehículo de calidad profesional",
      "Opciones para letras, imanes, decals o wraps parciales",
      "Material resistente a sol y uso diario",
    ],
    sizes: [
      "Puertas, ventanas, laterales o paneles parciales",
      "Medidas tomadas según vehículo",
      "Diseño ajustado a curvas, manijas y líneas del auto",
    ],
    finishing: [
      "Laminado protector cuando aplica",
      "Corte de vinilo o impresión a color",
      "Instalación profesional recomendada",
      "Diseño legible a velocidad de calle",
    ],
  },
  "business-storefront-signs": {
    turnaround:
      "Normalmente 7-14 días hábiles según material, tamaño, instalación y permisos.",
    materials: [
      "Acrílico, aluminio compuesto, vinilo o materiales rígidos",
      "Opciones para exterior o interior",
      "Material elegido según fachada, clima y montaje",
    ],
    sizes: [
      "Medidas personalizadas para fachada, lobby o ventana",
      "Tamaños definidos por distancia de lectura",
      "Opciones según restricciones del local o arrendamiento",
    ],
    finishing: [
      "Montaje, separadores o panel rígido cuando aplica",
      "Acabados resistentes para exterior",
      "Preparación para instalación",
      "Revisión de legibilidad antes de producir",
    ],
  },
};

function getSpecs(product) {
  return {
    ...defaultSpecs,
    ...(specsByCategorySlug[product.categorySlug] || {}),
  };
}

export function generateStaticParams() {
  return signageProductsEs.map((product) => ({
    producto: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { producto } = await params;
  const product = getSignageProductEs(producto);

  if (!product) {
    return { title: "Letreros e Impresión" };
  }

  return {
    title: {
      absolute: product.title,
    },
    description: product.description,
    alternates: {
      canonical: `https://www.pixelnpanel.com/es/letreros/${product.slug}`,
      languages: {
        "en-US": `https://www.pixelnpanel.com/signage/${product.enSlug}`,
        "es-US": `https://www.pixelnpanel.com/es/letreros/${product.slug}`,
      },
    },
    openGraph: {
      title: product.title,
      description: product.description,
      url: `https://www.pixelnpanel.com/es/letreros/${product.slug}`,
      siteName: "Pixel & Panel",
      locale: "es_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
    },
  };
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function SpanishSignageProductPage({ params }) {
  const { producto } = await params;
  const product = getSignageProductEs(producto);

  if (!product) notFound();

  const quoteHref = `/es/solicitar-cotizacion?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent("Letreros")}`;
  const visibilityHref = "/es/chequeo-gratis-de-visibilidad";
  const related = getRelatedSignageProductsEs(product);
  const specs = getSpecs(product);
  const cityServiceLinks = cityServiceServices[product.enSlug]
    ? Object.values(cityServiceCities)
        .map((city) => ({
          city,
          href: getSpanishCityServicePath(city.slug, product.enSlug),
        }))
        .filter((item) => item.href)
    : [];
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.pixelnpanel.com/es" },
      { "@type": "ListItem", position: 2, name: "Letreros e Impresión", item: "https://www.pixelnpanel.com/es/letreros" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.pixelnpanel.com/es/letreros/${product.slug}` },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const service = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    name: product.name,
    description: product.description,
    url: `https://www.pixelnpanel.com/es/letreros/${product.slug}`,
    image: `https://www.pixelnpanel.com${product.image}`,
    serviceType: product.category,
    category: product.category,
    areaServed: [
      { "@type": "City", name: "Beaumont", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Nederland", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Port Arthur", containedInPlace: { "@type": "State", name: "Texas" } },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: "Pixel & Panel",
      url: "https://www.pixelnpanel.com",
      telephone: "(409) 225-2012",
      email: "hello@pixelnpanel.com",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Cotización personalizada según tamaño, material y cantidad",
      },
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: "Pixel & Panel",
        url: "https://www.pixelnpanel.com",
      },
      url: `https://www.pixelnpanel.com/es/solicitar-cotizacion?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent("Letreros")}`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faq} />
      <JsonLd data={service} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_62%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-18 md:pb-24">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/es" className="transition hover:text-white">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/es/letreros" className="transition hover:text-white">Letreros e Impresión</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>Letreros e impresión en el sureste de Texas</p>
                <h1 className="max-w-4xl text-white">{product.h1}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{product.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={quoteHref} className="btn-amber justify-center">
                    Solicitar cotización <ArrowRight size={16} />
                  </Link>
                  <Link href={visibilityHref} className="btn-ghost justify-center">
                    Chequeo gratis de visibilidad
                  </Link>
                </div>
                <div className="mt-8 grid gap-3 text-sm text-white/72 sm:grid-cols-3">
                  {["Legible desde la distancia correcta", "Diseñado con un siguiente paso claro", "Beaumont, Nederland y Port Arthur"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F59E0B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-[#0EA5E9]/18 blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-3 rounded-lg bg-white/10 p-4">
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#F59E0B]">
                      Primera pregunta útil
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                      ¿Dónde lo verá la gente y qué quieres que hagan después?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <section aria-labelledby="best-for-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Ideal para</p>
                <h2 id="best-for-heading" className="text-[#1C1917]">Cuándo conviene usar {product.name.toLowerCase()}</h2>
                <div className="mt-6 grid gap-3">
                  {product.bestFor.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-[#FAF8F4] p-4">
                      <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="common-uses-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Usos comunes</p>
                <h2 id="common-uses-heading" className="text-[#1C1917]">Formas prácticas de usarlos</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.uses.map((use) => (
                    <div key={use} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-[#FAF8F4] p-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0369A1]" />
                      <span className="text-slate-700">{use}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section aria-labelledby="options-heading" className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <p className="section-label text-[#0369A1]">Especificaciones y opciones</p>
                  <h2 id="options-heading" className="text-[#1C1917]">Qué saber antes de ordenar.</h2>
                  <p className="mt-5 leading-8 text-slate-600">{product.guidance}</p>

                  <div className="mt-6 grid gap-3 grid-cols-2">
                    <div className="rounded-lg bg-[#FAF8F4] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#0369A1]" />
                        <span className="text-xs font-bold uppercase tracking-wide text-[#0369A1]">Tiempo</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1917]">{specs.turnaround}</p>
                    </div>
                    <div className="rounded-lg bg-[#FAF8F4] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#0369A1]" />
                        <span className="text-xs font-bold uppercase tracking-wide text-[#0369A1]">Pedido mínimo</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1917]">{specs.minOrder}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <article className="rounded-lg bg-[#FAF8F4] p-5">
                    <Layers className="mb-3 h-5 w-5 text-[#F59E0B]" />
                    <h3 className="text-base text-[#1C1917]">Materiales</h3>
                    <ul className="mt-3 space-y-2">
                      {specs.materials.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0369A1]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-lg bg-[#FAF8F4] p-5">
                    <Ruler className="mb-3 h-5 w-5 text-[#F59E0B]" />
                    <h3 className="text-base text-[#1C1917]">Tamaños comunes</h3>
                    <ul className="mt-3 space-y-2">
                      {specs.sizes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0369A1]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-lg bg-[#FAF8F4] p-5 sm:col-span-2">
                    <ImageIcon className="mb-3 h-5 w-5 text-[#F59E0B]" />
                    <h3 className="text-base text-[#1C1917]">Opciones de acabado</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {specs.finishing.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0369A1]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="process-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label text-[#0369A1]">Cómo funciona</p>
              <h2 id="process-heading" className="text-[#1C1917]">Un camino simple de idea a cotización.</h2>
              <p className="mt-5 leading-8 text-slate-600">
                Pixel &amp; Panel mantiene cada proyecto enfocado en lo que el cliente necesita ver, entender y hacer después.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {[
                ["Comparte el contexto", "Dinos dónde se usará, tamaño o cantidad aproximada y fecha."],
                ["Aclaramos el mensaje", "Ayudamos a simplificar el texto para que se lea rápido."],
                ["Planeamos el formato", "Material, tamaño, acabado y QR se ajustan al uso real."],
                ["Solicita la cotización", "Recibes un siguiente paso práctico según los detalles."],
              ].map(([title, copy], index) => (
                <article key={title} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#0369A1] font-heading text-sm font-black text-white">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg text-[#1C1917]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-base" aria-labelledby="phygital-heading-es">
          <div className="container-px">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="section-label text-[#0369A1]">Conecta lo físico con lo digital</p>
                <h2 id="phygital-heading-es" className="text-[#1C1917]">Convierte la atención en una acción clara.</h2>
                <p className="mt-5 leading-8 text-slate-600">
                  Un letrero, impreso o gráfico vehicular llama la atención en persona. El siguiente paso es que el cliente pueda encontrarte en Google, entender la oferta y contactarte sin complicación.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {enlacesDigitales.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg">
                      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#FAF8F4] text-[#0369A1] transition group-hover:bg-[#F59E0B] group-hover:text-[#1C1917]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-base text-[#1C1917]">{item.label}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0369A1] transition group-hover:text-[#F59E0B]">
                        Ver más <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="container-px pb-10">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-heading text-sm font-bold text-amber-900">Bueno saber antes de ordenar</p>
                <p className="mt-1 text-sm leading-7 text-amber-800">{specs.notAFitWhen}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="section-base">
          <div className="container-px">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-label text-[#0369A1]">Productos relacionados</p>
                <h2 className="text-[#1C1917]">Otras piezas que pueden apoyar la misma campaña</h2>
              </div>
              <Link href="/es/letreros" className="btn-outline">
                Ver letreros e impresión
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/es/letreros/${item.slug}`} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <Home className="h-5 w-5 text-[#F59E0B]" />
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                  </div>
                  <h3 className="mb-2 text-[#1C1917]">{item.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {cityServiceLinks.length > 0 && (
          <section className="bg-[#FAF8F4] px-6 py-14 md:py-16">
            <div className="mx-auto max-w-7xl">
              <p className="section-label text-[#0369A1]">Área de servicio</p>
              <h2 className="mb-6 text-[#1C1917]">{product.name} por ciudad</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {cityServiceLinks.map(({ city, href }) => (
                  <Link
                    key={city.slug}
                    href={href}
                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-[#F59E0B]"
                  >
                    <p className="font-bold text-[#1C1917] transition-colors group-hover:text-[#0369A1]">
                      {product.name} en {city.name}, TX
                    </p>
                    <p className="mt-1 text-sm text-slate-500">Guía específica por ciudad →</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="section-label text-[#0369A1]">FAQ</p>
              <h2 className="text-[#1C1917]">Preguntas sobre {product.name}</h2>
            </div>
            <div className="grid gap-4">
              {product.faqs.map(([question, answer]) => (
                <article key={question} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <h3 className="mb-2 text-xl text-[#1C1917]">{question}</h3>
                  <p className="text-slate-600">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-[#0C1E3C] p-8 text-white shadow-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-4 flex items-center gap-3 text-[#F59E0B]">
                  <MapPin className="h-5 w-5" />
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.14em]">Sureste de Texas</span>
                </div>
                <h2 className="text-white">¿Listo para cotizar {product.name.toLowerCase()}?</h2>
                <p className="mt-4 max-w-2xl text-white/70">
                  Cuéntanos qué necesitas, dónde se usará y cuándo lo necesitas.
                  Pixel &amp; Panel responderá con el siguiente paso.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={quoteHref} className="btn-amber justify-center">
                  Solicitar cotización <ArrowRight size={16} />
                </Link>
                <Link href={visibilityHref} className="btn-ghost justify-center">
                  Chequeo gratis
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
