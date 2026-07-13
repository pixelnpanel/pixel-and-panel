'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Info, MessageCircle, Truck } from 'lucide-react'

const WHATSAPP_NUMBER = '14092252012'
const QUOTE_PATH = '/quote-request'
const CUSTOM = 'custom'

const DEFAULT_SIDE_LABEL = { single: 'Single-Sided', double: 'Double-Sided' }

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
    // Optional clarifier rendered under the price box (ReactNode).
    priceNote = null,
    // Some products offer a single fixed size — hide the "Custom size" option.
    showCustomSize = true,
    // Override the option-toggle labels + heading (e.g. flags sell the toggle as
    // "Flag Only" / "Flag+Pole" rather than print sides).
    sideLabels = DEFAULT_SIDE_LABEL,
    sidesHeading = 'Printed Sides',
}) {
    const hasSizes = sizes.length > 0
    const sides = availableSides.length ? availableSides : []
    const labelFor = (s) => sideLabels[s] || DEFAULT_SIDE_LABEL[s] || s

    const [sizeId, setSizeId] = useState(hasSizes ? sizes[0].id : CUSTOM)
    const [side, setSide] = useState(sides[0] || 'single')

    // Manual dimensions, entered only when "Custom size" is selected.
    const [customWidth, setCustomWidth] = useState('')
    const [customHeight, setCustomHeight] = useState('')
    const [customUnit, setCustomUnit] = useState('in')

    const isCustom = sizeId === CUSTOM
    const customDims =
        customWidth.trim() && customHeight.trim()
            ? `${customWidth.trim()} × ${customHeight.trim()} ${customUnit}`
            : ''
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
    const sizeText = isCustom
        ? (customDims ? `Custom — ${customDims}` : 'Custom size')
        : selectedSize?.label || ''
    const sideText = sides.length ? labelFor(side) : ''
    const priceText = showPrice ? formatPrice(unitPrice) : 'need a quote'

    const quoteHref = useMemo(() => {
        const params = new URLSearchParams()
        params.set('product', productName)
        if (sizeText) params.set('size', sizeText)
        if (sideText) params.set('side', sideText)
        params.set('price', showPrice ? String(unitPrice) : 'quote')
        if (categoryName) params.set('category', categoryName)
        return `${QUOTE_PATH}?${params.toString()}`
    }, [productName, sizeText, sideText, showPrice, unitPrice, categoryName])

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
                {(showCustomSize || !hasSizes) && <option value={CUSTOM}>Custom size</option>}
            </select>

            {/* CUSTOM MEASUREMENTS — manual W×H entry when "Custom size" is chosen.
                Flows into the quote/WhatsApp CTA so the team sees exact dimensions. */}
            {isCustom && (
                <div className="mt-4">
                    <span className="mb-2 block font-heading text-sm font-bold text-[#1C1917]">Custom Size</span>
                    <div className="flex items-stretch gap-2">
                        <div className="relative flex-1">
                            <input
                                type="number" min="0" inputMode="decimal"
                                value={customWidth}
                                onChange={(e) => setCustomWidth(e.target.value)}
                                placeholder="Width"
                                aria-label="Custom width"
                                className="w-full rounded-xl border border-brand-line bg-[#FAF8F4] px-4 py-3 text-base text-[#1C1917] outline-none transition focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-[#0EA5E9]/15"
                            />
                        </div>
                        <span className="self-center font-heading text-sm font-bold text-brand-subtle">×</span>
                        <div className="relative flex-1">
                            <input
                                type="number" min="0" inputMode="decimal"
                                value={customHeight}
                                onChange={(e) => setCustomHeight(e.target.value)}
                                placeholder="Height"
                                aria-label="Custom height"
                                className="w-full rounded-xl border border-brand-line bg-[#FAF8F4] px-4 py-3 text-base text-[#1C1917] outline-none transition focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-[#0EA5E9]/15"
                            />
                        </div>
                        <select
                            value={customUnit}
                            onChange={(e) => setCustomUnit(e.target.value)}
                            aria-label="Measurement unit"
                            className="rounded-xl border border-brand-line bg-[#FAF8F4] px-3 py-3 text-base text-[#1C1917] outline-none transition focus:border-[#0EA5E9] focus:bg-white focus:ring-4 focus:ring-[#0EA5E9]/15"
                        >
                            <option value="in">in</option>
                            <option value="ft">ft</option>
                        </select>
                    </div>
                    <p className="mt-2 text-xs text-brand-subtle">
                        Enter width and height — we’ll confirm the exact price on your quote.
                    </p>
                </div>
            )}

            {/* SIDE TOGGLE — only when more than one side is offered */}
            {sides.length > 1 && !isCustom && (
                <div className="mt-5">
                    <span className="mb-2 block font-heading text-sm font-bold text-[#1C1917]">{sidesHeading}</span>
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
                                    {labelFor(s)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* When a single side is offered (and a real size is chosen), note it. */}
            {sides.length === 1 && !isCustom && hasSizes && (
                <p className="mt-4 text-sm text-brand-subtle">
                    {labelFor(sides[0])} only.
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

            {/* Optional product-specific clarifier under the price box. */}
            {priceNote && (
                <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-brand-subtle">
                    <Info size={15} className="mt-0.5 shrink-0 text-[#0369A1]" />
                    <span>{priceNote}</span>
                </p>
            )}

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
