'use client'

import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'

export default function CTABanner() {
  return (
    <section className="section-hero" style={{ background: '#F59E0B', position: 'relative', overflow: 'hidden' }}>

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(28,25,23,0.08) 1px, transparent 0)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

      {/* Glow */}
      <div style={{ position: 'absolute', top: '-50px', right: '20%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container-px" style={{ position: 'relative', textAlign: 'center' }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ maxWidth: '860px', margin: '0 auto' }}
        >
          <motion.h2
            variants={fadeUp}
            style={{ color: '#1C1917', lineHeight: 1.1, marginBottom: '1rem', fontSize: 'clamp(2rem, 5.5vw, 3.75rem)' }}
          >
            Ready to Get Visible?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ color: 'rgba(28,25,23,0.65)', marginBottom: '2.5rem', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
          >
            Tell us about your business. We&apos;ll put together a plan — no pressure,
            no obligation, no jargon. Just a real conversation about what would
            actually move the needle for you.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/quote-request"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#1C1917', color: 'white',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '1rem 2.5rem', borderRadius: '0.75rem',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#0369A1'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#1C1917'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Get a Free Quote <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', color: '#1C1917',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '1rem 2.5rem', borderRadius: '0.75rem',
                border: '2px solid rgba(28,25,23,0.25)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(28,25,23,0.6)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(28,25,23,0.25)'}
            >
              <MessageSquare size={15} /> Ask a Question
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{ color: 'rgba(28,25,23,0.45)', fontSize: '0.875rem', marginTop: '2rem' }}
          >
            We respond within 1 business day. No spam, ever.
          </motion.p>

        </motion.div>
      </div>
    </section>
  )
}
