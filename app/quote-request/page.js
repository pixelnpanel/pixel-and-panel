'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function QuoteRequestPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
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
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    message: form.message,
                }),
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                alert('Something went wrong. Please try again or email us directly at hello@pixelnpanel.com')
            }
        } catch (error) {
            alert('Something went wrong. Please try again or email us directly at hello@pixelnpanel.com')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <section style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 60%, #0EA5E9 100%)',
                display: 'flex',
                alignItems: 'center',
                padding: '6rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>

                {/* Dot grid */}
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

                    {/* Left: Copy */}
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
                            Free Quote
                        </span>
                        <h1 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                            lineHeight: 1.1,
                            marginBottom: '1.25rem',
                        }}>
                            Tell Us About
                            <br />
                            <span style={{ color: '#F59E0B' }}>Your Business.</span>
                        </h1>
                        <p style={{
                            color: 'rgba(255,255,255,0.65)',
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: 1.75,
                            fontSize: '1.05rem',
                            marginBottom: '2.5rem',
                            maxWidth: '420px',
                        }}>
                            Fill in the form and we will get back to you within
                            1 business day with a custom quote — no pressure,
                            no obligation.
                        </p>

                        {/* What to expect */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                'Response within 1 business day',
                                'No contracts or commitments',
                                'Plain English — no jargon',
                                'Free consultation included',
                            ].map((point) => (
                                <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <CheckCircle size={17} color="#4ade80" style={{ flexShrink: 0 }} />
                                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.925rem', color: 'rgba(255,255,255,0.75)' }}>
                                        {point}
                                    </span>
                                </div>
                            ))}
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
                                /* Success state */
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
                                        Request Sent!
                                    </h2>
                                    <p style={{
                                        color: '#64748b',
                                        fontFamily: 'Inter, sans-serif',
                                        lineHeight: 1.7,
                                        maxWidth: '320px',
                                        margin: '0 auto',
                                    }}>
                                        Thanks for reaching out. We read every message personally and will get back to you as soon as we do — usually within 1 business day.
                                    </p>
                                </div>
                            ) : (
                                /* Form */
                                <form onSubmit={handleSubmit}>
                                    <h2 style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 900,
                                        fontSize: '1.4rem',
                                        color: '#1C1917',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Get a Free Quote
                                    </h2>
                                    <p style={{
                                        color: '#94a3b8',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.875rem',
                                        marginBottom: '2rem',
                                    }}>
                                        Takes less than 2 minutes to fill out.
                                    </p>

                                    {/* Name */}
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label style={{
                                            display: 'block',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            color: '#1C1917',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="John Martinez"
                                            value={form.name}
                                            onChange={handleChange}
                                            style={{
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
                                            }}
                                            onFocus={e => e.target.style.borderColor = '#0369A1'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label style={{
                                            display: 'block',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            color: '#1C1917',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="john@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            style={{
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
                                            }}
                                            onFocus={e => e.target.style.borderColor = '#0369A1'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>
                                    {/* Phone */}
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label style={{
                                            display: 'block',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            color: '#1C1917',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="(555) 000-0000"
                                            value={form.phone}
                                            onChange={handleChange}
                                            style={{
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
                                            }}
                                            onFocus={e => e.target.style.borderColor = '#0369A1'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>


                                    {/* Message */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{
                                            display: 'block',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            color: '#1C1917',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            What Do You Need? *
                                        </label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={4}
                                            placeholder="What are you looking for? A yard sign, a banner, a new website, better Google rankings? Describe it here — no technical knowledge needed."
                                            value={form.message}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.875rem 1rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '0.75rem',
                                                fontFamily: 'Inter, sans-serif',
                                                fontSize: '0.95rem',
                                                color: '#1C1917',
                                                outline: 'none',
                                                resize: 'vertical',
                                                transition: 'border-color 0.2s',
                                                boxSizing: 'border-box',
                                            }}
                                            onFocus={e => e.target.style.borderColor = '#0369A1'}
                                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>

                                    {/* Submit */}
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
                                        {loading ? 'Sending...' : (
                                            <>Send My Request <ArrowRight size={16} /></>
                                        )}
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

            <Footer />
        </>
    )
}