const POLE_KITS = new Set(["feather-angled-flag", "teardrop-flag", "feather-convex-flag", "rectangle-flag"]);

export function signageQuoteOptions(product, spanish = false) {
  if (product.categorySlug !== "flags") {
    if (product.slug === "coroplast-yard-signs") {
      return { material: spanish ? "Plástico corrugado (Coroplast)" : "Corrugated plastic (Coroplast)" };
    }
    if (product.slug === "13oz-vinyl-banner") {
      return { material: spanish ? "Vinilo de 13 oz" : "13 oz vinyl" };
    }
    return {};
  }

  if (product.slug === "econo-feather-flag") {
    return {
      showCustomSize: false,
      sidesHeading: spanish ? "Configuración" : "Flag option",
      sideLabels: spanish
        ? { single: "Solo bandera", double: "Bandera con mástil" }
        : { single: "Flag only", double: "Flag + pole" },
      priceUnits: spanish
        ? { single: "por bandera", double: "por kit" }
        : { single: "per flag", double: "per kit" },
      priceNote: spanish
        ? "Impresión por un lado. El kit incluye mástil y estaca para suelo."
        : "Single-sided print. The kit includes the pole and a ground stake.",
    };
  }

  if (POLE_KITS.has(product.slug)) {
    return {
      showCustomSize: false,
      priceUnits: { all: spanish ? "por kit" : "per kit" },
      priceNote: spanish
        ? "El kit incluye la bandera impresa y el mástil. Si ya tienes el equipo, pide una cotización solo para la bandera."
        : "The kit includes the printed flag and pole hardware. If you already have hardware, ask about a flag-only replacement.",
    };
  }
  return { showCustomSize: false };
}
