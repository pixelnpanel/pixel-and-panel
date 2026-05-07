import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react'

// ─── All city + service data ────────────────────────────────────────────────
const CITIES = {
    'beaumont-tx': {
        name: 'Beaumont, TX',
        county: 'Jefferson County',
        region: 'Southeast Texas',
        nearby: 'Nederland, Port Arthur, and the surrounding Golden Triangle area',
        blurb: 'Beaumont is the commercial hub of Southeast Texas — home to thousands of small businesses in healthcare, petrochemical support, retail, and hospitality.',
    },
    'port-arthur-tx': {
        name: 'Port Arthur, TX',
        county: 'Jefferson County',
        region: 'Southeast Texas',
        nearby: 'Beaumont, Nederland, and the surrounding Golden Triangle area',
        blurb: 'Port Arthur is a working-class city built on industry — contractors, tradespeople, and local businesses that need professional branding to stand out.',
    },
    'nederland-tx': {
        name: 'Nederland, TX',
        county: 'Jefferson County',
        region: 'Southeast Texas',
        nearby: 'Port Arthur, Beaumont, and the surrounding Golden Triangle area',
        blurb: 'Nederland is a tight-knit community with a thriving small business scene — from local shops to service contractors who rely on visibility to win new customers.',
    },
}

const SERVICES = {
    'yard-signs': {
        name: 'Yard Signs',
        headline: 'Custom Yard Signs',
        keywords: ['yard signs', 'lawn signs', 'bandit signs', 'corrugated signs', 'outdoor signs'],
        icon: '🪧',
        what: 'Corrugated plastic yard signs custom-designed for your business, campaign, job site, or event. Full-color printing, weather-resistant materials, and wire stakes included.',
        why: 'Yard signs are the most cost-effective way to get your brand in front of pedestrians and drivers. Every sign we make includes a dynamic QR code — so you can track exactly how many people scan your sign and take action.',
        useCases: ['Contractors advertising at job sites', 'Real estate listings and open houses', 'Grand openings and sales events', 'Political campaigns', 'Community events'],
        features: ['Full-color custom design included', 'Weather-resistant corrugated plastic', 'Wire stakes for easy ground installation', 'QR code tracking on every sign', 'Fast turnaround — order online, delivered to your door'],
    },
    'vinyl-banners': {
        name: 'Vinyl Banners',
        headline: 'Custom Vinyl Banners',
        keywords: ['vinyl banners', 'custom banners', 'outdoor banners', 'event banners', 'promotional banners'],
        icon: '🏳️',
        what: 'Heavy-duty vinyl banners printed in full color for storefronts, events, trade shows, and outdoor advertising. Available in any size with grommets for easy hanging.',
        why: 'A vinyl banner is one of the fastest ways to get attention for your business — and ours come with a built-in QR code so every banner becomes a trackable marketing asset.',
        useCases: ['Grand openings and promotions', 'Trade shows and events', 'Storefront advertising', 'Construction site signage', 'Seasonal sales and announcements'],
        features: ['Heavy-duty 13oz vinyl material', 'Full-color printing, any size', 'Grommets included for easy hanging', 'QR code tracking included', 'Indoor and outdoor use'],
    },
    'car-magnets': {
        name: 'Car Magnets',
        headline: 'Custom Car Magnets & Magnetic Signs',
        keywords: ['car magnets', 'magnetic signs', 'vehicle magnets', 'car door magnets', 'magnetic vehicle signs'],
        icon: '🚗',
        what: 'Custom magnetic signs that stick to any metal vehicle surface — turn your truck, van, or car into a mobile billboard without permanent commitment.',
        why: 'Car magnets are perfect for contractors, delivery drivers, and small business owners who want professional vehicle branding they can remove when not working. Every magnet includes a QR code so potential customers can contact you instantly.',
        useCases: ['Contractors and tradespeople', 'Real estate agents', 'Food delivery and catering', 'Service businesses (plumbers, electricians, HVAC)', 'Mobile businesses'],
        features: ['High-strength magnetic material', 'Full-color custom design', 'Weather and UV resistant', 'Easy on/off — no damage to vehicle', 'QR code for instant customer contact'],
    },
    'metal-signs': {
        name: 'Metal Signs',
        headline: 'Custom Metal Signs',
        keywords: ['metal signs', 'aluminum signs', 'business signs', 'outdoor metal signs', 'custom metal signage'],
        icon: '🔩',
        what: 'Durable aluminum and metal signs for businesses, properties, and permanent outdoor installations. Built to last years without fading or rusting.',
        why: 'Metal signs communicate permanence and professionalism. Whether it\'s a business entrance sign, a property marker, or a directional sign — metal signals that your business is here to stay. We add a QR code to every sign so customers can find you online instantly.',
        useCases: ['Business entrance and building signs', 'Property and real estate markers', 'Directional and wayfinding signs', 'Industrial and safety signage', 'Parking and facility signs'],
        features: ['Premium aluminum material — rust-proof', 'Full-color UV printing', 'Multiple thickness options', 'Pre-drilled mounting holes', 'QR code integration available'],
    },
    'vehicle-wraps': {
        name: 'Vehicle Wraps',
        headline: 'Professional Vehicle Wraps',
        keywords: ['vehicle wraps', 'car wraps', 'truck wraps', 'van wraps', 'fleet wraps', 'vehicle graphics'],
        icon: '🚚',
        what: 'Full and partial vehicle wraps that turn your car, truck, or van into a rolling billboard. Professional design, premium vinyl materials, and precision installation.',
        why: 'A vehicle wrap is seen by thousands of people every day your vehicle is on the road — making it one of the highest-ROI marketing investments a local business can make. We integrate a QR code into every wrap so viewers can contact you in seconds.',
        useCases: ['Contractor and trade vehicles', 'Delivery and logistics fleets', 'Service business vehicles', 'Food trucks and mobile businesses', 'Real estate and sales vehicles'],
        features: ['Full and partial wrap options', 'Premium cast vinyl — 5-7 year lifespan', 'Professional installation', 'Custom design included', 'QR code integration on every wrap'],
    },
    'website-design': {
        name: 'Website Design',
        headline: 'Professional Website Design',
        keywords: ['website design', 'web design', 'small business website', 'affordable website', 'business website'],
        icon: '💻',
        what: 'Fast, professional websites built to rank on Google and convert visitors into customers. Mobile-first design, local SEO optimization, and easy content management.',
        why: 'Most local businesses in Southeast Texas have no website — or one that\'s slow, outdated, and invisible on Google. We build websites that actually generate leads, rank in local search, and connect directly to your CRM for automatic follow-up.',
        useCases: ['Contractors and tradespeople', 'Restaurants and food businesses', 'Healthcare and medical practices', 'Retail stores and boutiques', 'Service businesses of all kinds'],
        features: ['Mobile-first responsive design', 'Local SEO optimization built in', 'Google Business Profile integration', 'Contact forms connected to your CRM', 'Fast loading — optimized for Core Web Vitals'],
    },
    'local-seo': {
        name: 'Local SEO',
        headline: 'Local SEO & Google Business Profile',
        keywords: ['local SEO', 'Google Business Profile', 'Google Maps ranking', 'local search optimization', 'SEO services'],
        icon: '📍',
        what: 'Complete local SEO service — Google Business Profile setup and optimization, local keyword targeting, citation building, and monthly ranking reports.',
        why: 'When someone in your city searches for your service, you need to show up on Google Maps and in the top results. Most local businesses in Southeast Texas have no SEO strategy — which means massive opportunity for the ones that do.',
        useCases: ['Any local business wanting to rank on Google', 'Businesses with outdated Google Business Profiles', 'New businesses launching in Southeast Texas', 'Contractors targeting specific neighborhoods', 'Any business losing leads to online competitors'],
        features: ['Google Business Profile setup and optimization', 'Local keyword research and targeting', 'Citation building across 50+ directories', 'Monthly ranking and traffic reports', 'Competitor analysis included'],
    },
}

