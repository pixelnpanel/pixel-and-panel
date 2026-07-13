// components/signage/SignageProductDetail.jsx — server component
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Box, Check, ChevronDown, Info } from 'lucide-react'
import SignagePriceCalculator from '@/components/signage/SignagePriceCalculator'
import { formatPrice } from '@/lib/signage/data'

// City pages that already exist on the site (used in the trust block).
const CITY_LINKS = [
    { name: 'Beaumont', href: '/service-area/beaumont-tx' },
    { name: 'Port Arthur', href: '/service-area/port-arthur-tx' },
    { name: 'Nederland', href: '/service-area/nederland-tx' },
]

const TRUST_POINTS = ['Local design help', 'Fast turnaround', 'A real person answers']

// Pole-mounted flags priced as a complete kit (printed flag + pole hardware).
// The calculator shows a clarifier so buyers know the price isn't flag-only.
// Econo is handled separately: its toggle sells "Flag Only" vs "Flag+Pole".
const POLE_KIT_SLUGS = new Set([
    'feather-angled-flag', 'teardrop-flag', 'feather-convex-flag', 'rectangle-flag',
])
const ECONO_SLUG = 'econo-feather-flag'

/** Capitalize the first character of each word (keeps units like "13oz" intact). */
function toTitleCase(str) {
    return String(str || '').replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
}

