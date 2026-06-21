'use client'

import Link from 'next/link'
import { trackSignCatalogClick } from '@/lib/analytics'

export default function SignCatalogLink({ sourceLocation, onClick, prefetch = false, ...props }) {
  const handleClick = (event) => {
    trackSignCatalogClick(sourceLocation)
    onClick?.(event)
  }

  return <Link {...props} prefetch={prefetch} onClick={handleClick} />
}
