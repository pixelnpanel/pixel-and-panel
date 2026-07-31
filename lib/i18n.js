// Hand-kept alternates for pages that are not part of the sheet-driven
// catalog. Catalog rows used to live here too and went stale — see
// getAlternatePath, which resolves those through lib/signage/es-en-pairs.js.
import { enPathForEsProduct, esPathForEnCatalog } from "@/lib/signage/es-en-pairs";

export const ROUTE_ALTERNATES = {
  "/": { en: "/", es: "/es" },
  "/pricing": { en: "/pricing", es: "/es/precios" },
  "/contact": { en: "/contact", es: "/es/contacto" },
  "/quote-request": { en: "/quote-request", es: "/es/solicitar-cotizacion" },
  "/track-order": { en: "/track-order", es: "/es/rastrear-pedido" },
  "/learning-center": { en: "/learning-center", es: "/es/centro-de-aprendizaje" },
  "/learning-center/how-much-do-yard-signs-cost": { en: "/learning-center/how-much-do-yard-signs-cost", es: "/es/centro-de-aprendizaje/cuanto-cuestan-letreros-jardin-negocio" },
  "/learning-center/what-size-banner-do-i-need": { en: "/learning-center/what-size-banner-do-i-need", es: "/es/centro-de-aprendizaje/que-tamano-de-banner-necesito" },
  "/learning-center/website-checklist-for-new-local-businesses": { en: "/learning-center/website-checklist-for-new-local-businesses", es: "/es/centro-de-aprendizaje/checklist-sitio-web-negocios-locales-nuevos" },
  "/learning-center/how-to-show-up-on-google-locally": { en: "/learning-center/how-to-show-up-on-google-locally", es: "/es/centro-de-aprendizaje/como-aparecer-en-google-localmente" },
  "/learning-center/qr-codes-on-signs-and-print": { en: "/learning-center/qr-codes-on-signs-and-print", es: "/es/centro-de-aprendizaje/codigos-qr-en-letreros-e-impresos" },
  "/learning-center/best-marketing-materials-for-new-local-business": { en: "/learning-center/best-marketing-materials-for-new-local-business", es: "/es/centro-de-aprendizaje/mejores-materiales-marketing-negocio-local-nuevo" },
  "/learning-center/vehicle-graphics-beaumont-tx-contractors": { en: "/learning-center/vehicle-graphics-beaumont-tx-contractors", es: "/es/centro-de-aprendizaje/graficos-vehiculos-contratistas-beaumont-tx" },
  "/learning-center/does-my-beaumont-tx-business-need-a-website": { en: "/learning-center/does-my-beaumont-tx-business-need-a-website", es: "/es/centro-de-aprendizaje/negocio-beaumont-tx-necesita-sitio-web-2026" },
  "/learning-center/rank-on-google-maps-southeast-texas": { en: "/learning-center/rank-on-google-maps-southeast-texas", es: "/es/centro-de-aprendizaje/posicionar-negocio-en-google-maps-sureste-texas" },
  "/learning-center/storefront-signs-beaumont-tx": { en: "/learning-center/storefront-signs-beaumont-tx", es: "/es/centro-de-aprendizaje/letreros-para-negocios-beaumont-tx" },
  "/learning-center/google-business-profile-tips-southeast-texas": { en: "/learning-center/google-business-profile-tips-southeast-texas", es: "/es/centro-de-aprendizaje/consejos-perfil-de-google-negocios-sureste-texas" },
  "/free-visibility-check": {
    en: "/free-visibility-check",
    es: "/es/chequeo-gratis-de-visibilidad",
  },
  "/portfolio": { en: "/portfolio", es: "/es/portafolio" },
  "/digital": { en: "/digital", es: "/es/servicios-digitales" },
  "/digital/web-development": { en: "/digital/web-development", es: "/es/servicios-digitales/desarrollo-web" },
  "/digital/local-seo": { en: "/digital/local-seo", es: "/es/servicios-digitales/seo-local" },
  "/digital/google-business-profile": { en: "/digital/google-business-profile", es: "/es/servicios-digitales/perfil-de-google" },
  "/digital/crm-automation": { en: "/digital/crm-automation", es: "/es/servicios-digitales/automatizacion-crm" },
  "/digital/qr-code-campaigns": { en: "/digital/qr-code-campaigns", es: "/es/servicios-digitales/campanas-con-qr" },
  "/signage": { en: "/signage", es: "/es/letreros" },
  "/service-area/beaumont-tx": { en: "/service-area/beaumont-tx", es: "/es/area-de-servicio/beaumont-tx" },
  "/service-area/nederland-tx": { en: "/service-area/nederland-tx", es: "/es/area-de-servicio/nederland-tx" },
  "/service-area/port-arthur-tx": { en: "/service-area/port-arthur-tx", es: "/es/area-de-servicio/port-arthur-tx" },
  "/service-area/beaumont-tx/vehicle-graphics": { en: "/service-area/beaumont-tx/vehicle-graphics", es: "/es/area-de-servicio/beaumont-tx/graficos-para-vehiculos" },
  "/service-area/beaumont-tx/storefront-signs": { en: "/service-area/beaumont-tx/storefront-signs", es: "/es/area-de-servicio/beaumont-tx/letreros-para-negocios" },
  "/service-area/beaumont-tx/vinyl-banners": { en: "/service-area/beaumont-tx/vinyl-banners", es: "/es/area-de-servicio/beaumont-tx/banners-de-vinilo" },
  "/service-area/beaumont-tx/yard-signs": { en: "/service-area/beaumont-tx/yard-signs", es: "/es/area-de-servicio/beaumont-tx/letreros-para-jardin" },
  "/service-area/beaumont-tx/local-seo": { en: "/service-area/beaumont-tx/local-seo", es: "/es/area-de-servicio/beaumont-tx/seo-local" },
  "/service-area/beaumont-tx/web-development": { en: "/service-area/beaumont-tx/web-development", es: "/es/area-de-servicio/beaumont-tx/desarrollo-web" },
  "/service-area/beaumont-tx/google-business-profile": { en: "/service-area/beaumont-tx/google-business-profile", es: "/es/area-de-servicio/beaumont-tx/perfil-de-google" },
  "/service-area/nederland-tx/vehicle-graphics": { en: "/service-area/nederland-tx/vehicle-graphics", es: "/es/area-de-servicio/nederland-tx/graficos-para-vehiculos" },
  "/service-area/nederland-tx/storefront-signs": { en: "/service-area/nederland-tx/storefront-signs", es: "/es/area-de-servicio/nederland-tx/letreros-para-negocios" },
  "/service-area/nederland-tx/vinyl-banners": { en: "/service-area/nederland-tx/vinyl-banners", es: "/es/area-de-servicio/nederland-tx/banners-de-vinilo" },
  "/service-area/nederland-tx/yard-signs": { en: "/service-area/nederland-tx/yard-signs", es: "/es/area-de-servicio/nederland-tx/letreros-para-jardin" },
  "/service-area/nederland-tx/local-seo": { en: "/service-area/nederland-tx/local-seo", es: "/es/area-de-servicio/nederland-tx/seo-local" },
  "/service-area/nederland-tx/web-development": { en: "/service-area/nederland-tx/web-development", es: "/es/area-de-servicio/nederland-tx/desarrollo-web" },
  "/service-area/nederland-tx/google-business-profile": { en: "/service-area/nederland-tx/google-business-profile", es: "/es/area-de-servicio/nederland-tx/perfil-de-google" },
  "/service-area/nederland-tx/business-cards": { en: "/service-area/nederland-tx/business-cards", es: "/es/letreros/tarjetas-de-presentacion" },
  "/service-area/port-arthur-tx/vehicle-graphics": { en: "/service-area/port-arthur-tx/vehicle-graphics", es: "/es/area-de-servicio/port-arthur-tx/graficos-para-vehiculos" },
  "/service-area/port-arthur-tx/storefront-signs": { en: "/service-area/port-arthur-tx/storefront-signs", es: "/es/area-de-servicio/port-arthur-tx/letreros-para-negocios" },
  "/service-area/port-arthur-tx/vinyl-banners": { en: "/service-area/port-arthur-tx/vinyl-banners", es: "/es/area-de-servicio/port-arthur-tx/banners-de-vinilo" },
  "/service-area/port-arthur-tx/yard-signs": { en: "/service-area/port-arthur-tx/yard-signs", es: "/es/area-de-servicio/port-arthur-tx/letreros-para-jardin" },
  "/service-area/port-arthur-tx/local-seo": { en: "/service-area/port-arthur-tx/local-seo", es: "/es/area-de-servicio/port-arthur-tx/seo-local" },
  "/service-area/port-arthur-tx/web-development": { en: "/service-area/port-arthur-tx/web-development", es: "/es/area-de-servicio/port-arthur-tx/desarrollo-web" },
  "/service-area/port-arthur-tx/google-business-profile": { en: "/service-area/port-arthur-tx/google-business-profile", es: "/es/area-de-servicio/port-arthur-tx/perfil-de-google" },
  // Houston. There was not a single Houston row here, so the EN/ES switch on
  // every Houston page dropped the visitor on the homepage instead of the
  // translated page. Two pairs cross URL families on purpose: the English
  // digital pages are hand-written under /houston/*, while their Spanish
  // equivalents are generated under /es/area-de-servicio/houston-tx/*. These
  // drive the language switch only — hreflang stays out of it, since the two
  // families are built from different content sources.
  "/houston": { en: "/houston", es: "/es/houston" },
  "/houston/banners": { en: "/houston/banners", es: "/es/houston/banners" },
  "/houston/event-banners": { en: "/houston/event-banners", es: "/es/houston/banners-para-eventos" },
  "/houston/yard-signs": { en: "/houston/yard-signs", es: "/es/houston/letreros-para-jardin" },
  "/houston/real-estate-signs": { en: "/houston/real-estate-signs", es: "/es/houston/letreros-inmobiliarios" },
  "/houston/web-design": { en: "/houston/web-design", es: "/es/area-de-servicio/houston-tx/desarrollo-web" },
  "/houston/local-seo": { en: "/houston/local-seo", es: "/es/area-de-servicio/houston-tx/seo-local" },
  "/service-area/houston-tx/vehicle-graphics": { en: "/service-area/houston-tx/vehicle-graphics", es: "/es/area-de-servicio/houston-tx/graficos-para-vehiculos" },
  "/service-area/houston-tx/storefront-signs": { en: "/service-area/houston-tx/storefront-signs", es: "/es/area-de-servicio/houston-tx/letreros-para-negocios" },
  "/service-area/houston-tx/google-business-profile": { en: "/service-area/houston-tx/google-business-profile", es: "/es/area-de-servicio/houston-tx/perfil-de-google" },
  "/es/houston": { en: "/houston", es: "/es/houston" },
  "/es/houston/banners": { en: "/houston/banners", es: "/es/houston/banners" },
  "/es/houston/banners-para-eventos": { en: "/houston/event-banners", es: "/es/houston/banners-para-eventos" },
  "/es/houston/letreros-para-jardin": { en: "/houston/yard-signs", es: "/es/houston/letreros-para-jardin" },
  "/es/houston/letreros-inmobiliarios": { en: "/houston/real-estate-signs", es: "/es/houston/letreros-inmobiliarios" },
  "/es/area-de-servicio/houston-tx/graficos-para-vehiculos": { en: "/service-area/houston-tx/vehicle-graphics", es: "/es/area-de-servicio/houston-tx/graficos-para-vehiculos" },
  "/es/area-de-servicio/houston-tx/letreros-para-negocios": { en: "/service-area/houston-tx/storefront-signs", es: "/es/area-de-servicio/houston-tx/letreros-para-negocios" },
  "/es/area-de-servicio/houston-tx/perfil-de-google": { en: "/service-area/houston-tx/google-business-profile", es: "/es/area-de-servicio/houston-tx/perfil-de-google" },
  "/es/area-de-servicio/houston-tx/seo-local": { en: "/houston/local-seo", es: "/es/area-de-servicio/houston-tx/seo-local" },
  "/es/area-de-servicio/houston-tx/desarrollo-web": { en: "/houston/web-design", es: "/es/area-de-servicio/houston-tx/desarrollo-web" },

  "/es": { en: "/", es: "/es" },
  "/es/precios": { en: "/pricing", es: "/es/precios" },
  "/es/contacto": { en: "/contact", es: "/es/contacto" },
  "/es/solicitar-cotizacion": { en: "/quote-request", es: "/es/solicitar-cotizacion" },
  "/es/rastrear-pedido": { en: "/track-order", es: "/es/rastrear-pedido" },
  "/es/centro-de-aprendizaje": { en: "/learning-center", es: "/es/centro-de-aprendizaje" },
  "/es/centro-de-aprendizaje/cuanto-cuestan-letreros-jardin-negocio": { en: "/learning-center/how-much-do-yard-signs-cost", es: "/es/centro-de-aprendizaje/cuanto-cuestan-letreros-jardin-negocio" },
  "/es/centro-de-aprendizaje/que-tamano-de-banner-necesito": { en: "/learning-center/what-size-banner-do-i-need", es: "/es/centro-de-aprendizaje/que-tamano-de-banner-necesito" },
  "/es/centro-de-aprendizaje/checklist-sitio-web-negocios-locales-nuevos": { en: "/learning-center/website-checklist-for-new-local-businesses", es: "/es/centro-de-aprendizaje/checklist-sitio-web-negocios-locales-nuevos" },
  "/es/centro-de-aprendizaje/como-aparecer-en-google-localmente": { en: "/learning-center/how-to-show-up-on-google-locally", es: "/es/centro-de-aprendizaje/como-aparecer-en-google-localmente" },
  "/es/centro-de-aprendizaje/codigos-qr-en-letreros-e-impresos": { en: "/learning-center/qr-codes-on-signs-and-print", es: "/es/centro-de-aprendizaje/codigos-qr-en-letreros-e-impresos" },
  "/es/centro-de-aprendizaje/mejores-materiales-marketing-negocio-local-nuevo": { en: "/learning-center/best-marketing-materials-for-new-local-business", es: "/es/centro-de-aprendizaje/mejores-materiales-marketing-negocio-local-nuevo" },
  "/es/centro-de-aprendizaje/graficos-vehiculos-contratistas-beaumont-tx": { en: "/learning-center/vehicle-graphics-beaumont-tx-contractors", es: "/es/centro-de-aprendizaje/graficos-vehiculos-contratistas-beaumont-tx" },
  "/es/centro-de-aprendizaje/negocio-beaumont-tx-necesita-sitio-web-2026": { en: "/learning-center/does-my-beaumont-tx-business-need-a-website", es: "/es/centro-de-aprendizaje/negocio-beaumont-tx-necesita-sitio-web-2026" },
  "/es/centro-de-aprendizaje/posicionar-negocio-en-google-maps-sureste-texas": { en: "/learning-center/rank-on-google-maps-southeast-texas", es: "/es/centro-de-aprendizaje/posicionar-negocio-en-google-maps-sureste-texas" },
  "/es/centro-de-aprendizaje/letreros-para-negocios-beaumont-tx": { en: "/learning-center/storefront-signs-beaumont-tx", es: "/es/centro-de-aprendizaje/letreros-para-negocios-beaumont-tx" },
  "/es/centro-de-aprendizaje/consejos-perfil-de-google-negocios-sureste-texas": { en: "/learning-center/google-business-profile-tips-southeast-texas", es: "/es/centro-de-aprendizaje/consejos-perfil-de-google-negocios-sureste-texas" },
  "/es/chequeo-gratis-de-visibilidad": {
    en: "/free-visibility-check",
    es: "/es/chequeo-gratis-de-visibilidad",
  },
  "/es/portafolio": { en: "/portfolio", es: "/es/portafolio" },
  "/es/servicios-digitales": { en: "/digital", es: "/es/servicios-digitales" },
  "/es/servicios-digitales/desarrollo-web": { en: "/digital/web-development", es: "/es/servicios-digitales/desarrollo-web" },
  "/es/servicios-digitales/seo-local": { en: "/digital/local-seo", es: "/es/servicios-digitales/seo-local" },
  "/es/servicios-digitales/perfil-de-google": { en: "/digital/google-business-profile", es: "/es/servicios-digitales/perfil-de-google" },
  "/es/servicios-digitales/automatizacion-crm": { en: "/digital/crm-automation", es: "/es/servicios-digitales/automatizacion-crm" },
  "/es/servicios-digitales/campanas-con-qr": { en: "/digital/qr-code-campaigns", es: "/es/servicios-digitales/campanas-con-qr" },
  "/es/letreros": { en: "/signage", es: "/es/letreros" },
  "/es/area-de-servicio/beaumont-tx": { en: "/service-area/beaumont-tx", es: "/es/area-de-servicio/beaumont-tx" },
  "/es/area-de-servicio/nederland-tx": { en: "/service-area/nederland-tx", es: "/es/area-de-servicio/nederland-tx" },
  "/es/area-de-servicio/port-arthur-tx": { en: "/service-area/port-arthur-tx", es: "/es/area-de-servicio/port-arthur-tx" },
  "/es/area-de-servicio/beaumont-tx/graficos-para-vehiculos": { en: "/service-area/beaumont-tx/vehicle-graphics", es: "/es/area-de-servicio/beaumont-tx/graficos-para-vehiculos" },
  "/es/area-de-servicio/beaumont-tx/letreros-para-negocios": { en: "/service-area/beaumont-tx/storefront-signs", es: "/es/area-de-servicio/beaumont-tx/letreros-para-negocios" },
  "/es/area-de-servicio/beaumont-tx/banners-de-vinilo": { en: "/service-area/beaumont-tx/vinyl-banners", es: "/es/area-de-servicio/beaumont-tx/banners-de-vinilo" },
  "/es/area-de-servicio/beaumont-tx/letreros-para-jardin": { en: "/service-area/beaumont-tx/yard-signs", es: "/es/area-de-servicio/beaumont-tx/letreros-para-jardin" },
  "/es/area-de-servicio/beaumont-tx/seo-local": { en: "/service-area/beaumont-tx/local-seo", es: "/es/area-de-servicio/beaumont-tx/seo-local" },
  "/es/area-de-servicio/beaumont-tx/desarrollo-web": { en: "/service-area/beaumont-tx/web-development", es: "/es/area-de-servicio/beaumont-tx/desarrollo-web" },
  "/es/area-de-servicio/beaumont-tx/perfil-de-google": { en: "/service-area/beaumont-tx/google-business-profile", es: "/es/area-de-servicio/beaumont-tx/perfil-de-google" },
  "/es/area-de-servicio/nederland-tx/graficos-para-vehiculos": { en: "/service-area/nederland-tx/vehicle-graphics", es: "/es/area-de-servicio/nederland-tx/graficos-para-vehiculos" },
  "/es/area-de-servicio/nederland-tx/letreros-para-negocios": { en: "/service-area/nederland-tx/storefront-signs", es: "/es/area-de-servicio/nederland-tx/letreros-para-negocios" },
  "/es/area-de-servicio/nederland-tx/banners-de-vinilo": { en: "/service-area/nederland-tx/vinyl-banners", es: "/es/area-de-servicio/nederland-tx/banners-de-vinilo" },
  "/es/area-de-servicio/nederland-tx/letreros-para-jardin": { en: "/service-area/nederland-tx/yard-signs", es: "/es/area-de-servicio/nederland-tx/letreros-para-jardin" },
  "/es/area-de-servicio/nederland-tx/seo-local": { en: "/service-area/nederland-tx/local-seo", es: "/es/area-de-servicio/nederland-tx/seo-local" },
  "/es/area-de-servicio/nederland-tx/desarrollo-web": { en: "/service-area/nederland-tx/web-development", es: "/es/area-de-servicio/nederland-tx/desarrollo-web" },
  "/es/area-de-servicio/nederland-tx/perfil-de-google": { en: "/service-area/nederland-tx/google-business-profile", es: "/es/area-de-servicio/nederland-tx/perfil-de-google" },
  "/es/area-de-servicio/port-arthur-tx/graficos-para-vehiculos": { en: "/service-area/port-arthur-tx/vehicle-graphics", es: "/es/area-de-servicio/port-arthur-tx/graficos-para-vehiculos" },
  "/es/area-de-servicio/port-arthur-tx/letreros-para-negocios": { en: "/service-area/port-arthur-tx/storefront-signs", es: "/es/area-de-servicio/port-arthur-tx/letreros-para-negocios" },
  "/es/area-de-servicio/port-arthur-tx/banners-de-vinilo": { en: "/service-area/port-arthur-tx/vinyl-banners", es: "/es/area-de-servicio/port-arthur-tx/banners-de-vinilo" },
  "/es/area-de-servicio/port-arthur-tx/letreros-para-jardin": { en: "/service-area/port-arthur-tx/yard-signs", es: "/es/area-de-servicio/port-arthur-tx/letreros-para-jardin" },
  "/es/area-de-servicio/port-arthur-tx/seo-local": { en: "/service-area/port-arthur-tx/local-seo", es: "/es/area-de-servicio/port-arthur-tx/seo-local" },
  "/es/area-de-servicio/port-arthur-tx/desarrollo-web": { en: "/service-area/port-arthur-tx/web-development", es: "/es/area-de-servicio/port-arthur-tx/desarrollo-web" },
  "/es/area-de-servicio/port-arthur-tx/perfil-de-google": { en: "/service-area/port-arthur-tx/google-business-profile", es: "/es/area-de-servicio/port-arthur-tx/perfil-de-google" },
};