export default function SignageProductDetail({ product, category }) {
    const content = product.content || null
    const fromPrice = product.isLive ? formatPrice(product.lowestPrice) : null

    // Single H1 on the page: prefer the written H1, fall back to the product name.
    // Title-cased so every word starts with a capital (e.g. "Custom 13oz Vinyl Banners").
    const heading = toTitleCase(content?.h1 || product.name)
    const intro = content?.intro || product.description
    const imageAlt = content?.imageAlt || product.alt

    const quoteHref = `/quote-request?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category.name)}`

    // Flag-specific pricing calculator config.
    const isFlags = category.slug === 'flags'
    const isEcono = isFlags && product.slug === ECONO_SLUG
    const isPoleKit = isFlags && POLE_KIT_SLUGS.has(product.slug)

    const calcProps = isEcono
        ? {
            showCustomSize: false,
            sideLabels: { single: 'Flag Only', double: 'Flag+Pole' },
            sidesHeading: 'Option',
            priceNote: (
                <>
                    Single-sided print. The <strong className="font-semibold text-[#1C1917]">Flag+Pole</strong> option
                    includes the pole and a ground-stake base.
                </>
            ),
        }
        : isPoleKit
            ? {
                priceNote: (
                    <>
                        Price is for the <strong className="font-semibold text-[#1C1917]">complete kit — printed flag plus pole hardware</strong>.
                        Already have a pole and base? Flag-only replacements available — request a quote.
                    </>
                ),
            }
            : {}

    const highlights = content?.highlights || []
    const perfectFor = content?.perfectFor || []
    const specGroups = content?.specGroups || []
    const faqs = content?.faqs || []

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
                        <Link href={`/signage/${category.slug}`} className="transition hover:text-[#0369A1]">{category.name}</Link>
                        <span>/</span>
                        <span className="font-semibold text-[#1C1917]">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* MAIN — grid children in DOM order: image, title, calculator, body.
                Mobile stacks them as image → title → calculator → description.
                Desktop keeps image + title + body in the left column, with the
                calculator holding the right column and staying sticky (spanning
                all rows) until the grid ends, right before "Common questions". */}
            <section className="px-6 py-10 md:py-16">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_460px] lg:items-start lg:gap-10">

                    {/* IMAGE — full image on cream, never cropped */}
                    <div className="lg:col-start-1 lg:row-start-1">
                        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-brand-line bg-[#FAF8F4] p-2 shadow-card">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={imageAlt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-contain object-center"
                                    priority
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-[#0369A1]">
                                    <Box size={48} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TITLE — price chip + H1 + from-price (sits above the calculator on mobile) */}
                    <div className="lg:col-start-1 lg:row-start-2">
                        {/* Price chip — optional */}
                        {content?.priceChip && (
                            <p className="inline-flex items-center rounded-full bg-[#E0F2FE] px-4 py-1.5 font-heading text-sm font-bold text-[#0369A1]">
                                {content.priceChip}
                            </p>
                        )}

                        <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-[#1C1917] md:text-5xl">
                            {heading}
                        </h1>

                        {fromPrice && (
                            <p className="mt-3 text-lg text-brand-muted">
                                From <span className="font-heading font-extrabold text-[#0369A1]">{fromPrice}</span>
                            </p>
                        )}
                    </div>

                    {/* CALCULATOR — right column, sticky until the grid ends */}
                    <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:sticky lg:top-24 lg:self-start">
                        <SignagePriceCalculator
                            productName={product.name}
                            categoryName={category.name}
                            sizes={product.sizes}
                            availableSides={product.availableSides}
                            isLive={product.isLive}
                            {...calcProps}
                        />
                    </div>

                    {/* BODY — description + highlights + perfect-for + specs */}
                    <div className="lg:col-start-1 lg:row-start-3">
                        <p className="max-w-2xl text-lg leading-relaxed text-brand-muted">
                            {intro}
                        </p>

                        {product.notes && (
                            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-[#FFFBEB] p-5">
                                <Info size={18} className="mt-0.5 shrink-0 text-[#0369A1]" />
                                <p className="text-sm leading-relaxed text-slate-600">{product.notes}</p>
                            </div>
                        )}

                        <div className="mt-8">
                            <Link
                                href={`/signage/${category.slug}`}
                                className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-[#0369A1] transition hover:text-[#F59E0B]"
                            >
                                <ArrowLeft size={15} /> All {category.name}
                            </Link>
                        </div>

                        {/* WHY PEOPLE PICK THIS — Highlights */}
                        {highlights.length > 0 && (
                            <div className="mt-12">
                                <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">
                                    Why people pick this
                                </h2>
                                <ul className="mt-6 space-y-3">
                                    {highlights.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E0F2FE] text-[#0369A1]">
                                                <Check size={14} strokeWidth={3} />
                                            </span>
                                            <span className="text-base leading-relaxed text-brand-strong">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* PERFECT FOR — tags */}
                        {perfectFor.length > 0 && (
                            <div className="mt-12">
                                <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">
                                    Perfect for
                                </h2>
                                <div className="mt-6 flex flex-wrap gap-2.5">
                                    {perfectFor.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center rounded-full border border-brand-edge bg-brand-tint px-4 py-2 text-sm font-semibold text-[#0369A1]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SPECS — collapsible accordion; first two open by default */}
                        {specGroups.length > 0 && (
                            <div className="mt-12">
                                <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">Specs</h2>
                                <div className="mt-6 grid gap-3">
                                    {specGroups.map((group, i) => (
                                        <details
                                            key={group.title}
                                            open={i < 2}
                                            className="group rounded-2xl border border-brand-line bg-white shadow-card transition-colors open:border-brand-edge"
                                        >
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading text-base font-bold text-[#1C1917] transition-colors group-open:text-[#0369A1] [&::-webkit-details-marker]:hidden">
                                                {group.title}
                                                <ChevronDown
                                                    size={18}
                                                    className="shrink-0 text-[#0369A1] transition-transform duration-200 group-open:rotate-180"
                                                />
                                            </summary>
                                            <ul className="space-y-2 border-t border-brand-divider px-5 py-4">
                                                {group.items.map((item) => (
                                                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brand-strong">
                                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0EA5E9]" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* COMMON QUESTIONS — FAQ pairs */}
            {faqs.length > 0 && (
                <section className="bg-white px-6 py-12 md:py-16">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">
                            Common questions
                        </h2>
                        <div className="mt-8 grid gap-4">
                            {faqs.map((faq) => (
                                <article key={faq.question} className="rounded-xl border border-brand-line bg-[#FAF8F4] p-5 shadow-card">
                                    <h3 className="mb-2 font-heading text-lg font-bold text-[#1C1917]">{faq.question}</h3>
                                    <p className="leading-7 text-brand-muted">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* TRUST BLOCK — constants, same on every product page */}
            <section className="px-6 py-12 md:py-16">
                <div className="mx-auto max-w-4xl rounded-2xl border border-brand-line bg-white p-7 shadow-card md:p-10">
                    <p className="section-label text-[#0369A1]">Why Pixel &amp; Panel</p>
                    <p className="mt-4 text-lg leading-relaxed text-brand-muted">
                        Local design help and fast turnaround — proudly serving{' '}
                        <Link href={CITY_LINKS[0].href} className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">{CITY_LINKS[0].name}</Link>,{' '}
                        <Link href={CITY_LINKS[1].href} className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">{CITY_LINKS[1].name}</Link>,{' '}
                        <Link href={CITY_LINKS[2].href} className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">{CITY_LINKS[2].name}</Link>,
                        {' '}and businesses nationwide. We handle the artwork and the print, so your banner shows up right the first time.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-heading text-sm font-bold text-[#1C1917]">
                        {TRUST_POINTS.map((point, i) => (
                            <span key={point} className="inline-flex items-center gap-3">
                                {i > 0 && <span className="text-[#0EA5E9]">·</span>}
                                {point}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-[#0C1E3C] px-6 py-16 text-center text-white">
                <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
                    Ready to order your {product.name}?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                    Send your size, quantity, and artwork — we’ll confirm the exact price, tax, and turnaround for {product.name} in {category.name.toLowerCase()}.
                </p>
                <div className="mt-8">
                    <Link href={quoteHref} className="btn-amber">
                        Get my free quote <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    )
}
