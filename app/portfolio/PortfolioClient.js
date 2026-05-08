"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import { portfolioFilters, portfolioProjects } from "@/lib/portfolio-projects";

const processCards = [
  {
    title: "Understand the goal",
    description:
      "We start with what the business needs now: awareness, calls, quote requests, walk-ins, or a stronger local presence.",
  },
  {
    title: "Design for visibility",
    description:
      "Each concept is built for clear communication, practical layout, and branding that is easy to recognize in real-world conditions.",
  },
  {
    title: "Connect online and offline",
    description:
      "Web pages, signs, print materials, and QR paths are planned to support the same next step instead of disconnected touchpoints.",
  },
  {
    title: "Make it easy to request a quote",
    description:
      "Every project direction includes a clear CTA so businesses can move forward quickly with a real request.",
  },
];

function createQuoteLink(project) {
  const params = new URLSearchParams();
  params.set("product", project.quoteProduct);
  params.set("category", project.category);
  return `/quote-request?${params.toString()}`;
}

function getLabelClasses(label) {
  if (label === "Real Project") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (label === "Internal Demo") {
    return "border border-[#0369A1]/20 bg-[#0369A1]/10 text-[#0369A1]";
  }
  return "border border-[#F59E0B]/25 bg-[#F59E0B]/15 text-[#1C1917]";
}

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState("All Work");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All Work") {
      return portfolioProjects;
    }
    return portfolioProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0369A1] pt-24 text-white md:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_58%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF8F4] to-transparent" />

        <div className="container-px relative pb-20 md:pb-24">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.p variants={fadeUp} className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
              Portfolio
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 font-heading text-[clamp(2.1rem,4.4vw,3.6rem)] font-black leading-[1.08] tracking-normal text-white">
              Portfolio{" "}
              <span className="text-[#F59E0B]">Coming Together</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              Pixel &amp; Panel is building a portfolio of websites, signage, print materials, QR campaigns, and brand visibility projects for Southeast Texas businesses.
            </motion.p>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
              Some examples may be sample concepts or internal demos created to show style, layout, and service possibilities. Real client projects will be added as work is completed.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/quote-request" className="btn-amber w-full justify-center sm:w-auto">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/free-visibility-check" className="btn-ghost w-full justify-center sm:w-auto">
                Free Visibility Check
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-base pb-10">
        <div className="container-px">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-[#1C1917]">Browse Project Types</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
              {portfolioFilters.map((filter) => {
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
                      alt={`${project.title} portfolio preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#E0F2FE_0%,#FAF8F4_100%)] p-6 text-center">
                      <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1]">
                        Portfolio Preview
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex grow flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {project.category}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getLabelClasses(project.label)}`}>
                      {project.label}
                    </span>
                  </div>

                  <h3 className="text-[#1C1917]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-5">
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      Services Involved
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
                      Focus Area
                    </p>
                    <p className="mt-2 text-sm text-slate-700">{project.location}</p>
                  </div>

                  <div className="mt-6">
                    <Link href={createQuoteLink(project)} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:text-[#F59E0B]">
                      Request Similar Project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="font-heading text-lg font-bold text-[#1C1917]">
                More portfolio examples are being prepared.
              </p>
              <p className="mt-3 text-slate-600">
                Use the quote request form to share your project goals and we will recommend the best next step.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-base bg-white">
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#0369A1]">
              Process
            </p>
            <h2 className="mt-4 text-[#1C1917]">How We Approach Each Project</h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processCards.map((card) => (
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
            Next Step
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-white">Have a project in mind?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Tell Pixel &amp; Panel what you need, and we&apos;ll recommend the right website, signage, or visibility option.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote-request" className="btn-amber w-full justify-center sm:w-auto">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/free-visibility-check" className="btn-ghost w-full justify-center sm:w-auto">
              Free Visibility Check
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
