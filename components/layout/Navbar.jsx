'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const [mobileExpand, setMobileExpand] = useState(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                backgroundColor: scrolled || mobileOpen ? 'rgba(255,255,255,0.97)' : 'transparent',
                backdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
                borderBottom: scrolled || mobileOpen ? '1px solid #e2e8f0' : 'none',
                boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
            }}
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                        <Image
                            src="/logo/icon-512px.png"
                            alt="Pixel & Panel"
                            width={38}
                            height={38}
                            style={{ borderRadius: '0px' }}
                        />
                        <span style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            fontSize: '1rem',
                            color: scrolled || mobileOpen ? '#1C1917' : 'white',
                            letterSpacing: '-0.02em',
                            transition: 'color 0.3s',
                        }}>
                            PIXEL <span style={{ color: '#F59E0B' }}>&</span> PANEL
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        className="hidden lg:flex">
                        {NAV_LINKS.map((item) => (
                            <div
                                key={item.label}
                                style={{ position: 'relative' }}
                                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: scrolled || mobileOpen ? '#1C1917' : 'white',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s',
                                        fontFamily: 'Inter, sans-serif',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    {item.label}
                                    {item.dropdown && <ChevronDown size={13} />}
                                </Link>

                                {/* Desktop Dropdown */}
                                {item.dropdown && openDropdown === item.label && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        marginTop: '0.5rem',
                                        width: '220px',
                                        backgroundColor: 'white',
                                        borderRadius: '1rem',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                                        border: '1px solid #f1f5f9',
                                        overflow: 'hidden',
                                        zIndex: 100,
                                    }}>
                                        {item.dropdown.slice(0, 8).map((sub) => (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                style={{
                                                    display: 'block',
                                                    padding: '0.75rem 1.25rem',
                                                    fontSize: '0.875rem',
                                                    color: '#1C1917',
                                                    textDecoration: 'none',
                                                    borderBottom: '1px solid #f8fafc',
                                                    fontFamily: 'Inter, sans-serif',
                                                    transition: 'background 0.15s',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                        {item.label === 'Signage' && (
                                            <Link
                                                href="/signage"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '0.75rem 1.25rem',
                                                    fontSize: '0.875rem',
                                                    fontWeight: 700,
                                                    color: '#F59E0B',
                                                    textDecoration: 'none',
                                                    fontFamily: 'Montserrat, sans-serif',
                                                    backgroundColor: '#fffbeb',
                                                }}
                                            >
                                                View all signage <ArrowRight size={13} />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <Link
                        href="/quote-request"
                        className="btn-amber hidden lg:inline-flex"
                    >
                        Get a Free Quote
                        <ArrowRight size={14} />
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            color: scrolled || mobileOpen ? '#1C1917' : 'white',
                        }}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{
                    backgroundColor: 'white',
                    borderTop: '1px solid #f1f5f9',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    padding: '1rem',
                }}>
                    {NAV_LINKS.map((item) => (
                        <div key={item.label}>
                            {item.dropdown ? (
                                <div>
                                    <button
                                        onClick={() => setMobileExpand(mobileExpand === item.label ? null : item.label)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '0.875rem 1rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '0.925rem',
                                            color: '#1C1917',
                                            borderRadius: '0.5rem',
                                        }}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            size={15}
                                            style={{
                                                transform: mobileExpand === item.label ? 'rotate(180deg)' : 'rotate(0)',
                                                transition: 'transform 0.2s',
                                            }}
                                        />
                                    </button>
                                    {mobileExpand === item.label && (
                                        <div style={{ paddingLeft: '1rem', marginBottom: '0.5rem' }}>
                                            {item.dropdown.slice(0, 8).map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    style={{
                                                        display: 'block',
                                                        padding: '0.625rem 1rem',
                                                        fontSize: '0.875rem',
                                                        color: '#475569',
                                                        textDecoration: 'none',
                                                        fontFamily: 'Inter, sans-serif',
                                                        borderRadius: '0.5rem',
                                                    }}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: 'block',
                                        padding: '0.875rem 1rem',
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 600,
                                        fontSize: '0.925rem',
                                        color: '#1C1917',
                                        textDecoration: 'none',
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}

                    <div style={{ padding: '1rem', borderTop: '1px solid #f1f5f9', marginTop: '0.5rem' }}>
                        <Link
                            href="/quote-request"
                            className="btn-amber"
                            onClick={() => setMobileOpen(false)}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Get a Free Quote
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}