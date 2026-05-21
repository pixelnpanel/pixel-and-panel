import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  Layers,
  MousePointerClick,
} from "lucide-react";
import {
  digitalServicesEs,
  getDigitalServiceEs,
  getRelatedDigitalServicesEs,
} from "@/lib/digital-services-es";
import { createServiceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return digitalServicesEs.map((service) => ({
    servicio: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { servicio } = await params;
  const service = getDigitalServiceEs(servicio);

  if (!service) {
    return { title: "Servicios Digitales" };
  }

  return {
    title: {
      absolute: service.title,
    },
    description: service.description,
    alternates: {
      canonical: `https://pixelnpanel.com/es/servicios-digitales/${service.slug}`,
      languages: {
        "en-US": `https://pixelnpanel.com/digital/${service.enSlug}`,
        "es-US": `https://pixelnpanel.com/es/servicios-digitales/${service.slug}`,
      },
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://pixelnpanel.com/es/servicios-digitales/${service.slug}`,
      siteName: "Pixel & Panel",
      locale: "es_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
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

export default async function SpanishDigitalServicePage({ params }) {
  const { servicio } = await params;
  const service = getDigitalServiceEs(servicio);

  if (!service) notFound();

  const quoteHref = `/es/solicitar-cotizacion?product=${encodeURIComponent(service.name)}&category=${encodeURIComponent("Servicios Digitales")}`;
  const visibilityHref = "/es/chequeo-gratis-de-visibilidad";
  const related = getRelatedDigitalServicesEs(service);
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pixelnpanel.com/es" },
      { "@type": "ListItem", position: 2, name: "Servicios Digitales", item: "https://pixelnpanel.com/es/servicios-digitales" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://pixelnpanel.com/es/servicios-digitales/${service.slug}` },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const serviceSchema = createServiceJsonLd({
    name: service.name,
    description: service.description,
    url: `/es/servicios-digitales/${service.slug}`,
    serviceType: "Servicios Digitales",
    category: "Servicios Digitales",
    inLanguage: "es-US",
    schemaType: ["Service", "Product"],
    offerUrl: quoteHref,
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faq} />
      <JsonLd data={serviceSchema} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_64%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-18 md:pb-24">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/es" className="transition hover:text-white">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/es/servicios-digitales" className="transition hover:text-white">Servicios Digitales</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{service.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>Servicios digitales en el sureste de Texas</p>
                <h1 className="max-w-4xl text-white">{service.h1}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{service.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={quoteHref} className="btn-amber justify-center">
                    Solicitar cotización <ArrowRight size={16} />
                  </Link>
                  <Link href={visibilityHref} className="btn-ghost justify-center">
                    Chequeo gratis de visibilidad
                  </Link>
                </div>
              </div>

              <aside className="rounded-xl border border-white/15 bg-white/10 p-6 shadow-2xl">
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-[#F59E0B] text-[#1C1917]">
                  <Globe2 className="h-7 w-7" />
                </span>
                <h2 className="text-white">Visibilidad clara, sin complicar el proceso</h2>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  Sitios web, letreros y códigos QR que ayudan a que tu negocio sea más visible.
                </p>
                <div className="mt-6 grid gap-3">
                  {["Ser encontrado", "Convertir atención", "Conectar lo físico y lo digital"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white/78">
                      <CheckCircle2 className="h-4 w-4 text-[#F59E0B]" />
                      {item}
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <section aria-labelledby="helps-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Qué ayuda a mejorar</p>
                <h2 id="helps-heading" className="text-[#1C1917]">Enfoque práctico para visibilidad local.</h2>
                <div className="mt-6 grid gap-3">
                  {service.helps.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-[#FAF8F4] p-4">
                      <MousePointerClick className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="included-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Qué incluye</p>
                <h2 id="included-heading" className="text-[#1C1917]">Piezas principales que Pixel &amp; Panel revisa o construye.</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-[#FAF8F4] p-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0369A1]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <section aria-labelledby="best-for-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Ideal para</p>
                <h2 id="best-for-heading" className="text-[#1C1917]">Cuando necesitas claridad antes de crecer.</h2>
                <div className="mt-6 grid gap-3">
                  {service.bestFor.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-[#FAF8F4] p-4">
                      <Layers className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="how-heading" className="rounded-xl bg-[#0C1E3C] p-6 text-white shadow-xl md:p-8">
                <p className="section-label" style={{ color: "#F59E0B" }}>Cómo ayuda Pixel &amp; Panel</p>
                <h2 id="how-heading" className="text-white">Trabajo digital que apoya acciones reales de clientes.</h2>
                <p className="mt-5 leading-8 text-white/72">{service.how}</p>
              </section>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="related-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-label text-[#0369A1]">Servicios relacionados</p>
                <h2 id="related-heading" className="text-[#1C1917]">Servicios que trabajan bien con {service.name.toLowerCase()}</h2>
              </div>
              <Link href="/es/servicios-digitales" className="btn-outline">
                Ver servicios digitales
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/es/servicios-digitales/${item.slug}`} className="group rounded-xl border border-slate-200 bg-[#FAF8F4] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <BadgeCheck className="h-5 w-5 text-[#F59E0B]" />
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                  </div>
                  <h3 className="mb-2 text-[#1C1917]">{item.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <p className="section-label text-[#0369A1]">FAQ</p>
                <h2 className="text-[#1C1917]">Preguntas sobre {service.name}</h2>
              </div>
              <div className="grid gap-4">
                {service.faqs.map(([question, answer]) => (
                  <article key={question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-2 text-xl text-[#1C1917]">{question}</h3>
                    <p className="text-slate-600">{answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl rounded-xl bg-[#0C1E3C] p-8 text-white shadow-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>Siguiente paso</p>
                <h2 className="text-white">¿Quieres ayuda con {service.name.toLowerCase()}?</h2>
                <p className="mt-4 max-w-2xl text-white/72">
                  Cuéntanos qué quieres mejorar y recomendaremos un punto de inicio práctico.
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
