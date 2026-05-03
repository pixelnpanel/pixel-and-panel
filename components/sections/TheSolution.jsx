'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Monitor, QrCode } from 'lucide-react'

function useInView(threshold = 0.1) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [threshold])
    return [ref, inView]
}

function QRBridge({ inView }) {
    const [scanning, setScanning] = useState(false)
    const [pinged, setPinged] = useState(false)

    useEffect(() => {
        if (!inView) return
        let running = true
        const loop = async () => {
            if (!running) return
            await new Promise(r => setTimeout(r, 1000))
            if (!running) return
            setScanning(true)
            await new Promise(r => setTimeout(r, 1400))
            if (!running) return
            setScanning(false)
            setPinged(true)
            await new Promise(r => setTimeout(r, 600))
            if (!running) return
            setPinged(false)
            await new Promise(r => setTimeout(r, 800))
            if (running) loop()
        }
        loop()
        return () => { running = false }
    }, [inView])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>

            {/* Physical Sign */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-24px)',
                transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}>
                <div style={{
                    width: '120px',
                    height: '80px',
                    background: '#F59E0B',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
                    border: '3px solid #FCD34D',
                    padding: '0.5rem',
                }}>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '0.65rem', color: '#1C1917', textAlign: 'center', lineHeight: 1.2 }}>
                        MARTINEZ<br />HVAC
                    </p>
                    <div style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.8)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
                        <QrCode size={16} color="#1C1917" />
                    </div>
                </div>
                <div style={{ width: '6px', height: '20px', background: '#64748b' }} />
                <div style={{ width: '28px', height: '4px', background: '#475569', borderRadius: '2px' }} />
                <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>Your Sign</p>
            </div>

            {/* QR Scan Animation */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.85)',
                transition: 'opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s',
            }}>
                <div style={{ position: 'relative' }}>
                    {/* Pulse ring */}
                    <div style={{
                        position: 'absolute',
                        inset: '-8px',
                        borderRadius: '1rem',
                        border: '2px solid rgba(14,165,233,0.4)',
                        animation: 'qrpulse 2s infinite',
                    }} />
                    {/* QR Box */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'white',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '2px',
                        padding: '8px',
                    }}>
                        {[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1].map((filled, i) => (
                            <div key={i} style={{
                                background: filled ? '#1C1917' : 'transparent',
                                borderRadius: '2px',
                            }} />
                        ))}
                        {/* Scan line */}
                        <div style={{
                            position: 'absolute',
                            left: '6px',
                            right: '6px',
                            height: '2px',
                            background: '#0EA5E9',
                            boxShadow: '0 0 8px 2px rgba(14,165,233,0.6)',
                            borderRadius: '1px',
                            top: scanning ? 'calc(100% - 10px)' : '8px',
                            opacity: scanning ? 1 : 0,
                            transition: scanning
                                ? 'top 1.4s linear, opacity 0.1s ease'
                                : 'opacity 0.3s ease',
                        }} />
                    </div>
                </div>
                <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#0EA5E9', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Customer Scans
                </p>
            </div>

            {/* Phone / CRM */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(24px)',
                transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}>
                <div style={{
                    width: '72px',
                    height: '112px',
                    background: '#071527',
                    borderRadius: '16px',
                    border: `2px solid ${pinged ? 'rgba(245,158,11,0.8)' : 'rgba(14,165,233,0.35)'}`,
                    boxShadow: pinged ? '0 0 24px rgba(245,158,11,0.25)' : '0 8px 24px rgba(14,165,233,0.1)',
                    overflow: 'hidden',
                    padding: '8px 6px',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                }}>
                    <div style={{ width: '28px', height: '4px', background: '#1e293b', borderRadius: '2px', margin: '0 auto 8px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ height: '6px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px' }} />
                        <div style={{ height: '6px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px', width: '75%' }} />
                        <div style={{
                            height: '28px',
                            background: pinged ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.08)',
                            border: `1px solid ${pinged ? 'rgba(245,158,11,0.5)' : 'rgba(245,158,11,0.2)'}`,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s',
                        }}>
                            <span style={{ fontSize: '8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: '#F59E0B', letterSpacing: '0.05em' }}>
                                NEW LEAD
                            </span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px' }} />
                        <div style={{ height: '6px', background: 'rgba(14,165,233,0.2)', borderRadius: '3px', width: '60%' }} />
                    </div>
                </div>
                <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>
                    Lands in Your CRM
                </p>
            </div>

            <style>{`
        @keyframes qrpulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.15); }
        }
      `}</style>
        </div>
    )
}

export default function TheSolution() {
    const [ref, inView] = useInView()

    return (
        <section ref={ref} style={{
            padding: '5rem 1.5rem',
            background: '#0C1E3C',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Dot grid */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,165,233,0.12) 1px, transparent 0)',
                backgroundSize: '36px 36px',
                pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(22px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                    <span className="section-label">The Phygital Difference</span>
                    <h2 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.15,
                        fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                    }}>
                        One Company. Two Worlds.
                        <br />
                        <span style={{ color: '#F59E0B' }}>Zero Gap Between Them.</span>
                    </h2>
                    <p style={{
                        color: 'rgba(255,255,255,0.55)',
                        fontFamily: 'Inter, sans-serif',
                        marginTop: '1rem',
                        maxWidth: '520px',
                        margin: '1rem auto 0',
                        lineHeight: 1.7,
                    }}>
                        Most businesses treat signage and digital marketing as two separate
                        expenses. We connect them into one system — where every sign you put
                        up drives measurable online results.
                    </p>
                </div>

                {/* Three column layout */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    marginBottom: '4rem',
                }}>
                    {/* Left: Signage */}
                    <div style={{
                        flex: 1,
                        minWidth: '200px',
                        maxWidth: '280px',
                        textAlign: 'right',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateX(0)' : 'translateX(-24px)',
                        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'rgba(245,158,11,0.12)',
                            border: '1px solid rgba(245,158,11,0.25)',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 'auto',
                            marginBottom: '1rem',
                            fontSize: '1.5rem',
                        }}>🪧</div>
                        <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#F59E0B', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                            Physical Signage
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', lineHeight: 1.7 }}>
                            Yard signs. Banners. Vehicle wraps. Everything your customers see on the street — professionally made and built to convert.
                        </p>
                    </div>

                    {/* Center: QR Bridge */}
                    <div style={{ flexShrink: 0 }}>
                        <QRBridge inView={inView} />
                    </div>

                    {/* Right: Digital */}
                    <div style={{
                        flex: 1,
                        minWidth: '200px',
                        maxWidth: '280px',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateX(0)' : 'translateX(24px)',
                        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'rgba(14,165,233,0.12)',
                            border: '1px solid rgba(14,165,233,0.25)',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                        }}>
                            <Monitor size={24} color="#0EA5E9" />
                        </div>
                        <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#0EA5E9', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                            Digital Presence
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', lineHeight: 1.7 }}>
                            A fast website. Google rankings. A CRM that follows up automatically. Every customer tracked from scan to close.
                        </p>
                    </div>
                </div>

                {/* CTAs */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.5s',
                }}>
                    <Link href="/digital" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.875rem 1.5rem',
                        background: 'rgba(14,165,233,0.12)',
                        border: '1px solid rgba(14,165,233,0.3)',
                        borderRadius: '0.75rem',
                        color: '#0EA5E9',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                    }}>
                        Explore Digital Services
                    </Link>
                    <Link href="/signage" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.875rem 1.5rem',
                        background: 'rgba(245,158,11,0.12)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        borderRadius: '0.75rem',
                        color: '#F59E0B',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                    }}>
                        Browse Signage Products
                    </Link>
                </div>
            </div>
        </section>
    )
}