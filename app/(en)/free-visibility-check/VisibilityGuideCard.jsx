"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, ClipboardCheck, Lightbulb, Search } from "lucide-react";

const ICONS = {
  search: Search,
  clipboard: ClipboardCheck,
  lightbulb: Lightbulb,
};

const DEFAULT_STEPS = [
  {
    num: "01",
    icon: "clipboard",
    label: "Share the basics",
    title: "Tell us what needs attention.",
    body: "Send your business name, city, website, and the areas where visibility feels weak.",
    checklist: ["Website or Google profile", "Signs, print, or QR codes"],
    accent: "#F59E0B",
  },
  {
    num: "02",
    icon: "search",
    label: "We review visibility",
    title: "We look at what customers see.",
    body: "Pixel & Panel checks the practical places where local customers decide to call, visit, scan, or move on.",
    checklist: ["Search clarity", "Mobile contact path"],
    accent: "#38BDF8",
  },
  {
    num: "03",
    icon: "lightbulb",
    label: "Get next steps",
    title: "You receive simple recommendations.",
    body: "You get a plain-English summary with improvement ideas and a no-pressure option if you want help.",
    checklist: ["Quick wins", "Clear next move"],
    accent: "#10B981",
  },
];

export default function VisibilityGuideCard({
  eyebrow = "How the free check works",
  title = "A guided review before you spend money.",
  steps = DEFAULT_STEPS,
}) {
  const [step, setStep] = useState(0);
  const guideSteps = steps.length > 0 ? steps : DEFAULT_STEPS;

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % guideSteps.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [guideSteps.length]);

  const current = guideSteps[step] ?? guideSteps[0];
  const Icon = ICONS[current.icon] ?? ClipboardCheck;

  return (
    <div
      className="mt-8 hidden overflow-hidden rounded-2xl border border-white/12 bg-white/8 p-5 shadow-2xl shadow-black/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-white/12 lg:block"
      aria-label={eyebrow}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-heading text-lg font-extrabold leading-snug text-white">
            {title}
          </h2>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {guideSteps.map((item, index) => {
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
                    backgroundColor: selected ? item.accent : "rgba(255,255,255,0.28)",
                    transform: selected ? "scaleX(1)" : "scaleX(0.35)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div key={current.num} className="mt-5 animate-[pnp-fade-slide_0.35s_ease-out] rounded-xl border border-white/10 bg-[#0C1E3C]/45 p-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-lg"
            style={{ backgroundColor: current.accent, color: current.accent === "#F59E0B" ? "#1C1917" : "#FFFFFF" }}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xs font-extrabold" style={{ color: current.accent }}>
                {current.num}
              </span>
              <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/68">
                {current.label}
              </span>
            </div>
            <p className="mt-2 font-heading text-base font-extrabold leading-snug text-white">
              {current.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/72">{current.body}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {current.checklist.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg bg-white/8 px-3 py-2 text-xs font-semibold text-white/76">
              <BadgeCheck className="h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/12">
          <div
            key={current.accent}
            className="h-full origin-left animate-[pnp-progress_3.2s_linear_forwards] rounded-full"
            style={{ backgroundColor: current.accent }}
          />
        </div>
      </div>
    </div>
  );
}
