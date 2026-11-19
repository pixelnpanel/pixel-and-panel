'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Info, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useProductQuote, ProductQuoteLink } from './ProductQuoteContext'
import { validQuantity } from '@/lib/quote-selection'
import { formatPrice } from '@/lib/signage/parsers'
import { trackEvent } from '@/lib/analytics'

const COPY = {
    en: {
        quotePath: '/quote-request', shippingPath: '/shipping-policy',
        sizes: 'Sizes & reference prices', configure: 'Configure your quote', size: 'Size',
        customSize: 'Custom size', width: 'Width', height: 'Height', measure: 'Measurement unit',
        enterSize: 'Enter the width and height so we can price the custom size.',
        sidesHeading: 'Printed sides', sideLabels: { single: 'Single-sided', double: 'Double-sided' },
        quantity: 'Requested quantity', quantityHelp: 'For packs or kits, count each pack or kit once.',
        invalidQuantity: 'Enter a whole number from 1 to 100,000, or leave it blank for help.',
        selection: 'Your selection', material: 'Material', option: 'Option', configuration: 'Configuration', unknown: 'To confirm',
        reference: 'Reference price for this option', referenceShort: 'reference', quotePrice: 'Price by quote',
        unitPending: 'We’ll confirm the selling unit and the total for your quantity.',
        totalPending: 'We’ll confirm the total for your quantity.',
        afterQuote: 'We’ll confirm pricing, availability, and fulfillment before payment.',
        shipping: 'Shipping and delivery details', quote: 'Get my quote', whatsapp: 'Ask on WhatsApp',
        message: 'Hi Pixel & Panel, I’d like a quote for',
    },
    es: {
        quotePath: '/es/solicitar-cotizacion', shippingPath: '/es/politica-de-envio',
        sizes: 'Tamaños y precios de referencia', configure: 'Configura tu cotización', size: 'Tamaño',
        customSize: 'Tamaño personalizado', width: 'Ancho', height: 'Alto', measure: 'Unidad de medida',
        enterSize: 'Indica el ancho y el alto para cotizar la medida personalizada.',
        sidesHeading: 'Lados impresos', sideLabels: { single: 'Un lado', double: 'Dos lados' },
        quantity: 'Cantidad solicitada', quantityHelp: 'Si se vende en paquetes o kits, cuenta cada paquete o kit como uno.',
        invalidQuantity: 'Ingresa un número entero de 1 a 100,000 o deja el campo en blanco.',
        selection: 'Tu selección', material: 'Material', option: 'Opción', configuration: 'Configuración', unknown: 'Por confirmar',
        reference: 'Precio de referencia para esta opción', referenceShort: 'referencia', quotePrice: 'Precio por cotización',
        unitPending: 'Confirmaremos la unidad de venta y el total para la cantidad solicitada.',
        totalPending: 'Confirmaremos el total para la cantidad solicitada.',
        afterQuote: 'Confirmaremos el precio, la disponibilidad y la entrega antes del pago.',
        shipping: 'Detalles de envío y entrega', quote: 'Solicitar mi cotización', whatsapp: 'Consultar por WhatsApp',
        message: 'Hola, Pixel & Panel. Quisiera una cotización para',
    },
}

const INPUT = 'min-w-0 w-full rounded-xl border border-brand-line bg-[#FAF8F4] px-4 py-3 text-base text-[#1C1917] outline-none focus:border-[#0369A1] focus:ring-4 focus:ring-[#0EA5E9]/15'
const LABEL = 'mb-2 block font-heading text-sm font-bold text-[#1C1917]'
const CUSTOM = 'custom'

