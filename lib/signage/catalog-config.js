// Catalog display order, artwork, editorial copy, and search vocabulary.
// Preferred category order on the hub, ranked by industry demand (vinyl
// banners and retractable stands are the top-searched sign products, then
// yard/rigid signs, flags, and A-frames; accessories trail). Unknown
// categories (added later in the sheet) fall to the end, alphabetically.
export const CATEGORY_ORDER = [
    'banners',
    'banner-stands',
    'rigid-and-metal-signs',
    'vinyl-decals-and-window-graphics',
    'real-estate-signs',
    'flags',
    'dimensional-letters',
    'sidewalk-a-frame-signs',
    'trade-show-displays',
    'event-tents',
    'table-covers-and-throws',
    'seg-displays',
    'canvas-and-poster-prints',
    'dtf-transfers',
    // Print & paper (SinaLite). Signage leads by design — see the brand
    // positioning — so the print block sits after every sign category, with
    // business cards at its head as the highest-demand term in the group.
    'business-cards',
    'flyers-brochures-and-booklets',
    'postcards-and-direct-mail',
    'cards-invitations-and-event-print',
    'labels-stickers-and-packaging',
    'stationery-and-business-forms',
    'magnets-and-clings',
    // Accessories last.
    'sign-holders-and-display-frames',
    'hardware',
]

// Demand-ranked product order inside each category (top sellers / most
// searched first). Products missing from a list keep their sheet order after
// the ranked ones, so new sheet rows still appear with zero code changes.
export const PRODUCT_ORDER = {
    banners: [
        '13oz-vinyl-banner', 'mesh-banner', '18oz-blockout-banner', '9oz-fabric-banner',
        'pole-banner', 'tension-fabric-banner', 'backlit-banner', 'indoor-banner',
        'blockout-fabric-banner', 'hand-held-banner',
    ],
    'banner-stands': [
        'standard-retractable', 'deluxe-retractable', 'sd-retractable', 'x-stand',
        'step-and-repeat-backdrop', 'tension-fabric-stand', 'table-top-banner-stand',
    ],
    'rigid-and-metal-signs': [
        'coroplast-yard-signs', 'car-and-vehicle-magnets', 'aluminum-metal-signs',
        'foam-board-signs', 'aluminum-composite-signs', 'acrylic-signs',
        'pvc-signs', 'gator-board-signs', 'styrene-signs',
    ],
    'real-estate-signs': ['yard-sign-and-h-stake', 'real-estate-a-frame', 'real-estate-post', 'real-estate-frame'],
    flags: [
        'feather-angled-flag', 'teardrop-flag', 'feather-convex-flag', 'econo-feather-flag',
        'rectangle-flag', 'custom-pole-flag', 'desktop-teardrop-flag',
    ],
    'sidewalk-a-frame-signs': ['standard-signicade', 'deluxe-signicade', 'simposign-ii'],
    'event-tents': ['event-tent', 'tent-full-wall', 'tent-half-wall'],
    'table-covers-and-throws': [
        '6-table-throw', '8-table-throw', '4-table-throw', 'stretch-table-throw',
        'round-table-cover', 'table-runner', 'solid-color-table-throws',
    ],
    'dtf-transfers': ['dtf-transfer', 'uv-dtf'],
    'sign-holders-and-display-frames': [
        'poster-stand', 'banner-a-frame', 'snap-poster-hanger', 'magnetic-wood-frame-hanger',
    ],
    'vinyl-decals-and-window-graphics': [
        'adhesive-vinyl-decals', 'vehicle-wrap-vinyl', 'perforated-window-vinyl',
        'clear-window-decals', 'window-cling', 'floor-graphics', 'adhesive-wall-fabric',
        'high-performance-adhesive-vinyl', 'reflective-adhesive-vinyl', 'dry-erase-adhesive-vinyl',
    ],
    'dimensional-letters': [
        'standard-channel-letters', 'halo-lit-channel-letters', 'premium-channel-letters',
    ],
    'trade-show-displays': [
        'straight-tension-fabric-display-wall', 'curved-tension-fabric-display-wall',
        'straight-pop-up-fabric-display', 'curved-pop-up-fabric-display', 'trade-show-booth-kit',
    ],
    'seg-displays': [
        'seg-display', 'seg-backlit-display', 'seg-backlit-pop-up-display',
        'seg-replacement-fabric-print',
    ],
    'canvas-and-poster-prints': [
        'poster-print', 'paper-poster-print', 'stretched-canvas-print', 'framed-canvas-print',
    ],
    'business-cards': ['business-cards', 'folded-business-cards', 'plastic-business-cards'],
    'flyers-brochures-and-booklets': [
        'flyers', 'brochures', 'booklets', 'presentation-folders', 'bookmarks',
    ],
    'postcards-and-direct-mail': [
        'postcards', 'door-hangers', 'variable-data-postcards', 'tear-cards',
    ],
    'cards-invitations-and-event-print': [
        'invitations-and-announcements', 'greeting-cards', 'numbered-tickets',
        'table-tent-cards', 'wall-calendars',
    ],
    'labels-stickers-and-packaging': [
        'roll-labels', 'square-cut-stickers', 'cut-to-shape-decals',
        'product-boxes', 'mailer-boxes', 'stand-up-pouches',
    ],
    'stationery-and-business-forms': ['ncr-forms', 'letterhead', 'envelopes', 'notepads'],
    'magnets-and-clings': [
        'business-card-magnets', 'cut-to-shape-magnets', 'static-clings',
    ],
    hardware: [
        'retractable-banner-stand-hardware', 'flag-bases', 'banner-stand-led-light',
        'tension-fabric-stand-hardware', 'x-banner-stand-hardware', 'tent-accessories',
        'flag-poles', 'step-and-repeat-backdrop-frame', 'banner-hardware-kit',
    ],
}

