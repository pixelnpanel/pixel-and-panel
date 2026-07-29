export const cityServiceCities = {
  'beaumont-tx': {
    name: 'Beaumont',
    state: 'TX',
    slug: 'beaumont-tx',
    region: 'Southeast Texas',
    context: 'Beaumont is the largest city in Southeast Texas, with a busy mix of contractors, restaurants, medical offices, retail shops, and service companies.',
    businessTypes: 'contractors, restaurants, retail shops, medical offices, and local service companies',
    landmark: 'along Calder Avenue, Phelan Boulevard, and the Beaumont Enterprise corridor',
    highways: 'I-10, US-69, and Loop 380',
    neighborhoods: 'Calder Avenue, Phelan Boulevard, the Medical Center District, and Dowlen Road',
    permitOffice: 'City of Beaumont Development Services',
  },
  'nederland-tx': {
    name: 'Nederland',
    state: 'TX',
    slug: 'nederland-tx',
    region: 'Southeast Texas',
    context: 'Nederland is a tight-knit community between Beaumont and Port Arthur, home to local businesses that rely on neighborhood visibility and word-of-mouth.',
    businessTypes: 'local shops, service companies, contractors, and family-owned businesses',
    landmark: 'along Nederland Avenue and Boston Avenue',
    highways: 'US-69 and Highway 365',
    neighborhoods: 'Nederland Avenue, Boston Avenue, and the Highway 365 commercial corridor',
    permitOffice: 'City of Nederland Public Works',
  },
  'port-arthur-tx': {
    name: 'Port Arthur',
    state: 'TX',
    slug: 'port-arthur-tx',
    region: 'Southeast Texas',
    context: 'Port Arthur is a working city with a strong mix of industrial, retail, and service businesses that need clear branding to stand out in a competitive local market.',
    businessTypes: 'contractors, auto shops, restaurants, retail, and industrial service companies',
    landmark: 'along Gulfway Drive, Memorial Boulevard, and 39th Street',
    highways: 'US-69, TX-73, and Gulfway Drive',
    neighborhoods: 'Gulfway Drive, Memorial Boulevard, 39th Street, and the Jimmy Johnson Boulevard corridor',
    permitOffice: 'City of Port Arthur Community Development',
  },
}

