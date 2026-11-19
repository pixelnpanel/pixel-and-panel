"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { adjacentHeroSlide, heroFrameReducer, initialHeroFrame } from "@/lib/hero-carousel";

const ROTATION_MS = 5000;
const MOTION = "(prefers-reduced-motion: reduce)";
const COPY = {
  en: { showcase: "Featured signs and print", carousel: "carousel", previous: "Previous slide", next: "Next slide", pause: "Pause slideshow", resume: "Resume slideshow", select: "Select a slide", show: "Show", slide: "Slide" },
  es: { showcase: "Letreros e impresos destacados", carousel: "carrusel", previous: "Diapositiva anterior", next: "Diapositiva siguiente", pause: "Pausar presentación", resume: "Reanudar presentación", select: "Elegir una diapositiva", show: "Mostrar", slide: "Diapositiva" },
};

const control = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-amber";

function watchMotion(update) {
  const query = window.matchMedia(MOTION);
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}

function watchVisibility(update) {
  document.addEventListener("visibilitychange", update);
  return () => document.removeEventListener("visibilitychange", update);
}

export default function HomeHeroSlideshow({ slides, locale }) {
  const copy = COPY[locale];
  const [frame, dispatch] = useReducer(heroFrameReducer, initialHeroFrame);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(watchMotion, () => window.matchMedia(MOTION).matches, () => false);
  const hidden = useSyncExternalStore(watchVisibility, () => document.hidden, () => false);
  const touchStart = useRef(null);
  const { active, requested, previous } = frame;
  const slide = slides[active];
  const pending = active !== requested;
  const rotating = !paused && !hovered && !hidden && !reducedMotion && slides.length > 1;

  useEffect(() => {
    if (!rotating || pending) return;
    const timer = window.setTimeout(() => {
      dispatch({ type: "select", index: adjacentHeroSlide(active, 1, slides.length) });
    }, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [active, pending, rotating, slides.length]);

  function select(index) {
    setPaused(true);
    dispatch({ type: "select", index });
  }

  function move(direction) {
    select(adjacentHeroSlide(requested, direction, slides.length));
  }

  return (
    <div
      role="group" aria-label={copy.showcase} aria-roledescription={copy.carousel}
      className="grid min-w-0 overflow-hidden rounded-2xl border border-white/25 bg-brand-navy shadow-[0_18px_42px_rgb(12_30_60/0.35)]"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
      onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setPaused(true); }}
    >
      <div className="row-start-3 flex items-center border-t border-white/15 px-1.5 py-0.5 sm:px-3">
        <button type="button" className={control + " order-last ml-auto motion-reduce:invisible"} aria-label={paused ? copy.resume : copy.pause} onClick={() => setPaused(!paused)}>
          {paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
        </button>
        <button type="button" className={control} aria-label={copy.previous} onClick={() => move(-1)}><ChevronLeft size={21} aria-hidden="true" /></button>
        <div role="group" aria-label={copy.select} className="flex items-center">
          {slides.map((item, index) => (
            <button key={item.image} type="button" aria-label={`${copy.show} ${item.title}`} aria-current={active === index ? "true" : undefined}
              className="inline-flex h-11 w-7 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-amber sm:w-8"
              onClick={() => select(index)}>
              <span aria-hidden="true" className={active === index ? "h-2 w-4 rounded-full bg-brand-amber" : "h-2 w-2 rounded-full bg-white/60"} />
            </button>
          ))}
        </div>
        <button type="button" className={control} aria-label={copy.next} onClick={() => move(1)}><ChevronRight size={21} aria-hidden="true" /></button>
      </div>

      <div
        className="relative row-start-1 aspect-[4/3] touch-pan-y touch-pinch-zoom overflow-hidden bg-[#FCFCFC]"
        onPointerDown={(event) => {
          if (event.pointerType === "touch" && event.isPrimary) touchStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const start = touchStart.current;
          if (!start || event.pointerType !== "touch" || !event.isPrimary) return;
          touchStart.current = null;
          const x = event.clientX - start.x;
          const y = event.clientY - start.y;
          if (Math.abs(x) >= 45 && Math.abs(x) > Math.abs(y) * 1.25) move(x < 0 ? 1 : -1);
        }}
        onPointerCancel={() => { touchStart.current = null; }}
      >
        {[...new Set([previous, active, requested])].filter((index) => index !== null).map((index) => {
          const current = index === active;
          const incoming = index === requested && !current;
          const first = index === 0 && previous === null;
          return (
            <div key={index} aria-hidden={!current} className={`absolute inset-0 bg-[#FCFCFC] ${current ? "z-10" : incoming ? "opacity-0" : ""} ${current && previous !== null ? "pnp-home-slide-in" : ""}`}>
              <Image src={slides[index].image} alt={current ? slides[index].alt : ""} fill preload={first} loading={first ? undefined : "eager"}
                sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) 44vw, (max-width: 1376px) 43vw, 600px"
                className="pointer-events-none object-contain" draggable={false}
                onLoad={() => dispatch({ type: "loaded", index })}
                onError={() => dispatch({ type: "failed", index })} />
            </div>
          );
        })}
      </div>

      <div className="row-start-2 flex min-w-0 items-center px-3 py-2.5 sm:px-4" aria-live={rotating ? "off" : "polite"} aria-atomic="true">
        <Link href={slide.href} prefetch={false} className="flex h-12 min-w-0 flex-1 items-center justify-between gap-3 rounded-sm text-white hover:underline focus-visible:outline-2 focus-visible:outline-brand-amber">
          <span className="min-w-0">
            <span className="block text-xs font-medium text-sky-200">{slide.kind} <span className="sr-only">· {copy.slide} {active + 1}/{slides.length}</span></span>
            <span className="line-clamp-2 text-sm font-semibold leading-4 sm:leading-5">{slide.title}</span>
          </span>
          <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
