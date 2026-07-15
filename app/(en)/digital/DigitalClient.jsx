'use client'

import Link from 'next/link'
import {
  Monitor, MapPin, Zap, QrCode, ArrowRight,
  Phone, Star, MessageSquare, PenTool, Rocket, ChevronDown,
} from 'lucide-react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport } from '@/lib/animations'

const SERVICES = [
  {
    icon: Monitor, color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)',
    name: 'Website Development',
    price: 'Starting at $299',
    href: '/digital/web-development',
    description: 'A fast, custom website built around trust, local search, and instant quote actions. Mobile-first, clear, and easy for customers to use.',
    features: ['Responsive smartphone interface', 'Local SEO structure included', 'Clear service and location content', 'Built around calls and quote requests'],
  },
  {
    icon: MapPin, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',
    name: 'Show Up on Google',
    price: 'Google Profile setup from $199',
    href: '/digital/local-seo',
    description: 'Help nearby customers find your services, service areas, and contact options when they search on Google and Google Maps.',
    features: ['Google Business Profile setup and optimization', 'Local keyword and service-page planning', 'Directory and citation cleanup guidance', 'Plain-English visibility updates'],
  },
  {
    icon: Zap, color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)',
    name: 'Never Miss a Lead',
    price: 'In packages from $999',
    href: '/digital/crm-automation',
    description: 'Scattered follow-up costs money. We connect forms, phone paths, and landing pages into simple lead paths that are easier to answer.',
    features: ['Automatic reply when someone reaches out', 'Cleaner quote and contact form routing', 'Open inquiries organized in one place', 'Optional booking or follow-up setup'],
  },
  {
    icon: QrCode, color: '#10B981', bg: 'rgba(16,185,129,0.08)',
    name: 'QR Code Campaigns',
    price: 'Starting at $149',
    href: '/digital/qr-code-campaigns',
    description: 'Put QR codes on signs, flyers, menus, vehicles, or business cards so street traffic can scan and go straight to a useful next step.',
    features: ['QR codes for signs, flyers, menus, and cards', 'Scan tracking options by campaign', 'Quote forms, menus, offers, or landing pages', 'Connect print materials to measurable actions'],
  },
]

const STEPS = [
  {
    icon: MessageSquare,
    title: 'Tell us what you need',
    copy: 'Message us on WhatsApp or request a quote. Tell us what you sell, where you work, and the kind of leads you want.',
  },
  {
    icon: PenTool,
    title: 'We build & optimize',
    copy: 'We design your site, set up your Google presence, and connect your lead paths — then send it to you for review before launch.',
  },
  {
    icon: Rocket,
    title: 'You get found & called',
    copy: 'Your site goes live, your Google profile starts working for you, and new inquiries land in one organized place.',
  },
]

const FAQS = [
  ['How much does a website cost?', 'Websites start at $299 for a clean one-page site and $499 for a multi-page starter. Local business packages that include Google Business Profile setup and lead capture start at $799. Full package details are on our pricing page.'],
  ['Do I need a website if I already have a Google profile?', 'Yes. A Google profile helps customers find you, but your website is where they confirm your services, see your work, request a quote, and decide whether to call. Profiles and websites work together — one does not replace the other.'],
  ['Will my website work on phones?', 'Yes. Mobile layout is the starting point, not an afterthought. Most local customers search, compare, and call from their phones, so we design the mobile experience first and scale up to desktop from there.'],
  ['How long does local SEO take?', 'Foundational fixes — page structure, service copy, and Google profile alignment — can start improving visibility within 4–8 weeks. Competitive ranking improvements typically take 3–6 months of consistent signals. SEO is a long game, but the value compounds over time.'],
  ['Can you guarantee Google rankings?', 'No. We set up a strong SEO foundation and make your business easier to find, but no honest provider can guarantee exact Google rankings. Anyone who promises a #1 spot is a warning sign.'],
  ['Can my signs and QR codes connect to my website?', 'Yes. QR codes on signs, flyers, business cards, and vehicle graphics can send people straight to a quote form, service page, menu, or offer — connecting your print and signage to trackable digital actions.'],
]

