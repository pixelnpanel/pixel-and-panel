"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock3, Mail, PackageSearch } from "lucide-react";

const STEPS = [
  { num: "01", label: "Enter Your Order Number", accent: "#0EA5E9" },
  { num: "02", label: "Confirm Email Or Phone", accent: "#F59E0B" },
  { num: "03", label: "See Project Status", accent: "#10B981" },
];

const defaultCopy = {
  badge: "How tracking works",
  steps: STEPS,
  lookupTitle: "Order lookup",
  orderNumber: "Order number",
  orderNumberValue: "PNP-1007",
  contactLabel: "Email or phone",
  contactValue: "you@email.com",
  verifyTitle: "Match your contact info",
  verifyText: "Use the same email or phone from your quote",
  verifyItems: ["Protects customer details", "Finds the correct order", "Shows only customer-visible notes"],
  statusTitle: "Proof ready",
  statusText: "Next action: approve design proof",
  statusItems: ["Quote received", "Proof ready", "Production starts after approval"],
};

function Bar({ color }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
        <motion.div
          animate={{ width: "100%" }}
          className="h-full rounded-full"
          initial={{ width: "0%" }}
          style={{ backgroundColor: color }}
          transition={{ duration: 3.2, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function StepLookup({ copy }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.35 }}
    >
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-bold text-slate-500">{copy.lookupTitle}</p>
        <div className="space-y-2.5">
          {[
            { label: copy.orderNumber, value: copy.orderNumberValue },
            { label: copy.contactLabel, value: copy.contactValue },
          ].map(({ label, value }, index) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -6 }}
              key={label}
              transition={{ delay: index * 0.15 }}
            >
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

function StepVerify({ copy }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.35 }}
    >
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-col items-center py-4 text-center">
          <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F59E0B]/10">
            <Mail className="h-7 w-7 text-[#F59E0B]" />
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [1, 0, 1] }}
              className="absolute inset-0 rounded-full border-2 border-[#F59E0B]"
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
          <p className="font-heading text-sm font-bold text-[#1C1917]">{copy.verifyTitle}</p>
          <p className="mt-1 text-xs text-slate-500">{copy.verifyText}</p>
          <div className="mt-4 w-full space-y-2 text-left">
            {copy.verifyItems.map((item, index) => (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2"
                initial={{ opacity: 0 }}
                key={item}
                transition={{ delay: 0.3 + index * 0.4 }}
              >
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  className="h-2 w-2 rounded-full bg-[#F59E0B]"
                  transition={{ delay: index * 0.3, duration: 1, repeat: Infinity }}
                />
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

function StepStatus({ copy }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.35 }}
    >
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <PackageSearch className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">{copy.statusTitle}</p>
            <p className="text-[11px] text-slate-500">{copy.statusText}</p>
          </div>
        </div>
        <div className="space-y-2 rounded-xl bg-slate-50 p-3">
          {copy.statusItems.map((item, index) => (
            <div className="flex items-center gap-2" key={item}>
              {index < 2 ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              ) : (
                <Clock3 className="h-3.5 w-3.5 shrink-0 text-[#F59E0B]" />
              )}
              <span className="text-xs text-slate-600">{item}</span>
            </div>
          ))}
        </div>
        <Bar color="#10B981" />
      </div>
    </motion.div>
  );
}

export default function TrackOrderVisual({ copy: customCopy = {} }) {
  const copy = { ...defaultCopy, ...customCopy };
  const steps = copy.steps || STEPS;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((current) => (current + 1) % 3), 3800);
    return () => clearInterval(timer);
  }, []);

  const current = steps[step];

  return (
    <div className="relative w-full max-w-[480px]">
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#F59E0B]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">{copy.badge}</p>
          <div className="flex gap-1.5">
            {steps.map((item, index) => (
              <button
                className="h-1.5 rounded-full transition-all duration-500"
                key={item.num}
                onClick={() => setStep(index)}
                style={{
                  backgroundColor: index === step ? item.accent : "rgba(255,255,255,0.25)",
                  width: index === step ? "1.5rem" : "0.375rem",
                }}
                type="button"
              />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="mb-3 flex items-center gap-2"
            exit={{ opacity: 0, x: -8 }}
            initial={{ opacity: 0, x: 8 }}
            key={step}
            transition={{ duration: 0.22 }}
          >
            <span className="font-heading text-xs font-black" style={{ color: current.accent }}>{current.num}</span>
            <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/65">{current.label}</span>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {step === 0 && <StepLookup copy={copy} key="lookup" />}
          {step === 1 && <StepVerify copy={copy} key="verify" />}
          {step === 2 && <StepStatus copy={copy} key="status" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
