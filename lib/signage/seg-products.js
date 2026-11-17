export const SEG_CATEGORY = 'SEG Displays'

const NON_LIT = 'Non-lit SEG Displays'
const BACKLIT = 'Backlit SEG Displays'
const FABRIC_AND_WALL = 'SEG Fabric & Wall Displays'
const portableMaterials = ['6 oz. UV-printed SEG fabric', 'Aluminum frame with a channel for the sewn silicone edge']
const backlitMaterials = ['6 oz. premium backlit fabric', 'Aluminum frame with internal LEDs']
const printOptions = ['Frame and graphic kit or replacement graphic only', 'Single- or double-sided printing']
const backlitOptions = [...printOptions, 'Blackout backing included with single-sided kits']

const wallRectangles = [
    [24, 36], [24, 46], [24, 60], [24, 72], [36, 46],
    [36, 60], [36, 72], [46, 60], [46, 72], [60, 72],
]
const wallSquares = [24, 36, 46, 60, 72].map((side) => [side, side])
const wallSize = ([width, height]) => `${width}″ × ${height}″`

export const SEG_PRODUCTS = [
    {
        name: '3ft SEG Fabric Stand',
        group: NON_LIT,
        size: [33.45, 78.75, 18],
        intro: 'A slim, upright fabric stand for a shop entrance, check-in table, or small booth. The fabric presses into the aluminum frame and can be swapped between events.',
        alt: 'Tall, narrow non-lit SEG stand on silver feet with a Neches Fern Nursery graphic',
        materials: portableMaterials,
        options: printOptions,
    },
    {
        name: '10ft SEG Fabric Display',
        group: NON_LIT,
        size: [118.1, 88.6, 18],
        intro: 'A freestanding non-lit fabric wall for a 10 ft booth, retail floor, or photo backdrop. The slim aluminum frame holds a full-width fabric graphic with a clean edge.',
        alt: 'Non-lit 10 ft SEG fabric wall with a Neches Loom Home graphic and low silver feet',
        materials: portableMaterials,
        options: printOptions,
    },
    {
        name: '20ft SEG Fabric Display',
        group: NON_LIT,
        size: [236.2, 88.6, 18],
        intro: 'A wide, non-lit backdrop for a double booth or an event wall. One continuous fabric graphic spans the aluminum frame.',
        alt: 'Extra-wide non-lit SEG fabric backdrop with a Sabine Timber Outfitters graphic',
        materials: portableMaterials,
        options: printOptions,
    },
    {
        name: '10ft SEG Backlit Fabric Display',
        group: BACKLIT,
        size: [118.1, 88.6, 17],
        intro: 'A slim LED light box for trade shows and storefront promotions. Internal lighting illuminates the silicone-edge fabric from behind.',
        alt: 'Slim 10 ft backlit aluminum SEG light box with a Gulfglade Wellness graphic',
        materials: backlitMaterials,
        options: backlitOptions,
    },
    {
        name: '8ft SEG Backlit Pop-Up Display',
        group: BACKLIT,
        size: [87.8, 87.8, 15],
        intro: 'A square LED display built around a collapsible aluminum pop-up frame. Fabric side panels cover the deeper frame for a finished edge at events.',
        alt: 'Square illuminated SEG pop-up with a deep printed side and a Cypress Bay Coffee Roasters graphic',
        materials: [...backlitMaterials, 'Collapsible pop-up frame with fabric edges'],
        options: backlitOptions,
    },
    {
        name: '10ft SEG Backlit Pop-Up Display',
        group: BACKLIT,
        size: [117.3, 87.8, 15],
        intro: 'A landscape LED backdrop with a collapsible aluminum pop-up frame and fabric side panels. The wider face suits a 10 ft booth or a large event display.',
        alt: 'Wide illuminated SEG pop-up with a deep printed side and a Bayou Lark Events graphic',
        materials: [...backlitMaterials, 'Collapsible pop-up frame with fabric edges'],
        options: backlitOptions,
    },
    {
        name: 'Custom SEG Fabric',
        group: FABRIC_AND_WALL,
        label: 'Graphic only · Up to 40 ft × 10 ft',
        intro: 'A made-to-size, non-lit replacement graphic for compatible SEG frames you already own. Provide the visible width and height of the installed graphic for a quote.',
        alt: 'Loose Marsh & Miel Bakery SEG fabric turned over at a corner to show the sewn silicone edge',
        materials: ['6 oz. UV-printed polyester fabric', '3 mm × 11 mm silicone keder sewn into the edge'],
        options: ['Custom sizing up to 40 ft × 10 ft', 'Graphic only'],
    },
    {
        name: 'Wall Mount SEG',
        group: FABRIC_AND_WALL,
        label: 'Black aluminum frame · 15 sizes',
        sizes: [...wallRectangles, ...wallSquares].map(wallSize),
        intro: 'A low-profile black aluminum wall frame with a replaceable fabric graphic. Use it for lobby signage, retail promotions, or indoor wall décor.',
        alt: 'Slim black wall-mounted SEG frame displaying a Port Neches Botanicals graphic',
        materials: ['6 oz. UV-printed polyester fabric', '3 mm × 11 mm silicone keder', 'Black aluminum frame'],
        options: ['Frame and graphic kit with mounting hardware', 'Replacement graphic only'],
        sizeGroups: [
            { title: 'Rectangular sizes', items: wallRectangles.map(wallSize) },
            { title: 'Square sizes', items: wallSquares.map(wallSize) },
        ],
    },
]
