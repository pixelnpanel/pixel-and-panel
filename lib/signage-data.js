// lib/signage-data.js
// Single source of truth for all signage categories and products.
// Edit here — hub page and all category pages update automatically.

export const signageCategories = [
    {
        slug: 'exterior-signs',
        name: 'Exterior Signs',
        tagline: 'Put Your Brand Where Everyone Can See It',
        description:
            'Professional exterior signs designed to make businesses visible, recognizable, and easy to find. Ideal for storefronts, offices, restaurants, retail spaces, and commercial buildings.',
        imageStyle: 'Daytime storefront photo showing illuminated channel letters on a commercial facade',
        placeholderBg: '#0F2A6B',
        seo: {
            title: 'Exterior Signs Beaumont TX | Channel Letters & Storefront Signs | Pixel & Panel',
            description:
                'Custom exterior signs for businesses in Beaumont, Port Arthur, and Orange TX. Channel letters, building signs, and dimensional logos. Get a free quote from Pixel & Panel.',
            h1: 'Exterior Signs for Beaumont TX Businesses',
        },
        products: [
            {
                slug: 'channel-letters',
                name: 'Channel Letters',
                description:
                    'Custom 3D letters individually fabricated from aluminum and acrylic for bold, day-and-night brand visibility on any commercial building.',
                bestFor: 'Retail storefronts, restaurants, hotels, medical offices, professional buildings',
                imagePlaceholder: 'Channel Letters — mounted on storefront facade, daytime close-up',
            },
            {
                slug: 'led-channel-letters',
                name: 'LED Channel Letters',
                description:
                    'Internally illuminated 3D letters powered by energy-efficient LED modules that keep your business visible and branded after dark.',
                bestFor: 'Businesses with evening hours, bars, gyms, urgent care centers, entertainment venues',
                imagePlaceholder: 'LED Channel Letters — illuminated at dusk, mounted on building',
            },
            {
                slug: 'reverse-lit-channel-letters',
                name: 'Reverse-Lit Channel Letters',
                description:
                    'Halo-lit letters that cast a soft glow behind each character, creating a premium upscale look that stands out in any lighting condition.',
                bestFor: 'Law firms, financial offices, luxury retail, high-end restaurants, boutique brands',
                imagePlaceholder: 'Reverse-Lit Letters — nighttime halo glow effect on dark wall',
            },
            {
                slug: 'raceway-mounted-letters',
                name: 'Raceway-Mounted Letters',
                description:
                    'Channel letters pre-mounted on a metal raceway housing for simplified installation — ideal for brick, concrete, or uneven wall surfaces.',
                bestFor: 'Multi-tenant buildings, landlord-required clean installations, quick setups on uneven walls',
                imagePlaceholder: 'Raceway Letters — clean horizontal mounting on brick facade',
            },
            {
                slug: 'flat-cut-letters',
                name: 'Flat Cut Letters',
                description:
                    'Precision-cut dimensional letters from aluminum, acrylic, PVC, or foam board — bold and ready to mount on any indoor or outdoor surface.',
                bestFor: 'Lobbies, office entrances, monument signs, branded walls, and outdoor identification signs',
                imagePlaceholder: 'Flat Cut Letters — brushed metal letters on an office lobby wall',
            },
            {
                slug: 'dimensional-logo-signs',
                name: 'Dimensional Logo Signs',
                description:
                    'Your logo brought to life as a raised, three-dimensional mounted sign — precision-cut and finished to match your exact brand colors and materials.',
                bestFor: 'Lobbies, reception areas, storefront entrances, trade show backdrops, brand walls',
                imagePlaceholder: 'Dimensional Logo Sign — 3D brand mark mounted on interior wall',
            },
            {
                slug: 'building-signs',
                name: 'Building Signs',
                description:
                    'Large-format signs designed for maximum visibility from a distance — installed on building facades, parapets, rooftops, or above storefronts.',
                bestFor: 'Shopping centers, warehouse businesses, industrial facilities, multi-building campuses',
                imagePlaceholder: 'Building Sign — large format sign on commercial building exterior',
            },
            {
                slug: 'storefront-signs',
                name: 'Storefront Signs',
                description:
                    'Custom signage panels, hanging signs, and fascia displays that identify your business and create an inviting first impression at street level.',
                bestFor: 'Retail stores, salons, boutiques, restaurants, service businesses in strip centers',
                imagePlaceholder: 'Storefront Sign — branded panel sign above retail shop entrance',
            },
        ],
    },
    {
        slug: 'banners',
        name: 'Banners',
        tagline: 'Big Visibility at a Fraction of the Cost',
        description:
            'Custom banners for promotions, events, storefronts, schools, churches, construction sites, and outdoor advertising. Available in different materials and finishes based on location and purpose.',
        imageStyle: 'Outdoor banner hanging on a building or fence, full-color branded design',
        placeholderBg: '#0369A1',
        seo: {
            title: 'Custom Banners Beaumont TX | Vinyl, Mesh & Event Banners | Pixel & Panel',
            description:
                'Full-color custom banners for events, grand openings, storefronts, and promotions in Beaumont, Port Arthur, and Orange TX. Fast turnaround. Get a free quote.',
            h1: 'Custom Banners for Beaumont TX Events & Businesses',
        },
        products: [
            {
                slug: 'vinyl-banners',
                name: 'Vinyl Banners',
                description:
                    'Durable full-color banners printed on 13oz or 18oz vinyl for promotions, events, storefronts, and outdoor advertising. Custom sizes with hemmed edges and grommets.',
                bestFor: 'Grand openings, seasonal sales, events, schools, churches, construction site branding',
                imagePlaceholder: 'Vinyl Banner — outdoor installation on fence or building, full-color',
            },
            {
                slug: 'heavy-duty-banners',
                name: 'Heavy-Duty Banners',
                description:
                    'Reinforced banners made from 18oz or heavier vinyl built to withstand high-wind outdoor conditions and long-term exposure without fading.',
                bestFor: 'Outdoor events, construction sites, industrial facilities, coastal or high-wind locations',
                imagePlaceholder: 'Heavy-Duty Banner — mounted outdoors in wind, showing durability',
            },
            {
                slug: 'mesh-banners',
                name: 'Mesh Banners',
                description:
                    'Perforated vinyl banners that allow wind to pass through — reducing stress on the material, ideal for fences, scaffolding, and outdoor structures.',
                bestFor: 'Construction fences, chain-link fences, building scaffolding, rooftop banners',
                imagePlaceholder: 'Mesh Banner — installed on chain-link fence outdoors',
            },
            {
                slug: 'backlit-banners',
                name: 'Backlit Banners',
                description:
                    'Translucent fabric or film banners printed for use inside light boxes — delivering vivid, glowing color in retail displays and trade show cabinets.',
                bestFor: 'Retail light boxes, airport advertising, mall displays, trade show light cabinets',
                imagePlaceholder: 'Backlit Banner — glowing inside light box in retail environment',
            },
            {
                slug: 'blockout-banners',
                name: 'Blockout Banners',
                description:
                    'Double-sided banners printed on opaque material that completely blocks light bleed, keeping each side crisp and clean — indoors or out.',
                bestFor: 'Street banners, double-sided retail displays, locations with light behind the banner',
                imagePlaceholder: 'Blockout Banner — hanging double-sided between poles outdoors',
            },
            {
                slug: 'indoor-banners',
                name: 'Indoor Banners',
                description:
                    'Lightweight, vibrant fabric or vinyl banners designed for interior use in retail spaces, gyms, schools, offices, and event venues.',
                bestFor: 'Retail interiors, gymnasiums, churches, schools, office lobbies, event halls',
                imagePlaceholder: 'Indoor Banner — hanging in a retail store or gym interior',
            },
            {
                slug: 'pole-banners',
                name: 'Pole Banners',
                description:
                    'Vertical banners mounted on light poles or bracket hardware for street-level branding along roadways, parking lots, and event venues.',
                bestFor: 'Shopping centers, car dealerships, university campuses, event venue corridors',
                imagePlaceholder: 'Pole Banner — vertical banner mounted on light pole along street',
            },
            {
                slug: 'fabric-banners',
                name: 'Fabric Banners',
                description:
                    'High-resolution dye-sublimation printed fabric banners with a premium look and feel — lightweight, wrinkle-resistant, and easy to hang.',
                bestFor: 'Trade shows, corporate events, retail environments, church services, fine dining',
                imagePlaceholder: 'Fabric Banner — dye-sub printed hanging fabric in event venue',
            },
            {
                slug: 'handheld-banners',
                name: 'Handheld Banners',
                description:
                    'Compact, lightweight banners attached to a stick or pole for use during parades, sporting events, rallies, and promotional activations.',
                bestFor: 'Sports events, parades, school spirit events, product launch promotions',
                imagePlaceholder: 'Handheld Banners — crowd holding branded signs at outdoor event',
            },
        ],
    },
    {
        slug: 'yard-real-estate-signs',
        name: 'Yard & Real Estate Signs',
        tagline: 'Claim Your Corner. Promote Your Listing.',
        description:
            'Affordable and effective signs for lawns, roadsides, property listings, open houses, events, and local advertising. Great for temporary and high-visibility promotions.',
        imageStyle: 'H-stake yard sign in a green lawn, well-lit, showing full-color printed design',
        placeholderBg: '#166534',
        seo: {
            title: 'Yard Signs & Real Estate Signs Beaumont TX | Pixel & Panel',
            description:
                'Custom yard signs and real estate signs for Beaumont, Port Arthur, and Orange TX. Coroplast signs, post signs, open house signs, and more. Get a free quote.',
            h1: 'Yard Signs & Real Estate Signs in Beaumont TX',
        },
        products: [
            {
                slug: 'yard-signs',
                name: 'Yard Signs',
                description:
                    'Full-color coroplast signs in standard and custom sizes — lightweight, weather-resistant, and ready to install with H-stakes on any lawn or roadside.',
                bestFor: 'Local advertising, political campaigns, event promotions, garage sales, community announcements',
                imagePlaceholder: 'Yard Sign — coroplast sign with H-stake in residential lawn',
            },
            {
                slug: 'h-stake-signs',
                name: 'H-Stake Signs',
                description:
                    'Galvanized wire H-stakes sold with or without printed sign panels — the standard installation hardware for lawn and roadside signs.',
                bestFor: 'Yard sign installations, real estate listings, event directional signs, temporary roadside promotions',
                imagePlaceholder: 'H-Stake Sign — wire stake with sign in ground, close-up',
            },
            {
                slug: 'real-estate-yard-signs',
                name: 'Real Estate Yard Signs',
                description:
                    'Custom-branded coroplast signs for property listings — designed with agent name, brokerage logo, phone number, and QR code for instant digital lead capture.',
                bestFor: 'Residential listings, commercial properties, rental properties, for-sale-by-owner',
                imagePlaceholder: 'Real Estate Yard Sign — branded listing sign in front of home',
            },
            {
                slug: 'real-estate-post-signs',
                name: 'Real Estate Post Signs',
                description:
                    'Durable aluminum or PVC sign panels mounted on wooden or metal post frames for long-term property listing visibility.',
                bestFor: 'Residential listings, commercial properties, vacant land, long-term listings',
                imagePlaceholder: 'Real Estate Post Sign — post-mounted listing sign in front yard',
            },
            {
                slug: 'open-house-signs',
                name: 'Open House Signs',
                description:
                    'Bright, attention-grabbing signs designed to direct traffic to open house events — available as single-use or reusable formats with interchangeable date panels.',
                bestFor: 'Real estate agents, property developers, weekend open houses, new community sales centers',
                imagePlaceholder: 'Open House Sign — directional arrow sign on street corner',
            },
            {
                slug: 'real-estate-riders',
                name: 'Real Estate Riders',
                description:
                    'Smaller supplemental sign panels that attach below a main real estate sign to add agent name, contact details, or sold/under-contract status.',
                bestFor: 'Realtor branding, contact info, open house add-ons, status updates',
                imagePlaceholder: 'Real Estate Rider — small panel attached below main listing sign',
            },
            {
                slug: 'real-estate-a-frames',
                name: 'Real Estate A-Frames',
                description:
                    'Portable A-frame sign holders with custom printed panels — ideal for directing buyers at intersections during open house events.',
                bestFor: 'Open house traffic direction, neighborhood entry points, short-term roadside promotions',
                imagePlaceholder: 'Real Estate A-Frame — branded A-frame at neighborhood intersection',
            },
            {
                slug: 'directional-signs',
                name: 'Directional Signs',
                description:
                    'Arrow-style printed signs in coroplast or aluminum used to guide customers, guests, or attendees from the road directly to your location.',
                bestFor: 'Events, open houses, farms, industrial facilities, outdoor venues, weekend markets',
                imagePlaceholder: 'Directional Signs — arrow signs leading down a street toward venue',
            },
        ],
    },
    {
        slug: 'rigid-signs',
        name: 'Rigid Signs',
        tagline: 'Solid Signs Built to Last',
        description:
            'Durable printed signs made from coroplast, PVC, aluminum composite, acrylic, foam board, and metal. Built for indoor and outdoor signage that needs to hold up over time.',
        imageStyle: 'Aluminum composite or PVC sign panel, professionally printed and mounted on wall or post',
        placeholderBg: '#1F2937',
        seo: {
            title: 'Rigid Signs Beaumont TX | Aluminum, PVC & Acrylic Signs | Pixel & Panel',
            description:
                'Custom rigid signs for indoor and outdoor use in Beaumont, Port Arthur, and Orange TX. Aluminum composite, PVC, acrylic, and metal signs. Get a free quote.',
            h1: 'Rigid Signs for Businesses in Beaumont TX',
        },
        products: [
            {
                slug: 'coroplast-signs',
                name: 'Coroplast Signs',
                description:
                    'Lightweight corrugated plastic signs that are weather-resistant and cost-effective — perfect for short-to-medium term outdoor and indoor signage.',
                bestFor: 'Yard signs, event signage, indoor directional signs, temporary notices, promotional displays',
                imagePlaceholder: 'Coroplast Sign — printed corrugated plastic panel on stake or wall',
            },
            {
                slug: 'pvc-signs',
                name: 'PVC Signs',
                description:
                    'Smooth, rigid PVC foam board signs offering a clean, professional finish — ideal for indoor and semi-outdoor applications where appearance matters.',
                bestFor: 'Office signs, lobby displays, indoor wayfinding, real estate signage, trade show displays',
                imagePlaceholder: 'PVC Sign — smooth white PVC panel with printed design, wall mounted',
            },
            {
                slug: 'aluminum-composite-signs',
                name: 'Aluminum Composite Signs',
                description:
                    'Lightweight yet rigid ACM signs with a premium finish — weather-resistant and built for long-term outdoor installations that need to last for years.',
                bestFor: 'Outdoor business signs, parking signs, property identification, construction site signs',
                imagePlaceholder: 'Aluminum Composite Sign — mounted on post outside commercial building',
            },
            {
                slug: 'acrylic-signs',
                name: 'Acrylic Signs',
                description:
                    'Clear or colored acrylic signs with laser-cut edges and printed or engraved content — delivering a premium, modern look for professional environments.',
                bestFor: 'Office nameplates, lobby signs, door signs, awards, medical and dental office signage',
                imagePlaceholder: 'Acrylic Sign — backlit acrylic panel mounted on office wall',
            },
            {
                slug: 'foam-board-signs',
                name: 'Foam Board Signs',
                description:
                    'Lightweight foam core signs with a smooth printed surface — fast to produce and easy to handle, best suited for short-term indoor applications.',
                bestFor: 'Event signage, presentations, point-of-sale displays, temporary indoor notices',
                imagePlaceholder: 'Foam Board Sign — printed sign on easel in retail or event setting',
            },
            {
                slug: 'gator-board-signs',
                name: 'Gator Board Signs',
                description:
                    'High-density foam board with a rigid plastic facing — more durable than standard foam board with a premium surface finish for demanding indoor applications.',
                bestFor: 'Trade show graphics, museum displays, retail signage, long-term indoor exhibits',
                imagePlaceholder: 'Gator Board Sign — thick rigid sign displayed in trade show booth',
            },
            {
                slug: 'metal-signs',
                name: 'Metal Signs',
                description:
                    'Full-color printed aluminum or steel signs offering the highest durability for permanent outdoor and indoor installations built to last for years.',
                bestFor: 'Facility identification, parking signs, traffic control, property markers, government signage',
                imagePlaceholder: 'Metal Sign — aluminum sign mounted on post in outdoor facility',
            },
            {
                slug: 'magnetic-signs',
                name: 'Magnetic Signs',
                description:
                    'Flexible magnetic sign panels that adhere to vehicle doors, refrigerators, and metal surfaces — great for removable branding without permanent adhesive.',
                bestFor: 'Vehicle door branding, removable truck advertising, contractor vehicle identification',
                imagePlaceholder: 'Magnetic Sign — branded magnet on car door panel',
            },
        ],
    },
    {
        slug: 'vinyl-decals-graphics',
        name: 'Vinyl Decals & Graphics',
        tagline: 'Stick Your Brand on Anything',
        description:
            'Custom decals, labels, stickers, and adhesive graphics for windows, walls, vehicles, equipment, packaging, floors, and promotional use.',
        imageStyle: 'Close-up of vinyl decal being applied to glass or equipment, showing precision',
        placeholderBg: '#5B21B6',
        seo: {
            title: 'Custom Vinyl Decals & Graphics Beaumont TX | Pixel & Panel',
            description:
                'Custom vinyl decals, adhesive graphics, floor graphics, product labels, and stickers for businesses in Beaumont, Port Arthur, and Orange TX. Get a free quote.',
            h1: 'Custom Vinyl Decals & Graphics in Beaumont TX',
        },
        products: [
            {
                slug: 'vinyl-decals',
                name: 'Vinyl Decals',
                description:
                    'Precision-cut adhesive vinyl graphics in any shape, size, or color — designed for clean, professional application on smooth surfaces indoors or out.',
                bestFor: 'Window branding, door graphics, equipment identification, branded packaging, vehicle decor',
                imagePlaceholder: 'Vinyl Decal — adhesive graphic applied to glass or smooth surface',
            },
            {
                slug: 'adhesive-vinyl-graphics',
                name: 'Adhesive Vinyl Graphics',
                description:
                    'Full-color printed vinyl graphics with adhesive backing — sized and cut for precise placement on walls, vehicles, equipment, and promotional materials.',
                bestFor: 'Branded wall displays, vehicle panels, equipment graphics, product packaging, in-store promotions',
                imagePlaceholder: 'Adhesive Vinyl Graphic — being applied to vehicle or wall surface',
            },
            {
                slug: 'contour-cut-decals',
                name: 'Contour-Cut Decals',
                description:
                    'Custom die-cut decals cut precisely to the edge of your artwork — eliminating background panels and leaving only the printed design visible.',
                bestFor: 'Logo stickers, product labels, laptop and vehicle branding, promotional giveaways',
                imagePlaceholder: 'Contour-Cut Decal — custom shape sticker on laptop or product',
            },
            {
                slug: 'product-labels',
                name: 'Product Labels',
                description:
                    'Custom printed adhesive labels for product packaging, jars, bottles, boxes, and retail items — available in various shapes, materials, and finishes.',
                bestFor: 'Food and beverage products, cosmetics, handmade goods, retail products, small business packaging',
                imagePlaceholder: 'Product Labels — branded labels on jars, bottles, or packaging',
            },
            {
                slug: 'equipment-labels',
                name: 'Equipment Labels',
                description:
                    'Durable vinyl or polyester labels for machinery, tools, equipment panels, and industrial assets — rated for heat, chemicals, and outdoor exposure.',
                bestFor: 'Industrial facilities, petrochemical plants, manufacturing, construction equipment',
                imagePlaceholder: 'Equipment Label — printed durable label on industrial machinery',
            },
            {
                slug: 'floor-graphics',
                name: 'Floor Graphics',
                description:
                    'Slip-resistant adhesive floor decals for high-traffic areas — printed in full color and laminated with a textured anti-skid overlay for safety.',
                bestFor: 'Retail stores, trade show floors, event venues, warehouses, hospital corridors',
                imagePlaceholder: 'Floor Graphic — branded floor decal in retail store aisle',
            },
            {
                slug: 'wall-decals',
                name: 'Wall Decals',
                description:
                    'Large-format printed or cut vinyl graphics for interior walls — easy to apply and remove without damaging the surface underneath.',
                bestFor: 'Office walls, retail interiors, restaurant decor, school environments, event backdrops',
                imagePlaceholder: 'Wall Decal — large vinyl graphic applied to interior office wall',
            },
            {
                slug: 'custom-stickers',
                name: 'Custom Stickers',
                description:
                    'Full-color stickers printed on durable vinyl in any shape — popular for branding, promotions, giveaways, product packaging, and merchandise.',
                bestFor: 'Branded giveaways, product packaging, event swag, laptop branding, customer gifts',
                imagePlaceholder: 'Custom Stickers — sheet of branded stickers, close-up detail',
            },
        ],
    },
    {
        slug: 'vehicle-graphics',
        name: 'Vehicle Graphics',
        tagline: 'Turn Every Drive Into a Moving Billboard',
        description:
            'Vehicle branding solutions that turn cars, trucks, trailers, and fleets into moving advertisements. Built for service businesses, contractors, delivery vehicles, and mobile brands.',
        imageStyle: 'Work truck or van with full or partial vehicle wrap, parked in front of commercial location',
        placeholderBg: '#78350F',
        seo: {
            title: 'Vehicle Wraps & Graphics Beaumont TX | Fleet Branding | Pixel & Panel',
            description:
                'Custom vehicle graphics, full wraps, fleet branding, and DOT lettering for businesses in Beaumont, Port Arthur, and Orange TX. Turn your vehicles into moving billboards. Get a quote.',
            h1: 'Vehicle Graphics & Wraps in Beaumont TX',
        },
        products: [
            {
                slug: 'vehicle-lettering',
                name: 'Vehicle Lettering',
                description:
                    'Cut or printed vinyl letters and text applied directly to vehicle panels — a cost-effective way to add your business name, number, and services to any vehicle.',
                bestFor: 'Service vans, contractor trucks, food trucks, small business vehicles, delivery vehicles',
                imagePlaceholder: 'Vehicle Lettering — contact info and business name on service van side',
            },
            {
                slug: 'vehicle-magnets',
                name: 'Vehicle Magnets',
                description:
                    'Removable magnetic vehicle panels that let you brand your personal vehicle during business hours and remove them after — no permanent commitment required.',
                bestFor: 'Part-time service businesses, contractors, real estate agents, personal vehicles used for work',
                imagePlaceholder: 'Vehicle Magnets — pair of door magnets on pickup truck doors',
            },
            {
                slug: 'vehicle-decals',
                name: 'Vehicle Decals',
                description:
                    'Printed or cut adhesive graphics for vehicle doors, windows, hoods, and panels — UV-resistant, durable, and professionally finished.',
                bestFor: 'Branded vehicles, logo placement, contact decals, window perf, fleet identification',
                imagePlaceholder: 'Vehicle Decal — printed graphic applied to truck door panel',
            },
            {
                slug: 'partial-vehicle-wraps',
                name: 'Partial Vehicle Wraps',
                description:
                    'High-impact vinyl wrap covering a portion of the vehicle — typically doors, hood, or rear panels — for maximum visual effect at a lower investment than a full wrap.',
                bestFor: 'Businesses wanting a big visual upgrade without full wrap budget, food trucks, contractor vans',
                imagePlaceholder: 'Partial Wrap — graphic wrap covering door and rear panel of work van',
            },
            {
                slug: 'full-vehicle-wraps',
                name: 'Full Vehicle Wraps',
                description:
                    'Complete 360° vinyl wrap covering every panel of the vehicle — turning it into a moving billboard with maximum brand exposure wherever it travels.',
                bestFor: 'Service companies, food trucks, mobile businesses, brand launches, fleet campaigns',
                imagePlaceholder: 'Full Vehicle Wrap — fully wrapped commercial van with complete branding',
            },
            {
                slug: 'trailer-graphics',
                name: 'Trailer Graphics',
                description:
                    'Large-format vinyl graphics designed for enclosed trailers, flatbeds, and semi-trailers — built to withstand highway speeds, weather, and long-term outdoor exposure.',
                bestFor: 'Trucking companies, contractors with enclosed trailers, event production, equipment haulers',
                imagePlaceholder: 'Trailer Graphics — branded enclosed trailer on highway or job site',
            },
            {
                slug: 'fleet-graphics',
                name: 'Fleet Graphics',
                description:
                    'Consistent branding applied across multiple vehicles so your entire fleet looks unified, professional, and instantly recognizable by anyone who sees it.',
                bestFor: 'Delivery companies, HVAC, plumbing, electrical, landscaping, and municipal fleets',
                imagePlaceholder: 'Fleet Graphics — row of uniformly branded service vehicles in parking lot',
            },
            {
                slug: 'dot-compliance-lettering',
                name: 'DOT & Compliance Lettering',
                description:
                    'Federally required identification lettering for commercial vehicles — USDOT numbers, company name, state registration, and GVWR applied to legal spec.',
                bestFor: 'Commercial trucks, CDL vehicles, freight companies, construction fleets, DOT-regulated vehicles',
                imagePlaceholder: 'DOT Lettering — compliance text on commercial truck door panel',
            },
        ],
    },
    {
        slug: 'window-wall-graphics',
        name: 'Window & Wall Graphics',
        tagline: 'Every Surface Is a Branding Opportunity',
        description:
            'Custom graphics for storefront windows, office glass, interior walls, lobby areas, conference rooms, and branded environments. Transform blank surfaces into brand statements.',
        imageStyle: 'Storefront window with professionally printed vinyl graphics showing logo and hours',
        placeholderBg: '#0E7490',
        seo: {
            title: 'Window Graphics & Wall Murals Beaumont TX | Pixel & Panel',
            description:
                'Custom storefront window graphics, wall murals, privacy film, and office branding in Beaumont, Port Arthur, and Orange TX. Get a free quote from Pixel & Panel.',
            h1: 'Window & Wall Graphics for Beaumont TX Businesses',
        },
        products: [
            {
                slug: 'storefront-window-graphics',
                name: 'Storefront Window Graphics',
                description:
                    'Full-color printed vinyl graphics applied to exterior glass — displaying your logo, hours, and promotions to every person who walks or drives past.',
                bestFor: 'Retail stores, restaurants, salons, medical offices, banks, any business with street-facing windows',
                imagePlaceholder: 'Storefront Window Graphic — branded vinyl design on shop window',
            },
            {
                slug: 'window-lettering',
                name: 'Window Lettering',
                description:
                    'Cut vinyl or printed text applied to glass surfaces for hours, business name, phone number, and simple messaging — clean, professional, easy to update.',
                bestFor: 'Business hours, contact information, door lettering, glass office partitions',
                imagePlaceholder: 'Window Lettering — store hours and logo in vinyl on glass door',
            },
            {
                slug: 'perforated-window-graphics',
                name: 'Perforated Window Graphics',
                description:
                    'One-way vision window film printed with full-color graphics — those outside see your design while those inside keep a clear view through the window.',
                bestFor: 'Vehicle rear windows, full-window storefront coverage, privacy with branding',
                imagePlaceholder: 'Perforated Window Graphic — full window design visible from outside',
            },
            {
                slug: 'frosted-privacy-film',
                name: 'Frosted Privacy Film',
                description:
                    'Etched glass-effect vinyl film that diffuses visibility while allowing light through — elegant, professional, and ideal for privacy without darkness.',
                bestFor: 'Conference room glass, office partitions, medical exam rooms, bathroom windows',
                imagePlaceholder: 'Frosted Privacy Film — frosted vinyl on glass with logo etched in',
            },
            {
                slug: 'clear-window-decals',
                name: 'Clear Window Decals',
                description:
                    'Printed decals on clear vinyl that adheres flat to glass — giving your graphics a clean, printed-on-glass appearance without covering surrounding areas.',
                bestFor: 'Logo placement on glass doors, window promotions, specials announcements',
                imagePlaceholder: 'Clear Window Decal — logo decal on clear glass entrance door',
            },
            {
                slug: 'static-cling-graphics',
                name: 'Static Cling Graphics',
                description:
                    'Repositionable, non-adhesive vinyl clings that stick to glass without leaving residue — easily updated for seasonal promotions and temporary messaging.',
                bestFor: 'Seasonal promotions, restaurant specials, retail window messaging, temporary event announcements',
                imagePlaceholder: 'Static Cling — promotional cling on retail store window display',
            },
            {
                slug: 'wall-graphics',
                name: 'Wall Graphics',
                description:
                    'Custom printed or cut vinyl graphics sized for accent walls, branded environments, and interior visual storytelling in any business space.',
                bestFor: 'Office culture walls, gym motivation walls, restaurant decor, retail accent walls',
                imagePlaceholder: 'Wall Graphic — large vinyl design on interior feature wall',
            },
            {
                slug: 'wall-murals',
                name: 'Wall Murals',
                description:
                    'Full-wall printed murals on fabric or vinyl media — transforming a blank wall into a bold, high-resolution visual statement for any business.',
                bestFor: 'Restaurant dining rooms, hotel lobbies, retail feature walls, school hallways, corporate HQ',
                imagePlaceholder: 'Wall Mural — full-size printed mural on restaurant or office wall',
            },
            {
                slug: 'lobby-wall-signs',
                name: 'Lobby Wall Signs',
                description:
                    'Branded signage installations for reception areas — combining dimensional letters, graphics, and your logo into a cohesive first impression.',
                bestFor: 'Corporate offices, medical centers, law firms, hotel lobbies, financial institutions',
                imagePlaceholder: 'Lobby Wall Sign — dimensional letters and logo on office reception wall',
            },
            {
                slug: 'office-branding-graphics',
                name: 'Office Branding Graphics',
                description:
                    'Complete interior branding packages for offices and commercial spaces — covering walls, glass, doors, and conference rooms with consistent branded visuals.',
                bestFor: 'Startups, corporate offices, co-working spaces, professional service firms',
                imagePlaceholder: 'Office Branding — branded graphics throughout open office environment',
            },
        ],
    },
    {
        slug: 'flags-outdoor-displays',
        name: 'Flags & Outdoor Displays',
        tagline: 'Stand Tall. Get Noticed From the Road.',
        description:
            'Eye-catching outdoor displays for storefronts, events, sales, grand openings, roadside promotions, and brand visibility. Built to fly in Texas weather.',
        imageStyle: 'Feather flags flying outside a business entrance, full-color printed designs',
        placeholderBg: '#991B1B',
        seo: {
            title: 'Custom Flags & Outdoor Displays Beaumont TX | Pixel & Panel',
            description:
                'Custom feather flags, teardrop flags, pole flags, and outdoor display hardware for businesses in Beaumont, Port Arthur, and Orange TX. Get a free quote.',
            h1: 'Custom Flags & Outdoor Displays in Beaumont TX',
        },
        products: [
            {
                slug: 'feather-flags',
                name: 'Feather Flags',
                description:
                    'Tall, curved dye-sublimation printed fabric flags that flutter in the breeze and instantly draw attention to your location from a distance.',
                bestFor: 'Storefronts, grand openings, car lots, roadside promotions, events, churches, restaurants',
                imagePlaceholder: 'Feather Flag — flag flying outside retail business entrance',
            },
            {
                slug: 'teardrop-flags',
                name: 'Teardrop Flags',
                description:
                    'Teardrop-shaped flags with a taut fabric panel that stays fully visible in all wind conditions — keeping your message readable at all times.',
                bestFor: 'Events, trade shows, outdoor promotions, auto dealerships, food trucks, roadside advertising',
                imagePlaceholder: 'Teardrop Flag — branded teardrop flag outside event or business',
            },
            {
                slug: 'rectangle-flags',
                name: 'Rectangle Flags',
                description:
                    'Traditional rectangular flag style on a swooping aluminum or fiberglass pole — a clean, structured option for branded outdoor displays.',
                bestFor: 'Corporate campuses, outdoor events, business entrances, flagpole displays',
                imagePlaceholder: 'Rectangle Flag — rectangular flag on outdoor pole at event',
            },
            {
                slug: 'angled-flags',
                name: 'Angled Flags',
                description:
                    'Flags mounted on an angled arm extending from a ground stake or base — angled forward for maximum visibility at eye level from the street.',
                bestFor: 'Storefronts, sidewalk promotions, parking lot advertising, car washes, quick-serve restaurants',
                imagePlaceholder: 'Angled Flag — angled flag extending from ground stake at business',
            },
            {
                slug: 'pole-flags',
                name: 'Pole Flags',
                description:
                    'Custom printed flags sized for standard flagpoles — representing your brand, community, or organization at full height and professional scale.',
                bestFor: 'Businesses with existing flagpoles, corporate campuses, schools, government buildings',
                imagePlaceholder: 'Pole Flag — custom flag flying on full-height flagpole',
            },
            {
                slug: 'stock-message-flags',
                name: 'Stock Message Flags',
                description:
                    'Pre-printed flags with standard promotional messages — Open, Sale, Grand Opening, Now Hiring — available for fast turnaround when you need it quickly.',
                bestFor: 'Small businesses needing fast outdoor messaging, seasonal sales, hiring announcements',
                imagePlaceholder: 'Stock Message Flag — "Grand Opening" flag flying outside new business',
            },
            {
                slug: 'flag-hardware',
                name: 'Flag Hardware',
                description:
                    'Ground stakes, weighted bases, pole sets, and mounting hardware for all flag styles — sold as complete kits or individual replacement components.',
                bestFor: 'New flag installations, hardware replacements, permanent flag display bases, indoor options',
                imagePlaceholder: 'Flag Hardware — ground stake, base, and pole kit on neutral background',
            },
        ],
    },
    {
        slug: 'a-frames-sidewalk-signs',
        name: 'A-Frames & Sidewalk Signs',
        tagline: 'Bring Customers Off the Sidewalk and Through Your Door',
        description:
            'Portable sidewalk signs and A-frame displays for restaurants, shops, events, open houses, menus, promotions, and directional signage.',
        imageStyle: 'A-frame sidewalk sign in front of café or retail shop entrance with custom message',
        placeholderBg: '#1E3A8A',
        seo: {
            title: 'A-Frame & Sidewalk Signs Beaumont TX | Pixel & Panel',
            description:
                'Custom A-frame signs and sidewalk displays for restaurants, shops, and events in Beaumont, Port Arthur, and Orange TX. Portable and professional. Get a free quote.',
            h1: 'A-Frame & Sidewalk Signs in Beaumont TX',
        },
        products: [
            {
                slug: 'sidewalk-a-frame-signs',
                name: 'Sidewalk A-Frame Signs',
                description:
                    'Classic two-sided A-frame sign holders with custom printed panels — visible from both directions, portable, and easy to set up every morning.',
                bestFor: 'Restaurants, cafés, retail stores, salons, tax offices, any walk-in business with sidewalk presence',
                imagePlaceholder: 'Sidewalk A-Frame — custom printed A-frame on sidewalk in front of café',
            },
            {
                slug: 'signicade-signs',
                name: 'Signicade Signs',
                description:
                    'Molded plastic A-frame sign holders in a compact, durable form — available in black or white with a channel to hold custom-printed graphic inserts.',
                bestFor: 'Quick-serve restaurants, gas stations, parking lots, event entrances, directional uses',
                imagePlaceholder: 'Signicade — plastic A-frame with printed insert in outdoor setting',
            },
            {
                slug: 'changeable-a-frame-signs',
                name: 'Changeable A-Frame Signs',
                description:
                    'A-frame displays with interchangeable chalkboard, dry-erase, or magnetic panels — update your message daily without reprinting anything.',
                bestFor: 'Restaurants posting daily specials, retailers with rotating promotions, event venues',
                imagePlaceholder: 'Changeable A-Frame — chalkboard A-frame with daily special outside restaurant',
            },
            {
                slug: 'metal-a-frame-signs',
                name: 'Metal A-Frame Signs',
                description:
                    'Heavy-duty steel or aluminum A-frame hardware with a premium look and lasting durability — designed for businesses that want a more permanent sidewalk presence.',
                bestFor: 'Upscale restaurants, boutique retailers, commercial real estate, hotel entrances',
                imagePlaceholder: 'Metal A-Frame — brushed metal A-frame sign outside upscale storefront',
            },
            {
                slug: 'menu-board-a-frames',
                name: 'Menu Board A-Frames',
                description:
                    'A-frame signs built to display printed or handwritten menus in a professional, weatherproof format for outdoor dining and quick-serve operations.',
                bestFor: 'Restaurants, food trucks, coffee shops, breweries, outdoor dining, farmers market vendors',
                imagePlaceholder: 'Menu Board A-Frame — outdoor restaurant menu on A-frame near entrance',
            },
            {
                slug: 'a-frame-banner-displays',
                name: 'A-Frame Banner Displays',
                description:
                    'A-frame hardware that holds a printed fabric or vinyl banner panel — the visibility of a standing banner in a compact, portable format.',
                bestFor: 'Events, trade show lobbies, hotel conference areas, outdoor promotions, multi-location retail',
                imagePlaceholder: 'A-Frame Banner Display — fabric banner in portable A-frame at event',
            },
        ],
    },
    {
        slug: 'trade-show-event-displays',
        name: 'Trade Show & Event Displays',
        tagline: 'Show Up Prepared. Stand Out in the Crowd.',
        description:
            'Professional display solutions for trade shows, expos, conferences, vendor booths, product showcases, photo areas, and branded events. Make every booth count.',
        imageStyle: 'Professional trade show booth with backwall display, table, and full branded environment',
        placeholderBg: '#4C1D95',
        seo: {
            title: 'Trade Show Displays & Event Graphics Beaumont TX | Pixel & Panel',
            description:
                'Custom trade show booths, tension fabric displays, pop-up displays, and step-and-repeat backdrops for businesses in Beaumont, Port Arthur, and Orange TX. Get a free quote.',
            h1: 'Trade Show & Event Displays for Beaumont TX Businesses',
        },
        products: [
            {
                slug: 'trade-show-booth-displays',
                name: 'Trade Show Booth Displays',
                description:
                    'Complete booth display systems combining backwall graphics, counters, and accessories into a cohesive branded environment that represents your business with confidence.',
                bestFor: 'Companies exhibiting at trade shows, local expos, chamber events, professional conferences',
                imagePlaceholder: 'Trade Show Booth — complete branded setup on trade show floor',
            },
            {
                slug: '10x10-booth-displays',
                name: '10×10 Booth Displays',
                description:
                    'Complete branded display systems designed for the standard 10-by-10 foot booth space — modular, portable, and setup-ready in under 30 minutes.',
                bestFor: 'Small businesses at trade shows, vendor markets, local expos, chamber business fairs',
                imagePlaceholder: '10×10 Booth — complete branded 10x10 display at trade show',
            },
            {
                slug: '10x20-booth-displays',
                name: '10×20 Booth Displays',
                description:
                    'Expanded booth systems for double-wide spaces — incorporating larger backwalls, sidewalls, and more surface area to tell your full brand story.',
                bestFor: 'Established businesses with large product lines, anchor exhibitors at major expos',
                imagePlaceholder: '10×20 Booth — double-wide branded booth taking full floor space',
            },
            {
                slug: 'tension-fabric-displays',
                name: 'Tension Fabric Displays',
                description:
                    'Lightweight aluminum frame systems with vibrant dye-sub printed fabric stretched tight across the frame — tool-free assembly and a seamless, premium look.',
                bestFor: 'Trade shows, corporate events, hotel lobbies, photoshoots, brand activations',
                imagePlaceholder: 'Tension Fabric Display — backlit fabric display in trade show setting',
            },
            {
                slug: 'pop-up-displays',
                name: 'Pop-Up Displays',
                description:
                    'Expanding arch frame systems with printed graphic panels that pop up quickly and fold into a compact carry case — ideal for traveling exhibitors.',
                bestFor: 'Frequent exhibitors, traveling sales teams, businesses attending multiple shows per year',
                imagePlaceholder: 'Pop-Up Display — curved pop-up backwall with printed graphic panels',
            },
            {
                slug: 'seg-fabric-displays',
                name: 'SEG Fabric Displays',
                description:
                    'Silicone edge graphic systems where printed fabric panels lock into a grooved aluminum frame — producing perfectly flat, seamless display graphics.',
                bestFor: 'Premium trade show booths, airport advertising, retail environments, corporate installs',
                imagePlaceholder: 'SEG Display — seamless fabric backwall in aluminum channel frame',
            },
            {
                slug: 'backlit-seg-displays',
                name: 'Backlit SEG Displays',
                description:
                    'SEG fabric display systems with integrated LED backlighting — creating vivid, glowing graphics that dominate any trade show floor.',
                bestFor: 'High-end exhibitors, tech companies, luxury brands, major trade show appearances',
                imagePlaceholder: 'Backlit SEG Display — glowing LED backlit fabric display at trade show',
            },
            {
                slug: 'step-repeat-backdrops',
                name: 'Step & Repeat Backdrops',
                description:
                    'Branded photo backdrops with repeating logos or patterns — the standard background for event photos, press coverage, and branded photo opportunities.',
                bestFor: 'Award ceremonies, galas, charity events, grand openings, product launches, corporate photo ops',
                imagePlaceholder: 'Step and Repeat Backdrop — branded backdrop at formal event',
            },
            {
                slug: 'trade-show-podiums',
                name: 'Trade Show Podiums',
                description:
                    'Custom-branded podiums and counters for trade show booths — providing a professional presentation surface and branded focal point for booth interaction.',
                bestFor: 'Product demos, lead collection stations, literature displays, brand interaction points',
                imagePlaceholder: 'Trade Show Podium — branded counter with logo in front of booth display',
            },
            {
                slug: 'display-lighting',
                name: 'Display Lighting',
                description:
                    'Clip-on, gooseneck, and arm-mounted LED light kits that illuminate trade show displays and banner stands from above — simple, impactful, essential.',
                bestFor: 'Banner stands, trade show booths without backlighting, display tables in low-light venues',
                imagePlaceholder: 'Display Lighting — LED light clipped to top of banner stand',
            },
        ],
    },
    {
        slug: 'tents-table-covers',
        name: 'Tents & Table Covers',
        tagline: 'Branded From the Canopy Down',
        description:
            'Custom event tents, table covers, runners, and booth branding materials for outdoor events, markets, trade shows, school events, festivals, and business promotions.',
        imageStyle: 'Custom printed tent canopy at outdoor market or festival, branded table throw in front',
        placeholderBg: '#075985',
        seo: {
            title: 'Custom Event Tents & Table Covers Beaumont TX | Pixel & Panel',
            description:
                'Custom printed event tents, table throws, and table covers for outdoor markets, festivals, and trade shows in Beaumont, Port Arthur, and Orange TX. Get a free quote.',
            h1: 'Custom Event Tents & Table Covers in Beaumont TX',
        },
        products: [
            {
                slug: 'custom-event-tents',
                name: 'Custom Event Tents',
                description:
                    'Full custom-printed popup canopy tents in 10×10 or larger sizes — featuring your logo, brand colors, and messaging on the canopy top and valance panels.',
                bestFor: 'Outdoor markets, festivals, sporting events, school fundraisers, grand openings, brand activations',
                imagePlaceholder: 'Custom Event Tent — branded canopy tent at outdoor market or event',
            },
            {
                slug: 'printed-tent-canopies',
                name: 'Printed Tent Canopies',
                description:
                    'Replacement canopy tops with custom full-color printing — fits standard popup tent frames and gives your existing tent a fully branded appearance.',
                bestFor: 'Businesses upgrading an existing frame, event vendors adding branding, faded canopy replacement',
                imagePlaceholder: 'Printed Tent Canopy — full-color custom print on popup tent',
            },
            {
                slug: 'tent-half-walls',
                name: 'Tent Half Walls',
                description:
                    'Custom printed side walls that zip onto tent frames and cover the lower half — adding wind protection, privacy, and valuable branding real estate.',
                bestFor: 'Craft vendors, food booths, outdoor markets, medical or service booths needing partial enclosure',
                imagePlaceholder: 'Tent Half Wall — printed lower side panel attached to event tent',
            },
            {
                slug: 'tent-back-walls',
                name: 'Tent Back Walls',
                description:
                    'Full-height printed back wall panels for popup tents — creating a complete branded backdrop visible from inside and outside the booth.',
                bestFor: 'Trade show tents, brand activation booths, event photo areas, vendor setups needing a backdrop',
                imagePlaceholder: 'Tent Back Wall — full printed back panel on outdoor event tent',
            },
            {
                slug: 'custom-table-throws',
                name: 'Custom Table Throws',
                description:
                    'Full-print fabric table covers designed to drape over 4-foot, 6-foot, or 8-foot tables — creating a professional, fully branded surface for any event.',
                bestFor: 'Trade shows, outdoor markets, school events, brand booths, registration tables',
                imagePlaceholder: 'Custom Table Throw — branded full-print tablecloth on folding table',
            },
            {
                slug: 'table-runners',
                name: 'Table Runners',
                description:
                    'Custom printed fabric runners placed down the center of a table — a refined branding option that works over any tablecloth or plain surface.',
                bestFor: 'Corporate events, upscale product displays, gift tables, conference registration desks',
                imagePlaceholder: 'Table Runner — branded fabric runner on conference table',
            },
            {
                slug: 'stretch-table-covers',
                name: 'Stretch Table Covers',
                description:
                    'Form-fitting stretch fabric covers that wrap snugly around folding tables, eliminating wrinkles and giving a premium, tailored appearance at events.',
                bestFor: 'Professional events, trade shows, product launches, brand activations, award ceremonies',
                imagePlaceholder: 'Stretch Table Cover — fitted printed fabric cover on folding table',
            },
            {
                slug: 'event-table-branding-kits',
                name: 'Event Table Branding Kits',
                description:
                    'Complete branded table setup packages including a custom table throw, runner, and matching accessories — everything you need to show up looking polished.',
                bestFor: 'First-time exhibitors, small businesses building event materials, branded package deals',
                imagePlaceholder: 'Event Branding Kit — complete setup with throw, runner, and accessories',
            },
        ],
    },
    {
        slug: 'posters-large-format',
        name: 'Posters & Large Format Prints',
        tagline: 'Big Prints. Big Impressions.',
        description:
            'Large format print materials for events, promotions, retail displays, presentations, wall décor, announcements, and indoor advertising. Professional quality at any size.',
        imageStyle: 'Large format poster or canvas print displayed in retail, event, or office environment',
        placeholderBg: '#831843',
        seo: {
            title: 'Posters & Large Format Prints Beaumont TX | Pixel & Panel',
            description:
                'Custom posters, canvas prints, large format graphics, and retail display prints for businesses in Beaumont, Port Arthur, and Orange TX. Professional print quality. Get a free quote.',
            h1: 'Posters & Large Format Prints in Beaumont TX',
        },
        products: [
            {
                slug: 'posters',
                name: 'Posters',
                description:
                    'High-resolution full-color posters on paper, glossy, matte, or satin stock — available in standard and custom sizes for events, promotions, and retail use.',
                bestFor: 'Event announcements, concert promotion, retail window displays, school and community events',
                imagePlaceholder: 'Poster — full-color event poster displayed on wall or in window',
            },
            {
                slug: 'large-format-prints',
                name: 'Large Format Prints',
                description:
                    'Wide-format digital prints on paper, vinyl, or fabric media — used for everything from architectural presentations to retail advertising and event displays.',
                bestFor: 'Retail signage, event backgrounds, real estate marketing, corporate presentations',
                imagePlaceholder: 'Large Format Print — wide print displayed in retail or event setting',
            },
            {
                slug: 'canvas-prints',
                name: 'Canvas Prints',
                description:
                    'Gallery-wrapped canvas prints with vibrant color reproduction — a premium output option for brand photography, art reproductions, and office wall décor.',
                bestFor: 'Office décor, hotel and restaurant art walls, brand photography displays, recognition walls',
                imagePlaceholder: 'Canvas Print — gallery-wrapped canvas on office or restaurant wall',
            },
            {
                slug: 'styrene-prints',
                name: 'Styrene Prints',
                description:
                    'Printed rigid polystyrene panels with a smooth, semi-gloss finish — lightweight, affordable, and great for point-of-purchase displays and event graphics.',
                bestFor: 'Retail POP displays, trade show graphics, floor or shelf signs, lobby announcement boards',
                imagePlaceholder: 'Styrene Print — rigid printed panel in retail display fixture',
            },
            {
                slug: 'presentation-boards',
                name: 'Presentation Boards',
                description:
                    'Professionally printed foam core or gator board panels sized for design or business presentations — mounted and ready to display on an easel or wall.',
                bestFor: 'Architecture firms, real estate developers, sales meetings, educational exhibits',
                imagePlaceholder: 'Presentation Board — professional printed board on easel in meeting room',
            },
            {
                slug: 'retail-display-prints',
                name: 'Retail Display Prints',
                description:
                    'Custom printed graphics for in-store promotional displays, shelving, and point-of-purchase advertising — designed to drive decisions at the moment they matter.',
                bestFor: 'Retail stores, grocery end caps, product launches, seasonal promotions, in-store advertising',
                imagePlaceholder: 'Retail Display Print — promotional graphic in retail store fixture',
            },
            {
                slug: 'photo-prints',
                name: 'Photo Prints',
                description:
                    'True photographic large format prints on premium photo paper or metallic media — for professional photo displays, branded photography, and event showcases.',
                bestFor: 'Photography studios, real estate marketing, event photo walls, retail brand imagery',
                imagePlaceholder: 'Photo Print — large format photograph displayed on wall',
            },
        ],
    },
    {
        slug: 'print-marketing-materials',
        name: 'Print & Marketing Materials',
        tagline: 'Your Brand on Every Piece of Paper You Hand Out',
        description:
            'Professional print and marketing materials for local businesses, events, promotions, and everyday brand communication. Polished, print-ready materials that match your signage and brand.',
        imageStyle: 'Flat lay of matching business cards, flyers, brochures, and brand materials on clean surface',
        placeholderBg: '#92400E',
        seo: {
            title: 'Business Cards, Flyers & Print Marketing Materials Beaumont TX | Pixel & Panel',
            description:
                'Custom business cards, flyers, brochures, menus, postcards, and print marketing materials for Beaumont, Port Arthur, and Orange TX businesses. Get a free quote.',
            h1: 'Print Marketing Materials for Beaumont TX Businesses',
        },
        products: [
            {
                slug: 'business-cards',
                name: 'Business Cards',
                description:
                    'Premium printed business cards in standard or custom sizes — available in a range of stocks, finishes, and specialty options to match your brand.',
                bestFor: 'Professionals, contractors, real estate agents, small business owners, networkers',
                imagePlaceholder: 'Business Cards — stack of branded cards, close-up detail',
            },
            {
                slug: 'flyers',
                name: 'Flyers',
                description:
                    'Full-color single or double-sided flyers on quality paper stock — designed to announce events, promote services, advertise sales, and drive customer action.',
                bestFor: 'Events, service promotions, menu inserts, open houses, local advertising campaigns',
                imagePlaceholder: 'Flyer — printed event or promotional flyer close-up',
            },
            {
                slug: 'postcards',
                name: 'Postcards',
                description:
                    'Direct mail and promotional postcards printed on thick card stock with UV coating — effective for neighborhood campaigns and seasonal offers.',
                bestFor: 'Direct mail, appointment reminders, EDDM mail routes, real estate mailers, holiday promotions',
                imagePlaceholder: 'Postcards — branded postcards fanned out, front and back visible',
            },
            {
                slug: 'brochures',
                name: 'Brochures',
                description:
                    'Multi-panel folded brochures that tell your brand story — available in bi-fold, tri-fold, and z-fold styles on a variety of paper weights and finishes.',
                bestFor: 'Service businesses, real estate agents, healthcare providers, tourism businesses',
                imagePlaceholder: 'Brochure — tri-fold brochure open and closed, showing full design',
            },
            {
                slug: 'door-hangers',
                name: 'Door Hangers',
                description:
                    'Custom printed door hanger cards with pre-cut slots for door knobs — designed for neighborhood canvassing, service leave-behinds, and local advertising.',
                bestFor: 'HVAC, pest control, landscapers, cleaners, pizza delivery, home service businesses',
                imagePlaceholder: 'Door Hanger — printed door hanger on residential door knob',
            },
            {
                slug: 'rack-cards',
                name: 'Rack Cards',
                description:
                    'Vertical 4×9 printed cards designed for standard brochure racks — ideal for self-service distribution in hotel lobbies, waiting rooms, and retail locations.',
                bestFor: 'Tourism businesses, wellness providers, real estate firms, restaurants, local attractions',
                imagePlaceholder: 'Rack Cards — cards displayed in hotel lobby brochure rack',
            },
            {
                slug: 'menus',
                name: 'Menus',
                description:
                    'Custom designed and printed menus in single-sheet, booklet, or board formats — fully branded and available in laminated, paper, or specialty stock options.',
                bestFor: 'Restaurants, cafés, food trucks, bars, breweries, catering companies, event venues',
                imagePlaceholder: 'Menu — printed restaurant menu on table, single sheet or booklet',
            },
            {
                slug: 'thank-you-cards',
                name: 'Thank You Cards',
                description:
                    'Professionally printed branded thank you cards for post-purchase follow-up, customer appreciation, and referral programs — leaving a lasting impression.',
                bestFor: 'Retail stores, service businesses, real estate agents, e-commerce sellers, event vendors',
                imagePlaceholder: 'Thank You Cards — branded cards with envelope on clean surface',
            },
            {
                slug: 'appointment-cards',
                name: 'Appointment Cards',
                description:
                    'Compact printed cards with space for appointment date, time, and provider information — reinforcing your brand at every scheduled interaction.',
                bestFor: 'Medical and dental offices, salons, spas, tattoo shops, auto repair, veterinary clinics',
                imagePlaceholder: 'Appointment Cards — branded appointment card held in hand',
            },
            {
                slug: 'letterheads',
                name: 'Letterheads',
                description:
                    'Custom printed letterhead stationery featuring your brand logo, colors, and contact info — projecting professionalism in every piece of official correspondence.',
                bestFor: 'Law firms, accounting firms, medical practices, corporate offices, contract businesses',
                imagePlaceholder: 'Letterhead — branded letterhead document on clean desk',
            },
            {
                slug: 'envelopes',
                name: 'Envelopes',
                description:
                    'Custom printed business envelopes with logo, return address, and brand elements — ensuring every mailed piece reinforces your professional identity.',
                bestFor: 'Corporate mailings, direct mail campaigns, billing correspondence, formal client communications',
                imagePlaceholder: 'Envelopes — branded envelopes stacked, showing custom printed design',
            },
            {
                slug: 'stickers-labels',
                name: 'Stickers & Labels',
                description:
                    'Custom printed adhesive stickers and labels for products, packaging, mailings, and brand promotions — available in any shape, size, and finish.',
                bestFor: 'Product packaging, shipping labels, promotional giveaways, branded boxes, event swag',
                imagePlaceholder: 'Stickers and Labels — sheet of branded stickers, diverse shapes',
            },
        ],
    },
    {
        slug: 'safety-industrial-signs',
        name: 'Safety & Industrial Signs',
        tagline: 'Compliance Signs That Don\'t Cut Corners',
        description:
            'Custom safety, compliance, industrial, parking, traffic, and facility signs designed for clear communication and durable everyday use in demanding environments.',
        imageStyle: 'Industrial facility safety sign mounted on wall or equipment in facility setting',
        placeholderBg: '#7C2D12',
        seo: {
            title: 'Safety Signs & Industrial Labels Beaumont TX | Pixel & Panel',
            description:
                'Custom safety signs, OSHA signs, parking signs, reflective signs, and industrial labels for facilities in Beaumont, Port Arthur, and Orange TX. Get a free quote.',
            h1: 'Safety & Industrial Signs in Beaumont TX',
        },
        products: [
            {
                slug: 'safety-signs',
                name: 'Safety Signs',
                description:
                    'Custom printed safety signs in standard or custom formats — communicating hazards, procedures, and requirements clearly throughout any facility or worksite.',
                bestFor: 'Manufacturing plants, warehouses, construction sites, industrial facilities, petrochemical plants',
                imagePlaceholder: 'Safety Sign — mounted warning or hazard sign in industrial facility',
            },
            {
                slug: 'osha-style-signs',
                name: 'OSHA-Style Signs',
                description:
                    'Signs formatted to OSHA design standards with color-coded headers — Danger, Warning, Caution, Notice, Safety Information — for workplace compliance.',
                bestFor: 'All facilities requiring OSHA-compliant communication, manufacturing, chemical handling, construction',
                imagePlaceholder: 'OSHA Sign — red danger or yellow warning sign on facility wall',
            },
            {
                slug: 'pipe-labels',
                name: 'Pipe Labels',
                description:
                    'Color-coded adhesive pipe identification labels meeting ANSI/ASME standards — communicating pipe contents, flow direction, and hazard level throughout facilities.',
                bestFor: 'Petrochemical plants, refineries, food processing, HVAC systems, water treatment facilities',
                imagePlaceholder: 'Pipe Labels — color-coded labels on industrial pipes in facility',
            },
            {
                slug: 'equipment-labels',
                name: 'Equipment Labels',
                description:
                    'Heavy-duty printed labels for machinery, panels, assets, and tools — resistant to chemicals, heat, abrasion, and outdoor conditions in demanding environments.',
                bestFor: 'Industrial equipment ID, tool tracking, electrical panel labeling, safety lockout tagging',
                imagePlaceholder: 'Equipment Label — printed durable label on industrial equipment',
            },
            {
                slug: 'engraved-tags',
                name: 'Engraved Tags',
                description:
                    'Metal or plastic tags with permanently engraved text for asset identification, serial numbers, safety notices, and facility equipment tracking.',
                bestFor: 'Equipment asset tags, electrical panels, valve identification, permanent facility signage',
                imagePlaceholder: 'Engraved Tags — metal engraved tag on industrial equipment',
            },
            {
                slug: 'reflective-signs',
                name: 'Reflective Signs',
                description:
                    'Signs made with reflective sheeting that remain highly visible in low-light and nighttime conditions — critical for safety-sensitive environments.',
                bestFor: 'Parking lots, road signage, entrance/exit signs, perimeter fencing, nighttime worksites',
                imagePlaceholder: 'Reflective Sign — reflective sign visible in low-light parking setting',
            },
            {
                slug: 'parking-signs',
                name: 'Parking Signs',
                description:
                    'Custom printed aluminum or reflective parking signs for lots, garages, and private properties — communicating rules, restrictions, hours, and violations clearly.',
                bestFor: 'Commercial property owners, HOAs, apartment complexes, hospitals, shopping centers',
                imagePlaceholder: 'Parking Sign — reserved or no-parking sign on pole in parking lot',
            },
            {
                slug: 'traffic-signs',
                name: 'Traffic Signs',
                description:
                    'Custom and standard traffic control signs for private roads, parking areas, construction zones, and facility driveways — engineered for durability and visibility.',
                bestFor: 'Industrial campus roads, construction site entrances, private property traffic control',
                imagePlaceholder: 'Traffic Sign — stop or speed limit sign at private facility entrance',
            },
            {
                slug: 'directional-safety-signs',
                name: 'Directional Safety Signs',
                description:
                    'Signs with arrows and clear messaging guiding employees, visitors, and emergency responders through facilities — formatted for quick comprehension in any conditions.',
                bestFor: 'Emergency evacuation routes, wayfinding in large facilities, campus directional systems',
                imagePlaceholder: 'Directional Safety Sign — exit or emergency arrow sign in facility hall',
            },
        ],
    },
    {
        slug: 'apparel-transfers',
        name: 'Apparel Transfers',
        tagline: 'Your Brand on Every Piece You Wear',
        description:
            'Custom transfer graphics for apparel, merchandise, hard surfaces, promotional products, and small business branding. Full-color. Any quantity. Ready to press.',
        imageStyle: 'DTF printed transfer being applied to a t-shirt or hoodie with a heat press',
        placeholderBg: '#111827',
        seo: {
            title: 'DTF Transfers & Apparel Graphics Beaumont TX | Pixel & Panel',
            description:
                'Custom DTF transfers, UV DTF decals, shirt transfers, and apparel graphics for businesses and individuals in Beaumont, Port Arthur, and Orange TX. Get a free quote.',
            h1: 'Apparel Transfers & Custom Graphics in Beaumont TX',
        },
        products: [
            {
                slug: 'dtf-transfers',
                name: 'DTF Transfers',
                description:
                    'Direct-to-Film printed transfers heat pressed onto fabric — delivering full-color, durable designs on any garment including cotton, polyester, and blends.',
                bestFor: 'Custom t-shirts, team uniforms, event shirts, branded staff apparel, small-batch merch',
                imagePlaceholder: 'DTF Transfer — full-color transfer on shirt, close-up of printed design',
            },
            {
                slug: 'uv-dtf-decals',
                name: 'UV DTF Decals',
                description:
                    'UV-printed direct-to-film decals for hard surfaces — cups, tumblers, helmets, phone cases, equipment, and promotional products with vibrant, lasting results.',
                bestFor: 'Branded cups and drinkware, equipment branding, promotional giveaways, product customization',
                imagePlaceholder: 'UV DTF Decal — full-color decal applied to branded tumbler or cup',
            },
            {
                slug: 'custom-shirt-transfers',
                name: 'Custom Shirt Transfers',
                description:
                    'Gang-printed transfer sheets formatted specifically for shirt decoration — cost-efficient for small runs, easy to press in-house or at a local decorator.',
                bestFor: 'Small businesses selling branded merch, family reunion shirts, event staff, school groups',
                imagePlaceholder: 'Shirt Transfer — transfer sheet with multiple designs ready for pressing',
            },
            {
                slug: 'hard-surface-transfers',
                name: 'Hard Surface Transfers',
                description:
                    'Specialty transfer media for application to non-fabric hard surfaces including wood, ceramic, glass, metal, and plastic items.',
                bestFor: 'Custom awards, branded promotional products, event keepsakes, corporate recognition items',
                imagePlaceholder: 'Hard Surface Transfer — decal applied to wood, glass, or ceramic',
            },
            {
                slug: 'apparel-graphics',
                name: 'Apparel Graphics',
                description:
                    'Custom printed apparel graphic packages combining DTF or screen-print ready artwork with production support for full branded clothing campaigns.',
                bestFor: 'Brand merchandise lines, employee uniforms, team gear, event apparel, local business giveaways',
                imagePlaceholder: 'Apparel Graphics — branded shirts and garments showing custom prints',
            },
        ],
    },
]