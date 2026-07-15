// ─────────────────────────────────────────────────────────────────────────────
// HOUSTON CONTENT LAYER (English)
//
// ALL copy for the /houston pages lives in this file. Edit the text here —
// never the components — and the pages update automatically.
//
// ══ PLACEHOLDER SLOTS ══
// Every field tagged `[PLACEHOLDER]` in a comment is holding copy that is
// safe to ship but is NOT final. Replace each one with unique Houston copy.
// Do NOT copy text from the Beaumont / /signage pages into these slots —
// duplicated city-swapped copy is exactly what gets pages ignored by Google.
// ─────────────────────────────────────────────────────────────────────────────

// TODO(address): fill in when the Houston location has a real street address.
// MUST stay `null` until then — while null, the LocalBusiness schema on
// /houston omits the PostalAddress block entirely (never invent an address).
// Example shape when ready:
// export const HOUSTON_STREET_ADDRESS = {
//   streetAddress: "1234 Example Blvd, Suite 100",
//   addressLocality: "Houston",
//   addressRegion: "TX",
//   postalCode: "77002",
//   addressCountry: "US",
// };
export const HOUSTON_STREET_ADDRESS = null;

// TODO(phone): swap if Houston gets its own phone line.
export const HOUSTON_PHONE = "+1-409-225-2012";

export const houstonHub = {
  // Meta title/description for /houston (new page — safe to tune anytime).
  metaTitle: "Custom Signs, Banners & Print in Houston, TX | Pixel & Panel",
  metaDescription:
    "Pixel & Panel brings its one-stop sign shop to Houston, TX — custom banners, yard signs, real estate signs, and print for Houston businesses. Request a quote.",

  h1: "Custom Signs, Banners & Print for Houston Businesses",

  // [PLACEHOLDER] Unique intro — write 2–3 sentences about why Pixel & Panel
  // is in Houston, what makes the Houston operation different, your story.
  intro:
    "Pixel & Panel is bringing its one-stop sign shop to Houston. Custom banners, yard signs, real estate signs, and print — designed, produced, and delivered with the same plain-English service Southeast Texas businesses already rely on.",

  // [PLACEHOLDER] Houston delivery / turnaround specifics — service radius,
  // pickup options, typical turnaround for Houston orders.
  delivery: {
    heading: "Houston Delivery & Turnaround",
    body:
      "Serving businesses across the Greater Houston area. Share your location and timeline when you request a quote and we'll confirm production and delivery options for your order.",
  },

  // [PLACEHOLDER] Houston-specific FAQs — replace with real questions Houston
  // customers ask (neighborhoods you cover, permits, install, turnaround).
  faqs: [
    [
      "Does Pixel & Panel serve Houston, TX?",
      "Yes. Pixel & Panel serves businesses across the Greater Houston area with custom banners, yard signs, real estate signs, and print.",
    ],
    [
      "How do I get a quote for signs in Houston?",
      "Use the quote request form and tell us what you need, your location, and your timeline. We respond with clear pricing and next steps — no jargon.",
    ],
    [
      "Do you still serve Beaumont and Southeast Texas?",
      "Yes. Beaumont, Nederland, and Port Arthur remain fully served alongside the Houston area.",
    ],
  ],

  // TODO(testimonials): add Houston proof as it comes in. The section stays
  // hidden while this array is empty. Shape: { quote, name, business }
  testimonials: [],
};

