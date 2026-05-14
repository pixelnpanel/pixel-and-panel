"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PACKAGES = [
  {
    num: "01", accent: "#0EA5E9",
    name: "Launch Page",
    price: "From $299",
    badge: null,
    color: "light",
    features: ["One-page website", "Mobile-friendly design", "Contact section", "Domain connection"],
  },
  {
    num: "02", accent: "#F59E0B",
    name: "Local Business Website",
    price: "From $799",
    badge: "Most Popular",
    color: "dark",
    features: ["Up to 7 pages", "Service pages", "Quote request form", "Google Business Profile setup", "Local SEO setup"],
  },
  {
    num: "03", accent: "#10B981",
    name: "Website + Visibility",
    price: "From $999",
    badge: "Best Value",
    color: "value",
    features: ["Up to 10 pages", "Full website build", "Pages set up to show on Google", "Google profile optimization", "Visitor tracking setup"],
  },
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

function PackageStep({ pkg }) {
  const dark = pkg.color === "dark";
  const value = pkg.color === "value";
  const bg = dark ? "#0C1E3C" : value ? "#FAF8F4" : "white";
  const textMain = dark ? "white" : "#1C1917";
  const textSub = dark ? "rgba(255,255,255,0.6)" : "#64748b";

  return (
    <motion.div key={pkg.num} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
      <div className="rounded-xl p-4 shadow-sm" style={{ backgroundColor: bg, border: `2px solid ${pkg.accent}33` }}>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-base font-black" style={{ color: textMain }}>{pkg.name}</p>
          {pkg.badge && (
            <span className="rounded-full px-2 py-0.5 font-heading text-[10px] font-extrabold uppercase tracking-wider"
              style={{ backgroundColor: pkg.accent, color: dark ? "#1C1917" : "#1C1917" }}>
              {pkg.badge}
            </span>
          )}
        </div>
        <p className="mb-3 font-heading text-2xl font-black" style={{ color: pkg.accent }}>{pkg.price}</p>
        <div className="space-y-2">
          {pkg.features.map((f, i) => (
            <motion.div key={f} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.25 }}
              className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: pkg.accent }} />
              <span className="text-xs" style={{ color: textSub }}>{f}</span>
            </motion.div>
          ))}
        </div>
        <Bar color={pkg.accent} />
      </div>
    </motion.div>
  );
}

export default function PricingVisual() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 3), 3800);
    return () => clearInterval(t);
  }, []);
  const current = PACKAGES[step];
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Website packages</p>
          <div className="flex gap-1.5">
            {PACKAGES.map((p, i) => (
              <button key={i} onClick={() => setStep(i)} className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: i === step ? "1.5rem" : "0.375rem", backgroundColor: i === step ? p.accent : "rgba(255,255,255,0.25)" }} />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.22 }} className="mb-3 flex items-center gap-2">
            <span className="font-heading text-xs font-black" style={{ color: current.accent }}>{current.num}</span>
            <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/65">{current.name}</span>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {PACKAGES.map((pkg, i) => step === i && <PackageStep key={pkg.num} pkg={pkg} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}
