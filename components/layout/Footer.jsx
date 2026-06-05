import Link from 'next/link'
import Image from 'next/image'
import { Globe2, Mail, MapPin, ArrowRight, Phone, Star } from 'lucide-react'
import { BRAND, DIGITAL_SERVICES, SOCIAL_LINKS, GBP_REVIEW_URL } from '@/lib/constants'
import { LEGAL_POLICY_LINKS } from '@/lib/legal-policies'
import SocialLinks from '@/components/ui/SocialLinks'

const FOOTER_SIGNAGE_PRODUCTS = [
  { name: 'Vinyl Banners',    href: '/signage/vinyl-banners' },
  { name: 'Yard Signs',       href: '/signage/yard-signs' },
  { name: 'Vehicle Graphics', href: '/signage/vehicle-graphics' },
  { name: 'Window Graphics',  href: '/signage/window-graphics' },
  { name: 'Storefront Signs', href: '/signage/storefront-signs' },
  { name: 'Metal Signs',      href: '/signage/metal-signs' },
  { name: 'Business Cards',   href: '/signage/business-cards' },
  { name: 'Flyers',           href: '/signage/flyers' },
]

const FOOTER_SIGNAGE_PRODUCTS_ES = [
  { name: 'Banners de Vinilo', href: '/es/letreros/banners-de-vinilo' },
  { name: 'Letreros para Jardín', href: '/es/letreros/letreros-para-jardin' },
  { name: 'Gráficos para Vehículos', href: '/es/letreros/graficos-para-vehiculos' },
  { name: 'Gráficos para Ventanas', href: '/es/letreros/graficos-para-ventanas' },
  { name: 'Letreros para Negocios', href: '/es/letreros/letreros-para-negocios' },
  { name: 'Letreros de Metal', href: '/es/letreros/letreros-de-metal' },
  { name: 'Tarjetas de Presentación', href: '/es/letreros/tarjetas-de-presentacion' },
  { name: 'Volantes', href: '/es/letreros/volantes' },
]

const FOOTER_DIGITAL_SERVICES_ES = [
  { name: 'Desarrollo Web', href: '/es/servicios-digitales/desarrollo-web' },
  { name: 'SEO Local', href: '/es/servicios-digitales/seo-local' },
  { name: 'Perfil de Google', href: '/es/servicios-digitales/perfil-de-google' },
  { name: 'Automatización CRM', href: '/es/servicios-digitales/automatizacion-crm' },
  { name: 'Campañas con QR', href: '/es/servicios-digitales/campanas-con-qr' },
]

const COMPANY_LINKS_EN = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Learning Center', href: '/learning-center' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Check My Google Visibility', href: '/free-visibility-check' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Quote Request', href: '/quote-request' },
]

const COMPANY_LINKS_ES = [
  { label: 'Portafolio', href: '/es/portafolio' },
  { label: 'Centro de Aprendizaje', href: '/es/centro-de-aprendizaje' },
  { label: 'Precios', href: '/es/precios' },
  { label: 'Chequeo Gratis en Google', href: '/es/chequeo-gratis-de-visibilidad' },
  { label: 'Contacto', href: '/es/contacto' },
  { label: 'Solicitar Cotización', href: '/es/solicitar-cotizacion' },
]

const FOOTER_COPY = {
  en: {
    homeHref: '/',
    taglineLead: 'Your Vision.',
    taglineAccent: 'Made Visible.',
    description: 'Websites, custom signs, and local marketing materials built to help Southeast Texas businesses stand out, get found on Google, and win more customers.',
    serving: 'Serving Beaumont, Nederland & Port Arthur, TX',
    hours: 'Hours',
    weekdayHours: 'Mon–Fri: 9 AM – 6 PM',
    saturdayHours: 'Sat: 11 AM – 3 PM',
    sundayHours: 'Sun: Closed',
    follow: 'Follow Us',
    review: 'Review us on Google',
    digitalHeading: 'Digital Services',
    signageHeading: 'Signage Products',
    companyHeading: 'Company',
    connectHeading: 'Connect',
    legalHeading: 'LEGAL',
    allDigital: 'All digital services',
    allSignage: 'All signage products',
    quote: 'Request a Quote',
    quoteHref: '/quote-request',
    rights: 'All rights reserved.',
    allDigitalHref: '/digital',
    allSignageHref: '/signage',
    digitalServices: DIGITAL_SERVICES,
    signageProducts: FOOTER_SIGNAGE_PRODUCTS,
    companyLinks: COMPANY_LINKS_EN,
    legalLinks: LEGAL_POLICY_LINKS,
  },
  es: {
    homeHref: '/es',
    taglineLead: 'Tu Visión.',
    taglineAccent: 'Hecha Visible.',
    description: 'Sitios web, letreros personalizados y marketing local para ayudar a negocios del sureste de Texas a aparecer en Google y ganar más clientes.',
    serving: 'Sirviendo Beaumont, Nederland y Port Arthur, TX',
    hours: 'Horario',
    weekdayHours: 'Lun – Vie: 9:00 AM – 6:00 PM',
    saturdayHours: 'Sábado: 11:00 AM – 3:00 PM',
    sundayHours: 'Domingo: Cerrado',
    follow: 'Síguenos',
    review: 'Déjanos una reseña en Google',
    digitalHeading: 'Servicios Digitales',
    signageHeading: 'Letreros e Impresión',
    companyHeading: 'Compañía',
    connectHeading: 'Conecta',
    allDigital: 'Todos los servicios digitales',
    allSignage: 'Todos los productos',
    quote: 'Solicitar Cotización',
    quoteHref: '/es/solicitar-cotizacion',
    rights: 'Todos los derechos reservados.',
    allDigitalHref: '/es/servicios-digitales',
    allSignageHref: '/es/letreros',
    digitalServices: FOOTER_DIGITAL_SERVICES_ES,
    signageProducts: FOOTER_SIGNAGE_PRODUCTS_ES,
    companyLinks: COMPANY_LINKS_ES,
    legalLinks: [],
  },
}

