'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { quoteLanguageHref } from '@/lib/quote-selection'
import { QUOTE_DRAFT_EVENT } from '@/lib/quote-draft'

function ResolvedLanguageLink({ href, children, ...props }) {
  const searchParams = useSearchParams()
  function handleClick(event) {
    props.onClick?.(event)
    if (!event.defaultPrevented && (href === '/quote-request' || href === '/es/solicitar-cotizacion')) {
      window.dispatchEvent(new Event(QUOTE_DRAFT_EVENT))
    }
  }
  return <Link {...props} onClick={handleClick} href={quoteLanguageHref(href, searchParams)}>{children}</Link>
}

// Limit the search-param Suspense boundary to language links so public page
// navigation and content remain server rendered.
export default function LanguageLink({ href, children, ...props }) {
  return (
    <Suspense fallback={<Link {...props} href={href}>{children}</Link>}>
      <ResolvedLanguageLink {...props} href={href}>{children}</ResolvedLanguageLink>
    </Suspense>
  )
}
