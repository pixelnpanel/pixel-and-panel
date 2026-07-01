"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

const HIDDEN_PATHS = new Set([
  "/signage",
  "/es/letreros",
  "/quote-request",
  "/es/solicitar-cotizacion",
  "/contact",
  "/es/contacto",
  "/free-visibility-check",
  "/es/chequeo-gratis-de-visibilidad",
]);
// Also hide on every signage detail page (category + product) — those pages
// have their own quote / price-calculator CTAs, so the floater is redundant.
const HIDDEN_PREFIXES = ["/signage/", "/es/letreros/"];
const QUOTE_BUTTON_SCROLL_THRESHOLD = 720;

export default function FloatingQuoteButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      const nextVisible = window.scrollY > QUOTE_BUTTON_SCROLL_THRESHOLD;
      setVisible((current) => (current === nextVisible ? current : nextVisible));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden =
    HIDDEN_PATHS.has(pathname) ||
    HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix));
  if (!visible || hidden) return null;

  const isSpanish = pathname?.startsWith("/es");
  const href = isSpanish ? "/es/solicitar-cotizacion" : "/quote-request";
  const label = isSpanish ? "Solicitar cotizacion" : "Request a quote";

  return (
    <Link
      href={href}
      aria-label={label}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#FBBF24] bg-[#F59E0B] text-[#1C1917] shadow-[0_16px_38px_rgba(28,25,23,0.28)] transition-transform hover:scale-110 hover:bg-[#FBBF24] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35 md:hidden"
    >
      <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0))]" />
      <FileText className="relative h-6 w-6" strokeWidth={2.7} aria-hidden="true" />
    </Link>
  );
}
