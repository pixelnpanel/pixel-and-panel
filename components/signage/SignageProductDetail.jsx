// components/signage/SignageProductDetail.jsx — server component
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Box, Info } from 'lucide-react'
import SignagePriceCalculator from '@/components/signage/SignagePriceCalculator'
import { formatPrice } from '@/lib/signage/data'

export default function SignageProductDetail({ product, category }) {
    const fromPrice = product.isLive ? formatPrice(product.lowestPrice) : null

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
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover"
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
                            <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-[#1C1917] md:text-5xl">
                                {product.name}
                            </h1>
                            {fromPrice && (
                                <p className="mt-3 text-lg text-slate-600">
                                    From <span className="font-heading font-extrabold text-[#0369A1]">{fromPrice}</span>
                                </p>
                            )}
                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                                {product.description}
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

                    {/* RIGHT: CALCULATOR */}
                    <div className="lg:sticky lg:top-24">
                        <SignagePriceCalculator
                            productName={product.name}
                            categoryName={category.name}
                            sizes={product.sizes}
                            availableSides={product.availableSides}
                            isLive={product.isLive}
                        />
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="bg-[#0C1E3C] px-6 py-16 text-center text-white">
                <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
                    Ready to order your {product.name}?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                    Send your size, quantity, and artwork — we’ll confirm the exact price, tax, and turnaround for {product.name} in {category.name.toLowerCase()}.
                </p>
                <div className="mt-8">
                    <Link href={`/quote-request?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category.name)}`} className="btn-amber">
                        Request a Free Quote <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    )
}
