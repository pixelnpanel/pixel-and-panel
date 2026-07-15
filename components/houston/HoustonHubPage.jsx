import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Truck } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { houstonLocalBusinessJsonLd, faqPageJsonLd } from "./houston-schema";

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
    servicesHeading: "Signs & Print for Houston",
    servicesLabel: "What We Make",
    faqHeading: "Houston Questions",
    faqLabel: "FAQ",
    testimonialsHeading: "Houston Businesses on Pixel & Panel",
    testimonialsLabel: "Proof",
    ctaHeading: "Ready to get your Houston business noticed?",
    ctaBody: "Tell us what you need and where it's going — we'll reply with clear pricing and next steps.",
    learnMore: "Learn more",
    homeName: "Home",
    breadcrumbName: "Houston, TX",
  },
  es: {
    sectionLabel: "Houston, TX",
    quote: "Solicitar Cotización",
    servicesHeading: "Letreros e Impresión para Houston",
    servicesLabel: "Lo Que Hacemos",
    faqHeading: "Preguntas sobre Houston",
    faqLabel: "Preguntas Frecuentes",
    testimonialsHeading: "Negocios de Houston sobre Pixel & Panel",
    testimonialsLabel: "Prueba",
    ctaHeading: "¿Listo para que tu negocio en Houston se destaque?",
    ctaBody: "Cuéntanos qué necesitas y para dónde va — respondemos con precios claros y los siguientes pasos.",
    learnMore: "Ver más",
    homeName: "Inicio",
    breadcrumbName: "Houston, TX",
  },
};

export default function HoustonHubPage({ content, services, locale = "en" }) {
  const t = LABELS[locale];
  const isEs = locale === "es";
  const quoteHref = isEs
    ? `/es/solicitar-cotizacion?product=${encodeURIComponent("Proyecto en Houston")}&category=${encodeURIComponent("Área de Servicio")}`
    : `/quote-request?product=${encodeURIComponent("Houston Project")}&category=${encodeURIComponent("Service Area")}`;
  const homeUrl = isEs ? "https://www.pixelnpanel.com/es" : "https://www.pixelnpanel.com";
  const pageUrl = isEs
    ? "https://www.pixelnpanel.com/es/houston"
    : "https://www.pixelnpanel.com/houston";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.homeName, url: homeUrl },
          { name: t.breadcrumbName, url: pageUrl },
        ]}
      />
      <JsonLd data={houstonLocalBusinessJsonLd(locale)} />
      <JsonLd data={faqPageJsonLd(content.faqs)} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_64%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-20">
            <p className="section-label" style={{ color: "#F59E0B" }}>
              {t.sectionLabel}
            </p>
            <h1 className="max-w-4xl text-white">{content.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{content.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={quoteHref} className="btn-amber justify-center">
                {t.quote} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-base" aria-labelledby="houston-services-heading">
          <div className="container-px">
            <div className="mb-8">
              <p className="section-label text-[#0369A1]">{t.servicesLabel}</p>
              <h2 id="houston-services-heading" className="text-[#1C1917]">{t.servicesHeading}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#F59E0B]" />
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                  </div>
                  <h3 className="mb-2 text-[#1C1917]">{service.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{service.description}</p>
                  <p className="mt-3 text-sm font-bold text-[#0369A1]">{t.learnMore} →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-20" aria-labelledby="houston-delivery-heading">
          <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3 text-[#0369A1]">
              <Truck size={22} />
              <h2 id="houston-delivery-heading" className="text-[#1C1917]">{content.delivery.heading}</h2>
            </div>
            <p className="leading-8 text-slate-600">{content.delivery.body}</p>
          </div>
        </section>

        {content.testimonials.length > 0 && (
          <section className="section-base" aria-labelledby="houston-testimonials-heading">
            <div className="container-px">
              <div className="mb-8 text-center">
                <p className="section-label text-[#0369A1]">{t.testimonialsLabel}</p>
                <h2 id="houston-testimonials-heading" className="text-[#1C1917]">{t.testimonialsHeading}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {content.testimonials.map((item) => (
                  <figure key={item.quote} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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

        <section className="section-base" aria-labelledby="houston-faq-heading">
          <div className="container-px">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <p className="section-label text-[#0369A1]">{t.faqLabel}</p>
                <h2 id="houston-faq-heading" className="text-[#1C1917]">{t.faqHeading}</h2>
              </div>
              <div className="grid gap-4">
                {content.faqs.map(([question, answer]) => (
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
                <p className="section-label" style={{ color: "#F59E0B" }}>
                  <MapPin className="mr-2 inline h-4 w-4" />
                  {t.sectionLabel}
                </p>
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
