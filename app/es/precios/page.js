import Link from "next/link";
import { ArrowRight, CheckCircle, ClipboardCheck, QrCode } from "lucide-react";

const websitePackages = [
  {
    name: "Página de lanzamiento",
    price: "Desde $299",
    description:
      "Un sitio de una página para negocios, marcas personales o portafolios que necesitan una presencia limpia para empezar.",
    bestFor: "Negocios nuevos, portafolios, páginas sencillas y ofertas específicas.",
    features: [
      "Sitio web de una página",
      "Diseño móvil",
      "Conexión de dominio",
      "Sección básica de contacto",
      "Guía para correo profesional",
      "1 ronda de cambios",
    ],
    href: "/es/solicitar-cotizacion?product=P%C3%A1gina%20de%20lanzamiento&category=Servicios%20Digitales",
    cta: "Cotizar página",
  },
  {
    name: "Presencia web inicial",
    price: "Desde $499",
    description:
      "Un sitio inicial para pequeños negocios que necesitan verse profesionales en línea.",
    bestFor: "Contratistas, proveedores de servicios y negocios que están empezando.",
    features: [
      "Hasta 5 páginas",
      "Diseño móvil",
      "Formulario de contacto conectado a tu correo",
      "Configuración básica de SEO",
      "Conexión de dominio",
      "Guía para correo profesional",
      "1 ronda de cambios",
    ],
    href: "/es/solicitar-cotizacion?product=Presencia%20web%20inicial&category=Servicios%20Digitales",
    cta: "Cotizar sitio inicial",
  },
  {
    name: "Sitio web para negocio local",
    price: "Desde $799",
    badge: "Más popular",
    tone: "dark",
    description:
      "Un sitio más completo para negocios locales que necesitan páginas de servicios, captura de leads y mejor visibilidad en Google.",
    bestFor: "Restaurantes, contratistas, talleres, tiendas y negocios de servicios.",
    features: [
      "Hasta 7 páginas",
      "Página principal personalizada",
      "Páginas de servicios",
      "Formulario de contacto o cotización",
      "Guía para correo profesional",
      "Configuración o limpieza de Perfil de Google",
      "Configuración básica de SEO local",
      "Configuración de Google Analytics",
      "2 rondas de cambios",
    ],
    href: "/es/solicitar-cotizacion?product=Sitio%20web%20para%20negocio%20local&category=Servicios%20Digitales",
    cta: "Cotizar sitio local",
  },
  {
    name: "Sitio web + configuración de visibilidad",
    price: "Desde $999",
    badge: "Mejor valor",
    tone: "value",
    description:
      "Un paquete que conecta tu sitio web, presencia en Google, captura de leads y configuración inicial de campaña QR.",
    bestFor: "Negocios que quieren un sistema inicial de visibilidad.",
    features: [
      "Hasta 10 páginas",
      "Diseño y desarrollo del sitio web",
      "Páginas configuradas para aparecer en Google",
      "Optimización de Perfil de Google",
      "Formularios de contacto o cotización",
      "Configuración de campaña con código QR",
      "Configuración básica de seguimiento de visitas",
      "2 rondas de cambios",
    ],
    href: "/es/solicitar-cotizacion?product=Sitio%20web%20%2B%20configuraci%C3%B3n%20de%20visibilidad&category=Servicios%20Digitales",
    cta: "Cotizar visibilidad",
  },
];

const carePlans = [
  {
    name: "Cuidado Básico",
    price: "Desde $19/mes",
    features: [
      "Revisión mensual del sitio",
      "Prueba del formulario de contacto o cotización",
      "Revisión básica de disponibilidad",
      "Un cambio pequeño de texto al mes",
    ],
  },
  {
    name: "Cuidado Estándar",
    price: "Desde $39/mes",
    features: [
      "Todo lo del Cuidado Básico",
      "Cambios pequeños de contenido o imágenes",
      "Revisión básica de SEO",
      "Revisión mensual de visibilidad en Google/perfil",
    ],
  },
  {
    name: "Cuidado de Crecimiento",
    price: "Desde $49/mes",
    features: [
      "Todo lo del Cuidado Estándar",
      "Prioridad para cambios pequeños",
      "Revisión de enlaces o campañas QR",
      "Sugerencias mensuales de mejora",
    ],
  },
];

export const metadata = {
  title: {
    absolute: "Precios | Pixel & Panel — Sitios Web, Letreros y Visibilidad",
  },
  description:
    "Precios iniciales para negocios del sureste de Texas. Pixel & Panel ofrece sitios web, visibilidad local, códigos QR y opciones de letreros e impresión.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/precios",
    languages: {
      "en-US": "https://pixelnpanel.com/pricing",
      "es-US": "https://pixelnpanel.com/es/precios",
    },
  },
  openGraph: {
    title: "Precios | Pixel & Panel — Sitios Web, Letreros y Visibilidad",
    description:
      "Precios iniciales para sitios web, visibilidad local, códigos QR y opciones de letreros e impresión.",
    url: "https://pixelnpanel.com/es/precios",
    locale: "es_US",
  },
};

