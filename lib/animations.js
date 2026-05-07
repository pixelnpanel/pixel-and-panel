/**
 * PIXEL & PANEL — Framer Motion Animation Variants
 *
 * Import from here — never write inline animation values in components.
 *
 * Usage:
 *   import { fadeUp, stagger, viewport } from '@/lib/animations'
 *
 *   <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
 *     <motion.h2 variants={fadeUp}>Heading</motion.h2>
 *     <motion.p  variants={fadeUp}>Body copy</motion.p>
 *   </motion.div>
 */

// Apple-style ease: fast start, silky finish
const ease = [0.22, 1, 0.36, 1];

// ── ENTER VARIANTS ───────────────────────────────────────────

/** Fade up — use on headings, paragraphs, cards */
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

/** Fade in — use on backgrounds, overlays, images */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/** Scale in — use on cards popping in */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease } },
};

/** Slide from left — left column in two-column layouts */
export const slideLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

/** Slide from right — right column in two-column layouts */
export const slideRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
};

// ── STAGGER WRAPPERS ─────────────────────────────────────────

/** Normal stagger — for 3–6 items (service cards, process steps) */
export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** Fast stagger — for 6+ items (product grids, icon lists) */
export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.065 } },
};

/** Slow stagger — for 2–3 large feature blocks */
export const staggerSlow = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18 } },
};

// ── VIEWPORT SETTINGS ────────────────────────────────────────

/** Pass to whileInView — triggers once, 80px before element enters screen */
export const viewport = { once: true, margin: "-80px" };
