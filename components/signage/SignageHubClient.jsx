'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Search, Box, MessageSquareText, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, scaleIn, stagger, viewport } from '@/lib/animations'
import { SIGNAGE_PRODUCT_SLUGS } from '@/lib/signage-products'

const ALL_PRODUCTS_SLUG = 'all-products'

const sortProductsByName = (products) => {
    return products
        .map((product, index) => ({ product, index }))
        .sort((a, b) => (
            a.product.name.localeCompare(b.product.name, undefined, { sensitivity: 'base' }) ||
            a.index - b.index
        ))
        .map(({ product }) => product)
}

export default function SignageHubClient({ categories = [] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const productAreaRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('')

    const allProducts = useMemo(() => {
        return sortProductsByName(categories.flatMap((category) =>
            (category.products || []).map((product) => ({
                ...product,
                categoryName: category.name,
                categorySlug: category.slug,
            }))
        ))
    }, [categories])

    const categoryOptions = useMemo(() => [
        {
            slug: ALL_PRODUCTS_SLUG,
            name: 'All Products',
            products: allProducts,
            isAllProducts: true,
        },
        ...categories,
    ], [allProducts, categories])

    const defaultCategorySlug = ALL_PRODUCTS_SLUG
    const urlCategory = searchParams.get('category')
    const selectedSlug = categoryOptions.some((cat) => cat.slug === urlCategory) ? urlCategory : defaultCategorySlug

    const selectedCategory = useMemo(() => {
        return categoryOptions.find((cat) => cat.slug === selectedSlug) || categoryOptions[0]
    }, [categoryOptions, selectedSlug])

    const selectedProducts = useMemo(() => {
        if (selectedCategory?.isAllProducts) return allProducts

        return sortProductsByName((selectedCategory?.products || []).map((product) => ({
            ...product,
            categoryName: selectedCategory.name,
            categorySlug: selectedCategory.slug,
        })))
    }, [allProducts, selectedCategory])

    const normalizedSearchTerm = searchTerm.trim().toLowerCase()
    const isSearchActive = normalizedSearchTerm.length > 0

    const filteredProducts = useMemo(() => {
        if (!normalizedSearchTerm) return selectedProducts

        return selectedProducts.filter((product) => {
            const searchableText = [
                product.name,
                product.categoryName,
                product.description,
                ...(product.searchKeywords || []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()

            return searchableText.includes(normalizedSearchTerm)
        })
    }, [normalizedSearchTerm, selectedProducts])

    const selectedHeading = selectedCategory?.isAllProducts
        ? 'All Signage & Print Products'
        : selectedCategory.name

    const handleCategoryClick = (slug) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('category', slug)
        router.push(`/signage?${params.toString()}`, { scroll: false })
        setTimeout(() => {
            productAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
    }

    const createQuoteLink = (productName, categoryName) => {
        const params = new URLSearchParams()
        params.set('product', productName)
        params.set('category', categoryName)
        return `/quote-request?${params.toString()}`
    }

    const getProductLink = (product) => {
        const productSlug = SIGNAGE_PRODUCT_SLUGS[product.slug]
        return productSlug ? `/signage/${productSlug}` : '/signage'
    }

    return (
        <main className="min-h-screen bg-[#FAF8F4] text-[#1C1917]">

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#061B35] via-[#0369A1] to-[#0EA5E9] px-6 py-24 text-white md:py-28">
                <div className="absolute inset-0 opacity-40">
                    <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)', backgroundSize: '34px 34px' }} />
                </div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="relative mx-auto max-w-5xl text-center"
                >
                    <motion.p variants={fadeUp} className="section-label mb-4" style={{ color: '#F59E0B' }}>
                        Signage & Print
                    </motion.p>
                    <motion.h1 variants={fadeUp} style={{ color: 'white', margin: '0 auto', maxWidth: '900px' }}>
                        Custom Signage & Print That{' '}
                        <span style={{ color: '#F59E0B' }}>Makes Your Brand Visible</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
                        Browse our most requested sign products by category and quickly find the right option for your storefront, vehicle, event, promotion, or local business.
                    </motion.p>
                    <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/quote-request" className="btn-amber">
                            Start a Signage Quote <ArrowRight size={18} />
                        </Link>
                        <button onClick={() => productAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="btn-ghost">
                            View Products <Search size={17} />
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* SHORT INTRO */}
            <section className="border-b border-black/5 bg-white px-6 py-10">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                        Choose a category and view the matching products. Product quote buttons will automatically pre-select that product in the quote form.
                    </p>
                </div>
            </section>

            {/* PRODUCT BROWSER */}
            <section ref={productAreaRef} className="px-6 py-16 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">

                    {/* LEFT: CATEGORY SIDEBAR */}
                    <motion.aside
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
                    >
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
                                <Search size={21} className="text-[#0369A1]" />
                                <h2 style={{ color: '#1C1917' }}>Categories</h2>
                            </div>
                            <div className="max-h-[72vh] overflow-y-auto">
                                {categoryOptions.map((category) => {
                                    const isActive = category.slug === selectedCategory.slug
                                    return (
                                        <button key={category.slug} type="button" onClick={() => handleCategoryClick(category.slug)}
                                            className={`group flex w-full items-center justify-between border-b border-slate-100 px-6 py-5 text-left transition ${isActive ? 'bg-[#0369A1] text-white' : 'bg-white text-[#1C1917] hover:bg-slate-50'}`}
                                        >
                                            <span>
                                                <span className="block font-heading font-bold leading-tight">{category.name}</span>
                                                <span className={`mt-1 block text-sm ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                                                    {category.products?.length || 0} products
                                                </span>
                                            </span>
                                            <ArrowRight size={18} className={isActive ? 'text-[#F59E0B]' : 'text-slate-400'} />
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* HELP BOX */}
                        <div className="mt-5 rounded-2xl bg-[#1C1917] p-6 text-white shadow-sm">
                            <MessageSquareText size={26} className="mb-5 text-[#F59E0B]" />
                            <h3 style={{ color: 'white', marginBottom: '0.75rem' }}>Need help choosing?</h3>
                            <p className="text-sm leading-relaxed text-white/65">
                                Tell us the size, quantity, logo, and deadline. We&apos;ll help you choose the right signage product for your project.
                            </p>
                            <Link href="/quote-request" className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-[#F59E0B]">
                                Get a Free Quote <ArrowRight size={15} />
                            </Link>
                            <Link href="/free-visibility-check" className="mt-3 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-white/75 transition hover:text-[#F59E0B]">
                                Check Visibility First <ArrowRight size={15} />
                            </Link>
                        </div>
                    </motion.aside>

                    {/* RIGHT: PRODUCT AREA */}
                    <div className="min-w-0">
                        {/* MOBILE CATEGORY CHIPS */}
                        <section className="mb-6 lg:hidden" aria-labelledby="mobile-category-heading">
                            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <Search size={20} className="shrink-0 text-[#0369A1]" />
                                    <div>
                                        <h2 id="mobile-category-heading" className="text-xl text-[#1C1917]">
                                            Choose a category
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Swipe sideways, then scroll down for products.
                                        </p>
                                    </div>
                                </div>
                                <div className="-mx-1 overflow-x-auto pb-1">
                                    <div className="flex w-max max-w-none gap-2 px-1">
                                        {categoryOptions.map((category) => {
                                            const isActive = category.slug === selectedCategory.slug
                                            return (
                                                <button
                                                    key={category.slug}
                                                    type="button"
                                                    onClick={() => handleCategoryClick(category.slug)}
                                                    className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                                                        isActive
                                                            ? 'border-[#0369A1] bg-[#0369A1] text-white shadow-sm'
                                                            : 'border-slate-200 bg-[#FAF8F4] text-[#1C1917] hover:border-[#F59E0B]'
                                                    }`}
                                                    aria-pressed={isActive}
                                                >
                                                    {category.name}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SELECTED CATEGORY HEADER */}
                        <motion.div
                            key={selectedCategory.slug}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0369A1] via-[#075985] to-[#0C1E3C] p-7 text-white shadow-sm md:p-9"
                        >
                            <div className="absolute right-8 top-6 h-24 w-24 rounded-3xl border border-white/10 opacity-40 rotate-12" />
                            <div className="absolute right-20 top-20 h-16 w-16 rounded-full border border-white/10 opacity-30" />
                            <p className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>Selected Category</p>
                            <h2 style={{ color: 'white' }}>{selectedHeading}</h2>
                            <p className="mt-4 text-white/75">{selectedProducts.length} products available</p>
                        </motion.div>

                        {/* SEARCH */}
                        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
                            <label htmlFor="signage-product-search" className="mb-2 block font-heading text-sm font-bold uppercase tracking-wide text-[#0369A1]">
                                Find a product
                            </label>
                            <div className="relative">
                                <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0369A1]" />
                                <input
                                    id="signage-product-search"
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search signs, banners, decals, cards..."
                                    className="w-full rounded-xl border border-slate-200 bg-[#FAF8F4] py-3.5 pl-12 pr-12 text-base text-[#1C1917] shadow-inner outline-none transition placeholder:text-slate-400 focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-[#0EA5E9]/15"
                                />
                                {isSearchActive && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                                        aria-label="Clear product search"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                            {isSearchActive && (
                                <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                                    <p>
                                        Search results for <span className="font-bold text-[#1C1917]">&ldquo;{searchTerm.trim()}&rdquo;</span>
                                        {' '}<span className="font-bold text-[#0369A1]">{filteredProducts.length}</span> matching {filteredProducts.length === 1 ? 'product' : 'products'}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm('')}
                                        className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-[#0369A1] transition hover:border-[#F59E0B] hover:text-[#1C1917] sm:self-auto"
                                    >
                                        Clear Search <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* PRODUCT GRID — cards animate in when category changes */}
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                key={selectedCategory.slug + '-grid-' + normalizedSearchTerm}
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                            >
                                {filteredProducts.map((product) => (
                                    <motion.article
                                        key={`${product.categorySlug || selectedCategory.slug}-${product.slug || product.name}`}
                                        variants={scaleIn}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                            {product.image ? (
                                                <Image
                                                    src={product.image}
                                                    alt={product.alt || `${product.name} — custom signage by Pixel & Panel`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    className="object-cover transition duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full flex-col justify-between p-6">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E0F2FE] text-[#0369A1]">
                                                        <Box size={24} />
                                                    </div>
                                                    <p className="font-mono text-xs leading-relaxed text-slate-500 line-clamp-2">
                                                        {product.imagePlaceholder || `${product.name} — photo coming soon`}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <Link href={getProductLink(product)} className="block">
                                                <h3 style={{ color: '#1C1917', marginBottom: '1rem' }}>{product.name}</h3>
                                            </Link>
                                            <p className="min-h-[96px] text-base leading-relaxed text-slate-600">{product.description}</p>
                                            {product.bestFor && (
                                                <div className="mt-5 border-t border-slate-100 pt-5">
                                                    <p className="text-sm leading-relaxed text-slate-500">
                                                        <span className="font-bold text-[#1C1917]">Best for:</span>{' '}{product.bestFor}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="mt-6 flex flex-wrap gap-4">
                                                <Link href={getProductLink(product)} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-[#0369A1] transition hover:text-[#F59E0B]">
                                                    Learn More <ArrowRight size={15} />
                                                </Link>
                                                <Link href={createQuoteLink(product.name, product.categoryName || selectedCategory.name)} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-[#F59E0B] transition hover:text-[#0369A1]">
                                                    Request Quote <ArrowRight size={15} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                                <h3 style={{ color: '#1C1917', marginBottom: '0.75rem' }}>No matching products found.</h3>
                                <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                                    Try searching for &ldquo;banner,&rdquo; &ldquo;yard sign,&rdquo; &ldquo;vehicle,&rdquo; &ldquo;window,&rdquo; &ldquo;menu,&rdquo; or &ldquo;business card.&rdquo;
                                </p>
                                <Link href="/quote-request?product=General%20Signage%20Help&category=Signage" className="btn-amber mt-6 inline-flex">
                                    Request Help Choosing <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="bg-[#0C1E3C] px-6 py-16 text-center text-white">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    <motion.h2 variants={fadeUp} style={{ color: 'white', marginBottom: '1.25rem' }}>
                        Ready to make your business more visible?
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                        Send us what you need, and we&apos;ll help you choose the right material, size, finish, and installation option.
                    </motion.p>
                    <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/quote-request" className="btn-amber">
                            Get a Free Quote <ArrowRight size={18} />
                        </Link>
                        <Link href="/free-visibility-check" className="btn-ghost">
                            Free Visibility Check <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

        </main>
    )
}
