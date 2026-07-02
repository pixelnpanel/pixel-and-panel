# Category Cover Images — Generation Prompts & Filenames

One square (1:1) collage image per signage category. Drop the finished file into
`public/images/signage/categories/` with the **exact filename** listed below and it
replaces the default cover (first product photo) on the `/signage` hub automatically —
no Google Sheet changes needed. If the file is missing, the site falls back to the
first product photo, so you can add these one at a time.

**Specs for every image**

- Square, 2048 × 2048 px (or 1600 × 1600 minimum)
- Export as `.webp`, ideally under 250 KB (you can generate PNG in ChatGPT, then convert)
- Plain warm off-white background `#FAF8F4` or pure white — it must blend with the site's card background
- No text, watermarks, or logos added by the AI (your product photos may already contain printed designs — that's fine)

**Master prompt — paste this first, then the category line, then attach your product photos:**

> Combine the attached product photos into ONE professional e-commerce category
> image. Square 1:1 composition, 2048x2048. Clean studio-style scene on a plain
> warm off-white background (#FAF8F4) with soft, subtle floor shadows. Arrange
> the products at slightly different depths and sizes so the group reads as one
> product family, with the hero product largest and centered. Keep every product
> exactly as it appears in the attached photos — same printed designs, colors,
> and hardware; do not invent new text or logos. Photorealistic, bright, evenly
> lit, no props, no people, no background elements.

## Per-category lines + filenames

| # | Category | Filename (exact) | Category line to add after the master prompt |
|---|----------|------------------|-----------------------------------------------|
| 1 | Banners | `custom-vinyl-banners.webp` | "Category: custom banners. Hero: a wide vinyl banner with grommets, hanging flat and facing the camera. Around it: a mesh banner, a fabric banner, and a pole banner, slightly smaller and angled." |
| 2 | Banner Stands | `retractable-banner-stands.webp` | "Category: banner stands. Hero: a retractable roll-up banner stand, fully assembled, front-facing. Beside it: an X-stand, a tension fabric stand, and a step-and-repeat backdrop at smaller scale." |
| 3 | Rigid & Metal Signs | `rigid-metal-yard-signs.webp` | "Category: rigid signs. Hero: a coroplast yard sign on an H-stake. Around it: an aluminum sign, an acrylic sign, and a foam board sign leaning at slight angles." |
| 4 | Real Estate Signs | `real-estate-yard-signs.webp` | "Category: real estate signs. Hero: a real-estate yard sign on an H-stake, front-facing. Beside it: the other attached real-estate sign styles at smaller scale." |
| 5 | Flags | `custom-feather-flags.webp` | "Category: advertising flags. Hero: a feather flag on its pole and ground base, full height. Beside it: a teardrop flag and a rectangle flag, slightly shorter and angled." |
| 6 | Sidewalk A-Frame Signs | `sidewalk-a-frame-signs.webp` | "Category: sidewalk signs. Hero: an A-frame sidewalk sign (Signicade style) opened and front-facing. Beside it: the other attached A-frame models at a slight angle." |
| 7 | Event Tents | `custom-event-tents.webp` | "Category: event tents. Hero: a 10x10 pop-up canopy tent with printed top, three-quarter view. If wall photos are attached, show one tent with a full back wall and one without." |
| 8 | Table Covers & Throws | `custom-table-covers-throws.webp` | "Category: table covers. Hero: a table with a fitted printed table throw, front-facing. Beside it: a stretch table cover and a table runner on smaller tables." |
| 9 | DTF Transfers | `custom-dtf-transfers.webp` | "Category: DTF heat transfers. Hero: a folded t-shirt with a vivid printed design. Beside it: a loose DTF transfer film sheet showing the same design, and a UV DTF sticker on a bottle or cup." |
| 10 | Sign Holders & Display Frames | `sign-holders-display-frames.webp` | "Category: sign holders and display frames. Hero: a floor poster stand, front-facing. Beside it: a banner A-frame, a snap poster hanger, and a magnetic wood frame hanger." |

## Tips

- Attach 3–5 product photos per category — the ones named in the category line. More than 5 gets cluttered on a small mobile tile.
- Check the result at thumbnail size (the tile is ~180 px wide on phones). If products look too small, regenerate with "fewer products, larger scale."
- Convert PNG → WebP: `cwebp -q 82 input.png -o custom-vinyl-banners.webp` (or any online converter).
- SEO note: the filename keywords help a little, but the image `alt` text (already set by the site) and the page copy do the heavy lifting — don't stress over filename perfection.
