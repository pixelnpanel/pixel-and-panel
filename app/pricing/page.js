'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, QrCode } from 'lucide-react'

const WEBSITE_PACKAGES = [
    {
        name: 'Starter Site',
        price: '997',
        description: 'A clean, fast, mobile-first website for businesses just getting started online.',
        features: [
            'Up to 5 pages',
            'Mobile-first responsive design',
            'Contact form connected to your email',
            'Google Business Profile setup',
            'Basic local SEO optimization',
            'Free domain connection',
            '1 round of revisions',
        ],
        cta: 'Get Started',
        highlight: false,
    },
    {
        name: 'Business Site',
        price: '1,997',
        description: 'A full professional website built to rank on Google and convert visitors into leads.',
        features: [
            'Up to 10 pages',
            'Custom design built for your brand',
            'Contact form + quote request form',
            'Google Business Profile optimization',
            'Full local SEO setup',
            'Google Analytics integration',
            'QR code campaign setup',
            '2 rounds of revisions',
        ],
        cta: 'Most Popular',
        highlight: true,
    },
    {
        name: 'Growth Site',
        price: '3,497',
        description: 'A high-performance website with CRM integration and full digital marketing setup.',
        features: [
            'Up to 20 pages',
            'Premium custom design',
            'CRM integration & automated follow-up',
            'Full local SEO + content strategy',
            'Google Business Profile management',
            'QR code campaign tracking',
            'Google Ads setup (ad spend separate)',
            '3 rounds of revisions',
        ],
        cta: 'Get Started',
        highlight: false,
    },
]

const MONTHLY_PACKAGES = [
    {
        name: 'Local Presence',
        price: '297',
        period: '/month',
        description: 'Keep your Google Business Profile optimized and your local rankings growing.',
        features: [
            'Google Business Profile management',
            'Monthly post updates',
            'Review monitoring & response',
            'Local citation maintenance',
            'Monthly ranking report',
        ],
        cta: 'Get Started',
        highlight: false,
    },
    {
        name: 'Local SEO',
        price: '597',
        period: '/month',
        description: 'Full local SEO management to rank higher and get more calls from Google.',
        features: [
            'Everything in Local Presence',
            'On-page SEO optimization',
            'Monthly content updates',
            'Competitor tracking',
            'Keyword ranking reports',
            'Google Analytics review',
        ],
        cta: 'Most Popular',
        highlight: true,
    },
    {
        name: 'Full Digital',
        price: '997',
        period: '/month',
        description: 'Complete digital marketing management — SEO, CRM, and QR campaign tracking.',
        features: [
            'Everything in Local SEO',
            'CRM setup & automation',
            'Lead follow-up sequences',
            'QR code campaign tracking',
            'Monthly performance dashboard',
            'Priority support',
        ],
        cta: 'Get Started',
        highlight: false,
    },
]

function PricingCard({ pkg, isMonthly }) {
    return (
        <div style={{
            background: pkg.highlight ? '#0C1E3C' : 'white',
            borderRadius: '1.25rem',
            padding: '2rem',
            border: pkg.highlight ? '2px solid #F59E0B' : '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: pkg.highlight ? '0 20px 60px rgba(12,30,60,0.2)' : '0 1px 4px rgba(0,0,0,0.04)',
        }}>
            {pkg.highlight && (
                <div style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#F59E0B',
                    color: '#1C1917',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.35rem 1.25rem',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap',
                }}>
                    Most Popular
                </div>
            )}

            <h3 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
                fontSize: '1.15rem',
                color: pkg.highlight ? 'white' : '#1C1917',
                marginBottom: '0.5rem',
            }}>
                {pkg.name}
            </h3>

            <p style={{
                color: pkg.highlight ? 'rgba(255,255,255,0.6)' : '#64748b',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
            }}>
                {pkg.description}
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: '2.75rem',
                    color: pkg.highlight ? 'white' : '#1C1917',
                    lineHeight: 1,
                }}>
                    ${pkg.price}
                </span>
                {pkg.period && (
                    <span style={{ color: pkg.highlight ? 'rgba(255,255,255,0.5)' : '#94a3b8', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                        {pkg.period}
                    </span>
                )}
                {!pkg.period && (
                    <span style={{ color: pkg.highlight ? 'rgba(255,255,255,0.5)' : '#94a3b8', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
                        one-time
                    </span>
                )}
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, marginBottom: '2rem' }}>
                {pkg.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: pkg.highlight ? 'rgba(255,255,255,0.8)' : '#475569', lineHeight: 1.5 }}>
                        <CheckCircle size={15} color={pkg.highlight ? '#F59E0B' : '#0369A1'} style={{ flexShrink: 0, marginTop: '1px' }} />
                        {f}
                    </li>
                ))}
            </ul>

            <Link href="/quote-request" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: pkg.highlight ? '#F59E0B' : '#0C1E3C',
                color: pkg.highlight ? '#1C1917' : 'white',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.875rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
            }}>
                Get a Quote <ArrowRight size={14} />
            </Link>
        </div>
    )
}

