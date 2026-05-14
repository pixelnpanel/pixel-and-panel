"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QrCode } from "lucide-react";

const STEPS = [
  { num: "01", label: "Vinyl Banner",      accent: "#0EA5E9" },
  { num: "02", label: "Yard Sign",         accent: "#F59E0B" },
  { num: "03", label: "Vehicle Graphic",   accent: "#10B981" },
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

function StepBanner() {
  return (
    <motion.div key="banner" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">13oz Vinyl Banner · 4ft × 8ft</p>
        <div className="relative overflow-hidden rounded-lg bg-[#0C1E3C] px-5 py-4 text-center shadow-inner">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />
          <p className="relative font-heading text-[10px] font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Grand Opening</p>
          <p className="relative mt-0.5 font-heading text-xl font-black text-white">Your Business Name</p>
          <p className="relative mt-1 text-xs text-white/60">Beaumont, TX · (409) 000-0000</p>
          <div className="relative mt-3 flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white p-1">
              <QrCode className="h-5 w-5 text-[#1C1917]" />
            </div>
            <p className="text-[10px] font-semibold text-white/70">Scan for special offer</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Weather-resistant · Full color</span>
          <span className="font-bold text-[#0369A1]">From $49</span>
        </div>
        <Bar color="#0EA5E9" />
      </div>
    </motion.div>
  );
}

function StepYardSign() {
  return (
    <motion.div key="yard" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Corrugated Plastic · 18" × 24"</p>
        <div className="flex justify-center">
          <div className="relative w-48">
            <div className="overflow-hidden rounded-lg border-4 border-[#F59E0B] bg-white px-4 py-3 text-center shadow-md">
              <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-slate-400">Now Serving</p>
              <p className="font-heading text-lg font-black leading-tight text-[#1C1917]">Your Business</p>
              <p className="mt-0.5 text-[11px] font-semibold text-[#0369A1]">Beaumont, TX</p>
              <p className="mt-1 text-[11px] text-slate-500">(409) 000-0000</p>
            </div>
            <div className="mx-auto h-8 w-1.5 bg-slate-400" />
            <div className="mx-auto h-1 w-10 rounded-full bg-slate-300" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Double-sided · Stakes included</span>
          <span className="font-bold text-[#0369A1]">From $12</span>
        </div>
        <Bar color="#F59E0B" />
      </div>
    </motion.div>
  );
}

function StepVehicle() {
  return (
    <motion.div key="vehicle" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Vehicle Vinyl · Door Panel</p>
        <div className="overflow-hidden rounded-lg bg-slate-100 p-3">
          <svg viewBox="0 0 320 140" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="50" width="300" height="75" rx="12" fill="#1e293b" />
            <rect x="30" y="20" width="220" height="45" rx="8" fill="#334155" />
            <circle cx="60" cy="128" r="15" fill="#0f172a" />
            <circle cx="60" cy="128" r="8" fill="#475569" />
            <circle cx="250" cy="128" r="15" fill="#0f172a" />
            <circle cx="250" cy="128" r="8" fill="#475569" />
            <rect x="35" y="58" width="130" height="55" rx="6" fill="#0369A1" />
            <text x="100" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="system-ui">YOUR BUSINESS</text>
            <text x="100" y="93" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="system-ui">Beaumont, TX</text>
            <text x="100" y="105" textAnchor="middle" fill="#F59E0B" fontSize="7.5" fontWeight="700" fontFamily="system-ui">(409) 000-0000</text>
            <rect x="175" y="60" width="120" height="51" rx="4" fill="#0C1E3C" />
            <text x="235" y="82" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="800" fontFamily="system-ui">pixelnpanel.com</text>
            <text x="235" y="95" textAnchor="middle" fill="white" fontSize="7" fontFamily="system-ui">Signs · Websites · Print</text>
            <rect x="178" y="100" width="36" height="8" rx="2" fill="#F59E0B" />
            <text x="196" y="107" textAnchor="middle" fill="#1C1917" fontSize="5.5" fontWeight="700" fontFamily="system-ui">FREE QUOTE</text>
          </svg>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Cast vinyl · UV protected</span>
          <span className="font-bold text-[#0369A1]">From $149</span>
        </div>
        <Bar color="#10B981" />
      </div>
    </motion.div>
  );
}

export default function SignageVisual() {
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
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Sign types</p>
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
          {step === 0 && <StepBanner key="b" />}
          {step === 1 && <StepYardSign key="y" />}
          {step === 2 && <StepVehicle key="v" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
