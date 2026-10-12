"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FileText, MessageCircle } from "lucide-react";

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

export default function MobileContactBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      setVisible(window.scrollY > QUOTE_BUTTON_SCROLL_THRESHOLD);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };
    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    if (footer) observer.observe(footer);
    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  const hidden = HIDDEN_PATHS.has(pathname) || HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix));
  if (hidden) return null;
  const isSpanish = pathname?.startsWith("/es");
  const href = isSpanish ? "/es/solicitar-cotizacion" : "/quote-request";
  const label = isSpanish ? "Solicitar cotización" : "Request a quote";

  return (
    <div data-mobile-contact-bar-page>
      {visible && !footerVisible && (
        <nav
          aria-label={isSpanish ? "Contacto rápido" : "Quick contact"}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-xl gap-3">
            <Link href={href} aria-label={label} className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-3 text-sm font-bold text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]">
              <FileText size={18} aria-hidden="true" />
              {isSpanish ? "Cotizar" : "Get a Quote"}
            </Link>
            <a href="https://wa.me/14092252012" target="_blank" rel="noopener noreferrer" className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-[#15803D] px-3 text-sm font-bold text-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
