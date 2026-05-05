'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Search, Box, MessageSquareText } from 'lucide-react'

export default function SignageHubClient({ categories }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const productAreaRef = useRef(null)

    const defaultCategorySlug = categories?.[0]?.slug || ''
    const urlCategory = searchParams.get('category')

    const [selectedSlug, setSelectedSlug] = useState(urlCategory || defaultCategorySlug)

    useEffect(() => {
        if (urlCategory && categories.some((cat) => cat.slug === urlCategory)) {
            setSelectedSlug(urlCategory)
        }
    }, [urlCategory, categories])

    const selectedCategory = useMemo(() => {
        return categories.find((cat) => cat.slug === selectedSlug) || categories[0]
    }, [categories, selectedSlug])

    const handleCategoryClick = (slug) => {
        setSelectedSlug(slug)

        const params = new URLSearchParams(searchParams.toString())
        params.set('category', slug)

        router.push(`/signage?${params.toString()}`, { scroll: false })

        setTimeout(() => {
            productAreaRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 80)
    }

    const createQuoteLink = (productName, categoryName) => {
        const params = new URLSearchParams()
        params.set('product', productName)
        params.set('category', categoryName)
        return `/quote-request?${params.toString()}`
    }

    return (
        <main className="min-h-screen bg-[#FAF8F4] text-[#1C1917]">
            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#061B35] via-[#0369A1] to-[#0EA5E9] px-6 py-24 text-white md:py-28">
                <div className="absolute inset-0 opacity-40">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)',
                            backgroundSize: '34px 34px',
                        }}
                    />
                </div>

                <div className="relative mx-auto max-w-5xl text-center">
                    <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.22em] text-[#F59E0B]">
                        Signage & Print
                    </p>

                    <h1 className="mx-auto max-w-5xl font-heading text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                        Custom Signage & Print That{' '}
                        <span className="text-[#F59E0B]">Makes Your Brand Visible</span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
                        Browse our most requested sign products by category and quickly find the
                        right option for your storefront, vehicle, event, promotion, or local business.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/quote-request"
                            className="inline-flex items-center gap-3 rounded-xl bg-[#F59E0B] px-8 py-4 font-heading text-sm font-black uppercase tracking-[0.14em] text-[#1C1917] transition hover:-translate-y-0.5 hover:bg-[#fbbf24]"
                        >
                            Start a Signage Quote <ArrowRight size={18} />
                        </Link>

                        <button
                            onClick={() =>
                                productAreaRef.current?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                })
                            }
                            className="inline-flex items-center gap-3 rounded-xl border-2 border-white/35 px-8 py-4 font-heading text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-[#1C1917]"
                        >
                            View Products <Search size={17} />
                        </button>
                    </div>
                </div>
            </section>

            {/* SHORT INTRO */}
            <section className="border-b border-black/5 bg-white px-6 py-10">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                        Choose a category on the left and view the products on the right. Product quote
                        buttons will automatically pre-select that product in the quote form.
                    </p>
                </div>
            </section>

            {/* PRODUCT BROWSER */}
            <section ref={productAreaRef} className="px-6 py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">
                    {/* LEFT CATEGORY LIST */}
                    <aside className="lg:sticky lg:top-28 lg:self-start">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
                                <Search size={21} className="text-[#0369A1]" />
                                <h2 className="font-heading text-xl font-black">Categories</h2>
                            </div>

                            <div className="max-h-[72vh] overflow-y-auto">
                                {categories.map((category) => {
                                    const isActive = category.slug === selectedCategory.slug

                                    return (
                                        <button
                                            key={category.slug}
                                            type="button"
                                            onClick={() => handleCategoryClick(category.slug)}
                                            className={`group flex w-full items-center justify-between border-b border-slate-100 px-6 py-5 text-left transition ${isActive
                                                    ? 'bg-[#0369A1] text-white'
                                                    : 'bg-white text-[#1C1917] hover:bg-slate-50'
                                                }`}
                                        >
                                            <span>
                                                <span className="block font-heading text-base font-black leading-tight">
                                                    {category.name}
                                                </span>
                                                <span
                                                    className={`mt-1 block text-sm ${isActive ? 'text-white/80' : 'text-slate-500'
                                                        }`}
                                                >
                                                    {category.products?.length || 0} products
                                                </span>
                                            </span>

                                            <ArrowRight
                                                size={18}
                                                className={isActive ? 'text-[#F59E0B]' : 'text-slate-400'}
                                            />
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl bg-[#1C1917] p-6 text-white shadow-sm">
                            <MessageSquareText size={26} className="mb-5 text-[#F59E0B]" />
                            <h3 className="font-heading text-xl font-black">Need help choosing?</h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/65">
                                Tell us the size, quantity, logo, and deadline. We’ll help you choose
                                the right signage product for your project.
                            </p>
                            <Link
                                href="/quote-request"
                                className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-black uppercase tracking-wide text-[#F59E0B]"
                            >
                                Get a Free Quote <ArrowRight size={15} />
                            </Link>
                        </div>
                    </aside>

                    {/* RIGHT PRODUCT AREA */}
                    <div>
                        {/* SELECTED CATEGORY CARD */}
                        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0369A1] via-[#075985] to-[#0C1E3C] p-7 text-white shadow-sm md:p-9">
                            <div className="absolute right-8 top-6 h-24 w-24 rounded-3xl border border-white/10 opacity-40 rotate-12" />
                            <div className="absolute right-20 top-20 h-16 w-16 rounded-full border border-white/10 opacity-30" />

                            <p className="mb-3 font-heading text-xs font-black uppercase tracking-[0.28em] text-white/60">
                                Selected Category
                            </p>

                            <h2 className="font-heading text-3xl font-black leading-tight md:text-5xl">
                                {selectedCategory.name}
                            </h2>

                            <p className="mt-4 text-white/75">
                                {selectedCategory.products?.length || 0} products available
                            </p>
                        </div>

                        {/* PRODUCT GRID */}
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {selectedCategory.products?.map((product) => (
                                <article
                                    key={product.slug || product.name}
                                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-40 flex-col justify-between bg-slate-100 p-6">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E0F2FE] text-[#0369A1]">
                                            <Box size={24} />
                                        </div>

                                        <p className="font-mono text-xs leading-relaxed text-slate-500 line-clamp-2">
                                            {product.imagePlaceholder ||
                                                `${product.name} — clean product mockup`}
                                        </p>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="font-heading text-2xl font-black leading-tight text-[#1C1917]">
                                            {product.name}
                                        </h3>

                                        <p className="mt-4 min-h-[96px] text-base leading-relaxed text-slate-600">
                                            {product.description}
                                        </p>

                                        {product.bestFor && (
                                            <div className="mt-5 border-t border-slate-100 pt-5">
                                                <p className="text-sm leading-relaxed text-slate-500">
                                                    <span className="font-bold text-[#1C1917]">Best for:</span>{' '}
                                                    {product.bestFor}
                                                </p>
                                            </div>
                                        )}

                                        <Link
                                            href={createQuoteLink(product.name, selectedCategory.name)}
                                            className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-black uppercase tracking-wide text-[#0369A1] transition hover:text-[#F59E0B]"
                                        >
                                            Request Quote <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#0C1E3C] px-6 py-16 text-center text-white">
                <h2 className="font-heading text-3xl font-black md:text-5xl">
                    Ready to make your business more visible?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                    Send us what you need, and we’ll help you choose the right material, size,
                    finish, and installation option.
                </p>
                <Link
                    href="/quote-request"
                    className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#F59E0B] px-8 py-4 font-heading text-sm font-black uppercase tracking-[0.14em] text-[#1C1917] transition hover:-translate-y-0.5 hover:bg-[#fbbf24]"
                >
                    Get a Free Quote <ArrowRight size={18} />
                </Link>
            </section>
        </main>
    )
}