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
        name: 'Local SEO & Google Profile',
        href: '/digital/local-seo',
        icon: 'MapPin',
        description: 'Get ranked on Google Maps and in local search results for your city.',
    },
    {
        name: 'CRM & Automation',
        href: '/digital/crm-automation',
        icon: 'Zap',
        description: 'Automatically follow up with every lead so you never lose a job to slow response time.',
    },
    {
        name: 'QR Code Campaigns',
        href: '/digital/qr-campaigns',
        icon: 'QrCode',
        description: 'Turn every sign you put up into a trackable, measurable marketing asset.',
    },
]

export const SIGNAGE_PRODUCTS = [
    { name: 'Exterior Signs', href: '/signage/exterior-signs', icon: 'Storefront' },
    { name: 'Banners', href: '/signage/banners', icon: 'Maximize' },
    { name: 'Yard & Real Estate Signs', href: '/signage/yard-real-estate-signs', icon: 'Home' },
    { name: 'Rigid Signs', href: '/signage/rigid-signs', icon: 'PanelTop' },
    { name: 'Vinyl Decals & Graphics', href: '/signage/vinyl-decals-graphics', icon: 'Layers' },
    { name: 'Vehicle Graphics', href: '/signage/vehicle-graphics', icon: 'Truck' },
    { name: 'Window & Wall Graphics', href: '/signage/window-wall-graphics', icon: 'Square' },
    { name: 'Flags & Outdoor Displays', href: '/signage/flags-outdoor-displays', icon: 'Flag' },
    { name: 'A-Frames & Sidewalk Signs', href: '/signage/a-frames-sidewalk-signs', icon: 'Triangle' },
    { name: 'Trade Show & Event Displays', href: '/signage/trade-show-event-displays', icon: 'Image' },
    { name: 'Tents & Table Covers', href: '/signage/tents-table-covers', icon: 'Layout' },
    { name: 'Posters & Large Format Prints', href: '/signage/posters-large-format', icon: 'FileText' },
    { name: 'Print & Marketing Materials', href: '/signage/print-marketing-materials', icon: 'Files' },
    { name: 'Safety & Industrial Signs', href: '/signage/safety-industrial-signs', icon: 'Shield' },
    { name: 'Apparel Transfers', href: '/signage/apparel-transfers', icon: 'Shirt' },
]

export const NAV_LINKS = [
    { label: 'Digital Services', href: '/digital', dropdown: DIGITAL_SERVICES },
    { label: 'Signage & Print', href: '/signage', dropdown: SIGNAGE_PRODUCTS },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
]