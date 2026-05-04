// components/signage/SignageCategoryClient.jsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
    visible: { transition: { staggerChildren: 0.07 } },
}

export default function SignageCategoryClient({ category, allCategories }) {
    // Related: up to 3 other categories (not current)
    const related = allCategories
        .filter((c) => c.slug !== category.slug)
        .slice(0, 3)

    return (
        <main className="min-h-screen bg-brand-cream">

            {/* ── BREADCRUMB ────────────────────────────────────────── */}
            <div className="bg-white border-b border-gray-100 px-6 py-3">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-brand-deep transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/signage" className="hover:text-brand-deep transition-colors">Signage & Print</Link>
                        <span>/</span>
                        <span className="text-brand-dark font-semibold">{category.name}</span>
                    </nav>
                </div>
            </div>

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="bg-brand-dark text-white py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.p variants={fadeUp} className="text-brand-amber text-sm font-bold uppercase tracking-widest mb-3">
                            Signage & Print
                        </motion.p>
                        <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                            {category.seo.h1}
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-brand-amber text-xl font-semibold mb-4">
                            {category.tagline}
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
                            {category.description}
                        </motion.p>
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/quote-request"
                                className="bg-brand-amber text-brand-dark font-bold font-heading uppercase tracking-wide px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors text-sm inline-flex items-center gap-2"
                            >
                                Request a Quote <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/signage"
                                className="border-2 border-white/30 text-white font-bold font-heading uppercase tracking-wide px-8 py-4 rounded-lg hover:border-white transition-colors text-sm inline-flex items-center gap-2"
                            >
                                <ArrowLeft size={16} /> All Categories
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── PRODUCT GRID ──────────────────────────────────────── */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-12"
                    >
                        <p className="text-brand-sky text-sm font-bold uppercase tracking-widest mb-2">
                            {category.products.length} Products Available
                        </p>
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand-dark">
                            {category.name} Products
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {category.products.map((product) => (
                            <motion.div
                                key={product.slug}
                                variants={fadeUp}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                            >
                                {/* Product image placeholder */}
                                <div
                                    className="w-full h-48 flex items-end p-4"
                                    style={{ backgroundColor: category.placeholderBg }}
                                >
                                    <span className="text-white/60 text-xs font-mono leading-tight">
                                        {product.imagePlaceholder}
                                    </span>
                                </div>

                                {/* Product content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="font-heading font-extrabold text-xl text-brand-dark mb-3">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                                        {product.description}
                                    </p>

                                    {/* Best For */}
                                    <div className="mb-5">
                                        <p className="text-xs font-bold text-brand-deep uppercase tracking-wider mb-2">
                                            Best For
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.bestFor.split(',').slice(0, 3).map((use, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1 text-xs text-brand-deep bg-blue-50 px-2 py-1 rounded-full"
                                                >
                                                    <CheckCircle size={10} />
                                                    {use.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={`/quote-request?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category.name)}`}
                                        className="w-full bg-brand-amber text-brand-dark font-bold font-heading uppercase tracking-wide text-sm py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors text-center"
                                    >
                                        Request a Quote
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── RELATED CATEGORIES ────────────────────────────────── */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-10"
                    >
                        <h2 className="font-heading text-2xl font-extrabold text-brand-dark">
                            Explore More Signage Categories
                        </h2>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                    >
                        {related.map((cat) => (
                            <motion.div key={cat.slug} variants={fadeUp}>
                                <Link
                                    href={`/signage/${cat.slug}`}
                                    className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-brand-sky hover:bg-blue-50 transition-all"
                                >
                                    <div>
                                        <p className="font-heading font-bold text-brand-dark group-hover:text-brand-deep transition-colors">
                                            {cat.name}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {cat.products.length} products
                                        </p>
                                    </div>
                                    <ArrowRight size={16} className="text-gray-300 group-hover:text-brand-amber transition-colors" />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mt-8 text-center"
                    >
                        <Link
                            href="/signage"
                            className="inline-flex items-center gap-2 text-brand-deep font-bold text-sm hover:text-brand-amber transition-colors"
                        >
                            <ArrowLeft size={14} /> View All 15 Signage Categories
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── QUOTE CTA ─────────────────────────────────────────── */}
            <section className="bg-brand-deep py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
                            Ready to Order Your {category.name}?
                        </h2>
                        <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                            Tell us your size, quantity, location, material preference, and deadline.
                            We'll get back to you within one business day with an exact quote —
                            no guessing, no surprises.
                        </p>
                        <Link
                            href={`/quote-request?category=${encodeURIComponent(category.name)}`}
                            className="inline-flex items-center gap-2 bg-brand-amber text-brand-dark font-bold font-heading uppercase tracking-wide px-10 py-4 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
                        >
                            Request a Free Quote <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main>
    )
}