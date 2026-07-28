// ─────────────────────────────────────────────────────────────────────────────
// HOUSTON CONTENT LAYER (English)
//
// ALL copy for the /houston pages lives in this file. Edit the text here —
// never the components — and the pages update automatically.
//
// Depth target: each service page should land in the 800–1,100 word range, the
// same band as the /service-area/<city>/<service> pages that actually rank.
// The first Houston build shipped ~150-word pages and they stalled at position
// 40–70 while the equivalent Beaumont pages sat at 13–25. Depth was the gap.
//
// Rules for editing:
//  • Never city-swap Beaumont copy into these slots. Duplicated boilerplate is
//    what gets a local page ignored.
//  • Keep pricing in sync with lib/city-service-pages.js so the two markets
//    never quote different numbers for the same product.
//  • Only claim what is true. No invented address, no invented review counts.
// ─────────────────────────────────────────────────────────────────────────────

// TODO(address): Houston runs as a service-area business — the working address
// is residential and is deliberately NOT published. This MUST stay `null`:
// while null, the LocalBusiness schema on /houston omits the PostalAddress
// block entirely and expresses coverage through `areaServed` instead, which is
// what Google expects from a service-area business. Fill this in ONLY if a
// real commercial storefront opens that customers can visit.
export const HOUSTON_STREET_ADDRESS = null;

// TODO(phone): swap if Houston gets its own phone line.
export const HOUSTON_PHONE = "+1-409-225-2012";

// Suburb + district coverage. Rendered as a real content section (not as
// thin standalone pages) so long-tail suburb searches have something to match
// without spawning dozens of near-duplicate URLs.
export const HOUSTON_AREAS = [
  "Katy",
  "Cypress",
  "Sugar Land",
  "The Woodlands",
  "Pearland",
  "Spring",
  "Humble",
  "Kingwood",
  "Tomball",
  "Missouri City",
  "Stafford",
  "Richmond",
  "Rosenberg",
  "Friendswood",
  "League City",
  "Clear Lake",
  "Pasadena",
  "Deer Park",
  "Baytown",
  "Bellaire",
  "Conroe",
  "Magnolia",
];

export const HOUSTON_DISTRICTS =
  "Downtown, Midtown, EaDo, The Heights, Montrose, Uptown/Galleria, the Energy Corridor, Westchase, the Texas Medical Center, and the Ship Channel industrial corridor";