// Per-service pages under /houston/<slug>.
// `esPath` pairs each page with its Spanish counterpart for hreflang.
export const houstonServices = {
  banners: {
    name: "Banners",
    esPath: "/es/houston/banners",
    catalogHref: "/signage/banners",
    catalogLabel: "Browse all banner options & pricing",
    quoteProduct: "Vinyl Banners",
    quoteCategory: "Signage",
    metaTitle: "Custom Banners Houston TX | Pixel & Panel",
    metaDescription:
      "Custom vinyl banners for Houston businesses, events, job sites, and grand openings. Full-color printing, durable outdoor materials, and design help. Free quote.",
    h1: "Custom Banners in Houston, TX",
    // [PLACEHOLDER] Unique Houston banner intro.
    intro:
      "Full-color vinyl banners for Houston storefronts, events, fences, and job sites — designed to be read fast and built for outdoor use.",
    // [PLACEHOLDER] Houston delivery/turnaround for banners.
    delivery:
      "Banner production typically runs a few business days after proof approval. Tell us your Houston location and deadline when you request a quote and we'll confirm exact timing.",
    // [PLACEHOLDER] Houston-specific banner FAQs.
    faqs: [
      [
        "Can I order custom banners in Houston?",
        "Yes. Pixel & Panel designs and prints vinyl banners for businesses and events across the Greater Houston area.",
      ],
      [
        "What banner sizes are available?",
        "Common sizes run from 2'×4' up to large-format job site banners. Share where the banner will hang and we'll recommend a size that reads clearly from that distance.",
      ],
    ],
    testimonials: [],
  },

  "yard-signs": {
    name: "Yard Signs",
    esPath: "/es/houston/letreros-para-jardin",
    catalogHref: "/signage/rigid-and-metal-signs/coroplast-yard-signs",
    catalogLabel: "See yard sign specs & pricing",
    quoteProduct: "Yard Signs",
    quoteCategory: "Signage",
    metaTitle: "Yard Signs Houston TX | Pixel & Panel",
    metaDescription:
      "Custom yard signs for Houston contractors, realtors, campaigns, and events. Weatherproof coroplast with H-stakes, fast turnaround, and volume pricing. Free quote.",
    h1: "Yard Signs in Houston, TX",
    // [PLACEHOLDER] Unique Houston yard sign intro.
    intro:
      "Weatherproof coroplast yard signs for Houston contractors, real estate agents, campaigns, and events — a low-cost way to be visible in the exact neighborhoods you serve.",
    // [PLACEHOLDER] Houston delivery/turnaround for yard signs.
    delivery:
      "Standard yard sign orders are typically ready within a few business days of proof approval. Volume orders for the Houston area are quoted with exact timing up front.",
    // [PLACEHOLDER] Houston-specific yard sign FAQs.
    faqs: [
      [
        "Can I get yard signs printed for Houston?",
        "Yes. Pixel & Panel prints single- and double-sided coroplast yard signs with wire H-stakes for the Greater Houston area.",
      ],
      [
        "Is there a minimum order?",
        "Small orders are welcome, and per-sign pricing drops significantly at volume. Ask about quantity pricing when you request a quote.",
      ],
    ],
    testimonials: [],
  },

  "real-estate-signs": {
    name: "Real Estate Signs",
    esPath: "/es/houston/letreros-inmobiliarios",
    catalogHref: "/signage/real-estate-signs",
    catalogLabel: "Browse real estate sign options",
    quoteProduct: "Real Estate Signs",
    quoteCategory: "Signage",
    metaTitle: "Real Estate Signs Houston TX | Pixel & Panel",
    metaDescription:
      "Custom real estate signs for Houston agents and brokerages — listing signs, riders, open house directionals, and frames. Durable materials, fast quotes.",
    h1: "Real Estate Signs in Houston, TX",
    // [PLACEHOLDER] Unique Houston real estate intro.
    intro:
      "Listing signs, riders, open house directionals, and frames for Houston agents, teams, and brokerages — built to look sharp in the yard and survive the weather.",
    // [PLACEHOLDER] Houston delivery/turnaround for real estate signs.
    delivery:
      "Most real estate sign orders are produced within a few business days of proof approval. Brokerage and team packages for the Houston market are quoted with exact timing.",
    // [PLACEHOLDER] Houston-specific real estate FAQs.
    faqs: [
      [
        "Do you make real estate signs for Houston agents?",
        "Yes. Pixel & Panel produces listing signs, riders, directionals, and frames for agents and brokerages across the Greater Houston area.",
      ],
      [
        "Can signs match my brokerage's brand requirements?",
        "Yes. Send your brokerage's brand guidelines or an example sign and we'll match colors, logos, and layout requirements exactly.",
      ],
    ],
    testimonials: [],
  },
};

// Contextual cross-links rendered on existing catalog pages (body links only —
// no URL/title/meta changes). Keyed by catalog slug.
export const houstonCatalogNotes = {
  banners: {
    text: "Ordering for the Houston area?",
    label: "Custom banners in Houston, TX",
    href: "/houston/banners",
  },
  "real-estate-signs": {
    text: "Ordering for the Houston area?",
    label: "Real estate signs in Houston, TX",
    href: "/houston/real-estate-signs",
  },
  "coroplast-yard-signs": {
    text: "Ordering for the Houston area?",
    label: "Yard signs in Houston, TX",
    href: "/houston/yard-signs",
  },
};