export default function SpanishPricingPage() {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-4 pt-28 text-center text-white md:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.1)_1px,transparent_0)] [background-size:36px_36px]" />
        <div className="relative mx-auto max-w-4xl pb-20">
          <p className="section-label">Precios iniciales</p>
          <h1 className="text-white">Precios iniciales para negocios locales</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
            Paquetes claros para negocios del sureste de Texas que necesitan sitio web,
            mejor visibilidad en Google o una base digital más profesional.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/es/solicitar-cotizacion" className="btn-amber justify-center">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-ghost justify-center">
              Chequeo gratis
            </Link>
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="website-packages-heading">
        <div className="container-px">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="section-label text-[#0369A1]">Sitios web</p>
            <h2 id="website-packages-heading" className="text-[#1C1917]">
              Paquetes de sitios web
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Los precios son iniciales. Proyectos con más páginas, integraciones o tiempos urgentes pueden requerir una cotización distinta.
            </p>
          </div>
          <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {websitePackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="care-heading">
        <div className="container-px">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="section-label text-[#0369A1]">Soporte mensual opcional</p>
            <h2 id="care-heading" className="text-[#1C1917]">
              Planes de cuidado del sitio web
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Soporte mensual opcional para cambios pequeños, pruebas de formularios, revisión básica de SEO y mantenimiento práctico.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {carePlans.map((plan) => (
              <article key={plan.name} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm">
                <h3 className="text-[#1C1917]">{plan.name}</h3>
                <p className="mt-3 font-heading text-xl font-extrabold text-[#0369A1]">{plan.price}</p>
                <ul className="mt-5 grid gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-[#F59E0B]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="signage-pricing-heading">
        <div className="container-px">
          <div className="grid gap-8 rounded-xl border border-[#0369A1]/20 bg-white p-6 shadow-xl md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="section-label text-[#F59E0B]">Letreros e impresión</p>
              <h2 id="signage-pricing-heading" className="text-[#1C1917]">
                Los proyectos de letreros e impresión se cotizan individualmente.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                El precio depende del tamaño, material, cantidad, diseño e instalación. Comparte los detalles y Pixel &amp; Panel te recomendará una opción práctica.
              </p>
              <Link
                href="/es/solicitar-cotizacion?product=Proyecto%20de%20letreros%20o%20impresi%C3%B3n&category=Letreros%20e%20Impresi%C3%B3n"
                className="btn-amber mt-6"
              >
                Cotizar letreros <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Banners", "Letreros de jardín", "Gráficos para vehículos", "Letreros de negocio", "Tarjetas", "Flyers", "Menús", "Posters"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-[#FAF8F4] p-4 text-sm font-semibold text-slate-700">
                  <QrCode className="h-4 w-4 shrink-0 text-[#F59E0B]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-24" aria-labelledby="pricing-cta">
        <div className="mx-auto max-w-5xl rounded-xl bg-[#0C1E3C] px-6 py-14 text-center text-white shadow-2xl md:px-12">
          <h2 id="pricing-cta" className="text-white">
            ¿No sabes qué paquete escoger?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/75">
            Empieza con una cotización o con el chequeo gratis de visibilidad. Pixel &amp; Panel te ayudará a elegir el siguiente paso.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/es/solicitar-cotizacion" className="btn-amber justify-center">
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

function PackageCard({ pkg }) {
  const dark = pkg.tone === "dark";

  return (
    <article
      className="flex h-full flex-col rounded-xl border p-6 shadow-lg"
      style={{
        background: dark ? "#0C1E3C" : "white",
        borderColor: pkg.tone ? "#F59E0B" : "#e2e8f0",
      }}
    >
      {pkg.badge && (
        <span className="mb-4 w-fit rounded-full bg-[#F59E0B] px-3 py-1 font-heading text-xs font-extrabold uppercase tracking-[0.08em] text-[#1C1917]">
          {pkg.badge}
        </span>
      )}
      <h3 className={dark ? "text-white" : "text-[#1C1917]"}>{pkg.name}</h3>
      <p className={dark ? "mt-4 text-sm leading-7 text-white/72" : "mt-4 text-sm leading-7 text-slate-600"}>
        {pkg.description}
      </p>
      <p className={dark ? "mt-5 font-heading text-2xl font-black text-white" : "mt-5 font-heading text-2xl font-black text-[#1C1917]"}>
        {pkg.price}
      </p>
      <div className={dark ? "mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-white/76" : "mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700"}>
        <strong className="mb-1 block font-heading text-xs uppercase tracking-[0.08em] text-[#F59E0B]">
          Ideal para
        </strong>
        {pkg.bestFor}
      </div>
      <ul className="mt-5 grid flex-1 gap-3">
        {pkg.features.map((feature) => (
          <li key={feature} className={dark ? "flex gap-3 text-sm leading-6 text-white/84" : "flex gap-3 text-sm leading-6 text-slate-700"}>
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#F59E0B]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={pkg.href} className="btn-amber mt-6 justify-center whitespace-normal text-center">
        {pkg.cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
