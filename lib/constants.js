// lib/constants.js
export const BRAND = {
    name: 'Pixel & Panel',
    legalName: 'Pixel & Panel LLC',
    tagline: 'Your Vision. Made Visible.',
    email: 'hello@pixelnpanel.com',
    domain: 'pixelnpanel.com',
    siteUrl: 'https://pixelnpanel.com',
    serviceArea: ['Beaumont, TX', 'Port Arthur, TX', 'Orange, TX'],
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
    { name: 'Yard Signs', href: '/signage/yard-signs', icon: 'Flag' },
    { name: 'Vinyl Banners', href: '/signage/vinyl-banners', icon: 'Maximize' },
    { name: 'Vehicle Wraps', href: '/signage/vehicle-wraps', icon: 'Truck' },
    { name: 'Window Graphics', href: '/signage/window-graphics', icon: 'Square' },
    { name: 'Metal Signs', href: '/signage/metal-signs', icon: 'Shield' },
    { name: 'Banner Stands', href: '/signage/banner-stands', icon: 'AlignCenter' },
    { name: 'Real Estate Signs', href: '/signage/real-estate-signs', icon: 'Home' },
    { name: 'A-Frame Signs', href: '/signage/a-frame-signs', icon: 'Triangle' },
    { name: 'Feather Flags', href: '/signage/feather-flags', icon: 'Wind' },
    { name: 'Table Throws', href: '/signage/table-throws', icon: 'Layout' },
    { name: 'Event Tents', href: '/signage/event-tents', icon: 'Sun' },
    { name: 'Backdrops', href: '/signage/backdrops', icon: 'Image' },
    { name: 'Mesh Banners', href: '/signage/mesh-banners', icon: 'Grid' },
    { name: 'Wall Art', href: '/signage/wall-art', icon: 'PenTool' },
    { name: 'Posters', href: '/signage/posters', icon: 'FileText' },
    { name: 'Decals', href: '/signage/decals', icon: 'Layers' },
    { name: 'Reflective Signs', href: '/signage/reflective-signs', icon: 'Sparkles' },
    { name: 'Floor Graphics', href: '/signage/floor-graphics', icon: 'Move' },
]

export const NAV_LINKS = [
    { label: 'Digital Services', href: '/digital', dropdown: DIGITAL_SERVICES },
    { label: 'Signage', href: '/signage', dropdown: SIGNAGE_PRODUCTS },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
]