// Hand-made category cover images (1:1 collages). Drop the file into
// public/images/signage/categories/ with the mapped name and it replaces the
// default cover (first product photo) automatically — no sheet changes needed.
export const CATEGORY_IMAGES = {
    banners: 'custom-vinyl-banners.webp',
    'banner-stands': 'retractable-banner-stands.webp',
    'rigid-and-metal-signs': 'rigid-metal-yard-signs.webp',
    'real-estate-signs': 'real-estate-yard-signs.webp',
    flags: 'custom-feather-flags.webp',
    'sidewalk-a-frame-signs': 'sidewalk-a-frame-signs.webp',
    'event-tents': 'custom-event-tents.webp',
    'table-covers-and-throws': 'custom-table-covers-throws.webp',
    'dtf-transfers': 'custom-dtf-transfers.webp',
    'sign-holders-and-display-frames': 'sign-holders-display-frames.webp',
    // Covers not shot yet — resolveCategoryImage() falls back to the first
    // product photo until a file with the mapped name lands on disk.
    'vinyl-decals-and-window-graphics': 'vinyl-decals-window-graphics.webp',
    'dimensional-letters': 'channel-letters-dimensional.webp',
    'trade-show-displays': 'trade-show-displays.webp',
    'seg-displays': 'seg-backlit-displays.webp',
    'canvas-and-poster-prints': 'canvas-poster-prints.webp',
    'hardware': 'signage-hardware-accessories.webp',
    // Print & paper covers — none shot yet, same fallback applies.
    'business-cards': 'custom-business-cards.webp',
    'flyers-brochures-and-booklets': 'flyers-brochures-booklets.webp',
    'postcards-and-direct-mail': 'postcards-direct-mail.webp',
    'cards-invitations-and-event-print': 'cards-invitations-event-print.webp',
    'labels-stickers-and-packaging': 'labels-stickers-packaging.webp',
    'stationery-and-business-forms': 'stationery-business-forms.webp',
    'magnets-and-clings': 'magnets-clings.webp',
}

