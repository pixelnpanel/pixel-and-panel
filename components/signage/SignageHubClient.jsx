'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Search, Box, X } from 'lucide-react'
import { SIGNAGE_PRODUCT_SLUGS } from '@/lib/signage-products'
import { trackExtendedCatalogClick } from '@/lib/analytics'
import { EXTENDED_CATALOG_URL } from '@/lib/sign-catalog'

const ALL_PRODUCTS_SLUG = 'all-products'

const DEFAULT_COPY = {
    eyebrow: 'Signage & Print',
    h1Start: 'Custom Commercial Signs, Banners',
    h1Highlight: 'and Printing Solutions',
    mobileH1Start: 'Custom Signs, Banners',
    mobileH1Highlight: '& Print Shop.',
    mobileHeroCopy: 'Custom banners, storefront signs, work truck graphics, business cards, and print materials for Southeast Texas businesses.',
    heroCopy: 'Boost your real-world visibility with custom banners in Beaumont, storefront signs in Port Arthur, yard signs, vehicle graphics, business cards, and commercial print materials.',
    quoteCta: 'Request a Quote',
    viewProducts: 'View Products',
    categoriesHeading: 'Categories',
    productsLabel: 'products',
    allProducts: 'All Products',
    selectedCategory: 'Selected Category',
    allHeading: 'All Signage & Print Products',
    productsAvailable: 'products available',
    mobileCategoryHeading: 'Choose a category',
    mobileCategoryHelp: 'Swipe sideways, then scroll down for products.',
    findProduct: 'Find a product',
    searchPlaceholder: 'Search signs, banners, decals, cards...',
    searchAria: 'Search signage products',
    searchResultsFor: 'Search results for',
    matchingProduct: 'matching product',
    matchingProducts: 'matching products',
    clearSearch: 'Clear Search',
    learnMore: 'Learn More',
    requestQuote: 'Request Quote',
    bestFor: 'Best for:',
    noResultsTitle: 'No matching products found.',
    noResultsCopy: 'Try searching for “banner,” “yard sign,” “vehicle,” “window,” “menu,” or “business card.”',
    requestHelp: 'Request Help Choosing',
    extendedTitle: 'Need More Sign Options?',
    extendedCopy: "We offer more signs, banners, displays, stands, flags, table covers, and event products than we can list here. Browse our extended catalog, then send us the product name or screenshot and we'll prepare a quote.",
    extendedButton: 'Explore More Options',
    helpTitle: 'Need help choosing?',
    helpCopy: "Tell us the size, quantity, logo, and deadline. We'll help you choose the right signage product for your project.",
    helpQuote: 'Get a Free Quote',
    helpVisibility: 'Check Visibility First',
    bottomTitle: 'Ready to make your business more visible?',
    bottomCopy: "Send us what you need, and we'll help you choose the right material, size, finish, and installation option.",
    bottomQuote: 'Get a Free Quote',
    bottomVisibility: 'Free Visibility Check',
    mobileSearchLabel: 'Search Signage',
    mobileSearchPlaceholder: 'Search banners, decals, menus, yard signs...',
    mobileNoResultsCopy: 'Try banner, yard sign, vehicle, window, menu, or business card.',
    quoteCategoryFallback: 'Signage',
    quoteCategoryOverride: '',
    quoteHelpProduct: 'General Signage Help',
    productAltSuffix: 'custom signage by Pixel & Panel',
    basePath: '/signage',
    quotePath: '/quote-request',
    visibilityPath: '/free-visibility-check',
    productSlugMap: SIGNAGE_PRODUCT_SLUGS,
}

const sortProductsByName = (products) => {
    return products
        .map((product, index) => ({ product, index }))
        .sort((a, b) => (
            a.product.name.localeCompare(b.product.name, undefined, { sensitivity: 'base' }) ||
            a.index - b.index
        ))
        .map(({ product }) => product)
}

const getProductKey = (product) => `${product.categorySlug || 'category'}-${product.slug || product.name}`

const getSearchableText = (product) => [
    product.name,
    product.categoryName,
    product.description,
    ...(product.searchKeywords || []),
    ...(product.tags || []),
]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

