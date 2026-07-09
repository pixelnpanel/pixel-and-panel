'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport } from '@/lib/animations'
import { GOOGLE_REVIEWS } from '@/lib/reviews'

// Reusable Google-reviews social-proof band. Visible HTML only — no Review or
// AggregateRating JSON-LD (self-serving review schema won't earn Google stars
// and risks a manual action).
//
// Props:
//   variant  'full' | 'strip'  — full section with cards, or a slim trust bar
//   heading  string            — section h2 (full) / small lead (strip)
//   reviews  array             — { slug, name, service, quote, image? }
//   chips    array             — trust-chip strings (full only)
//
// Each review card links to the Google profile so visitors can read reviews.
// A customer photo renders only when `review.image` is present (resolved
// server-side from /public/reviews/ — missing file means no image, no gap).
function StarRow({ size }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} color="#F59E0B" fill="#F59E0B" />
      ))}
    </span>
  )
}

function Aggregate({ size }) {
  return (
    <>
      <StarRow size={size} />
      <span style={{ fontWeight: 700, color: '#1C1917', fontSize: '1.1rem' }}>{GOOGLE_REVIEWS.rating}</span>
      <a
        href={GOOGLE_REVIEWS.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#0369A1', fontSize: '0.95rem', fontWeight: 600 }}
      >
        from {GOOGLE_REVIEWS.count} Google reviews
      </a>
    </>
  )
}

export default function ReviewsBand({ variant = 'full', heading, reviews = [], chips = [] }) {
  // Slim trust ribbon — aggregate only, for placing right under the hero.
  if (variant === 'strip') {
    return (
      <LazyMotion features={domAnimation}>
        <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #ece7de', padding: '1rem 1.5rem' }}>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', textAlign: 'center' }}
          >
            <Aggregate size={20} />
            {heading && (
              <span style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600 }}>· {heading}</span>
            )}
          </m.div>
        </section>
      </LazyMotion>
    )
  }

  // Full section — heading + aggregate + clickable cards + trust chips.
  return (
    <LazyMotion features={domAnimation}>
      <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="container-px">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}
          >
            <m.h2 variants={fadeUp} style={{ color: '#1C1917', marginBottom: '1rem' }}>
              {heading}
            </m.h2>
            <m.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Aggregate size={22} />
            </m.div>
          </m.div>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', margin: '2.5rem auto 0', maxWidth: '1100px' }}
          >
            {reviews.map((review) => (
              <m.figure
                key={review.slug || review.name}
                variants={scaleIn}
                className="white-card"
                style={{ position: 'relative', padding: '1.75rem', margin: 0, display: 'flex', flexDirection: 'column' }}
              >
                {/* Whole-card click target → Google profile (read reviews) */}
                <a
                  href={GOOGLE_REVIEWS.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${review.name}'s review on Google`}
                  style={{ position: 'absolute', inset: 0, zIndex: 5, borderRadius: '0.75rem' }}
                />

                {review.image && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', borderRadius: '0.625rem', overflow: 'hidden', marginBottom: '1.1rem', background: '#f1eee7' }}>
                    <Image
                      src={review.image}
                      alt={`${review.service} for ${review.name} — Pixel & Panel`}
                      fill
                      sizes="(max-width: 640px) 100vw, 340px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}

                <StarRow size={15} />
                <blockquote style={{ margin: '0.9rem 0 1.25rem', color: '#1C1917', fontSize: '0.95rem', lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <span style={{ display: 'block', color: '#1C1917', fontWeight: 700, fontSize: '0.9rem' }}>{review.name}</span>
                  <span style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', marginTop: '0.15rem' }}>{review.service} · Google review</span>
                </figcaption>
              </m.figure>
            ))}
          </m.div>

          {chips.length > 0 && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginTop: '2.5rem' }}
            >
              {chips.map((chip) => (
                <span key={chip} style={{ background: '#ffffff', border: '1px solid #ece7de', borderRadius: '999px', padding: '0.45rem 1rem', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                  {chip}
                </span>
              ))}
            </m.div>
          )}
        </div>
      </section>
    </LazyMotion>
  )
}
