"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import { portfolioFiltersEs, portfolioProjectsEs } from "@/lib/portfolio-projects-es";

const processCardsEs = [
  {
    title: "Entendemos el objetivo",
    description:
      "Empezamos con lo que el negocio necesita hoy: más visibilidad, llamadas, solicitudes de cotización, visitas o mejor presencia local.",
  },
  {
    title: "Diseñamos para visibilidad",
    description:
      "Cada concepto prioriza comunicación clara, estructura práctica y branding fácil de reconocer en condiciones reales.",
  },
  {
    title: "Conectamos lo digital con lo físico",
    description:
      "Sitio web, letreros, impresos y rutas QR se planean para apoyar el mismo siguiente paso.",
  },
  {
    title: "Facilitamos la solicitud de cotización",
    description:
      "Cada dirección de proyecto incluye CTA claro para avanzar rápido con una solicitud real.",
  },
];

const SERVICE_LINKS_ES = {
  "Sitios Web":              { label: "Ver Nuestros Servicios Web",    href: "/es/servicios-digitales" },
  "Gráficos para Vehículos": { label: "Ver Nuestros Letreros",         href: "/es/letreros" },
  "Letreros e Impresión":    { label: "Ver Nuestros Letreros",         href: "/es/letreros" },
  "Campañas QR":             { label: "Ver Nuestros Servicios Web",    href: "/es/servicios-digitales" },
  "Tarjetas y Volantes":     { label: "Ver Nuestros Letreros",         href: "/es/letreros" },
  "Branding":                { label: "Ver Nuestros Servicios Web",    href: "/es/servicios-digitales" },
}

function createQuoteLinkEs(project) {
  const params = new URLSearchParams();
  params.set("product", project.quoteProduct);
  params.set("category", "Portafolio");
  return `/es/solicitar-cotizacion?${params.toString()}`;
}

function getLabelClassesEs(label) {
  if (label === "Proyecto Real") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (label === "Demo Interna") {
    return "border border-[#0369A1]/20 bg-[#0369A1]/10 text-[#0369A1]";
  }
  return "border border-[#F59E0B]/25 bg-[#F59E0B]/15 text-[#1C1917]";
}

export default function PortfolioClientEs() {
  const [activeFilter, setActiveFilter] = useState("Todo");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todo") {
      return portfolioProjectsEs;
    }
    return portfolioProjectsEs.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="pnp-mobile-hero relative overflow-hidden bg-[#0C1E3C] pt-24 text-white md:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="container-px relative pb-20 md:pb-24">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.p variants={fadeUp} className="section-label !text-[#F59E0B]">
              Portafolio
            </motion.p>
            <motion.h1 variants={fadeUp} className="pnp-mobile-hero-title mt-4 text-white">
              Portafolio{" "}
              <span className="text-[#F59E0B]">en crecimiento</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="pnp-mobile-hero-copy mx-auto mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              Pixel &amp; Panel está construyendo un portafolio de sitios web, letreros, materiales impresos, campañas con códigos QR y proyectos de visibilidad para negocios del sureste de Texas.
            </motion.p>
            <motion.p variants={fadeUp} className="pnp-mobile-hero-copy mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              Algunos ejemplos pueden ser conceptos de muestra o demos internas creadas para mostrar estilo, diseño y posibilidades de servicio. Los proyectos reales de clientes se agregarán conforme se completen.
            </motion.p>
            <motion.div variants={fadeUp} className="pnp-mobile-hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/es/solicitar-cotizacion" className="btn-amber w-full justify-center sm:w-auto">
                Solicitar cotización <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-ghost w-full justify-center sm:w-auto">
                Chequeo gratis de visibilidad
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-base pb-10">
        <div className="container-px">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-[#1C1917]">Explora tipos de proyecto</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
              {portfolioFiltersEs.map((filter) => {
                const isActive = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={
                      isActive
                        ? "rounded-full border border-[#F59E0B] bg-[#F59E0B] px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.12em] text-[#1C1917] transition sm:px-5"
                        : "rounded-full border border-slate-300 bg-white px-4 py-2 font-heading text-xs font-bold uppercase tracking-[0.12em] text-slate-600 transition hover:border-[#0369A1]/35 hover:text-[#0369A1] sm:px-5"
                    }
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-px">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <motion.article key={project.slug} variants={fadeUp} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0369A1]/10">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#E0F2FE_0%,#FAF8F4_100%)] p-6 text-center">
                      <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1]">
                        Vista previa de portafolio
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex grow flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {project.category}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getLabelClassesEs(project.label)}`}>
                      {project.label}
                    </span>
                  </div>

                  <h3 className="text-[#1C1917]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-5">
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      Servicios involucrados
                    </p>
                    <ul className="mt-3 grid gap-2">
                      {project.services.map((service) => (
                        <li key={service} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0369A1]" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Enfoque
                    </p>
                    <p className="mt-2 text-sm text-slate-700">{project.focusArea}</p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    {SERVICE_LINKS_ES[project.category] && (
                      <Link href={SERVICE_LINKS_ES[project.category].href} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0369A1]/30 bg-[#0369A1]/5 px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:border-[#0369A1] hover:bg-[#0369A1]/10">
                        {SERVICE_LINKS_ES[project.category].label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    <Link href={createQuoteLinkEs(project)} className="inline-flex items-center justify-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#F59E0B] transition hover:text-[#F59E0B]/70">
                      Solicitar un proyecto similar <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="font-heading text-lg font-bold text-[#1C1917]">
                Estamos preparando más ejemplos de portafolio.
              </p>
              <p className="mt-3 text-slate-600">
                Usa el formulario de cotización y cuéntanos tu objetivo para recomendarte el mejor siguiente paso.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-base bg-white">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#0369A1]">
              Proceso
            </p>
            <h2 className="mt-4 text-[#1C1917]">Cómo trabajamos cada proyecto</h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processCardsEs.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm">
                <h3 className="text-xl text-[#1C1917]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-16 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-6xl rounded-xl bg-[#1C1917] px-6 py-14 text-center text-white shadow-2xl md:px-12">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
            Siguiente paso
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-white">¿Tienes un proyecto en mente?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Cuéntale a Pixel &amp; Panel qué necesitas, y te recomendaremos la mejor opción para tu sitio web, letreros o visibilidad local.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/es/solicitar-cotizacion" className="btn-amber w-full justify-center sm:w-auto">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/es/chequeo-gratis-de-visibilidad" className="btn-ghost w-full justify-center sm:w-auto">
              Chequeo gratis de visibilidad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
