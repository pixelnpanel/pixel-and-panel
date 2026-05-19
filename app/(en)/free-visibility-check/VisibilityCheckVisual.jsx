"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Globe, MapPin, QrCode, Store } from "lucide-react";

const STEPS = [
  { num: "01", label: "Scanning Your Online Presence", accent: "#0EA5E9" },
  { num: "02", label: "Finding What's Missing",        accent: "#F59E0B" },
  { num: "03", label: "Your Visibility Score",         accent: "#10B981" },
];

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

function StepScanning() {
  const checks = ["Google Business Profile", "Website", "Local SEO signals", "Signs & print setup"];
  return (
    <motion.div key="scan" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="absolute inset-x-0 top-0">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-500">Running visibility check for your business…</p>
        <div className="space-y-2">
          {checks.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: i * 0.35 }}
              className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5">
              <motion.div className="h-2.5 w-2.5 rounded-full bg-[#0EA5E9]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
              <span className="flex-1 text-xs text-slate-600">{item}</span>
              <span className="text-[10px] text-slate-400">Checking…</span>
            </motion.div>
          ))}
        </div>
        <Bar color="#0EA5E9" />
      </div>
    </motion.div>
  );
}

function StepFindings() {
  const items = [
    { icon: MapPin,  label: "Google Business Profile", status: "warn",  note: "Incomplete info" },
    { icon: Globe,   label: "Website",                 status: "ok",    note: "Active" },
    { icon: Store,   label: "Signage & Print",         status: "warn",  note: "No clear next step" },
    { icon: QrCode,  label: "Lead Capture",            status: "warn",  note: "Not set up" },
  ];
  return (
    <motion.div key="find" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="absolute inset-x-0 top-0">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold text-slate-500">What we found</p>
        <div className="space-y-2">
          {items.map(({ icon: Icon, label, status, note }, i) => (
            <motion.div key={label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="flex-1 text-xs font-medium text-slate-700">{label}</span>
              {status === "ok"
                ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                : <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />}
              <span className={`text-[10px] font-semibold ${status === "ok" ? "text-emerald-600" : "text-amber-600"}`}>{note}</span>
            </motion.div>
          ))}
        </div>
        <Bar color="#F59E0B" />
      </div>
    </motion.div>
  );
}

function StepScore() {
  return (
    <motion.div key="score" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="absolute inset-x-0 top-0">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm">
            <motion.span className="font-heading text-xl font-black text-[#1C1917]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              42
            </motion.span>
            <span className="text-[9px] font-bold text-slate-400">/100</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">Room to improve</p>
            <p className="text-[11px] text-slate-500">3 of 4 areas need attention</p>
          </div>
        </div>
        <div className="space-y-2 rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick wins</p>
          {["Complete your Google Business Profile", "Add a quote form to your website", "Add QR codes to your signs"].map((tip, i) => (
            <motion.div key={tip} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex items-start gap-2">
              <span className="mt-0.5 font-heading text-[10px] font-black text-[#F59E0B]">{i + 1}.</span>
              <span className="text-xs text-slate-600">{tip}</span>
            </motion.div>
          ))}
        </div>
        <Bar color="#10B981" />
      </div>
    </motion.div>
  );
}

export default function VisibilityCheckVisual() {
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
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Visibility audit</p>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(i)}
                aria-label={`Show visibility audit step ${s.num}: ${s.label}`}
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
        <div className="relative h-[344px] sm:h-[318px]">
          <AnimatePresence mode="wait">
            {step === 0 && <StepScanning key="sc" />}
            {step === 1 && <StepFindings key="fi" />}
            {step === 2 && <StepScore key="so" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