const footerLinkStyle = {
  color: '#94a3b8',
  fontSize: '0.875rem',
  textDecoration: 'none',
  fontFamily: 'var(--font-body)',
  transition: 'color 0.2s',
}

export default function Footer({ language = 'en' }) {
  const year = new Date().getFullYear()
  const copy = FOOTER_COPY[language] || FOOTER_COPY.en

  return (
    <footer style={{ backgroundColor: '#0C1E3C', color: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          className="grid gap-10 border-b border-white/[0.08] py-16 sm:grid-cols-2 lg:grid-cols-[minmax(260px,1.3fr)_repeat(2,minmax(180px,1fr))] xl:grid-cols-[minmax(270px,1.35fr)_minmax(155px,1fr)_minmax(145px,1fr)_minmax(145px,1fr)_minmax(160px,1fr)_minmax(130px,0.85fr)] xl:gap-8"
        >

          {/* Brand column */}
          <div>
            <Link href={copy.homeHref} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: '0.4rem' }}>
              <Image
                src="/logo/icon-wordmark.svg"
                alt="Pixel & Panel"
                width={220}
                height={33}
                style={{
                  height: 'auto',
                  maxWidth: 'min(220px, 100%)',
                  objectFit: 'contain',
                  width: 'auto',
                }}
                unoptimized
              />
            </Link>

            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
              {copy.taglineLead} <span style={{ color: '#F59E0B' }}>{copy.taglineAccent}</span>
              <br /><br />
              {copy.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={BRAND.siteUrl} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...footerLinkStyle }}>
                <Globe2 size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />
                {BRAND.domain}
              </a>
              <a href={`mailto:${BRAND.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...footerLinkStyle }}>
                <Mail size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />
                {BRAND.email}
              </a>
              <a href={BRAND.phoneHref} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...footerLinkStyle }}>
                <Phone size={14} style={{ color: '#F59E0B', flexShrink: 0 }} />
                {BRAND.phone}
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', ...footerLinkStyle }}>
                <MapPin size={14} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
                <span>{copy.serving}</span>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F59E0B', marginBottom: '1.25rem' }}>
              {copy.connectHeading}
            </h4>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginBottom: '0.6rem' }}>
                {copy.hours}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <p style={{ ...footerLinkStyle, fontSize: '0.8rem' }}>{copy.weekdayHours}</p>
                <p style={{ ...footerLinkStyle, fontSize: '0.8rem' }}>{copy.saturdayHours}</p>
                <p style={{ ...footerLinkStyle, fontSize: '0.8rem', color: '#475569' }}>{copy.sundayHours}</p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginBottom: '0.75rem' }}>
                {copy.follow}
              </p>
              <SocialLinks links={SOCIAL_LINKS} theme="dark" size={44} iconSize={18} />
            </div>

            <a
              href={GBP_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.8rem', color: '#F59E0B', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              <Star size={14} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
              {copy.review}
            </a>
          </div>

          {/* Digital Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0EA5E9', marginBottom: '1.25rem' }}>
              {copy.digitalHeading}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
              {copy.digitalServices.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={footerLinkStyle}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <Link href={copy.allDigitalHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '1.25rem', fontSize: '0.75rem', fontWeight: 700, color: '#0EA5E9', textDecoration: 'none', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
              {copy.allDigital} <ArrowRight size={12} />
            </Link>
          </div>

          {/* Signage */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F59E0B', marginBottom: '1.25rem' }}>
              {copy.signageHeading}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
              {copy.signageProducts.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={footerLinkStyle}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <Link href={copy.allSignageHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '1.25rem', fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', textDecoration: 'none', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
              {copy.allSignage} <ArrowRight size={12} />
            </Link>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0EA5E9', marginBottom: '1.25rem' }}>
              {copy.companyHeading}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', padding: 0 }}>
              {copy.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={footerLinkStyle}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              <Link href={copy.quoteHref} className="btn-amber" style={{ fontSize: '0.75rem', padding: '0.75rem 1.25rem' }}>
                {copy.quote} <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Legal */}
          {copy.legalLinks.length > 0 && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F59E0B', marginBottom: '1.25rem' }}>
                {copy.legalHeading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0, padding: 0 }}>
                {copy.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={footerLinkStyle}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'var(--font-body)' }}>
            © {year} {BRAND.legalName}. {copy.rights}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'var(--font-body)' }}>
            {copy.serving}
          </p>
        </div>
      </div>
    </footer>
  )
}