export const houstonHub = {
  metaTitle: "Custom Signs, Banners & Print in Houston, TX | Pixel & Panel",
  metaDescription:
    "Custom signs, banners, yard signs, and real estate signs for Houston, TX businesses. Design, printing, and delivery across Greater Houston. Request a free quote.",

  h1: "Custom Signs, Banners & Print for Houston Businesses",

  intro:
    "Pixel & Panel makes custom signs, banners, and print for businesses across Greater Houston — designed to be read at speed, built for Gulf Coast weather, and quoted in plain English. Same shop, same standards Southeast Texas businesses have relied on since day one.",

  // Market-level context. This is the section that earns the page relevance for
  // broad head terms like "sign shop houston" and "custom signs houston".
  localContext: {
    heading: "Signs That Work in a City This Big",
    body: [
      "Houston is not one market — it is dozens of them stacked on top of each other. A restaurant in Midtown, a fabrication shop off the Ship Channel, a realtor listing in Katy, and a medical office in the Texas Medical Center are all buying signage, and almost none of them need the same thing. The mistake we see most often is a business ordering a sign sized for a strip-center storefront and hanging it where traffic is moving 55 miles an hour on the Beltway.",
      "That is the part we get involved in before anything prints. Where will this be seen from? How fast is the traffic? Is it lit at night? Does it need to survive a hurricane-season summer outdoors, or is it going up for one weekend? Those answers change the material, the size, the letter height, and how much copy the sign can carry. Getting them right up front is cheaper than reprinting.",
      "Houston has no zoning, which surprises people, but it absolutely regulates signs. Permanent exterior signage falls under the Houston sign code administered by Houston Public Works, and requirements shift once you cross into Harris County unincorporated areas or an incorporated suburb like Bellaire, Sugar Land, or Pearland — each of which runs its own rules. We flag what a project is likely to need before you commit to a design.",
    ],
  },

  delivery: {
    heading: "Houston Delivery & Turnaround",
    body:
      "We serve the full Greater Houston area — Harris, Fort Bend, Montgomery, Brazoria, and Galveston counties. Most banners and yard signs are produced within a few business days of proof approval, with rush options on common sizes. Tell us your Houston location and your deadline when you request a quote and we will confirm exact production and delivery timing before you commit.",
  },

  areaCoverage: {
    heading: "Areas We Serve Around Houston",
    body:
      "Orders go out across Greater Houston and the surrounding suburbs. If your address is not on this list, ask anyway — coverage is broader than the list.",
  },

  faqs: [
    [
      "Does Pixel & Panel serve Houston, TX?",
      "Yes. We serve businesses across the Greater Houston area with custom banners, yard signs, real estate signs, event banners, and print — including Harris, Fort Bend, Montgomery, Brazoria, and Galveston counties.",
    ],
    [
      "Do you have a Houston storefront I can walk into?",
      "Not currently. Pixel & Panel runs Houston as a service-area business, which keeps overhead off your invoice. Proofs are handled by email, and finished work is delivered or arranged for pickup. Everything from quote to approval to delivery happens without you needing to drive anywhere.",
    ],
    [
      "How fast can I get signs or banners in Houston?",
      "Standard banners and yard signs typically run 3–5 business days after you approve the proof. Rush production is available on common sizes when the artwork is ready. Larger installs, permitted signage, and custom fabrication take longer — we give you a firm date with the quote rather than a vague estimate.",
    ],
    [
      "Do I need a permit for a sign in Houston?",
      "Permanent exterior signs usually do. The City of Houston regulates signage through its sign code even though the city has no zoning, and permits are handled through Houston Public Works. Suburbs like Sugar Land, Pearland, Bellaire, and Katy run their own separate requirements. Temporary items — banners on your own property, yard signs, event signage — are generally much simpler. Tell us what you are planning and we will tell you what it is likely to involve.",
    ],
    [
      "What holds up best in Houston weather?",
      "Humidity, UV, and hurricane season are the three things that kill signage here. For outdoor banners we recommend 18oz vinyl over standard 13oz when a banner will live in direct sun or get reused, and wind slits or mesh on anything large and exposed. For permanent exterior signs, aluminum and aluminum composite outperform anything that can absorb water. Coroplast yard signs are fine for their intended life but are not a year-round outdoor material on the Gulf Coast.",
    ],
    [
      "How much do signs cost in Houston?",
      "It depends entirely on size and material, so here are real anchors: a standard 3'×8' vinyl banner runs $60–$120. Large job-site banners (4'×12' and up) are typically $100–$250. Coroplast yard signs run $3–$8 each depending on quantity, with the best per-unit pricing at 50+. Permanent storefront signage varies far too much to quote blind — we price it after we see the location and size.",
    ],
    [
      "Do you still serve Beaumont and Southeast Texas?",
      "Yes, fully. Beaumont, Nederland, and Port Arthur remain served exactly as before. Houston is an addition, not a replacement.",
    ],
    [
      "Can you design the artwork, or do I need to supply it?",
      "Either works. Send print-ready artwork and we will use it, or send a logo and a rough idea and we will design the piece. Most designs are ready for review within one business day, and nothing prints until you approve the proof.",
    ],
  ],

  // TODO(testimonials): add Houston proof as it comes in. The section stays
  // hidden while this array is empty. Shape: { quote, name, business }
  testimonials: [],
};