const getProductSearchScore = (product, query) => {
    if (!query) return 1

    const name = (product.name || '').toLowerCase()
    const category = (product.categoryName || '').toLowerCase()
    const categorySlug = (product.categorySlug || '').toLowerCase()
    const keywords = [...(product.searchKeywords || []), ...(product.tags || [])]
        .join(' ')
        .toLowerCase()
    const description = (product.description || '').toLowerCase()
    const queryWords = query.split(/\s+/).filter(Boolean)

    let score = 0
    if (name === query) score += 120
    if (name.startsWith(query)) score += 80
    if (name.includes(query)) score += 65
    if (category.includes(query)) score += 38
    if (keywords.includes(query)) score += 32
    if (description.includes(query)) score += 14
    if (categorySlug === 'vehicle-graphics' && queryWords.some((word) => ['car', 'cars', 'truck', 'trucks', 'van', 'vans', 'fleet', 'vehicle', 'vehicles'].includes(word))) score += 34
    if (categorySlug === 'yard-real-estate-signs' && queryWords.some((word) => ['yard', 'lawn', 'realtor', 'realty', 'estate', 'open', 'house'].includes(word))) score += 26
    if (categorySlug === 'vinyl-decals-window-graphics' && queryWords.some((word) => ['window', 'windows', 'glass', 'door', 'decal', 'decals', 'sticker', 'stickers'].includes(word))) score += 26

    return score
}