export function isSpanishPath(pathname = "/") {
  return pathname === "/es" || pathname.startsWith("/es/");
}

export function normalizePath(pathname = "/") {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getAlternatePath(pathname = "/", targetLanguage = "en") {
  const normalized = normalizePath(pathname);
  const fallback = targetLanguage === "es" ? "/es" : "/";

  const mapped = ROUTE_ALTERNATES[normalized]?.[targetLanguage];
  if (mapped) return mapped;

  // Catalog pages are resolved, not tabulated. The table used to hold a row per
  // catalog page pointing at the retired flat /signage/<product> URLs, so the
  // language switch on 30 Spanish pages sent visitors through a 301 — and the
  // English catalog is sheet-driven, so a hand-kept table goes stale the moment
  // the sheet changes. The pair map only holds verified live counterparts;
  // anything without one falls back to the other language's catalog hub, which
  // is a real page rather than a redirect.
  if (normalized.startsWith("/es/letreros/")) {
    if (targetLanguage === "es") return normalized;
    return enPathForEsProduct(normalized.slice("/es/letreros/".length)) || "/signage";
  }

  if (normalized.startsWith("/signage/")) {
    if (targetLanguage === "en") return normalized;
    return esPathForEnCatalog(normalized) || "/es/letreros";
  }

  return fallback;
}
