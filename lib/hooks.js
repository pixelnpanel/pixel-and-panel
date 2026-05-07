"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Single shared hooks file.
 * Import from here — never copy-paste these into individual components.
 *
 * Usage:
 *   import { useIsMobile, useInView } from '@/lib/hooks'
 */

/** Returns true when viewport is narrower than `breakpoint` (default 768px) */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

/** Returns [ref, inView] — inView becomes true once element enters viewport (fires once) */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}
