import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  MapPin,
  PanelTop,
  Search,
  Store,
} from "lucide-react";
import { cityServiceServices } from "@/lib/city-service-pages";
import { getCityServiceDataEs, getSpanishCityServicePath } from "@/lib/city-service-pages-es";
import CityVisual from "../../../(en)/service-area/CityVisual";

const spanishCityVisualCopy = {
  steps: [
    { num: "01", label: "Tu ciudad, nuestra cobertura", accent: "#0EA5E9" },
    { num: "02", label: "Servicios que llevamos a tu negocio", accent: "#F59E0B" },
    { num: "03", label: "Negocios locales que ayudamos", accent: "#10B981" },
  ],
  panelLabel: "Área de servicio",
  coverageLabel: "Área de servicio en el sureste de Texas",
  servingLabel: "Sirviendo SETX",
  quoteLine: "Cotizaciones gratis para negocios del sureste de Texas",
  servicesLabel: "Todo lo que necesita un negocio local",
  serviceItems: [
    { label: "Sitio web a medida", color: "#0EA5E9", bg: "#EFF6FF" },
    { label: "Letreros y banners", color: "#F59E0B", bg: "#FFFBEB" },
    { label: "Aparecer en Google", color: "#8B5CF6", bg: "#F5F3FF" },
    { label: "Campañas con QR", color: "#10B981", bg: "#ECFDF5" },
  ],
  contactLine: "(409) 800-6139 · hello@pixelnpanel.com",
  resultsLabel: "Negocios locales que podemos apoyar",
  businesses: [
    { name: "Contratista en Beaumont", stars: 5, tag: "Web + Letreros" },
    { name: "Negocio familiar en Nederland", stars: 5, tag: "Perfil de Google" },
  ],
  regionLine: "Sirviendo Beaumont, Nederland, Port Arthur y áreas cercanas",
  stepAriaPrefix: "Mostrar paso de área de servicio",
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function ServiceCard({ link, icon: Icon }) {
  return (
    <Link
      href={link.href}
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <Icon className="h-5 w-5 text-[#F59E0B]" />
        <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
      </div>
      <h3 className="mb-2 text-[#1C1917]">{link.label}</h3>
      <p className="text-sm leading-6 text-slate-600">{link.description}</p>
    </Link>
  );
}

export default function CityLandingEs({ city }) {
  const pageUrl = `https://www.pixelnpanel.com/es/area-de-servicio/${city.slug}`;
  const quoteHref = `/es/solicitar-cotizacion?product=${encodeURIComponent(`${city.name} Proyecto de Visibilidad`)}&category=${encodeURIComponent("Área de Servicio")}`;
  const visibilityHref = "/es/chequeo-gratis-de-visibilidad";
  const faqs = city.faqs.slice(0, 3);
  const allCityServices = Object.entries(cityServiceServices)
    .map(([serviceSlug, service]) => {
      const href = getSpanishCityServicePath(city.slug, serviceSlug);
      const spanishServiceSlug = href?.split("/").pop();
      const spanishService = spanishServiceSlug
        ? getCityServiceDataEs(city.slug, spanishServiceSlug)?.service
        : null;

      return {
        serviceSlug,
        service: {
          ...service,
          name: spanishService?.name || service.name,
          type: spanishService?.type || service.type,
        },
        href,
      };
    })
    .filter((item) => item.href);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pixel & Panel",
    url: "https://www.pixelnpanel.com",
    email: "hello@pixelnpanel.com",
    telephone: "(409) 800-6139",
    areaServed: ["Beaumont, TX", "Nederland, TX", "Port Arthur, TX", "el sureste de Texas"],
    knowsAbout: [
      "Sitios web",
      "SEO local",
      "Perfil de Google",
      "Letreros e impresión",
      "Campañas con códigos QR",
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.pixelnpanel.com/es" },
      { "@type": "ListItem", position: 2, name: "Área de Servicio", item: pageUrl },
      { "@type": "ListItem", position: 3, name: `${city.name}, TX`, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_64%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-20">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/es" className="transition hover:text-white">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{city.name}, TX</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>
                  Área de servicio en el sureste de Texas
                </p>
                <h1 className="max-w-4xl text-white">{city.h1}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
                  {city.intro}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={quoteHref} className="btn-amber justify-center">
                    Solicitar cotización <ArrowRight size={16} />
                  </Link>
                  <Link href={visibilityHref} className="btn-ghost justify-center">
                    Chequeo gratis de visibilidad
                  </Link>
                </div>
              </div>

              <div className="hidden items-center justify-center lg:flex">
                <CityVisual city={city} copy={spanishCityVisualCopy} />
              </div>
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[#0369A1]">
                <MapPin size={22} />
                <span className="font-bold">Sirviendo {city.name} y el sureste de Texas</span>
              </div>
              <h2 className="mb-4 text-[#1C1917]">Servicios para negocios en {city.name}</h2>
              <p className="leading-8 text-slate-600">
                Pixel &amp; Panel ayuda a negocios locales a conectar lo que los clientes ven en persona con los lugares donde buscan en internet. Eso incluye letreros, impresión, sitios web, SEO local, Perfil de Google, campañas con QR y rutas de captura de leads.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <h2 className="mb-5 text-[#1C1917]">Cómo podemos ayudar</h2>
              <ul className="grid gap-4 text-slate-600">
                {city.focus.slice(0, 5).map((service) => (
                  <li key={service} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="popular-signage-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-label text-[#0369A1]">Letreros populares</p>
                <h2 id="popular-signage-heading" className="text-[#1C1917]">
                  Letreros e impresión para {city.name}
                </h2>
              </div>
              <Link href="/es/letreros" className="btn-outline">
                Ver letreros
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {city.popularSignage.slice(0, 3).map((link) => (
                <ServiceCard key={link.href} link={link} icon={PanelTop} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-base" aria-labelledby="popular-digital-heading">
          <div className="container-px">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-label text-[#0369A1]">Servicios digitales populares</p>
                <h2 id="popular-digital-heading" className="text-[#1C1917]">
                  Ayuda a clientes cercanos a encontrarte y contactarte
                </h2>
              </div>
              <Link href="/es/servicios-digitales" className="btn-outline">
                Ver servicios digitales
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {city.popularDigital.slice(0, 3).map((link) => (
                <ServiceCard key={link.href} link={link} icon={Globe2} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="city-services-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="section-label text-[#0369A1]">Todos los servicios en {city.name}</p>
              <h2 id="city-services-heading" className="text-[#1C1917]">Explora servicios específicos para {city.name}, TX</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {allCityServices.map(({ serviceSlug, service, href }) => (
                <Link
                  key={serviceSlug}
                  href={href}
                  className="group rounded-xl border border-slate-200 bg-[#FAF8F4] p-4 transition-colors hover:border-[#F59E0B] hover:bg-white"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0369A1]">
                    {service.type === "signage" ? "Letreros" : "Digital"}
                  </span>
                  <p className="mt-1 font-bold text-[#1C1917] transition-colors group-hover:text-[#0369A1]">
                    {service.name} en {city.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Ver más →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="why-city-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label text-[#0369A1]">Por qué Pixel &amp; Panel</p>
              <h2 id="why-city-heading" className="text-[#1C1917]">
                Visibilidad práctica para negocios locales.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {city.whyCards.slice(0, 3).map((reason, index) => {
                const Icon = [Globe2, Search, Store, BadgeCheck][index] || BadgeCheck;
                return (
                  <article key={reason} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6">
                    <Icon className="mb-5 h-7 w-7 text-[#F59E0B]" />
                    <p className="leading-7 text-slate-700">{reason}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-base" aria-labelledby="city-faq-heading">
          <div className="container-px">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <p className="section-label text-[#0369A1]">FAQ</p>
                <h2 id="city-faq-heading" className="text-[#1C1917]">
                  Preguntas sobre servicios en {city.name}
                </h2>
              </div>
              <div className="grid gap-4">
                {faqs.map(([question, answer]) => (
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
                <p className="section-label" style={{ color: "#F59E0B" }}>{city.name}, TX</p>
                <h2 className="text-white">Haz que tu negocio sea más fácil de encontrar</h2>
                <p className="mt-4 max-w-2xl text-white/72">
                  Cuéntanos qué necesitas mejorar y Pixel &amp; Panel te recomendará un siguiente paso práctico.
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
