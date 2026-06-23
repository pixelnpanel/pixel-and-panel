'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  ClipboardCheck,
  QrCode,
  Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport } from '@/lib/animations'

const WEBSITE_PACKAGES = [
  {
    name: 'Launch Page',
    badge: 'QUICK START',
    tone: 'entry',
    pricePrefix: 'Starting at',
    price: '$299',
    description:
      'A simple one-page website for personal brands, portfolios, or businesses that need a clean online starting point.',
    bestFor:
      'Personal brands, portfolios, simple landing pages, and early-stage businesses.',
    features: [
      'One-page website',
      'Mobile-friendly design',
      'Domain connection',
      'Basic contact section',
      'Professional email setup guidance',
      '1 round of revisions',
    ],
    cta: 'Get This Quote',
    href: '/quote-request?package=Launch%20Page&category=Digital%20Package',
  },
  {
    name: 'Starter Web Presence',
    badge: 'LAUNCH OFFER',
    tone: 'starter',
    regularPrice: '$599',
    pricePrefix: 'Starting at',
    price: '$499',
    savings: 'Save $100',
    description:
      'A clean starter website for new small businesses that need a professional online presence.',
    bestFor:
      'New businesses, contractors, solo service providers, and simple service businesses.',
    features: [
      'Up to 5 pages',
      'Mobile-friendly design',
      'Contact form connected to your email',
      'Basic SEO setup',
      'Domain connection',
      'Professional email setup guidance',
      '1 round of revisions',
    ],
    cta: 'Get This Quote',
    href: '/quote-request?package=Starter%20Web%20Presence&category=Digital%20Package',
  },
  {
    name: 'Local Business Website',
    badge: 'MOST POPULAR',
    tone: 'popular',
    regularPrice: '$899',
    pricePrefix: 'Starting at',
    price: '$799',
    savings: 'Save $100',
    description:
      'A stronger website package for local businesses that need service pages, lead capture, and better Google visibility.',
    bestFor:
      'Restaurants, contractors, auto shops, retail shops, local service businesses, and small teams.',
    features: [
      'Up to 7 pages',
      'Custom homepage layout',
      'Service pages',
      'Contact or quote form',
      'Professional email setup guidance',
      'Google Business Profile setup or cleanup',
      'Basic local SEO setup',
      'Google Analytics setup',
      '2 rounds of revisions',
    ],
    cta: 'Get This Quote',
    href: '/quote-request?package=Local%20Business%20Website&category=Digital%20Package',
  },
  {
    name: 'Website + Visibility Setup',
    badge: 'BEST VALUE',
    tone: 'value',
    regularPrice: '$1,199',
    pricePrefix: 'Starting at',
    price: '$999',
    savings: 'Save $200',
    description:
      'A website and visibility package that connects your site, Google presence, lead capture, and QR campaign setup.',
    bestFor: 'Businesses that want a complete starter visibility system.',
    features: [
      'Up to 10 pages',
      'Website design and development',
      'Pages set up to show on Google',
      'Google Business Profile optimization',
      'Quote/contact lead capture forms',
      'QR code campaign setup',
      'Basic visitor tracking setup',
      '2 rounds of revisions',
    ],
    cta: 'Get This Quote',
    href: '/quote-request?package=Website%20%2B%20Visibility%20Setup&category=Digital%20Package',
  },
]

const CARE_PLANS = [
  {
    name: 'Basic Care',
    price: 'Starting at $19/mo',
    features: [
      'Monthly website check',
      'Contact/quote form test',
      'Basic uptime review',
      'One small text update per month',
    ],
  },
  {
    name: 'Standard Care',
    price: 'Starting at $39/mo',
    features: [
      'Everything in Basic Care',
      'Small content or image edits',
      'Basic SEO check',
      'Monthly Google/profile visibility check',
    ],
  },
  {
    name: 'Growth Care',
    price: 'Starting at $49/mo',
    features: [
      'Everything in Standard Care',
      'Priority small edits',
      'QR campaign/link check',
      'Monthly improvement suggestions',
    ],
  },
]

