// Single source of truth for real Google reviews used across the site
// (homepage, /signage, /digital). Verbatim customer quotes — do not paraphrase.
//
// IMPORTANT: These reviews are rendered as visible HTML only. Do NOT emit
// Review or AggregateRating JSON-LD from this data — self-serving review schema
// on your own site will not earn Google star rich results and risks a manual
// action.

// The aggregate always reflects ALL real reviews, even on pages that display a
// filtered subset of the cards. This is accurate: the rating counts every real
// review, not only the ones shown.
export const GOOGLE_REVIEWS = {
  rating: "5.0",
  count: 5,
  // Where customers READ our reviews (opens the Google profile). Used by the
  // aggregate link and by each clickable review card.
  profileUrl: "https://share.google/ViS1lPbrH7uSkrlkd",
  // Where customers WRITE a review (opens the "leave a review" dialog).
  url: "https://g.page/r/CQf3A2TWP9JjEBM/review",
};

// channel: "print" | "signage" | "digital" — used to filter which reviews show
// on a given page (e.g. /signage excludes the "digital" review).
// slug: stable id + the exact image basename. A customer photo shows on a card
// ONLY when a file named `<slug>.<jpg|jpeg|png|webp>` exists in /public/reviews/.
// No file → no image, no empty placeholder (see lib/review-images.js).
export const reviews = [
  {
    slug: "mohammed-anwar",
    name: "Mohammed Anwar",
    service: "Business card design",
    channel: "print",
    quote:
      "Working with Pixel & Panel was a fantastic experience. They listened closely to my branding requirements and delivered multiple unique concepts for my business card. Their attention to detail, typography, and color theory is excellent. The final files were delivered on time and ready for print. I will definitely use them again.",
  },
  {
    slug: "jennifer-roebuck",
    name: "Jennifer Roebuck",
    service: "Custom vehicle decal",
    channel: "signage",
    quote:
      "Absolutely amazing! Highly recommend them. They were quick and very accommodating to our needs.",
  },
  {
    slug: "rolando-gonzalez",
    name: "Rolando Gonzalez",
    service: "Yard signs",
    channel: "signage",
    quote:
      "Absolutely the best service provided! I ordered some yard signs and the final product was absolutely fantastic!",
  },
  {
    slug: "murad-rahman",
    name: "Murad Rahman",
    service: "Website design",
    channel: "digital",
    quote:
      "It was great working with Pixel & Panel. Recently I created my portfolio website with them. I got a cheaper price than others. I'm really happy with their work.",
  },
  {
    slug: "fateha-afrin",
    name: "Fateha Afrin",
    service: "Business cards",
    channel: "print",
    quote:
      "They made some business cards for me. Good quality and professional design. Recommended.",
  },
];

// Convenience helper: all reviews except the given channel(s).
export function reviewsExcludingChannel(...channels) {
  const excluded = new Set(channels);
  return reviews.filter((review) => !excluded.has(review.channel));
}
