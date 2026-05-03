'use client'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, QrCode } from 'lucide-react'
import { SIGNAGE_PRODUCTS } from '@/lib/constants'


export default function SignagePage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #1C1917 0%, #0C1E3C 100%)',
                padding: '8rem 1.5rem 5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245,158,11,0.1) 1px, transparent 0)',
                    backgroundSize: '36px 36px',
                    pointerEvents: 'none',
                }} />
                <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#F59E0B',
                        marginBottom: '1rem',
                    }}>
                        Physical Signage
                    </span>
                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        color: 'white',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        lineHeight: 1.1,
                        marginBottom: '1.25rem',
                    }}>
                        Signs That Stop Traffic.
                        <br />
                        <span style={{ color: '#F59E0B' }}>And Start Conversations.</span>
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.65)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        maxWidth: '560px',
                        margin: '0 auto 2rem',
                    }}>
                        Custom-designed signage for every business need — and every sign
                        we make includes a trackable QR code at no extra cost.
                    </p>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        background: 'rgba(245,158,11,0.15)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        borderRadius: '100px',
                        padding: '0.5rem 1.25rem',
                    }}>
                        <QrCode size={14} color="#F59E0B" />
                        <span style={{ color: '#FCD34D', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Free QR code tracking included on every order
                        </span>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FAF8F4' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            color: '#1C1917',
                            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        }}>
                            18 Signage Products. One Agency.
                        </h2>
                        <p style={{
                            color: '#64748b',
                            fontFamily: 'Inter, sans-serif',
                            marginTop: '0.75rem',
                            maxWidth: '480px',
                            margin: '0.75rem auto 0',
                        }}>
                            Browse our full product lineup. Every item is custom designed
                            for your brand and includes a QR code that tracks results.
                        </p>
                    </div>

                    {/* Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '1.25rem',
                        marginBottom: '4rem',
                    }}>
                        {SIGNAGE_PRODUCTS.map((product) => (
                            <Link
                                key={product.href}
                                href={product.href}
                                style={{ textDecoration: 'none' }}
                            >
                                <div
                                    style={{
                                        background: 'white',
                                        borderRadius: '1rem',
                                        overflow: 'hidden',
                                        border: '1px solid #f1f5f9',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                        height: '100%',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
                                        e.currentTarget.style.transform = 'translateY(-3px)'
                                        e.currentTarget.style.borderColor = '#F59E0B'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.boxShadow = 'none'
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        e.currentTarget.style.borderColor = '#f1f5f9'
                                    }}
                                >
                                    {/* Photo placeholder */}
                                    <div style={{
                                        width: '100%',
                                        height: '160px',
                                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                    }}>
                                        <span style={{ fontSize: '2.5rem' }}>🪧</span>
                                        <span style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '0.7rem',
                                            color: '#94a3b8',
                                            fontWeight: 500,
                                        }}>
                                            Photo coming soon
                                        </span>
                                    </div>

                                    {/* Product info */}
                                    <div style={{ padding: '1.25rem' }}>
                                        <h3 style={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.95rem',
                                            color: '#1C1917',
                                            marginBottom: '0.5rem',
                                        }}>
                                            {product.name}
                                        </h3>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            color: '#F59E0B',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                        }}>
                                            Get a Quote <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1C1917 0%, #0C1E3C 100%)',
                        borderRadius: '1.5rem',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(245,158,11,0.15)',
                            border: '1px solid rgba(245,158,11,0.3)',
                            borderRadius: '100px',
                            padding: '0.4rem 1rem',
                            marginBottom: '1.25rem',
                        }}>
                            <QrCode size={12} color="#F59E0B" />
                            <span style={{ color: '#FCD34D', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                                QR tracking included on every order
                            </span>
                        </div>
                        <h3 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            color: 'white',
                            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                            marginBottom: '1rem',
                        }}>
                            Ready to Order Your Signs?
                        </h3>
                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: 1.7,
                            maxWidth: '440px',
                            margin: '0 auto 2rem',
                        }}>
                            Tell us what you need and we will get back to you
                            with a custom quote within 1 business day.
                        </p>
                        <Link
                            href="/quote-request"
                            style={{
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
                            }}
                        >
                            Get a Free Quote <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}