const ADD_ONS = [
  ['Extra website page', 'starting at $75/page'],
  ['Landing page only', 'starting at $299'],
  ['QR campaign setup', 'starting at $149'],
  ['Google Business Profile cleanup', 'starting at $199'],
  ['Basic logo refresh', 'starting at $149'],
  ['Website care', 'starting at $19/mo'],
]

const SIGNAGE_EXAMPLES = [
  'Vinyl banners',
  'Yard signs',
  'Vehicle graphics',
  'Storefront signs',
  'Metal signs',
  'Business cards',
  'Flyers',
  'Menus',
]

const FAQS = [
  {
    q: 'Are these one-time prices?',
    a: 'Website packages are starting prices for one-time builds. Larger projects, extra pages, special integrations, or rushed timelines may increase the quote.',
  },
  {
    q: 'Do I own my website?',
    a: 'Yes. You own your website content and design once the project is paid in full. Hosting, domain, email, and third-party tools may be billed separately by those providers.',
  },
  {
    q: 'Is hosting included?',
    a: 'Hosting is not included in the one-time website price unless specifically quoted. Pixel & Panel can recommend simple hosting options and help connect your domain.',
  },
  {
    q: 'Is professional email included?',
    a: 'Professional email setup guidance is included. If a paid email platform is needed, the client pays that provider directly.',
  },
  {
    q: 'Can I start small and upgrade later?',
    a: 'Yes. Many businesses start with a Launch Page or Starter Web Presence and add more pages, QR campaigns, SEO setup, or signage later.',
  },
  {
    q: 'Do you offer signs and print too?',
    a: 'Yes. Pixel & Panel offers signage and print quote options including banners, yard signs, vehicle graphics, storefront signs, business cards, flyers, menus, and more.',
  },
  {
    q: 'Do you guarantee Google rankings?',
    a: 'No. Pixel & Panel sets up the SEO foundation and helps your business become easier to find, but no ethical provider can guarantee exact Google rankings.',
  },
  {
    q: 'Can I get discounted portfolio pricing?',
    a: 'Possibly. Pixel & Panel is currently accepting selected founding client projects at discounted rates in exchange for honest feedback and portfolio permission.',
  },
]

