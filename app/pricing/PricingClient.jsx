'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, QrCode } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport } from '@/lib/animations'

const WEBSITE_PACKAGES = [
  {
    name: 'Starter Site', price: '997', description: 'A clean, fast, mobile-first website for businesses just getting started online.',
    features: ['Up to 5 pages', 'Mobile-first responsive design', 'Contact form connected to your email', 'Google Business Profile setup', 'Basic local SEO optimization', 'Free domain connection', '1 round of revisions'],
    cta: 'Get Started', highlight: false,
  },
  {
    name: 'Business Site', price: '1,997', description: 'A full professional website built to rank on Google and convert visitors into leads.',
    features: ['Up to 10 pages', 'Custom design built for your brand', 'Contact form + quote request form', 'Google Business Profile optimization', 'Full local SEO setup', 'Google Analytics integration', 'QR code campaign setup', '2 rounds of revisions'],
    cta: 'Most Popular', highlight: true,
  },
  {
    name: 'Growth Site', price: '3,497', description: 'A high-performance website with CRM integration and full digital marketing setup.',
    features: ['Up to 20 pages', 'Premium custom design', 'CRM integration & automated follow-up', 'Full local SEO + content strategy', 'Google Business Profile management', 'QR code campaign tracking', 'Google Ads setup (ad spend separate)', '3 rounds of revisions'],
    cta: 'Get Started', highlight: false,
  },
]

const MONTHLY_PACKAGES = [
  {
    name: 'Local Presence', price: '297', period: '/month', description: 'Keep your Google Business Profile optimized and your local rankings growing.',
    features: ['Google Business Profile management', 'Monthly post updates', 'Review monitoring & response', 'Local citation maintenance', 'Monthly ranking report'],
    cta: 'Get Started', highlight: false,
  },
  {
    name: 'Local SEO', price: '597', period: '/month', description: 'Full local SEO management to rank higher and get more calls from Google.',
    features: ['Everything in Local Presence', 'On-page SEO optimization', 'Monthly content updates', 'Competitor tracking', 'Keyword ranking reports', 'Google Analytics review'],
    cta: 'Most Popular', highlight: true,
  },
  {
    name: 'Full Digital', price: '997', period: '/month', description: 'Complete digital marketing management — SEO, CRM, and QR campaign tracking.',
    features: ['Everything in Local SEO', 'CRM setup & automation', 'Lead follow-up sequences', 'QR code campaign tracking', 'Monthly performance dashboard', 'Priority support'],
    cta: 'Get Started', highlight: false,
  },
]