// Generate all 21 static pages at build time
export async function generateStaticParams() {
    const params = []
    Object.keys(CITIES).forEach(city => {
        Object.keys(SERVICES).forEach(service => {
            params.push({ city, service })
        })
    })
    return params
}

export async function generateMetadata({ params }) {
    const { city: citySlug, service: serviceSlug } = await params
    const city = CITIES[citySlug]
    const service = SERVICES[serviceSlug]
    if (!city || !service) return {}

    return {
        title: `${service.headline} in ${city.name}`,
        description: `Professional ${service.name.toLowerCase()} for businesses in ${city.name}. Custom design, fast turnaround, QR code tracking included. Get a free quote from Pixel & Panel.`,
        alternates: {
            canonical: `/service-area/${citySlug}/${serviceSlug}`,
        },
        keywords: service.keywords.map(k => `${k} ${city.name}`).join(', '),
    }
}

export default async function ServiceAreaPage({ params }) {
    const { city: citySlug, service: serviceSlug } = await params
    const city = CITIES[citySlug]
    const service = SERVICES[serviceSlug]

    if (!city || !service) return notFound()

    return (
        <>

            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #0C1E3C 0%, #0369A1 100%)',
                padding: '7rem 1.5rem 4rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
                    backgroundSize: '36px 36px',
                    pointerEvents: 'none',
                }} />
                <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block',
                        background: 'rgba(245,158,11,0.15)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        borderRadius: '100px',
                        padding: '0.4rem 1.25rem',
                        color: '#FCD34D',
                        fontSize: '0.8rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '1.5rem',
                    }}>
                        {city.name}
                    </span>
                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 900,
                        color: 'white',
                        fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                        lineHeight: 1.1,
                        marginBottom: '1.25rem',
                    }}>
                        {service.headline} in {city.name}
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        marginBottom: '2rem',
                        maxWidth: '620px',
                        margin: '0 auto 2rem',
                    }}>
                        Professional {service.name.toLowerCase()} for businesses in {city.name} and {city.nearby}.
                        Custom design, fast turnaround, and QR code tracking included on every order.
                    </p>
                    <Link href="/quote-request" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#F59E0B',
                        color: '#1C1917',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '1rem 2rem',
                        borderRadius: '0.875rem',
                        textDecoration: 'none',
                    }}>
                        Get a Free Quote <ArrowRight size={15} />
                    </Link>
                </div>
            </section>

            {/* Main Content */}
            <section style={{ padding: '5rem 1.5rem', backgroundColor: '#FAF8F4' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                        {/* Left: Service info */}
                        <div>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: '#1C1917', fontSize: '1.75rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                                {service.name} in {city.name}
                            </h2>
                            <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                                {service.what}
                            </p>
                            <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', lineHeight: 1.75, marginBottom: '2rem' }}>
                                {service.why}
                            </p>

                            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#1C1917', fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Who uses {service.name.toLowerCase()} in {city.name}?
                            </h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '2rem' }}>
                                {service.useCases.map((u) => (
                                    <li key={u} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#475569', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                                        <CheckCircle size={16} color="#0369A1" style={{ flexShrink: 0 }} />
                                        {u}
                                    </li>
                                ))}
                            </ul>

                            <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', lineHeight: 1.75, fontSize: '0.95rem' }}>
                                {city.blurb} Pixel &amp; Panel serves businesses across {city.name}, {city.nearby} — delivering professional {service.name.toLowerCase()} with fast turnaround and no storefront overhead.
                            </p>
                        </div>

                        {/* Right: Features + CTA */}
                        <div>
                            <div style={{
                                background: '#0C1E3C',
                                borderRadius: '1.25rem',
                                padding: '2rem',
                                marginBottom: '1.5rem',
                            }}>
                                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: 'white', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                                    What&apos;s included
                                </h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                                    {service.features.map((f) => (
                                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                                <CheckCircle size={12} color="#F59E0B" />
                                            </span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact CTA */}
                            <div style={{
                                background: 'white',
                                borderRadius: '1.25rem',
                                padding: '2rem',
                                border: '1px solid #f1f5f9',
                            }}>
                                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#1C1917', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                    Serving {city.name} Businesses
                                </h3>
                                <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                    Get a free quote for {service.name.toLowerCase()} in {city.name}. We respond within 1 business day.
                                </p>
                                <Link href="/quote-request" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    background: '#F59E0B',
                                    color: '#1C1917',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.875rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    padding: '0.875rem',
                                    borderRadius: '0.75rem',
                                    textDecoration: 'none',
                                    marginBottom: '1rem',
                                }}>
                                    Get a Free Quote <ArrowRight size={14} />
                                </Link>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                    <a href="tel:+14098006139" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369A1', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                                        <Phone size={15} /> (409) 800-6139
                                    </a>
                                    <a href="mailto:hello@pixelnpanel.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369A1', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                                        <Mail size={15} /> hello@pixelnpanel.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related services */}
            <section style={{ padding: '3rem 1.5rem 5rem', backgroundColor: '#f8fafc' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, color: '#1C1917', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                        More Services in {city.name}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {Object.entries(SERVICES)
                            .filter(([slug]) => slug !== serviceSlug)
                            .slice(0, 6)
                            .map(([slug, svc]) => (
                                <Link key={slug} href={`/service-area/${citySlug}/${slug}`} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.625rem',
                                    background: 'white',
                                    border: '1px solid #f1f5f9',
                                    borderRadius: '0.75rem',
                                    padding: '0.875rem 1rem',
                                    textDecoration: 'none',
                                    color: '#1C1917',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    transition: 'border-color 0.2s',
                                }}>
                                    <span>{svc.icon}</span>
                                    {svc.name} in {city.name}
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </>
    )
}
