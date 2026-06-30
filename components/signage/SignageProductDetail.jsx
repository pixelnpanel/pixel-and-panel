// components/signage/SignageProductDetail.jsx — server component
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Box, Check, ChevronDown, Info, MessageCircle } from 'lucide-react'
import SignagePriceCalculator from '@/components/signage/SignagePriceCalculator'
import { formatPrice } from '@/lib/signage/data'

const WHATSAPP_HREF = 'https://wa.me/14092252012'

// City pages that already exist on the site (used in the trust block).
const CITY_LINKS = [
    { name: 'Beaumont', href: '/service-area/beaumont-tx' },
    { name: 'Port Arthur', href: '/service-area/port-arthur-tx' },
    { name: 'Nederland', href: '/service-area/nederland-tx' },
]

const TRUST_POINTS = ['Local design help', 'Fast turnaround', 'A real person answers']

export default function SignageProductDetail({ product, category }) {
    const content = product.content || null
    const fromPrice = product.isLive ? formatPrice(product.lowestPrice) : null

    // Single H1 on the page: prefer the written H1, fall back to the product name.
    const heading = content?.h1 || product.name
    const intro = content?.intro || product.description
    const imageAlt = content?.imageAlt || product.alt

    const quoteHref = `/quote-request?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category.name)}`

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

            {/* MAIN */}
            <section className="px-6 py-10 md:py-16">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_460px] lg:items-start">

                    {/* LEFT: IMAGE + COPY */}
                    <div>
                        {/* Hero image — full image on cream, never cropped */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#FAF8F4] p-2 shadow-sm">
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

                        <div className="mt-8">
                            <p className="section-label text-[#0369A1]">{category.name}</p>

                            {/* Price chip — optional */}
                            {content?.priceChip && (
                                <p className="mt-3 inline-flex items-center rounded-full bg-[#E0F2FE] px-4 py-1.5 font-heading text-sm font-bold text-[#0369A1]">
                                    {content.priceChip}
                                </p>
                            )}

                            <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-[#1C1917] md:text-5xl">
                                {heading}
                            </h1>

                            {fromPrice && (
                                <p className="mt-3 text-lg text-slate-600">
                                    From <span className="font-heading font-extrabold text-[#0369A1]">{fromPrice}</span>
                                </p>
                            )}

                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
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
                        </div>
                    </div>

                    {/* RIGHT: CALCULATOR (unchanged) + CTA pair */}
                    <div className="lg:sticky lg:top-24">
                        <SignagePriceCalculator
                            productName={product.name}
                            categoryName={category.name}
                            sizes={product.sizes}
                            availableSides={product.availableSides}
                            isLive={product.isLive}
                        />

                        {/* PRIMARY + SECONDARY CTA */}
                        <div className="mt-4 flex flex-col gap-3">
                            <Link href={quoteHref} className="btn-amber w-full justify-center">
                                Get my free quote <ArrowRight size={18} />
                            </Link>
                            <a
                                href={WHATSAPP_HREF}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0369A1] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-[#0369A1] transition hover:bg-[#0369A1] hover:text-white"
                            >
                                <MessageCircle size={18} /> Message us on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTIONS — only render what the sheet provides */}
            {(highlights.length > 0 || perfectFor.length > 0 || specGroups.length > 0 || faqs.length > 0) && (
                <section className="px-6 pb-4">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">

                        {/* WHY PEOPLE PICK THIS — Highlights */}
                        {highlights.length > 0 && (
                            <div>
                                <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">
                                    Why people pick this
                                </h2>
                                <ul className="mt-6 space-y-3">
                                    {highlights.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E0F2FE] text-[#0369A1]">
                                                <Check size={14} strokeWidth={3} />
                                            </span>
                                            <span className="text-base leading-relaxed text-slate-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* PERFECT FOR — tags */}
                        {perfectFor.length > 0 && (
                            <div>
                                <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">
                                    Perfect for
                                </h2>
                                <div className="mt-6 flex flex-wrap gap-2.5">
                                    {perfectFor.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1C1917] shadow-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* SPECS — collapsible accordion; first two open by default */}
            {specGroups.length > 0 && (
                <section className="px-6 py-10">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">Specs</h2>
                        <div className="mt-6 grid gap-3 lg:max-w-3xl">
                            {specGroups.map((group, i) => (
                                <details
                                    key={group.title}
                                    open={i < 2}
                                    className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading text-base font-bold text-[#1C1917] [&::-webkit-details-marker]:hidden">
                                        {group.title}
                                        <ChevronDown
                                            size={18}
                                            className="shrink-0 text-[#0369A1] transition-transform duration-200 group-open:rotate-180"
                                        />
                                    </summary>
                                    <ul className="space-y-2 border-t border-slate-100 px-5 py-4">
                                        {group.items.map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0EA5E9]" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* COMMON QUESTIONS — FAQ pairs */}
            {faqs.length > 0 && (
                <section className="bg-white px-6 py-12 md:py-16">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="font-heading text-2xl font-extrabold text-[#1C1917] md:text-3xl">
                            Common questions
                        </h2>
                        <div className="mt-8 grid gap-4">
                            {faqs.map((faq) => (
                                <article key={faq.question} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5 shadow-sm">
                                    <h3 className="mb-2 font-heading text-lg font-bold text-[#1C1917]">{faq.question}</h3>
                                    <p className="leading-7 text-slate-600">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* TRUST BLOCK — constants, same on every product page */}
            <section className="px-6 py-12 md:py-16">
                <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
                    <p className="section-label text-[#0369A1]">Why Pixel &amp; Panel</p>
                    <p className="mt-4 text-lg leading-relaxed text-slate-700">
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
