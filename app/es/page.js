import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  MapPinned,
  Megaphone,
  QrCode,
  Search,
  Store,
} from "lucide-react";

const services = [
  {
    title: "Sitios web",
    description:
      "Páginas rápidas y claras que explican tus servicios y hacen fácil llamar, escribir o pedir una cotización.",
    icon: Globe2,
  },
  {
    title: "SEO local y perfil de Google",
    description:
      "Mejoramos la información que clientes ven cuando buscan tu negocio en Google y mapas.",
    icon: MapPinned,
  },
  {
    title: "Letreros e impresión",
    description:
      "Letreros, banners, tarjetas, flyers y materiales impresos pensados para verse bien y guiar al siguiente paso.",
    icon: Store,
  },
  {
    title: "Códigos QR y captura de leads",
    description:
      "Conecta tus letreros, impresos y sitio web con códigos QR que llevan a llamadas, formularios, menús u ofertas.",
    icon: QrCode,
  },
];

const problems = [
  "Clientes no encuentran información clara en Google.",
  "El sitio web no convierte visitantes en llamadas o mensajes.",
  "Los letreros e impresos llaman la atención, pero no tienen un siguiente paso fácil.",
];

const reasons = [
  "Combinamos presencia digital, letreros, impresos y códigos QR en un sistema práctico.",
  "Trabajamos con negocios locales de Beaumont, Nederland, Port Arthur y el sureste de Texas.",
  "Hablamos claro: sin promesas falsas de rankings y sin reportes difíciles de entender.",
];

export const metadata = {
  title: {
    absolute: "Pixel & Panel | Sitios Web, Letreros y Códigos QR para Negocios Locales",
  },
  description:
    "Pixel & Panel ayuda a negocios del sureste de Texas con sitios web, letreros, materiales impresos, SEO local y campañas con códigos QR.",
  alternates: {
    canonical: "https://pixelnpanel.com/es",
    languages: {
      "en-US": "https://pixelnpanel.com/",
      "es-US": "https://pixelnpanel.com/es",
    },
  },
  openGraph: {
    title: "Pixel & Panel | Sitios Web, Letreros y Códigos QR para Negocios Locales",
    description:
      "Sitios web, letreros, materiales impresos, SEO local y campañas con códigos QR para negocios del sureste de Texas.",
    url: "https://pixelnpanel.com/es",
    locale: "es_US",
    type: "website",
  },
};

export default function SpanishHomePage() {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-4 pt-28 text-white md:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_62%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 pb-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100">
              <Search className="h-4 w-4 text-[#F59E0B]" />
              Tu visión. Más visible.
            </div>
            <h1 className="max-w-4xl text-white">
              Sitios web, letreros y códigos QR para negocios del sureste de Texas
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              Pixel &amp; Panel ayuda a negocios locales a ser encontrados en línea,
              verse mejor en el mundo real y convertir la atención en llamadas,
              mensajes y solicitudes de cotización.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/es/solicitar-cotizacion" className="btn-amber justify-center">
                Solicitar una cotización <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/es/precios" className="btn-ghost justify-center">
                Ver precios
              </Link>
              <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-ghost justify-center">
                Chequeo gratis
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Google", "Que más clientes te encuentren"],
              ["Sitio web", "Que entiendan lo que haces"],
              ["Letreros", "Que te noten en la calle"],
              ["QR", "Que escaneen y tomen acción"],
            ].map(([title, copy]) => (
              <article key={title} className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl">
                <Megaphone className="mb-5 h-7 w-7 text-[#F59E0B]" />
                <h2 className="text-xl text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="problem-heading">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label text-[#0369A1]">El problema</p>
            <h2 id="problem-heading" className="text-[#1C1917]">
              Muchos negocios sí tienen buenas ofertas, pero el camino para encontrarlos no está claro.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              Tus clientes se mueven entre Google, tu sitio web, tus letreros y tus datos de contacto.
              Cada parte debe ayudarles a dar el siguiente paso.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problems.map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <BadgeCheck className="mb-5 h-6 w-6 text-[#F59E0B]" />
                <h3 className="text-lg text-[#1C1917]">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="services-heading">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label text-[#0369A1]">Servicios</p>
            <h2 id="services-heading" className="text-[#1C1917]">
              Ayudamos a que más clientes encuentren tu negocio en Google, en tu sitio web y en tus letreros.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0369A1]/10 text-[#0369A1]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl text-[#1C1917]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="why-heading">
        <div className="container-px grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-label text-[#0369A1]">Por qué Pixel & Panel</p>
            <h2 id="why-heading" className="text-[#1C1917]">
              Visibilidad práctica para negocios locales.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Pixel &amp; Panel conecta lo digital y lo físico para que tu negocio sea
              más fácil de encontrar, entender y contactar.
            </p>
          </div>
          <div className="grid gap-4">
            {reasons.map((item) => (
              <article key={item} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                <p className="leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-24" aria-labelledby="spanish-home-cta">
        <div className="mx-auto max-w-6xl rounded-xl bg-[#1C1917] px-6 py-14 text-center text-white shadow-2xl md:px-12">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
            Empezar
          </p>
          <h2 id="spanish-home-cta" className="mx-auto mt-4 max-w-3xl text-white">
            Convierte visitantes en llamadas, mensajes y solicitudes de cotización.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Cuéntanos qué necesita tu negocio y Pixel &amp; Panel te recomendará un siguiente paso práctico.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/es/solicitar-cotizacion" className="btn-amber justify-center">
              Solicitar una cotización <ArrowRight className="h-4 w-4" />
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
