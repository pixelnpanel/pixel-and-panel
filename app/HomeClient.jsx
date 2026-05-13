"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MonitorSmartphone,
  MousePointerClick,
  PanelTop,
  QrCode,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import dynamic from "next/dynamic";

const HomeSections = dynamic(() => import("@/app/HomeSections"));

function HomepageVisual() {
  const qrCells = [
    1, 1, 1, 0, 1, 0,
    1, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 0, 0,
    0, 0, 1, 0, 1, 1,
    1, 0, 0, 1, 0, 1,
    0, 1, 1, 0, 1, 0,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[540px]"
      aria-label="Abstract visual showing a website, signage panel, and QR campaign working together"
    >
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="rounded-xl border border-white/10 bg-[#1C1917]/35 p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
            <span className="h-3 w-3 rounded-full bg-[#0EA5E9]" />
            <span className="h-3 w-3 rounded-full bg-white/35" />
            <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/65">
              pixelnpanel.com
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-xl bg-white p-4 text-[#1C1917] shadow-xl">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#0369A1]">
                    Website
                  </p>
                  <p className="mt-1 font-heading text-xl font-black">
                    Quote-ready page
                  </p>
                </div>
                <MonitorSmartphone className="h-8 w-8 text-[#0EA5E9]" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-11/12 rounded-full bg-slate-200" />
                <div className="h-3 w-8/12 rounded-full bg-slate-200" />
                <div className="h-3 w-10/12 rounded-full bg-slate-200" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[#FAF8F4] p-3">
                  <Search className="mb-2 h-5 w-5 text-[#0369A1]" />
                  <p className="text-xs font-bold">Google-ready</p>
                </div>
                <div className="rounded-lg bg-[#F59E0B]/15 p-3">
                  <MousePointerClick className="mb-2 h-5 w-5 text-[#F59E0B]" />
                  <p className="text-xs font-bold">Easy to contact</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl border border-[#F59E0B]/35 bg-[#F59E0B]/15 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <PanelTop className="h-6 w-6 text-[#F59E0B]" />
                  <p className="font-heading text-sm font-black uppercase tracking-[0.12em] text-white">
                    Sign
                  </p>
                </div>
                <div className="rounded-lg bg-[#F59E0B] p-4 text-center font-heading text-lg font-black uppercase tracking-[0.08em] text-[#1C1917]">
                  Call Today
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-20 w-20 shrink-0 grid-cols-6 gap-1 rounded-lg bg-white p-2">
                    {qrCells.map((cell, index) => (
                      <span
                        key={`${cell}-${index}`}
                        className={cell ? "rounded-sm bg-[#1C1917]" : "rounded-sm bg-slate-200"}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-black uppercase tracking-[0.12em] text-white">
                      QR Code
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      See who visits from your signs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Found", "Noticed", "Contacted"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.07] px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeClient({ faqs }) {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0369A1] pt-24 text-white md:pt-28" aria-labelledby="homepage-hero-title">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_58%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF8F4] to-transparent" />

        <div className="container-px relative grid items-center gap-10 pb-20 md:pb-24 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              Serving Southeast Texas
            </motion.div>

            <motion.h1 id="homepage-hero-title" variants={fadeUp} className="font-heading text-[clamp(2.05rem,4.4vw,3.55rem)] font-black leading-[1.08] tracking-normal text-white">
              Website Design, Signs &amp; Print
              <span className="mt-2 block text-[#F59E0B]">
                for Southeast Texas Businesses
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              Pixel &amp; Panel helps local businesses in Southeast Texas show up on Google, stand out with professional signs and print, and make it easy for customers to call or reach out.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
              <Link href="/quote-request" className="btn-amber w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/digital" className="btn-ghost w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Digital Services
              </Link>
              <Link href="/signage" className="btn-ghost w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Signage &amp; Print
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 grid gap-3 text-sm text-white/68 sm:grid-cols-3">
              {["Your Vision. Made Visible.", "Websites, signs, and print — all working together", "Quote-first process"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F59E0B]" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <HomepageVisual />
        </div>
      </section>

      <HomeSections faqs={faqs} />
    </div>
  );
}
