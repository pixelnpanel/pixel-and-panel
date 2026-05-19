"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  QrCode,
  Search,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

const STEPS = [
  { num: "01", label: "Found on Google",   accent: "#0369A1" },
  { num: "02", label: "Noticed in Person", accent: "#F59E0B" },
  { num: "03", label: "New Customer",      accent: "#10B981" },
];

function ProgressBar({ color }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.2, ease: "linear" }}
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
        {["Found", "Noticed", "Contacted"][STEPS.findIndex(s => s.accent === color)]}
      </span>
    </div>
  );
}

function StepGoogle() {
  return (
    <motion.div
      key="google"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-x-0 top-0"
    >
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500">signs near Beaumont TX</span>
        </div>

        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="mb-0.5 text-[11px] font-medium text-[#0369A1]">pixelnpanel.com</p>
          <p className="mb-1 text-sm font-bold text-slate-800">Pixel &amp; Panel — Signs &amp; Websites</p>
          <p className="mb-2 text-[11px] text-slate-500">Beaumont · Nederland · Port Arthur, TX</p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
            <span className="ml-1.5 text-[11px] text-slate-500">(409) 800-6139</span>
          </div>
        </div>

        <ProgressBar color="#0369A1" />
      </div>
    </motion.div>
  );
}

function StepSign() {
  return (
    <motion.div
      key="sign"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-x-0 top-0"
    >
      <div className="overflow-hidden rounded-xl bg-[#0C1E3C] p-5 text-center">
        <p className="mb-1 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
          Now Open
        </p>
        <p className="mb-0.5 font-heading text-xl font-black text-white">Your Business</p>
        <p className="mb-4 text-xs text-white/55">Beaumont, TX · (409) 000-0000</p>

        <div className="flex items-center justify-center gap-3 rounded-lg bg-white/10 p-3">
          <div className="grid h-10 w-10 shrink-0 grid-cols-3 gap-0.5 rounded bg-white p-1.5">
            {[1,1,1,1,0,1,1,1,1].map((v, i) => (
              <span key={i} className={`rounded-sm ${v ? "bg-[#1C1917]" : "bg-white"}`} />
            ))}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">Scan for a free quote</p>
            <p className="text-[11px] text-white/50">pixelnpanel.com</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-[#F59E0B]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.2, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#F59E0B]">Noticed</span>
        </div>
      </div>
    </motion.div>
  );
}

function StepLead() {
  return (
    <motion.div
      key="lead"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-x-0 top-0"
    >
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">New Quote Request</p>
            <p className="text-[11px] text-slate-500">Just now · from your website</p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="mb-1 text-sm font-semibold text-[#1C1917]">Maria G.</p>
          <p className="text-xs leading-relaxed text-slate-600">
            &quot;Hi! I need a vinyl banner for my grand opening next month. Can you help?&quot;
          </p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg bg-[#F59E0B] py-1.5 text-xs font-bold text-[#1C1917]">
              Reply
            </button>
            <button className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs font-bold text-slate-600">
              View
            </button>
          </div>
        </div>

        <ProgressBar color="#10B981" />
      </div>
    </motion.div>
  );
}

function HomepageVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 3), 3800);
    return () => clearInterval(timer);
  }, []);

  const current = STEPS[step];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[480px]"
      aria-label="Animated visual showing how Pixel & Panel helps local businesses get found and get customers"
    >
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">

        {/* Header row */}
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
            How it works
          </p>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === step ? "1.5rem" : "0.375rem",
                  backgroundColor: i === step ? s.accent : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Step label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22 }}
            className="mb-3 flex items-center gap-2"
          >
            <span className="font-heading text-xs font-black" style={{ color: current.accent }}>
              {current.num}
            </span>
            <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/65">
              {current.label}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Step content */}
        <div className="relative h-[278px] sm:h-[264px]">
          <AnimatePresence mode="wait">
            {step === 0 && <StepGoogle key="g" />}
            {step === 1 && <StepSign key="s" />}
            {step === 2 && <StepLead key="l" />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeClient() {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0369A1] pt-24 text-white md:pt-28" aria-labelledby="homepage-hero-title">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_58%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF8F4] to-transparent" />

        <div className="container-px relative grid items-center gap-10 pb-20 md:pb-24 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              </span>
              Serving Southeast Texas
            </motion.div>

            <motion.h1 id="homepage-hero-title" variants={fadeUp} className="font-heading text-[clamp(2.05rem,4.4vw,3.55rem)] font-black leading-[1.08] tracking-normal text-white">
              Website Design, Signs &amp; Print{" "}
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
    </div>
  );
}
