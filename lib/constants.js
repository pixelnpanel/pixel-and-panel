// lib/constants.js
import { SIGNAGE_NAV_LABEL, SIGNAGE_PATH } from './sign-catalog'

export const BRAND = {
    name: 'Pixel & Panel',
    legalName: 'Pixel & Panel LLC',
    tagline: 'Your Vision. Made Visible.',
    email: 'hello@pixelnpanel.com',
    phone: '(409) 225-2012',
    phoneHref: 'tel:+14092252012',
    domain: 'www.pixelnpanel.com',
    siteUrl: 'https://www.pixelnpanel.com',
    serviceArea: ['Beaumont, TX', 'Nederland, TX', 'Port Arthur, TX'],
}

export const DIGITAL_SERVICES = [
    {
        name: 'Website Development',
        href: '/digital/web-development',
        icon: 'Monitor',
        description: 'A fast, professional website your customers can find — and that you can update yourself.',
    },
    {
        name: 'Get Found on Google',
        href: '/digital/local-seo',
        icon: 'MapPin',
        description: 'Help nearby customers find your business when they search on Google.',
    },
    {
        name: 'Google Business Profile',
        href: '/digital/google-business-profile',
        icon: 'MapPinned',
        description: 'Make your Google listing clearer and more useful for local customers.',
    },
    {
        name: 'Never Miss a Lead',
        href: '/digital/crm-automation',
        icon: 'Zap',
        description: 'Make sure every inquiry gets a fast reply so you never lose a job to slow response time.',
    },
    {
        name: 'QR Codes for Signs & Print',
        href: '/digital/qr-code-campaigns',
        icon: 'QrCode',
        description: 'Add a QR code to your signs or flyers so customers can reach you with one scan.',
    },
]

// Nav dropdown — keep hrefs pointed at live catalog pages, not retired flat
// URLs that 301 to the hub (see next.config redirects).
export const SIGNAGE_PRODUCTS = [
    { name: 'Vinyl Banners', href: '/signage/banners', icon: 'Maximize' },
    { name: 'Banner Stands', href: '/signage/banner-stands', icon: 'Layers' },
    { name: 'Yard Signs', href: '/signage/rigid-and-metal-signs/coroplast-yard-signs', icon: 'Home' },
    { name: 'Car Magnets', href: '/signage/rigid-and-metal-signs/car-and-vehicle-magnets', icon: 'Truck' },
    { name: 'Real Estate Signs', href: '/signage/real-estate-signs', icon: 'PanelTop' },
    { name: 'Feather Flags', href: '/signage/flags', icon: 'Square' },
    { name: 'Metal Signs', href: '/signage/rigid-and-metal-signs', icon: 'Shield' },
    { name: 'A-Frame Signs', href: '/signage/sidewalk-a-frame-signs', icon: 'Storefront' },
    { name: 'Event Tents', href: '/signage/event-tents', icon: 'Files' },
    { name: 'Table Covers', href: '/signage/table-covers-and-throws', icon: 'FileText' },
]

export const GBP_MAPS_URL = "https://maps.app.goo.gl/ssAtkxp8XqtEuJ7T9"
export const GBP_REVIEW_URL = "https://g.page/r/CQf3A2TWP9JjEBM/review"

export const SOCIAL_LINKS = [
    { name: "WhatsApp", href: "https://wa.me/14092252012",          icon: "whatsapp"  },
    { name: "Facebook", href: "https://www.facebook.com/pixelnpanel", icon: "facebook" },
    { name: "Instagram", href: "https://www.instagram.com/pixelnpanel/", icon: "instagram" },
    { name: "YouTube", href: "https://www.youtube.com/@pixelnpanel", icon: "youtube" },
    { name: "Pinterest", href: "https://pinterest.com/pixelnpanel", icon: "pinterest" },
    { name: "X (Twitter)", href: "https://x.com/PixelNPanel", icon: "twitter" },
]

export const NAV_LINKS = [
    { label: 'Digital Services', href: '/digital', dropdown: DIGITAL_SERVICES },
    { label: SIGNAGE_NAV_LABEL, href: SIGNAGE_PATH, dropdown: SIGNAGE_PRODUCTS },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
]
