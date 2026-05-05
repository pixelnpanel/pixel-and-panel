'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
    ArrowRight,
    ChevronRight,
    Grid3X3,
    MessageSquare,
    Package,
    Search,
} from 'lucide-react'

export default function SignageHubClient({ categories }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [activeSlug, setActiveSlug] = useState(categories?.[0]?.slug || '')
    const productTopRef = useRef(null)

    const activeCategory = useMemo(() => {
        return categories.find((category) => category.slug === activeSlug) || categories[0]
    }, [activeSlug, categories])

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category')

        if (!categoryFromUrl) return

        const categoryExists = categories.some(
            (category) => category.slug === categoryFromUrl
        )

        if (!categoryExists) return

        setActiveSlug(categoryFromUrl)

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                const element = productTopRef.current

                if (element) {
                    const topPosition =
                        element.getBoundingClientRect().top + window.scrollY - 110

                    window.scrollTo({
                        top: topPosition,
                        behavior: 'smooth',
                    })
                }
            }, 150)
        })
    }, [searchParams, categories])

    const handleCategoryClick = (slug) => {
        setActiveSlug(slug)

        router.replace(`${pathname}?category=${slug}`, {
            scroll: false,
        })

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                const element = productTopRef.current

                if (element) {
                    const topPosition =
                        element.getBoundingClientRect().top + window.scrollY - 110

                    window.scrollTo({
                        top: topPosition,
                        behavior: 'smooth',
                    })
                }
            }, 50)
        })
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-brand-cream">
                {/* HERO */}
                <section className="relative overflow-hidden text-white px-6 pt-28 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-brand-navy via-brand-deep to-brand-sky">
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
                                backgroundSize: '28px 28px',
                            }}
                        />
                    </div>

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-sky/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />

                    <div className="relative max-w-6xl mx-auto text-center">
                        <p className="text-brand-amber text-sm font-bold uppercase tracking-widest mb-4">
                            Signage & Print
                        </p>

                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 max-w-5xl mx-auto">
                            Custom Signage & Print That{' '}
                            <span className="text-brand-amber">Makes Your Brand Visible</span>
                        </h1>

                        <p className="text-white/75 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                            Browse signage by category and quickly find the products that fit your
                            business, event, storefront, or promotion.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/quote-request" className="btn-amber justify-center">
                                Request a Quote <ArrowRight size={16} />
                            </Link>

                            <a href="#product-browser" className="btn-ghost justify-center">
                                View Products <Grid3X3 size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* SHORT INTRO */}
                <section className="bg-white border-b border-gray-200 px-6 py-7">
                    <div className="max-w-5xl mx-auto text-center">
                        <p className="text-brand-dark text-base md:text-lg leading-relaxed">
                            Explore signage categories on the left and instantly view products on the
                            right. Click any category to browse product options without leaving the page.
                        </p>
                    </div>
                </section>

                {/* PRODUCT BROWSER */}
                <section id="product-browser" className="px-6 py-10 md:py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-7 items-start">
                            {/* LEFT CATEGORY SIDEBAR */}
                            <aside className="lg:sticky lg:top-28">
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <Search size={18} className="text-brand-deep" />
                                            <h3 className="font-heading font-extrabold text-brand-dark">
                                                Categories
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Desktop Category List */}
                                    <div className="hidden lg:block max-h-[720px] overflow-y-auto">
                                        {categories.map((category) => {
                                            const isActive = category.slug === activeCategory.slug

                                            return (
                                                <button
                                                    key={category.slug}
                                                    type="button"
                                                    onClick={() => handleCategoryClick(category.slug)}
                                                    className={`w-full text-left px-5 py-4 border-b border-gray-100 transition-colors flex items-center justify-between gap-3 ${isActive
                                                            ? 'bg-brand-deep text-white'
                                                            : 'bg-white text-brand-dark hover:bg-brand-cream'
                                                        }`}
                                                >
                                                    <span>
                                                        <span className="block font-heading font-bold text-sm">
                                                            {category.name}
                                                        </span>

                                                        <span
                                                            className={`block text-xs mt-1 ${isActive ? 'text-white/75' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            {category.products.length} products
                                                        </span>
                                                    </span>

                                                    <ChevronRight
                                                        size={17}
                                                        className={
                                                            isActive ? 'text-brand-amber' : 'text-gray-400'
                                                        }
                                                    />
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {/* Mobile Category List */}
                                    <div className="lg:hidden flex overflow-x-auto gap-2 p-3">
                                        {categories.map((category) => {
                                            const isActive = category.slug === activeCategory.slug

                                            return (
                                                <button
                                                    key={category.slug}
                                                    type="button"
                                                    onClick={() => handleCategoryClick(category.slug)}
                                                    className={`shrink-0 px-4 py-3 rounded-xl text-sm font-heading font-bold transition-colors ${isActive
                                                            ? 'bg-brand-deep text-white'
                                                            : 'bg-brand-cream text-brand-dark'
                                                        }`}
                                                >
                                                    {category.name}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="mt-5 bg-brand-dark text-white rounded-2xl p-6 shadow-sm">
                                    <MessageSquare className="text-brand-amber mb-4" size={28} />

                                    <h3 className="font-heading font-extrabold text-xl mb-2">
                                        Need help choosing?
                                    </h3>

                                    <p className="text-white/70 text-sm leading-relaxed mb-5">
                                        Tell us the size, quantity, logo, and deadline. We’ll help you
                                        pick the right signage product for your project.
                                    </p>

                                    <Link
                                        href="/quote-request"
                                        className="inline-flex items-center gap-2 text-brand-amber font-heading font-bold uppercase tracking-wide text-sm"
                                    >
                                        Get a Free Quote <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </aside>

                            {/* RIGHT PRODUCTS */}
                            <section ref={productTopRef}>
                                {/* COMPACT CATEGORY HEADER */}
                                <div className="relative overflow-hidden rounded-2xl bg-brand-dark text-white shadow-sm mb-6 border border-white/10">
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${activeCategory.placeholderBg || '#0369A1'
                                                } 0%, #0C1E3C 65%, #1C1917 100%)`,
                                        }}
                                    />

                                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
                                    <div className="absolute top-8 right-24 w-16 h-16 rounded-full bg-brand-amber/20 blur-xl" />

                                    <div className="absolute inset-y-0 right-0 w-1/3 opacity-20">
                                        <div className="absolute top-6 right-8 w-20 h-20 border border-white/30 rounded-2xl rotate-12" />
                                        <div className="absolute bottom-5 right-20 w-14 h-14 border border-white/20 rounded-full" />
                                        <div className="absolute top-16 right-28 w-3 h-3 bg-brand-amber rounded-full" />
                                    </div>

                                    <div className="relative px-6 py-6 md:px-8 md:py-7">
                                        <p className="text-white/65 text-[0.68rem] uppercase tracking-[0.22em] font-bold mb-2">
                                            Selected Category
                                        </p>

                                        <h2 className="font-heading text-2xl md:text-4xl font-extrabold leading-tight">
                                            {activeCategory.name}
                                        </h2>

                                        <p className="text-white/75 text-sm mt-2">
                                            {activeCategory.products.length} products available
                                        </p>
                                    </div>
                                </div>

                                {/* PRODUCTS GRID */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {activeCategory.products.map((product) => (
                                        <article
                                            key={product.slug}
                                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                                        >
                                            <div className="h-36 bg-gray-100 flex items-end p-5 border-b border-gray-200">
                                                <div className="w-full">
                                                    <div className="w-11 h-11 rounded-xl bg-brand-deep/10 flex items-center justify-center mb-3">
                                                        <Package size={21} className="text-brand-deep" />
                                                    </div>

                                                    <p className="text-gray-500 text-xs font-mono leading-relaxed line-clamp-2">
                                                        {product.imagePlaceholder}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="font-heading font-extrabold text-xl text-brand-dark mb-3 leading-tight">
                                                    {product.name}
                                                </h3>

                                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                                    {product.description}
                                                </p>

                                                <Link
                                                    href="/quote-request"
                                                    className="inline-flex items-center gap-2 text-brand-deep font-heading font-bold uppercase tracking-wide text-sm hover:text-brand-amber transition-colors"
                                                >
                                                    Request Quote <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-brand-navy text-white px-6 py-16">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4">
                            Ready to make your business more visible?
                        </h2>

                        <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
                            Tell us what kind of sign you need, and we’ll help you choose the best
                            product, material, and setup.
                        </p>

                        <Link href="/quote-request" className="btn-amber justify-center">
                            Start a Signage Quote <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}