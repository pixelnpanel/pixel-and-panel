'use client'

import { MapPin, Truck, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const FEATURES = [
  {
    icon: MapPin, color: '#F59E0B',
    title: 'We Come to You',
    body: 'We are a service area business — no storefront, no overhead passed on to you. We meet you where your business is.',
  },
  {
    icon: Truck, color: '#0EA5E9',
    title: 'Signs Shipped Anywhere in Texas',
    body: 'Our signage is professionally produced and shipped directly to your door or job site. Fast turnaround, no surprises.',
  },
  {
    icon: Globe, color: '#4ade80',
    title: 'Digital Services Work Everywhere',
    body: 'Your website, Google profile, and CRM work for your business 24/7 — no matter where in Texas you operate.',
  },
]

export default function ServiceArea() {
  return (
    // FIX: was #f8fafc — now matches brand cream #FAF8F4 for visual consistency
    <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
      <div className="container-px">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <motion.span variants={fadeUp} className="section-label">How We Work</motion.span>
          <motion.h2 variants={fadeUp} style={{ color: '#1C1917' }}>
            We Serve Texas Businesses.
            <br />
            <span style={{ color: '#0369A1' }}>Wherever You Are.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: '#64748b', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0', lineHeight: 1.7 }}>
            No storefront. No showroom. Just results delivered to your door —
            physical or digital, we make it happen.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="white-card"
                style={{ padding: '2rem' }}
              >
                <div style={{ width: '48px', height: '48px', background: f.color + '18', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={22} color={f.color} />
                </div>
                <h3 style={{ color: '#1C1917', marginBottom: '0.75rem' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {f.body}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}
        >
          Not sure if we cover your area?{' '}
          <a href="mailto:hello@pixelnpanel.com" style={{ color: '#0369A1', textDecoration: 'underline', fontWeight: 500 }}>
            Send us a message — we likely can help.
          </a>
        </motion.p>

      </div>
    </section>
  )
}
