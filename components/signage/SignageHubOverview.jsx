// components/signage/SignageHubOverview.jsx
// EN /signage hub — category-first overview (vendor-style browsing):
// hero → trust strip → category tile grid → popular products → extended catalog.
// Category tiles link to the real /signage/[category] pages; search results and
// popular-product cards link straight to /signage/[category]/[product].
'use client'

import Link from 'next/link'
import { useModalFocus } from '@/lib/use-modal-focus'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Search, Box, X, BadgeCheck, Zap, PenTool, Truck, Store, Tent, Signpost, FileText, ChevronDown } from 'lucide-react'
import { trackExtendedCatalogClick } from '@/lib/analytics'
import { EXTENDED_CATALOG_URL } from '@/lib/sign-catalog'
import ReviewsBand from '@/components/sections/ReviewsBand'
import { indexSignageProducts, searchSignageProducts } from '@/lib/signage/search'

// Signage positioning stays national — keep chips city-free.
const SIGNAGE_REVIEW_CHIPS = [
    'Nationwide shipping',
    'Independently owned & operated',
    '5.0 rated on Google',
    'Files proofed before print',
]

const QUOTE_PATH = '/quote-request'
const VISIBILITY_PATH = '/free-visibility-check'
const SEARCH_SUGGESTIONS = ['Yard signs', 'Retractable banner', 'Storefront signs', 'Business cards']
const PROJECTS = [
    { label: 'Storefronts & windows', icon: Store, categories: ['vinyl-decals-and-window-graphics', 'dimensional-letters', 'sidewalk-a-frame-signs', 'rigid-and-metal-signs'] },
    { label: 'Events & trade shows', icon: Tent, categories: ['banners', 'banner-stands', 'trade-show-displays', 'event-tents', 'seg-displays', 'table-covers-and-throws'] },
    { label: 'Yard & real estate', icon: Signpost, categories: ['real-estate-signs', 'rigid-and-metal-signs', 'flags'] },
    { label: 'Print & packaging', icon: FileText, categories: ['business-cards', 'flyers-brochures-and-booklets', 'postcards-and-direct-mail', 'labels-stickers-and-packaging', 'stationery-and-business-forms'] },
]
const FEATURED_PRODUCTS = [
    ['banners', '13oz-vinyl-banner', 'Announce a sale, opening, or event.'],
    ['rigid-and-metal-signs', 'coroplast-yard-signs', 'Put a temporary message by the road.'],
    ['banner-stands', 'standard-retractable', 'Set up a portable display indoors.'],
    ['vinyl-decals-and-window-graphics', 'frosted-window-vinyl', 'Add privacy to a glass door or partition.'],
    ['event-tents', 'event-tent', 'Shade a branded booth at an outdoor market.'],
    ['flags', 'feather-angled-flag', 'Draw attention to an entrance from the street.'],
    ['sidewalk-a-frame-signs', 'standard-signicade', 'Point pedestrians toward your business.'],
    ['business-cards', 'business-cards', 'Give customers a way to contact you.'],
]

const TRUST_ITEMS = [
    { icon: BadgeCheck, label: 'Premium materials' },
    { icon: Zap, label: 'Fast turnaround' },
    { icon: PenTool, label: 'Free design help' },
    { icon: Truck, label: 'Nationwide shipping' },
]

function formatPrice(value) {
    if (value == null || !Number.isFinite(value)) return null
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

const productHref = (product) => `/signage/${product.categorySlug}/${product.slug}`

function ProductCard({ product }) {
    const fromPrice = product.isLive ? formatPrice(product.lowestPrice) : null

    return (
        <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-edge hover:shadow-card-hover">
            <Link
                href={productHref(product)}
                aria-label={`${product.name} — view details & pricing`}
                className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA5E9]/30"
            />
            <div className="relative aspect-square w-full overflow-hidden bg-white p-2">
                {product.isLive && (
                    <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#F59E0B] px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-[#1C1917] shadow-sm">
                        Instant Pricing
                    </span>
                )}
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.alt || product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                        className="object-contain object-center transition duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-[#0369A1]">
                        <Box size={26} />
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col border-t border-brand-divider p-3.5 md:p-4">
                <h3 className="font-heading text-sm font-extrabold leading-snug text-[#1C1917] transition group-hover:text-[#0369A1] md:text-base">
                    {product.name}
                </h3>
                <p className="mt-1 text-xs text-brand-subtle">{product.categoryName}</p>
                <p className="mt-2 text-sm leading-snug text-brand-muted">{product.useCase}</p>
                <p className="mt-auto pt-3 font-heading text-sm font-bold text-[#0369A1]">
                    {fromPrice ? <>From {fromPrice}</> : 'View Custom Sizes'}
                </p>
            </div>
        </article>
    )
}