// Optional human-written copy per category. Anything missing is generated, so
// brand-new categories from the sheet still render with sensible defaults.
export const CATEGORY_META = {
    'business-cards': {
        // Distinct from the same-named product's "Custom Business Cards", and
        // "business card printing" is the query a category page should own.
        h1: 'Custom Business Card Printing',
        tagline: 'Standard, folded & plastic cards on 20+ stocks and finishes.',
        description:
            'Full-color business cards on everything from everyday 14pt matte to 32pt painted edge. Raised foil, raised spot UV, soft touch, kraft and linen, plus folded and waterproof plastic cards. Free design help included.',
        seoDescription:
            'Custom business cards in Beaumont, Port Arthur & Nederland TX — 20+ stocks including matte, gloss UV, linen, kraft, soft touch, metallic foil and painted edge.',
    },
    'flyers-brochures-and-booklets': {
        tagline: 'Flyers, tri-fold brochures, booklets, folders & bookmarks.',
        description:
            'The print that explains what you do. Single-sheet flyers, scored and folded brochures, saddle-stitched booklets and catalogs, branded presentation folders, and bookmarks — all full color on gloss, matte, UV or uncoated stock.',
        seoDescription:
            'Custom flyers, brochures, booklets, presentation folders and bookmarks in Beaumont, Port Arthur & Nederland TX. Full color, folded and finished, fast turnaround.',
    },
    'postcards-and-direct-mail': {
        tagline: 'Postcards, door hangers & tear cards that land in hand.',
        description:
            'Print built to reach people where they are. Mail-ready postcards, variable data postcards personalized for every recipient, die-cut door hangers, and tear cards with a coupon that detaches and gets kept.',
        seoDescription:
            'Custom postcards, variable data direct mail, door hangers and tear cards in Beaumont, Port Arthur & Nederland TX. Mail-ready stocks and fast turnaround.',
    },
    'cards-invitations-and-event-print': {
        tagline: 'Greeting cards, invitations, tickets, calendars & table tents.',
        description:
            'Print for occasions. Folded greeting cards and invitations on foil, pearl and kraft stocks, sequentially numbered raffle and event tickets, branded wall calendars, and table tent cards that stand on their own.',
        seoDescription:
            'Custom greeting cards, invitations, numbered event tickets, wall calendars and table tents in Beaumont, Port Arthur & Nederland TX. Low minimums from 25.',
    },
    'labels-stickers-and-packaging': {
        tagline: 'Roll labels, die-cut stickers, product boxes & pouches.',
        description:
            'Everything that wraps a product. Waterproof BOPP roll labels for bottles and jars, square cut and custom die-cut stickers, retail tuck-end product boxes, branded corrugated mailers, and resealable stand up pouches.',
        seoDescription:
            'Custom roll labels, die-cut stickers, product boxes, mailer boxes and stand up pouches in Beaumont, Port Arthur & Nederland TX. Low minimums for small brands.',
    },
    'stationery-and-business-forms': {
        tagline: 'Letterhead, envelopes, notepads & carbonless NCR forms.',
        description:
            'The paperwork side of a business, branded. Printer-friendly uncoated letterhead, standard, security-tint and self-seal envelopes, glued notepads with rigid backing, and 3-part carbonless NCR forms for invoices and work orders.',
        seoDescription:
            'Custom letterhead, business envelopes, branded notepads and 3-part carbonless NCR forms in Beaumont, Port Arthur & Nederland TX. Sequential numbering available.',
    },
    'magnets-and-clings': {
        tagline: 'Fridge magnets, cut-to-shape magnets & no-adhesive clings.',
        description:
            'Print that sticks without ruining anything. Business card magnets that live on a fridge for years, magnets die-cut to any outline, and static clings that hold to glass with no adhesive and peel off clean.',
        seoDescription:
            'Custom business card magnets, cut-to-shape magnets and static cling window decals in Beaumont, Port Arthur & Nederland TX. Full color, no minimums to worry about.',
    },
    banners: {
        tagline: 'Vinyl, mesh, fabric & pole banners — built for harsh outdoor weather.',
        description:
            'Custom banners for storefronts, events, fences, and streets. Indoor and outdoor, single- or double-sided, with grommets and finishing included.',
        seoDescription:
            'Custom vinyl, mesh, fabric, blockout, pole, and backlit banners in Beaumont, Port Arthur & Nederland TX. Preset sizes with instant pricing or a fast quote.',
    },
    'banner-stands': {
        tagline: 'Retractable, tension-fabric, X-stand & step-and-repeat displays.',
        description:
            'Portable banner stands and backdrops for trade shows, lobbies, and events. Stand-plus-graphic packages with preset sizes, plus custom sizes by quote.',
        seoDescription:
            'Retractable, deluxe, SD, tension-fabric, X-stand, tabletop, and step-and-repeat banner stands in Beaumont, Port Arthur & Nederland TX.',
    },
    'rigid-and-metal-signs': {
        tagline: 'Coroplast, aluminum, PVC, acrylic & foam board — every rigid substrate.',
        description:
            'Rigid signs cut to size in the material the job actually calls for — cheap coroplast for a weekend yard sign, aluminum and aluminum composite for years outdoors, acrylic and PVC for a polished indoor look, foam and gator board for interiors and events.',
        seoDescription:
            'Custom coroplast, aluminum, aluminum composite, PVC, styrene, acrylic, foam board and gator board signs in Beaumont, Port Arthur & Nederland TX.',
    },
    'real-estate-signs': {
        tagline: 'Yard signs, H-stakes, posts, A-frames & rider frames.',
        description:
            'The full listing kit — panels with H-stakes for fast installs, heavier posts for premium listings, folding A-frames for open house day, and frames sized for riders and directionals.',
        seoDescription:
            'Custom real estate yard signs, H-stakes, posts, A-frames and rider frames in Beaumont, Port Arthur & Nederland TX. Agent and brokerage branding welcome.',
    },
    flags: {
        tagline: 'Feather, teardrop, rectangle & pole flags that catch the eye.',
        description:
            'Advertising flags that move in the wind and pull attention from the road. Feather, teardrop and rectangle shapes in several heights, plus custom pole flags and a desktop size for counters and booths.',
        seoDescription:
            'Custom feather flags, teardrop flags, rectangle flags and pole flags in Beaumont, Port Arthur & Nederland TX. Single or double-sided with bases and poles.',
    },
    'sidewalk-a-frame-signs': {
        tagline: 'Signicade & Simposign folding sidewalk signs.',
        description:
            'Portable A-frames that put your message on the sidewalk and fold away at close. Weighted, wind-resistant frames with replaceable printed panels, so you can change the message without buying the frame again.',
        seoDescription:
            'Signicade and Simposign sidewalk A-frame signs in Beaumont, Port Arthur & Nederland TX. Portable, weighted, with replaceable printed inserts.',
    },
    'event-tents': {
        tagline: 'Printed canopy tents with full & half sidewalls.',
        description:
            'Pop-up canopy tents printed with your branding across the canopy and valance, plus full and half sidewalls to close in the back and sides. Built for markets, festivals, job sites and game day.',
        seoDescription:
            'Custom printed event tents, canopies and tent sidewalls in Beaumont, Port Arthur & Nederland TX. Full-color branding with frames and weights available.',
    },
    'table-covers-and-throws': {
        tagline: 'Throws, stretch covers, runners & round table skirts.',
        description:
            'Printed covers for 4, 6 and 8 foot tables — classic loose throws, fitted stretch covers with a sharper look, round covers, and runners when you only need a branded stripe down the middle.',
        seoDescription:
            'Custom table throws, stretch table covers, round table covers and table runners in Beaumont, Port Arthur & Nederland TX for trade shows and events.',
    },
    'dtf-transfers': {
        tagline: 'Direct-to-film & UV DTF transfers you press on yourself.',
        description:
            'Full-color transfers shipped ready to press — DTF for fabric and apparel, UV DTF for hard surfaces like tumblers, glass and equipment. No weeding, no minimums, no cutting.',
        seoDescription:
            'Custom DTF and UV DTF heat transfers in Beaumont, Port Arthur & Nederland TX. Full color, gang sheets available, ready to press with no weeding.',
    },
    'sign-holders-and-display-frames': {
        tagline: 'Snap frames, poster stands & A-frame sign holders.',
        description:
            'Reusable frames and stands that hold a printed panel and let you swap it whenever the message changes — snap-open poster hangers, floor stands, banner A-frames and magnetic wood hangers.',
        seoDescription:
            'Snap poster frames, poster stands, banner A-frames and magnetic wood hangers in Beaumont, Port Arthur & Nederland TX. Swap the print, keep the frame.',
    },
    'hardware': {
        tagline: 'Bases, frames, poles, lights & replacement parts for your displays.',
        description:
            'Replacement hardware and accessories for the displays you already own — banner stand bases and cassettes, flag poles and bases, tent weights and rails, LED lights, and banner hanging kits. Priced per request; tell us your model and we will match it.',
        seoDescription:
            'Banner stand hardware, flag bases and poles, tent accessories, LED lights, and banner hanging kits in Beaumont, Port Arthur & Nederland TX. Quote-based to fit your display.',
    },
    'vinyl-decals-and-window-graphics': {
        tagline: 'Decals, window graphics, vehicle wraps, wall murals & floor graphics.',
        description:
            'Printed adhesive graphics for glass, walls, floors, and vehicles. Die-cut decals, one-way perforated window film, wrap-grade vehicle vinyl, removable wall fabric, and slip-rated floor decals.',
        seoDescription:
            'Custom vinyl decals, window graphics, perforated window film, vehicle wrap vinyl, wall murals, and floor graphics in Beaumont, Port Arthur & Nederland TX.',
    },
    'dimensional-letters': {
        tagline: 'Lit and unlit channel letters for storefronts and building fascia.',
        description:
            'Fabricated dimensional letters for exterior building signage — front-lit acrylic faces, halo-lit stainless returns, and premium welded construction. Quoted per sign, including layout and install guidance.',
        seoDescription:
            'Custom channel letters and dimensional building signs in Beaumont, Port Arthur & Nederland TX. Front-lit, halo-lit, and premium fabricated letters, quoted per sign.',
    },
    'trade-show-displays': {
        tagline: 'Fabric display walls, pop-ups & complete booth kits.',
        description:
            'Dye-sublimated trade show displays built on aluminum frames. Curved and straight fabric walls from 6 to 20 feet, velcro pop-ups, and full booth kits with counters and lighting.',
        seoDescription:
            'Trade show displays, fabric display walls, pop-up booths, and 10 ft and 20 ft booth kits in Beaumont, Port Arthur & Nederland TX. Free design help, fast turnaround.',
    },
    'seg-displays': {
        tagline: 'Silicone-edge graphics & backlit light box displays.',
        description:
            'SEG displays pair UV-printed silicone-edge fabric with extruded aluminum frames for a seamless, frameless finish. Backlit versions add even LED illumination, and graphics swap without replacing the frame.',
        seoDescription:
            'SEG displays and backlit light box displays in Beaumont, Port Arthur & Nederland TX. Silicone-edge graphics on aluminum frames, with replacement prints available.',
    },
    'canvas-and-poster-prints': {
        tagline: 'Posters, stretched canvas & framed canvas prints.',
        description:
            'Large-format prints for walls and displays. Posters on satin or matte stock, gallery-wrapped stretched canvas, and framed canvas in a choice of moulding — printed with archival pigment inks.',
        seoDescription:
            'Custom poster printing, stretched canvas, and framed canvas prints in Beaumont, Port Arthur & Nederland TX. Archival inks, custom sizes, fast turnaround.',
    },
}

