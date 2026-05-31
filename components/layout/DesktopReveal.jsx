"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "#main-content section",
  "#main-content article",
  "#main-content form",
  "#main-content .white-card",
  "#main-content .glass-card",
  "#main-content .dark-card",
  "#main-content [data-pnp-reveal-target]",
].join(",");

export default function DesktopReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!desktopQuery.matches || reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const candidates = Array.from(document.querySelectorAll(revealSelector)).filter(
      (element) =>
        element instanceof HTMLElement &&
        !element.closest("[data-pnp-no-reveal]") &&
        !element.hasAttribute("data-pnp-reveal-skip"),
    );

    candidates.forEach((element, index) => {
      element.dataset.pnpReveal = "true";
      element.style.setProperty("--pnp-reveal-delay", `${Math.min(index % 6, 5) * 42}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.setAttribute("data-pnp-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.01,
      },
    );

    candidates.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      candidates.forEach((element) => {
        element.removeAttribute("data-pnp-reveal");
        element.removeAttribute("data-pnp-visible");
        element.style.removeProperty("--pnp-reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
