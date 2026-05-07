'use client'

import Link from 'next/link'
import { Monitor, MapPin, Zap, QrCode, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport } from '@/lib/animations'

const SERVICES = [
  {
    icon: Monitor, color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)',
    name: 'Website Development',
    href: '/digital/web-development',
    description: 'A fast, professional website built to rank on Google and convert visitors into customers. Mobile-first, easy to update, and built to last.',
    features: ['Custom design built for your brand', 'Ranks in local Google search', 'Works perfectly on any device', 'You can update it yourself'],
  },
  {
    icon: MapPin, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',
    name: 'Local SEO & Google Profile',
    href: '/digital/local-seo',
    description: 'Get found on Google Maps and in local search results before your competitors. We optimize your entire online presence for your service area.',
    features: ['Google Business Profile setup & optimization', 'Local keyword targeting', 'Citation building across directories', 'Monthly ranking reports'],
  },
  {
    icon: Zap, color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)',
    name: 'CRM & Automation',
    href: '/digital/crm-automation',
    description: 'Never lose a lead to slow follow-up again. Automated text and email responses so every new inquiry gets a reply in minutes — not days.',
    features: ['Automated lead follow-up', 'Text & email sequences', 'Pipeline tracking dashboard', 'Appointment booking integration'],
  },
  {
    icon: QrCode, color: '#10B981', bg: 'rgba(16,185,129,0.08)',
    name: 'QR Code Campaigns',
    href: '/digital/qr-code-campaigns',
    description: 'Turn every sign you put up into a trackable marketing asset. Dynamic QR codes link your physical signage directly to your CRM.',
    features: ['Dynamic QR codes on every sign', 'Real-time scan tracking', 'Connects directly to your CRM', 'Campaign performance reports'],
  },
]

export default function DigitalPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 100%)',
        padding: '8rem 1.5rem 5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}
        >
          <motion.span variants={fadeUp} className="section-label">Digital Services</motion.span>
          <motion.h1 variants={fadeUp} style={{ color: 'white', marginBottom: '1.25rem' }}>
            Get Found Online.
            <br />
            <span style={{ color: '#F59E0B' }}>Turn Visitors Into Customers.</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Everything your business needs to dominate local search, convert
            website visitors, and follow up with every lead automatically.
          </motion.p>
        </motion.div>
      </section>

      {/* Service Cards */}
      <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="container-px">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}
          >
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.name}
                  variants={scaleIn}
                  className="white-card"
                  style={{ padding: '2rem', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ width: '52px', height: '52px', background: service.bg, borderRadius: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={24} color={service.color} />
                  </div>
                  {/* FIX: was h2 (wrong — only one h1 per page, h2 for sections, h3 for cards) */}
                  <h3 style={{ color: '#1C1917', marginBottom: '0.75rem' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {service.description}
                  </p>
                  <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1, padding: 0 }}>
                    {service.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.4rem 0', fontSize: '0.875rem', color: '#475569', borderBottom: '1px solid #f8fafc' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: service.color, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    <Link href={service.href} className="btn-outline" style={{ justifyContent: 'center' }}>
                      Learn More <ArrowRight size={14} />
                    </Link>
                    <Link href={`/quote-request?product=${encodeURIComponent(service.name)}&category=${encodeURIComponent('Digital Services')}`} className="btn-amber" style={{ justifyContent: 'center' }}>
                      Get a Quote <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55 }}
            style={{ background: '#0C1E3C', borderRadius: '1.5rem', padding: '3rem 2rem', textAlign: 'center' }}
          >
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>
              Not Sure Where to Start?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
              Tell us about your business and we will recommend exactly
              what you need — no pressure, no jargon.
            </p>
            <Link href="/quote-request" className="btn-amber">
              Get a Free Consultation <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
