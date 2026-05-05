'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'
import { NAV_LINKS, BRAND } from '@/lib/constants'

const MOBILE_NAV = [
  { label: 'Digital Services', href: '/digital' },
  { label: 'Signage & Print', href: '/signage' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const bg = scrolled || mobileOpen ? 'rgba(255,255,255,0.97)' : 'transparent'
  const textColor = scrolled || mobileOpen ? '#1C1917' : 'white'

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
      backgroundColor: bg,
      backdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
      borderBottom: scrolled || mobileOpen ? '1px solid #e2e8f0' : 'none',
      boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          gap: '0.5rem',
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            {isMobile ? (
              <Image
                src="/logo/icon-mobile-512px.png"
                alt="Pixel and Panel"
                width={110}
                height={44}
                style={{ objectFit: 'contain', display: 'block' }}
                priority
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Image
                  src="/logo/icon-512px.png"
                  alt="Pixel and Panel"
                  width={36}
                  height={36}
                  style={{ borderRadius: '0' }}
                  priority
                />
                <span style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  color: textColor,
                  letterSpacing: '-0.01em',
                  transition: 'color 0.3s',
                  whiteSpace: 'nowrap',
                }}>
                  PIXEL <span style={{ color: '#F59E0B' }}>{'&'}</span> PANEL
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Nav Links — always visible on mobile */}
          {isMobile === true && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', flex: 1, justifyContent: 'flex-end', marginRight: '0.25rem' }}>
              {MOBILE_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: '0.4rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: textColor,
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Nav */}
          {isMobile === false && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    padding: '0.5rem 0.875rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: textColor,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop CTA */}
          {isMobile === false && (
            <Link
              href="/quote-request"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#F59E0B',
                color: '#1C1917',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.625rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              GET A FREE QUOTE <ArrowRight size={15} />
            </Link>
          )}

        </div>
      </div>
    </header>
  )
}