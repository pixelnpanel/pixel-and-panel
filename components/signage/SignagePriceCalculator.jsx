'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle, Truck } from 'lucide-react'

const WHATSAPP_NUMBER = '14092252012'
const QUOTE_PATH = '/quote-request'
const CUSTOM = 'custom'

const SIDE_LABEL = { single: 'Single-Sided', double: 'Double-Sided' }

function formatPrice(value) {
    if (value == null || !Number.isFinite(value)) return null
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

export default function SignagePriceCalculator({
    productName,
    categoryName,
    sizes = [],
    availableSides = [],
    isLive = false,
}) {
    const hasSizes = sizes.length > 0
    const sides = availableSides.length ? availableSides : []

    const [sizeId, setSizeId] = useState(hasSizes ? sizes[0].id : CUSTOM)
    const [side, setSide] = useState(sides[0] || 'single')

    const isCustom = sizeId === CUSTOM
    const selectedSize = useMemo(
        () => sizes.find((s) => s.id === sizeId) || null,
        [sizes, sizeId]
    )

    // Look up the exact price for the chosen (size, side).
    const unitPrice = useMemo(() => {
        if (!isLive || isCustom || !selectedSize) return null
        const raw = side === 'double' ? selectedSize.double : selectedSize.single
        return raw != null ? raw : null
    }, [isLive, isCustom, selectedSize, side])

    const showPrice = unitPrice != null
    const priceLabel = showPrice ? formatPrice(unitPrice) : 'Request a Quote'

    // Values that flow into the CTAs.
    const sizeText = isCustom ? 'Custom size' : selectedSize?.label || ''
    const sideText = sides.length ? SIDE_LABEL[side] : ''
    const priceText = showPrice ? formatPrice(unitPrice) : 'need a quote'

    const quoteHref = useMemo(() => {
        const params = new URLSearchParams()
        params.set('product', productName)
        if (sizeText) params.set('size', sizeText)
        if (sideText) params.set('side', side === 'double' ? 'Double' : 'Single')
        params.set('price', showPrice ? String(unitPrice) : 'quote')
        if (categoryName) params.set('category', categoryName)
        return `${QUOTE_PATH}?${params.toString()}`
    }, [productName, sizeText, sideText, side, showPrice, unitPrice, categoryName])

    const whatsappHref = useMemo(() => {
        const sidePart = sideText ? `, ${sideText}` : ''
        const sizePart = sizeText ? ` — ${sizeText}` : ''
        const pricePart = showPrice ? formatPrice(unitPrice) : 'need a quote'
        const text = `Hi Pixel & Panel, I'd like to order: ${productName}${sizePart}${sidePart} — ${pricePart}.`
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    }, [productName, sizeText, sideText, showPrice, unitPrice])

    return (
        <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-calc md:p-7">
            <p className="section-label mb-4 text-[#0369A1]">Build Your Price</p>

            {/* SIZE */}
            <label htmlFor="signage-size" className="mb-2 block font-heading text-sm font-bold text-[#1C1917]">
                Size
            </label>
            <select
                id="signage-size"
                value={sizeId}
                onChange={(e) => setSizeId(e.target.value)}
                className="w-full rounded-xl border border-brand-line bg-[#FAF8F4] px-4 py-3.5 text-base text-[#1C1917] outline-none transition focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-[#0EA5E9]/15"
            >
                {sizes.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                ))}
                <option value={CUSTOM}>Custom size</option>
            </select>

            {/* SIDE TOGGLE — only when more than one side is offered */}
            {sides.length > 1 && !isCustom && (
                <div className="mt-5">
                    <span className="mb-2 block font-heading text-sm font-bold text-[#1C1917]">Printed Sides</span>
                    <div className="inline-flex rounded-xl border border-brand-line bg-[#FAF8F4] p-1">
                        {sides.map((s) => {
                            const active = s === side
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setSide(s)}
                                    aria-pressed={active}
                                    className={`rounded-lg px-4 py-2 font-heading text-sm font-bold transition ${active
                                        ? 'bg-[#0369A1] text-white shadow-sm'
                                        : 'text-[#1C1917] hover:bg-white'
                                        }`}
                                >
                                    {SIDE_LABEL[s]}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* When a single side is offered (and a real size is chosen), note it. */}
            {sides.length === 1 && !isCustom && hasSizes && (
                <p className="mt-4 text-sm text-brand-subtle">
                    {SIDE_LABEL[sides[0]]} only.
                </p>
            )}

            {/* PRICE DISPLAY */}
            <div className="mt-6 rounded-xl border border-brand-divider bg-[#FAF8F4] p-5">
                {showPrice ? (
                    <>
                        <p className="font-heading text-4xl font-extrabold text-[#0369A1]">{priceLabel}</p>
                        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0369A1] px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                            <Truck size={15} strokeWidth={2.5} /> Free Shipping Anywhere in the US
                        </span>
                    </>
                ) : (
                    <>
                        <p className="font-heading text-2xl font-extrabold text-[#1C1917]">Request a Quote</p>
                        <p className="mt-2 text-sm leading-relaxed text-brand-subtle">
                            {isCustom
                                ? 'Tell us your exact size and we’ll price it fast.'
                                : 'We’ll confirm the exact price for this option on your quote.'}
                        </p>
                    </>
                )}
            </div>

            {/* CTAs — both prefilled with the current selection */}
            <div className="mt-6 flex flex-col gap-3">
                <a href={quoteHref} className="btn-amber w-full justify-center">
                    Request a Quote <ArrowRight size={18} />
                </a>
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0369A1] px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-[#0369A1] transition hover:bg-[#0369A1] hover:text-white"
                >
                    <MessageCircle size={18} /> Order on WhatsApp
                </a>
            </div>
        </div>
    )
}
