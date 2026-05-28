"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ClipboardList, Search } from "lucide-react";

const STEPS = [
  {
    num: "01",
    label: "You send the basics",
    accent: "#F59E0B",
  },
  {
    num: "02",
    label: "We review details",
    accent: "#38BDF8",
  },
  {
    num: "03",
    label: "You get your quote",
    accent: "#10B981",
  },
];

function ProgressBar({ color, label }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
        <div
          key={color}
          className="h-full origin-left animate-[pnp-progress_3.2s_linear_forwards] rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function StepRequest() {
  return (
    <div className="absolute inset-x-0 top-0 animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-[#F59E0B]/20 bg-[#FFF7E6] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B]">
            <ClipboardList className="h-4 w-4 text-[#1C1917]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">Quote Request Sent</p>
            <p className="text-[11px] text-slate-600">Project notes, deadline, and contact info</p>
          </div>
        </div>

        <div className="space-y-2 rounded-xl bg-slate-50 p-3">
          {["Vinyl banner for grand opening", "Need design help and install advice", "Best phone: (409) 225-2012"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
              <span className="text-xs text-slate-600">{item}</span>
            </div>
          ))}
        </div>

        <ProgressBar color="#F59E0B" label="Sent" />
      </div>
    </div>
  );
}

function StepReview() {
  return (
    <div className="absolute inset-x-0 top-0 animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#38BDF8]">
            <Search className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">We Review the Details</p>
            <p className="text-[11px] text-slate-600">Materials, size, timing, and best next step</p>
          </div>
        </div>

        <div className="grid gap-2 rounded-xl bg-slate-50 p-3">
          {[
            ["Print specs", "4x8 full color banner"],
            ["Timeline", "Ready before opening week"],
            ["Add-ons", "Grommets and install guidance"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-2 last:border-b-0 last:pb-0">
              <span className="text-xs font-bold text-slate-500">{label}</span>
              <span className="text-right text-xs text-slate-700">{value}</span>
            </div>
          ))}
        </div>

        <ProgressBar color="#38BDF8" label="Review" />
      </div>
    </div>
  );
}

function StepQuoteReady() {
  return (
    <div className="absolute inset-x-0 top-0 animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <ClipboardList className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">Your Quote is Ready</p>
            <p className="text-[11px] text-slate-500">Responded within 1 business day</p>
          </div>
        </div>

        <div className="space-y-2 rounded-xl bg-slate-50 p-3">
          {[
            { item: "4x8 Vinyl Banner (full color)", price: "From $79" },
            { item: "Yard Signs x 10 (double-sided)", price: "From $120" },
          ].map(({ item, price }) => (
            <div key={item} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
                <span className="text-xs text-slate-600">{item}</span>
              </div>
              <span className="shrink-0 text-xs font-bold text-[#0369A1]">{price}</span>
            </div>
          ))}

          <div className="border-t border-slate-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1C1917]">Estimated Total</span>
              <span className="font-heading text-sm font-black text-[#F59E0B]">From $199</span>
            </div>
          </div>
        </div>

        <ProgressBar color="#10B981" label="Ready" />
      </div>
    </div>
  );
}

export default function QuoteVisual() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  useEffect(() => {
    const timer = window.setInterval(() => setStep((value) => (value + 1) % STEPS.length), 3800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[480px]" aria-label="Animated quote process guide">
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
            Quote process
          </p>
          <div className="flex gap-1.5">
            {STEPS.map((item, index) => {
              const selected = index === step;

              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setStep(index)}
                  aria-label={`Show step ${item.num}: ${item.label}`}
                  aria-pressed={selected}
                  className="flex h-3 w-7 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/70"
                >
                  <span
                    className="h-1.5 w-6 origin-center rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: selected ? item.accent : "rgba(255,255,255,0.32)",
                      transform: selected ? "scaleX(1)" : "scaleX(0.35)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div key={current.num} className="mb-3 flex animate-[pnp-fade-shift_0.22s_ease-out] items-center gap-2">
          <span className="font-heading text-xs font-black" style={{ color: current.accent }}>
            {current.num}
          </span>
          <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/65">
            {current.label}
          </span>
        </div>

        <div className="relative h-[318px] sm:h-[300px]">
          {step === 0 && <StepRequest />}
          {step === 1 && <StepReview />}
          {step === 2 && <StepQuoteReady />}
        </div>
      </div>
    </div>
  );
}
