// Buying-guide intro + real buyer FAQs for each signage category.
// Rendered on /signage/[category] (visible HTML) AND emitted as FAQPage JSON-LD
// so the category landing pages rank for the questions buyers actually search.
// Content is location-free by convention — cities live only in seoDescription.

const GUIDES = {
  banners: {
    intro:
      "Banners are the fastest, most affordable way to put a big message in front of customers — but the right material depends on where it will hang and how long it needs to last.",
    faqs: [
      ["What's the difference between vinyl, mesh, and fabric banners?",
        "13oz scrim vinyl is the all-purpose outdoor choice — durable and weatherproof. Mesh lets wind pass through, so it's best for fences and building wraps. Fabric (polyester) gives a premium, wrinkle-resistant look for indoor displays and photo backdrops."],
      ["What size banner do I need?",
        "2×4 ft and 3×6 ft cover most storefront and event uses, while 4×8 ft reads clearly from the road. We finish every banner with hemmed edges and grommets so it arrives ready to hang."],
      ["Will an outdoor banner survive harsh weather?",
        "Yes. 13oz scrim vinyl, wind-slits, and mesh options are built for sun, rain, and coastal wind. For long-term outdoor placement, ask us about pole pockets or reinforced corners."],
    ],
  },
  "banner-stands": {
    intro:
      "Banner stands turn a printed graphic into a professional, reusable display for trade shows, lobbies, and events — set up in seconds, packed away just as fast.",
    faqs: [
      ["Which banner stand should I choose?",
        "Retractable roll-up stands are the go-to for trade shows and lobbies — light, quick to set up, and reusable. Tension-fabric and step-and-repeat displays give a larger, seamless branded backdrop for photos and press walls."],
      ["Can I reprint just the graphic later?",
        "Yes. Most retractable stands accept replacement banner cartridges, so you can update your message or refresh a worn graphic without buying a whole new stand."],
      ["How portable are they?",
        "Roll-up stands collapse into a padded carry bag and set up in under a minute with no tools — ideal if you travel between events or markets."],
    ],
  },
  "rigid-and-metal-signs": {
    intro:
      "Rigid signs cover everything from cheap short-term yard signs to permanent building signage — the material you choose sets the price, the lifespan, and the look.",
    faqs: [
      ["Which material is right — coroplast, aluminum, or acrylic?",
        "Coroplast (corrugated plastic) is the budget pick for short-term yard and event signs. Aluminum is rust-proof and lasts years outdoors for parking and building signs. Acrylic gives a premium, glossy finish for indoor lobby and office signage."],
      ["How long do metal signs last outdoors?",
        "Aluminum signs with UV-printed or reflective graphics routinely last 5+ years in sun and rain, which makes them the economical choice for anything permanent."],
      ["Can you add mounting holes or stakes?",
        "Yes — we can add drilled holes, standoffs, or H-stakes so your sign is ready to install the day it arrives."],
    ],
  },
  "real-estate-signs": {
    intro:
      "Real estate signs are built for speed and reuse — a strong yard sign plus swappable riders lets one setup work listing after listing.",
    faqs: [
      ["What signs do agents usually need?",
        "A For-Sale yard sign on an H-stake or frame, rider strips for messages like 'Open House' or 'Under Contract,' and a few directional A-frames or bandit signs to guide traffic to a showing."],
      ["Are these reusable across listings?",
        "Yes. Order your name and brokerage as a permanent panel and swap rider strips per listing, or use blank-price versions you can update on site."],
      ["How fast can I get them?",
        "Real estate signs are one of our fastest turnarounds. Send your logo and details and we'll proof it quickly so you're staked in the yard before the weekend."],
    ],
  },
  flags: {
    intro:
      "Flags add height and motion that a flat sign can't — they pull drive-by attention to a storefront, event, or car lot from far down the road.",
    faqs: [
      ["What's the difference between feather and teardrop flags?",
        "Feather flags are tall and narrow for maximum height and message space. Teardrop flags hold their shape better in higher wind. Both are excellent attention-grabbers for roadside visibility."],
      ["Do flags come with a pole and base?",
        "Yes — we offer complete kits with the pole and a ground stake, cross base, or water-fillable base, depending on whether you're planting in grass or standing on pavement."],
      ["Can flags be printed on both sides?",
        "Single-reverse (readable but mirrored on the back) is standard and most economical. True double-sided with a blockout liner is available when both sides need to read correctly."],
    ],
  },
  "sidewalk-a-frame-signs": {
    intro:
      "A-frame sidewalk signs capture foot traffic right at your door — pick a changeable style for daily specials or a printed insert for a fixed message.",
    faqs: [
      ["Are A-frames good for daily changing messages?",
        "Yes — choose a marker or chalk-style A-board for handwritten daily specials, or an insert-style frame that holds a printed poster you can swap. Both fold flat for overnight storage."],
      ["Will an A-frame stay put outdoors?",
        "Our sidewalk frames are weighted, wind-resistant designs meant to hold on a breezy sidewalk. Some accept added weight for extra stability on windy corners."],
      ["What size grabs foot traffic best?",
        "A 24×36 in insert is the most common storefront size — big enough to read at a walk-up without blocking the sidewalk."],
    ],
  },
  "event-tents": {
    intro:
      "A branded event tent turns a bare booth into a professional presence at markets, fairs, and job sites — and doubles as shade or shelter.",
    faqs: [
      ["What tent size do I need?",
        "A 10×10 ft canopy covers a single vendor booth; 10×15 and 10×20 give room for tables, product, and staff at markets, fairs, and outdoor events."],
      ["Can you print my logo on the canopy and walls?",
        "Yes — full-color canopy tops, half-walls, and full sidewalls can all carry your branding so your booth reads from across a busy event."],
      ["Are the frames reusable and weather-ready?",
        "The aluminum and steel frames are built for repeat use, and printed canopies are water-resistant. We recommend weights or stakes for outdoor use in wind."],
    ],
  },
  "table-covers-and-throws": {
    intro:
      "A printed table cover instantly makes a booth or counter look finished and on-brand — the right fit depends on your table and the look you want.",
    faqs: [
      ["What's the difference between a throw, a fitted cover, and a stretch cover?",
        "A throw drapes loosely over a standard table. A fitted cover is sewn to your table's exact size for a crisp look. A stretch cover hugs the table tightly for a modern, wrinkle-free finish."],
      ["What table size are these made for?",
        "6-ft and 8-ft rectangular tables are standard for trade shows and markets, and we also do 4-ft and round cocktail-table covers. Tell us the table and we'll match it."],
      ["Are they washable and reusable?",
        "Yes — printed polyester covers are wrinkle-resistant and machine-washable, so one cover works event after event."],
    ],
  },
  "dtf-transfers": {
    intro:
      "DTF transfers are the flexible way to put full-color designs on apparel — no minimum garment order and no screens to set up.",
    faqs: [
      ["What is a DTF transfer?",
        "Direct-to-film (DTF) is a full-color heat-press transfer that bonds to cotton, polyester, and blends — great for custom shirts, workwear, tote bags, and hats without a minimum garment order."],
      ["Do DTF prints crack or fade?",
        "Properly pressed DTF transfers are durable and stretchy, holding up through many wash cycles when you follow the wash-inside-out, no-high-heat guidance we include."],
      ["Can I press them myself?",
        "Yes — we ship ready-to-press transfers with time, temperature, and pressure instructions, so you can apply them with a home or shop heat press on your own schedule."],
    ],
  },
  "sign-holders-and-display-frames": {
    intro:
      "Sign holders and frames give your printed messages a clean, professional home on counters, walls, and windows — and make swapping the message effortless.",
    faqs: [
      ["What holder should I use for counter signs?",
        "Acrylic slant-back or T-frame holders are perfect for menus, pricing, and promos at a counter or table. Poster snap frames suit larger wall or window signage you update often."],
      ["Can I change the printed insert myself?",
        "Yes — these holders and snap frames are designed for quick insert swaps, so you can refresh specials, hours, or promotions in seconds without tools."],
      ["Do you provide the printed inserts too?",
        "We can print inserts to fit — send your artwork and sizes and we'll supply holder-ready prints so everything arrives as a matched set."],
    ],
  },
};

// Generic, non-thin fallback for any future category without a hand-written
// guide, built from the category's own name.
function fallbackGuide(name) {
  const n = (name || "signage").toLowerCase();
  return {
    intro: `Not sure which ${n} option fits your project? Here are the questions customers ask most — and you can always send us the details for a fast, exact quote.`,
    faqs: [
      [`How do I choose the right ${n}?`,
        `It depends on where it will be used, how long it needs to last, and your budget. Tell us the use case and we'll recommend the best material and size — free design help is included.`],
      ["How fast is turnaround?",
        "Most orders are proofed within one business day of receiving your details and artwork, then produced and shipped on a timeline we confirm up front."],
      ["Can you help with the design?",
        "Yes. Send a logo, a rough idea, or even a photo of what you want, and we'll prepare a print-ready proof for your approval before anything goes to production."],
    ],
  };
}

export function getCategoryGuide(slug, name) {
  const guide = GUIDES[slug];
  if (!guide) return fallbackGuide(name);
  return guide;
}
