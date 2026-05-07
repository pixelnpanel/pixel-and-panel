'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, stagger, viewport } from '@/lib/animations'

const projectTypes = [
    'Storefront signs and business signage',
    'Banners, yard signs, and event displays',
    'Vehicle graphics and decals',
    'Business cards, flyers, and print materials',
    'Websites, QR campaigns, and local SEO pages',
]

export default function PortfolioClient() {
    return (
        <main>
            {/* Hero */}
            <section
                style={{
                    background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 100%)',
                    padding: '7rem 1.5rem 4rem',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    style={{ maxWidth: '860px', margin: '0 auto' }}
                >
                    <motion.span
                        variants={fadeUp}
                        className="section-label"
                        style={{ color: '#F59E0B', marginBottom: '1rem' }}
                    >
                        Our Work
                    </motion.span>

                    <motion.h1
                        variants={fadeUp}
                        style={{ color: 'white', lineHeight: 1.05, marginBottom: '1.25rem' }}
                    >
                        Portfolio Coming Together
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        style={{
                            color: 'rgba(255,255,255,0.75)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.1rem',
                            lineHeight: 1.7,
                            maxWidth: '680px',
                            margin: '0 auto 2rem',
                        }}
                    >
                        We are building a clean project gallery for signs, print materials,
                        websites, and QR-powered campaigns. In the meantime, send us what
                        you need and we can guide you with examples and options.
                    </motion.p>

                    <motion.div variants={fadeUp}>
                        <Link href="/quote-request" className="btn-amber">
                            Start a Project <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Content */}
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
                    <motion.div
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <h2 style={{ color: '#1C1917', marginBottom: '1rem' }}>
                            What will be shown here
                        </h2>

                        <p
                            style={{
                                fontFamily: 'var(--font-body)',
                                color: '#64748b',
                                lineHeight: 1.75,
                            }}
                        >
                            This page is ready for real client photos, mockups,
                            before-and-after images, and short project stories once your
                            first portfolio items are selected.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={slideRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '1.25rem',
                            padding: '2rem',
                            boxShadow: '0 20px 50px rgba(15,23,42,0.08)',
                        }}
                    >
                        <motion.ul
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            style={{
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.9rem',
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {projectTypes.map((item) => (
                                <motion.li
                                    key={item}
                                    variants={fadeUp}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem',
                                        fontFamily: 'var(--font-body)',
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
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}