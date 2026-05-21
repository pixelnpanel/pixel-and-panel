"use client";

import { CheckCircle2, ClipboardList } from "lucide-react";

export default function QuoteVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="absolute -inset-4 rounded-[1.5rem] bg-[#0EA5E9]/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
            Quote process
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-6 rounded-full bg-white/25" />
            <span className="h-1.5 w-6 rounded-full bg-white/25" />
            <span className="h-1.5 w-6 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span className="font-heading text-xs font-black text-emerald-500">03</span>
          <span className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-white/65">
            You get your quote
          </span>
        </div>

        <div className="relative h-[318px] sm:h-[300px]">
          <div className="absolute inset-x-0 top-0">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
                  <ClipboardList className="h-4 w-4 text-white" />
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
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
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

              <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-3 rounded-full bg-emerald-500" />
                <span className="h-1.5 flex-1 rounded-full bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
