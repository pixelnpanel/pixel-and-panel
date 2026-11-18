// Customer-facing specifications from the matching US vendor product pages.
export const VENDOR_LISTINGS = {
    'vinyl-decals-and-window-graphics': [
        {
            name: 'Frosted Window Vinyl',
            label: 'Printable etched-glass privacy film',
            intro: 'Give office partitions, entry doors, or storefront windows an etched-glass look while letting light through. Add a printed logo or pattern to the frosted film.',
            alt: 'Frosted privacy film with a Bayou Bend Dental logo on a glass door',
            materials: ['Adhesive privacy film vinyl', '7 mil matte frost laminate', 'Single-sided UV print'],
            options: ['Custom sizing up to 52 in × 159 ft', 'For smooth interior or exterior glass'],
        },
        {
            name: 'Backlit Film',
            label: '10 mil matte insert for light boxes',
            intro: 'A translucent print insert for illuminated menus, retail displays, and other light boxes. Supply the insert dimensions when requesting a quote.',
            alt: 'Backlit film insert displaying a Cypress Spoon Kitchen menu inside a light box',
            materials: ['10 mil translucent backlit film', 'Double-layer, single-sided UV print', 'Matte finish with no lamination'],
            options: ['Custom sizing up to 59 in × 100 ft', 'Non-adhesive film insert'],
        },
        {
            name: 'Non-Woven Wallpaper',
            label: '10 mil PVC-free wallcovering',
            intro: 'Custom printed wallpaper with a finely textured matte surface for interior feature walls. Apply with a compatible strippable wallpaper adhesive.',
            alt: 'Port Neches Botanicals printed wallpaper with a rolled sample',
            materials: ['10 mil PVC-free non-woven polyester wallcovering', 'UV-printed matte surface with no lamination'],
            options: ['Custom sizing up to 52 in × 100 ft per panel', 'Indoor walls', 'Paste-applied installation'],
        },
    ],
    'rigid-and-metal-signs': [
        {
            name: 'Laser Cut Steel Sign',
            label: 'Powder-coated 16-gauge steel',
            intro: 'A custom silhouette cut from steel for lobby walls, workshops, storefronts, or gifts. The cutout design has a weather-resistant powder-coated finish.',
            alt: 'Black laser-cut steel sign for Sabine Oak Workshop mounted on a cream wall',
            materials: ['16-gauge laser-cut steel', 'Weather-resistant powder coating', 'Mounting screws included'],
            options: ['Up to 36 in in either dimension', 'Black, white, bronze, or gold'],
        },
        {
            name: 'Point of Purchase Display Board',
            label: '24 pt or 40 pt gloss display board',
            intro: 'Rigid printed board for indoor retail signs, counter displays, and point-of-purchase promotions. Choose between 24 pt and 40 pt stock.',
            alt: 'Rigid Gulfglade Wellness point-of-purchase graphic printed on display board',
            materials: ['24 pt or 40 pt gloss-coated two-sided stock', 'Optional grommets'],
            sizes: ['6 × 24 in', '6 × 32 in', '6 × 36 in', '12 × 12 in', '12 × 16 in', '12 × 18 in', '12 × 24 in', '12 × 36 in', '12 × 48 in', '18 × 24 in', '24 × 24 in', '24 × 32 in', '24 × 36 in', '24 × 48 in', '32 × 48 in', '36 × 36 in', '36 × 48 in', '48 × 48 in'],
        },
    ],
    'table-covers-and-throws': [
        {
            name: 'Fitted Table Cover',
            label: 'Tailored corners for 4, 6, and 8 ft tables',
            intro: 'A full-color table cover with sewn corners for a neat, box-shaped fit at events. Choose an open back for seating access or a full back for coverage on all sides.',
            alt: 'Tailored fitted table cover with a Neches Bloom Florist graphic',
            materials: ['8.8 oz tension fabric', 'Dye-sublimated print', 'Hemmed edges and corners'],
            sizes: ['4 ft table', '6 ft table', '8 ft table'],
            options: ['Open back or full back'],
        },
    ],
    'event-tents': [
        {
            name: 'Large Event Tent',
            label: '10 × 15 ft and 10 × 20 ft canopies',
            intro: 'A wide canopy for outdoor markets, festivals, and event booths. Each complete kit pairs a full-color printed top with an adjustable aluminum frame.',
            alt: 'Wide Sabine Timber Outfitters branded event tent on an aluminum frame',
            materials: ['6 oz 600 × 600 denier tent fabric with a waterproof coating', 'Dye-sublimated print', '40 mm hexagonal aluminum frame with 1 mm wall thickness'],
            sizes: ['10 × 15 ft', '10 × 20 ft'],
            options: ['10 × 15 ft frame measures 175 in wide × 120 in deep assembled', '10 × 20 ft frame measures 235 in wide × 120 in deep assembled', 'Both adjust from 124.5 to 135 in high', 'Full walls available for short or long sides', 'Up to two half walls for the 10 ft sides'],
        },
    ],
    'flyers-brochures-and-booklets': [
        {
            name: 'Digital Press Sheets',
            label: 'Untrimmed 12 × 18 in sheets',
            intro: 'Full-color digital prints supplied as untrimmed sheets for your own cutting or finishing. Use the sheet to place multiple pieces in one layout.',
            alt: 'Untrimmed press sheets with repeat Marsh and Miel Bakery designs',
            materials: ['14 pt matte C2S or 13 pt Enviro uncoated card stock', '100 lb gloss or matte text stock', '80 lb Enviro uncoated text stock'],
            sizes: ['12 × 18 in'],
        },
    ],
}

