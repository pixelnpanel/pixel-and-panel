'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Mail, Clock, Phone, Star, MapPin, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, slideRight, stagger } from '@/lib/animations'
import SocialLinks from '@/components/ui/SocialLinks'
import { SOCIAL_LINKS, GBP_REVIEW_URL, GBP_MAPS_URL } from '@/lib/constants'

const defaultCopy = {
    language: 'English',
    eyebrow: 'Contact Us',
    h1: '',
    headlineLines: ['Have a Question?', 'We Would Love', 'to Hear From You.'],
    introStart: 'Whether you have a question about our services, need help deciding what you need, or just want to say hello — we read every message personally. If you want a softer first step, start with a',
    visibilityHref: '/free-visibility-check',
    visibilityLabel: 'Free Visibility Check',
    emailLabel: 'Email Us',
    phoneLabel: 'Call Us',
    responseLabel: 'Response Time',
    responseValue: 'Within 1 business day',
    formTitle: 'Send Us a Message',
    formNote: 'No sales pitch. Just a real conversation.',
    name: 'Your Name',
    email: 'Email Address',
    phone: 'Phone Number',
    subject: 'Subject',
    message: 'Your Message',
    subjectPlaceholder: 'Website, signs, print, or general question',
    messagePlaceholder: 'Tell us what you need — a website, signs, print materials, or not sure yet. We read every message personally.',
    submit: 'Send Message',
    sending: 'Sending...',
    footer: 'We respond within 1 business day. No spam, ever.',
    successTitle: 'Message Sent!',
    successText: 'We read every message personally and will get back to you as soon as we do — usually within 1 business day.',
    errorFallback: 'Unable to send contact message right now.',
}