export default function PricingPage() {
    return (
        <>

            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 100%)',
                padding: '7rem 1.5rem 4rem',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
                    backgroundSize: '36px 36px',
                    pointerEvents: 'none',
                }} />
                <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
                    <span style={{
                        display: 'inline-block',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#0EA5E9',
                        marginBottom: '1rem',
                    }}>
                        Transparent Pricing
                    </span>
                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        color: 'white',
                        fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                        lineHeight: 1.1,
                        marginBottom: '1.25rem',
                    }}>
                        Simple Pricing.
                        <br />
                        <span style={{ color: '#F59E0B' }}>No Surprises. No Contracts.</span>
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.65)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.05rem',
                        lineHeight: 1.7,
                    }}>
                        Every project starts with a free quote. Digital services are month-to-month
                        — cancel anytime. Signage is quoted per project with no hidden fees.
                    </p>
                </div>
            </section>

            {/* Website Packages */}
            <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FAF8F4' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            display: 'inline-block',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#0EA5E9',
                            marginBottom: '0.75rem',
                        }}>
                            One-Time Investment
                        </span>
                        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: '#1C1917', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                            Website Packages
                        </h2>
                        <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', marginTop: '0.75rem', maxWidth: '480px', margin: '0.75rem auto 0' }}>
                            A one-time investment. You own your website outright — no monthly platform fees, no lock-in.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        alignItems: 'start',
                    }}>
                        {WEBSITE_PACKAGES.map((pkg) => (
                            <PricingCard key={pkg.name} pkg={pkg} isMonthly={false} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Monthly Packages */}
            <section style={{ padding: '5rem 1.5rem', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            display: 'inline-block',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#0EA5E9',
                            marginBottom: '0.75rem',
                        }}>
                            Monthly Services
                        </span>
                        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: '#1C1917', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                            Ongoing Digital Marketing
                        </h2>
                        <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', marginTop: '0.75rem', maxWidth: '480px', margin: '0.75rem auto 0' }}>
                            Month-to-month. No contracts. Cancel anytime. Most clients see results within 60–90 days.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        alignItems: 'start',
                    }}>
                        {MONTHLY_PACKAGES.map((pkg) => (
                            <PricingCard key={pkg.name} pkg={pkg} isMonthly={true} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Signage — Quote Based */}
            <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FAF8F4' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#F59E0B',
                        marginBottom: '0.75rem',
                    }}>
                        Physical Signage
                    </span>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: '#1C1917', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
                        Signage is Quoted Per Project
                    </h2>
                    <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '560px', margin: '0 auto 2rem' }}>
                        Every signage order is custom — size, quantity, material, and design all affect the final price.
                        We quote every project individually so you get an accurate number, not a rough estimate.
                        All signage includes a free QR code with tracking.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '0.875rem',
                        marginBottom: '2.5rem',
                        textAlign: 'left',
                    }}>
                        {['Yard Signs', 'Vinyl Banners', 'Car Magnets', 'Metal Signs', 'Vehicle Wraps', 'Window Graphics', 'A-Frame Signs', 'Feather Flags'].map((item) => (
                            <div key={item} style={{
                                background: 'white',
                                borderRadius: '0.75rem',
                                padding: '0.875rem 1rem',
                                border: '1px solid #f1f5f9',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.875rem',
                                color: '#475569',
                            }}>
                                <QrCode size={14} color="#F59E0B" style={{ flexShrink: 0 }} />
                                {item}
                            </div>
                        ))}
                    </div>

                    <Link href="/quote-request" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#F59E0B',
                        color: '#1C1917',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '1rem 2rem',
                        borderRadius: '0.875rem',
                        textDecoration: 'none',
                    }}>
                        Get a Free Signage Quote <ArrowRight size={15} />
                    </Link>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '5rem 1.5rem', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: '#1C1917', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '2.5rem', textAlign: 'center' }}>
                        Pricing Questions
                    </h2>
                    {[
                        {
                            q: 'Are there any contracts for monthly services?',
                            a: 'No contracts, ever. All monthly digital services are month-to-month. You can cancel anytime with 30 days notice.',
                        },
                        {
                            q: 'What is included in the website price?',
                            a: 'Design, development, copywriting guidance, basic SEO setup, contact form, and mobile optimization. Hosting is separate — we recommend Vercel (free tier available).',
                        },
                        {
                            q: 'How quickly can I get a signage quote?',
                            a: 'We respond to all quote requests within 1 business day. Most signage orders are fulfilled within 5-7 business days after design approval.',
                        },
                        {
                            q: 'Do all signs really include a QR code?',
                            a: 'Yes — every sign we produce includes a dynamic QR code at no extra charge. The QR code links to your website or landing page and tracks every scan.',
                        },
                        {
                            q: 'Can I bundle a website with monthly SEO?',
                            a: 'Absolutely — and we recommend it. Clients who bundle a website build with ongoing SEO see significantly better results than either service alone.',
                        },
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'white',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            marginBottom: '1rem',
                            border: '1px solid #f1f5f9',
                        }}>
                            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#1C1917', fontSize: '1rem', marginBottom: '0.625rem' }}>
                                {item.q}
                            </h3>
                            <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section style={{ padding: '5rem 1.5rem', background: '#0C1E3C', textAlign: 'center' }}>
                <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
                        Not Sure What You Need?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', lineHeight: 1.75, marginBottom: '2rem' }}>
                        Tell us about your business and we will recommend exactly what makes sense
                        for your budget and goals — no pressure, no jargon.
                    </p>
                    <Link href="/quote-request" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#F59E0B',
                        color: '#1C1917',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '1rem 2rem',
                        borderRadius: '0.875rem',
                        textDecoration: 'none',
                    }}>
                        Get a Free Consultation <ArrowRight size={15} />
                    </Link>
                </div>
            </section>
        </>
    )
}