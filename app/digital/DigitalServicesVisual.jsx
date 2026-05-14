"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, MapPin, MessageSquare, Star, Zap } from "lucide-react";

const STEPS = [
  { num: "01", label: "Your Website Goes Live",   accent: "#0EA5E9" },
  { num: "02", label: "You Show Up on Google",    accent: "#F59E0B" },
  { num: "03", label: "Leads Start Coming In",    accent: "#10B981" },
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

function StepWebsite() {
  return (
    <motion.div key="web" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <div className="ml-2 flex-1 rounded bg-white px-2 py-0.5">
              <p className="text-[9px] text-slate-400">pixelnpanel.com/your-business</p>
            </div>
          </div>
          <div className="bg-[#0369A1] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">Your Business</p>
            <p className="text-sm font-black text-white leading-snug">Professional Signs &amp; Service for Southeast Texas</p>
            <div className="mt-3 flex gap-2">
              <span className="rounded bg-[#F59E0B] px-2 py-1 text-[9px] font-bold text-[#1C1917]">Get a Free Quote →</span>
              <span className="rounded border border-white/30 px-2 py-1 text-[9px] text-white/80">Our Services</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-[#0EA5E9]" />
          <p className="text-xs font-semibold text-slate-700">Your website is live</p>
          <span className="ml-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-[#0369A1]">Online</span>
        </div>
        <Bar color="#0EA5E9" />
      </div>
    </motion.div>
  );
}

function StepGoogle() {
  return (
    <motion.div key="google" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="text-xs text-slate-500">signs near Beaumont TX</span>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg border-2 border-[#F59E0B]/30 bg-[#F59E0B]/5 p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium text-[#0369A1]">pixelnpanel.com</p>
                <p className="text-sm font-bold text-slate-800">Your Business — Signs &amp; Websites</p>
                <p className="text-[11px] text-slate-500">Beaumont, TX</p>
              </div>
              <span className="rounded bg-[#F59E0B] px-1.5 py-0.5 text-[9px] font-bold text-[#1C1917]">#1</span>
            </div>
            <div className="mt-2 flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />)}
              <span className="ml-1 text-[11px] text-slate-500">5.0 (24 reviews)</span>
            </div>
          </div>
        </div>
        <Bar color="#F59E0B" />
      </div>
    </motion.div>
  );
}

function StepLead() {
  return (
    <motion.div key="lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">New Quote Request</p>
            <p className="text-[11px] text-slate-500">Just now · from your website</p>
          </div>
          <Zap className="ml-auto h-4 w-4 text-emerald-500" />
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="mb-1 text-sm font-semibold text-[#1C1917]">Carlos R.</p>
          <p className="text-xs leading-relaxed text-slate-600">
            "Need a storefront sign for my new shop. How soon can you help?"
          </p>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg bg-[#F59E0B] py-1.5 text-xs font-bold text-[#1C1917]">Reply</button>
            <button className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs font-bold text-slate-600">View</button>
          </div>
        </div>
        <Bar color="#10B981" />
      </div>
    </motion.div>
  );
}

export default function DigitalServicesVisual() {
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
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">What we do</p>
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
          {step === 0 && <StepWebsite key="w" />}
          {step === 1 && <StepGoogle key="g" />}
          {step === 2 && <StepLead key="l" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
