'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { useIsMobile } from '@/lib/hooks'

const MOBILE_NAV = [
  { label: 'Digital Services', href: '/digital' },
  { label: 'Signage & Print', href: '/signage' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'Request Quote', href: '/quote-request' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile(1024)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLight = scrolled
  const bg = isLight ? 'rgba(255,255,255,0.97)' : 'transparent'
  const textColor = isLight ? '#1C1917' : 'white'

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
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            {isMobile ? (
              <Image src="/logo/icon-mobile-512px.png" alt="Pixel and Panel" width={110} height={44} style={{ objectFit: 'contain', display: 'block' }} priority />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Image src="/logo/icon-512px.png" alt="Pixel and Panel" width={36} height={36} priority />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.95rem', color: textColor, letterSpacing: '-0.01em', transition: 'color 0.3s', whiteSpace: 'nowrap' }}>
                  PIXEL <span style={{ color: '#F59E0B' }}>{'&'}</span> PANEL
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Nav Links */}
          {isMobile && (
            <nav aria-label="Mobile navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', flex: 1, justifyContent: 'flex-end', marginRight: '0.25rem' }}>
              {MOBILE_NAV.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: '0.4rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: textColor, textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Nav */}
          {!isMobile && (
            <nav aria-label="Desktop navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {NAV_LINKS.map((item) => (
                <Link key={item.label} href={item.href} style={{ padding: '0.5rem 0.875rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 500, color: textColor, textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <Link href="/quote-request" className="btn-amber" style={{ fontSize: '0.8rem', padding: '0.75rem 1.25rem' }}>
              GET A FREE QUOTE <ArrowRight size={15} />
            </Link>
          )}

        </div>
      </div>
    </header>
  )
}
