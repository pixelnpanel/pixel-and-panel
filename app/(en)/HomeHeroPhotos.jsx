// Real-work hero visual: a framed 2x2 wall of actual sign/print samples pulled
// from the live catalog (category cover art). Server component — no client JS.
// Rendered by HomeClient when hero images are available; otherwise HomeClient
// falls back to the animated HomeHeroVisual.
import Image from "next/image";
import { Star } from "lucide-react";

export default function HomeHeroPhotos({
  images = [],
  tagline = "Your Vision. Made Visible.",
  ratingLabel = "5.0 on Google",
}) {
  const tiles = images.slice(0, 4);
  if (!tiles.length) return null;

  return (
    <div className="relative mx-auto w-full max-w-[500px]" aria-label="Recent sign and print work by Pixel & Panel">
      <div className="absolute -inset-4 rounded-[2rem] bg-[#F59E0B]/20 blur-3xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-white/15 bg-white/[0.1] p-4 shadow-2xl shadow-black/25 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="font-heading text-sm font-extrabold text-white">{tagline}</p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-bold text-white">
            <Star className="h-3.5 w-3.5 text-[#F59E0B]" fill="#F59E0B" aria-hidden="true" />
            {ratingLabel}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {tiles.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white p-2"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 45vw, 230px"
                className="object-contain object-center"
              />
              {img.label && (
                <span className="absolute bottom-2 left-2 rounded-full bg-[#1C1917]/85 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-white">
                  {img.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
