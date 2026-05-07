'use client'

import Link from 'next/link'
import { Laptop, Tag, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const STEPS = [
  {
    number: '01', icon: Laptop, color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)',
    title: 'We Build Your Digital Presence',
    description: 'We create your website, set up your Google Business Profile, and optimize your local SEO — so when customers in your city search for your service, they find you first.',
  },
  {
    number: '02', icon: Tag, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',
    title: 'We Create Signage With Built-In QR Codes',
    description: 'Every sign we design includes a dynamic QR code tied to your business. Yard signs, banners, vehicle wraps — each one becomes a direct path from the street to your website.',
  },
  {
    number: '03', icon: TrendingUp, color: '#4ade80', bg: 'rgba(74,222,128,0.1)',
    title: 'You See Real Results — In Real Time',
    description: 'Every QR scan logs in your CRM automatically. You see exactly which signs are working, how many visitors hit your site, and how many turned into real leads. No more guessing.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
      <div className="container-px">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <motion.span variants={fadeUp} className="section-label">How It Works</motion.span>
          <motion.h2 variants={fadeUp} style={{ color: '#1C1917' }}>
            Simple. Trackable. Done Right.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: '#64748b', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0', lineHeight: 1.7 }}>
            Three steps. One agency. A system that connects your physical
            presence to your digital one — and proves it&apos;s working.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                style={{ textAlign: 'center', padding: '2rem 1.5rem' }}
              >
                <div style={{ width: '56px', height: '56px', background: step.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Icon size={24} color={step.color} />
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '3.5rem', color: step.color, opacity: 0.12, lineHeight: 1, marginBottom: '0.25rem', marginTop: '-0.5rem' }}>
                  {step.number}
                </div>
                <h3 style={{ color: '#1C1917', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <Link href="/quote-request" className="btn-amber">
            Start with a Free Quote
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
