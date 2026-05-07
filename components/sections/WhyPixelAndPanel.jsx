'use client'

import { MapPin, Layers, QrCode, FileX } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const ITEMS = [
  {
    icon: MapPin,
    title: 'Texas-Based. Focused on Your Market.',
    description: 'We are not a national agency that treats Texas as just another zip code. We know the local industries, the customers, and the competition — and we build strategies around that.',
  },
  {
    icon: Layers,
    title: 'Physical + Digital Under One Roof',
    description: 'No more juggling a sign shop, a web developer, and an SEO freelancer who never talk to each other. We handle both sides — and make sure they work together.',
  },
  {
    icon: QrCode,
    title: 'Every Sign Is a Trackable Asset',
    description: 'Our QR code system turns every banner, yard sign, and vehicle wrap into a measurable marketing tool. You will know exactly which signs are driving traffic.',
  },
  {
    icon: FileX,
    title: 'No Contracts. No Surprises.',
    description: 'We earn your business month by month. Transparent pricing, a quote before any project begins, and month-to-month digital services with no hidden fees.',
  },
]

export default function WhyPixelAndPanel() {
  return (
    <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
      <div className="container-px">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <motion.span variants={fadeUp} className="section-label">Why Pixel &amp; Panel</motion.span>
          <motion.h2 variants={fadeUp} style={{ color: '#1C1917' }}>
            We Built This for{' '}
            <span style={{ color: '#0369A1' }}>Businesses Like Yours.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="white-card"
                style={{ padding: '2rem' }}
              >
                <div style={{ width: '48px', height: '48px', background: 'rgba(3,105,161,0.08)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={22} color="#0369A1" />
                </div>
                <h3 style={{ color: '#1C1917', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