export default function ContactPage({ copy = defaultCopy }) {
    const content = { ...defaultCopy, ...copy }
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        const email = String(formData.get('email') || '')
        const phone = String(formData.get('phone') || '')

        if (!email.trim() && !phone.trim()) {
            setError(content.language === 'Spanish' ? 'Por favor incluye correo electrónico o teléfono.' : 'Please include an email address or phone number.')
            setLoading(false)
            return
        }

        const payload = {
            name: String(formData.get('name') || ''),
            email,
            phone,
            subject: String(formData.get('subject') || ''),
            message: String(formData.get('message') || ''),
            company: String(formData.get('company') || ''),
            language: content.language,
            sourcePage: typeof window !== 'undefined' ? window.location.href : 'Contact Page',
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(content.language === 'Spanish' ? content.errorFallback : data.error || content.errorFallback)
            }

            setSubmitted(true)
            setForm({ name: '', email: '', phone: '', subject: '', message: '' })
            e.currentTarget.reset()
        } catch (submitError) {
            setError(submitError.message || content.errorFallback)
        }
        finally { setLoading(false) }
    }

    const inputStyle = {
        width: '100%', padding: '0.875rem 1rem', border: '2px solid #e2e8f0',
        borderRadius: '0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
        color: '#1C1917', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
    }
    const labelStyle = {
        display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem',
        color: '#1C1917', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em',
    }

    return (
        <>
            <section style={{
                minHeight: 'calc(100vh - 72px)',
                background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 60%, #0EA5E9 100%)',
                display: 'flex', alignItems: 'center', padding: '6rem 1.5rem',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'center' }}>

                    {/* Left column — staggered fade up */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        style={{ flex: '1 1 360px', color: 'white' }}
                    >
                        <motion.span variants={fadeUp} className="section-label" style={{ marginBottom: '1rem' }}>
                            {content.eyebrow}
                        </motion.span>

                        <motion.h1 variants={fadeUp} style={{ color: 'white', lineHeight: 1.1, marginBottom: '1.25rem' }}>
                            {content.h1 ? (
                                content.h1
                            ) : (
                                <>
                                    {content.headlineLines[0]}
                                    {' '}<br /><span style={{ color: '#F59E0B' }}>{content.headlineLines[1]}</span>
                                    {' '}<br /><span style={{ color: '#F59E0B' }}>{content.headlineLines[2]}</span>
                                </>
                            )}
                        </motion.h1>

                        <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '420px' }}>
                            {content.introStart}{' '}
                            <Link href={content.visibilityHref} style={{ color: '#F59E0B', fontWeight: 700 }}>
                                {content.visibilityLabel}
                            </Link>.
                        </motion.p>

                        <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { href: 'mailto:hello@pixelnpanel.com', icon: <Mail size={18} color="#0EA5E9" />, bg: 'rgba(14,165,233,0.15)', hoverBg: 'rgba(14,165,233,0.15)', hoverBorder: 'rgba(14,165,233,0.4)', label: content.emailLabel, value: 'hello@pixelnpanel.com' },
                                { href: 'tel:+14098006139', icon: <Phone size={18} color="#F59E0B" />, bg: 'rgba(245,158,11,0.15)', hoverBg: 'rgba(245,158,11,0.15)', hoverBorder: 'rgba(245,158,11,0.4)', label: content.phoneLabel, value: '(409) 800-6139' },
                            ].map((item) => (
                                <motion.a key={item.label} variants={fadeUp} href={item.href} style={{ textDecoration: 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.875rem', padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = item.hoverBg; e.currentTarget.style.borderColor = item.hoverBorder }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                                    >
                                        <div style={{ width: '40px', height: '40px', background: item.bg, borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                                        <div>
                                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{item.label}</p>
                                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'white' }}>{item.value}</p>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}

                            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.875rem', padding: '1rem 1.25rem' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(74,222,128,0.15)', borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Clock size={18} color="#4ade80" /></div>
                                <div>
                                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{content.responseLabel}</p>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'white' }}>{content.responseValue}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right column — slides in from right */}
                    <motion.div
                        variants={slideRight}
                        initial="hidden"
                        animate="visible"
                        style={{ flex: '1 1 420px' }}
                    >
                        <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
                            {submitted ? (
                                <motion.div role="status" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{ width: '72px', height: '72px', background: 'rgba(74,222,128,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                        <CheckCircle size={36} color="#4ade80" />
                                    </div>
                                    <h2 style={{ color: '#1C1917', marginBottom: '0.75rem' }}>{content.successTitle}</h2>
                                    <p style={{ color: '#64748b', fontFamily: 'var(--font-body)', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto' }}>
                                        {content.successText}
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h2 style={{ color: '#1C1917', marginBottom: '0.5rem' }}>{content.formTitle}</h2>
                                    <p style={{ color: '#94a3b8', fontFamily: 'var(--font-body)', fontSize: '0.875rem', marginBottom: '2rem' }}>{content.formNote}</p>

                                    <input
                                        type="text"
                                        name="company"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        aria-hidden="true"
                                        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden', opacity: 0 }}
                                    />

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label htmlFor="contact-name" style={labelStyle}>{content.name} *</label>
                                        <input id="contact-name" type="text" name="name" required placeholder="John Martinez" value={form.name} onChange={handleChange} style={inputStyle} onFocus={e => e.target.style.borderColor = '#0369A1'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label htmlFor="contact-email" style={labelStyle}>{content.email}</label>
                                        <input id="contact-email" type="email" name="email" placeholder="john@email.com" value={form.email} onChange={handleChange} style={inputStyle} onFocus={e => e.target.style.borderColor = '#0369A1'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label htmlFor="contact-phone" style={labelStyle}>{content.phone}</label>
                                        <input id="contact-phone" type="tel" name="phone" placeholder="(409) 800-6139" value={form.phone} onChange={handleChange} style={inputStyle} onFocus={e => e.target.style.borderColor = '#0369A1'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label htmlFor="contact-subject" style={labelStyle}>{content.subject}</label>
                                        <input id="contact-subject" type="text" name="subject" placeholder={content.subjectPlaceholder} value={form.subject} onChange={handleChange} style={inputStyle} onFocus={e => e.target.style.borderColor = '#0369A1'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label htmlFor="contact-message" style={labelStyle}>{content.message} *</label>
                                        <textarea id="contact-message" name="message" required rows={5} placeholder={content.messagePlaceholder} value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#0369A1'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                                    </div>

                                    {error && (
                                        <p role="alert" style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '0.875rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                                            {error}
                                        </p>
                                    )}

                                    <button type="submit" disabled={loading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: loading ? '#FCD34D' : '#F59E0B', color: '#1C1917', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '1rem', borderRadius: '0.875rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                                        {loading ? content.sending : <><span>{content.submit}</span><ArrowRight size={16} /></>}
                                    </button>
                                    <p style={{ textAlign: 'center', color: '#94a3b8', fontFamily: 'var(--font-body)', fontSize: '0.8rem', marginTop: '1rem' }}>{content.footer}</p>
                                </form>
                            )}
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Social & Review section */}
            <section style={{ background: '#f8fafc', padding: '4rem 1.5rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0EA5E9', marginBottom: '0.75rem' }}>
                        Stay Connected
                    </p>
                    <h2 style={{ fontSize: '1.75rem', color: '#0C1E3C', marginBottom: '0.75rem' }}>
                        Follow Pixel &amp; Panel
                    </h2>
                    <p style={{ color: '#64748b', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
                        Stay up to date on sign projects, local business tips, and behind-the-scenes content.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <SocialLinks links={SOCIAL_LINKS} theme="light" />
                    </div>
                    <a
                        href={GBP_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0C1E3C', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.875rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none' }}
                    >
                        <Star size={15} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                        Leave Us a Google Review
                        <ExternalLink size={13} style={{ opacity: 0.6 }} />
                    </a>
                </div>
            </section>

            {/* Hours + Map section */}
            <section style={{ background: '#0C1E3C', padding: '0' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
                        <div>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0EA5E9', marginBottom: '0.4rem' }}>
                                Service Area
                            </p>
                            <h2 style={{ color: 'white', fontSize: '1.5rem', margin: '0 0 1.25rem' }}>
                                Serving Southeast Texas
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {[
                                    { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                                    { day: 'Saturday', hours: '11:00 AM – 3:00 PM' },
                                    { day: 'Sunday', hours: 'Closed' },
                                ].map(({ day, hours }) => (
                                    <div key={day} style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
                                        <span style={{ color: '#94a3b8', minWidth: '160px' }}>{day}</span>
                                        <span style={{ color: hours === 'Closed' ? '#64748b' : 'white', fontWeight: hours === 'Closed' ? 400 : 600 }}>{hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <a
                            href={GBP_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#F59E0B', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                        >
                            <MapPin size={14} />
                            View on Google Maps
                            <ExternalLink size={12} style={{ opacity: 0.7 }} />
                        </a>
                    </div>
                </div>

                {/* Clickable map iframe */}
                <a
                    href={GBP_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', position: 'relative', cursor: 'pointer' }}
                    aria-label="View Pixel & Panel on Google Maps"
                >
                    <iframe
                        src="https://maps.google.com/maps?q=Pixel+%26+Panel+Beaumont+TX&output=embed&z=13&hl=en"
                        title="Pixel & Panel service area — Beaumont, Nederland & Port Arthur, TX"
                        style={{ width: '100%', height: '380px', border: 0, display: 'block', pointerEvents: 'none' }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* Click capture overlay */}
                    <div style={{ position: 'absolute', inset: 0 }} />
                </a>
            </section>
        </>
    )
}