const EXPLORE = [
  { name: 'Website Development', href: '/digital/web-development' },
  { name: 'Local SEO', href: '/digital/local-seo' },
  { name: 'Google Business Profile', href: '/digital/google-business-profile' },
  { name: 'Never Miss a Lead', href: '/digital/crm-automation' },
  { name: 'QR Code Campaigns', href: '/digital/qr-code-campaigns' },
]

const REVIEW_URL = 'https://g.page/r/CQf3A2TWP9JjEBM/review'
const PHONE_TEL = '+14092252012'
const PHONE_DISPLAY = 'Call (409) 225-2012'

const DEFAULT_COPY = {
  label: 'Digital Services',
  titleStart: 'Websites & Local SEO That Turn ',
  titleHighlight: 'Searchers Into Customers.',
  intro:
    'We build fast websites, local SEO frameworks, Google Maps profile improvements, QR campaigns, and simple lead-generation tools for small businesses in Beaumont and Southeast Texas.',
  learnMore: 'Learn More',
  quoteCta: 'Get a Quote',
  quotePath: '/quote-request',
  quoteCategory: 'Digital Services',
  heroQuoteCta: 'Request a Quote',
  bottomTitle: 'Need a Website or Google Visibility Plan?',
  bottomCopy:
    'Tell us what you sell, where you work, and what kind of leads you want. We will recommend a practical website or Google visibility plan without confusing technical language.',
  bottomQuoteHref: '/quote-request',
  bottomQuoteCta: 'Request a Quote',
  bottomVisibilityHref: '/free-visibility-check',
  bottomVisibilityCta: 'Check My Google Visibility',
}

