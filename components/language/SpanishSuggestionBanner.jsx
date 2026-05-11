"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SpanishSuggestionBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("pp_spanish_banner_dismissed");
    const preferred = navigator.language || "";
    const languages = navigator.languages || [];

    const prefersSpanish =
      preferred.toLowerCase().startsWith("es") ||
      languages.some((lang) => lang.toLowerCase().startsWith("es"));

    if (!dismissed && prefersSpanish && window.location.pathname === "/") {
      const frame = window.requestAnimationFrame(() => setShow(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-sky-200 bg-white p-4 shadow-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-800">
          ¿Prefieres español? También tenemos una versión en español.
        </p>
        <div className="flex gap-2">
          <Link
            href="/es"
            className="rounded-full bg-[#F59E0B] px-4 py-2 text-sm font-bold text-[#1C1917]"
          >
            Ver en español
          </Link>
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem("pp_spanish_banner_dismissed", "true");
              setShow(false);
            }}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
