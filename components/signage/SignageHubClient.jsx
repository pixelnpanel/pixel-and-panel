// components/signage/SignageHubClient.jsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, QrCode, Palette, Truck, Phone } from 'lucide-react'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
}

const HOW_IT_WORKS = [
    {
        step: '01',
        icon: Phone,
        title: 'Tell Us What You Need',
        description:
            'Share your project — product type, size, quantity, location, and deadline. No forms required. A quick message to hello@pixelnpanel.com gets things started.',
    },
    {
        step: '02',
        icon: Palette,
        title: 'Send Your Artwork or Idea',
        description:
            'Have a logo or design? Send it over. Need design help? We handle that too. Every sign is reviewed before production.',
    },
    {
        step: '03',
        icon: QrCode,
        title: 'We Design, Print & Produce',
        description:
            'Your materials are produced with care — and every sign can include a dynamic QR code that connects your physical branding to your digital presence.',
    },
    {
        step: '04',
        icon: Truck,
        title: 'Pickup, Delivery, or Installation',
        description:
            'We coordinate pickup or delivery for the Golden Triangle area. Installation services available depending on product type.',
    },
]

export default function SignageHubClient({ categories }) {
    return (
        <main className="min-h-screen bg-brand-cream">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="bg-brand-dark text-white py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-brand-amber text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Signage & Print
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="font-heading text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
                    >
                        Custom Signage & Print That{' '}
                        <span className="text-brand-amber">Makes Your Brand Visible</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        From storefront signs and banners to vehicle graphics, wall murals, trade show
                        displays, and custom decals — we design and produce physical branding materials
                        that help your business stand out in the real world.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/quote-request"
                            className="bg-brand-amber text-brand-dark font-bold font-heading uppercase tracking-wide px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            href="#categories"
                            className="border-2 border-white text-white font-bold font-heading uppercase tracking-wide px-8 py-4 rounded-lg hover:bg-white hover:text-brand-dark transition-colors text-sm"
                        >
                            View Categories
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── INTRO ─────────────────────────────────────────────── */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-brand-dark text-lg leading-relaxed"
                    >
                        Every sign we produce is built to represent your brand with clarity and
                        confidence. Whether you need a single yard sign or a complete fleet wrap,
                        we handle design, production, and delivery — so you get one point of
                        contact and zero guesswork. And every sign can include a{' '}
                        <span className="text-brand-deep font-semibold">
                            dynamic QR code that connects your physical signage to your digital presence
                        </span>
                        , turning every print job into a trackable marketing asset.
                    </motion.p>
                </div>
            </section>

            {/* ── CATEGORY GRID ─────────────────────────────────────── */}
            <section id="categories" className="py-20 px-6 bg-brand-cream">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center mb-14"
                    >
                        <p className="text-brand-sky text-sm font-bold uppercase tracking-widest mb-3">
                            Browse by Category
                        </p>
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-dark">
                            Everything Your Business Needs to Get Noticed
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {categories.map((cat) => (
                            <motion.div key={cat.slug} variants={fadeUp}>
                                <Link href={`/signage/${cat.slug}`} className="group block h-full">
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                        {/* Placeholder image box */}
                                        <div
                                            className="w-full h-44 flex items-end p-5"
                                            style={{ backgroundColor: cat.placeholderBg }}
                                        >
                                            <span className="text-white/70 text-xs font-mono">
                                                {cat.imageStyle}
                                            </span>
                                        </div>
                                        {/* Card content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="font-heading font-extrabold text-xl text-brand-dark mb-2 group-hover:text-brand-deep transition-colors">
                                                {cat.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                                                {cat.description}
                                            </p>
                                            <span className="inline-flex items-center gap-2 text-brand-deep text-sm font-bold font-heading uppercase tracking-wide group-hover:text-brand-amber transition-colors">
                                                View Products <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── HOW IT WORKS ──────────────────────────────────────── */}
            <section className="bg-brand-deep py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center mb-14"
                    >
                        <p className="text-brand-amber text-sm font-bold uppercase tracking-widest mb-3">
                            Simple Process
                        </p>
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white">
                            How It Works
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {HOW_IT_WORKS.map((step) => {
                            const Icon = step.icon
                            return (
                                <motion.div key={step.step} variants={fadeUp} className="text-center">
                                    <div className="w-14 h-14 bg-brand-amber/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon size={24} className="text-brand-amber" />
                                    </div>
                                    <p className="text-brand-amber/60 text-xs font-mono mb-1">{step.step}</p>
                                    <h3 className="font-heading font-bold text-white text-lg mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-blue-200 text-sm leading-relaxed">{step.description}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── QUOTE CTA ─────────────────────────────────────────── */}
            <section className="bg-brand-amber py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
                            Need a Custom Sign or Print Project?
                        </h2>
                        <p className="text-brand-dark/75 text-lg mb-8 leading-relaxed">
                            Send us your size, idea, location, material preference, and deadline. We'll
                            help you choose the right design, material, finish, and production option —
                            and we'll give you an exact quote, not a guess.
                        </p>
                        <Link
                            href="/quote-request"
                            className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold font-heading uppercase tracking-wide px-10 py-4 rounded-lg hover:bg-brand-deep transition-colors text-sm"
                        >
                            Request a Quote <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main >
    )
}