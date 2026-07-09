'use client'

import { Star } from 'lucide-react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport } from '@/lib/animations'
import { GOOGLE_REVIEWS } from '@/lib/reviews'

// Reusable Google-reviews social-proof band. Visible HTML only — no Review or
// AggregateRating JSON-LD (self-serving review schema won't earn Google stars
// and risks a manual action).
//
// Props:
//   heading  string  — section h2
//   reviews  array   — review objects { name, service, quote }
//   chips    array   — trust-chip strings
function StarRow({ size }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} color="#F59E0B" fill="#F59E0B" />
      ))}
    </span>
  )
}

export default function ReviewsBand({ heading, reviews = [], chips = [] }) {
  return (
    <LazyMotion features={domAnimation}>
      <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="container-px">
          {/* Aggregate header */}
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
              <StarRow size={22} />
              <span style={{ fontWeight: 700, color: '#1C1917', fontSize: '1.1rem' }}>{GOOGLE_REVIEWS.rating}</span>
              <a
                href={GOOGLE_REVIEWS.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0369A1', fontSize: '0.95rem', fontWeight: 600 }}
              >
                from {GOOGLE_REVIEWS.count} Google reviews
              </a>
            </m.div>
          </m.div>

          {/* Review cards */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', margin: '2.5rem auto 0', maxWidth: '1100px' }}
          >
            {reviews.map((review) => (
              <m.figure key={review.name} variants={scaleIn} className="white-card" style={{ padding: '1.75rem', margin: 0, display: 'flex', flexDirection: 'column' }}>
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

          {/* Trust chips */}
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