// Per-service pages under /houston/<slug>.
// `esPath` pairs each page with its Spanish counterpart for hreflang.
export const houstonServices = {
  banners: {
    name: "Banners",
    esPath: "/es/houston/banners",
    catalogHref: "/signage/banners",
    catalogLabel: "Browse all banner options & pricing",
    quoteProduct: "Vinyl Banners",
    quoteCategory: "Signage",
    metaTitle: "Custom Banners Houston TX | Vinyl & Banner Printing",
    metaDescription:
      "Custom banner printing in Houston, TX — vinyl banners for storefronts, job sites, grand openings, and promotions. Durable outdoor material, design help, fast quotes.",
    h1: "Custom Banners in Houston, TX",
    intro:
      "Full-color vinyl banner printing for Houston storefronts, fences, job sites, and promotions — sized for the distance people will actually read them from, and built to survive a Gulf Coast summer outdoors.",

    localContext: {
      heading: "What Makes a Banner Work in Houston",
      body: [
        "Banners are the most-wasted marketing spend in this city, and the reason is almost always the same: the copy was written for someone standing still. A banner on a fence along the Southwest Freeway gets about two seconds of attention from a driver doing 60. A banner over a storefront on Washington Avenue gets a little longer. A banner behind a booth at a trade show gets read from ten feet away. Those are three completely different layouts, and using the wrong one is why a banner gets ignored.",
        "The practical rule we work from: roughly one inch of letter height for every ten feet of viewing distance. A banner meant to be read from 100 feet needs about 10-inch lettering, which leaves room for a headline, a logo, and one contact method — not a service list. Most banners that underperform in Houston are trying to say five things and land none of them.",
        "Weather is the second half of the equation. Houston humidity, relentless summer UV, and hurricane-season wind are hard on outdoor vinyl. Standard 13oz vinyl is fine for a promotion that runs a few months. If a banner is going to live in direct sun, hang through storm season, or get pulled out and reused every year, 18oz heavy-duty vinyl is worth the small upcharge. Anything large and exposed to wind should get wind slits or be printed on mesh — a solid banner in a gust acts like a sail and takes the grommets, the fence, or both with it.",
      ],
    },

    pricingNote:
      "A standard 3'×8' banner runs $60–$120 depending on material weight and quantity. Larger job-site banners (4'×12' and up) typically fall in the $100–$250 range. Grommets, hemmed edges, and pole pockets are included. Rush production is available on most common sizes.",

    delivery:
      "Banner production typically runs 3–5 business days after proof approval, with rush options on standard sizes. Tell us your Houston location and your deadline when you request a quote and we will confirm exact timing up front — including delivery to job sites and event venues across Greater Houston.",

    industries: [
      "Retail and restaurants running grand openings or seasonal promotions",
      "Contractors and builders advertising on job-site fencing",
      "Churches, schools, and nonprofits announcing events and fundraisers",
      "Auto dealers, service shops, and tire centers running limited-time offers",
      "Real estate teams marketing new developments and leasing availability",
      "Trade show and conference exhibitors needing booth backdrops",
    ],

    uses: [
      "Storefront and window banners for retail across Greater Houston",
      "Job-site and construction fence banners along active build corridors",
      "Grand opening and now-hiring banners for new locations",
      "Event, festival, and fundraiser banners for community organizations",
      "Step-and-repeat and booth banners for trade shows and conferences",
    ],

    process: [
      [
        "Tell us the size and the location",
        "Where is it hanging, and how far away will people read it from? That single answer drives size, letter height, and how much copy the banner can carry. Send a photo of the spot if you have one.",
      ],
      [
        "We design it, or you send artwork",
        "Send print-ready files and we will use them. Otherwise send your logo and the message and we will build the layout — usually ready to review within one business day.",
      ],
      [
        "Approve the proof",
        "Nothing prints until you sign off on spelling, phone numbers, colors, and sizing. Check the phone number twice — it is the single most common late catch.",
      ],
      [
        "Print, finish, and deliver",
        "Standard production is 3–5 business days. Banners ship with grommets and hemmed edges, rolled rather than folded so they hang without crease lines.",
      ],
    ],

    benefits: [
      "Full-color printing on outdoor-rated vinyl in 13oz or 18oz heavy-duty",
      "Custom sizes from small indoor banners to large job-site spans",
      "Grommets, hemmed edges, and pole pockets included as standard",
      "Wind slits and mesh options for exposed and high-wind locations",
      "Plain-English design help so the message is readable at actual viewing distance",
      "Rush turnaround available on common sizes",
    ],

    faqs: [
      [
        "How much does banner printing cost in Houston?",
        "A standard 3'×8' vinyl banner runs $60–$120 depending on material weight and quantity. Larger job-site banners at 4'×12' and up typically land in the $100–$250 range. Grommets and hemmed edges are included rather than added at the end. Send your size and quantity and we will quote it exactly.",
      ],
      [
        "What size banner do I need?",
        "Work backwards from viewing distance. For a fence or storefront read from 30+ feet, a 3'×8' or 4'×8' banner with 3–4 inch lettering works well. For freeway-adjacent placement where traffic is moving fast, go larger and cut the copy down hard. For indoor events and booths at close range, 2'×4' to 2'×6' is usually plenty. Tell us where it is going and we will recommend the size before you order.",
      ],
      [
        "How long will an outdoor banner last in Houston?",
        "Standard 13oz vinyl generally holds up 1–2 years outdoors here. Houston humidity and summer UV are harder on vinyl than a drier climate, so if the banner sits in direct sun or gets reused annually, 18oz heavy-duty is the better buy. Taking banners down ahead of severe weather and storing them rolled rather than folded makes a real difference in how many seasons you get.",
      ],
      [
        "Will a banner survive hurricane season?",
        "Not if it is left up through a named storm — nothing vinyl will, and a solid banner in high wind can pull down whatever it is attached to. For anything large or exposed, we add wind slits or print on mesh so air passes through instead of loading the surface. The real answer is to take banners down before a storm arrives. They are inexpensive enough to replace and expensive enough to be a hazard.",
      ],
      [
        "Can I hang a banner anywhere in Houston?",
        "On your own property — your building, your fence, your job site — it is generally straightforward. Banners placed in public right-of-way, on medians, or on utility poles are a different matter and can be removed or fined. Incorporated suburbs like Bellaire, Sugar Land, and Pearland run their own temporary sign rules that are often stricter than the City of Houston's. Confirm before you hang anything off your own property.",
      ],
      [
        "How fast can I get a banner in Houston?",
        "Standard production is 3–5 business days after proof approval. Rush options are available for common sizes when the artwork is ready to go. The step that slows most orders down is not printing — it is waiting on approval or on final artwork, so having your logo and copy ready moves everything up.",
      ],
      [
        "What should actually go on a business banner?",
        "A short headline, your business name or logo, one offer or service, and one way to contact you. That is the whole list. Every additional line makes the others smaller and less likely to be read. Hours, addresses, and full service menus belong on your website and your Google profile, not on something a driver sees for two seconds.",
      ],
      [
        "Do you deliver banners to job sites and venues around Houston?",
        "Yes. Banners go out across Greater Houston including Katy, Cypress, Sugar Land, The Woodlands, Pearland, Spring, and the surrounding suburbs. Give us the delivery address and the date you need it on site when you request the quote.",
      ],
    ],

    relatedLinks: [
      {
        label: "Event Banners in Houston",
        href: "/houston/event-banners",
        description: "Festivals, grand openings, fundraisers, and booth backdrops — banners built for event use.",
      },
      {
        label: "Yard Signs in Houston",
        href: "/houston/yard-signs",
        description: "Pair a storefront banner with yard signs to cover the surrounding neighborhoods too.",
      },
    ],

    testimonials: [],
  },

  "event-banners": {
    name: "Event Banners",
    esPath: "/es/houston/banners-para-eventos",
    catalogHref: "/signage/banners",
    catalogLabel: "See banner materials & pricing",
    quoteProduct: "Event Banners",
    quoteCategory: "Signage",
    metaTitle: "Event Banners Houston TX | Festival & Grand Opening Banners",
    metaDescription:
      "Custom event banners in Houston, TX for festivals, grand openings, fundraisers, conferences, and church events. Reusable designs, indoor and outdoor materials, fast quotes.",
    h1: "Event Banners in Houston, TX",
    intro:
      "Banners for Houston events — festivals, grand openings, school fundraisers, conferences, church functions, and booth backdrops. Designed to read from across a crowded room or a parking lot, and built to come back out next year.",

    localContext: {
      heading: "Houston Runs on Events",
      body: [
        "Between the rodeo, the festival calendar, convention traffic downtown, school fundraisers, and a church community as large as any city in Texas, Houston has an events economy that never really stops. Most of the banners printed for those events get used once and thrown away — which is a waste, because the thing that usually forces a reprint is not wear. It is a date printed on the banner.",
        "That is the first conversation we have on any event banner: is this a one-time announcement, or something you will run again? If the event repeats, we keep the year, the date, and any pricing off the main banner and put them on a smaller companion piece or a separate rider. The main banner then survives four or five cycles instead of one. Groups running an annual fundraiser or a seasonal festival notice that difference immediately.",
        "The second thing that separates an event banner from a business banner is where it gets read. Event banners compete with crowds, tents, other vendors, and a lot of visual noise. Copy that would be perfectly readable on a quiet storefront disappears at a busy festival. We size event banners for the actual environment — which usually means fewer words and bigger type than people expect going in.",
        "Indoor and outdoor also pull in different directions. Vinyl is the workhorse for anything outdoors or general-purpose. For indoor use at close range — conference booths, banquet backdrops, registration tables — fabric hangs better, does not glare under venue lighting, and photographs far better, which matters when the whole point is that attendees post pictures of it.",
      ],
    },

    pricingNote:
      "Event banners are priced like standard banners: a 3'×8' runs $60–$120 depending on material and quantity, with larger spans at $100–$250. Fabric upgrades for indoor and photo-facing use are quoted separately. Reusable designs cost the same to print — the savings come from not reprinting next year.",

    delivery:
      "Event work runs on hard deadlines, so we schedule backwards from your event date rather than forwards from the order date. Standard production is 3–5 business days after proof approval, with rush available. Tell us the event date and the venue when you request a quote and we will confirm whether the timeline works before you commit.",

    industries: [
      "Festivals, markets, and community events across Greater Houston",
      "Churches running services, drives, and seasonal events",
      "Schools, PTOs, and booster clubs fundraising through the year",
      "Nonprofits hosting galas, walks, and awareness campaigns",
      "Conference and trade show exhibitors at Houston venues",
      "Businesses running grand openings, anniversaries, and ribbon cuttings",
    ],

    uses: [
      "Entrance and welcome banners for festivals and community events",
      "Grand opening, ribbon cutting, and anniversary banners",
      "Step-and-repeat backdrops for photos, press, and social posts",
      "Sponsor and donor recognition banners for fundraisers",
      "Registration table and directional banners for conferences",
      "Church event, revival, and seasonal service banners",
    ],

    process: [
      [
        "Tell us the event and the date",
        "Event date, venue, and whether the banner hangs indoors or outdoors. We schedule production backwards from the date so nothing arrives late.",
      ],
      [
        "Decide if it needs to be reusable",
        "If the event repeats, we keep dates and pricing off the main banner so it works again next year. This one decision saves most groups a reprint.",
      ],
      [
        "Review the proof",
        "We build the layout and send it for approval. Check names and sponsor logos carefully — sponsor spelling is the most common last-minute correction on event work.",
      ],
      [
        "Print and get it on site",
        "Standard production is 3–5 business days. We deliver across Greater Houston, including directly to venues when that is easier than routing through your office.",
      ],
    ],

    benefits: [
      "Reusable layouts that skip dates so annual events do not reprint",
      "Outdoor vinyl and indoor fabric options depending on venue and lighting",
      "Step-and-repeat backdrops sized for photos and social sharing",
      "Sponsor logo placement handled cleanly without crowding the message",
      "Deadline-driven scheduling built backwards from your event date",
      "Delivery to venues across Greater Houston",
    ],

    faqs: [
      [
        "How much do event banners cost in Houston?",
        "The same as standard banners: roughly $60–$120 for a 3'×8' depending on material and quantity, and $100–$250 for larger spans. Fabric, which is worth it for indoor and photo-facing use, is quoted separately. Sponsor-heavy layouts do not cost more to print — the design work is included.",
      ],
      [
        "Can I reuse an event banner next year?",
        "Yes, and it is worth designing for it from the start. Leave the year, the date, and any pricing off the main banner and put them on a smaller companion piece. The main banner then runs for several cycles. Roll it for storage rather than folding — creases across a fold line become permanent and show in photos.",
      ],
      [
        "What size should an event banner be?",
        "For an entrance or outdoor event banner read from 40–50 feet, 4'×8' with 5–6 inch lettering works well. For a step-and-repeat backdrop, 8'×8' is the common size so a group photo fits inside the frame. For registration tables and indoor directional use, 2'×6' is usually enough. Tell us the venue and we will size it.",
      ],
      [
        "Should an event banner be vinyl or fabric?",
        "Vinyl for anything outdoors or general-purpose — it handles weather and it is the more economical choice. Fabric for indoor use at close range: it hangs without curl, it does not glare under venue lighting, and it photographs much better. If the banner's job is to appear in photos people post, fabric is the right call.",
      ],
      [
        "How far ahead should I order for a Houston event?",
        "Two weeks before the event is comfortable. That covers 3–5 business days of production plus proof rounds plus a buffer for the sponsor logo that always arrives late. Rush is available and we do it regularly, but ordering early is how you get the banner you actually wanted instead of the one that fit the timeline.",
      ],
      [
        "Can you fit sponsor logos on a fundraiser banner?",
        "Yes, and there is a right way to do it. Sponsors get tiered by level with the largest logos at top, and the event name stays dominant. The failure mode is treating every sponsor equally, which shrinks all the logos until none of them are legible and no one is happy. Send the sponsor files at the highest resolution you have.",
      ],
      [
        "Do you deliver to Houston event venues?",
        "Yes. We deliver across Greater Houston and can ship directly to a venue, a hotel, or a convention facility when that is simpler than routing through your office. Give us the venue name, the delivery contact, and the date it needs to be on site.",
      ],
      [
        "Can you match our event's existing branding?",
        "Yes. Send whatever you have — a logo file, last year's banner, a flyer, brand colors. We match it so the banner sits alongside your other event materials instead of looking like it came from somewhere else.",
      ],
    ],

    relatedLinks: [
      {
        label: "Custom Banners in Houston",
        href: "/houston/banners",
        description: "Business, storefront, and job-site banners built for everyday commercial use.",
      },
      {
        label: "Yard Signs in Houston",
        href: "/houston/yard-signs",
        description: "Directional signs that route event traffic from the road to your entrance.",
      },
    ],

    testimonials: [],
  },

  "yard-signs": {
    name: "Yard Signs",
    esPath: "/es/houston/letreros-para-jardin",
    catalogHref: "/signage/rigid-and-metal-signs/coroplast-yard-signs",
    catalogLabel: "See yard sign specs & pricing",
    quoteProduct: "Yard Signs",
    quoteCategory: "Signage",
    metaTitle: "Yard Signs Houston TX | Custom Coroplast Signs & Stakes",
    metaDescription:
      "Custom yard signs in Houston, TX for contractors, realtors, campaigns, and events. Weatherproof coroplast with H-stakes, volume pricing, and fast turnaround. Free quote.",
    h1: "Yard Signs in Houston, TX",
    intro:
      "Weatherproof coroplast yard signs for Houston contractors, real estate agents, campaigns, and events — the cheapest way to be visible in the exact neighborhoods you are already working in.",

    localContext: {
      heading: "Why Yard Signs Still Work in Houston",
      body: [
        "Houston sprawls across more than 600 square miles, and that geography is exactly why yard signs still pull their weight here. Paid ads target a radius. A yard sign targets a street. When a homeowner in Spring Branch sees your sign in a neighbor's yard three doors down, that is a level of proof no ad impression buys — someone nearby already hired you, and the work is visible.",
        "Contractors get the most out of this, and the ones who do it deliberately treat it as a campaign rather than an afterthought. A sign goes up at every active job, stays through completion, and comes down when the crew leaves. Roofing and restoration crews working a neighborhood after a storm see this compound fast, because the entire street has the same problem at the same time and every one of them drives past your sign.",
        "At $3–$8 per sign in volume, the math is forgiving. One job won from a whole 50-sign run pays for the run several times over. The two things that actually determine whether it works: put the signs where your customers are rather than where traffic is heaviest, and ask every caller how they found you so you know whether to reorder.",
        "One Houston-specific caution. Coroplast is a temporary outdoor material and the Gulf Coast is not gentle with it. Signs left standing month after month through summer UV and storm season will fade and warp. Wire H-stakes bend in saturated ground after heavy rain, which Houston gets in volume. Plan on rotating signs and treat them as a consumable, not a permanent install.",
      ],
    },

    pricingNote:
      "Standard 18\"×24\" yard signs with wire H-stakes run $3–$8 per sign depending on quantity. Orders of 50+ get the best per-unit pricing. Double-sided printing is a small upcharge and is worth it at intersections where traffic approaches from both directions.",

    delivery:
      "Standard yard sign orders are typically ready within 3–5 business days of proof approval. Volume orders for the Houston area are quoted with exact timing up front, and we can split a large run into multiple delivery drops across Greater Houston if your crews are working different sides of the city.",

    industries: [
      "Roofing, restoration, and storm repair crews working Houston neighborhoods",
      "HVAC, plumbing, electrical, and home service contractors",
      "Real estate agents marketing listings and open houses",
      "Political campaigns and local ballot measures across Harris County",
      "Landscaping, fencing, and outdoor service companies",
      "Churches, schools, and community events needing directional signage",
    ],

    uses: [
      "Active job-site signs across Houston neighborhoods and suburbs",
      "Open house and listing directionals for real estate",
      "Campaign signs for Harris County and municipal elections",
      "Event directionals routing traffic to parking and entrances",
      "Grand opening and now-hiring signs at retail locations",
      "Seasonal promotions and service reminders",
    ],

    process: [
      [
        "Send your logo and message",
        "Yard signs work best with three to five elements: business name, the one service you want to be known for, and a phone number. Anything more is unreadable at driving speed.",
      ],
      [
        "Pick quantity and sides",
        "Quantity drives your per-unit cost, so decide the real number before you order. Choose double-sided for intersections and single-sided for job sites where traffic only approaches one way.",
      ],
      [
        "Approve the proof",
        "We send a proof within about one business day. Confirm the phone number and any license number before approving — reprinting a 50-sign run over a typo is an expensive lesson.",
      ],
      [
        "Print, stake, and deliver",
        "Production runs 3–5 business days. Wire H-stakes are included, and large runs can be split across multiple Houston delivery drops.",
      ],
    ],

    benefits: [
      "Low cost per sign, with real volume breaks at 50+",
      "Weatherproof 4mm corrugated plastic rated for outdoor use",
      "Wire H-stakes included — no separate hardware order",
      "Single- or double-sided printing depending on placement",
      "Fast 3–5 business day turnaround with rush available",
      "Split delivery across Greater Houston for crews working multiple areas",
    ],

    faqs: [
      [
        "How much do yard signs cost in Houston?",
        "Standard 18\"×24\" coroplast signs with H-stakes run $3–$8 per sign depending on quantity. The price drops meaningfully at 50 and again at 100. Double-sided printing adds a small amount per sign. Send your quantity and we will quote the exact per-unit number.",
      ],
      [
        "How many yard signs should I order?",
        "For a contractor running a neighborhood campaign, 25–50 signs placed at active jobs and nearby intersections is a normal starting point. Real estate agents typically order 10–25 per listing cycle. Campaigns order in the hundreds. Because per-unit cost falls steeply with quantity, ordering the number you will actually use over six months usually beats reordering in small batches.",
      ],
      [
        "Are there rules about yard sign placement in Houston?",
        "Yes, and they matter. Signs in public right-of-way, on medians, or attached to utility poles can be removed by the city and can carry fines. Placement on private property with the owner's permission is generally fine, which is why job-site signs on the property you are working are the safest and most effective placement. Incorporated suburbs — Bellaire, West University Place, Sugar Land, Pearland — enforce their own rules, several of them more strictly than the City of Houston.",
      ],
      [
        "How long do yard signs last outdoors in Houston?",
        "Coroplast is a temporary material. Expect several months of good appearance, less in full summer sun. Houston UV fades ink faster than a drier climate, and wire H-stakes bend in ground saturated by heavy rain. Plan to rotate signs rather than leaving a set out indefinitely, and pull them before a named storm.",
      ],
      [
        "Should my yard signs be single or double-sided?",
        "Double-sided at intersections and anywhere traffic approaches from two directions — the upcharge is small relative to doubling who sees it. Single-sided is fine and more economical for job-site signs facing the street from a front yard.",
      ],
      [
        "Can I get yard signs for a Harris County campaign?",
        "Yes. We print single- and double-sided campaign signs in volume with fast turnaround. Note that political signage carries its own disclaimer requirements under Texas election law — confirm your required language with your campaign's compliance contact before you approve the proof, since we print exactly what is approved.",
      ],
      [
        "What size yard sign works best?",
        "18\"×24\" is the standard and it is the right choice for most uses. Step up to 24\"×36\" for directionals on faster roads or anywhere you need to be read from a moving vehicle at distance. Bigger costs more per unit, so use the larger size selectively rather than across a whole run.",
      ],
      [
        "How do I know if the signs are actually working?",
        "Ask every new caller how they found you and write it down. That alone tells you most of what you need. If you want it cleaner, put a dedicated phone number or a QR code on the signs that routes to your main line, and you will see exactly which neighborhoods produce calls.",
      ],
    ],

    relatedLinks: [
      {
        label: "Real Estate Signs in Houston",
        href: "/houston/real-estate-signs",
        description: "Listing signs, riders, and frames built specifically for agents and brokerages.",
      },
      {
        label: "Custom Banners in Houston",
        href: "/houston/banners",
        description: "Add job-site fence banners where a yard sign is too small to be seen.",
      },
    ],

    testimonials: [],
  },

  "real-estate-signs": {
    name: "Real Estate Signs",
    esPath: "/es/houston/letreros-inmobiliarios",
    catalogHref: "/signage/real-estate-signs",
    catalogLabel: "Browse real estate sign options",
    quoteProduct: "Real Estate Signs",
    quoteCategory: "Signage",
    metaTitle: "Real Estate Signs Houston TX | Listing & Open House Signs",
    metaDescription:
      "Real estate signs for Houston agents and brokerages — listing signs, riders, open house directionals, and frames. Brokerage-compliant layouts and fast reorders.",
    h1: "Real Estate Signs in Houston, TX",
    intro:
      "Listing signs, riders, open house directionals, and frames for Houston agents, teams, and brokerages — laid out to meet brokerage requirements, sharp in the yard, and easy to reorder when a listing closes and the next one opens.",

    localContext: {
      heading: "Signage Built for the Houston Market",
      body: [
        "Houston is one of the highest-volume residential markets in the country, and the agents doing well here are running multiple listings at once across neighborhoods that look nothing alike. A listing in River Oaks, a townhome in the Heights, new construction in Katy, and a lease in Midtown are four different buyers, but the sign in the yard has the same three seconds to do its job: identify the property as listed, make your name and number legible from a moving car, and look like it belongs to a professional.",
        "The recurring problem in this market is not design — it is turnaround. Listings move fast, and a sign that shows up after the property is already active has cost you the first weekend, which is often the best weekend. That is why we keep approved layouts on file. Once your base design is set, a new rider or an additional panel is a reorder rather than a new project, and it ships in days instead of weeks.",
        "Brokerage compliance is the other thing that quietly eats time. Most Houston brokerages have specific requirements for logo placement, minimum sizing, license number display, and equal housing language. Getting those wrong means reprinting at your own cost. Send us your brokerage's brand standards — or a photo of a sign that was already approved — and we will build to that spec from the start.",
        "Then there is the weather. Yard signs on the Gulf Coast take sun, humidity, and wind. Coroplast is fine for directionals and open house signs you replace regularly. For a listing sign that hangs in a frame for weeks or months in full sun, aluminum holds color and shape far longer and is the better economics once you factor in how often you would otherwise be reprinting.",
      ],
    },

    pricingNote:
      "Real estate signage is quoted by material, size, and quantity. Coroplast open house directionals are the most economical and are usually ordered in sets. Aluminum listing panels cost more up front and last considerably longer in Houston sun. Riders and frames are quoted separately — send your brokerage spec and listing volume for exact numbers.",

    delivery:
      "Most real estate sign orders are produced within 3–5 business days of proof approval. Once your base layout is approved and on file, reorders and new riders move faster because there is no new design round. Brokerage and team packages for the Houston market are quoted with firm timing up front.",

    industries: [
      "Individual agents running residential listings across Greater Houston",
      "Real estate teams needing consistent branding across multiple agents",
      "Brokerages standardizing signage across their agent roster",
      "Property managers and leasing offices marketing available units",
      "Commercial brokers marketing retail, office, and industrial space",
      "New construction and development sales offices",
    ],

    uses: [
      "For Sale and For Lease listing panels with frames",
      "Open house and directional arrow signs for weekend showings",
      "Riders for price changes, pending status, and agent contact",
      "Commercial availability signs for retail, office, and industrial sites",
      "Team and brokerage signage standardized across agents",
      "Development and new construction site signage",
    ],

    process: [
      [
        "Send your brokerage requirements",
        "Brand standards, an approved example sign, or a photo of what your brokerage already uses. We build to that spec so nothing gets rejected after printing.",
      ],
      [
        "Choose material and format",
        "Coroplast for directionals and high-turnover items, aluminum for listing panels that hang for weeks in Houston sun. We will tell you which is actually cheaper over a year at your listing volume.",
      ],
      [
        "Approve the layout once",
        "Get the base design right and we keep it on file. Every subsequent rider, panel, or reorder skips the design round entirely.",
      ],
      [
        "Reorder as listings turn over",
        "New listing, new rider, or a whole team refresh — reorders run 3–5 business days because the layout is already approved.",
      ],
    ],

    benefits: [
      "Layouts built to your brokerage's brand and compliance requirements",
      "Approved designs kept on file for fast, no-fuss reorders",
      "Coroplast and aluminum options priced against your actual listing volume",
      "Riders, frames, and directionals available as a coordinated set",
      "Team packages that keep branding consistent across every agent",
      "3–5 business day turnaround, faster on reorders",
    ],

    faqs: [
      [
        "Do you make real estate signs for Houston agents?",
        "Yes — listing panels, riders, open house directionals, and frames for individual agents, teams, and brokerages across Greater Houston, including Katy, Cypress, Sugar Land, The Woodlands, Pearland, and the surrounding suburbs.",
      ],
      [
        "Can signs match my brokerage's brand requirements?",
        "Yes, and this is worth getting right the first time. Send your brokerage's brand standards or a photo of an already-approved sign, and we will match logo placement, color, minimum sizing, license number display, and equal housing requirements. Reprinting a rejected sign is a cost you should never have to absorb.",
      ],
      [
        "What is the difference between coroplast and aluminum for listing signs?",
        "Coroplast is corrugated plastic — inexpensive, light, ideal for open house directionals and anything you replace often. Aluminum costs more up front but holds color and shape through Houston summers without fading or warping. If a panel sits in a frame in full sun for weeks at a time, aluminum is usually the cheaper option once you count the reprints you did not have to make.",
      ],
      [
        "How fast can I get signs for a new listing?",
        "Standard production is 3–5 business days after proof approval. If your base layout is already on file with us, riders and additional panels move faster because there is no new design round. For agents running steady volume, getting that base design approved early is what keeps you from missing a first weekend.",
      ],
      [
        "Do you print riders separately from the main sign?",
        "Yes. Riders — price changes, Pending, Under Contract, Open Sunday, agent name and number — are printed separately and sized to standard frames. Most agents order a batch of riders alongside their panels so the common ones are already on hand when a listing status changes.",
      ],
      [
        "Can you handle signage for a whole team or brokerage?",
        "Yes. We set up one master layout and generate per-agent variations with individual names, photos, phone numbers, and license numbers. The brokerage branding stays identical across every agent while each sign carries the right contact. Reorders for new agents pull straight from the approved template.",
      ],
      [
        "Do you make commercial real estate signs?",
        "Yes. Commercial availability signs for retail, office, industrial, and land are quoted by size and mounting — these tend to be larger than residential panels and often need post or frame mounting. Send the site details and dimensions and we will quote it.",
      ],
      [
        "How many open house directionals should I order?",
        "Most agents run 6–12 per listing to cover the route from the nearest main road. Order them as a reusable set without addresses and use riders or a blank strip for the property-specific details, and the same set works across every listing instead of being thrown out after one weekend.",
      ],
    ],

    relatedLinks: [
      {
        label: "Yard Signs in Houston",
        href: "/houston/yard-signs",
        description: "Coroplast signs and stakes for directionals, campaigns, and job sites.",
      },
      {
        label: "Custom Banners in Houston",
        href: "/houston/banners",
        description: "Large-format banners for developments, leasing offices, and open house weekends.",
      },
    ],

    testimonials: [],
  },
};

// Contextual cross-links rendered on existing catalog pages (body links only —
// no URL/title/meta changes). Keyed by catalog slug.
export const houstonCatalogNotes = {
  banners: {
    text: "Ordering for the Houston area?",
    label: "Custom banners in Houston, TX",
    href: "/houston/banners",
  },
  "real-estate-signs": {
    text: "Ordering for the Houston area?",
    label: "Real estate signs in Houston, TX",
    href: "/houston/real-estate-signs",
  },
  "coroplast-yard-signs": {
    text: "Ordering for the Houston area?",
    label: "Yard signs in Houston, TX",
    href: "/houston/yard-signs",
  },
};
