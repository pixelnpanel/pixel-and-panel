'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { getAlternatePath, isSpanishPath } from '@/lib/i18n'

const SPANISH_NAV = [
  { label: 'Servicios Digitales', href: '/es/servicios-digitales' },
  { label: 'Letreros e Impresión', href: '/es/letreros' },
  { label: 'Portafolio', href: '/es/portafolio' },
  { label: 'Precios', href: '/es/precios' },
  { label: 'Contacto', href: '/es/contacto' },
]

const MOBILE_NAV_SHORT = [
  { label: 'Digital', href: '/digital' },
  { label: 'Signage', href: '/signage' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Price', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

const MOBILE_NAV_SHORT_ES = [
  { label: 'Digital', href: '/es/servicios-digitales' },
  { label: 'Letreros', href: '/es/letreros' },
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

function navIsActive(pathname, href) {
  const isRoot = href === '/' || href === '/es'
  return isRoot ? pathname === href : pathname === href || pathname.startsWith(href + '/')
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const spanish = isSpanishPath(pathname)
  const navLinks = spanish ? SPANISH_NAV : NAV_LINKS
  const mobileNavLinks = spanish ? MOBILE_NAV_SHORT_ES : MOBILE_NAV_SHORT
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
        viewTransitionName: 'site-navbar',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 0.75rem', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '60px',
            gap: '0.5rem',
            position: 'relative',
          }}
        >

          {/* Logo */}
          <Link href={homeHref} style={{ textDecoration: 'none', flexShrink: 0 }}>
            {/* Full wordmark on mobile */}
            <Image
              src="/logo/icon-wordmark.svg"
              alt="Pixel & Panel"
              width={3447}
              height={532}
              className="lg:hidden"
              style={{ width: 176, maxWidth: 'min(176px, 62vw)', height: 'auto', objectFit: 'contain' }}
              unoptimized
              priority
            />
            {/* Full wordmark on desktop */}
            <Image
              src="/logo/icon-wordmark.svg"
              alt="Pixel & Panel"
              width={3447}
              height={532}
              className="hidden lg:block"
              style={{ width: 240, maxWidth: 'min(240px, 42vw)', height: 'auto', objectFit: 'contain' }}
              unoptimized
              priority
            />
          </Link>

          {/* Mobile Language — right aligned */}
          <div
            className="lg:hidden"
            aria-label="Language switcher"
            style={{
              alignItems: 'center',
              border: `1px solid ${isLight ? 'rgba(28,25,23,0.16)' : 'rgba(255,255,255,0.28)'}`,
              borderRadius: '999px',
              display: 'flex',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.66rem',
              fontWeight: 800,
              overflow: 'hidden',
              position: 'absolute',
              right: 0,
            }}
          >
            <Link href={languageSwitch.en} hrefLang="en-US" onClick={() => rememberLanguage('en')}
              style={{ background: spanish ? 'transparent' : '#F59E0B', color: spanish ? textColor : '#1C1917', padding: '0.3rem 0.4rem', textDecoration: 'none' }}>
              EN
            </Link>
            <Link href={languageSwitch.es} hrefLang="es-US" onClick={() => rememberLanguage('es')}
              style={{ background: spanish ? '#F59E0B' : 'transparent', color: spanish ? '#1C1917' : textColor, padding: '0.3rem 0.4rem', textDecoration: 'none' }}>
              ES
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav aria-label="Desktop navigation" className="hidden lg:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {navLinks.map((item) => {
              const isActive = navIsActive(pathname, item.href)
              return (
                <Link key={item.label} href={item.href} className="hover:bg-black/5" style={{ padding: '0.5rem 0.875rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: isActive ? 700 : 500, color: textColor, textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', position: 'relative' }}>
                  {item.label}
                  {isActive && (
                    <span style={{ position: 'absolute', bottom: 2, left: '0.875rem', right: '0.875rem', height: 3, borderRadius: 2, backgroundColor: '#F5A623' }} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA + Language */}
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
              <Link href={languageSwitch.en} hrefLang="en-US" onClick={() => rememberLanguage('en')}
                style={{ background: spanish ? 'transparent' : '#F59E0B', color: spanish ? textColor : '#1C1917', padding: '0.42rem 0.55rem', textDecoration: 'none' }}>
                EN
              </Link>
              <Link href={languageSwitch.es} hrefLang="es-US" onClick={() => rememberLanguage('es')}
                style={{ background: spanish ? '#F59E0B' : 'transparent', color: spanish ? '#1C1917' : textColor, padding: '0.42rem 0.55rem', textDecoration: 'none' }}>
                ES
              </Link>
            </div>
            <Link href={quoteHref} className="btn-amber" style={{ fontSize: '0.8rem', padding: '0.75rem 1.25rem' }}>
              {quoteLabel} <ArrowRight size={15} />
            </Link>
          </div>

        </div>

        {/* Mobile Nav — same links as desktop */}
        <nav
          aria-label="Mobile navigation"
          className="mobile-nav-scroll flex lg:hidden"
          style={{
            alignItems: 'center',
            gap: '0.08rem',
            justifyContent: 'flex-start',
            overflowX: 'auto',
            paddingBottom: '0.28rem',
            scrollbarWidth: 'none',
            width: '100%',
          }}
        >
          {mobileNavLinks.map((item) => {
            const isActive = navIsActive(pathname, item.href)
            return (
              <Link key={item.label} href={item.href} className="hover:bg-black/5" style={{ padding: '0.3rem 0.48rem', borderRadius: '0.5rem', fontSize: '0.76rem', fontWeight: isActive ? 700 : 500, color: textColor, textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', position: 'relative', flexShrink: 0 }}>
                {item.label}
                {isActive && (
                  <span style={{ position: 'absolute', bottom: 2, left: '0.5rem', right: '0.5rem', height: 2, borderRadius: 2, backgroundColor: '#F5A623' }} />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
