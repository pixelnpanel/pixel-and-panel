"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ClipboardList, Search } from "lucide-react";

const STEPS = [
  { num: "01", label: "You Tell Us What You Need", accent: "#0EA5E9" },
  { num: "02", label: "We Review Your Project",    accent: "#F59E0B" },
  { num: "03", label: "You Get Your Quote",        accent: "#10B981" },
];

function Bar({ color }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ duration: 3.2, ease: "linear" }} />
      </div>
    </div>
  );
}

function StepForm() {
  return (
    <motion.div key="form" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-bold text-slate-500">Your project details</p>
        <div className="space-y-2.5">
          {[
            { label: "Your Name", value: "Maria Gonzalez" },
            { label: "What do you need?", value: "4×8 vinyl banner + yard signs" },
            { label: "Timeline", value: "Need it within 2 weeks" },
          ].map(({ label, value }, i) => (
            <motion.div key={label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-xs font-medium text-slate-700">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <Bar color="#0EA5E9" />
      </div>
    </motion.div>
  );
}

function StepReview() {
  return (
    <motion.div key="review" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-col items-center py-4 text-center">
          <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F59E0B]/10">
            <Search className="h-7 w-7 text-[#F59E0B]" />
            <motion.div className="absolute inset-0 rounded-full border-2 border-[#F59E0B]"
              animate={{ scale: [1, 1.18, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <p className="font-heading text-sm font-bold text-[#1C1917]">Reviewing your project</p>
          <p className="mt-1 text-xs text-slate-500">We read every request personally</p>
          <div className="mt-4 w-full space-y-2 text-left">
            {["Checking material options", "Estimating production time", "Preparing your quote"].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.4 }}
                className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <motion.div className="h-2 w-2 rounded-full bg-[#F59E0B]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }} />
                <span className="text-xs text-slate-600">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <Bar color="#F59E0B" />
      </div>
    </motion.div>
  );
}

function StepQuote() {
  return (
    <motion.div key="quote" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <ClipboardList className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">Your Quote is Ready</p>
            <p className="text-[11px] text-slate-500">Responded within 1 business day</p>
          </div>
        </div>
        <div className="space-y-2 rounded-xl bg-slate-50 p-3">
          {[
            { item: "4×8 Vinyl Banner (full color)", price: "From $79" },
            { item: "Yard Signs × 10 (double-sided)", price: "From $120" },
          ].map(({ item, price }) => (
            <div key={item} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span className="text-xs text-slate-600">{item}</span>
              </div>
              <span className="text-xs font-bold text-[#0369A1]">{price}</span>
            </div>
          ))}
          <div className="border-t border-slate-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1C1917]">Estimated Total</span>
              <span className="font-heading text-sm font-black text-[#F59E0B]">From $199</span>
            </div>
          </div>
        </div>
        <Bar color="#10B981" />
      </div>
    </motion.div>
  );
}

export default function QuoteVisual() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 3), 3800);
    return () => clearInterval(t);
  }, []);
  const current = STEPS[step];
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Quote process</p>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <button key={i} onClick={() => setStep(i)} className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: i === step ? "1.5rem" : "0.375rem", backgroundColor: i === step ? s.accent : "rgba(255,255,255,0.25)" }} />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.22 }} className="mb-3 flex items-center gap-2">
            <span className="font-heading text-xs font-black" style={{ color: current.accent }}>{current.num}</span>
            <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/65">{current.label}</span>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {step === 0 && <StepForm key="f" />}
          {step === 1 && <StepReview key="r" />}
          {step === 2 && <StepQuote key="q" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
