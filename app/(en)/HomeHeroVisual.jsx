"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  MessageSquare,
  MonitorSmartphone,
  PanelTop,
  Search,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    short: "Signs + Print",
    label: "Signs + Print",
    accent: "#F59E0B",
    icon: PanelTop,
  },
  {
    num: "02",
    short: "Website + Google",
    label: "Website + Google",
    accent: "#0EA5E9",
    icon: MonitorSmartphone,
  },
  {
    num: "03",
    short: "Quote Path",
    label: "Quote Path",
    accent: "#10B981",
    icon: MessageSquare,
  },
];

function ProgressBar({ color, label }) {
  return (
    <div className="mt-5 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
        <div
          key={`${color}-${label}`}
          className="h-full origin-left animate-[pnp-progress_3.8s_linear_forwards] rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function OnlinePreview() {
  return (
    <div className="animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-[#0369A1]" aria-hidden="true" />
          <span className="text-sm text-slate-600">website and signs near Beaumont TX</span>
        </div>

        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-bold text-[#0369A1]">www.pixelnpanel.com</p>
          <p className="mt-1 font-heading text-lg font-extrabold text-[#1C1917]">Pixel &amp; Panel</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Websites, Google visibility, custom signs, banners, and print for Southeast Texas.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-[#E0F2FE] px-3 py-1.5 text-[#0369A1]">Website</span>
            <span className="rounded-full bg-[#FEF3C7] px-3 py-1.5 text-[#92400E]">Signs</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-700">Quote</span>
          </div>
        </div>

        <ProgressBar color="#0EA5E9" label="Found online" />
      </div>
    </div>
  );
}

function SignPreview() {
  return (
    <div className="animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="overflow-hidden rounded-xl bg-[#0C1E3C] p-5 text-white shadow-sm">
        <div className="rounded-xl border border-white/10 bg-white/10 p-4">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B]">Storefront</p>
          <p className="mt-2 font-heading text-2xl font-extrabold">Your Business</p>
          <p className="mt-1 text-sm text-white/70">Signage, banners, decals, and print</p>
        </div>

        <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-xl bg-white p-3 text-[#1C1917]">
            <p className="font-heading text-sm font-bold">Vinyl Banner</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">Grand opening, events, sales, and storefront visibility.</p>
          </div>
          <div className="rounded-xl bg-[#F59E0B] p-3 text-[#1C1917]">
            <p className="font-heading text-sm font-bold">Truck Graphics</p>
            <p className="mt-1 text-xs leading-5">Brand seen on every job.</p>
          </div>
        </div>

        <ProgressBar color="#F59E0B" label="Seen in town" />
      </div>
    </div>
  );
}

function LeadPreview() {
  return (
    <div className="animate-[pnp-fade-slide_0.35s_ease-out]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
            <MessageSquare className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="font-heading text-base font-bold text-[#1C1917]">New Quote Request</p>
            <p className="text-xs text-slate-600">Website, banner, and storefront sign package</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[auto_1fr] gap-3 rounded-xl bg-slate-50 p-3">
          <div className="grid h-16 w-16 shrink-0 grid-cols-3 gap-1 rounded-lg bg-white p-2" aria-hidden="true">
            {[1, 0, 1, 1, 1, 0, 0, 1, 1].map((value, index) => (
              <span key={index} className={`rounded-sm ${value ? "bg-[#1C1917]" : "bg-slate-200"}`} />
            ))}
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-[#1C1917]">QR and quote flow</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Print, signs, and website pages point customers to the next step.
            </p>
          </div>
        </div>

        <ProgressBar color="#10B981" label="Ready to contact" />
      </div>
    </div>
  );
}

function ActivePreview({ step }) {
  if (step === 1) return <OnlinePreview />;
  if (step === 2) return <LeadPreview />;
  return <SignPreview />;
}

export default function HomeHeroVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => setStep((current) => (current + 1) % STEPS.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const current = STEPS[step];
  const CurrentIcon = current.icon;

  return (
    <div
      className="relative mx-auto flex w-full max-w-[500px] min-w-0 items-stretch lg:min-h-[650px] xl:min-h-[670px]"
      aria-label="Animated guide showing Pixel & Panel website, signage, print, and quote process"
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-[#0EA5E9]/18 blur-3xl" />
      <div className="relative flex w-full max-w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.1] p-4 pb-5 shadow-2xl shadow-black/20 backdrop-blur-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(245,158,11,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))]" />
        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-[#F59E0B]">
                Visibility System
              </p>
              <h2 className="mt-2 max-w-[23rem] font-heading text-[1.35rem] font-extrabold leading-tight text-white xl:text-2xl">
                Signs, print, websites, and Google working as one.
              </h2>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-white/80 xl:flex">
              <MapPin className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
              Southeast TX
            </div>
          </div>

          <p className="mt-3 max-w-[26rem] text-sm leading-6 text-white/70">
            We make the path clear: customers notice you in town, find you online, then request a quote.
          </p>

          <div className="mt-4 grid w-full max-w-full min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-2 overflow-hidden">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              const selected = index === step;

              return (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => setStep(index)}
                  aria-label={`Show ${item.label}`}
                  aria-pressed={selected}
                  className={`min-w-0 overflow-hidden rounded-xl border p-2.5 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/70 ${selected
                    ? "border-white/35 bg-white/18 text-white"
                    : "border-white/10 bg-white/[0.07] text-white/68 hover:bg-white/[0.12]"
                    }`}
                >
                  <Icon className="h-4 w-4" style={{ color: item.accent }} aria-hidden="true" />
                  <span className="mt-2 block min-w-0 break-words font-heading text-[11px] font-bold leading-tight">{item.short}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 min-h-[390px] min-w-0 overflow-visible rounded-2xl border border-white/12 bg-white/[0.08] p-3.5 xl:min-h-[400px]">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1C1917]">
                <CurrentIcon className="h-5 w-5" style={{ color: current.accent }} aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading text-xs font-extrabold" style={{ color: current.accent }}>
                  {current.num}
                </p>
                <p className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-white/80">
                  {current.label}
                </p>
              </div>
            </div>

            <div key={step} className="min-w-0 max-w-full">
              <ActivePreview step={step} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
