"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MapPin, Phone, Star } from "lucide-react";

const defaultSteps = [
  { num: "01", label: "Your City, Our Coverage", accent: "#0EA5E9" },
  { num: "02", label: "Services We Bring to You", accent: "#F59E0B" },
  { num: "03", label: "Local Businesses We Help", accent: "#10B981" },
];

const defaultCopy = {
  steps: defaultSteps,
  panelLabel: "Service area",
  coverageLabel: "Southeast Texas service area",
  servingLabel: "Serving SE Texas",
  quoteLine: "Free quotes for all Southeast Texas businesses",
  servicesLabel: "Everything a local business needs",
  serviceItems: [
    { label: "Custom Website", color: "#0EA5E9", bg: "#EFF6FF" },
    { label: "Vinyl Signs & Banners", color: "#F59E0B", bg: "#FFFBEB" },
    { label: "Show Up on Google", color: "#8B5CF6", bg: "#F5F3FF" },
    { label: "QR Campaigns", color: "#10B981", bg: "#ECFDF5" },
  ],
  contactLine: "(409) 225-2012 · hello@pixelnpanel.com",
  resultsLabel: "Local businesses we've helped",
  businesses: [
    { name: "Beaumont Auto Detailing", stars: 5, tag: "Website + Signs" },
    { name: "Nederland Cleaning Co.", stars: 5, tag: "Google Profile" },
  ],
  regionLine: "Serving Beaumont, Nederland, Port Arthur & Greater Houston",
  stepAriaPrefix: "Show service area step",
};

function Bar({ color }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
        <motion.div className="h-full origin-left rounded-full" style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 3.2, ease: "linear" }} />
      </div>
    </div>
  );
}

function StepCoverage({ copy }) {
  const cities = [
    { name: "Beaumont", tx: true, top: "30%", left: "52%" },
    { name: "Nederland", top: "62%", left: "38%" },
    { name: "Port Arthur", top: "70%", left: "58%" },
  ];
  return (
    <motion.div key="coverage" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="absolute inset-x-0 top-0">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-500">{copy.coverageLabel}</p>
        <div className="relative overflow-hidden rounded-lg bg-[#EFF6FF] border border-[#BFDBFE]" style={{ height: 140 }}>
          <svg viewBox="0 0 300 140" className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,20 L280,20 L280,120 L20,120 Z" fill="none" stroke="#0369A1" strokeWidth="0.5" strokeDasharray="4,4" />
            <line x1="0" y1="70" x2="300" y2="70" stroke="#0369A1" strokeWidth="0.4" strokeDasharray="3,3" />
            <line x1="150" y1="0" x2="150" y2="140" stroke="#0369A1" strokeWidth="0.4" strokeDasharray="3,3" />
          </svg>
          {cities.map((city, i) => (
            <motion.div key={city.name} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.3, type: "spring", stiffness: 300 }}
              className="absolute flex flex-col items-center" style={{ top: city.top, left: city.left, transform: "translate(-50%, -50%)" }}>
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}>
                <MapPin className="h-5 w-5 drop-shadow-md" style={{ color: city.tx ? "#F59E0B" : "#0369A1" }} fill={city.tx ? "#F59E0B" : "#0369A1"} />
              </motion.div>
              <span className="mt-0.5 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-bold text-[#1C1917] shadow-sm">{city.name}</span>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-2 right-2 rounded-lg bg-white px-2 py-1 shadow-sm">
            <p className="text-[9px] font-bold text-[#0369A1]">{copy.servingLabel}</p>
          </motion.div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          <span className="text-xs text-slate-600">{copy.quoteLine}</span>
        </div>
        <Bar color="#0EA5E9" />
      </div>
    </motion.div>
  );
}

function StepServices({ copy }) {
  return (
    <motion.div key="services" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="absolute inset-x-0 top-0">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-500">{copy.servicesLabel}</p>
        <div className="grid grid-cols-2 gap-2">
          {copy.serviceItems.map(({ label, color, bg }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ backgroundColor: bg }}>
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[11px] font-semibold text-[#1C1917] leading-tight">{label}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
          <Phone className="h-3.5 w-3.5 text-[#F59E0B]" />
          <span className="text-[11px] font-semibold text-slate-600">{copy.contactLine}</span>
        </div>
        <Bar color="#F59E0B" />
      </div>
    </motion.div>
  );
}

function StepResults({ copy }) {
  return (
    <motion.div key="results" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="absolute inset-x-0 top-0">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-500">{copy.resultsLabel}</p>
        <div className="space-y-2">
          {copy.businesses.map(({ name, stars, tag }, i) => (
            <motion.div key={name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-[#1C1917]">{name}</p>
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                </div>
                <span className="rounded-full bg-[#0369A1]/10 px-2 py-0.5 text-[9px] font-bold text-[#0369A1]">{tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <p className="text-[11px] font-bold text-emerald-700">{copy.regionLine}</p>
        </div>
        <Bar color="#10B981" />
      </div>
    </motion.div>
  );
}

export default function CityVisual({ city, copy = {} }) {
  const content = { ...defaultCopy, ...copy };
  const steps = content.steps || defaultSteps;
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 3800);
    return () => clearInterval(t);
  }, [steps.length]);
  const current = steps[step];
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{content.panelLabel}</p>
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(i)}
                aria-label={`${content.stepAriaPrefix} ${s.num}: ${s.label}`}
                aria-pressed={i === step}
                className="flex h-3 w-7 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/70"
              >
                <span
                  className="h-1.5 w-6 origin-center rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: i === step ? s.accent : "rgba(255,255,255,0.25)",
                    transform: i === step ? "scaleX(1)" : "scaleX(0.35)",
                  }}
                />
              </button>
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
        <div className="relative h-[310px] sm:h-[292px]">
          <AnimatePresence mode="wait">
            {step === 0 && <StepCoverage key="c" copy={content} />}
            {step === 1 && <StepServices key="s" copy={content} />}
            {step === 2 && <StepResults key="r" copy={content} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
