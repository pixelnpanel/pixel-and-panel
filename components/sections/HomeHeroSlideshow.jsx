"use client";

import Image from "next/image";
import { useEffect, useReducer, useState, useSyncExternalStore } from "react";
import { createHeroFrame, heroFrameReducer } from "@/lib/hero-carousel";

const DISPLAY_MS = 2700;
const MOTION = "(prefers-reduced-motion: reduce)";
const COPY = {
  en: { label: "Signage and print showcase", pause: "Pause showcase animation", resume: "Resume showcase animation" },
  es: { label: "Muestra de letreros e impresos", pause: "Pausar animación de la muestra", resume: "Reanudar animación de la muestra" },
};

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
  const [frame, dispatch] = useReducer(heroFrameReducer, slides.length, createHeroFrame);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(watchMotion, () => window.matchMedia(MOTION).matches, () => false);
  const hidden = useSyncExternalStore(watchVisibility, () => document.hidden, () => false);
  const { current, next, visible, ready, elapsed } = frame;
  const prepareNext = visible && next !== null && !reducedMotion;
  const rotating = prepareNext && !paused && !hovered && !focused && !hidden;
  const dissolving = prepareNext && ready && elapsed;

  useEffect(() => {
    if (!rotating || elapsed) return;
    const timer = window.setTimeout(() => dispatch({ type: "elapsed" }), DISPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [current, elapsed, rotating]);

  const action = paused ? copy.resume : copy.pause;

  return (
    <div
      data-home-showcase role="group" aria-label={copy.label} aria-live="off"
      className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl bg-white shadow-[0_18px_42px_rgb(12_30_60/0.28)]"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
    >
      <div className="absolute inset-0 isolate">
        {[current, prepareNext ? next : null].filter((index) => index !== null).map((index) => {
          const active = index === current;
          const first = active && index === 0 && !visible;
          const state = active ? (dissolving ? "pnp-home-dissolve-out" : "") : (dissolving ? "pnp-home-dissolve-in" : "opacity-0");
          return (
            <div key={index} data-showcase-image={active ? "current" : "next"} aria-hidden={!active}
              className={`absolute inset-0 bg-white ${state}`} style={dissolving ? { animationPlayState: rotating ? "running" : "paused" } : undefined}
              onAnimationEnd={active ? undefined : () => dispatch({ type: "finished", index })}>
              <Image src={slides[index].image} alt={active ? slides[index].alt : ""} fill preload={first} loading={first ? undefined : "eager"}
                sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) 44vw, (max-width: 1376px) 43vw, 600px"
                className="pointer-events-none object-contain" draggable={false}
                onLoad={() => dispatch({ type: "loaded", index })}
                onError={() => dispatch({ type: "failed", index })} />
            </div>
          );
        })}
      </div>

      {prepareNext && (
        <button type="button" aria-label={action} title={action}
          className="group absolute inset-0 z-10 cursor-default rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-deep"
          onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setFocused(true); }}
          onBlur={() => setFocused(false)} onClick={() => setPaused((value) => !value)}>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-brand-navy px-3 py-2 text-sm font-semibold text-white opacity-0 group-focus-visible:opacity-100">{action}</span>
        </button>
      )}
    </div>
  );
}