export const VENDOR_SPEC_UPDATES = {
    '13oz-vinyl-banner': {
        singleSided: true,
        cardSummary: 'Single-sided 13 oz matte vinyl',
        intro: 'A full-color, single-sided banner on 13 oz matte vinyl for indoor or outdoor displays. Hemmed edges and brass grommets come standard.',
        metaDescription: 'Custom single-sided 13 oz matte vinyl banners with full-color UV printing, hemmed edges, and brass grommets. See preset sizes or request a quote.',
        specs: { 'Sizes and sides': ['Single-sided print', 'Single-piece size up to 10 ft × 145 ft without pole pockets or 9.5 ft × 145 ft with pockets', 'Oversized single-sided panels can be welded together'] },
        highlights: ['13 oz matte vinyl for indoor and outdoor use', 'Full-color single-sided printing', 'Hemmed edges and grommets included'],
        omitQuestions: ['Single-sided or double-sided?'],
    },
    'adhesive-vinyl-decals': {
        intro: 'Printed decals on 4 mil calendered vinyl with permanent adhesive. Use them for logos and messages on clean, smooth surfaces.',
        metaDescription: 'Custom 4 mil permanent adhesive vinyl decals for smooth surfaces. Full-color UV printing from 3 × 6 in up to 52 in × 159 ft.',
        specs: {
            'Material and print': ['4 mil calendered vinyl with permanent adhesive', 'Full-color UV print'],
            'Sizes and options': ['Minimum 3 × 6 in', 'Maximum 52 in × 159 ft'],
        },
        refreshHighlights: true,
        omitQuestions: ["What's the difference between calendered and high-performance vinyl?", 'How long do they last outdoors?'],
    },
    'vehicle-wrap-vinyl': {
        metaDescription: 'Full and partial vehicle wraps printed on 3M IJ180Cv3 Controltac cast vinyl with 3M Scotchcal 8518 gloss overlaminate.',
        specs: {
            'Material and print': ['3M IJ180Cv3 Controltac cast vinyl', '3M Scotchcal 8518 gloss overlaminate', 'Full-color eco-solvent print'],
            'Sizes and options': ['Maximum 52 in × 150 ft per panel', 'Full wraps, partial wraps, and accent panels'],
        },
    },
    'perforated-window-vinyl': {
        intro: 'A full-color graphic on perforated vinyl lets people see out from the darker side of the glass. The standard 70/30 film has 30% open area and a black adhesive backing.',
        metaDescription: 'Custom 70/30 perforated window vinyl with 30% open area and black adhesive backing. Single-sided print up to 52 in × 159 ft.',
        specs: {
            'Material and print': ['70/30 perforated calendered adhesive vinyl', '6.5 mil total thickness including adhesive', 'Single-sided print with black adhesive backing'],
            'Sizes and options': ['Maximum 52 in × 159 ft', 'Single-pane or multi-panel coverage'],
        },
        refreshHighlights: true,
        omitQuestions: ['Can I take it down for the holidays?'],
    },
    'clear-window-decals': {
        metaDescription: 'Single-sided UV printing on ultra-clear adhesive vinyl for interior or exterior glass. Custom sizes up to 52 in × 159 ft.',
        specs: {
            'Material and print': ['Ultra-clear adhesive vinyl', 'Single-sided UV print with no laminate'],
            'Sizes and options': ['Maximum 52 in × 159 ft', 'For interior or exterior glass'],
        },
        refreshHighlights: true,
    },
    'window-cling': {
        intro: 'A repositionable window film for frequently updated graphics. A low-tack mini-dot backing helps the film lay flat on smooth glass.',
        metaDescription: '8 mil repositionable window film with low-tack mini-dot adhesive, single-sided UV printing, and a matte finish. Up to 52 in × 159 ft.',
        specs: {
            'Material and print': ['8 mil window film with low-tack mini-dot adhesive', 'Single-sided UV print with matte finish', 'No lamination'],
            'Sizes and options': ['Maximum 52 in × 159 ft', 'Apply with the adhesive side against the glass'],
            'Good to know': ['Use on clean, smooth glass', 'Store flat between uses'],
        },
        refreshHighlights: true,
        omitQuestions: ['How is a cling different from a decal?', 'Will the graphic read against daylight?'],
    },
    'floor-graphics': {
        intro: 'Full-color graphics on 3 mil floor vinyl with a 7 mil textured, non-slip laminate for smooth indoor floors.',
        metaDescription: 'Custom indoor floor graphics on 3 mil vinyl with a 7 mil textured non-slip laminate. Single-sided print up to 52 in × 100 ft.',
        specs: {
            'Material and print': ['3 mil floor vinyl with air-release adhesive', '7 mil textured non-slip floor laminate', 'Single-sided print for indoor use'],
            'Sizes and options': ['Maximum 52 in × 100 ft'],
        },
        refreshHighlights: true,
        omitQuestions: ['Is it slippery?'],
    },
    'adhesive-wall-fabric': {
        intro: 'A repositionable printed wall fabric for smooth painted walls. Send the wall dimensions and a photo so we can plan the panel layout.',
        metaDescription: 'Repositionable 6.5 mil wall fabric with UV printing for smooth painted walls. Custom panels up to 52 in × 100 ft.',
        specs: {
            'Material and print': ['6.5 mil Type I wall fabric with repositionable adhesive', 'UV print with no laminate'],
            'Sizes and options': ['Maximum 52 in × 100 ft per panel', 'Multi-panel graphics with aligned seams'],
        },
        refreshHighlights: true,
    },
    'high-performance-adhesive-vinyl': {
        intro: 'A 3 mil high-performance calendered decal film with a gray adhesive backing and air-release channels. Use it for signage and decals on smooth surfaces. Ask about cast vehicle-wrap film for complex curves.',
        metaDescription: '3 mil high-performance calendered decal vinyl with gray-backed air-release adhesive for smooth surfaces. Up to 52 in × 159 ft.',
        image: 'high-performance-calendered-vinyl-local-business.webp',
        imageAlt: 'Cypress Beacon Home Services printed decal applied to a flat metal storefront panel',
        specs: {
            'Material and print': ['3 mil high-performance calendered vinyl', 'Gray-backed adhesive with air-release channels'],
            'Sizes and options': ['Maximum 52 in × 159 ft', 'Temporarily repositionable during installation'],
            'Good to know': ['For deep curves, rivets, and full vehicle wraps, use a compatible cast wrap film'],
        },
        refreshHighlights: true,
        omitQuestions: ['Is this the same film used for wraps?'],
    },
    'reflective-adhesive-vinyl': {
        metaDescription: '4 mil engineer-grade prismatic vinyl with permanent adhesive. UV-printed reflective decals up to 48 in × 100 ft.',
        specs: {
            'Material and print': ['4 mil UV-printed engineer-grade prismatic vinyl', 'Permanent adhesive'],
            'Sizes and options': ['Maximum 48 in × 100 ft'],
        },
    },
    'dry-erase-adhesive-vinyl': {
        metaDescription: 'Custom dry-erase wall film on 4 mil adhesive PVC with a UV-cured coating. Printed panels up to 52 in × 159 ft.',
        specs: {
            'Material and print': ['4 mil adhesive PVC film', 'UV-cured dry-erase coating'],
            'Sizes and options': ['Maximum 52 in × 159 ft per panel', 'Custom printed grids, calendars, or forms'],
        },
        refreshHighlights: true,
        omitQuestions: ['How big can it be?'],
    },
}