export default function SignagePriceCalculator({
    productName,
    categoryName,
    sizes = [],
    availableSides = [],
    isLive = false,
    priceNote,
    priceUnits = {},
    material,
    language = 'English',
    showCustomSize = true,
    sideLabels,
    sidesHeading,
    configurations = [],
}) {
    const spanish = language === 'Spanish'
    const copy = spanish ? COPY.es : COPY.en
    const quote = useProductQuote()
    const setSelection = quote?.setSelection
    const [quantity, setQuantity] = useState('1')
    const [sizeId, setSizeId] = useState(sizes[0]?.id || CUSTOM)
    const [configuration, setConfiguration] = useState(configurations[0] || '')
    const [side, setSide] = useState(availableSides[0] || 'single')
    const [customWidth, setCustomWidth] = useState('')
    const [customHeight, setCustomHeight] = useState('')
    const [customUnit, setCustomUnit] = useState('in')

    const requestedQuantity = validQuantity(quantity)
    const isCustom = sizeId === CUSTOM
    const selectedSize = sizes.find((size) => size.id === sizeId)
    const localSize = (label) => spanish && label === 'Standard' ? 'Estándar' : label
    const labelFor = (value) => sideLabels?.[value] || copy.sideLabels[value]
    const priceLabel = isLive && !isCustom ? formatPrice(selectedSize?.[side]) : null
    const sellingUnit = priceUnits[side] || priceUnits.all
    const sizeText = isCustom
        ? ((Number(customWidth) > 0 && Number(customHeight) > 0) ? customWidth + ' × ' + customHeight + ' ' + customUnit : copy.customSize)
        : localSize(selectedSize?.label || '')
    const sideText = availableSides.length ? labelFor(side) : ''
    const trackChange = (field) => trackEvent('calculator_interaction', { option_field: field })
    const params = new URLSearchParams({ product: productName, request: 'signage' })
    for (const [key, value] of Object.entries({ category: categoryName, size: sizeText, side: sideText, quantity: requestedQuantity, material, configuration })) {
        if (value) params.set(key, value)
    }
    const quoteHref = copy.quotePath + '?' + params.toString()
    const stickyPrice = priceLabel
        ? [priceLabel, sellingUnit, '·', copy.referenceShort].filter(Boolean).join(' ')
        : copy.quotePrice

    useEffect(() => {
        setSelection?.({ href: quoteHref, priceLabel: stickyPrice })
    }, [setSelection, quoteHref, stickyPrice])

    const details = [
        [copy.size, sizeText],
        ...(configuration ? [[copy.configuration, configuration]] : []),
        ...(sideText ? [[sidesHeading || copy.option, sideText]] : []),
        ...(material ? [[copy.material, material]] : []),
        [copy.quantity, requestedQuantity],
    ]
    const whatsappText = [
        copy.message + ' ' + productName + '.',
        ...details.filter(([, value]) => value).map(([label, value]) => label + ': ' + value),
    ].join('\n')

    return (
        <section id="product-options" aria-labelledby="product-options-heading" className="scroll-mt-32 rounded-2xl border border-brand-line bg-white p-4 text-[#1C1917] shadow-calc sm:p-6 md:p-7">
            <h2 id="product-options-heading" className="mb-4 text-xl text-[#0369A1]">{isLive ? copy.sizes : copy.configure}</h2>
            {configurations.length > 0 && <div className="mb-4">
                <label htmlFor="signage-configuration" className={LABEL}>{copy.configuration}</label>
                <select id="signage-configuration" className={INPUT} value={configuration} onChange={(event) => setConfiguration(event.target.value)}>
                    {configurations.map((item) => <option key={item}>{item}</option>)}
                </select>
            </div>}
            <label htmlFor="signage-size" className={LABEL}>{copy.size}</label>
            <select id="signage-size" className={INPUT} value={sizeId}
                onChange={(event) => { setSizeId(event.target.value); trackChange('size') }}>
                {sizes.map((size) => <option key={size.id} value={size.id}>{localSize(size.label)}</option>)}
                {(showCustomSize || sizes.length === 0) && <option value={CUSTOM}>{copy.customSize}</option>}
            </select>

            {isCustom && (
                <div className="mt-4">
                    <p className={LABEL}>{copy.customSize}</p>
                    <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2">
                        <input className={INPUT} type="number" min="0" step="any" inputMode="decimal" value={customWidth}
                            onChange={(event) => setCustomWidth(event.target.value)} onBlur={() => trackChange('custom_width')}
                            placeholder={copy.width} aria-label={copy.width} />
                        <span aria-hidden="true">×</span>
                        <input className={INPUT} type="number" min="0" step="any" inputMode="decimal" value={customHeight}
                            onChange={(event) => setCustomHeight(event.target.value)} onBlur={() => trackChange('custom_height')}
                            placeholder={copy.height} aria-label={copy.height} />
                        <select className="rounded-xl border border-brand-line bg-[#FAF8F4] px-2 py-3"
                            value={customUnit} onChange={(event) => setCustomUnit(event.target.value)} aria-label={copy.measure}>
                            <option value="in">in</option><option value="ft">ft</option>
                        </select>
                    </div>
                    <p className="mt-2 text-xs text-brand-subtle">{copy.enterSize}</p>
                </div>
            )}

            {availableSides.length > 1 && (
                <fieldset className="mt-5">
                    <legend className={LABEL}>{sidesHeading || copy.sidesHeading}</legend>
                    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-brand-line bg-[#FAF8F4] p-1">
                        {availableSides.map((value) => (
                            <button key={value} type="button" aria-pressed={value === side}
                                onClick={() => { setSide(value); trackChange('print_option') }}
                                className={'min-h-11 rounded-lg px-3 py-2 font-heading text-sm font-bold transition ' + (value === side ? 'bg-[#0369A1] text-white' : 'text-[#1C1917] hover:bg-white')}>
                                {labelFor(value)}
                            </button>
                        ))}
                    </div>
                </fieldset>
            )}

            <div className="mt-5">
                <label htmlFor="signage-quantity" className={LABEL}>{copy.quantity}</label>
                <input id="signage-quantity" className={INPUT} type="number" min="1" max="100000" step="1" inputMode="numeric" value={quantity}
                    onChange={(event) => setQuantity(event.target.value)} onBlur={() => trackChange('quantity')}
                    aria-describedby="signage-quantity-help" aria-invalid={Boolean(quantity && !requestedQuantity)} />
                <p id="signage-quantity-help" className="mt-2 text-xs leading-5 text-slate-600">{copy.quantityHelp}</p>
                {quantity && !requestedQuantity && <p role="alert" className="mt-2 text-sm text-red-700">{copy.invalidQuantity}</p>}
            </div>

            <div className="mt-6 rounded-xl border border-brand-divider bg-[#FAF8F4] p-5">
                <p className="mb-1 text-xs font-semibold text-slate-600">{copy.selection}</p>
                <p className="font-heading font-bold">{productName}</p>
                <dl className="my-3 space-y-1 text-sm text-slate-700">
                    {details.map(([label, value]) => (
                        <div key={label} className="flex flex-wrap justify-between gap-x-3">
                            <dt>{label}</dt><dd className="font-semibold">{value || copy.unknown}</dd>
                        </div>
                    ))}
                </dl>
                {priceLabel && <p className="mb-1 text-xs font-semibold text-slate-600">{copy.reference}</p>}
                <p className="font-heading text-2xl font-extrabold text-[#0369A1]">
                    {priceLabel || copy.quotePrice} {priceLabel && sellingUnit && <span className="text-sm">{sellingUnit}</span>}
                </p>
                {priceLabel && <p className="mt-1 text-sm text-slate-700">{sellingUnit ? copy.totalPending : copy.unitPending}</p>}
                <p className="mt-3 text-sm text-slate-700">{copy.afterQuote}</p>
                <Link href={copy.shippingPath} className="mt-2 inline-block text-sm font-semibold text-[#0369A1] underline underline-offset-4">{copy.shipping}</Link>
            </div>

            {priceNote && (
                <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-brand-subtle">
                    <Info size={15} className="mt-0.5 shrink-0 text-[#0369A1]" aria-hidden="true" /> {priceNote}
                </p>
            )}

            <div className="mt-6 flex flex-col gap-3">
                <ProductQuoteLink id="product-options-quote" href={quoteHref} source="product_calculator" className="btn-amber w-full justify-center">
                    {copy.quote} <ArrowRight size={18} aria-hidden="true" />
                </ProductQuoteLink>
                <a href={'https://wa.me/14092252012?text=' + encodeURIComponent(whatsappText)}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0369A1] px-4 py-3.5 text-center font-heading text-sm font-bold text-[#0369A1] transition hover:bg-[#0369A1] hover:text-white">
                    <MessageCircle size={18} aria-hidden="true" /> {copy.whatsapp}
                </a>
            </div>
        </section>
    )
}
