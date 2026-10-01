'use client'

import Link from 'next/link'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const ProductQuoteContext = createContext(null)
export const useProductQuote = () => useContext(ProductQuoteContext)

export function ProductQuoteProvider({ children, productName, categoryName, quoteHref, priceLabel, language = 'English' }) {
    const [selection, setSelection] = useState({ href: quoteHref, priceLabel })
    const value = useMemo(() => ({ selection, setSelection, productName, categoryName, language }), [selection, productName, categoryName, language])
    return <ProductQuoteContext.Provider value={value}>{children}</ProductQuoteContext.Provider>
}

export function ProductQuoteLink({ href, source = 'product_footer', children, ...props }) {
    const quote = useProductQuote()
    return (
        <Link {...props} href={quote?.selection.href || href} prefetch={false} onClick={() => {
            trackEvent('quote_start', {
                product_name: quote?.productName,
                product_category: quote?.categoryName,
                source_location: source,
                language: quote?.language || 'English',
            })
        }}>{children}</Link>
    )
}

export function MobileProductQuoteBar() {
    const quote = useProductQuote()
    const [footerVisible, setFooterVisible] = useState(false)
    useEffect(() => {
        const footer = document.querySelector('footer')
        if (!footer) return
        const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
        observer.observe(footer)
        return () => observer.disconnect()
    }, [])
    if (!quote) return null
    const spanish = quote.language === 'Spanish'
    return (
        <>
            <div className="h-24 lg:hidden" aria-hidden="true" />
            {!footerVisible && (
                <aside data-mobile-product-quote aria-label={spanish ? 'Cotización del producto' : 'Product quote'} className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg lg:hidden">
                    <div className="mx-auto flex max-w-xl items-center gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-slate-700">{quote.productName}</p>
                            <p className="mt-1 text-sm font-bold text-[#0369A1]">{quote.selection.priceLabel || (spanish ? 'Precio por cotización' : 'Custom quote')}</p>
                        </div>
                        <ProductQuoteLink href={quote.selection.href} source="mobile_product_bar" className="btn-amber shrink-0 gap-2 px-4 py-3 text-xs">
                            {spanish ? 'Cotizar' : 'Get a Quote'} <ArrowRight size={16} aria-hidden="true" />
                        </ProductQuoteLink>
                    </div>
                </aside>
            )}
        </>
    )
}
