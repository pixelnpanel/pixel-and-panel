'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{
      minHeight: 'calc(100vh - 72px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 50%, #0EA5E9 100%)',
    }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
      }} />

      {/* Amber glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'rgba(245,158,11,0.08)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      {/* Fade to cream at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to top, #FAF8F4, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '5rem 1.5rem 4rem',
        width: '100%',
      }}>

        {/* Badge */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          marginBottom: '2rem',
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            background: 'rgba(14,165,233,0.15)',
            border: '1px solid rgba(14,165,233,0.3)',
            borderRadius: '100px',
            padding: '0.5rem 1.25rem',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F59E0B',
              flexShrink: 0,
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ color: '#7DD3FC', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Serving Texas Businesses
            </span>
          </span>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
        }}>

          {/* Left: Headline + CTAs */}
          <div style={{
            flex: '1 1 480px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}>
            <h1 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            }}>
              Signs That Get You Noticed.
              <br />
              <span style={{ color: '#F59E0B' }}>Marketing That Gets</span>
              <br />
              <span style={{ color: '#F59E0B' }}>You Found.</span>
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              maxWidth: '560px',
            }}>
              Pixel &amp; Panel is a full-service branding agency for businesses
              that need to stand out — on the street <strong style={{ color: 'white' }}>and</strong> online.
              Custom signage, professional websites, local SEO, and QR code tracking.
              All under one roof.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link href="/quote-request" className="btn-amber">
                Get a Free Quote
                <ArrowRight size={16} />
              </Link>
              <a href="#how-it-works" className="btn-ghost">
                See How It Works
              </a>
            </div>

            {/* Trust points */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {['Custom signage & design', 'Websites & local SEO', 'QR tracking on every sign'].map((point) => (
                <span key={point} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.85rem',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                  {point}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Clickable service cards */}
          <div style={{
            flex: '0 1 340px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              backdropFilter: 'blur(12px)',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '1rem',
              }}>
                What We Do
              </p>

              {/* Digital — FIRST */}
              <Link href="/digital" style={{ textDecoration: 'none', display: 'block', marginBottom: '0.875rem' }}>
                <div style={{
                  background: 'rgba(14,165,233,0.15)',
                  border: '1px solid rgba(14,165,233,0.4)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.28)'
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.7)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(14,165,233,0.15)'
                    e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>💻</span>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#38BDF8', fontSize: '0.95rem' }}>
                        Digital Marketing
                      </span>
                    </div>
                    <ArrowRight size={14} color="#38BDF8" />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '0.825rem', lineHeight: 1.6 }}>
                    Websites, local SEO, Google Business Profile &amp; CRM automation that turns visitors into paying customers.
                  </p>
                </div>
              </Link>

              {/* Signage — SECOND */}
              <Link href="/signage" style={{ textDecoration: 'none', display: 'block', marginBottom: '0.875rem' }}>
                <div style={{
                  background: 'rgba(245,158,11,0.15)',
                  border: '1px solid rgba(245,158,11,0.4)',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(245,158,11,0.28)'
                    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.7)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(245,158,11,0.15)'
                    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>🪧</span>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#FCD34D', fontSize: '0.95rem' }}>
                        Physical Signage
                      </span>
                    </div>
                    <ArrowRight size={14} color="#FCD34D" />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '0.825rem', lineHeight: 1.6 }}>
                    Yard signs, banners, vehicle wraps, window graphics &amp; more — custom designed and built to convert.
                  </p>
                </div>
              </Link>

              {/* QR Bridge */}
              <div style={{
                background: 'rgba(74,222,128,0.1)',
                border: '1px solid rgba(74,222,128,0.25)',
                borderRadius: '1rem',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>📲</span>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', lineHeight: 1.5 }}>
                  Every sign includes a <strong style={{ color: '#4ade80' }}>QR code</strong> that tracks real customer scans — automatically.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: visible ? 0.35 : 0,
        transition: 'opacity 0.5s ease 1.2s',
        animation: 'bounce 2s infinite',
      }}>
        <ChevronDown size={22} color="white" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  )
}