function PricingCard({ pkg }) {
  return (
    <motion.div
      variants={scaleIn}
      style={{
        background: pkg.highlight ? '#0C1E3C' : 'white',
        borderRadius: '1.25rem', padding: '2rem',
        border: pkg.highlight ? '2px solid #F59E0B' : '1px solid #f1f5f9',
        display: 'flex', flexDirection: 'column', position: 'relative',
        boxShadow: pkg.highlight ? '0 20px 60px rgba(12,30,60,0.2)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {pkg.highlight && (
        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#F59E0B', color: '#1C1917', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.35rem 1.25rem', borderRadius: '100px', whiteSpace: 'nowrap' }}>
          Most Popular
        </div>
      )}

      <h3 style={{ color: pkg.highlight ? 'white' : '#1C1917', marginBottom: '0.5rem' }}>
        {pkg.name}
      </h3>
      <p style={{ color: pkg.highlight ? 'rgba(255,255,255,0.6)' : '#64748b', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        {pkg.description}
      </p>
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.75rem', color: pkg.highlight ? 'white' : '#1C1917', lineHeight: 1 }}>
          ${pkg.price}
        </span>
        {pkg.period ? (
          <span style={{ color: pkg.highlight ? 'rgba(255,255,255,0.5)' : '#94a3b8', fontSize: '0.95rem' }}>{pkg.period}</span>
        ) : (
          <span style={{ color: pkg.highlight ? 'rgba(255,255,255,0.5)' : '#94a3b8', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>one-time</span>
        )}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, marginBottom: '2rem', padding: 0 }}>
        {pkg.features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: pkg.highlight ? 'rgba(255,255,255,0.8)' : '#475569', lineHeight: 1.5 }}>
            <CheckCircle size={15} color={pkg.highlight ? '#F59E0B' : '#0369A1'} style={{ flexShrink: 0, marginTop: '1px' }} />
            {f}
          </li>
        ))}
      </ul>
      <Link href="/quote-request" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#F59E0B', color: '#1C1917', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.875rem', borderRadius: '0.75rem', textDecoration: 'none', transition: 'opacity 0.2s' }}>
        Get a Quote <ArrowRight size={14} />
      </Link>
    </motion.div>
  )
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 100%)', padding: '7rem 1.5rem 4rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
        <motion.div
          variants={stagger} initial="hidden" animate="visible"
          style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}
        >
          <motion.span variants={fadeUp} className="section-label">Transparent Pricing</motion.span>
          <motion.h1 variants={fadeUp} style={{ color: 'white', marginBottom: '1.25rem' }}>
            Simple Pricing.
            <br />
            <span style={{ color: '#F59E0B' }}>No Surprises. No Contracts.</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Every project starts with a free quote. Digital services are month-to-month — cancel anytime. Signage is quoted per project with no hidden fees.
          </motion.p>
        </motion.div>
      </section>

      {/* Website Packages */}
      <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="container-px">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.span variants={fadeUp} className="section-label">One-Time Investment</motion.span>
            <motion.h2 variants={fadeUp} style={{ color: '#1C1917' }}>Website Packages</motion.h2>
            <motion.p variants={fadeUp} style={{ color: '#64748b', marginTop: '0.75rem', maxWidth: '480px', margin: '0.75rem auto 0' }}>
              A one-time investment. You own your website outright — no monthly platform fees, no lock-in.
            </motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {WEBSITE_PACKAGES.map((pkg) => <PricingCard key={pkg.name} pkg={pkg} />)}
          </motion.div>
        </div>
      </section>

      {/* Monthly Packages — FIX: was #f8fafc, now consistent cream */}
      <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="container-px">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.span variants={fadeUp} className="section-label">Monthly Services</motion.span>
            <motion.h2 variants={fadeUp} style={{ color: '#1C1917' }}>Ongoing Digital Marketing</motion.h2>
            <motion.p variants={fadeUp} style={{ color: '#64748b', marginTop: '0.75rem', maxWidth: '480px', margin: '0.75rem auto 0' }}>
              Month-to-month. No contracts. Cancel anytime. Most clients see results within 60–90 days.
            </motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {MONTHLY_PACKAGES.map((pkg) => <PricingCard key={pkg.name} pkg={pkg} />)}
          </motion.div>
        </div>
      </section>

      {/* Signage */}
      <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="container-px">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <motion.span variants={fadeUp} className="section-label" style={{ color: '#F59E0B' }}>Physical Signage</motion.span>
            <motion.h2 variants={fadeUp} style={{ color: '#1C1917', marginBottom: '1rem' }}>Signage is Quoted Per Project</motion.h2>
            <motion.p variants={fadeUp} style={{ color: '#64748b', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto 2rem' }}>
              Every signage order is custom — size, quantity, material, and design all affect the final price. We quote every project individually so you get an accurate number, not a rough estimate. All signage includes a free QR code with tracking.
            </motion.p>
            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.875rem', marginBottom: '2.5rem', textAlign: 'left' }}>
              {['Yard Signs', 'Vinyl Banners', 'Car Magnets', 'Metal Signs', 'Vehicle Wraps', 'Window Graphics', 'A-Frame Signs', 'Feather Flags'].map((item) => (
                <motion.div key={item} variants={fadeUp} className="white-card" style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#475569' }}>
                  <QrCode size={14} color="#F59E0B" style={{ flexShrink: 0 }} />
                  {item}
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/quote-request" className="btn-amber">
                Get a Free Signage Quote <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="container-px">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ maxWidth: '760px', margin: '0 auto' }}>
            <motion.h2 variants={fadeUp} style={{ color: '#1C1917', marginBottom: '2.5rem', textAlign: 'center' }}>
              Pricing Questions
            </motion.h2>
            {[
              { q: 'Are there any contracts for monthly services?', a: 'No contracts, ever. All monthly digital services are month-to-month. You can cancel anytime with 30 days notice.' },
              { q: 'What is included in the website price?', a: 'Design, development, copywriting guidance, basic SEO setup, contact form, and mobile optimization. Hosting is separate — we recommend Vercel (free tier available).' },
              { q: 'How quickly can I get a signage quote?', a: 'We respond to all quote requests within 1 business day. Most signage orders are fulfilled within 5-7 business days after design approval.' },
              { q: 'Do all signs really include a QR code?', a: 'Yes — every sign we produce includes a dynamic QR code at no extra charge. The QR code links to your website or landing page and tracks every scan.' },
              { q: 'Can I bundle a website with monthly SEO?', a: 'Absolutely — and we recommend it. Clients who bundle a website build with ongoing SEO see significantly better results than either service alone.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="white-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <h4 style={{ color: '#1C1917', marginBottom: '0.625rem' }}>{item.q}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-base" style={{ background: '#0C1E3C', textAlign: 'center' }}>
        <div className="container-px">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ maxWidth: '640px', margin: '0 auto' }}>
            <motion.h2 variants={fadeUp} style={{ color: 'white', marginBottom: '1rem' }}>Not Sure What You Need?</motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Tell us about your business and we will recommend exactly what makes sense for your budget and goals — no pressure, no jargon.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/quote-request" className="btn-amber">
                Get a Free Consultation <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
