'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { getAlternatePath, isSpanishPath } from '@/lib/i18n'

const MOBILE_NAV = [
  { label: 'Digital Services', href: '/digital' },
  { label: 'Signage & Print', href: '/signage' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Learning Center', href: '/learning-center' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'Request a Quote', href: '/quote-request', primary: true },
]

const SPANISH_NAV = [
  { label: 'Inicio', href: '/es' },
  { label: 'Servicios Digitales', href: '/es/servicios-digitales' },
  { label: 'Letreros e Impresión', href: '/es/letreros' },
  { label: 'Portafolio', href: '/es/portafolio' },
  { label: 'Precios', href: '/es/precios' },
  { label: 'Contacto', href: '/es/contacto' },
]

function rememberLanguage(language) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem('pnp-language', language)
  } catch {}
  document.cookie = `pnp-language=${language}; path=/; max-age=31536000; SameSite=Lax`
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const spanish = isSpanishPath(pathname)
  const navLinks = spanish ? SPANISH_NAV : NAV_LINKS
  const mobileLinks = spanish
    ? [...SPANISH_NAV, { label: 'Cotización Gratis', href: '/es/solicitar-cotizacion', primary: true }]
    : MOBILE_NAV
  const homeHref = spanish ? '/es' : '/'
  const quoteHref = spanish ? '/es/solicitar-cotizacion' : '/quote-request'
  const quoteLabel = spanish ? 'COTIZACIÓN GRATIS' : 'GET A FREE QUOTE'
  const languageSwitch = {
    en: getAlternatePath(pathname, 'en'),
    es: getAlternatePath(pathname, 'es'),
  }

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
            href={homeHref}
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
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} style={{ padding: '0.5rem 0.875rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 500, color: textColor, textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', flexShrink: 0, gap: '0.75rem' }}>
            <div
              aria-label="Language switcher"
              style={{
                alignItems: 'center',
                border: `1px solid ${isLight ? 'rgba(28,25,23,0.16)' : 'rgba(255,255,255,0.28)'}`,
                borderRadius: '999px',
                display: 'inline-flex',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                fontWeight: 800,
                overflow: 'hidden',
              }}
            >
              <Link
                href={languageSwitch.en}
                hrefLang="en-US"
                onClick={() => rememberLanguage('en')}
                style={{
                  background: spanish ? 'transparent' : '#F59E0B',
                  color: spanish ? textColor : '#1C1917',
                  padding: '0.42rem 0.55rem',
                  textDecoration: 'none',
                }}
              >
                EN
              </Link>
              <Link
                href={languageSwitch.es}
                hrefLang="es-US"
                onClick={() => rememberLanguage('es')}
                style={{
                  background: spanish ? '#F59E0B' : 'transparent',
                  color: spanish ? '#1C1917' : textColor,
                  padding: '0.42rem 0.55rem',
                  textDecoration: 'none',
                }}
              >
                ES
              </Link>
            </div>
            <Link href={quoteHref} className="btn-amber" style={{ fontSize: '0.8rem', padding: '0.75rem 1.25rem' }}>
              {quoteLabel} <ArrowRight size={15} />
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
            {mobileLinks.map((item) => (
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
            <div
              aria-label="Language switcher"
              style={{
                display: 'grid',
                gap: '0.5rem',
                gridTemplateColumns: '1fr 1fr',
                marginTop: '0.35rem',
              }}
            >
              <Link
                href={languageSwitch.en}
                hrefLang="en-US"
                onClick={() => {
                  rememberLanguage('en')
                  setMenuOpen(false)
                }}
                style={{
                  background: spanish ? 'rgba(255,255,255,0.08)' : '#F59E0B',
                  borderRadius: '0.75rem',
                  color: spanish ? 'white' : '#1C1917',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  padding: '0.8rem',
                  textAlign: 'center',
                }}
              >
                EN
              </Link>
              <Link
                href={languageSwitch.es}
                hrefLang="es-US"
                onClick={() => {
                  rememberLanguage('es')
                  setMenuOpen(false)
                }}
                style={{
                  background: spanish ? '#F59E0B' : 'rgba(255,255,255,0.08)',
                  borderRadius: '0.75rem',
                  color: spanish ? '#1C1917' : 'white',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  padding: '0.8rem',
                  textAlign: 'center',
                }}
              >
                ES
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
