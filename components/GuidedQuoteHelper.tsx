"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  HelpCircle,
  QrCode,
  Search,
  X,
  Zap,
} from "lucide-react";

const FLOATING_WIDGET_SCROLL_THRESHOLD = 240;
const MOBILE_QUERY = "(max-width: 767px)";
const MOBILE_SIGNAGE_HUB_PATHS = new Set(["/signage", "/es/letreros"]);
const HIDDEN_PATHS = new Set(["/quote-request", "/es/solicitar-cotizacion"]);
const WHATSAPP_URL = "https://wa.me/14092252012";

type FlowId = "signs" | "website" | "google" | "qr" | "fast";

type FlowChoice = {
  label: string;
  recommendations: string[];
};

type FlowConfig = {
  title: string;
  question: string;
  choices: FlowChoice[];
  note?: string;
  ctaLabel: string;
  ctaHref: string;
};

const ROOT_OPTIONS: Array<{
  id: FlowId;
  label: string;
  helper: string;
  icon: typeof Building2;
}> = [
  { id: "signs", label: "Signs & Print", helper: "Signs, banners, vehicles, events, and printed pieces.", icon: Building2 },
  { id: "website", label: "Website", helper: "One-page sites, business websites, and care plans.", icon: Globe2 },
  { id: "google", label: "Google Visibility", helper: "Google listings, local SEO, and more local calls.", icon: Search },
  { id: "qr", label: "QR Code Campaign", helper: "QR codes for signs, flyers, menus, and quote forms.", icon: QrCode },
  { id: "fast", label: "I need a quote fast", helper: "Skip the chooser and gather the right details.", icon: Zap },
];

const FLOWS: Record<Exclude<FlowId, "fast">, FlowConfig> = {
  signs: {
    title: "Signs & Print",
    question: "Where will it be used?",
    choices: [
      { label: "Yard / roadside", recommendations: ["Yard Signs", "Real Estate Signs", "Metal Signs"] },
      { label: "Storefront / building", recommendations: ["Storefront Signs", "Metal Signs", "Acrylic Signs", "Window Graphics"] },
      { label: "Window / glass", recommendations: ["Window Lettering", "Perforated Window Vinyl", "Frosted Privacy Vinyl", "Window Graphics"] },
      { label: "Vehicle / truck", recommendations: ["Vehicle Lettering", "Vehicle Magnets", "Vehicle Graphics", "Partial Wraps"] },
      { label: "Event / booth", recommendations: ["Retractable Banners", "A-Frames", "Table Covers", "Step and Repeat Backdrops", "Event Tents"] },
      { label: "Print materials", recommendations: ["Business Cards", "Flyers", "Brochures", "Menus", "Posters", "Postcards"] },
    ],
    note: "To quote this faster, we’ll need size, quantity, deadline, city, and whether you need design help.",
    ctaLabel: "Go to quote request",
    ctaHref: "/quote-request?category=Signage%20%26%20Print",
  },
  website: {
    title: "Website",
    question: "What do you need?",
    choices: [
      { label: "Simple one-page site", recommendations: ["Launch Page, starting at $299"] },
      { label: "Small business website", recommendations: ["Starter Web Presence, starting at $499", "Local Business Website, starting at $799"] },
      { label: "Website + Google visibility", recommendations: ["Website + Visibility Setup, starting at $999"] },
      { label: "Monthly website support", recommendations: ["Website Care Plans, starting at $19/mo"] },
    ],
    ctaLabel: "Go to quote request",
    ctaHref: "/quote-request?category=Website%20Design",
  },
  google: {
    title: "Google Visibility",
    question: "What problem are you trying to fix?",
    choices: [
      { label: "My business does not show on Google", recommendations: ["Google Business Profile Optimization", "Local SEO"] },
      { label: "My Google listing needs cleanup", recommendations: ["Google Business Profile Optimization"] },
      { label: "I need more local calls", recommendations: ["Local SEO", "Google Business Profile Optimization"] },
      { label: "I already have a website but need SEO", recommendations: ["Local SEO", "Website + Visibility Setup if the website also needs work"] },
    ],
    note: "Pixel & Panel can help improve visibility, but no one can guarantee Google rankings.",
    ctaLabel: "Request visibility help",
    ctaHref: "/quote-request?category=Local%20SEO",
  },
  qr: {
    title: "QR Code Campaign",
    question: "Where will the QR code go?",
    choices: [
      { label: "Flyer or business card", recommendations: ["Quote form", "Offer", "Website page", "Contact page"] },
      { label: "Menu", recommendations: ["Menu", "Offer", "Contact page"] },
      { label: "Yard sign or banner", recommendations: ["Quote form", "Website page", "Offer"] },
      { label: "Window or storefront", recommendations: ["Website page", "Google review link", "Contact page"] },
      { label: "Vehicle graphic", recommendations: ["Quote form", "Website page", "Contact page"] },
    ],
    note: "QR codes work best when they lead to one clear action.",
    ctaLabel: "Request QR setup",
    ctaHref: "/quote-request?category=QR%20Code%20Campaign",
  },
};

