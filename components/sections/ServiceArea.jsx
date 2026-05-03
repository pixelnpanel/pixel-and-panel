'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Truck, Globe } from 'lucide-react'

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

const FEATURES = [
  {
    icon:  MapPin,
    color: '#F59E0B',
    title: 'We Come to You',
    body:  'We are a service area business — no storefront, no overhead passed on to you. We meet you where your business is.',
  },
  {
    icon:  Truck,
    color: '#0EA5E9',
    title: 'Signs Shipped Anywhere in Texas',
    body:  'Our signage is professionally produced and shipped directly to your door or job site. Fast turnaround, no surprises.',
  },
  {
    icon:  Globe,
    color: '#4ade80',
    title: 'Digital Services Work Everywhere',
    body:  'Your website, Google profile, and CRM work for your business 24/7 — no matter where in Texas you operate.',
  },
]

export default function ServiceArea() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} style={{ padding: '5rem 1.5rem', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{
          textAlign:    'center',
          marginBottom: '3.5rem',
          opacity:      inView ? 1 : 0,
          transform:    inView ? 'translateY(0)' : 'translateY(24px)',
          transition:   'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span className="section-label">How We Work</span>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            color:      '#1C1917',
            fontSize:   'clamp(1.75rem, 4vw, 3rem)',
            lineHeight: 1.15,
          }}>
            We Serve Texas Businesses.
            <br />
            <span style={{ color: '#0369A1' }}>Wherever You Are.</span>
          </h2>
          <p style={{
            color:      '#64748b',
            fontFamily: 'Inter, sans-serif',
            marginTop:  '1rem',
            maxWidth:   '480px',
            margin:     '1rem auto 0',
            lineHeight: 1.7,
          }}>
            No storefront. No showroom. Just results delivered to your door —
            physical or digital, we make it happen.
          </p>
        </div>

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap:                 '1.5rem',
          marginBottom:        '2rem',
        }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                style={{
                  background:   'white',
                  borderRadius: '1rem',
                  padding:      '2rem',
                  border:       '1px solid #f1f5f9',
                  opacity:      inView ? 1 : 0,
                  transform:    inView ? 'translateY(0)' : 'translateY(28px)',
                  transition:   `opacity 0.55s ease ${0.2 + i * 0.13}s, transform 0.55s ease ${0.2 + i * 0.13}s`,
                }}
              >
                <div style={{
                  width:          '48px',
                  height:         '48px',
                  background:     f.color + '18',
                  borderRadius:   '0.75rem',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  marginBottom:   '1.25rem',
                }}>
                  <Icon size={22} color={f.color} />
                </div>
                <h3 style={{
                  fontFamily:   'Montserrat, sans-serif',
                  fontWeight:   700,
                  fontSize:     '1.05rem',
                  color:        '#1C1917',
                  marginBottom: '0.75rem',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  color:      '#64748b',
                  fontFamily: 'Inter, sans-serif',
                  fontSize:   '0.9rem',
                  lineHeight: 1.7,
                }}>
                  {f.body}
                </p>
              </div>
            )
          })}
        </div>

        <p style={{
          textAlign:  'center',
          color:      '#94a3b8',
          fontFamily: 'Inter, sans-serif',
          fontSize:   '0.875rem',
          opacity:    inView ? 1 : 0,
          transition: 'opacity 0.6s ease 0.55s',
        }}>
          Not sure if we cover your area?{' '}
          <a href="mailto:hello@pixelnpanel.com" style={{ color: '#0369A1', textDecoration: 'underline', fontWeight: 500 }}>
            Send us a message — we likely can help.
          </a>
        </p>

      </div>
    </section>
  )
}
