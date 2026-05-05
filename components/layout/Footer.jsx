import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, ArrowRight, Phone } from 'lucide-react'
import { BRAND, DIGITAL_SERVICES } from '@/lib/constants'

const FOOTER_SIGNAGE_PRODUCTS = [
  { name: 'Banners', href: '/signage?category=banners' },
  { name: 'Yard & Real Estate Signs', href: '/signage?category=yard-real-estate-signs' },
  { name: 'Vehicle Graphics', href: '/signage?category=vehicle-graphics' },
  { name: 'Vinyl Decals & Window Graphics', href: '/signage?category=vinyl-decals-window-graphics' },
  { name: 'Business & Storefront Signs', href: '/signage?category=business-storefront-signs' },
  { name: 'Rigid Signs', href: '/signage?category=rigid-signs' },
  { name: 'A-Frame & Event Displays', href: '/signage?category=a-frame-event-displays' },
  { name: 'Print Marketing Materials', href: '/signage?category=print-marketing-materials' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#0C1E3C', color: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            padding: '4rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                marginBottom: '1.25rem',
              }}
            >
              <Image
                src="/logo/icon-512px.png"
                alt="Pixel & Panel"
                width={40}
                height={40}
              />

              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: 'white',
                }}
              >
                PIXEL <span style={{ color: '#F59E0B' }}>&amp;</span> PANEL
              </span>
            </Link>

            <p
              style={{
                color: '#94a3b8',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Your Vision. <span style={{ color: '#F59E0B' }}>Made Visible.</span>
              <br />
              <br />
              We bridge physical signage and digital marketing so every sign you put up
              drives real, trackable results.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={'mailto:' + BRAND.email}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Mail size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />
                {BRAND.email}
              </a>

              <a
                href={BRAND.phoneHref}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Phone size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />
                {BRAND.phone}
              </a>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <MapPin
                  size={14}
                  style={{
                    color: '#F59E0B',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                />

                <span>Beaumont · Port Arthur · Orange, TX</span>
              </div>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#0EA5E9',
                marginBottom: '1.25rem',
              }}
            >
              Digital Services
            </h4>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                padding: 0,
                margin: 0,
              }}
            >
              {DIGITAL_SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/digital"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginTop: '1.25rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#0EA5E9',
                textDecoration: 'none',
                fontFamily: 'Montserrat, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              All digital services <ArrowRight size={12} />
            </Link>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#F59E0B',
                marginBottom: '1.25rem',
              }}
            >
              Signage Products
            </h4>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                padding: 0,
                margin: 0,
              }}
            >
              {FOOTER_SIGNAGE_PRODUCTS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/signage"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginTop: '1.25rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#F59E0B',
                textDecoration: 'none',
                fontFamily: 'Montserrat, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              All signage products <ArrowRight size={12} />
            </Link>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#64748b',
                marginBottom: '1.25rem',
              }}
            >
              Company
            </h4>

            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '2rem',
                padding: 0,
              }}
            >
              {[
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Quote Request', href: '/quote-request' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/quote-request"
              className="btn-amber"
              style={{ fontSize: '0.75rem', padding: '0.75rem 1.25rem' }}
            >
              Get a Free Quote <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 0',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: '#475569',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            © {year} {BRAND.legalName}. All rights reserved.
          </p>

          <p
            style={{
              fontSize: '0.75rem',
              color: '#475569',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Beaumont · Port Arthur · Orange, TX
          </p>
        </div>
      </div>
    </footer>
  )
}