export default function GuidedQuoteHelper() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<FlowId | null>(null);
  const [activeChoiceIndex, setActiveChoiceIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const hideForRoute = HIDDEN_PATHS.has(pathname || "");
  const hideForMobileSignageHub = isMobile && MOBILE_SIGNAGE_HUB_PATHS.has(pathname || "");
  const shouldRender = !hideForRoute && !hideForMobileSignageHub;
  const selectedFlow = activeFlow && activeFlow !== "fast" ? FLOWS[activeFlow] : null;
  const selectedChoice = selectedFlow?.choices[activeChoiceIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      setIsScrolled(window.scrollY > FLOATING_WIDGET_SCROLL_THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    if (!shouldRender && isOpen) {
      const closeTimer = window.setTimeout(() => {
        setIsOpen(false);
        setActiveFlow(null);
      }, 0);

      return () => window.clearTimeout(closeTimer);
    }

    return undefined;
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeHelper();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      closeHelper();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const visible = shouldRender && (isScrolled || isOpen);

  const openHelper = () => {
    setIsOpen(true);
  };

  function closeHelper() {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  const resetFlow = () => {
    setActiveFlow(null);
    setActiveChoiceIndex(0);
  };

  const handleRootOption = (flowId: FlowId) => {
    setActiveFlow(flowId);
    setActiveChoiceIndex(0);
  };

  const panelTitle = useMemo(() => {
    if (activeFlow === "fast") return "Fast quote checklist";
    if (selectedFlow) return selectedFlow.title;
    return "What are you trying to create?";
  }, [activeFlow, selectedFlow]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-4 z-[60] sm:right-6">
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="guided-quote-title"
          className="absolute bottom-20 right-0 max-h-[calc(100vh-12rem)] w-[calc(100vw-2rem)] max-w-[25rem] overflow-hidden rounded-2xl border border-white/80 bg-[#FAF8F4] text-[#1C1917] shadow-[0_24px_80px_rgba(28,25,23,0.24)] ring-1 ring-[#0369A1]/10 transition duration-200 sm:w-[25rem]"
        >
          <div className="bg-[#0369A1] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
                  Pixel & Panel
                </p>
                <h2 id="guided-quote-title" className="mt-1 text-xl leading-tight text-white">
                  {panelTitle}
                </h2>
                {!activeFlow && (
                  <p className="mt-2 text-sm leading-6 text-white/78">
                    Choose one and we’ll guide you to the right next step.
                  </p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeHelper}
                aria-label="Close guided quote helper"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-22rem)] overflow-y-auto p-4 sm:max-h-[24rem]">
            {!activeFlow && (
              <div className="grid gap-2">
                {ROOT_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleRootOption(option.id)}
                      className="group flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-[#F59E0B] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/18"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E0F2FE] text-[#0369A1] group-hover:bg-[#F59E0B] group-hover:text-[#1C1917]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading text-sm font-bold text-[#1C1917]">{option.label}</span>
                        <span className="mt-1 block text-sm leading-5 text-slate-600">{option.helper}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {activeFlow === "fast" && (
              <div>
                <p className="text-sm leading-6 text-slate-700">
                  For the fastest quote, send these details: product/service, size, quantity, city, deadline,
                  artwork/logo if available, and photos if it’s for a vehicle, window, storefront, or installation area.
                </p>
                <div className="mt-4 grid gap-2">
                  {["Product or service", "Size and quantity", "City and deadline", "Artwork, logo, or photos"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-[#1C1917]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0369A1]" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <Link href="/quote-request" onClick={closeHelper} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-4 py-3 font-heading text-sm font-bold text-[#1C1917] shadow-sm transition hover:bg-[#FBBF24] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35">
                    Start quote form <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={closeHelper} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0369A1]/25 bg-white px-4 py-3 font-heading text-sm font-bold text-[#0369A1] transition hover:border-[#F59E0B] hover:text-[#1C1917] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/20">
                    WhatsApp us
                  </a>
                </div>
                <button
                  type="button"
                  onClick={resetFlow}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0369A1] transition hover:text-[#1C1917]"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to choices
                </button>
              </div>
            )}

            {selectedFlow && selectedChoice && (
              <div>
                <button
                  type="button"
                  onClick={resetFlow}
                  className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#0369A1] transition hover:text-[#1C1917]"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <p className="font-heading text-base font-bold text-[#1C1917]">{selectedFlow.question}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedFlow.choices.map((choice, index) => {
                    const isSelected = index === activeChoiceIndex;
                    return (
                      <button
                        key={choice.label}
                        type="button"
                        onClick={() => setActiveChoiceIndex(index)}
                        aria-pressed={isSelected}
                        className={`rounded-full border px-3 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/18 ${
                          isSelected
                            ? "border-[#0369A1] bg-[#0369A1] text-white"
                            : "border-slate-200 bg-white text-[#1C1917] hover:border-[#F59E0B]"
                        }`}
                      >
                        {choice.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1]">
                    Good fit
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {selectedChoice.recommendations.map((recommendation) => (
                      <li key={recommendation} className="flex gap-2 text-sm leading-5 text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedFlow.note && (
                    <p className="mt-4 rounded-xl bg-[#FAF8F4] p-3 text-sm leading-6 text-slate-700">
                      {selectedFlow.note}
                    </p>
                  )}
                </div>

                <Link
                  href={selectedFlow.ctaHref}
                  onClick={closeHelper}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-4 py-3 font-heading text-sm font-bold text-[#1C1917] shadow-sm transition hover:bg-[#FBBF24] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35"
                >
                  {selectedFlow.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={openHelper}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open guided quote helper"
        className="flex min-h-14 max-w-[calc(100vw-7rem)] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#FBBF24] bg-[#F59E0B] px-4 py-3 font-heading text-sm font-bold text-[#1C1917] shadow-[0_16px_38px_rgba(28,25,23,0.25)] transition hover:scale-[1.02] hover:bg-[#FBBF24] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35"
      >
        <HelpCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>Need help choosing?</span>
      </button>
    </div>
  );
}
