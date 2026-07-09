// SERVER-ONLY. Resolves a customer review photo to a public URL, but ONLY when
// a file with the review's exact slug actually exists in /public/reviews/.
//
// This module uses the Node filesystem, so it must never be imported into a
// client component ('use client'). Server components (e.g. HomeSections, the
// signage page) call attachReviewImages() and pass the resolved data down to
// the client <ReviewsBand>. If no matching file exists, no `image` is attached
// and the card renders with no photo and no empty placeholder.
import fs from "node:fs";
import path from "node:path";

const REVIEW_IMAGE_DIR = path.join(process.cwd(), "public", "reviews");

// Accepted, in priority order. Drop any ONE of these per review.
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

// Returns "/reviews/<slug>.<ext>" for the first existing file, else null.
export function resolveReviewImage(slug) {
  if (!slug) return null;
  for (const ext of EXTENSIONS) {
    const fileName = `${slug}${ext}`;
    if (fs.existsSync(path.join(REVIEW_IMAGE_DIR, fileName))) {
      return `/reviews/${fileName}`;
    }
  }
  return null;
}

// Returns a new array where each review gets `image` set ONLY if its photo file
// exists. Reviews without a matching file are returned unchanged (no `image`).
export function attachReviewImages(reviewList) {
  return reviewList.map((review) => {
    const image = resolveReviewImage(review.slug);
    return image ? { ...review, image } : review;
  });
}