export default function SignageHubOverview({ categories = [], reviews = [] }) {
    const mobileSearchInputRef = useRef(null)
    const searchDialogRef = useRef(null)
    const [isFloatingSearchVisible, setIsFloatingSearchVisible] = useState(false)
    const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false)
    const [mobileSearchTerm, setMobileSearchTerm] = useState('')
    const [activeProject, setActiveProject] = useState(null)

    const allProducts = useMemo(
        () => categories.flatMap((category) => category.products || []),
        [categories]
    )

    // Category tile art: hand-made cover collage when present (category.image,
    // resolved server-side), else the first product in the category with a photo.
    const categoryTiles = useMemo(() => {
        return categories.map((category) => {
            const cover = (category.products || []).find((p) => p.image)
            return {
                ...category,
                coverImage: category.image || cover?.image || null,
                coverAlt: category.image ? `Custom ${category.name} — Pixel & Panel` : (cover?.alt || category.name),
            }
        })
    }, [categories])

    const featuredProducts = useMemo(() => {
        return FEATURED_PRODUCTS.flatMap(([categorySlug, slug, useCase]) => {
            const item = allProducts.find((product) => product.categorySlug === categorySlug && product.slug === slug)
            return item ? [{ ...item, useCase }] : []
        })
    }, [allProducts])
    const availableProjects = PROJECTS.map((project) => ({
        ...project,
        categories: project.categories.map((slug) => categories.find((category) => category.slug === slug)).filter(Boolean),
    })).filter((project) => project.categories.length > 0)
    const selectedProject = availableProjects.find((project) => project.label === activeProject)

    const searchIndex = useMemo(() => indexSignageProducts(allProducts), [allProducts])
    const hasSearchTerm = Boolean(mobileSearchTerm.trim())
    const { products: searchResults, closeMatches } = useMemo(
        () => searchSignageProducts(searchIndex, mobileSearchTerm),
        [searchIndex, mobileSearchTerm]
    )
    const resultCategories = [...new Map(searchResults.map((product) => [product.categorySlug, product.categoryName]))].slice(0, 3)
    const shownProducts = hasSearchTerm ? searchResults : featuredProducts.slice(0, 4)

    useEffect(() => {
        const updateFloatingSearchVisibility = () => {
            if (typeof window === 'undefined') return

            if (isSearchSheetOpen) {
                setIsFloatingSearchVisible(false)
                return
            }
            // Appear after a little scroll (all breakpoints), then stay put.
            setIsFloatingSearchVisible(window.scrollY > 240)
        }

        updateFloatingSearchVisibility()
        window.addEventListener('scroll', updateFloatingSearchVisibility, { passive: true })
        window.addEventListener('resize', updateFloatingSearchVisibility)

        return () => {
            window.removeEventListener('scroll', updateFloatingSearchVisibility)
            window.removeEventListener('resize', updateFloatingSearchVisibility)
        }
    }, [isSearchSheetOpen])

    useModalFocus(searchDialogRef, isSearchSheetOpen, setIsSearchSheetOpen)

    const closeSearch = () => {
        setIsSearchSheetOpen(false)
    }

    return (
        <div className="min-h-screen overflow-x-clip bg-[#FAF8F4] text-[#1C1917]">

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#061B35] via-[#0369A1] to-[#0EA5E9] px-4 pb-6 pt-[7.5rem] text-white sm:px-6 md:pb-10 md:pt-28">
                <div className="absolute inset-0 opacity-40">
                    <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)', backgroundSize: '34px 34px' }} />
                </div>

                <div className="relative mx-auto max-w-5xl md:text-center">
                    <h1 className="mx-auto break-words text-white">
                        Custom signs, banners, and print
                    </h1>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/90 md:mt-3 md:text-lg">
                        Design help, artwork proofs, and nationwide shipping.
                    </p>
                    <form
                        role="search"
                        className="mx-auto mt-4 flex max-w-lg items-center gap-1 rounded-xl bg-white p-1 text-[#1C1917] shadow-sm focus-within:ring-2 focus-within:ring-[#FBBF24] md:mt-6"
                        onSubmit={(event) => {
                            event.preventDefault()
                            setIsSearchSheetOpen(true)
                        }}
                    >
                        <label htmlFor="signage-hero-search" className="sr-only">Search signage products</label>
                        <input
                            id="signage-hero-search"
                            type="search"
                            value={mobileSearchTerm}
                            onChange={(event) => setMobileSearchTerm(event.target.value)}
                            placeholder="Search products"
                            className="min-w-0 flex-1 rounded-lg bg-transparent px-3 py-2.5 text-base outline-none placeholder:text-slate-600"
                        />
                        <button
                            type="submit"
                            aria-haspopup="dialog"
                            aria-expanded={isSearchSheetOpen}
                            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#0369A1] px-3 font-heading text-sm font-bold text-white transition hover:bg-[#075985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                        >
                            <Search size={15} aria-hidden="true" /> Search
                        </button>
                    </form>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-5 md:justify-center">
                        <Link href={QUOTE_PATH} className="btn-amber min-h-11 !px-3.5 !py-2.5 !text-xs md:!px-5 md:!text-sm">
                            Request a Quote <ArrowRight size={18} className="hidden min-[360px]:block" />
                        </Link>
                        <a href="#signage-categories" className="inline-flex min-h-11 items-center gap-1.5 rounded font-heading text-sm font-bold text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                            Browse categories
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section className="border-b border-brand-line bg-white px-4 py-3 md:py-4">
                <div
                    className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto md:justify-center md:gap-10 md:overflow-visible"
                    tabIndex={0}
                    aria-label="Signage service highlights"
                >
                    {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                        <span key={label} className="flex shrink-0 items-center gap-2 rounded-full bg-[#FAF8F4] px-3.5 py-2 text-xs font-semibold text-[#1C1917] md:bg-transparent md:px-0 md:text-sm">
                            <Icon size={15} className="text-[#0369A1]" />
                            {label}
                        </span>
                    ))}
                </div>
            </section>

            {/* BROWSE AREA */}
            <section data-pnp-reveal-skip className="px-4 pb-16 pt-8 md:px-6 md:py-16">
                <div className="mx-auto max-w-7xl">

                    {availableProjects.length > 0 && (
                        <section aria-labelledby="signage-project-heading" className="mb-6 md:mb-9">
                            <h2 id="signage-project-heading" className="mb-3 text-[#1C1917]">Shop by Project</h2>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                                {availableProjects.map(({ label, icon: Icon }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        aria-expanded={activeProject === label}
                                        aria-controls="signage-project-categories"
                                        onClick={() => setActiveProject(activeProject === label ? null : label)}
                                        className="flex min-h-11 items-center gap-2 rounded-xl border border-brand-line bg-white px-2.5 py-2 text-left font-heading text-xs font-bold leading-snug text-[#1C1917] transition hover:border-brand-edge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] aria-expanded:border-[#0369A1] aria-expanded:bg-[#E0F2FE] md:px-4 md:text-sm"
                                    >
                                        <Icon size={16} className="shrink-0 text-[#0369A1]" aria-hidden="true" />
                                        <span className="flex-1">{label}</span>
                                        <ChevronDown size={14} className={activeProject === label ? 'shrink-0 rotate-180' : 'shrink-0'} aria-hidden="true" />
                                    </button>
                                ))}
                            </div>
                            <div id="signage-project-categories" hidden={!selectedProject} className="mt-2 rounded-xl border border-brand-line bg-white px-3 py-2 md:px-4">
                                {selectedProject && (
                                    <ul aria-label={selectedProject.label} className="flex flex-wrap gap-x-5 gap-y-1">
                                        {selectedProject.categories.map((category) => (
                                            <li key={category.slug}>
                                                <Link href={`/signage/${category.slug}`} className="inline-flex min-h-10 items-center gap-1 font-heading text-sm font-bold text-[#0369A1] underline-offset-4 hover:underline">
                                                    {category.name} <ArrowRight size={14} aria-hidden="true" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    )}

                    {/* CATEGORY GRID */}
                    <div className="mobile-reveal" style={{ '--reveal-delay': '120ms' }}>
                                <div id="signage-categories" className="mb-6 scroll-mt-28 md:mb-8 md:scroll-mt-20">
                                    <h2 className="text-[#1C1917]">Shop by Category</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
                                    {categoryTiles.map((category, index) => (
                                        <Link
                                            key={category.slug}
                                            href={`/signage/${category.slug}`}
                                            className="group flex flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-edge hover:shadow-card-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA5E9]/30"
                                        >
                                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white p-3">
                                                {category.coverImage ? (
                                                    <Image
                                                        src={category.coverImage}
                                                        alt={category.coverAlt}
                                                        fill
                                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                                                        className="object-contain object-center transition duration-300 group-hover:scale-105"
                                                        loading={index < 4 ? 'eager' : 'lazy'}
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-[#0369A1]">
                                                        <Box size={28} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-1 flex-col border-t border-brand-divider p-3.5 md:p-5">
                                                <h3 className="font-heading text-sm font-extrabold leading-snug text-[#1C1917] transition group-hover:text-[#0369A1] md:text-lg">
                                                    {category.name}
                                                </h3>
                                                <p className="mt-1 hidden text-sm leading-relaxed text-brand-muted line-clamp-2 md:block">
                                                    {category.tagline}
                                                </p>
                                                <div className="mt-auto flex items-center justify-between pt-3">
                                                    <span className="text-xs font-semibold text-brand-subtle md:text-sm">
                                                        {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 font-heading text-xs font-bold uppercase tracking-wide text-[#0369A1] transition group-hover:gap-2 group-hover:text-[#F59E0B]">
                                                        Shop <ArrowRight size={14} />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Common projects paired with products from the catalog. */}
                            {featuredProducts.length > 0 && (
                                <div className="mobile-reveal mt-14 md:mt-20" style={{ '--reveal-delay': '160ms' }}>
                                    <div className="mb-6 md:mb-8">
                                        <h2 className="text-[#1C1917]">Common Starting Points</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                                        {featuredProducts.map((product) => (
                                            <ProductCard key={`featured-${product.categorySlug}-${product.slug}`} product={product} />
                                        ))}
                                    </div>
                                </div>
                            )}
                </div>
            </section>

            {/* EXTENDED CATALOG */}
            <section className="bg-white px-6 py-16 md:py-20">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-amber-200 bg-[#FFFBEB] p-8 shadow-card md:p-10">
                    <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                        <div>
                            <p className="section-label text-[#0369A1]">More Options</p>
                            <h2 className="mt-4 text-[#1C1917]">Need More Sign Options?</h2>
                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                                We offer more signs, banners, displays, stands, flags, table covers, and event products than we can list here. Browse our extended catalog, then send us the product name or screenshot and we&rsquo;ll prepare a quote.
                            </p>
                        </div>
                        <a
                            href={EXTENDED_CATALOG_URL}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            onClick={() => trackExtendedCatalogClick('signage_page')}
                            className="btn-amber justify-center whitespace-nowrap"
                        >
                            Explore More Options <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            {/* SOCIAL PROOF */}
            <ReviewsBand
                heading="Trusted for Signs, Banners & Print"
                reviews={reviews}
                chips={SIGNAGE_REVIEW_CHIPS}
            />

            {/* BOTTOM CTA */}
            <section className="bg-[#0C1E3C] px-6 py-16 text-center text-white">
                <div>
                    <h2 style={{ color: 'white', marginBottom: '1.25rem' }}>
                        Ready to make your business more visible?
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                        Send us what you need, and we&rsquo;ll help you choose the right material, size, finish, and installation option.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={QUOTE_PATH} className="btn-amber">
                            Get a Free Quote <ArrowRight size={18} />
                        </Link>
                        <Link href={VISIBILITY_PATH} className="btn-ghost">
                            Free Visibility Check <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* MOBILE FLOATING SEARCH BUTTON */}
            <button
                type="button"
                aria-label="Search Signage"
                aria-controls="mobile-product-search"
                aria-expanded={isSearchSheetOpen}
                onClick={() => setIsSearchSheetOpen(true)}
                tabIndex={isFloatingSearchVisible ? 0 : -1}
                className={`fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#FBBF24] bg-[#F59E0B] text-[#1C1917] shadow-[0_16px_38px_rgba(28,25,23,0.28)] transition-[opacity,transform,background-color] duration-200 hover:bg-[#FBBF24] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35 ${isFloatingSearchVisible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
            >
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0))]" />
                <span className="relative flex items-center justify-center">
                    <Search size={24} strokeWidth={2.7} />
                </span>
            </button>

            {/* SEARCH SHEET — bottom sheet on mobile, centered modal on desktop; results navigate straight to the product page */}
            {isSearchSheetOpen && (
                <div className="fixed inset-0 z-50 md:flex md:items-start md:justify-center md:p-6 md:pt-24">
                    <button
                        type="button"
                        aria-hidden="true"
                        tabIndex={-1}
                        className="absolute inset-0 bg-[#1C1917]/38 backdrop-blur-[2px]"
                        onClick={() => setIsSearchSheetOpen(false)}
                    />
                    <section
                        id="mobile-product-search"
                        ref={searchDialogRef}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mobile-product-search-title"
                        className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col overflow-hidden rounded-t-[1.75rem] border border-white/70 bg-[#FAF8F4]/95 shadow-[0_-20px_70px_rgba(28,25,23,0.26)] backdrop-blur-2xl md:relative md:inset-auto md:max-h-[80dvh] md:w-full md:max-w-2xl md:rounded-[1.75rem] md:shadow-[0_30px_80px_rgba(28,25,23,0.30)]"
                    >
                        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-300 md:hidden" />
                        <div className="flex items-center justify-between px-5 pb-4 pt-5">
                            <h2 id="mobile-product-search-title" className="text-xl text-[#1C1917]">
                                Search Signage
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsSearchSheetOpen(false)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-[#1C1917] shadow-sm transition hover:border-[#F59E0B] focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/20"
                                aria-label="Close search products"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="px-5 pb-4">
                            <label htmlFor="signage-search-query" className="sr-only">Search the signage catalog</label>
                            <div className="relative">
                                <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0369A1]" />
                                <input
                                    ref={mobileSearchInputRef}
                                    id="signage-search-query"
                                    type="search"
                                    value={mobileSearchTerm}
                                    onChange={(event) => setMobileSearchTerm(event.target.value)}
                                    placeholder="Search banners, stands, tents, flags..."
                                    className="w-full rounded-2xl border border-slate-200 bg-white/90 py-4 pl-12 pr-4 text-base text-[#1C1917] shadow-inner outline-none transition placeholder:text-slate-400 focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/15"
                                />
                            </div>
                        </div>

                        <div className="min-h-0 overflow-y-auto px-5 pb-6">
                            <p role="status" aria-live="polite" className="mb-3 text-sm font-semibold text-brand-muted">
                                {hasSearchTerm
                                    ? (closeMatches ? `Showing ${searchResults.length} close matches` : `${searchResults.length} ${searchResults.length === 1 ? 'product' : 'products'} found`)
                                    : 'Try a search or browse these starting points'}
                            </p>
                            {(!hasSearchTerm || !searchResults.length) && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {SEARCH_SUGGESTIONS.map((suggestion) => (
                                        <button key={suggestion} type="button" className="min-h-10 rounded-full border border-brand-line bg-white px-3 text-sm font-semibold text-[#0369A1] hover:border-brand-edge"
                                            onClick={() => { setMobileSearchTerm(suggestion); mobileSearchInputRef.current?.focus() }}>
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {resultCategories.length > 0 && (
                                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                                    <span className="font-semibold text-brand-muted">Categories</span>
                                    {resultCategories.map(([slug, name]) => (
                                        <Link key={slug} href={`/signage/${slug}`} onClick={closeSearch} className="font-semibold text-[#0369A1] underline underline-offset-2">{name}</Link>
                                    ))}
                                </div>
                            )}
                            {shownProducts.length > 0 ? (
                                <div className="grid gap-3">
                                    {shownProducts.map((product) => (
                                        <Link
                                            key={`mobile-search-${product.categorySlug}-${product.slug}`}
                                            href={productHref(product)}
                                            prefetch={false}
                                            onClick={closeSearch}
                                            className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white/86 p-3 text-left shadow-sm transition hover:border-[#F59E0B]/70 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/15"
                                        >
                                            <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#E0F2FE] text-[#0369A1]">
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt=""
                                                        fill
                                                        sizes="56px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <span className="flex h-full w-full items-center justify-center">
                                                        <Box size={20} />
                                                    </span>
                                                )}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block font-heading text-base font-bold leading-tight text-[#1C1917]">
                                                    {product.name}
                                                </span>
                                                <span className="mt-1 block text-sm text-slate-500">
                                                    {product.categoryName}
                                                </span>
                                            </span>
                                            <span className="shrink-0 font-heading text-xs font-bold text-[#0369A1]">
                                                {product.isLive && formatPrice(product.lowestPrice) ? `From ${formatPrice(product.lowestPrice)}` : 'View Custom Sizes'}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-5 text-center">
                                    <p className="font-heading font-bold text-[#1C1917]">No matching products found.</p>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        Try one of the suggestions or tell us what you need.
                                    </p>
                                    <Link href={QUOTE_PATH} onClick={closeSearch} className="mt-3 inline-flex min-h-11 items-center font-bold text-[#0369A1] underline underline-offset-4">
                                        Request help with this sign
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}

        </div>
    )
}
