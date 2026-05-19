import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCardEs from "@/components/learning-center/ArticleCardEs";
import {
  getPostsByCategoryEs,
  learningCenterPostsEs,
} from "@/lib/learning-center-posts-es";

export const metadata = {
  title: {
    absolute:
      "Centro de Aprendizaje | Pixel & Panel — Consejos de Letreros, Sitios Web y Visibilidad Local",
  },
  description:
    "Guías útiles de Pixel & Panel sobre sitios web, letreros, campañas QR, SEO local y visibilidad para negocios del sureste de Texas.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/centro-de-aprendizaje",
    languages: {
      "en-US": "https://pixelnpanel.com/learning-center",
      "es-US": "https://pixelnpanel.com/es/centro-de-aprendizaje",
    },
  },
  openGraph: {
    title: "Centro de Aprendizaje | Pixel & Panel",
    description:
      "Consejos prácticos sobre sitios web, letreros, SEO local, Perfil de Google, QR y visibilidad para negocios locales.",
    url: "https://pixelnpanel.com/es/centro-de-aprendizaje",
    locale: "es_US",
    type: "website",
  },
};

const featuredSlugs = [
  "checklist-sitio-web-negocios-locales-nuevos",
  "como-aparecer-en-google-localmente",
  "codigos-qr-en-letreros-e-impresos",
];

const featuredPosts = featuredSlugs
  .map((slug) => learningCenterPostsEs.find((post) => post.slug === slug))
  .filter(Boolean);

const signagePosts = getPostsByCategoryEs("Letreros e Impresión");
const websiteAndSeoPosts = [
  ...getPostsByCategoryEs("Sitios Web"),
  ...getPostsByCategoryEs("SEO Local"),
];
const qrPosts = getPostsByCategoryEs("Campañas QR");

export default function SpanishLearningCenterIndexPage() {
  return (
    <main className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto max-w-6xl pb-20 md:pb-24">
          <p className="section-label" style={{ color: "#F59E0B" }}>
            Centro de Aprendizaje
          </p>
          <h1 className="mt-4 text-white">Centro de Aprendizaje</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/78">
            Consejos útiles para negocios del sureste de Texas que quieren mejores sitios web,
            letreros más fuertes, más visibilidad en Google y más solicitudes de cotización.
          </p>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="section-label text-[#0369A1]">Artículos destacados</p>
              <h2 className="text-[#1C1917]">Empieza aquí</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredPosts.map((post) => (
              <ArticleCardEs key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="section-label text-[#0369A1]">Categorías</p>
          <h2 className="text-[#1C1917]">Explora por tema</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Letreros e Impresión",
              "Sitios Web",
              "SEO Local",
              "Perfil de Google",
              "Campañas QR",
              "Consejos de Marketing",
              "Visibilidad del Negocio",
            ].map((category) => (
              <span
                key={category}
                className="rounded-full border border-slate-200 bg-[#FAF8F4] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-600"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <div className="mb-7">
            <p className="section-label text-[#0369A1]">Consejos de letreros e impresión</p>
            <h2 className="text-[#1C1917]">Opciones prácticas para visibilidad local</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {signagePosts.map((post) => (
              <ArticleCardEs key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <p className="section-label text-[#0369A1]">Sitios web y SEO local</p>
            <h2 className="text-[#1C1917]">Construye bases locales fuertes</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {websiteAndSeoPosts.map((post) => (
              <ArticleCardEs key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <div className="mb-7">
            <p className="section-label text-[#0369A1]">Ideas para campañas QR</p>
            <h2 className="text-[#1C1917]">Conecta letreros e impresos con acciones reales</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {qrPosts.map((post) => (
              <ArticleCardEs key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-6xl rounded-xl bg-[#1C1917] p-8 text-white shadow-2xl md:p-10">
          <p className="section-label" style={{ color: "#F59E0B" }}>Siguiente paso</p>
          <h2 className="mt-3 text-white">¿Necesitas un plan práctico de visibilidad?</h2>
          <p className="mt-3 max-w-3xl text-white/75">
            Empieza con un chequeo gratis de visibilidad o solicita una cotización cuando estés listo.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-amber justify-center">
              Chequeo gratis de visibilidad <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/es/solicitar-cotizacion" className="btn-ghost justify-center">
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