export default function DigitalPage({ services = SERVICES, copy = DEFAULT_COPY } = {}) {
  return (
    <LazyMotion features={domAnimation}>
      <>
        {/* Hero */}
        <section className="pnp-mobile-hero" style={{
          background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 100%)',
          padding: '8rem 1.5rem 5rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
          <m.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}
          >
            <m.span variants={fadeUp} className="section-label">{copy.label}</m.span>
            <m.h1 variants={fadeUp} className="pnp-mobile-hero-title" style={{ color: 'white', marginBottom: '1.25rem' }}>
              {copy.titleStart}
              <span style={{ color: '#F59E0B' }}>{copy.titleHighlight}</span>
            </m.h1>
            <m.p variants={fadeUp} className="pnp-mobile-hero-copy" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
              {copy.intro}
            </m.p>
            <m.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center', marginTop: '2rem' }}>
              <Link href={copy.quotePath} className="btn-amber">
                {copy.heroQuoteCta} <ArrowRight size={15} />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
                <Phone size={15} /> {PHONE_DISPLAY}
              </a>
            </m.div>
            <m.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', marginTop: '1.25rem', marginBottom: 0 }}>
              ★ 5.0 on Google · Locally owned Texas LLC · Serving Houston &amp; Southeast Texas
            </m.p>
          </m.div>
        </section>

        {/* Social proof band */}
        <section className="section-base" style={{ backgroundColor: '#ffffff', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div className="container-px">
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}
            >
              <m.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ display: 'inline-flex', gap: '2px' }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={20} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </span>
                <span style={{ fontWeight: 700, color: '#1C1917', fontSize: '1.05rem' }}>5.0</span>
                <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#0369A1', fontSize: '0.9rem', fontWeight: 600 }}>
                  from 5 Google reviews
                </a>
              </m.div>
              <m.blockquote variants={fadeUp} style={{ margin: '0 0 1.25rem', color: '#1C1917', fontSize: '1.15rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                &ldquo;It was great working with Pixel &amp; Panel. Recently I created my portfolio website with them. I got a cheaper price than others. I&rsquo;m really happy with their work.&rdquo;
              </m.blockquote>
              <m.p variants={fadeUp} style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.75rem' }}>
                — Murad H. Rahman · Website client · Google review
              </m.p>
              <m.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
                {['Locally owned, Texas-registered LLC', 'Fast replies on WhatsApp', 'Plain-English updates, no jargon'].map((chip) => (
                  <span key={chip} style={{ background: '#FAF8F4', border: '1px solid #ece7de', borderRadius: '999px', padding: '0.4rem 0.9rem', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                    {chip}
                  </span>
                ))}
              </m.div>
            </m.div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
          <div className="container-px">
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}
            >
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <m.div
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
                    {/* h3: single h1 in hero, h2 for sections, h3 for cards */}
                    <h3 style={{ color: '#1C1917', marginBottom: '0.35rem' }}>
                      {service.name}
                    </h3>
                    <p style={{ color: '#0369A1', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {service.price}
                    </p>
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
                        {copy.learnMore} <ArrowRight size={14} />
                      </Link>
                      <Link href={`${copy.quotePath}?product=${encodeURIComponent(service.name)}&category=${encodeURIComponent(copy.quoteCategory)}`} className="btn-amber" style={{ justifyContent: 'center' }}>
                        {copy.quoteCta} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </m.div>
                )
              })}
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', color: '#475569', fontSize: '0.95rem', marginBottom: '4rem' }}
            >
              Transparent starter pricing, no surprises.{' '}
              <Link href="/pricing" style={{ color: '#0369A1', fontWeight: 700 }}>See full pricing &amp; packages</Link>
            </m.p>

            {/* Bottom CTA */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55 }}
              style={{ background: '#0C1E3C', borderRadius: '1.5rem', padding: '3rem 2rem', textAlign: 'center' }}
            >
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>
                {copy.bottomTitle}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2rem' }}>
                {copy.bottomCopy}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center' }}>
                <Link href={copy.bottomQuoteHref} className="btn-amber">
                  {copy.bottomQuoteCta} <ArrowRight size={15} />
                </Link>
                <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
                  <Phone size={15} /> {PHONE_DISPLAY}
                </a>
                <Link href={copy.bottomVisibilityHref} className="btn-ghost">
                  {copy.bottomVisibilityCta} <ArrowRight size={15} />
                </Link>
              </div>
            </m.div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-base" style={{ backgroundColor: '#ffffff' }}>
          <div className="container-px">
            <m.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
              style={{ color: '#1C1917', textAlign: 'center', marginBottom: '2.5rem' }}
            >
              How It Works
            </m.h2>
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '960px', margin: '0 auto' }}
            >
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <m.div key={step.title} variants={scaleIn} className="white-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ width: '56px', height: '56px', background: 'rgba(3,105,161,0.08)', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <Icon size={26} color="#0369A1" />
                    </div>
                    <p style={{ color: '#0369A1', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.35rem' }}>STEP {i + 1}</p>
                    <h3 style={{ color: '#1C1917', marginBottom: '0.6rem' }}>{step.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 0 }}>{step.copy}</p>
                  </m.div>
                )
              })}
            </m.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-base" style={{ backgroundColor: '#FAF8F4' }}>
          <div className="container-px">
            <m.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
              style={{ color: '#1C1917', textAlign: 'center', marginBottom: '2.5rem' }}
            >
              Frequently Asked Questions
            </m.h2>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55 }}
              className="white-card"
              style={{ maxWidth: '760px', margin: '0 auto', padding: '0.5rem 2rem' }}
            >
              {FAQS.map(([q, a]) => (
                <details key={q} style={{ borderBottom: '1px solid #f1eee7', padding: '1.1rem 0' }}>
                  <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', listStyle: 'none', color: '#1C1917', fontWeight: 600, fontSize: '1rem' }}>
                    {q}
                    <ChevronDown size={18} color="#0369A1" style={{ flexShrink: 0 }} />
                  </summary>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, margin: '0.75rem 0 0' }}>{a}</p>
                </details>
              ))}
            </m.div>
          </div>
        </section>

        {/* Explore each service */}
        <section className="section-base" style={{ backgroundColor: '#ffffff' }}>
          <div className="container-px" style={{ textAlign: 'center' }}>
            <m.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
              style={{ color: '#1C1917', marginBottom: '2rem' }}
            >
              Explore Each Service
            </m.h2>
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '820px', margin: '0 auto' }}
            >
              {EXPLORE.map((item) => (
                <m.span key={item.href} variants={fadeUp}>
                  <Link href={item.href} className="btn-outline">
                    {item.name} <ArrowRight size={14} />
                  </Link>
                </m.span>
              ))}
            </m.div>
            <m.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
              style={{ color: '#475569', fontSize: '0.95rem', marginTop: '1.75rem', marginBottom: 0 }}
            >
              Need physical signs, banners, or print too?{' '}
              <Link href="/signage" style={{ color: '#0369A1', fontWeight: 700 }}>See our signage services</Link>
            </m.p>
          </div>
        </section>
      </>
    </LazyMotion>
  )
}
