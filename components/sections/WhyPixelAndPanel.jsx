'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Layers, QrCode, FileX } from 'lucide-react'

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])
    return isMobile
}

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
    const isMobile = useIsMobile()
    const [ref, inView] = useInView()

    return (
        <section ref={ref} style={{ padding: isMobile ? '3rem 1.25rem' : '5rem 1.5rem', backgroundColor: '#FAF8F4' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                <div style={{
                    textAlign: 'center',
                    marginBottom: '2.5rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                    <span className="section-label">Why Pixel &amp; Panel</span>
                    <h2 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        color: '#1C1917',
                        fontSize: isMobile ? '1.75rem' : 'clamp(1.75rem, 4vw, 3rem)',
                        lineHeight: 1.15,
                    }}>
                        We Built This for{' '}
                        <span style={{ color: '#0369A1' }}>Businesses Like Yours.</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '1.25rem',
                }}>
                    {ITEMS.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <div key={item.title} style={{
                                background: 'white',
                                borderRadius: '1rem',
                                padding: isMobile ? '1.5rem' : '2rem',
                                border: '1px solid #f1f5f9',
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                                transition: `opacity 0.55s ease ${0.15 + i * 0.12}s, transform 0.55s ease ${0.15 + i * 0.12}s`,
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'rgba(3,105,161,0.08)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.25rem',
                                }}>
                                    <Icon size={22} color="#0369A1" />
                                </div>
                                <h3 style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 700,
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    color: '#1C1917',
                                    marginBottom: '0.75rem',
                                    lineHeight: 1.3,
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    color: '#64748b',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.7,
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}