export const cityServiceServices = {
  'vehicle-graphics': {
    name: 'Truck Lettering & Wraps',
    type: 'signage',
    mainHref: '/signage',
    quoteProduct: 'Truck Lettering & Wraps',
    quoteCategory: 'Signage',
    seo: {
      'beaumont-tx': {
        title: 'Vehicle Graphics Beaumont TX | Truck Lettering & Wraps',
        description: 'Custom truck lettering, wraps, magnets, and fleet decals for Beaumont businesses. Durable vinyl that turns work trucks into moving ads. Free quote.',
      },
    },
    headline: (city) => `Commercial Vehicle Wraps & Truck Lettering in ${city.name}, TX`,
    intro: (city) => `Every mile you drive through ${city.name} is a chance to get noticed. Pixel & Panel designs, prints, and installs durable vehicle lettering, partial wraps, magnetic signs, and fleet graphics for work trucks, vans, trailers, and service vehicles.`,
    localContext: (city) => `In ${city.name}, customers often see your vehicle before they visit your website, read your reviews, or receive your business card. Contractors working ${city.neighborhoods}, delivery drivers covering ${city.region}, and service teams running calls across ${city.highways} all have one thing in common: the vehicle is the first impression. A professionally lettered truck projects credibility before you knock on the door. A consistent fleet tells customers you are an established local business, not just another unmarked vehicle passing through.`,
    pricingNote: 'Simple door lettering (name, phone, website) typically starts under $300. Partial wraps run $500–$1,200. Full wraps vary by vehicle size — most service vans and trucks fall in the $2,000–$4,500 range installed.',
    industries: (city) => [
      `HVAC, plumbing, and electrical contractors in ${city.name}`,
      `Landscaping and lawn care companies serving ${city.region}`,
      `Pest control and cleaning services`,
      `Delivery and courier businesses`,
      `Real estate agents and mortgage brokers`,
      `Auto repair and mobile mechanic services`,
    ],
    process: [
      ['Share your vehicle details', 'Tell us your vehicle type, year, and what coverage you have in mind — full wrap, partial, or lettering only.'],
      ['Get a design concept', 'We create a design that fits your brand, is readable at street speed, and works with your vehicle\'s curves and trim.'],
      ['Approve and schedule install', 'Once you approve the design, we schedule production and installation. Most jobs are complete within 5–7 business days.'],
      ['Drive and get noticed', 'Your wrapped vehicle starts working immediately — reaching new customers every day across Southeast Texas.'],
    ],
    benefits: [
      'Turn work trucks and vans into daily local advertising',
      'Build brand recognition across neighborhoods and job sites',
      'Professional appearance that builds trust before the first conversation',
      'Full wraps, partial graphics, magnets, or simple door lettering — your budget, your call',
    ],
    cityUses: (city) => [
      `Contractors and service trucks working across ${city.name} neighborhoods`,
      `Delivery vehicles and mobile services covering the ${city.region} area`,
      `Fleet branding for companies with multiple vehicles in ${city.name}`,
      `Independent contractors and professionals who drive to client locations`,
    ],
    faqs: (city) => [
      [`How much do vehicle wraps or lettering cost in ${city.name}?`, `Pricing depends on vehicle size and coverage. Simple lettering (name, phone, website) typically starts under $300. Partial wraps range from $500–$1,200. Full wraps vary by vehicle size but generally run $2,000–$4,500 installed. Request a quote and we'll give you an exact number for your vehicle.`],
      [`How long do vehicle graphics last in ${city.name}'s heat?`, `Quality cast vinyl used on professional installs typically lasts 5–7 years even in Southeast Texas heat. We use industry-grade materials rated for UV and high-temperature exposure. Proper washing (no pressure washers directly on edges) extends the life significantly.`],
      [`Can I remove vehicle graphics later?`, `Yes. Professionally installed cast vinyl removes cleanly without damaging the paint when done correctly. We can also help with removal if you're rebranding or selling the vehicle.`],
      [`Do I need to bring my vehicle somewhere for installation?`, `Yes — professional installation requires a controlled environment for proper adhesion and a bubble-free finish. We'll schedule a time that works around your business hours. Most full wraps take one full day; lettering and partials are typically done in a few hours.`],
      [`Can vehicle graphics work with my existing logo and brand colors?`, `Absolutely. Send us your logo file (or let us know if you need a logo first) and we'll match your brand colors exactly in the wrap design. If you don't have a logo yet, we can create one as part of the project.`],
    ],
    crossSell: { label: 'QR Code Campaigns', href: '/digital/qr-code-campaigns', description: 'Add a QR code to your wrap that sends customers directly to your quote form or website.' },
  },

  'storefront-signs': {
    name: 'Storefront Signs',
    type: 'signage',
    mainHref: '/signage',
    quoteProduct: 'Storefront Signs',
    quoteCategory: 'Signage',
    seo: {
      'port-arthur-tx': {
        title: 'Custom Signs Port Arthur TX | Storefront Signs',
        description: 'Custom storefront signs for Port Arthur businesses, shops, offices, and service companies. Get clean design, production guidance, and a fast quote.',
      },
    },
    headline: (city) => `Storefront Signs in ${city.name}, TX`,
    intro: (city) => `Make sure your ${city.name} location is easy to find and hard to ignore. Pixel & Panel designs and produces storefront signs, dimensional letters, illuminated channel letters, monument-style displays, and durable exterior panels matched to your brand.`,
    localContext: (city) => `${city.name} businesses compete for attention ${city.landmark} — areas where potential customers drive past dozens of options before deciding where to stop. A weak or missing storefront sign does not just hurt visibility; it can make a business feel less established. For ${city.businessTypes}, a professional exterior sign is one of the most visible pieces of marketing you own. It works every day, and unlike digital ads, it does not disappear when an ad budget pauses. Most ${city.name} commercial corridors also have sign regulations set by the ${city.permitOffice} — knowing those requirements before you order saves time and avoids costly revisions.`,
    pricingNote: 'Flat aluminum panel signs typically start around $300–$600. Dimensional letter sets run $500–$1,500 depending on material and size. Illuminated channel letters — the most visible option for evening-traffic businesses — generally start at $2,000 and up.',
    industries: (city) => [
      `Restaurants and food service businesses in ${city.name}`,
      `Retail shops and boutiques along ${city.neighborhoods.split(',')[0]}`,
      `Auto repair, tire, and service shops`,
      `Medical, dental, and professional office suites`,
      `Churches and community organizations`,
      `New businesses opening anywhere in ${city.region}`,
    ],
    process: [
      ['Tell us about your location', 'Share your building type, lease restrictions, and what you want customers to see from the street.'],
      ['Design and permit review', 'We create a sign design that fits your brand and your building, and can guide you through the local permit process.'],
      ['Production and installation', 'Once approved, we produce and install your sign. Standard production runs 5–10 business days.'],
      ['Stand out from day one', 'Your sign immediately improves foot traffic visibility and reinforces your brand every day it\'s up.'],
    ],
    benefits: [
      'Make your location easy to find and recognize from the street',
      'Build trust and professionalism before customers walk in',
      'Options for illuminated channel letters, dimensional letters, monument signs, and flat panels',
      'Designed to hold up through Southeast Texas weather year-round',
    ],
    cityUses: (city) => [
      `Retail storefronts and service businesses ${city.landmark}`,
      `New business openings and rebrands across ${city.name}`,
      `Office buildings and professional services in ${city.name}`,
      `Restaurants and food businesses that need visible, durable exterior signage`,
    ],
    faqs: (city) => [
      [`Do I need a permit for a storefront sign in ${city.name}?`, `Most permanent exterior signs require a permit from the ${city.permitOffice}. Requirements vary based on size, lighting, and location. Pixel & Panel can guide you through what's typically needed — and in many cases help with the permit application process.`],
      [`What types of storefront signs work best in ${city.name}?`, `For most ${city.name} businesses, dimensional lettering (acrylic or metal letters mounted to the building face) or aluminum composite panel signs are the most durable and professional options. Illuminated channel letters are the top choice for businesses with evening hours or high-traffic locations.`],
      [`How long does a storefront sign take to produce?`, `Standard production runs 5–10 business days after design approval. Complex illuminated signs or permit-required installations may take 2–4 weeks total. Rush options are sometimes available — ask when you request your quote.`],
      [`Can I get a sign that matches my existing logo and colors?`, `Yes. Provide your logo file and brand guidelines and we'll match them exactly. If you don't have a logo yet or need a refresh, we can handle that as part of the project. Consistent branding between your sign, website, and print materials is part of what makes a business look established.`],
      [`What's the most common mistake ${city.name} businesses make with storefront signs?`, `Trying to fit too much information on the sign. A storefront sign has one job: make customers recognize your business and feel confident walking in. Business name, logo, and maybe your key service line. Phone number and hours belong on your door and your Google profile — not on your primary sign.`],
    ],
    crossSell: { label: 'Local SEO', href: '/digital/local-seo', description: 'A great storefront sign brings in walk-in traffic. Local SEO brings in the customers searching online.' },
  },

  'metal-signs': {
    name: 'Metal Signs',
    type: 'signage',
    mainHref: '/signage/rigid-and-metal-signs',
    quoteProduct: 'Metal Signs',
    quoteCategory: 'Signage',
    seo: {
      'beaumont-tx': {
        title: 'Metal Signs Beaumont TX | Custom Outdoor & Business Signs',
        description: 'Custom aluminum and metal signs for Beaumont businesses, job sites, and property — rust-proof and built to last through Texas heat and weather. Free quote.',
      },
    },
    headline: (city) => `Custom Metal Signs in ${city.name}, TX`,
    intro: (city) => `Pixel & Panel designs and produces durable custom metal signs for ${city.name} businesses, offices, shops, job sites, property managers, and outdoor uses that need a cleaner, longer-lasting sign.`,
    localContext: (city) => `Metal signs work well for ${city.name} businesses because they can handle heat, rain, and everyday exposure better than temporary materials. For shops, offices, contractors, industrial teams, and property managers around ${city.neighborhoods}, a clean aluminum or composite metal sign can identify a location, mark a job site, direct visitors, or make a business look more established from the street.`,
    pricingNote: 'Flat aluminum and composite metal signs are quoted by size, material thickness, finish, mounting needs, and quantity. Small property or office signs often start in the low hundreds; larger business and outdoor signs are quoted after sizing and design review.',
    industries: (city) => [
      `Retail shops and service businesses in ${city.name}`,
      `Contractors and job sites across ${city.region}`,
      `Industrial and warehouse locations`,
      `Property managers and leasing offices`,
      `Medical, dental, and professional offices`,
      `Churches, schools, and local organizations`,
    ],
    process: [
      ['Share the sign location', 'Tell us where the sign will be used, how large it needs to be, and whether it will mount to a wall, post, fence, or frame.'],
      ['Design and material recommendation', 'We match the design, material thickness, and finish to your use case so the sign is readable and durable.'],
      ['Approve the proof', 'You review the layout before production so the wording, logo, colors, and sizing are correct.'],
      ['Produce and prepare for install', 'We produce the sign and prepare mounting holes or hardware notes based on your installation plan.'],
    ],
    benefits: [
      'Durable outdoor option for business, office, and property signs',
      'Clean professional finish for permanent or long-term use',
      'Good for walls, posts, fences, job sites, and directional signs',
      'Readable design support before production',
    ],
    cityUses: (city) => [
      `Business identification signs near ${city.neighborhoods.split(',')[0]}`,
      `Contractor and job site signs around ${city.name}`,
      `Parking, wayfinding, and property signs`,
      `Office, shop, warehouse, and facility signs`,
    ],
    faqs: (city) => [
      [`Are metal signs good outdoors in ${city.name}?`, `Yes. Aluminum and composite metal signs are common choices for outdoor business, property, and job site signs in Southeast Texas because they resist rust, warping, heat, and rain better than temporary materials.`],
      [`What kind of metal sign should I use?`, `Most business and property signs use aluminum or aluminum composite material. The right choice depends on size, mounting location, expected wear, and whether the sign needs a premium or utility finish.`],
      [`Can metal signs be mounted to posts or fences?`, `Yes. Metal signs can be produced with mounting holes and used on posts, fences, walls, frames, and many flat surfaces. Share your mounting plan when you request a quote so the sign is prepared correctly.`],
      [`How long does a metal sign take to produce?`, `Most standard metal signs are ready within 5-10 business days after proof approval. Larger signs, specialty finishes, or installation planning can add time.`],
      [`Can Pixel & Panel design the sign too?`, `Yes. We can create a clean layout from your logo, colors, message, and sign location so the finished sign is readable and print-ready.`],
    ],
    crossSell: { label: 'Storefront Signs', href: '/signage', description: 'If the metal sign is part of a larger storefront update, review the broader storefront sign options too.' },
  },

  'vinyl-banners': {
    name: 'Vinyl Banners',
    type: 'signage',
    mainHref: '/signage/banners',
    quoteProduct: 'Vinyl Banners',
    quoteCategory: 'Signage',
    showDigitalSupport: false,
    showVisibilityCta: false,
    seo: {
      'beaumont-tx': {
        title: 'Custom Banners Beaumont TX | Vinyl Banners & Event Banners',
        description: 'Order custom vinyl banners for Beaumont TX businesses, events, churches, schools, and grand openings. Full-color design and print from Pixel & Panel.',
      },
    },
    headline: (city) => city.slug === 'beaumont-tx'
      ? 'Custom Banners in Beaumont TX'
      : `Custom Banners in ${city.name}, TX`,
    intro: (city) => city.slug === 'beaumont-tx'
      ? `Need custom banners Beaumont customers can read from the street, a fence line, or an event booth? Pixel & Panel designs and produces vinyl banners Beaumont TX businesses use for grand openings, seasonal promotions, job sites, churches, schools, restaurants, and community events. The goal is simple: a banner that looks professional, says the right thing fast, and gives people one clear next step.`
      : `Need custom banners for a ${city.name} promotion, event, storefront, or job site? Pixel & Panel designs and produces vinyl banners that are easy to read, built for outdoor use, and matched to the way customers will actually see them.`,
    localContext: (city) => `In ${city.name}, banners are one of the most common short-term marketing tools, especially around ${city.neighborhoods}. They are also easy to waste when the message is too small, too crowded, or sized for the wrong viewing distance. A banner hanging near a ${city.name} shopping strip, on a contractor fence, or at a school fundraiser needs a different layout than an indoor registration table. Pixel & Panel helps match material, size, finishing, and copy to the actual location. For event banners ${city.name} groups can reuse, we keep the wording evergreen when possible. For business banners ${city.name} customers need to act on quickly, we make the service, offer, phone number, and deadline clear without clutter.`,
    pricingNote: "A standard 3' x 8' banner runs $60-$120 depending on material weight and quantity. Larger job site banners (4' x 12' or bigger) typically fall in the $100-$250 range. Rush production is available for most sizes.",
    industries: (city) => [
      `Grand opening and seasonal promotions for ${city.name} retailers`,
      `Job site and fence advertising for contractors`,
      `Church and community event announcements`,
      `Restaurant specials and limited-time menu offers`,
      `School fundraisers and organization events`,
      `Real estate open house and new listing banners`,
    ],
    process: [
      ['Tell us the size and location', 'Where will the banner hang or stake? How far away will people read it? We size the banner and lettering around your actual use case.'],
      ['Design or submit your artwork', 'We design your banner from scratch or build from your logo and brand colors. Most designs are ready to review within 1 business day.'],
      ['Approve and print', 'Once you approve the design, production typically takes 2–3 business days. Rush options available.'],
      ['Pick up or delivery', 'Banners ship flat or rolled, ready to hang. We include grommets, hemmed edges, and any requested hardware.'],
    ],
    benefits: [
      'Fast turnaround — ready in 3–5 business days',
      'Durable outdoor materials rated for Southeast Texas weather',
      "Custom sizes from 2'×4' to large job site banners",
      'Grommets, pole pockets, and hemmed edges included',
      'Plain-English design support so the message stays readable',
    ],
    cityUses: (city) => [
      `Grand openings and special promotions for ${city.name} businesses`,
      `Job site and fence advertising for contractors working across ${city.name}`,
      `Church, school, and community events throughout ${city.region}`,
      `Seasonal sales and limited-time offers for local retail and restaurants`,
      `Outdoor business banners near ${city.neighborhoods}`,
    ],
    faqs: (city) => [
      [`What banner size do I need for my ${city.name} business?`, `It depends on viewing distance. For a storefront or fence seen from 30+ feet away, a 3' x 8' or 4' x 8' banner with 3-4 inch lettering works well. For indoor events or closer viewing, a 2' x 4' or 2' x 6' banner is usually enough. Share the location and Pixel & Panel can recommend the right size before you order.`],
      [`How long will an outdoor banner last in ${city.name}?`, `Standard 13oz vinyl usually holds up 1-2 years outdoors. If the banner will stay in direct sun or be reused often, 18oz heavy-duty vinyl is a better choice. Removing banners before severe weather and storing them rolled, not folded, helps them last longer in Southeast Texas heat and humidity.`],
      [`Can Pixel & Panel design custom banners ${city.name} TX businesses can reuse?`, `Yes. If you have a logo, colors, and message, we can create a clean banner layout from those pieces. For recurring events, we can keep the design flexible by avoiding dates or short-term details so the banner can be used again.`],
      [`What should go on a business banner?`, `Most business banners work best with a short headline, logo or business name, one offer or service, and one clear contact method. Avoid long service lists. A banner has only a few seconds to be understood by drivers or people walking past.`],
      [`Are there rules about hanging banners in ${city.name}?`, `Banners on private property, such as your own building, fence, or job site, are usually simpler than banners placed in public right-of-way. Banners on medians, utility poles, or public property may require temporary sign approval from the ${city.permitOffice}. Always confirm before placing a banner in a public area.`],
      [`Can I get event banners ${city.name} groups can use indoors and outdoors?`, `Yes. Vinyl works well for outdoor and general-purpose use. If the banner will be used mostly indoors at close range, fabric or retractable banner options may look more polished. We can recommend the format based on where it will be displayed.`],
      [`How fast can I get vinyl banners in ${city.name}?`, `Standard banner production is usually 3-5 business days after proof approval. Rush options are available for many common sizes, but timing depends on artwork readiness, material choice, and quantity.`],
    ],
    crossSell: { label: 'Yard Signs', href: '/signage/rigid-and-metal-signs/coroplast-yard-signs', description: 'Pair banners with yard signs to cover both your storefront and the surrounding neighborhood.' },
    relatedLinks: [
      { label: 'Business Cards', href: '/signage', description: 'Add professional cards for handoffs, referrals, and event follow-up.' },
    ],
  },

  'business-cards': {
    name: 'Business Cards',
    type: 'signage',
    availableCities: ['nederland-tx'],
    mainHref: '/signage',
    quoteProduct: 'Business Cards',
    quoteCategory: 'Print',
    showDigitalSupport: false,
    showVisibilityCta: false,
    seo: {
      'nederland-tx': {
        title: 'Business Cards Nederland TX | Design & Print | Pixel & Panel',
        description: 'Need business cards in Nederland TX? Pixel & Panel designs and prints clean, professional cards for contractors, realtors, salons, and restaurants.',
      },
    },
    headline: (city) => city.slug === 'nederland-tx'
      ? 'Business Cards Made for Nederland TX Businesses'
      : `Business Cards Made for ${city.name}, TX Businesses`,
    intro: (city) => `Need to make business cards Nederland TX customers, partners, and referral contacts will actually keep? Pixel & Panel designs and prints clean, professional business cards for contractors, realtors, salons, restaurants, service companies, and local shops in Nederland. We focus on readable contact details, strong first impressions, and card layouts that make it easy for someone to call, email, or remember what you do.`,
    localContext: (city) => `Nederland is a relationship-driven market. Customers still hand referrals across counters, at job sites, after appointments, at school events, and along ${city.neighborhoods}. A weak card can make a good business look unfinished, while a clean card gives people confidence that they are dealing with someone organized and easy to reach. For business cards Nederland TX owners can use every day, the details matter: name, company, phone, email or website, service cue, readable type, and enough white space. Business card design Nederland TX businesses request often starts with a logo, but the finished card should also work when someone sees it weeks later and needs to remember why they saved it.`,
    pricingNote: 'Business cards are quoted by stock, finish, quantity, and whether design help is needed. The existing product minimum is 250 cards, with 500 and 1,000 common for active local businesses. Request a quote for exact pricing before design or print.',
    industries: (city) => [
      `Contractors and trade service businesses in ${city.name}`,
      `Realtors, mortgage teams, and property professionals`,
      `Salon, spa, barber, and beauty professionals`,
      `Restaurants, food trucks, and catering contacts`,
      `Retail shops and local service counters`,
      `Church, school, nonprofit, and event organizers`,
    ],
    process: [
      ['Share your card details', 'Send your business name, logo if available, name, title, phone, email, website, and the main service cue customers should remember.'],
      ['Choose stock and finish', 'We help pick matte, gloss, soft-touch, uncoated, rounded corners, or a simple standard finish based on how the card will be used.'],
      ['Review the proof', 'You approve the layout before printing so spelling, contact details, colors, spacing, and QR placement are correct.'],
      ['Print and reorder easily', 'After approval, cards are printed and the layout can be kept ready for future reorders or team member variations.'],
    ],
    benefits: [
      'Professional handoff after referrals, appointments, estimates, and local networking',
      'Readable contact details that do not require squinting',
      'Design support using your logo, colors, and service information',
      'Options for matte, gloss, soft-touch, rounded corners, and QR placement',
      'Easy reorders when staff, phone numbers, or card quantities change',
    ],
    cityUses: (city) => [
      `Referral cards for contractors and service providers in ${city.name}`,
      `Appointment and follow-up cards for salons, clinics, and professional offices`,
      `Networking cards for chamber events, school fundraisers, and community meetings`,
      `Counter cards for local shops and restaurants along ${city.neighborhoods}`,
      `Team cards for real estate, sales, and field service staff`,
    ],
    faqs: (city) => [
      [`Can Pixel & Panel make business cards Nederland TX businesses can reorder later?`, `Yes. Once the design is approved, the layout can be kept ready for reorders, quantity changes, or new employee names. That is useful for growing teams, sales staff, realtors, contractors, and businesses that hand out cards every week.`],
      [`What should be on a business card?`, `Use your name, business name, phone, email or website, and one short service cue that tells people what you do. If the card is two-sided, the back can hold a short service list, appointment note area, QR code, or simple brand message.`],
      [`Can you handle business card design Nederland TX owners can approve before printing?`, `Yes. Pixel & Panel can design the card from your logo and contact details, then send a proof before anything prints. You can check spelling, phone number, email, colors, and spacing before approval.`],
      [`Do you offer business card printing Nederland TX businesses can use for teams?`, `Yes. We can set up one layout and create variations for multiple team members. That keeps the brand consistent while each person has their own name, role, phone number, or email address.`],
      [`Should my business card include a QR code?`, `A QR code is useful when it sends people to a specific next step, such as a quote form, portfolio, menu, booking page, or review link. If your main goal is phone calls, a large readable phone number may matter more than a QR code.`],
      [`What card finish should I choose?`, `Matte cards feel clean and are easy to read. Gloss cards make colors pop. Soft-touch feels more premium. Uncoated stock is useful when you want to write appointment times or notes on the card. We can recommend the finish based on how the cards will be used.`],
      [`How many business cards should I order?`, `The existing product minimum is 250 cards. Many active local businesses order 500 or 1,000 so they can keep cards in vehicles, at counters, with team members, and at events. If contact details may change soon, start smaller.`],
    ],
    crossSell: { label: 'Brochures', href: '/signage', description: 'Use brochures when customers need more detail than a card can hold.' },
    relatedLinks: [
      { label: 'Vinyl Banners', href: '/signage/banners', description: 'Promote openings, events, and seasonal offers with larger-format print.' },
    ],
  },

  'yard-signs': {
    name: 'Yard Signs',
    type: 'signage',
    mainHref: '/signage/rigid-and-metal-signs/coroplast-yard-signs',
    quoteProduct: 'Yard Signs',
    quoteCategory: 'Signage',
    headline: (city) => `Yard Signs in ${city.name}, TX`,
    intro: (city) => `Yard signs are a high-visibility, low-cost way to advertise your business throughout ${city.name} neighborhoods. Contractors, real estate agents, political campaigns, events, and local service companies all use yard signs to build name recognition and drive calls from the exact neighborhoods they serve.`,
    localContext: (city) => `In a market like ${city.name}, word of mouth starts with visibility. When a neighbor sees your sign in front of the house you're working on or at the corner near their street, they know you're active and local. That's exactly what a yard sign campaign does — it turns every active job or event into a walking advertisement for the next one nearby. Contractors working ${city.neighborhoods} who run signs at their active job sites consistently report that new customers mention seeing the sign. At a cost well under $5 per sign in volume, yard signs remain one of the highest-ROI marketing tools available for local service businesses in ${city.region}.`,
    pricingNote: "Standard 18\"×24\" yard signs with wire H-stakes typically run $3–$8 per sign depending on quantity. 50-sign minimums get the best per-unit pricing. Double-sided printing is available for locations where traffic approaches from both directions.",
    industries: (city) => [
      `Contractors advertising active job sites across ${city.name} neighborhoods`,
      `Real estate agents promoting listings and open houses`,
      `Political campaigns and community elections in ${city.name}`,
      `Landscaping, lawn care, and outdoor service companies`,
      `Event promotions, grand openings, and fundraisers`,
      `HVAC, roofing, and restoration companies after storm work`,
    ],
    process: [
      ['Share your design or brand info', 'Provide your logo, contact info, and key message. Most yard signs work best with just 3–5 elements: name, service, phone number.'],
      ['Design and proof', 'We build your sign design and send a proof within 1 business day. Quick approvals mean faster production.'],
      ['Production and delivery', 'Standard yard signs print and ship in 3–5 business days. Rush options available. H-stakes included.'],
      ['Place and track calls', 'Set signs at active job sites, key corners, and event locations. Ask new callers how they found you — signs produce measurable results.'],
    ],
    benefits: [
      'Low cost per unit — effective for large quantities',
      'Fast turnaround, ready in 3–5 business days',
      'Durable corrugated plastic holds up through rain and heat',
      'Wire H-stakes included for easy installation',
    ],
    cityUses: (city) => [
      `Contractors advertising active job sites across ${city.name} neighborhoods`,
      `Real estate listings and open house directional signs in ${city.name}`,
      `Political campaigns and community elections`,
      `Local events, fundraisers, and seasonal promotions`,
    ],
    faqs: (city) => [
      [`Are there rules about placing yard signs in ${city.name}?`, `Yes. The City of ${city.name} has regulations on sign placement — particularly on public right-of-way, medians, and utility poles. Private property placement typically has fewer restrictions, but always confirm with the property owner. For job site signs, placement on the active work property is generally permitted.`],
      [`How many yard signs should I order?`, `For a neighborhood contractor campaign, 25–50 signs placed at active jobs and nearby intersections is a common starting point. Real estate agents often order 10–25 per listing cycle. Ordering in quantity reduces the per-unit cost significantly — ask about volume pricing when you request a quote.`],
      [`What size yard sign works best?`, `Standard 18"×24" is the most common and readable size for most uses. Larger 24"×36" signs work well for directionals or locations where you need more visibility from faster-moving traffic.`],
      [`Should my yard sign be single or double-sided?`, `If signs will be placed at intersections or locations where traffic approaches from both directions, double-sided is worth the small additional cost. For job site signs where customers only approach from one direction, single-sided is fine and more cost-effective.`],
      [`How do I track whether yard signs are actually driving calls?`, `The simplest method: ask every new caller how they heard about you. If you want more precise tracking, use a unique phone number or QR code on your yard signs that routes to your main line. You'll see clearly which signs and neighborhoods produce calls.`],
    ],
    crossSell: { label: 'Vehicle Graphics', href: '/signage', description: 'Combine yard signs with vehicle graphics for a consistent look across your job sites and your trucks.' },
  },

  'local-seo': {
    name: 'Local SEO',
    type: 'digital',
    mainHref: '/digital/local-seo',
    quoteProduct: 'Local SEO',
    quoteCategory: 'Digital Services',
    seo: {
      // This page — not /digital/local-seo — is the target for "seo beaumont
      // tx", "seo company beaumont tx", and "beaumont tx seo agency".
      // Deliberately NO "Google Maps" language here: the Beaumont Google
      // Business Profile page owns that phrasing and is the site's strongest
      // result (position 4 for "google business profile optimization beaumont
      // tx"). Do not create a second conflict to fix the first one.
      'beaumont-tx': {
        title: 'Local SEO Beaumont TX | Small Business SEO from $300',
        description: 'Local SEO for Beaumont TX small businesses — stronger service pages, accurate local signals, better search visibility. Projects from $300, no contract.',
      },
    },
    headline: (city) => `Local SEO Services in ${city.name}, TX`,
    intro: (city) => `Local SEO helps your ${city.name} business show up when nearby customers search for what you offer on Google. Pixel & Panel focuses on practical improvements — stronger service pages, accurate local signals, Google Business Profile alignment, and service-area content that actually helps customers find you instead of a competitor.`,
    localContext: (city) => `When a customer in ${city.name} searches "HVAC repair near me" or "signs ${city.name} TX," Google returns results based on three factors: relevance (does your site match what they searched?), distance (how close are you?), and prominence (how established does Google think you are?). Most small businesses in ${city.name} have at least one of these factors working against them — an outdated website that doesn't mention their services clearly, a Google Business Profile with missing hours or categories, or almost no online presence building their authority. Pixel & Panel addresses all three, starting with the improvements that move the needle fastest for your specific business type and market in ${city.region}.`,
    pricingNote: `Local SEO work is typically quoted as a one-time foundational project ($300–$800) or ongoing monthly support ($150–$400/month). Most businesses start with a one-time audit and fix, then move to lighter monthly maintenance. Ask about what works for your budget.`,
    industries: (city) => [
      `Contractors and home service businesses in ${city.name}`,
      `Restaurants and food service competing on Google Maps`,
      `Medical, dental, and professional service offices`,
      `Auto repair, tire, and automotive service shops`,
      `Retail shops and boutiques building local search presence`,
      `New businesses establishing visibility in ${city.region}`,
    ],
    process: [
      ['Audit your current visibility', 'We review your website structure, Google Business Profile, local citations, and search ranking for your most important local keywords.'],
      ['Prioritize the highest-impact fixes', 'Not every SEO task moves the needle equally. We focus on the changes that improve your local search visibility fastest.'],
      ['Implement and document', 'We make the improvements and document what was done so you understand exactly what changed and why.'],
      ['Track and adjust', 'Local SEO results compound over time. We monitor your ranking and visibility and recommend the next round of improvements when it makes sense.'],
    ],
    benefits: [
      'Show up in Google searches for your services in your city',
      'Improve your Google Maps ranking in the local 3-pack',
      'Build long-term visibility that compounds over time',
      'Practical recommendations — no jargon, no locked-in contracts',
    ],
    cityUses: (city) => [
      `Contractors and service businesses competing for ${city.name} searches`,
      `Restaurants and retail shops that depend on nearby customer discovery`,
      `Medical, legal, and professional services in ${city.name}`,
      `New businesses that need to establish local online visibility quickly`,
    ],
    faqs: (city) => [
      [`How long does local SEO take to work in ${city.name}?`, `Foundational changes — page structure, metadata, and Google Business Profile alignment — can start showing results in 4–8 weeks. Ranking improvements for competitive searches in ${city.name} typically take 3–6 months of consistent work. The value compounds: every improvement builds on the previous one.`],
      [`What ${city.name} searches should my business rank for?`, `Start with the searches your customers actually type — "[service] ${city.name} TX", "[service] near me", and "[service] ${city.region}". We'll research actual search volume for your category and prioritize based on what has the clearest path to ranking and the most customer intent.`],
      [`Does local SEO work for small businesses in ${city.name}?`, `Yes — especially for small businesses. Most local competitors have weak or ignored SEO, which means relatively modest improvements can produce meaningful visibility gains. A well-structured website, accurate local citations, and an active Google profile can move a small ${city.name} business to the first page for local searches.`],
      [`What's the difference between local SEO and regular SEO?`, `Local SEO focuses specifically on searches with geographic intent — people in ${city.name} searching for businesses near them. It prioritizes Google Maps rankings, local citation consistency, and service-area content over national ranking factors like domain authority and link building. For a local business, local SEO almost always produces results faster.`],
      [`Do I need a new website to improve my local SEO in ${city.name}?`, `Not necessarily. Many local SEO improvements — Google Business Profile updates, citation corrections, metadata fixes — work regardless of your existing website. That said, a structurally weak website does limit how far your rankings can climb. We'll tell you honestly whether your current site is holding you back.`],
      [`Are you an SEO agency or an SEO company?`, `Neither label fits well. Pixel & Panel is a ${city.region} sign and print shop that also handles local search work. Compared to a ${city.name} SEO agency you get direct contact with the person doing the work, a documented list of what changed, and no locked-in retainer — one-time projects start at $300. What we do not do is sell monthly reports full of metrics that never turn into phone calls. If your business needs enterprise SEO, national rankings, or heavy link building, we are not the right fit and will say so.`],
    ],
    crossSell: { label: 'Google Business Profile', href: '/digital/google-business-profile', description: 'Your Google Business Profile is the fastest-moving part of local SEO — optimizing it is often where we start.' },
  },

  'web-development': {
    name: 'Website Design & SEO',
    type: 'digital',
    mainHref: '/digital/web-development',
    quoteProduct: 'Website Development',
    quoteCategory: 'Digital Services',
    seo: {
      // This page — not /digital/web-development — is the intended target for
      // "web design beaumont tx" and its variants. Keep the exact-match phrase
      // at the front of the title, and keep the price in the description: it
      // is the clearest differentiator against agencies in the SERP and this
      // query previously earned zero clicks from 95 impressions.
      'beaumont-tx': {
        title: 'Web Design Beaumont TX | Small Business Sites from $299',
        description: 'Websites for Beaumont contractors, shops, and service businesses. Mobile-first, built to get calls and quote requests. Packages from $299, no contract.',
      },
    },
    headline: (city) => city.slug === 'beaumont-tx'
      ? 'Web Design for Beaumont TX Small Businesses'
      : `Web Design in ${city.name}, TX for Local Businesses`,
    intro: (city) => city.slug === 'beaumont-tx'
      ? `Pixel & Panel provides web design Beaumont TX small businesses can use to look legitimate, explain services clearly, and turn mobile visitors into calls or quote requests. We build clean websites for Beaumont contractors, restaurants, shops, professional offices, and local service companies that need practical website design, local SEO structure, and simple contact paths without confusing marketing language.`
      : `Pixel & Panel provides website design for ${city.name} small businesses that need a clear online presence, local SEO structure, and simple contact paths that work well on phones.`,
    localContext: (city) => `In ${city.name}, customers often compare several businesses before they call. They search from a phone, skim the website, check whether the business serves their area, and look for a fast way to ask a question or request pricing. A slow site, outdated layout, missing service pages, or buried phone number can cost the lead before the first conversation. For ${city.businessTypes} around ${city.neighborhoods}, strong website design ${city.name} TX customers can trust does not need to be flashy. It needs a clear homepage, service pages written in plain English, local search signals, fast mobile loading, and contact options that work the first time.`,
    pricingNote: 'Current website packages start at $299 for a Launch Page, $499 for Starter Web Presence, $799 for a Local Business Website, and $999 for Website + Visibility Setup. Larger projects with extra pages, booking systems, or custom features are quoted individually.',
    industries: (city) => [
      `Contractors and tradespeople who get leads by phone and referral`,
      `Restaurants needing menus, hours, and online ordering integration`,
      `Medical and professional offices requiring appointment contact paths`,
      `Retail shops building an online presence alongside their storefront`,
      `Service companies covering multiple cities across ${city.region}`,
      `New businesses in ${city.name} launching their first professional site`,
    ],
    process: [
      ['Clarify the goal', 'We start with what your local business does, who you serve, and what visitors should do next: call, request a quote, book, or visit.'],
      ['Plan the pages', 'Most small business websites need a homepage, service pages, service-area details, contact information, and trust signals. We keep the structure useful instead of bloated.'],
      ['Design and write in plain English', 'We build a clean, mobile-first layout with your logo, colors, service details, and copy that explains the work without jargon.'],
      ['Launch with SEO basics in place', 'Metadata, headings, internal links, analytics, forms, and sitemap visibility are handled before the site goes live.'],
    ],
    benefits: [
      'Fast, mobile-first design built for how local customers search',
      'Clear service pages and quote forms that make contact easier',
      'On-page SEO structure included from the start',
      'Google Business Profile and local search visitors can land on the right page',
      'Plain English — no tech jargon, no locked-in platform contracts',
      'Starter packages sized for new and growing small businesses',
    ],
    cityUses: (city) => [
      `New businesses in ${city.name} that need a professional online presence`,
      `Local service companies with outdated or missing websites`,
      `${city.name} contractors and tradespeople who get leads by phone and referral`,
      `Restaurants and retail businesses that need fast menus, hours, service pages, and contact paths`,
    ],
    faqs: (city) => [
      [`How much does web design cost for a ${city.name} small business?`, `Published website packages currently start at $299 for a Launch Page, $499 for Starter Web Presence, $799 for a Local Business Website, and $999 for Website + Visibility Setup. The right fit depends on how many pages you need, whether you already have copy and images, and whether extra features are required.`],
      [`How long does website design ${city.name} TX work usually take?`, `Most local business websites take 2-4 weeks from kickoff to launch. A simple launch page can move faster when the logo, copy, photos, and approvals are ready. Multi-page service sites take longer because structure, writing, forms, and SEO setup need more review.`],
      [`Can a new website help my ${city.name} business show up on Google?`, `A website does not guarantee rankings, but it gives Google a much clearer foundation. Pixel & Panel builds pages with proper titles, descriptions, headings, service content, local signals, internal links, and indexable structure so your business has a better chance to compete for relevant local searches.`],
      [`What pages should a small business website in ${city.name} include?`, `Most small businesses need a homepage, service pages, service-area or city pages, an about section, contact or quote page, and basic trust signals such as photos, process details, FAQs, and clear business information. The exact structure depends on how customers search for what you offer.`],
      [`Do I own my website after it is built?`, `Yes. You own your website content and design once the project is paid in full. Hosting, domain, email, and third-party tools may be billed separately by those providers. Pixel & Panel does not lock clients into a proprietary platform they cannot control.`],
      [`Can you redesign an outdated ${city.name} business website?`, `Yes. Pixel & Panel can rebuild an outdated site or make targeted improvements when a full rebuild is not needed. The first step is reviewing what exists now: speed, mobile layout, page structure, content, forms, and local search visibility.`],
      [`What makes a small business website convert better?`, `Clear service descriptions, readable mobile layout, visible contact options, fast load time, proof that you serve the local area, and a direct call to action. A good website removes doubt and makes the next step obvious.`],
      [`Are you a web design agency or a freelancer?`, `Neither, exactly. Pixel & Panel is a ${city.region} sign shop that also builds websites. That matters more than the label: your website, storefront sign, vehicle graphics, and printed materials can all come from one place and actually match. Compared to a ${city.name} agency you get direct contact with the person doing the work and no retainer. Compared to a freelancer you get a business with a physical operation and other services you can grow into. If you need enterprise scope or a dedicated strategy team, we will tell you that up front.`],
      [`Do you build websites for contractors and trades in ${city.name}?`, `Yes — contractors, handymen, HVAC, plumbing, electrical, roofing, landscaping, and similar trades are most of this work. Those sites need a specific shape: the phone number tappable on every screen, one page per service so each can rank on its own, clear coverage of the areas you drive to, and photos of real jobs. Most trade customers search from a phone and call whoever answers first, so speed and an obvious phone number matter more than anything decorative.`],
    ],
    crossSell: { label: 'Local SEO', href: '/digital/local-seo', description: 'A new website gives you a strong foundation. Local SEO builds the visibility that sends customers to it.' },
  },

  'google-business-profile': {
    name: 'Google Business Profile',
    type: 'digital',
    mainHref: '/digital/google-business-profile',
    quoteProduct: 'Google Business Profile',
    quoteCategory: 'Digital Services',
    seo: {
      // This page already ranks (~position 4) for "google business profile
      // optimization beaumont tx" — 87 impressions at 2.3% CTR, where ~7-10%
      // is normal for that position. The title omitted "Optimization", the
      // one word the query actually contains, so the SERP result never bolded
      // the match. Title now leads with the exact phrase and carries the $199
      // entry price as the hook.
      'beaumont-tx': {
        title: 'Google Business Profile Optimization Beaumont TX | From $199',
        description: 'Rank higher on Google Maps in Beaumont, TX. We fix categories, services, photos, and listings so more local customers call. One-time setup from $199.',
      },
    },
    headline: (city) => `Google Business Profile Optimization in ${city.name}, TX`,
    intro: (city) => `Your Google Business Profile is often the first thing ${city.name} customers see before they call or visit — and most local profiles are incomplete, outdated, or missing key information that helps customers choose you over a competitor. Pixel & Panel helps ${city.name} businesses clean up and strengthen their profile so it actually drives calls and quote requests.`,
    localContext: (city) => `When someone in ${city.name} searches for your type of business on Google Maps, they see three things instantly: your business name, your star rating, and how complete your profile looks. An incomplete profile — missing hours, no photos, wrong categories, or no service list — signals to customers that a business either isn't active or doesn't pay attention to details. In a market like ${city.name} where multiple businesses compete for the same local searches, a well-optimized Google Business Profile is often the difference between a call and a scroll past. The three signals Google uses to rank local results are relevance, distance, and prominence — all three can be meaningfully improved without a new website or a large budget.`,
    pricingNote: 'Google Business Profile optimization is typically a one-time project starting at $199. Ongoing monthly management — posts, photo updates, Q&A monitoring, review response — starts at $79/month.',
    industries: (city) => [
      `Local service businesses that depend on Google Maps calls in ${city.name}`,
      `Restaurants and food service with hours, menus, and reservations`,
      `Medical, dental, and professional offices requiring appointment paths`,
      `Retail shops and boutiques building walk-in traffic`,
      `Contractors and home services competing in the ${city.name} 3-pack`,
      `Any ${city.name} business with an unclaimed or outdated profile`,
    ],
    process: [
      ['Profile audit', 'We review your current profile for missing information, wrong categories, inconsistent NAP data, and low-performing attributes.'],
      ['Optimization', 'We update categories, services, business description, hours, and photos. We populate Q&A, add attributes, and connect your website correctly.'],
      ['Review strategy', 'We set up a QR code or link for easy customer review requests and guide you on how and when to ask for reviews.'],
      ['Ongoing posts and maintenance', 'Profiles with regular posts and photo updates rank higher. We can handle this monthly or show you how to maintain it yourself.'],
    ],
    benefits: [
      'Improve your ranking in Google Maps and local search results',
      'Make it easier for customers to call, visit, or request a quote',
      'Stand out from competitors with complete, accurate, active profiles',
      'Get guidance on photos, posts, and updates that maintain visibility',
    ],
    cityUses: (city) => [
      `Local service businesses and contractors in ${city.name} that depend on Google calls`,
      `Restaurants, salons, and retail shops with walk-in or same-day customers`,
      `New ${city.name} businesses setting up their first Google presence`,
      `Established businesses with outdated or unclaimed profiles`,
    ],
    faqs: (city) => [
      [`Why isn't my ${city.name} business showing up on Google Maps?`, `The most common reasons are an incomplete or unverified profile, weak category selection, missing service information, or low review count. Google ranks profiles based on relevance, distance, and prominence — all three can be improved with the right profile updates.`],
      [`How do I get more Google reviews for my ${city.name} business?`, `The most effective method is simply asking — after a completed job, in a follow-up text, or on your printed receipts and business cards. A QR code printed on your materials that links directly to your review page makes it one scan away. We can set that up as part of a profile optimization project.`],
      [`Can you manage my Google Business Profile for me?`, `Yes. We offer initial optimization as a one-time project or ongoing monthly management. Monthly management includes regular posts, photo updates, Q&A monitoring, and review response guidance — the consistent activity that keeps profiles visible in ${city.name} searches.`],
      [`How many reviews do I need to rank in the ${city.name} Google 3-pack?`, `In most mid-size Texas markets, 20–30 reviews with an average above 4.5 stars is typically the floor to start appearing in the 3-pack. The top position often has 80–150+ reviews. The good news: most direct competitors in ${city.name} are at the low end of that range, so consistent review-gathering gives you a real edge.`],
      [`What's the difference between Google Business Profile and local SEO?`, `Your Google Business Profile directly controls what customers see on Google Maps and in local search panels. Local SEO is broader — it includes your website structure, content, citations, and backlinks. Optimizing your profile is often the fastest way to improve Google Maps visibility; local SEO builds the longer-term foundation. Both work best together.`],
      [`What is Google Maps SEO?`, `Google Maps SEO is just the common name for improving where your business appears in the Google Maps results and the local 3-pack. It is not a separate product from what is described on this page — it is the same work: correct primary and secondary categories, a complete service list, current hours and photos, an accurate service area, consistent name and address details across the web, and a steady flow of reviews. If someone is selling you "Google Maps SEO" in ${city.name} as something exotic and expensive, ask them which of those specific items they are changing.`],
      [`Can you guarantee a top Google Maps ranking in ${city.name}?`, `No, and treat a guarantee as a reason to walk away — nobody outside Google controls those results, and ranking depends heavily on where the searcher is standing when they search. What we can do is fix the things measurably holding your profile back and build the review habit that moves prominence over time. In most ${city.region} categories competitors have incomplete profiles and thin review counts, so consistent work creates a real opening.`],
    ],
    crossSell: { label: 'QR Code Campaigns', href: '/digital/qr-code-campaigns', description: 'Add a QR code to your business cards, receipts, or signage so every customer can leave a review in one scan.' },
  },
}

export function cityServiceIsAvailable(service, citySlug) {
  return !service.availableCities || service.availableCities.includes(citySlug)
}

export function getAvailableCityServiceEntries(citySlug) {
  return Object.entries(cityServiceServices).filter(([, service]) =>
    cityServiceIsAvailable(service, citySlug)
  )
}

export function getAvailableCitiesForService(serviceSlug) {
  const service = cityServiceServices[serviceSlug]
  if (!service) return []

  return Object.values(cityServiceCities).filter((city) =>
    cityServiceIsAvailable(service, city.slug)
  )
}

export const cityServiceStaticParams = Object.keys(cityServiceCities).flatMap((citySlug) =>
  getAvailableCityServiceEntries(citySlug).map(([serviceSlug]) => ({
    city: citySlug,
    service: serviceSlug,
  }))
)

export function getCityServiceData(citySlug, serviceSlug) {
  const city = cityServiceCities[citySlug]
  const service = cityServiceServices[serviceSlug]
  if (!city || !service) return null
  if (!cityServiceIsAvailable(service, citySlug)) return null
  return { city, service: { ...service, slug: serviceSlug } }
}
