'use client'

import { useEffect, useRef, useState } from 'react'
import { Globe, Search, BarChart2 } from 'lucide-react'

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

const PROBLEMS = [
    {
        icon: Globe,
        iconBg: '#FEF2F2',
        iconColor: '#EF4444',
        title: 'No Website',
        description: 'When a potential customer hears about your business and Googles you — they find nothing. Or worse, they find your competitor instead.',
    },
    {
        icon: Search,
        iconBg: '#FFF7ED',
        iconColor: '#F97316',
        title: 'No Google Presence',
        description: '80% of local searches lead to a visit or a call. If you\'re not on Google Maps, that business is going to someone else — every single day.',
    },
    {
        icon: BarChart2,
        iconBg: '#FEFCE8',
        iconColor: '#EAB308',
        title: 'No Way to Track Results',
        description: 'You\'re spending money on signs and ads without knowing if any of it is working. That\'s not a marketing budget — that\'s a guess.',
    },
]

export default function TheProblem() {
    const isMobile = useIsMobile()
    const [headRef, headInView] = useInView()

    return (
        <section style={{ padding: isMobile ? '3rem 1.25rem' : '5rem 1.5rem', backgroundColor: '#FAF8F4' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div ref={headRef} style={{
                    textAlign: 'center',
                    marginBottom: '2.5rem',
                    opacity: headInView ? 1 : 0,
                    transform: headInView ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                    <span className="section-label">The Visibility Gap</span>
                    <h2 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        color: '#1C1917',
                        lineHeight: 1.15,
                        fontSize: isMobile ? '1.75rem' : 'clamp(1.75rem, 4vw, 3rem)',
                    }}>
                        Your Competitors Are Getting
                        <br />
                        <span style={{ color: '#0369A1' }}>Found Online. Are You?</span>
                    </h2>
                    <p style={{
                        color: '#64748b',
                        fontFamily: 'Inter, sans-serif',
                        marginTop: '1rem',
                        maxWidth: '520px',
                        margin: '1rem auto 0',
                        lineHeight: 1.7,
                        fontSize: isMobile ? '0.95rem' : '1rem',
                    }}>
                        Most local businesses rely 100% on word of mouth and signage.
                        That worked 20 years ago. Today, your customers search online
                        first — and if you're not there, you don't exist.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '1.25rem',
                }}>
                    {PROBLEMS.map((p, i) => {
                        const [cardRef, cardInView] = useInView()
                        const Icon = p.icon
                        return (
                            <div key={p.title} ref={cardRef} style={{
                                background: 'white',
                                borderRadius: '1rem',
                                padding: '1.75rem',
                                border: '1px solid #f1f5f9',
                                opacity: cardInView ? 1 : 0,
                                transform: cardInView ? 'translateY(0)' : 'translateY(28px)',
                                transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s`,
                            }}>
                                <div style={{ width: '48px', height: '48px', background: p.iconBg, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                    <Icon size={22} color={p.iconColor} />
                                </div>
                                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#1C1917', marginBottom: '0.75rem' }}>{p.title}</h3>
                                <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.7 }}>{p.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}