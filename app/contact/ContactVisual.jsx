"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Clock, MessageSquare } from "lucide-react";

const STEPS = [
  { num: "01", label: "Customer Reaches Out", accent: "#0EA5E9" },
  { num: "02", label: "We Read It Personally", accent: "#F59E0B" },
  { num: "03", label: "You Get a Real Reply",  accent: "#10B981" },
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

function StepIncoming() {
  return (
    <motion.div key="in" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0369A1]">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">New message received</p>
            <p className="text-[11px] text-slate-500">Just now · via contact form</p>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="mb-1 text-sm font-semibold text-[#1C1917]">Sandra M.</p>
          <p className="text-xs leading-relaxed text-slate-600">
            "Hi! I need a website and some yard signs for my cleaning business. Can you help? Not sure where to start."
          </p>
        </div>
        <Bar color="#0EA5E9" />
      </div>
    </motion.div>
  );
}

function StepReading() {
  return (
    <motion.div key="read" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 rounded-xl bg-slate-50 p-3">
          <p className="mb-1 text-sm font-semibold text-[#1C1917]">Sandra M.</p>
          <p className="text-xs leading-relaxed text-slate-600">
            "Hi! I need a website and some yard signs for my cleaning business. Can you help?"
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <CheckCheck className="h-3.5 w-3.5 text-[#0369A1]" />
            <span className="text-[11px] text-[#0369A1] font-semibold">Read</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/8 px-3 py-2.5">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.span key={i} className="h-2 w-2 rounded-full bg-[#F59E0B]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
          <p className="text-xs font-medium text-[#1C1917]">Pixel &amp; Panel is typing a reply…</p>
        </div>
        <Bar color="#F59E0B" />
      </div>
    </motion.div>
  );
}

function StepReply() {
  return (
    <motion.div key="reply" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 rounded-xl bg-slate-50 p-3">
          <p className="mb-1 text-[11px] text-slate-400">Sandra M. — 9:02 AM</p>
          <p className="text-xs text-slate-500">"Hi! I need a website and yard signs for my cleaning business..."</p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <p className="mb-1 text-[11px] text-emerald-700 font-semibold">Pixel &amp; Panel — 9:38 AM</p>
          <p className="text-xs leading-relaxed text-slate-700">
            "Hi Sandra! Great combo — a simple website + yard signs is a strong start for a cleaning business. Let's talk details."
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-[11px] font-semibold text-emerald-600">Replied in 36 minutes</span>
        </div>
        <Bar color="#10B981" />
      </div>
    </motion.div>
  );
}

export default function ContactVisual() {
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
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Real conversation</p>
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
          {step === 0 && <StepIncoming key="i" />}
          {step === 1 && <StepReading key="r" />}
          {step === 2 && <StepReply key="p" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
