import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
    title: 'Portfolio | Pixel & Panel',
    description: 'A growing portfolio of signage, print, website, and phygital branding projects by Pixel & Panel.',
}

const projectTypes = [
    'Storefront signs and business signage',
    'Banners, yard signs, and event displays',
    'Vehicle graphics and decals',
    'Business cards, flyers, and print materials',
    'Websites, QR campaigns, and local SEO pages',
]

export default function PortfolioPage() {
    return (
        <>
            <Navbar />
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
                            Our Work
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
                            Portfolio Coming Together
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
                            We are building a clean project gallery for signs, print materials, websites, and QR-powered campaigns. In the meantime, send us what you need and we can guide you with examples and options.
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
                            Start a Project <ArrowRight size={15} />
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
                                What will be shown here
                            </h2>

                            <p
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    color: '#64748b',
                                    lineHeight: 1.75,
                                }}
                            >
                                This page is ready for real client photos, mockups, before-and-after images, and short project stories once your first portfolio items are selected.
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
                                {projectTypes.map((item) => (
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
            <Footer />
        </>
    )
}