const DEFAULT_COPY = {
  heroLabel: 'Founding Client Pricing',
  heroTitlePrefix: 'Upfront Fixed Pricing and',
  heroTitleHighlight: 'Fast Custom Estimates',
  mobileHeroTitlePrefix: 'Transparent Packages',
  mobileHeroTitleHighlight: '& Quotes.',
  mobileHeroCopy:
    'Upfront starting prices for websites and rapid custom estimates for signs, banners, and print.',
  heroCopy:
    'Every marketing dollar your local company spends should have a clear purpose. We provide starting prices for fixed-scope website development and individual estimates for signage and print projects.',
  heroNote: 'Pricing may increase as availability becomes limited.',
  packageLabel: 'Starter Website Packages',
  packageTitle: 'Foundational Digital Visibility Packages',
  packageCopy:
    'Fixed starter rates for small business websites, local SEO foundations, Google Profile support, and lead capture tools.',
  launchPricingNote: 'Limited launch pricing for early Pixel & Panel clients.',
  packageNoteStart: 'Looking for the services behind these packages? Review the',
  packageNoteDigital: 'digital services',
  packageNoteMiddle: 'page, start with a',
  packageNoteVisibility: 'free visibility check',
  packageNoteEnd: 'if you are still unsure, or request a quote when you are ready.',
  digitalHref: '/digital',
  visibilityHref: '/free-visibility-check',
  bestForLabel: 'Best for',
  careLabel: 'Optional Monthly Support',
  careTitle: 'Website Care Plans',
  careCopy:
    'Optional monthly support for small updates, form checks, basic SEO review, and keeping your website running smoothly.',
  addOnsLabel: 'Common Add-ons',
  addOnsTitle: 'Add-ons',
  addOnsCopy: 'Simple add-ons are available when a starter package needs a few more pieces.',
  signageLabel: 'Quote-Based Signage',
  signageTitle: 'Custom Signage, Banners, and Printing Project Estimates',
  signageCopy:
    'Custom signs, channel letters, fleet wraps, banners, and printed materials vary by size, material, quantity, mounting needs, and permit requirements. Request a quote and Pixel & Panel will recommend the right option.',
  signageCta: 'Get a Signage Quote',
  signageHref: '/quote-request?product=Signage%20Project&category=Signage',
  foundingLabel: 'Limited Availability',
  foundingTitle: 'Founding Client Program',
  foundingCopy:
    'Pixel & Panel is accepting a limited number of Southeast Texas businesses at starter pricing while we build our local portfolio. Selected projects may qualify for discounted pricing in exchange for honest feedback, portfolio permission, and a testimonial if satisfied.',
  foundingCta: 'Ask About Founding Client Pricing',
  foundingHref: '/quote-request?product=Founding%20Client%20Program&category=Digital%20Services',
  faqTitle: 'Pricing Questions',
  finalTitle: 'Need Website, Visibility, or Signage Help?',
  finalCopyStart:
    'Tell Pixel & Panel what you need, and we will recommend a practical starter option for your budget and timeline. You can also compare the current',
  finalCopySignage: 'signage',
  finalCopyMiddle: 'and',
  finalCopyDigital: 'digital',
  finalCopyEnd: 'service options.',
  finalSignageHref: '/signage',
  finalDigitalHref: '/digital',
  finalQuoteHref: '/quote-request',
  finalQuoteCta: 'Request a Quote',
  finalVisibilityHref: '/free-visibility-check',
  finalVisibilityCta: 'Free Visibility Check',
}

const colors = {
  deep: 'var(--color-brand-deep)',
  sky: 'var(--color-brand-sky)',
  amber: 'var(--color-brand-amber)',
  cream: 'var(--color-brand-cream)',
  dark: 'var(--color-brand-dark)',
  navy: 'var(--color-brand-navy)',
}

function SectionIntro({ label, title, copy, align = 'center' }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      style={{
        textAlign: align,
        maxWidth: '720px',
        margin: align === 'center' ? '0 auto 3rem' : '0 0 2rem',
      }}
    >
      {label && (
        <motion.span variants={fadeUp} className="section-label">
          {label}
        </motion.span>
      )}
      <motion.h2 variants={fadeUp} style={{ color: colors.dark }}>
        {title}
      </motion.h2>
      {copy && (
        <motion.p
          variants={fadeUp}
          style={{
            color: '#5f6f7d',
            lineHeight: 1.75,
            marginTop: '0.75rem',
          }}
        >
          {copy}
        </motion.p>
      )}
    </motion.div>
  )
}

