'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { getAlternatePath, isSpanishPath } from '@/lib/i18n'
import { SIGNAGE_NAV_LABEL, SIGNAGE_PATH } from '@/lib/sign-catalog'

const SPANISH_NAV = [
  { label: 'Servicios Digitales', href: '/es/servicios-digitales' },
  { label: 'Letreros', href: '/es/letreros' },
  { label: 'Portafolio', href: '/es/portafolio' },
  { label: 'Precios', href: '/es/precios' },
  { label: 'Contacto', href: '/es/contacto' },
]

const MOBILE_NAV_SHORT = [
  { label: 'Digital', href: '/digital' },
  { label: SIGNAGE_NAV_LABEL, href: SIGNAGE_PATH },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
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
  } catch { }
  document.cookie = `pnp-language=${language}; path=/; max-age=31536000; SameSite=Lax`
}

function navIsActive(pathname, href) {
  const isRoot = href === '/' || href === '/es'
  return isRoot ? pathname === href : pathname === href || pathname.startsWith(href + '/')
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const mobilePointerHrefRef = useRef(null)
  const spanish = isSpanishPath(pathname)
  const navLinks = spanish ? SPANISH_NAV : NAV_LINKS
  const mobileNavLinks = spanish ? MOBILE_NAV_SHORT_ES : MOBILE_NAV_SHORT
  const homeHref = spanish ? '/es' : '/'
  const quoteHref = spanish ? '/es/solicitar-cotizacion' : '/quote-request'
  const quoteLabel = spanish ? 'Solicitar Cotización' : 'Request a Quote'
  const languageSwitch = {
    en: getAlternatePath(pathname, 'en'),
    es: getAlternatePath(pathname, 'es'),
  }
  const forceSolidHeader =
    pathname === '/track-order' ||
    pathname === '/es/rastrear-pedido' ||
    pathname?.startsWith('/track/') ||
    // Signage category + product pages have a light top (breadcrumb on cream),
    // not a dark hero — the navbar must stay solid so it doesn't overlay them.
    // The /signage hub itself keeps its dark-hero transparent navbar.
    (pathname?.startsWith('/signage/') && pathname !== '/signage')

  useEffect(() => {
    let ticking = false

    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 20
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateScrolled)
    }

    updateScrolled()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 1023px)').matches) return
    mobileNavLinks.forEach((item) => {
      router.prefetch(item.href)
    })
  }, [mobileNavLinks, router])

  const startMobileNavigation = (href) => {
    if (navIsActive(pathname, href)) return
    router.push(href)
  }

  const handleMobileNavPointerDown = (event, href) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    mobilePointerHrefRef.current = href
    startMobileNavigation(href)
  }

  const handleMobileNavClick = (event, href) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (mobilePointerHrefRef.current === href) {
      event.preventDefault()
      mobilePointerHrefRef.current = null
      return
    }
    event.preventDefault()
    startMobileNavigation(href)
  }

  const isLight = scrolled || forceSolidHeader
  const bg = forceSolidHeader ? '#FAF8F4' : isLight ? 'rgba(255,255,255,0.97)' : 'transparent'
  const textColor = isLight ? '#1C1917' : 'white'

  return (
    <header
      aria-label="Site navigation"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: bg,
        backdropFilter: forceSolidHeader ? 'none' : isLight ? 'blur(12px)' : 'none',
        borderBottom: isLight ? '1px solid #e2e8f0' : 'none',
        boxShadow: isLight ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 0.75rem', overflow: 'hidden' }}>
        <div
          className="min-h-[50px] lg:min-h-[68px]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            position: 'relative',
          }}
        >

          {/* Logo */}
          <Link href={homeHref} style={{ textDecoration: 'none', flexShrink: 0 }}>
            {/* Full wordmark on mobile */}
            <span className="relative block lg:hidden" style={{ width: 'min(176px, 62vw)', aspectRatio: '3447 / 532' }}>
              <Image
                src="/logo/icon-wordmark.svg"
                alt="Pixel & Panel"
                fill
                loading="eager"
                sizes="(max-width: 1023px) 176px"
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </span>
            {/* Full wordmark on desktop */}
            <span className="relative hidden lg:block" style={{ width: 'min(240px, 42vw)', aspectRatio: '3447 / 532' }}>
              <Image
                src="/logo/icon-wordmark.svg"
                alt="Pixel & Panel"
                fill
                loading="eager"
                sizes="(min-width: 1024px) 240px"
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </span>
          </Link>

          {/* Mobile Language — right aligned */}
          <div
            className="flex lg:hidden"
            aria-label="Language switcher"
            style={{
              alignItems: 'center',
              border: `1px solid ${isLight ? 'rgba(28,25,23,0.16)' : 'rgba(255,255,255,0.28)'}`,
              borderRadius: '999px',
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
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[15px] font-semibold hover:bg-black/5"
                  style={{ padding: '0.5rem 0.875rem', borderRadius: '0.5rem', color: textColor, textDecoration: 'none', transition: 'background-color 0.2s ease, color 0.2s ease', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', position: 'relative' }}
                >
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
          className="flex lg:hidden"
          style={{
            alignItems: 'stretch',
            gap: '0.08rem',
            justifyContent: 'center',
            overflow: 'visible',
            padding: '0.08rem 0 0.22rem',
            pointerEvents: 'auto',
            touchAction: 'manipulation',
            width: '100%',
          }}
        >
          {mobileNavLinks.map((item) => {
            const isActive = navIsActive(pathname, item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => handleMobileNavClick(event, item.href)}
                onPointerDownCapture={(event) => handleMobileNavPointerDown(event, item.href)}
                style={{
                  alignItems: 'center',
                  borderRadius: '0.5rem',
                  color: textColor,
                  display: 'inline-flex',
                  flex: '1 1 0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 750 : 450,
                  justifyContent: 'center',
                  lineHeight: 1,
                  minWidth: 0,
                  minHeight: '44px',
                  padding: '0.5rem 0.2rem',
                  pointerEvents: 'auto',
                  position: 'relative',
                  textDecoration: 'none',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'rgba(245, 158, 11, 0.24)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
                {isActive && (
                  <span style={{ position: 'absolute', bottom: 2, left: '0.5rem', right: '0.5rem', height: 3, borderRadius: 3, backgroundColor: '#F5A623' }} />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
