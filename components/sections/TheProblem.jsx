'use client'

import { Globe, Search, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const PROBLEMS = [
  {
    icon: Globe,
    iconBg: '#FEF2F2',
    iconColor: '#EF4444',
    title: 'No Website',
    description: "When a potential customer hears about your business and Googles you — they find nothing. Or worse, they find your competitor instead.",
  },
  {
    icon: Search,
    iconBg: '#FFF7ED',
    iconColor: '#F97316',
    title: 'No Google Presence',
    description: "80% of local searches lead to a visit or a call. If you're not on Google Maps, that business is going to someone else — every single day.",
  },
  {
    icon: BarChart2,
    iconBg: '#FEFCE8',
    iconColor: '#EAB308',
    title: 'No Way to Track Results',
    description: "You're spending money on signs and ads without knowing if any of it is working. That's not a marketing budget — that's a guess.",
  },
]

// Extracted into its own component so hooks run at the top level (Rules of Hooks)
function ProblemCard({ p }) {
  const Icon = p.icon
  return (
    <motion.div
      variants={fadeUp}
      className="white-card"
      style={{ padding: '1.75rem' }}
    >
      <div style={{
        width: '48px', height: '48px', background: p.iconBg,
        borderRadius: '0.75rem', display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: '1.25rem',
      }}>
        <Icon size={22} color={p.iconColor} />
      </div>
      <h3 style={{ color: '#1C1917', marginBottom: '0.75rem' }}>{p.title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{p.description}</p>
    </motion.div>
  )
}

export default function TheProblem() {
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
          <motion.span variants={fadeUp} className="section-label">The Visibility Gap</motion.span>
          <motion.h2 variants={fadeUp} style={{ color: '#1C1917' }}>
            Your Competitors Are Getting
            <br />
            <span style={{ color: '#0369A1' }}>Found Online. Are You?</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{
            color: '#64748b', marginTop: '1rem', maxWidth: '520px',
            margin: '1rem auto 0', lineHeight: 1.7,
          }}>
            Most local businesses rely 100% on word of mouth and signage.
            That worked 20 years ago. Today, your customers search online
            first — and if you&apos;re not there, you don&apos;t exist.
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
            gap: '1.25rem',
          }}
        >
          {PROBLEMS.map((p) => (
            <ProblemCard key={p.title} p={p} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
