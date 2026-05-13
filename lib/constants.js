// lib/constants.js
export const BRAND = {
    name: 'Pixel & Panel',
    legalName: 'Pixel & Panel LLC',
    tagline: 'Your Vision. Made Visible.',
    email: 'hello@pixelnpanel.com',
    phone: '(409) 800-6139',
    phoneHref: 'tel:+14098006139',
    domain: 'pixelnpanel.com',
    siteUrl: 'https://pixelnpanel.com',
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

export const SIGNAGE_PRODUCTS = [
    { name: 'Vinyl Banners', href: '/signage/vinyl-banners', icon: 'Maximize' },
    { name: 'Yard Signs', href: '/signage/yard-signs', icon: 'Home' },
    { name: 'Real Estate Signs', href: '/signage/real-estate-signs', icon: 'PanelTop' },
    { name: 'Vehicle Graphics', href: '/signage/vehicle-graphics', icon: 'Truck' },
    { name: 'Car Magnets', href: '/signage/car-magnets', icon: 'Square' },
    { name: 'Window Graphics', href: '/signage/window-graphics', icon: 'Layers' },
    { name: 'Storefront Signs', href: '/signage/storefront-signs', icon: 'Storefront' },
    { name: 'Metal Signs', href: '/signage/metal-signs', icon: 'Shield' },
    { name: 'Business Cards', href: '/signage/business-cards', icon: 'Files' },
    { name: 'Flyers', href: '/signage/flyers', icon: 'FileText' },
]

export const GBP_MAPS_URL = "https://maps.app.goo.gl/ssAtkxp8XqtEuJ7T9"
export const GBP_REVIEW_URL = "https://g.page/r/CQf3A2TWP9JjEBM/review"

export const SOCIAL_LINKS = [
    { name: "WhatsApp", href: "https://wa.me/14098006139",          icon: "whatsapp"  },
    { name: "Pinterest", href: "https://pinterest.com/pixelnpanel", icon: "pinterest" },
]

export const NAV_LINKS = [
    { label: 'Digital Services', href: '/digital', dropdown: DIGITAL_SERVICES },
    { label: 'Signage & Print', href: '/signage', dropdown: SIGNAGE_PRODUCTS },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
]
