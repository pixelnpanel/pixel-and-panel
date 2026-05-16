"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Search, Star } from "lucide-react";

const STEPS = [
  { num: "01", label: "Encontrado en Google", accent: "#0369A1" },
  { num: "02", label: "Notado en persona",    accent: "#F59E0B" },
  { num: "03", label: "Nuevo cliente",        accent: "#10B981" },
];

function ProgressBar({ color, labelIndex }) {
  const labels = ["Encontrado", "Notado", "Contactado"];
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
        {labels[labelIndex]}
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
    >
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="text-xs text-slate-500">letreros cerca de Beaumont TX</span>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="mb-0.5 text-[11px] font-medium text-[#0369A1]">pixelnpanel.com</p>
          <p className="mb-1 text-sm font-bold text-slate-800">Pixel &amp; Panel — Letreros y Sitios Web</p>
          <p className="mb-2 text-[11px] text-slate-500">Beaumont · Nederland · Port Arthur, TX</p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
            <span className="ml-1.5 text-[11px] text-slate-500">(409) 800-6139</span>
          </div>
        </div>
        <ProgressBar color="#0369A1" labelIndex={0} />
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
    >
      <div className="overflow-hidden rounded-xl bg-[#0C1E3C] p-5 text-center">
        <p className="mb-1 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
          Gran Apertura
        </p>
        <p className="mb-0.5 font-heading text-xl font-black text-white">Tu Negocio</p>
        <p className="mb-4 text-xs text-white/55">Beaumont, TX · (409) 000-0000</p>
        <div className="flex items-center justify-center gap-3 rounded-lg bg-white/10 p-3">
          <div className="grid h-10 w-10 shrink-0 grid-cols-3 gap-0.5 rounded bg-white p-1.5">
            {[1,1,1,1,0,1,1,1,1].map((v, i) => (
              <span key={i} className={`rounded-sm ${v ? "bg-[#1C1917]" : "bg-white"}`} />
            ))}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">Escanea para cotizar gratis</p>
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
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#F59E0B]">Notado</span>
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
    >
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">Nueva solicitud de cotización</p>
            <p className="text-[11px] text-slate-500">Ahora · desde tu sitio web</p>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="mb-1 text-sm font-semibold text-[#1C1917]">María G.</p>
          <p className="text-xs leading-relaxed text-slate-600">
            &quot;¡Hola! Necesito un banner para la gran apertura de mi negocio el próximo mes. ¿Me pueden ayudar?&quot;
          </p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg bg-[#F59E0B] py-1.5 text-xs font-bold text-[#1C1917]">
              Responder
            </button>
            <button className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs font-bold text-slate-600">
              Ver
            </button>
          </div>
        </div>
        <ProgressBar color="#10B981" labelIndex={2} />
      </div>
    </motion.div>
  );
}

export default function SpanishHeroVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 3), 3800);
    return () => clearInterval(timer);
  }, []);

  const current = STEPS[step];

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">

        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
            Cómo funciona
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

        <AnimatePresence mode="wait">
          {step === 0 && <StepGoogle key="g" />}
          {step === 1 && <StepSign key="s" />}
          {step === 2 && <StepLead key="l" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
