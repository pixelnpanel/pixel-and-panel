'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Laptop, Tag, TrendingUp } from 'lucide-react'

function useInView() {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return [ref, inView]
}

const STEPS = [
    {
        number: '01',
        icon: Laptop,
        color: '#0EA5E9',
        bg: 'rgba(14,165,233,0.1)',
        title: 'We Build Your Digital Presence',
        description: 'We create your website, set up your Google Business Profile, and optimize your local SEO — so when customers in your city search for your service, they find you first.',
    },
    {
        number: '02',
        icon: Tag,
        color: '#F59E0B',
        bg: 'rgba(245,158,11,0.1)',
        title: 'We Create Signage With Built-In QR Codes',
        description: 'Every sign we design includes a dynamic QR code tied to your business. Yard signs, banners, vehicle wraps — each one becomes a direct path from the street to your website.',
    },
    {
        number: '03',
        icon: TrendingUp,
        color: '#4ade80',
        bg: 'rgba(74,222,128,0.1)',
        title: 'You See Real Results — In Real Time',
        description: 'Every QR scan logs in your CRM automatically. You see exactly which signs are working, how many visitors hit your site, and how many turned into real leads. No more guessing.',
    },
]

export default function HowItWorks() {
    const [ref, inView] = useInView()

    return (
        <section
            id="how-it-works"
            ref={ref}
            style={{ padding: '5rem 1.5rem', backgroundColor: '#FAF8F4' }}
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                    <span className="section-label">How It Works</span>
                    <h2 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        color: '#1C1917',
                        fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                        lineHeight: 1.15,
                    }}>
                        Simple. Trackable. Done Right.
                    </h2>
                    <p style={{
                        color: '#64748b',
                        fontFamily: 'Inter, sans-serif',
                        marginTop: '1rem',
                        maxWidth: '480px',
                        margin: '1rem auto 0',
                        lineHeight: 1.7,
                    }}>
                        Three steps. One agency. A system that connects your physical
                        presence to your digital one — and proves it's working.
                    </p>
                </div>

                {/* Steps */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                }}>
                    {STEPS.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={step.number}
                                style={{
                                    textAlign: 'center',
                                    padding: '2rem 1.5rem',
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(28px)',
                                    transition: `opacity 0.55s ease ${0.2 + i * 0.15}s, transform 0.55s ease ${0.2 + i * 0.15}s`,
                                }}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: step.bg,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.25rem',
                                }}>
                                    <Icon size={24} color={step.color} />
                                </div>
                                <div style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 900,
                                    fontSize: '3.5rem',
                                    color: step.color,
                                    opacity: 0.12,
                                    lineHeight: 1,
                                    marginBottom: '0.25rem',
                                    marginTop: '-0.5rem',
                                }}>
                                    {step.number}
                                </div>
                                <h3 style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    color: '#1C1917',
                                    marginBottom: '0.75rem',
                                    lineHeight: 1.3,
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    color: '#64748b',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.7,
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.7s' }}>
                    <Link href="/quote-request" className="btn-amber">
                        Start with a Free Quote
                    </Link>
                </div>

            </div>
        </section>
    )
}