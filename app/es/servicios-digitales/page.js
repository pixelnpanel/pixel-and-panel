import Link from "next/link";
import { ArrowRight, BadgeCheck, Globe2, MapPinned, QrCode, Search, Zap } from "lucide-react";
import { digitalServicesEs } from "@/lib/digital-services-es";

const iconBySlug = {
  "desarrollo-web": Globe2,
  "seo-local": Search,
  "perfil-de-google": MapPinned,
  "automatizacion-crm": Zap,
  "campanas-con-qr": QrCode,
};

export const metadata = {
  title: {
    absolute: "Servicios Digitales | Pixel & Panel — Sitios Web, SEO Local y Códigos QR",
  },
  description:
    "Servicios digitales para negocios del sureste de Texas: sitios web, SEO local, perfil de Google, automatización CRM y campañas con códigos QR.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/servicios-digitales",
    languages: {
      "en-US": "https://pixelnpanel.com/digital",
      "es-US": "https://pixelnpanel.com/es/servicios-digitales",
    },
  },
  openGraph: {
    title: "Servicios Digitales | Pixel & Panel",
    description:
      "Sitios web, SEO local, Perfil de Google, automatización CRM y campañas con códigos QR para negocios locales.",
    url: "https://pixelnpanel.com/es/servicios-digitales",
    locale: "es_US",
  },
};

export default function SpanishDigitalServicesPage() {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-4 pt-28 text-white md:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_68%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.12)_1px,transparent_0)] [background-size:36px_36px]" />
        <div className="relative mx-auto max-w-5xl pb-20 text-center">
          <p className="section-label" style={{ color: "#F59E0B" }}>
            Servicios Digitales
          </p>
          <h1 className="text-white">Servicios digitales para negocios locales</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/76 md:text-lg">
            Pixel &amp; Panel ayuda a negocios del sureste de Texas a crear una presencia
            en línea más clara, conectada y lista para recibir solicitudes de cotización.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/es/solicitar-cotizacion?category=Servicios%20Digitales" className="btn-amber justify-center">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-ghost justify-center">
              Chequeo gratis de visibilidad
            </Link>
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="digital-services-list">
        <div className="container-px">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="section-label text-[#0369A1]">Cómo ayudamos</p>
            <h2 id="digital-services-list" className="text-[#1C1917]">
              Ayudamos a que más clientes encuentren tu negocio en Google, en tu sitio web y en tus letreros.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {digitalServicesEs.map((service) => {
              const Icon = iconBySlug[service.slug] || BadgeCheck;
              return (
                <article key={service.slug} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0369A1]/10 text-[#0369A1]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[#1C1917]">{service.name}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>
                  <div className="mt-6 grid gap-3">
                    <Link href={`/es/servicios-digitales/${service.slug}`} className="btn-outline justify-center">
                      Ver servicio <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/es/solicitar-cotizacion?product=${encodeURIComponent(service.name)}&category=${encodeURIComponent("Servicios Digitales")}`}
                      className="btn-amber justify-center"
                    >
                      Cotizar <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-24" aria-labelledby="digital-final-cta">
        <div className="mx-auto max-w-6xl rounded-xl bg-[#0C1E3C] px-6 py-14 text-center text-white shadow-2xl md:px-12">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
            Siguiente paso
          </p>
          <h2 id="digital-final-cta" className="mx-auto mt-4 max-w-3xl text-white">
            Convierte visitantes en llamadas, mensajes y solicitudes de cotización.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/75">
            Cuéntanos qué quieres mejorar y Pixel &amp; Panel recomendará un punto de inicio práctico.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/es/solicitar-cotizacion?category=Servicios%20Digitales" className="btn-amber justify-center">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-ghost justify-center">
              Chequeo gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
