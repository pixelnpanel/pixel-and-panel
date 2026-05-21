"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Search, Star } from "lucide-react";

const STEPS = [
  { num: "01", label: "Found on Google", accent: "#0369A1" },
  { num: "02", label: "Noticed in Person", accent: "#F59E0B" },
  { num: "03", label: "New Customer", accent: "#10B981" },
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

function StepGoogle() {
  return (
    <div className="absolute inset-x-0 top-0 animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
          <span className="text-xs text-slate-600">signs near Beaumont TX</span>
        </div>

        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="mb-0.5 text-[11px] font-medium text-[#0369A1]">pixelnpanel.com</p>
          <p className="mb-1 text-sm font-bold text-slate-800">Pixel &amp; Panel — Signs &amp; Websites</p>
          <p className="mb-2 text-[11px] text-slate-600">Beaumont · Nederland · Port Arthur, TX</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
            ))}
            <span className="ml-1.5 text-[11px] text-slate-600">(409) 800-6139</span>
          </div>
        </div>

        <ProgressBar color="#0369A1" label="Found" />
      </div>
    </div>
  );
}

function StepSign() {
  return (
    <div className="absolute inset-x-0 top-0 animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="overflow-hidden rounded-xl bg-[#0C1E3C] p-5 text-center">
        <p className="mb-1 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
          Now Open
        </p>
        <p className="mb-0.5 font-heading text-xl font-extrabold text-white">Your Business</p>
        <p className="mb-4 text-xs text-white/70">Beaumont, TX · (409) 000-0000</p>

        <div className="flex items-center justify-center gap-3 rounded-lg bg-white/10 p-3">
          <div className="grid h-10 w-10 shrink-0 grid-cols-3 gap-0.5 rounded bg-white p-1.5" aria-hidden="true">
            {[1, 1, 1, 1, 0, 1, 1, 1, 1].map((v, i) => (
              <span key={i} className={`rounded-sm ${v ? "bg-[#1C1917]" : "bg-white"}`} />
            ))}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">Scan for a free quote</p>
            <p className="text-[11px] text-white/70">pixelnpanel.com</p>
          </div>
        </div>

        <ProgressBar color="#F59E0B" label="Noticed" />
      </div>
    </div>
  );
}

function StepLead() {
  return (
    <div className="absolute inset-x-0 top-0 animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <MessageSquare className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1C1917]">New Quote Request</p>
            <p className="text-[11px] text-slate-600">Just now · from your website</p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="mb-1 text-sm font-semibold text-[#1C1917]">Maria G.</p>
          <p className="text-xs leading-relaxed text-slate-700">
            &quot;Hi! I need a vinyl banner for my grand opening next month. Can you help?&quot;
          </p>
          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded-lg bg-[#F59E0B] py-1.5 text-center text-xs font-bold text-[#1C1917]">
              Reply
            </span>
            <span className="flex-1 rounded-lg border border-slate-200 py-1.5 text-center text-xs font-bold text-slate-700">
              View
            </span>
          </div>
        </div>

        <ProgressBar color="#10B981" label="Contacted" />
      </div>
    </div>
  );
}

export default function HomeHeroVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => setStep((s) => (s + 1) % STEPS.length), 3800);
    return () => window.clearInterval(timer);
  }, []);

  const current = STEPS[step];

  return (
    <div
      className="relative mx-auto w-full max-w-[480px]"
      aria-label="Animated visual showing how Pixel & Panel helps local businesses get found and get customers"
    >
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
            How it works
          </p>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => {
              const selected = i === step;

              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-label={`Show step ${s.num}: ${s.label}`}
                  aria-pressed={selected}
                  className="flex h-3 w-7 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/70"
                >
                  <span
                    className="h-1.5 w-6 origin-center rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: selected ? s.accent : "rgba(255,255,255,0.32)",
                      transform: selected ? "scaleX(1)" : "scaleX(0.35)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div key={step} className="mb-3 flex animate-[pnp-fade-shift_0.22s_ease-out] items-center gap-2">
          <span className="font-heading text-xs font-extrabold" style={{ color: current.accent }}>
            {current.num}
          </span>
          <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/75">
            {current.label}
          </span>
        </div>

        <div className="relative h-[278px] sm:h-[264px]">
          {step === 0 && <StepGoogle />}
          {step === 1 && <StepSign />}
          {step === 2 && <StepLead />}
        </div>
      </div>
    </div>
  );
}
