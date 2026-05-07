import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { DIGITAL_SERVICES } from '@/lib/constants'

const SERVICE_DETAILS = {
    'web-development': {
        headline: 'Website Development for Local Businesses',
        intro: 'Fast, mobile-friendly websites designed to make your business look professional, show up on Google, and turn visitors into real leads.',
        includes: [
            'Custom website structure and copy guidance',
            'Mobile-first responsive layout',
            'Lead forms and quote request flow',
            'Basic local SEO setup',
            'Google Analytics-ready structure',
        ],
    },
    'local-seo': {
        headline: 'Local SEO & Google Business Profile Setup',
        intro: 'Search-friendly setup for businesses that want to appear stronger on Google Maps and local search when customers nearby are ready to buy.',
        includes: [
            'Google Business Profile optimization',
            'Local keyword planning',
            'Service-area page strategy',
            'Citation and directory guidance',
            'Monthly improvement recommendations',
        ],
    },
    'crm-automation': {
        headline: 'CRM & Lead Follow-Up Automation',
        intro: 'Simple systems that help you capture inquiries, organize leads, and follow up faster so good opportunities do not get lost.',
        includes: [
            'Lead capture workflow planning',
            'Quote request form setup',
            'Email follow-up structure',
            'Pipeline organization',
            'Simple automation recommendations',
        ],
    },
    'qr-campaigns': {
        headline: 'QR Code Campaigns for Signs & Print',
        intro: 'Turn signs, banners, flyers, and business cards into trackable marketing tools with QR codes connected to useful landing pages.',
        includes: [
            'Custom QR code setup',
            'Landing page planning',
            'Campaign tracking structure',
            'Print-ready QR placement guidance',
            'Scan-to-call, scan-to-quote, or scan-to-menu options',
        ],
    },
}

export function generateStaticParams() {
    return DIGITAL_SERVICES.map((service) => ({
        service: service.href.split('/').pop(),
    }))
}

export async function generateMetadata({ params }) {
    const { service: serviceSlug } = await params
    const base = DIGITAL_SERVICES.find((item) => item.href.endsWith(`/${serviceSlug}`))
    const detail = SERVICE_DETAILS[serviceSlug]

    if (!base || !detail) {
        return {
            title: 'Digital Services',
        }
    }

    return {
        title: detail.headline,
        description: detail.intro,
        alternates: {
            canonical: `/digital/${serviceSlug}`,
        },
        openGraph: {
            title: `${detail.headline} | Pixel & Panel`,
            description: detail.intro,
            url: `/digital/${serviceSlug}`,
        },
    }
}

export default async function DigitalServicePage({ params }) {
    const { service: serviceSlug } = await params
    const base = DIGITAL_SERVICES.find((item) => item.href.endsWith(`/${serviceSlug}`))
    const detail = SERVICE_DETAILS[serviceSlug]

    if (!base || !detail) notFound()

    return (
        <>
            <main>
                <section
                    style={{
                        background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 100%)',
                        padding: '7rem 1.5rem 4rem',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                        <p
                            style={{
                                color: '#F59E0B',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.8rem',
                                marginBottom: '1rem',
                            }}
                        >
                            Digital Services
                        </p>

                        <h1
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                                lineHeight: 1.05,
                                fontWeight: 900,
                                marginBottom: '1.25rem',
                            }}
                        >
                            {detail.headline}
                        </h1>

                        <p
                            style={{
                                color: 'rgba(255,255,255,0.75)',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1.1rem',
                                lineHeight: 1.7,
                                maxWidth: '680px',
                                margin: '0 auto 2rem',
                            }}
                        >
                            {detail.intro}
                        </p>

                        <Link
                            href="/quote-request"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#F59E0B',
                                color: '#1C1917',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                padding: '1rem 2rem',
                                borderRadius: '0.875rem',
                                textDecoration: 'none',
                            }}
                        >
                            Request a Quote <ArrowRight size={15} />
                        </Link>
                    </div>
                </section>

                <section style={{ padding: '5rem 1.5rem', background: '#FAF8F4' }}>
                    <div
                        style={{
                            maxWidth: '980px',
                            margin: '0 auto',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2rem',
                            alignItems: 'start',
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: '#1C1917',
                                    fontSize: '2rem',
                                    fontWeight: 900,
                                    marginBottom: '1rem',
                                }}
                            >
                                What you get
                            </h2>

                            <p
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    color: '#64748b',
                                    lineHeight: 1.75,
                                }}
                            >
                                Pixel & Panel combines design, local marketing, and practical business systems so your digital presence supports your real-world signage and sales.
                            </p>
                        </div>

                        <div
                            style={{
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '1.25rem',
                                padding: '2rem',
                                boxShadow: '0 20px 50px rgba(15,23,42,0.08)',
                            }}
                        >
                            <ul
                                style={{
                                    listStyle: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.9rem',
                                }}
                            >
                                {detail.includes.map((item) => (
                                    <li
                                        key={item}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            fontFamily: 'Inter, sans-serif',
                                            color: '#475569',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        <CheckCircle
                                            size={18}
                                            color="#0369A1"
                                            style={{ flexShrink: 0, marginTop: '0.15rem' }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