// Search synonyms / alternate names buyers actually type, merged into each
// product's searchKeywords so the hub search matches the words customers use
// even when they differ from our catalog names (e.g. "pull up banner" ->
// retractable stands, "lawn sign" -> coroplast yard signs). Category-level
// terms apply to every product in the category; product-level terms are added
// on top for that specific product. Kept lowercase; multi-word phrases are
// single entries so a full-phrase search still matches.
export const CATEGORY_SEARCH_SYNONYMS = {
    banners: ['banner', 'custom banner', 'printed banner', 'advertising banner', 'vinyl banner', 'outdoor banner'],
    'banner-stands': [
        'banner stand', 'banner stands', 'retractable banner', 'retractable banner stand',
        'roll up banner', 'roll-up banner', 'rollup banner', 'pull up banner', 'pull-up banner',
        'pullup banner', 'pop up banner', 'pop-up banner', 'popup banner', 'display stand',
        'portable display', 'trade show display', 'exhibition banner',
    ],
    'rigid-and-metal-signs': ['rigid sign', 'metal sign', 'hard sign', 'business sign', 'panel sign'],
    'real-estate-signs': ['real estate sign', 'realtor sign', 'for sale sign', 'property sign'],
    flags: ['flag', 'advertising flag', 'feather flag', 'swooper flag', 'promotional flag'],
    'sidewalk-a-frame-signs': ['a frame sign', 'a-frame sign', 'sandwich board', 'sidewalk sign', 'signicade'],
    'event-tents': ['tent', 'canopy', 'pop up tent', 'pop-up tent', 'event canopy', 'canopy tent'],
    'table-covers-and-throws': ['table cover', 'table throw', 'tablecloth', 'table cloth', 'trade show table cover'],
    'dtf-transfers': ['dtf', 'dtf transfer', 'heat transfer', 'iron on transfer', 'direct to film'],
    'sign-holders-and-display-frames': ['sign holder', 'display frame', 'poster frame', 'sign stand', 'poster display'],
    'hardware': [
        'hardware', 'accessories', 'replacement parts', 'spare parts', 'banner stand parts',
        'banner stand base', 'replacement frame', 'flag pole', 'flag base', 'tent weights',
        'led light', 'banner hardware', 'stand base', 'display hardware',
    ],
    'vinyl-decals-and-window-graphics': [
        'decal', 'decals', 'sticker', 'stickers', 'vinyl decal', 'vinyl graphics', 'window decal',
        'window graphics', 'window sign', 'window lettering', 'storefront window', 'vehicle wrap',
        'car wrap', 'truck wrap', 'vehicle graphics', 'vehicle lettering', 'wall mural',
        'wall graphics', 'floor decal', 'floor graphics', 'adhesive vinyl',
    ],
    'dimensional-letters': [
        'channel letters', 'channel letter', 'dimensional letters', '3d letters', 'lit letters',
        'illuminated letters', 'storefront letters', 'building letters', 'building sign',
        'storefront sign', 'fascia sign', 'led sign letters',
    ],
    'trade-show-displays': [
        'trade show display', 'tradeshow display', 'trade show booth', 'booth display',
        'exhibit display', 'exhibition stand', 'pop up display', 'pop-up display',
        'fabric display', 'display wall', 'backdrop wall', 'booth kit', 'expo display',
    ],
    'seg-displays': [
        'seg', 'seg display', 'silicone edge graphic', 'silicon edge graphic', 'light box',
        'lightbox', 'lightbox display', 'backlit display', 'illuminated display',
        'frameless display', 'led light box',
    ],
    'canvas-and-poster-prints': [
        'poster', 'posters', 'poster printing', 'large poster', 'canvas', 'canvas print',
        'stretched canvas', 'framed canvas', 'photo print', 'wall art', 'art print',
    ],
}