function PackageCard({ pkg, bestForLabel = DEFAULT_COPY.bestForLabel }) {
  const isDark = pkg.tone === 'popular' || pkg.tone === 'dark'
  const isStarter = pkg.tone === 'starter'
  const isValue = pkg.tone === 'value'
  const accentColor = isValue ? colors.amber : isStarter ? colors.sky : colors.deep
  const cardBackground = isDark
    ? `linear-gradient(145deg, ${colors.dark} 0%, ${colors.deep} 100%)`
    : isValue
      ? `linear-gradient(180deg, rgba(245, 158, 11, 0.13) 0%, ${colors.cream} 42%, ${colors.cream} 100%)`
      : isStarter
        ? `linear-gradient(180deg, rgba(14, 165, 233, 0.12) 0%, ${colors.cream} 42%, ${colors.cream} 100%)`
        : colors.cream
  const borderColor = isDark || isValue
    ? colors.amber
    : isStarter
      ? 'rgba(14, 165, 233, 0.42)'
      : 'rgba(3, 105, 161, 0.18)'
  const badgeBackground = isDark || isValue
    ? colors.amber
    : isStarter
      ? 'rgba(14, 165, 233, 0.14)'
      : 'rgba(3, 105, 161, 0.1)'
  const badgeColor = isDark || isValue ? colors.dark : accentColor
  const bodyColor = isDark ? 'rgba(250, 248, 244, 0.82)' : colors.dark
  const mutedColor = isDark ? 'rgba(250, 248, 244, 0.74)' : 'rgba(28, 25, 23, 0.72)'
  const priceValue = pkg.price || ''

  return (
    <motion.article
      variants={scaleIn}
      className="white-card"
      style={{
        background: cardBackground,
        borderColor,
        borderWidth: isDark || isValue ? '2px' : '1px',
        borderStyle: 'solid',
        borderRadius: '0.9rem',
        boxShadow: isDark
          ? '0 28px 70px rgba(28, 25, 23, 0.24)'
          : isValue
            ? '0 24px 60px rgba(245, 158, 11, 0.18)'
            : '0 18px 48px rgba(3, 105, 161, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        overflow: 'hidden',
        padding: '1.6rem',
        position: 'relative',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          background: accentColor,
          height: '5px',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
      {pkg.badge && (
        <span
          style={{
            alignSelf: 'flex-start',
            background: badgeBackground,
            borderRadius: '999px',
            color: badgeColor,
            fontFamily: 'var(--font-heading)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            marginBottom: '1rem',
            padding: '0.35rem 0.75rem',
            textTransform: 'uppercase',
          }}
        >
          {pkg.badge}
        </span>
      )}
      <h3 style={{ color: isDark ? colors.cream : colors.dark, marginBottom: '0.5rem' }}>
        {pkg.name}
      </h3>
      <p
        style={{
          color: mutedColor,
          lineHeight: 1.65,
          marginBottom: '1.35rem',
        }}
      >
        {pkg.description}
      </p>
      {pkg.regularPrice && (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '0.55rem',
          }}
        >
          <span
            style={{
              color: mutedColor,
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Regular
          </span>
          <span
            style={{
              color: mutedColor,
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 800,
              textDecoration: 'line-through',
            }}
          >
            {pkg.regularPrice}
          </span>
          {pkg.savings && (
            <span
              style={{
                background: isDark ? 'rgba(245, 158, 11, 0.16)' : 'rgba(245, 158, 11, 0.18)',
                border: `1px solid rgba(245, 158, 11, ${isDark ? 0.4 : 0.32})`,
                borderRadius: '999px',
                color: isDark ? colors.amber : colors.dark,
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.2rem 0.55rem',
              }}
            >
              {pkg.savings}
            </span>
          )}
        </div>
      )}
      <div
        style={{
          color: isDark ? colors.cream : colors.dark,
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '1.25rem',
        }}
      >
        {pkg.pricePrefix ? (
          <>
            <span
              style={{
                color: mutedColor,
                display: 'block',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
                textTransform: 'uppercase',
              }}
            >
              {pkg.pricePrefix}
            </span>
            <span style={{ fontSize: '2.25rem' }}>{priceValue}</span>
          </>
        ) : (
          <span style={{ fontSize: '1.65rem' }}>{priceValue}</span>
        )}
      </div>
      <Link
        href={pkg.href}
        className="btn-amber"
        style={{
          boxShadow: isDark
            ? '0 14px 30px rgba(245, 158, 11, 0.24)'
            : '0 12px 26px rgba(245, 158, 11, 0.2)',
          justifyContent: 'center',
          maxWidth: '100%',
          minHeight: '3.35rem',
          padding: isDark ? '1rem 1.2rem' : '0.95rem 1.15rem',
          textAlign: 'center',
          whiteSpace: 'normal',
          width: '100%',
        }}
      >
        {pkg.cta} <ArrowRight size={15} />
      </Link>
      <p
        style={{
          color: mutedColor,
          fontSize: '0.82rem',
          fontWeight: 700,
          marginBottom: '1.25rem',
          marginTop: '0.75rem',
          textAlign: 'center',
        }}
      >
        No payment required today
      </p>
      <div
        style={{
          background: isDark ? 'rgba(250, 248, 244, 0.08)' : 'rgba(250, 248, 244, 0.76)',
          border: `1px solid ${isDark ? 'rgba(250, 248, 244, 0.14)' : 'rgba(3, 105, 161, 0.12)'}`,
          borderRadius: '0.75rem',
          color: mutedColor,
          lineHeight: 1.6,
          marginBottom: '1.25rem',
          padding: '0.875rem',
        }}
      >
        <strong
          style={{
            color: isDark ? colors.amber : accentColor,
            display: 'block',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            marginBottom: '0.3rem',
            textTransform: 'uppercase',
          }}
        >
          {bestForLabel}
        </strong>
        {pkg.bestFor}
      </div>
      <ul
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: '0.7rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {pkg.features.map((feature) => (
          <li
            key={feature}
            style={{
              alignItems: 'flex-start',
              color: bodyColor,
              display: 'flex',
              gap: '0.6rem',
              lineHeight: 1.45,
            }}
          >
            <CheckCircle
              size={16}
              color={isDark || isValue ? colors.amber : accentColor}
              style={{ flexShrink: 0, marginTop: '0.18rem' }}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function CareCard({ plan }) {
  return (
    <motion.article
      variants={fadeUp}
      className="white-card"
      style={{
        borderRadius: '1rem',
        boxShadow: '0 12px 34px rgba(12, 30, 60, 0.07)',
        padding: '1.4rem',
      }}
    >
      <h3 style={{ color: colors.dark, marginBottom: '0.5rem' }}>{plan.name}</h3>
      <p
        style={{
          color: colors.deep,
          fontFamily: 'var(--font-heading)',
          fontSize: '1.25rem',
          fontWeight: 800,
          marginBottom: '1rem',
        }}
      >
        {plan.price}
      </p>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.7rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            style={{
              alignItems: 'flex-start',
              color: '#475569',
              display: 'flex',
              gap: '0.6rem',
              lineHeight: 1.45,
            }}
          >
            <ClipboardCheck
              size={16}
              color={colors.amber}
              style={{ flexShrink: 0, marginTop: '0.16rem' }}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function PricingPage({
  websitePackages = WEBSITE_PACKAGES,
  carePlans = CARE_PLANS,
  addOns = ADD_ONS,
  signageExamples = SIGNAGE_EXAMPLES,
  faqs = FAQS,
  copy = DEFAULT_COPY,
} = {}) {
  return (
    <>
      <section
        className="pnp-mobile-hero"
        style={{
          background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.deep} 100%)`,
          overflow: 'hidden',
          padding: '7rem 1rem 4.5rem',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
            backgroundSize: '36px 36px',
            inset: 0,
            pointerEvents: 'none',
            position: 'absolute',
          }}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ margin: '0 auto', maxWidth: '820px', position: 'relative' }}
        >
          <motion.span variants={fadeUp} className="section-label">
            {copy.heroLabel}
          </motion.span>
          <motion.h1 variants={fadeUp} className="pnp-mobile-hero-title" style={{ color: 'white', marginBottom: '1.25rem' }}>
            <span className="md:hidden">
              {copy.mobileHeroTitlePrefix || copy.heroTitlePrefix}{' '}
              <br />
              <span style={{ color: colors.amber }}>{copy.mobileHeroTitleHighlight || copy.heroTitleHighlight}</span>
            </span>
            <span className="hidden md:inline">
              {copy.heroTitlePrefix}{' '}
              <span style={{ color: colors.amber }}>{copy.heroTitleHighlight}</span>
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="pnp-mobile-hero-copy md:hidden"
            style={{
              color: 'rgba(255,255,255,0.76)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              margin: '0 auto 1rem',
              maxWidth: '720px',
            }}
          >
            {copy.mobileHeroCopy || copy.heroCopy}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="hidden md:block"
            style={{
              color: 'rgba(255,255,255,0.76)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              margin: '0 auto 1rem',
              maxWidth: '720px',
            }}
          >
            {copy.heroCopy}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="pnp-mobile-hero-note"
            style={{
              color: colors.amber,
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 700,
            }}
          >
            {copy.heroNote}
          </motion.p>
        </motion.div>
      </section>

      <section className="section-base" style={{ backgroundColor: colors.cream }}>
        <div className="container-px">
          <SectionIntro
            label={copy.packageLabel}
            title={copy.packageTitle}
            copy={copy.packageCopy}
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{
              alignItems: 'center',
              background: 'rgba(245, 158, 11, 0.13)',
              border: '1px solid rgba(245, 158, 11, 0.28)',
              borderRadius: '999px',
              color: colors.dark,
              display: 'flex',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 800,
              justifyContent: 'center',
              lineHeight: 1.4,
              margin: '-1rem auto 2rem',
              maxWidth: '520px',
              padding: '0.75rem 1rem',
              textAlign: 'center',
            }}
          >
            {copy.launchPricingNote}
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{
              alignItems: 'stretch',
              display: 'grid',
              gap: '1.25rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            }}
          >
            {websitePackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} bestForLabel={copy.bestForLabel} />
            ))}
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{
              color: '#5f6f7d',
              lineHeight: 1.7,
              margin: '2rem auto 0',
              maxWidth: '780px',
              textAlign: 'center',
            }}
          >
            {copy.packageNoteStart}{' '}
            <Link href={copy.digitalHref} style={{ color: colors.deep, fontWeight: 700 }}>
              {copy.packageNoteDigital}
            </Link>{' '}
            {copy.packageNoteMiddle}{' '}
            <Link href={copy.visibilityHref} style={{ color: colors.deep, fontWeight: 700 }}>
              {copy.packageNoteVisibility}
            </Link>{' '}
            {copy.packageNoteEnd}
          </motion.div>
        </div>
      </section>

      <section className="section-base" style={{ backgroundColor: colors.cream }}>
        <div className="container-px">
          <SectionIntro
            label={copy.careLabel}
            title={copy.careTitle}
            copy={copy.careCopy}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{
              display: 'grid',
              gap: '1.25rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            }}
          >
            {carePlans.map((plan) => (
              <CareCard key={plan.name} plan={plan} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-base" style={{ backgroundColor: colors.cream }}>
        <div className="container-px">
          <SectionIntro
            label={copy.addOnsLabel}
            title={copy.addOnsTitle}
            copy={copy.addOnsCopy}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            }}
          >
            {addOns.map(([name, price]) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="white-card"
                style={{
                  alignItems: 'flex-start',
                  borderRadius: '1rem',
                  display: 'flex',
                  gap: '0.8rem',
                  padding: '1rem',
                }}
              >
                <BadgeCheck
                  size={18}
                  color={colors.deep}
                  style={{ flexShrink: 0, marginTop: '0.15rem' }}
                />
                <div>
                  <h3 style={{ color: colors.dark, fontSize: '1rem', marginBottom: '0.2rem' }}>
                    {name}
                  </h3>
                  <p style={{ color: '#5f6f7d' }}>{price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-base" style={{ backgroundColor: colors.cream }}>
        <div className="container-px">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="white-card"
            style={{
              border: `1px solid rgba(3, 105, 161, 0.18)`,
              borderRadius: '1rem',
              boxShadow: '0 18px 48px rgba(12, 30, 60, 0.08)',
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            <motion.div variants={fadeUp}>
              <span className="section-label" style={{ color: colors.amber }}>
                {copy.signageLabel}
              </span>
              <h2 style={{ color: colors.dark, marginBottom: '1rem' }}>
                {copy.signageTitle}
              </h2>
              <p style={{ color: '#5f6f7d', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                {copy.signageCopy}
              </p>
              <Link
                href={copy.signageHref}
                className="btn-amber"
                style={{ maxWidth: '100%', whiteSpace: 'normal' }}
              >
                {copy.signageCta} <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div
              variants={stagger}
              style={{
                display: 'grid',
                gap: '0.85rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              }}
            >
              {signageExamples.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  style={{
                    alignItems: 'center',
                    background: '#F8FAFC',
                    borderRadius: '0.75rem',
                    color: '#475569',
                    display: 'flex',
                    gap: '0.6rem',
                    padding: '0.85rem',
                  }}
                >
                  <QrCode size={16} color={colors.amber} style={{ flexShrink: 0 }} />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-base" style={{ backgroundColor: colors.cream }}>
        <div className="container-px">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{
              background: colors.navy,
              borderRadius: '1rem',
              boxShadow: '0 22px 54px rgba(12, 30, 60, 0.18)',
              color: 'white',
              overflow: 'hidden',
              padding: 'clamp(1.5rem, 5vw, 3rem)',
              position: 'relative',
            }}
          >
            <motion.div
              variants={fadeUp}
              style={{
                alignItems: 'center',
                display: 'inline-flex',
                gap: '0.6rem',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={18} color={colors.amber} />
              <span className="section-label" style={{ color: colors.amber, marginBottom: 0 }}>
                {copy.foundingLabel}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ color: 'white', marginBottom: '1rem' }}>
              {copy.foundingTitle}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                color: 'rgba(255,255,255,0.76)',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
                maxWidth: '820px',
              }}
            >
              {copy.foundingCopy}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href={copy.foundingHref}
                className="btn-amber"
                style={{ maxWidth: '100%', whiteSpace: 'normal' }}
              >
                {copy.foundingCta} <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-base" style={{ backgroundColor: colors.cream }}>
        <div className="container-px">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ margin: '0 auto', maxWidth: '840px' }}
          >
            <motion.h2
              variants={fadeUp}
              style={{ color: colors.dark, marginBottom: '2rem', textAlign: 'center' }}
            >
              {copy.faqTitle}
            </motion.h2>
            {faqs.map((item) => (
              <motion.article
                key={item.q}
                variants={fadeUp}
                className="white-card"
                style={{
                  borderRadius: '1rem',
                  marginBottom: '1rem',
                  padding: '1.25rem',
                }}
              >
                <h3 style={{ color: colors.dark, fontSize: '1.05rem', marginBottom: '0.55rem' }}>
                  {item.q}
                </h3>
                <p style={{ color: '#5f6f7d', lineHeight: 1.7 }}>{item.a}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="section-base"
        style={{ background: colors.navy, textAlign: 'center' }}
      >
        <div className="container-px">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ margin: '0 auto', maxWidth: '700px' }}
          >
            <motion.h2 variants={fadeUp} style={{ color: 'white', marginBottom: '1rem' }}>
              {copy.finalTitle}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.75,
                marginBottom: '2rem',
              }}
            >
              {copy.finalCopyStart}{' '}
              <Link href={copy.finalSignageHref} style={{ color: colors.amber, fontWeight: 700 }}>
                {copy.finalCopySignage}
              </Link>{' '}
              {copy.finalCopyMiddle}{' '}
              <Link href={copy.finalDigitalHref} style={{ color: colors.amber, fontWeight: 700 }}>
                {copy.finalCopyDigital}
              </Link>{' '}
              {copy.finalCopyEnd}
            </motion.p>
            <motion.div variants={fadeUp}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center' }}>
                <Link href={copy.finalQuoteHref} className="btn-amber">
                  {copy.finalQuoteCta} <ArrowRight size={15} />
                </Link>
                <Link href={copy.finalVisibilityHref} className="btn-ghost">
                  {copy.finalVisibilityCta} <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
