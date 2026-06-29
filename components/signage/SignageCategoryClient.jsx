// components/signage/SignageCategoryClient.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Box } from 'lucide-react'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = { visible: { transition: { staggerChildren: 0.07 } } }

function formatPrice(value) {
    if (value == null || !Number.isFinite(value)) return null
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

export default function SignageCategoryClient({ category, allCategories = [] }) {
    const related = allCategories.filter((c) => c.slug !== category.slug).slice(0, 3)
    const products = category.products || []

    return (
        <div className="min-h-screen bg-[#FAF8F4] text-[#1C1917]">

            {/* BREADCRUMB — top padding clears the fixed site navbar (99px mobile / 68px desktop) */}
            <div className="border-b border-slate-100 bg-white px-6 pb-3 pt-[calc(99px+0.75rem)] lg:pt-[calc(68px+0.75rem)]">
                <div className="mx-auto max-w-7xl">
                    <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="transition hover:text-[#0369A1]">Home</Link>
                        <span>/</span>
                        <Link href="/signage" className="transition hover:text-[#0369A1]">Signage &amp; Print</Link>
                        <span>/</span>
                        <span className="font-semibold text-[#1C1917]">{category.name}</span>
                    </nav>
                </div>
            </div>

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#061B35] via-[#0369A1] to-[#0EA5E9] px-6 py-16 text-white md:py-24">
                <div className="absolute inset-0 opacity-40">
                    <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)', backgroundSize: '34px 34px' }} />
                </div>
                <motion.div initial="hidden" animate="visible" variants={stagger} className="relative mx-auto max-w-5xl">
                    <motion.p variants={fadeUp} className="section-label mb-3" style={{ color: '#F59E0B' }}>
                        Signage &amp; Print
                    </motion.p>
                    <motion.h1 variants={fadeUp} className="font-heading text-4xl font-extrabold leading-tight md:text-6xl" style={{ color: 'white' }}>
                        {category.h1 || category.name}
                    </motion.h1>
                    <motion.p variants={fadeUp} className="mt-4 text-xl font-semibold" style={{ color: '#F59E0B' }}>
                        {category.tagline}
                    </motion.p>
                    <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
                        {category.description}
                    </motion.p>
                    <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link href="/quote-request" className="btn-amber">
                            Request a Quote <ArrowRight size={18} />
                        </Link>
                        <Link href="/signage" className="btn-ghost">
                            <ArrowLeft size={18} /> All Categories
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* PRODUCT GRID */}
            <section className="px-6 py-16 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10">
                        <p className="section-label text-[#0EA5E9]">{products.length} products available</p>
                        <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#1C1917] md:text-4xl">
                            {category.name}
                        </h2>
                    </div>

                    {products.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.05 }}
                            variants={stagger}
                            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                        >
                            {products.map((product) => {
                                const fromPrice = product.isLive ? formatPrice(product.lowestPrice) : null
                                const href = `/signage/${category.slug}/${product.slug}`
                                return (
                                    <motion.article
                                        key={product.slug}
                                        variants={fadeUp}
                                        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        {/* Whole card is the link to the product detail page. */}
                                        <Link
                                            href={href}
                                            aria-label={`${product.name} — view details & pricing`}
                                            className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA5E9]/30"
                                        />
                                        <div className="relative block aspect-square w-full overflow-hidden bg-[#FAF8F4] p-2">
                                            {product.image ? (
                                                <Image
                                                    src={product.image}
                                                    alt={product.alt || product.name}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 360px"
                                                    className="object-contain object-center transition duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-[#0369A1]">
                                                    <Box size={28} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col p-6">
                                            <h3 className="font-heading text-xl font-extrabold text-[#1C1917] transition group-hover:text-[#0369A1]">
                                                {product.name}
                                            </h3>
                                            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                                                {product.description}
                                            </p>
                                            <div className="mt-5 flex items-center justify-between">
                                                <span className="font-heading text-base font-bold text-[#0369A1]">
                                                    {fromPrice ? <>From {fromPrice}</> : 'Request a Quote'}
                                                </span>
                                                <span className="inline-flex items-center gap-1 font-heading text-sm font-bold uppercase tracking-wide text-[#F59E0B] transition group-hover:gap-2">
                                                    View details <ArrowRight size={15} />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                )
                            })}
                        </motion.div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                            <h3 className="font-heading text-xl font-bold text-[#1C1917]">No products yet in this category.</h3>
                            <p className="mx-auto mt-3 max-w-xl text-slate-600">Tell us what you need and we’ll prepare a quote.</p>
                            <Link href="/quote-request" className="btn-amber mt-6 inline-flex">
                                Request a Quote <ArrowRight size={18} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* RELATED CATEGORIES */}
            {related.length > 0 && (
                <section className="bg-white px-6 py-16">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="mb-8 font-heading text-2xl font-extrabold text-[#1C1917]">
                            Explore more signage categories
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {related.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/signage/${cat.slug}`}
                                    className="group flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-[#0EA5E9] hover:bg-[#F0F9FF]"
                                >
                                    <div>
                                        <p className="font-heading font-bold text-[#1C1917] transition group-hover:text-[#0369A1]">{cat.name}</p>
                                        <p className="mt-1 text-xs text-slate-500">{cat.productCount} products</p>
                                    </div>
                                    <ArrowRight size={16} className="text-slate-300 transition group-hover:text-[#F59E0B]" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-[#0C1E3C] px-6 py-16 text-center text-white">
                <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
                    Ready to order your {category.name.toLowerCase()}?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                    Tell us your size, quantity, and deadline. We’ll send an exact quote within one business day — no guessing, no surprises.
                </p>
                <div className="mt-8">
                    <Link href={`/quote-request?category=${encodeURIComponent(category.name)}`} className="btn-amber">
                        Request a Free Quote <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    )
}