export const PRODUCT_SEARCH_SYNONYMS = {
    // Banners
    '13oz-vinyl-banner': ['vinyl banner', '13oz banner', 'pvc banner', 'outdoor banner', 'standard banner'],
    'mesh-banner': ['mesh banner', 'fence banner', 'fence wrap', 'perforated banner', 'wind banner'],
    '18oz-blockout-banner': ['blockout banner', 'double sided banner', 'heavy duty banner', 'opaque banner', 'blackout banner'],
    '9oz-fabric-banner': ['fabric banner', 'cloth banner', 'polyester banner', 'wrinkle free banner'],
    'pole-banner': ['pole banner', 'street pole banner', 'light pole banner', 'boulevard banner', 'avenue banner'],
    'tension-fabric-banner': ['tension fabric banner', 'stretch fabric banner', 'sock banner'],
    'backlit-banner': ['backlit banner', 'lightbox banner', 'illuminated banner', 'light box banner'],
    'indoor-banner': ['indoor banner', 'hanging banner', 'wall banner'],
    'blockout-fabric-banner': ['blockout fabric banner', 'double sided fabric banner', 'opaque fabric banner'],
    'hand-held-banner': ['hand held banner', 'handheld banner', 'rally banner', 'protest banner', 'parade banner'],

    // Banner stands
    'standard-retractable': [
        'retractable banner', 'roll up banner', 'pull up banner', 'pop up banner', 'retractable stand',
        'standard retractable banner stand', 'portable banner', 'economy retractable',
    ],
    'deluxe-retractable': ['deluxe retractable banner', 'premium retractable', 'deluxe roll up banner', 'deluxe pull up banner'],
    'sd-retractable': ['sd retractable', 'single sided retractable', 'wide retractable banner', 'jumbo retractable'],
    'x-stand': ['x banner stand', 'x-stand', 'x banner', 'x frame banner', 'spider stand', 'x-frame stand'],
    'step-and-repeat-backdrop': [
        'step and repeat', 'step and repeat backdrop', 'media wall', 'press wall', 'photo backdrop',
        'event backdrop', 'red carpet banner', 'photo wall',
    ],
    'tension-fabric-stand': ['tension fabric display', 'fabric display stand', 'pop up display', 'trade show display', 'tube display'],
    'table-top-banner-stand': ['tabletop banner stand', 'table top banner', 'mini banner stand', 'desktop banner stand', 'counter banner'],

    // Rigid & metal signs
    'coroplast-yard-signs': [
        'yard sign', 'lawn sign', 'coroplast sign', 'coro sign', 'corrugated plastic sign',
        'plastic yard sign', 'campaign sign', 'political sign', 'bandit sign',
    ],
    'car-and-vehicle-magnets': ['car magnet', 'vehicle magnet', 'magnetic sign', 'truck magnet', 'door magnet', 'car magnet sign'],
    'aluminum-metal-signs': ['aluminum sign', 'metal sign', 'parking sign', 'street sign', 'aluminum metal sign'],
    'foam-board-signs': ['foam board sign', 'foamcore sign', 'foam core sign', 'presentation board'],
    'aluminum-composite-signs': ['aluminum composite sign', 'dibond sign', 'acm sign', 'composite panel sign'],
    'acrylic-signs': ['acrylic sign', 'plexiglass sign', 'plexi sign', 'lobby sign', 'office sign'],
    'pvc-signs': ['pvc sign', 'sintra sign', 'expanded pvc sign', 'foamed pvc sign'],
    'gator-board-signs': ['gator board sign', 'gatorboard sign', 'gator foam sign'],
    'styrene-signs': ['styrene sign', 'thin plastic sign'],

    // Real estate signs
    'yard-sign-and-h-stake': ['real estate yard sign', 'h stake sign', 'h-stake', 'for sale sign', 'realtor yard sign', 'open house sign'],
    'real-estate-a-frame': ['real estate a frame', 'realtor a frame', 'open house a frame', 'real estate sandwich board'],
    'real-estate-post': ['real estate post', 'realtor post', 'for sale post', 'hanging real estate sign'],
    'real-estate-frame': ['real estate frame', 'yard sign frame', 'metal sign frame', 'realtor sign frame'],

    // Flags
    'feather-angled-flag': ['feather flag', 'swooper flag', 'angled feather flag', 'bow flag', 'advertising flag'],
    'teardrop-flag': ['teardrop flag', 'tear drop flag', 'droplet flag'],
    'feather-convex-flag': ['convex feather flag', 'straight feather flag', 'quill flag'],
    'econo-feather-flag': ['economy feather flag', 'budget feather flag', 'cheap feather flag', 'econo flag'],
    'rectangle-flag': ['rectangle flag', 'rectangular flag', 'blade flag', 'straight flag'],
    'custom-pole-flag': ['pole flag', 'custom flag', 'flagpole flag', 'printed flag'],
    'desktop-teardrop-flag': ['desktop flag', 'mini teardrop flag', 'table flag', 'small feather flag'],

    // Sidewalk A-frame signs
    'standard-signicade': ['a frame sign', 'sandwich board', 'sidewalk sign', 'signicade', 'standard a frame'],
    'deluxe-signicade': ['deluxe a frame', 'deluxe sandwich board', 'heavy duty a frame', 'deluxe signicade'],
    'simposign-ii': ['simposign', 'spring sidewalk sign', 'wind resistant a frame', 'sidewalk a frame'],

    // Event tents
    'event-tent': ['pop up tent', 'canopy tent', 'custom tent', 'trade show tent', 'ez up tent', 'instant canopy', 'market tent'],
    'tent-full-wall': ['tent full wall', 'tent side wall', 'full canopy wall', 'tent back wall'],
    'tent-half-wall': ['tent half wall', 'half canopy wall', 'tent rail skirt'],

    // Table covers & throws
    '6-table-throw': ['6 foot table cover', '6ft table throw', '6 ft tablecloth', 'six foot table cover'],
    '8-table-throw': ['8 foot table cover', '8ft table throw', '8 ft tablecloth', 'eight foot table cover'],
    '4-table-throw': ['4 foot table cover', '4ft table throw', '4 ft tablecloth', 'four foot table cover', 'small table cover'],
    'stretch-table-throw': ['stretch table cover', 'spandex table cover', 'fitted table cover', 'stretch tablecloth'],
    'round-table-cover': ['round table cover', 'round tablecloth', 'cocktail table cover', 'bistro table cover'],
    'table-runner': ['table runner', 'printed table runner'],
    'solid-color-table-throws': ['solid color table cover', 'blank table throw', 'plain tablecloth', 'unprinted table cover'],

    // DTF transfers
    'dtf-transfer': ['dtf transfer', 'direct to film transfer', 'dtf print', 'heat transfer', 't shirt transfer', 'custom transfer'],
    'uv-dtf': ['uv dtf', 'uv transfer', 'uv dtf sticker', 'ab film transfer', 'uv dtf wrap'],

    // Sign holders & display frames
    'poster-stand': ['poster stand', 'sign stand', 'poster display stand', 'sidewalk poster stand'],
    'banner-a-frame': ['banner a frame', 'banner stand a frame', 'a frame banner display'],
    'snap-poster-hanger': ['snap frame', 'poster hanger', 'snap poster frame', 'poster snap frame'],
    'magnetic-wood-frame-hanger': ['wood poster hanger', 'wooden poster hanger', 'magnetic wood frame', 'magnetic poster hanger'],

    // Vinyl decals & window graphics
    'adhesive-vinyl-decals': ['vinyl decals', 'custom stickers', 'die cut decals', 'cut vinyl lettering', 'logo decals'],
    'high-performance-adhesive-vinyl': ['cast vinyl', 'high performance vinyl', 'long term vinyl', 'conformable vinyl'],
    'vehicle-wrap-vinyl': ['vehicle wrap', 'car wrap', 'truck wrap', 'van wrap', 'partial wrap', 'full wrap', '3m wrap film', 'fleet wrap'],
    'perforated-window-vinyl': ['window perf', 'perforated vinyl', 'one way vision', 'see through window graphics', 'rear window graphics'],
    'window-cling': ['window cling', 'static cling', 'removable window sign', 'reusable window decal'],
    'clear-window-decals': ['clear decals', 'clear vinyl', 'glass decals', 'door logo decal', 'window lettering'],
    'adhesive-wall-fabric': ['wall mural', 'wall wrap', 'peel and stick wallpaper', 'removable wall graphics', 'wall fabric'],
    'floor-graphics': ['floor decal', 'floor sticker', 'anti slip floor graphic', 'floor wayfinding', 'aisle graphics'],
    'reflective-adhesive-vinyl': ['reflective vinyl', 'reflective decals', 'reflective lettering', 'dot lettering', 'night visible decals'],
    'dry-erase-adhesive-vinyl': ['dry erase vinyl', 'whiteboard vinyl', 'whiteboard wall', 'peel and stick whiteboard', 'writable wall'],

    // Dimensional letters
    'standard-channel-letters': ['channel letters', 'front lit letters', 'acrylic face letters', 'storefront letters', 'lit letters'],
    'halo-lit-channel-letters': ['halo lit letters', 'reverse lit letters', 'backlit letters', 'stainless letters', 'halo letters'],
    'premium-channel-letters': ['premium channel letters', 'welded channel letters', 'stainless return letters', 'custom fabricated letters'],

    // Trade show displays
    'straight-tension-fabric-display-wall': ['straight fabric display', 'straight display wall', 'tension fabric wall', 'trade show wall'],
    'curved-tension-fabric-display-wall': ['curved fabric display', 'curved display wall', 'curved trade show display'],
    'straight-pop-up-fabric-display': ['straight pop up display', 'velcro pop up', 'pop up booth wall'],
    'curved-pop-up-fabric-display': ['curved pop up display', 'velcro pop up display', 'curved booth wall'],
    'trade-show-booth-kit': ['booth kit', 'trade show package', '10x10 booth', '20 ft booth', 'exhibit kit', 'booth bundle'],

    // SEG displays
    'seg-display': ['seg display', 'silicone edge display', 'frameless fabric display', 'seg wall'],
    'seg-backlit-display': ['backlit seg', 'light box display', 'backlit fabric display', 'illuminated seg'],
    'seg-backlit-pop-up-display': ['backlit pop up', 'portable light box', 'backlit pop up display'],
    'seg-replacement-fabric-print': ['seg replacement graphic', 'replacement fabric print', 'seg reprint', 'new seg graphic'],

    // Canvas & poster prints
    'poster-print': ['poster', 'poster printing', 'custom poster', 'large format poster', 'movie poster print'],
    'stretched-canvas-print': ['stretched canvas', 'canvas print', 'gallery wrap', 'canvas photo'],
    'framed-canvas-print': ['framed canvas', 'framed print', 'floating frame canvas', 'framed wall art'],

    // Hardware & accessories
    'retractable-banner-stand-hardware': ['retractable stand base', 'roll up stand hardware', 'banner cassette', 'replacement banner base', 'stand replacement'],
    'tension-fabric-stand-hardware': ['tension fabric frame', 'tube stand hardware', 'fabric display frame', 'replacement tube frame'],
    'x-banner-stand-hardware': ['x stand frame', 'x banner frame', 'replacement x stand', 'x frame hardware'],
    'step-and-repeat-backdrop-frame': ['backdrop frame', 'step and repeat frame', 'media wall frame', 'adjustable backdrop stand', 'telescopic backdrop frame'],
    'banner-stand-led-light': ['led light bar', 'banner stand light', 'display light', 'clip on led light', 'stand spotlight'],
    'flag-bases': ['flag base', 'flag stand', 'cross base', 'ground stake', 'water bag base', 'flag ground spike'],
    'flag-poles': ['flag pole', 'feather flag pole', 'replacement flag pole', 'pole kit', 'flag pole set'],
    'tent-accessories': ['tent weights', 'tent weight bags', 'tent rail bar', 'canopy weights', 'tent stakes', 'tent carry bag'],
    'banner-hardware-kit': ['banner hanging kit', 'grommets', 'bungee cords', 'pole pockets', 'zip ties', 'banner mounting hardware'],
}

