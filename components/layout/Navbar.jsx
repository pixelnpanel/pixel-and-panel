'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

const MOBILE_NAV = [
  { label: 'Digital Services', href: '/digital' },
  { label: 'Signage & Print', href: '/signage' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'Request a Quote', href: '/quote-request', primary: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }

    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  const isLight = scrolled
  const bg = isLight || menuOpen ? 'rgba(255,255,255,0.97)' : 'transparent'
  const textColor = isLight ? '#1C1917' : 'white'
  const mobileControlColor = isLight || menuOpen ? '#1C1917' : 'white'

  return (
    <header
      aria-label="Site navigation"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: bg,
        backdropFilter: isLight ? 'blur(12px)' : 'none',
        borderBottom: isLight ? '1px solid #e2e8f0' : 'none',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', gap: '0.5rem' }}>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: 'none', flexShrink: 0 }}
          >
            <Image
              src="/logo/pixel-panel-wordmark.png"
              alt="Pixel and Panel"
              width={240}
              height={32}
              style={{
                height: 'auto',
                width: 'min(240px, calc(100vw - 6rem))',
                objectFit: 'contain',
              }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Desktop navigation" className="hidden lg:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {NAV_LINKS.map((item) => (
              <Link key={item.label} href={item.href} style={{ padding: '0.5rem 0.875rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 500, color: textColor, textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block" style={{ flexShrink: 0 }}>
            <Link href="/quote-request" className="btn-amber" style={{ fontSize: '0.8rem', padding: '0.75rem 1.25rem' }}>
              GET A FREE QUOTE <ArrowRight size={15} />
            </Link>
          </div>

          <div className="lg:hidden" style={{ flexShrink: 0 }}>
            <button
              type="button"
              aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              style={{
                alignItems: 'center',
                background: menuOpen ? 'rgba(3, 105, 161, 0.08)' : 'rgba(255,255,255,0.12)',
                border: `1px solid ${menuOpen ? 'rgba(3,105,161,0.16)' : 'rgba(255,255,255,0.24)'}`,
                borderRadius: '0.75rem',
                color: mobileControlColor,
                cursor: 'pointer',
                display: 'inline-flex',
                height: '42px',
                justifyContent: 'center',
                padding: 0,
                transition: 'all 0.2s ease',
                width: '42px',
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden"
          style={{
            left: 0,
            padding: '0 1rem 1rem',
            position: 'absolute',
            right: 0,
            top: '64px',
          }}
        >
          <nav
            aria-label="Mobile navigation"
            style={{
              background: '#0C1E3C',
              border: '1px solid rgba(14, 165, 233, 0.22)',
              borderRadius: '1rem',
              boxShadow: '0 22px 48px rgba(12, 30, 60, 0.24)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              margin: '0 auto',
              maxWidth: '32rem',
              padding: '0.65rem',
            }}
          >
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={item.primary ? 'btn-amber' : undefined}
                style={
                  item.primary
                    ? {
                        justifyContent: 'center',
                        marginTop: '0.35rem',
                        minHeight: '48px',
                        width: '100%',
                      }
                    : {
                        borderRadius: '0.75rem',
                        color: 'white',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        minHeight: '48px',
                        padding: '0.8rem 0.95rem',
                        textDecoration: 'none',
                      }
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
