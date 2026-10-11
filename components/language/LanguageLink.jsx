'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { quoteLanguageHref } from '@/lib/quote-selection'

function ResolvedLanguageLink({ href, children, ...props }) {
  const searchParams = useSearchParams()
  return <Link {...props} href={quoteLanguageHref(href, searchParams)}>{children}</Link>
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