export default function SignageHubClient({ categories = [], copy = DEFAULT_COPY, initialCategorySlug = ALL_PRODUCTS_SLUG }) {
    const content = useMemo(() => ({ ...DEFAULT_COPY, ...copy }), [copy])
    const router = useRouter()
    const searchParams = useSearchParams()
    const categoryFromUrl = searchParams.get('category') || initialCategorySlug
    const productAreaRef = useRef(null)
    const productGridRef = useRef(null)
    const productCardRefs = useRef(new Map())
    const mobileSearchInputRef = useRef(null)
    const mobileCategoryCardRef = useRef(null)
    const stickyCategoryBarRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isFloatingSearchVisible, setIsFloatingSearchVisible] = useState(false)
    const [isStickyCategoryVisible, setIsStickyCategoryVisible] = useState(false)
    const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false)
    const [mobileSearchTerm, setMobileSearchTerm] = useState('')
    const [highlightedProductKey, setHighlightedProductKey] = useState('')
    const [selectedSlug, setSelectedSlug] = useState(categoryFromUrl)

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
            name: content.allProducts,
            products: allProducts,
            isAllProducts: true,
        },
        ...categories,
    ], [allProducts, categories, content.allProducts])

    const defaultCategorySlug = ALL_PRODUCTS_SLUG
    const normalizedSelectedSlug = categoryOptions.some((cat) => cat.slug === selectedSlug) ? selectedSlug : defaultCategorySlug

    const selectedCategory = useMemo(() => {
        return categoryOptions.find((cat) => cat.slug === normalizedSelectedSlug) || categoryOptions[0]
    }, [categoryOptions, normalizedSelectedSlug])

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
            return getSearchableText(product).includes(normalizedSearchTerm)
        })
    }, [normalizedSearchTerm, selectedProducts])

    const selectedHeading = selectedCategory?.isAllProducts
        ? content.allHeading
        : selectedCategory.name
    const isAllProductsSelected = Boolean(selectedCategory?.isAllProducts)

    const mobileSearchResults = useMemo(() => {
        const query = mobileSearchTerm.trim().toLowerCase()

        if (!query) return allProducts

        return allProducts
            .map((product, index) => ({
                product,
                index,
                score: getProductSearchScore(product, query),
            }))
            .filter(({ product, score }) => score > 0 || getSearchableText(product).includes(query))
            .sort((a, b) => (
                b.score - a.score ||
                a.product.name.localeCompare(b.product.name, undefined, { sensitivity: 'base' }) ||
                a.index - b.index
            ))
            .map(({ product }) => product)
    }, [allProducts, mobileSearchTerm])

    useEffect(() => {
        const updateFloatingSearchVisibility = () => {
            if (typeof window === 'undefined') return

            const isMobile = window.matchMedia('(max-width: 767px)').matches
            const productArea = productAreaRef.current
            const productGrid = productGridRef.current

            if (!isMobile || !isAllProductsSelected || isSearchSheetOpen || !productArea || !productGrid) {
                setIsFloatingSearchVisible(false)
                return
            }

            const firstCard = productGrid.querySelector('[data-product-card="true"]')
            const cardHeight = firstCard?.getBoundingClientRect().height || 360
            const scrollY = window.scrollY || window.pageYOffset
            const gridTop = productGrid.getBoundingClientRect().top + scrollY
            const productAreaBottom = productArea.getBoundingClientRect().bottom + scrollY
            const appearsAfterCards = scrollY > gridTop + cardHeight * 2.2
            const beforeFooter = scrollY + window.innerHeight < productAreaBottom - 160

            setIsFloatingSearchVisible(appearsAfterCards && beforeFooter)
        }

        updateFloatingSearchVisibility()
        window.addEventListener('scroll', updateFloatingSearchVisibility, { passive: true })
        window.addEventListener('resize', updateFloatingSearchVisibility)

        return () => {
            window.removeEventListener('scroll', updateFloatingSearchVisibility)
            window.removeEventListener('resize', updateFloatingSearchVisibility)
        }
    }, [isAllProductsSelected, isSearchSheetOpen, selectedSlug])

    useEffect(() => {
        const updateStickyCategoryVisibility = () => {
            if (typeof window === 'undefined') return

            const isMobile = window.matchMedia('(max-width: 767px)').matches
            const card = mobileCategoryCardRef.current

            if (!isMobile || isSearchSheetOpen || !card) {
                setIsStickyCategoryVisible(false)
                return
            }

            // Show once the top category card has scrolled up under the header.
            const cardBottom = card.getBoundingClientRect().bottom
            setIsStickyCategoryVisible(cardBottom < 84)
        }

        updateStickyCategoryVisibility()
        window.addEventListener('scroll', updateStickyCategoryVisibility, { passive: true })
        window.addEventListener('resize', updateStickyCategoryVisibility)

        return () => {
            window.removeEventListener('scroll', updateStickyCategoryVisibility)
            window.removeEventListener('resize', updateStickyCategoryVisibility)
        }
    }, [isSearchSheetOpen])

    useEffect(() => {
        if (!isStickyCategoryVisible) return

        const bar = stickyCategoryBarRef.current
        const activeChip = bar?.querySelector('[data-active-chip="true"]')
        activeChip?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }, [isStickyCategoryVisible, selectedCategory.slug])

    useEffect(() => {
        if (!isSearchSheetOpen) return undefined

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const focusTimer = window.setTimeout(() => mobileSearchInputRef.current?.focus(), 120)

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsSearchSheetOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.clearTimeout(focusTimer)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isSearchSheetOpen])

    useEffect(() => {
        if (!highlightedProductKey) return undefined

        const highlightTimer = window.setTimeout(() => setHighlightedProductKey(''), 1800)

        return () => window.clearTimeout(highlightTimer)
    }, [highlightedProductKey])

    const handleCategoryClick = (slug) => {
        const params = new URLSearchParams()
        params.set('category', slug)
        setSelectedSlug(slug)
        router.push(`${content.basePath}?${params.toString()}`, { scroll: false })
        setTimeout(() => {
            productAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
    }

    const createQuoteLink = (productName, categoryName) => {
        const params = new URLSearchParams()
        params.set('product', productName)
        params.set('category', content.quoteCategoryOverride || categoryName)
        return `${content.quotePath}?${params.toString()}`
    }

    const getProductLink = (product) => {
        const productSlug = content.productSlugMap[product.slug] || product.slug
        return productSlug ? `${content.basePath}/${productSlug}` : content.basePath
    }

    const handleFloatingSearchClick = () => {
        setIsSearchSheetOpen(true)
    }

    const handleSearchResultClick = (product) => {
        const productKey = getProductKey(product)
        setSearchTerm('')
        setIsSearchSheetOpen(false)
        setMobileSearchTerm('')
        setHighlightedProductKey(productKey)

        window.setTimeout(() => {
            const targetCard = productCardRefs.current.get(productKey)
            targetCard?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 80)
    }

    return (
        <div className="min-h-screen overflow-x-clip bg-[#FAF8F4] text-[#1C1917]">

            {/* HERO */}
            <section className="pnp-mobile-hero-compact relative overflow-hidden bg-gradient-to-br from-[#061B35] via-[#0369A1] to-[#0EA5E9] px-6 pb-8 pt-24 text-white md:py-28">
                <div className="absolute inset-0 opacity-40">
                    <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)', backgroundSize: '34px 34px' }} />
                </div>

                <div data-pnp-reveal-target className="mobile-reveal pnp-desktop-hero-reveal relative mx-auto max-w-5xl text-center">
                    <p className="section-label mb-4" style={{ color: '#F59E0B' }}>
                        {content.eyebrow}
                    </p>
                    <h1 className="pnp-mobile-hero-title mx-auto break-words md:max-w-[980px] md:text-[clamp(2rem,3.5vw,3rem)] md:leading-tight" style={{ color: 'white' }}>
                        <span className="md:hidden">
                            {content.mobileH1Start}{' '}
                            <br />
                            <span style={{ color: '#F59E0B' }}>{content.mobileH1Highlight}</span>
                        </span>
                        <span className="hidden md:inline">
                            {content.h1Start}{' '}
                            <span style={{ color: '#F59E0B' }}>{content.h1Highlight}</span>
                        </span>
                    </h1>
                    <p className="pnp-mobile-hero-copy mx-auto mt-6 break-words md:hidden">
                        {content.mobileHeroCopy}
                    </p>
                    <p className="mx-auto mt-7 hidden max-w-3xl break-words leading-relaxed text-white/75 md:block md:text-xl">
                        {content.heroCopy}
                    </p>
                    <div className="mt-10 hidden flex-col items-center justify-center gap-4 md:flex md:flex-row">
                        <Link href={content.quotePath} className="btn-amber">
                            {content.quoteCta} <ArrowRight size={18} />
                        </Link>
                        <button onClick={() => productAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="btn-ghost">
                            {content.viewProducts} <Search size={17} />
                        </button>
                    </div>
                </div>
            </section>

            {/* PRODUCT BROWSER */}
            <section ref={productAreaRef} data-pnp-reveal-skip className="px-6 pb-16 pt-6 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">

                    {/* LEFT: CATEGORY SIDEBAR */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                                    <Search size={20} className="text-[#0369A1]" />
                                    <h2 className="text-xl" style={{ color: '#1C1917' }}>{content.categoriesHeading}</h2>
                                </div>
                                <div>
                                    {categoryOptions.map((category) => {
                                        const isActive = category.slug === selectedCategory.slug
                                        return (
                                            <button key={category.slug} type="button" onClick={() => handleCategoryClick(category.slug)}
                                                className={`group flex w-full items-center justify-between border-b border-slate-100 px-5 py-3.5 text-left transition ${isActive ? 'bg-[#0369A1] text-white' : 'bg-white text-[#1C1917] hover:bg-slate-50'}`}
                                            >
                                                <span>
                                                    <span className="block font-heading text-sm font-bold leading-tight">{category.name}</span>
                                                    <span className={`mt-1 block text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                                                        {category.products?.length || 0} {content.productsLabel}
                                                    </span>
                                                </span>
                                                <ArrowRight size={16} className={isActive ? 'text-[#F59E0B]' : 'text-slate-400'} />
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </aside>

                    {/* RIGHT: PRODUCT AREA */}
                    <div className="min-w-0">
                        {/* MOBILE CATEGORY CHIPS */}
                        <section ref={mobileCategoryCardRef} className="mobile-reveal mb-6 lg:hidden" style={{ "--reveal-delay": "120ms" }} aria-labelledby="mobile-category-heading">
                            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <Search size={20} className="shrink-0 text-[#0369A1]" />
                                    <div>
                                        <h2 id="mobile-category-heading" className="text-xl text-[#1C1917]">
                                            {content.mobileCategoryHeading}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {content.mobileCategoryHelp}
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
                                                    className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition ${isActive
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
                        <div
                            key={selectedCategory.slug}
                            className="mobile-reveal relative mb-8 hidden overflow-hidden rounded-2xl bg-gradient-to-br from-[#0369A1] via-[#075985] to-[#0C1E3C] p-7 text-white shadow-sm md:block md:p-9"
                            style={{ "--reveal-delay": "160ms" }}
                        >
                            <div className="absolute right-8 top-6 h-24 w-24 rounded-3xl border border-white/10 opacity-40 rotate-12" />
                            <div className="absolute right-20 top-20 h-16 w-16 rounded-full border border-white/10 opacity-30" />
                            <p className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>{content.selectedCategory}</p>
                            <h2 className="mobile-fit-heading md:max-w-none" style={{ color: 'white' }}>{selectedHeading}</h2>
                            <p className="mt-4 text-white/75">{selectedProducts.length} {content.productsAvailable}</p>
                        </div>

                        {/* SEARCH */}
                        <div className="mobile-reveal mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5" style={{ "--reveal-delay": "190ms" }}>
                            <label htmlFor="signage-product-search" className="mb-2 block font-heading text-sm font-bold uppercase tracking-wide text-[#0369A1]">
                                {content.findProduct}
                            </label>
                            <div className="relative">
                                <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0369A1]" />
                                <input
                                    id="signage-product-search"
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder={content.searchPlaceholder}
                                    aria-label={content.searchAria}
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
                                        {content.searchResultsFor} <span className="font-bold text-[#1C1917]">&ldquo;{searchTerm.trim()}&rdquo;</span>
                                        {' '}<span className="font-bold text-[#0369A1]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? content.matchingProduct : content.matchingProducts}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm('')}
                                        className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-[#0369A1] transition hover:border-[#F59E0B] hover:text-[#1C1917] sm:self-auto"
                                    >
                                        {content.clearSearch} <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* PRODUCT GRID — cards animate in when category changes */}
                        {filteredProducts.length > 0 ? (
                            <div
                                ref={productGridRef}
                                key={selectedCategory.slug + '-grid-' + normalizedSearchTerm}
                                className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                            >
                                {filteredProducts.map((product) => {
                                    const productKey = getProductKey(product)
                                    const isHighlighted = highlightedProductKey === productKey

                                    return (
                                        <article
                                            key={productKey}
                                            ref={(node) => {
                                                if (node) {
                                                    productCardRefs.current.set(productKey, node)
                                                } else {
                                                    productCardRefs.current.delete(productKey)
                                                }
                                            }}
                                            data-product-card="true"
                                            className={`group scroll-mt-24 overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${isHighlighted
                                                ? 'border-[#F59E0B] shadow-[0_0_0_4px_rgba(245,158,11,0.22),0_18px_44px_rgba(245,158,11,0.2)]'
                                                : 'border-slate-200'
                                                }`}
                                        >
                                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.alt || `${product.name} — ${content.productAltSuffix}`}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) calc(50vw - 200px), 300px"
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
                                                            <span className="font-bold text-[#1C1917]">{content.bestFor}</span>{' '}{product.bestFor}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="mt-6 flex flex-wrap gap-4">
                                                    <Link href={getProductLink(product)} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-[#0369A1] transition hover:text-[#F59E0B]">
                                                        {content.learnMore} <ArrowRight size={15} />
                                                    </Link>
                                                    <Link href={createQuoteLink(product.name, product.categoryName || selectedCategory.name)} className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-[#F59E0B] transition hover:text-[#0369A1]">
                                                        {content.requestQuote} <ArrowRight size={15} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                                <h3 style={{ color: '#1C1917', marginBottom: '0.75rem' }}>{content.noResultsTitle}</h3>
                                <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
                                    {content.noResultsCopy}
                                </p>
                                <Link href={createQuoteLink(content.quoteHelpProduct, content.quoteCategoryFallback)} className="btn-amber mt-6 inline-flex">
                                    {content.requestHelp} <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            {/* EXTENDED CATALOG */}
            <section className="bg-white px-6 pb-16 md:pb-24">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-[#FAF8F4] p-8 shadow-sm md:p-10">
                    <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                        <div>
                            <p className="section-label text-[#0369A1]">More Options</p>
                            <h2 className="mt-4 text-[#1C1917]">{content.extendedTitle}</h2>
                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                                {content.extendedCopy}
                            </p>
                        </div>
                        <a
                            href={EXTENDED_CATALOG_URL}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            onClick={() => trackExtendedCatalogClick('signage_page')}
                            className="btn-amber justify-center whitespace-nowrap"
                        >
                            {content.extendedButton} <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="bg-[#0C1E3C] px-6 py-16 text-center text-white">
                <div>
                    <h2 style={{ color: 'white', marginBottom: '1.25rem' }}>
                        {content.bottomTitle}
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                        {content.bottomCopy}
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={content.quotePath} className="btn-amber">
                            {content.bottomQuote} <ArrowRight size={18} />
                        </Link>
                        <Link href={content.visibilityPath} className="btn-ghost">
                            {content.bottomVisibility} <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* MOBILE STICKY CATEGORY BAR — slides in after scrolling past the top category card */}
            <div
                ref={stickyCategoryBarRef}
                aria-hidden={!isStickyCategoryVisible}
                className={`fixed inset-x-0 top-[84px] z-40 border-b border-slate-200 bg-white/95 shadow-[0_8px_24px_rgba(28,25,23,0.12)] backdrop-blur-md transition-[opacity,transform] duration-200 md:hidden ${isStickyCategoryVisible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
                    }`}
            >
                <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5">
                    <Search size={16} className="shrink-0 text-[#0369A1]" />
                    {categoryOptions.map((category) => {
                        const isActive = category.slug === selectedCategory.slug
                        return (
                            <button
                                key={`sticky-${category.slug}`}
                                type="button"
                                data-active-chip={isActive ? 'true' : undefined}
                                onClick={() => handleCategoryClick(category.slug)}
                                aria-pressed={isActive}
                                tabIndex={isStickyCategoryVisible ? 0 : -1}
                                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-bold transition ${isActive
                                    ? 'border-[#0369A1] bg-[#0369A1] text-white shadow-sm'
                                    : 'border-slate-200 bg-[#FAF8F4] text-[#1C1917] hover:border-[#F59E0B]'
                                    }`}
                            >
                                {category.name}
                            </button>
                        )
                    })}
                </div>
            </div>

            <button
                type="button"
                aria-label={content.mobileSearchLabel}
                aria-controls="mobile-product-search"
                aria-expanded={isSearchSheetOpen}
                onClick={handleFloatingSearchClick}
                tabIndex={isFloatingSearchVisible ? 0 : -1}
                className={`fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#FBBF24] bg-[#F59E0B] text-[#1C1917] shadow-[0_16px_38px_rgba(28,25,23,0.28)] transition-[opacity,transform,background-color] duration-200 hover:bg-[#FBBF24] focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35 md:hidden ${isFloatingSearchVisible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
            >
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0))]" />
                <span className="relative flex items-center justify-center">
                    <Search size={24} strokeWidth={2.7} />
                </span>
            </button>

            {isSearchSheetOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <button
                        type="button"
                        aria-label="Close product search"
                        className="absolute inset-0 bg-[#1C1917]/38 backdrop-blur-[2px]"
                        onClick={() => setIsSearchSheetOpen(false)}
                    />
                    <section
                        id="mobile-product-search"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mobile-product-search-title"
                        className="absolute inset-x-0 bottom-0 max-h-[82vh] overflow-hidden rounded-t-[1.75rem] border border-white/70 bg-[#FAF8F4]/95 shadow-[0_-20px_70px_rgba(28,25,23,0.26)] backdrop-blur-2xl"
                    >
                        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-300" />
                        <div className="flex items-center justify-between px-5 pb-4 pt-5">
                            <h2 id="mobile-product-search-title" className="text-xl text-[#1C1917]">
                                {content.mobileSearchLabel}
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
                            <div className="relative">
                                <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0369A1]" />
                                <input
                                    ref={mobileSearchInputRef}
                                    type="search"
                                    value={mobileSearchTerm}
                                    onChange={(event) => setMobileSearchTerm(event.target.value)}
                                    placeholder={content.mobileSearchPlaceholder}
                                    className="w-full rounded-2xl border border-slate-200 bg-white/90 py-4 pl-12 pr-4 text-base text-[#1C1917] shadow-inner outline-none transition placeholder:text-slate-400 focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/15"
                                />
                            </div>
                        </div>

                        <div className="max-h-[54vh] overflow-y-auto px-5 pb-6">
                            {mobileSearchResults.length > 0 ? (
                                <div className="grid gap-3">
                                    {mobileSearchResults.map((product) => (
                                        <button
                                            key={`mobile-search-${getProductKey(product)}`}
                                            type="button"
                                            onClick={() => handleSearchResultClick(product)}
                                            className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white/86 p-3 text-left shadow-sm transition hover:border-[#F59E0B]/70 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#0EA5E9]/15"
                                        >
                                            <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#E0F2FE] text-[#0369A1]">
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.imageAlt || product.name}
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
                                            <span className="min-w-0">
                                                <span className="block font-heading text-base font-bold leading-tight text-[#1C1917]">
                                                    {product.name}
                                                </span>
                                                <span className="mt-1 block text-sm text-slate-500">
                                                    {product.categoryName}
                                                </span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-5 text-center">
                                    <p className="font-heading font-bold text-[#1C1917]">{content.noResultsTitle}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        {content.mobileNoResultsCopy}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}

        </div>
    )
}
