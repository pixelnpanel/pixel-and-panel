'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Mail, Clock, Phone } from 'lucide-react'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('https://formspree.io/f/mnjwjpye', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (response.ok) {
                setSubmitted(true)
            } else {
                alert('Something went wrong. Please email us directly at hello@pixelnpanel.com')
            }
        } catch (error) {
            alert('Something went wrong. Please email us directly at hello@pixelnpanel.com')
        } finally {
            setLoading(false)
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '0.875rem 1rem',
        border: '2px solid #e2e8f0',
        borderRadius: '0.75rem',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        color: '#1C1917',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    }

    const labelStyle = {
        display: 'block',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '0.8rem',
        color: '#1C1917',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    }

    return (
        <>

            <section style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 60%, #0EA5E9 100%)',
                display: 'flex',
                alignItems: 'center',
                padding: '6rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>

                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)',
                    backgroundSize: '36px 36px',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    position: 'relative',
                    maxWidth: '1280px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    gap: '4rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}>

                    {/* Left */}
                    <div style={{ flex: '1 1 360px', color: 'white' }}>
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
                            Contact Us
                        </span>
                        <h1 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                            lineHeight: 1.1,
                            marginBottom: '1.25rem',
                        }}>
                            Have a Question?
                            <br />
                            <span style={{ color: '#F59E0B' }}>We Would Love</span>
                            <br />
                            <span style={{ color: '#F59E0B' }}>to Hear From You.</span>
                        </h1>
                        <p style={{
                            color: 'rgba(255,255,255,0.65)',
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: 1.75,
                            fontSize: '1.05rem',
                            marginBottom: '2.5rem',
                            maxWidth: '420px',
                        }}>
                            Whether you have a question about our services, need
                            help deciding what you need, or just want to say hello
                            — we read every message personally.
                        </p>

                        {/* Contact cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                            {/* Email */}
                            <a href="mailto:hello@pixelnpanel.com" style={{ textDecoration: 'none' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: '0.875rem',
                                        padding: '1rem 1.25rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(14,165,233,0.15)'
                                        e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(14,165,233,0.15)',
                                        borderRadius: '0.625rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Mail size={18} color="#0EA5E9" />
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                                            Email Us
                                        </p>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: 'white' }}>
                                            hello@pixelnpanel.com
                                        </p>
                                    </div>
                                </div>
                            </a>

                            {/* Phone */}
                            <a href="tel:+14098006139" style={{ textDecoration: 'none' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: '0.875rem',
                                        padding: '1rem 1.25rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(245,158,11,0.15)'
                                        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(245,158,11,0.15)',
                                        borderRadius: '0.625rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Phone size={18} color="#F59E0B" />
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                                            Call Us
                                        </p>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: 'white' }}>
                                            (409) 800-6139
                                        </p>
                                    </div>
                                </div>
                            </a>

                            {/* Response time */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '0.875rem',
                                padding: '1rem 1.25rem',
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(74,222,128,0.15)',
                                    borderRadius: '0.625rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <Clock size={18} color="#4ade80" />
                                </div>
                                <div>
                                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                                        Response Time
                                    </p>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: 'white' }}>
                                        Within 1 business day
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right: Form */}
                    <div style={{ flex: '1 1 420px' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.97)',
                            borderRadius: '1.5rem',
                            padding: '2.5rem',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
                        }}>
                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{
                                        width: '72px',
                                        height: '72px',
                                        background: 'rgba(74,222,128,0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                    }}>
                                        <CheckCircle size={36} color="#4ade80" />
                                    </div>
                                    <h2 style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 900,
                                        fontSize: '1.5rem',
                                        color: '#1C1917',
                                        marginBottom: '0.75rem',
                                    }}>
                                        Message Sent!
                                    </h2>
                                    <p style={{
                                        color: '#64748b',
                                        fontFamily: 'Inter, sans-serif',
                                        lineHeight: 1.7,
                                        maxWidth: '320px',
                                        margin: '0 auto',
                                    }}>
                                        We read every message personally and will get back
                                        to you as soon as we do — usually within 1 business day.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h2 style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 900,
                                        fontSize: '1.4rem',
                                        color: '#1C1917',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Send Us a Message
                                    </h2>
                                    <p style={{
                                        color: '#94a3b8',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.875rem',
                                        marginBottom: '2rem',
                                    }}>
                                        No sales pitch. Just a real conversation.
                                    </p>

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label style={labelStyle}>Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="John Martinez"
                                            value={form.name}
                                            onChange={handleChange}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = '#0369A1'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label style={labelStyle}>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="john@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = '#0369A1'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={labelStyle}>Your Message *</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="Ask us anything — about our services, pricing, or if you need any signs for your business..."
                                            value={form.message}
                                            onChange={handleChange}
                                            style={{ ...inputStyle, resize: 'vertical' }}
                                            onFocus={e => e.target.style.borderColor = '#0369A1'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            background: loading ? '#FCD34D' : '#F59E0B',
                                            color: '#1C1917',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.875rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            padding: '1rem',
                                            borderRadius: '0.875rem',
                                            border: 'none',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {loading ? 'Sending...' : <><span>Send Message</span> <ArrowRight size={16} /></>}
                                    </button>

                                    <p style={{
                                        textAlign: 'center',
                                        color: '#94a3b8',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.8rem',
                                        marginTop: '1rem',
                                    }}>
                                        We respond within 1 business day. No spam, ever.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}