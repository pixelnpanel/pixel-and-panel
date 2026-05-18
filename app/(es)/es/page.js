import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  MapPinned,
  QrCode,
  Store,
} from "lucide-react";
import SpanishHeroVisual from "./SpanishHeroVisual";

const services = [
  {
    title: "Sitios web",
    description:
      "Páginas rápidas y claras que explican tus servicios y hacen fácil llamar, escribir o pedir una cotización.",
    icon: Globe2,
  },
  {
    title: "Aparecer en Google",
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
    title: "Códigos QR para letreros",
    description:
      "Agrega códigos QR a tus letreros, banners y tarjetas para conectar a los clientes con tu sitio web o formulario de contacto.",
    icon: QrCode,
  },
];

const problems = [
  "Clientes no encuentran información clara en Google.",
  "El sitio web no convierte visitantes en llamadas o mensajes.",
  "Los letreros e impresos llaman la atención, pero no tienen un siguiente paso fácil.",
];

const reasons = [
  "Tu sitio web, letreros e impresión — trabajando juntos para traerte más clientes.",
  "Trabajamos con negocios locales de Beaumont, Nederland, Port Arthur y el sureste de Texas.",
  "Hablamos claro: sin promesas falsas de rankings y sin reportes difíciles de entender.",
];

export const metadata = {
  metadataBase: new URL("https://pixelnpanel.com"),
  title: {
    absolute: "Pixel & Panel | Diseño Web, Letreros e Impresión para Negocios del Sureste de Texas",
  },
  description:
    "Pixel & Panel ayuda a negocios del sureste de Texas a ser encontrados en Google, destacarse con letreros profesionales e impresión, y hacer más fácil que los clientes llamen o escriban.",
  alternates: {
    canonical: "https://pixelnpanel.com/es",
    languages: {
      "en-US": "https://pixelnpanel.com/",
      "es-US": "https://pixelnpanel.com/es",
    },
  },
  openGraph: {
    title: "Pixel & Panel | Diseño Web, Letreros e Impresión para Negocios del Sureste de Texas",
    description:
      "Pixel & Panel ayuda a negocios del sureste de Texas a ser encontrados en Google, destacarse con letreros profesionales e impresión, y hacer más fácil que los clientes llamen o escriban.",
    url: "https://pixelnpanel.com/es",
    locale: "es_US",
    type: "website",
  },
};

export default function SpanishHomePage() {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0369A1] pt-24 text-white md:pt-28" aria-labelledby="spanish-homepage-hero-title">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_58%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF8F4] to-transparent" />
        <div className="container-px relative grid items-center gap-10 pb-20 md:pb-24 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              </span>
              Sirviendo el sureste de Texas
            </div>
            <h1 className="font-heading text-[clamp(2.05rem,4.4vw,3.55rem)] font-black leading-[1.08] tracking-normal text-white">
              Diseño web, letreros e impresión{" "}
              <span className="mt-2 block text-[#F59E0B]">
                para negocios del sureste de Texas
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              Pixel &amp; Panel ayuda a negocios locales a ser encontrados en Google, destacarse con letreros profesionales e impresión, y hacer más fácil que los clientes llamen o escriban.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
              <Link href="/es/solicitar-cotizacion" className="btn-amber w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Solicitar una cotización <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/es/precios" className="btn-ghost w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Ver precios
              </Link>
              <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-ghost w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Chequeo gratis
              </Link>
            </div>
          </div>

          <SpanishHeroVisual />
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
