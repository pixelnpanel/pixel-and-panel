import Link from "next/link";
import { ArrowRight, CheckCircle2, ListChecks, Tag, Truck } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { createServiceJsonLd } from "@/lib/seo";
import { HOUSTON_AREA_SERVED, faqPageJsonLd } from "./houston-schema";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const LABELS = {
  en: {
    sectionLabel: "Houston, TX",
    quote: "Request a Quote",
    deliveryHeading: "Houston Delivery & Turnaround",
    pricingHeading: "What It Costs",
    usesHeading: "Common Uses Around Houston",
    usesLabel: "Where It Goes",
    industriesHeading: "Who Orders These",
    processHeading: "How It Works",
    processLabel: "Process",
    benefitsHeading: "What You Get",
    faqHeading: "Frequently Asked Questions",
    faqLabel: "FAQ",
    relatedHeading: "Related Houston Services",
    relatedLabel: "Keep Looking",
    testimonialsHeading: "What Houston Customers Say",
    testimonialsLabel: "Proof",
    ctaHeading: "Get exact pricing for your project",
    ctaBody: "Share your size, quantity, and Houston location — we'll reply with clear pricing and timing.",
    hubName: "Houston, TX",
    homeName: "Home",
    hubHref: "/houston",
  },
  es: {
    sectionLabel: "Houston, TX",
    quote: "Solicitar Cotización",
    deliveryHeading: "Entrega y Tiempos en Houston",
    pricingHeading: "Cuánto Cuesta",
    usesHeading: "Usos Comunes en Houston",
    usesLabel: "Dónde se Usa",
    industriesHeading: "Quiénes lo Piden",
    processHeading: "Cómo Funciona",
    processLabel: "Proceso",
    benefitsHeading: "Lo Que Incluye",
    faqHeading: "Preguntas Frecuentes",
    faqLabel: "Preguntas Frecuentes",
    relatedHeading: "Servicios Relacionados en Houston",
    relatedLabel: "Seguir Viendo",
    testimonialsHeading: "Lo Que Dicen los Clientes de Houston",
    testimonialsLabel: "Prueba",
    ctaHeading: "Obtén el precio exacto para tu proyecto",
    ctaBody: "Comparte el tamaño, la cantidad y tu ubicación en Houston — respondemos con precios y tiempos claros.",
    hubName: "Houston, TX",
    homeName: "Inicio",
    hubHref: "/es/houston",
  },
};

export default function HoustonServicePage({ service, path, locale = "en" }) {
  const t = LABELS[locale];
  const isEs = locale === "es";
  const quoteHref = `${isEs ? "/es/solicitar-cotizacion" : "/quote-request"}?product=${encodeURIComponent(service.quoteProduct)}&category=${encodeURIComponent(service.quoteCategory)}`;
  const homeUrl = isEs ? "https://www.pixelnpanel.com/es" : "https://www.pixelnpanel.com";
  const hubUrl = `https://www.pixelnpanel.com${t.hubHref}`;
  const pageUrl = `https://www.pixelnpanel.com${path}`;

  const isDigital = service.type === "digital";
  const category = isDigital
    ? isEs ? "servicios digitales" : "digital visibility"
    : isEs ? "letreros e impresión" : "signs and print";

  const serviceJsonLd = createServiceJsonLd({
    name: service.h1,
    description: service.metaDescription,
    url: path,
    serviceType: service.quoteProduct,
    category,
    areaServed: HOUSTON_AREA_SERVED,
    inLanguage: isEs ? "es-US" : "en-US",
    offerUrl: quoteHref,
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.homeName, url: homeUrl },
          { name: t.hubName, url: hubUrl },
          { name: service.name, url: pageUrl },
        ]}
      />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqPageJsonLd(service.faqs)} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_64%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-20">
            <p className="section-label section-label-on-hero">
              <Link href={t.hubHref} className="hover:underline">{t.sectionLabel}</Link>
            </p>
            <h1 className="max-w-4xl text-white">{service.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{service.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={quoteHref} className="btn-amber justify-center">
                {t.quote} <ArrowRight size={16} />
              </Link>
              <Link href={service.catalogHref} className="btn-ghost justify-center">
                {service.catalogLabel}
              </Link>
            </div>
          </div>
        </section>

        {service.localContext && (
          <section className="section-base" aria-labelledby="houston-service-context-heading">
            <div className="container-px">
              <div className="mx-auto max-w-4xl">
                <h2 id="houston-service-context-heading" className="text-[#1C1917]">
                  {service.localContext.heading}
                </h2>
                <div className="mt-6 space-y-5">
                  {service.localContext.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="leading-8 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-white px-6 py-16 md:py-20" aria-labelledby="houston-service-delivery-heading">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm md:p-8">
              <div className="mb-4 flex items-center gap-3 text-[#0369A1]">
                <Truck size={22} />
                <h2 id="houston-service-delivery-heading" className="text-[#1C1917]">{t.deliveryHeading}</h2>
              </div>
              <p className="leading-8 text-slate-600">{service.delivery}</p>
            </div>

            {service.pricingNote && (
              <div className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm md:p-8">
                <div className="mb-4 flex items-center gap-3 text-[#0369A1]">
                  <Tag size={22} />
                  <h2 className="text-[#1C1917]">{t.pricingHeading}</h2>
                </div>
                <p className="leading-8 text-slate-600">{service.pricingNote}</p>
              </div>
            )}
          </div>
        </section>

        {(service.uses || service.industries) && (
          <section className="section-base" aria-labelledby="houston-service-uses-heading">
            <div className="container-px">
              <div className="mb-8">
                <p className="section-label text-[#0369A1]">{t.usesLabel}</p>
                <h2 id="houston-service-uses-heading" className="text-[#1C1917]">{t.usesHeading}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {service.uses && (
                  <ul className="grid gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    {service.uses.map((use) => (
                      <li key={use} className="flex gap-3 leading-7 text-slate-600">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F59E0B]" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {service.industries && (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-xl text-[#1C1917]">{t.industriesHeading}</h3>
                    <ul className="grid gap-3">
                      {service.industries.map((industry) => (
                        <li key={industry} className="flex gap-3 leading-7 text-slate-600">
                          <ListChecks className="mt-1 h-4 w-4 shrink-0 text-[#0369A1]" />
                          <span>{industry}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {service.process && (
          <section className="bg-white px-6 py-16 md:py-20" aria-labelledby="houston-service-process-heading">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <p className="section-label text-[#0369A1]">{t.processLabel}</p>
                <h2 id="houston-service-process-heading" className="text-[#1C1917]">{t.processHeading}</h2>
              </div>
              <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {service.process.map(([title, body], index) => (
                  <li key={title} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6">
                    <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F59E0B] text-sm font-bold text-[#1C1917]">
                      {index + 1}
                    </span>
                    <h3 className="mb-2 text-lg text-[#1C1917]">{title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {service.benefits && (
          <section className="section-base" aria-labelledby="houston-service-benefits-heading">
            <div className="container-px">
              <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 id="houston-service-benefits-heading" className="mb-6 text-[#1C1917]">{t.benefitsHeading}</h2>
                <ul className="grid gap-3 md:grid-cols-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 leading-7 text-slate-600">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F59E0B]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {service.testimonials.length > 0 && (
          <section className="bg-white px-6 py-16" aria-labelledby="houston-service-testimonials-heading">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 text-center">
                <p className="section-label text-[#0369A1]">{t.testimonialsLabel}</p>
                <h2 id="houston-service-testimonials-heading" className="text-[#1C1917]">{t.testimonialsHeading}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {service.testimonials.map((item) => (
                  <figure key={item.quote} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6">
                    <blockquote className="leading-7 text-slate-700">“{item.quote}”</blockquote>
                    <figcaption className="mt-4 text-sm font-bold text-[#1C1917]">
                      {item.name}
                      {item.business ? <span className="font-normal text-slate-500"> — {item.business}</span> : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white px-6 py-16 md:py-20" aria-labelledby="houston-service-faq-heading">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="section-label text-[#0369A1]">{t.faqLabel}</p>
              <h2 id="houston-service-faq-heading" className="text-[#1C1917]">{t.faqHeading}</h2>
            </div>
            <div className="grid gap-4">
              {service.faqs.map(([question, answer]) => (
                <article key={question} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <h3 className="mb-2 text-xl text-[#1C1917]">{question}</h3>
                  <p className="text-slate-600">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {service.relatedLinks && (
          <section className="section-base" aria-labelledby="houston-service-related-heading">
            <div className="container-px">
              <div className="mb-8">
                <p className="section-label text-[#0369A1]">{t.relatedLabel}</p>
                <h2 id="houston-service-related-heading" className="text-[#1C1917]">{t.relatedHeading}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {service.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-[#1C1917]">{link.label}</h3>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl rounded-xl bg-[#0C1E3C] p-8 text-white shadow-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>{t.sectionLabel}</p>
                <h2 className="text-white">{t.ctaHeading}</h2>
                <p className="mt-4 max-w-2xl text-white/72">{t.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={quoteHref} className="btn-amber justify-center">
                  {t.quote} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
