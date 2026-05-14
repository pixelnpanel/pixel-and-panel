export const cityServiceCities = {
  'beaumont-tx': {
    name: 'Beaumont',
    state: 'TX',
    slug: 'beaumont-tx',
    region: 'Southeast Texas',
    context: 'Beaumont is the largest city in Southeast Texas, with a busy mix of contractors, restaurants, medical offices, retail shops, and service companies.',
    businessTypes: 'contractors, restaurants, retail shops, medical offices, and local service companies',
    landmark: 'along Calder Avenue, Phelan Boulevard, and the Beaumont Enterprise corridor',
  },
  'nederland-tx': {
    name: 'Nederland',
    state: 'TX',
    slug: 'nederland-tx',
    region: 'Southeast Texas',
    context: 'Nederland is a tight-knit community between Beaumont and Port Arthur, home to local businesses that rely on neighborhood visibility and word-of-mouth.',
    businessTypes: 'local shops, service companies, contractors, and family-owned businesses',
    landmark: 'along Nederland Avenue and Boston Avenue',
  },
  'port-arthur-tx': {
    name: 'Port Arthur',
    state: 'TX',
    slug: 'port-arthur-tx',
    region: 'Southeast Texas',
    context: 'Port Arthur is a working city with a strong mix of industrial, retail, and service businesses that need clear branding to stand out in a competitive local market.',
    businessTypes: 'contractors, auto shops, restaurants, retail, and industrial service companies',
    landmark: 'along Gulfway Drive, Memorial Boulevard, and 39th Street',
  },
}

export const cityServiceServices = {
  'vehicle-graphics': {
    name: 'Vehicle Graphics',
    type: 'signage',
    mainHref: '/signage/vehicle-graphics',
    quoteProduct: 'Vehicle Graphics',
    quoteCategory: 'Signage',
    headline: (city) => `Vehicle Graphics in ${city.name}, TX`,
    intro: (city) => `Vehicle graphics turn your work truck, van, or car into a moving advertisement that reaches thousands of people across ${city.name} every week. Whether you need full wraps, partial graphics, or simple lettering, Pixel & Panel designs vehicle graphics that are easy to read, weather-resistant, and built to hold up in Southeast Texas heat and humidity.`,
    benefits: [
      'Reach thousands of local customers daily at no recurring cost',
      'Build brand recognition across neighborhoods and job sites',
      'Professional appearance that builds trust before you knock on the door',
      'Full wraps, partial graphics, or simple door lettering — your budget, your call',
    ],
    cityUses: (city) => [
      `Contractors and service trucks working across ${city.name} neighborhoods`,
      `Delivery vehicles and mobile services covering the ${city.region} area`,
      `Fleet branding for companies with multiple vehicles in ${city.name}`,
      `Real estate agents and professionals who drive to client locations`,
    ],
    faqs: (city) => [
      [`How much do vehicle graphics cost in ${city.name}?`, `Pricing depends on vehicle size and coverage. Simple lettering (name, phone, website) typically starts under $300. Partial wraps range from $500–$1,200. Full wraps vary by vehicle size but generally run $2,000–$4,500 installed. Request a quote and we'll give you an exact number for your vehicle.`],
      [`How long do vehicle graphics last in ${city.name}'s heat?`, `Quality cast vinyl used on professional installs typically lasts 5–7 years even in Southeast Texas heat. We use industry-grade materials rated for UV and high-temperature exposure. Proper washing (no pressure washers directly on edges) extends the life significantly.`],
      [`Can I remove vehicle graphics later?`, `Yes. Professionally installed cast vinyl removes cleanly without damaging the paint when done correctly. We can also help with removal if you're rebranding or selling the vehicle.`],
    ],
  },
  'storefront-signs': {
    name: 'Storefront Signs',
    type: 'signage',
    mainHref: '/signage/storefront-signs',
    quoteProduct: 'Storefront Signs',
    quoteCategory: 'Signage',
    headline: (city) => `Storefront Signs in ${city.name}, TX`,
    intro: (city) => `A clear, professional storefront sign is often the first impression your business makes on customers driving or walking through ${city.name}. Pixel & Panel designs and produces storefront signs that are readable from the street, weatherproof, and matched to your brand — from dimensional letters to illuminated panels.`,
    benefits: [
      'Make your location easy to find and recognize from the street',
      'Build trust and professionalism before customers walk in',
      'Options for illuminated, dimensional, and flat panel signs',
      'Designed to hold up through Southeast Texas weather year-round',
    ],
    cityUses: (city) => [
      `Retail storefronts and service businesses ${city.landmark}`,
      `New business openings and rebrands across ${city.name}`,
      `Office buildings and professional services in ${city.name}`,
      `Restaurants and food businesses that need visible, durable exterior signage`,
    ],
    faqs: (city) => [
      [`Do I need a permit for a storefront sign in ${city.name}?`, `Most permanent exterior signs require a permit from the City of ${city.name}. Requirements vary based on size, lighting, and location. Pixel & Panel can guide you through what's typically needed — and in many cases help with the permit application process.`],
      [`What types of storefront signs work best in ${city.name}?`, `For most ${city.name} businesses, dimensional lettering (acrylic or metal letters mounted to the building face) or aluminum composite panel signs are the most durable and professional options. Illuminated channel letters are the top choice for businesses with evening hours or high-traffic locations.`],
      [`How long does a storefront sign take to produce?`, `Standard production runs 5–10 business days after design approval. Complex illuminated signs or permit-required installations may take 2–4 weeks total. Rush options are sometimes available — ask when you request your quote.`],
    ],
  },
  'vinyl-banners': {
    name: 'Vinyl Banners',
    type: 'signage',
    mainHref: '/signage/vinyl-banners',
    quoteProduct: 'Vinyl Banners',
    quoteCategory: 'Signage',
    headline: (city) => `Vinyl Banners in ${city.name}, TX`,
    intro: (city) => `Vinyl banners are one of the fastest and most cost-effective ways to promote your ${city.name} business — grand openings, seasonal sales, events, or job site advertising. Pixel & Panel produces banners that are readable from a distance, built for outdoor use, and ready in as little as 3 business days.`,
    benefits: [
      'Fast turnaround — ready in 3–5 business days',
      'Durable outdoor materials rated for Southeast Texas weather',
      'Custom sizes from 2\'×4\' to large job site banners',
      'Grommets, pole pockets, and hemmed edges included',
    ],
    cityUses: (city) => [
      `Grand openings and special promotions for ${city.name} businesses`,
      `Job site and fence advertising for contractors working across ${city.name}`,
      `Church, school, and community events throughout ${city.region}`,
      `Seasonal sales and limited-time offers for local retail and restaurants`,
    ],
    faqs: (city) => [
      [`What banner size do I need for my ${city.name} business?`, `It depends on viewing distance. For a storefront or fence seen from 30+ feet away, a 3'×8' or 4'×8' banner with 3–4" lettering works well. For indoor events or closer viewing, a 2'×4' or 2'×6' is typically enough. Share your location and we'll recommend the right size.`],
      [`How long will an outdoor banner last in ${city.name}?`, `Standard 13oz vinyl holds up 1–2 years outdoors. If your banner will be in direct sun or permanent display, we recommend 18oz heavy-duty vinyl, which handles heat and UV exposure better. Either way, removing it during severe weather extends the life significantly.`],
      [`Can you design the banner or do I need artwork?`, `Both options work. If you have a logo and brand colors, we can design the banner from there. If you're starting from scratch, we handle the full design as part of the order. Request a quote and note what you have — we'll take it from there.`],
    ],
  },
  'yard-signs': {
    name: 'Yard Signs',
    type: 'signage',
    mainHref: '/signage/yard-signs',
    quoteProduct: 'Yard Signs',
    quoteCategory: 'Signage',
    headline: (city) => `Yard Signs in ${city.name}, TX`,
    intro: (city) => `Yard signs are a high-visibility, low-cost way to advertise your business throughout ${city.name} neighborhoods. Contractors, real estate agents, political campaigns, events, and local service companies all use yard signs to build name recognition and drive calls from the exact neighborhoods they serve.`,
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
    ],
  },
  'local-seo': {
    name: 'Local SEO',
    type: 'digital',
    mainHref: '/digital/local-seo',
    quoteProduct: 'Local SEO',
    quoteCategory: 'Digital Services',
    headline: (city) => `Local SEO Services in ${city.name}, TX`,
    intro: (city) => `Local SEO helps your ${city.name} business show up when nearby customers search for what you offer on Google. Pixel & Panel focuses on practical improvements — stronger service pages, accurate local signals, Google Business Profile alignment, and service-area content that actually helps customers find you instead of a competitor.`,
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
    ],
  },
  'web-development': {
    name: 'Website Development',
    type: 'digital',
    mainHref: '/digital/web-development',
    quoteProduct: 'Website Development',
    quoteCategory: 'Digital Services',
    headline: (city) => `Website Development for ${city.name}, TX Businesses`,
    intro: (city) => `A professional website helps ${city.name} customers understand what you do, trust your business, and take the next step — whether that's calling, filling out a quote form, or visiting your location. Pixel & Panel builds fast, mobile-first websites for local businesses that need practical results, not a confusing tech project.`,
    benefits: [
      'Fast, mobile-first design — built for how local customers actually search',
      'Clear service pages and quote forms that drive real contact',
      'On-page SEO structure included from the start',
      'Plain English — no tech jargon, no locked-in platform contracts',
    ],
    cityUses: (city) => [
      `New businesses in ${city.name} that need a professional online presence`,
      `Local service companies with outdated or missing websites`,
      `${city.name} contractors and tradespeople who get leads by phone and referral`,
      `Restaurants and retail businesses that need a fast, mobile-friendly site`,
    ],
    faqs: (city) => [
      [`How much does a website cost for a ${city.name} business?`, `Pricing depends on scope — number of pages, forms, and complexity. Most local business websites fall between $1,500 and $4,500. We'll give you an exact number after a short conversation about what you need. Request a quote and we'll respond same business day.`],
      [`How long does it take to build a website for a ${city.name} business?`, `Most local business websites take 2–4 weeks from kickoff to launch. That timeline depends on how quickly we can get your content, logo, and approvals. We keep the process simple and tell you exactly what we need and when.`],
      [`Will my website show up on Google for ${city.name} searches?`, `We build every site with on-page SEO structure included — proper metadata, local signals, and service page architecture. That gives you a strong foundation. Additional local SEO work after launch helps build authority over time. We offer both services and can explain how they work together.`],
    ],
  },
  'google-business-profile': {
    name: 'Google Business Profile',
    type: 'digital',
    mainHref: '/digital/google-business-profile',
    quoteProduct: 'Google Business Profile',
    quoteCategory: 'Digital Services',
    headline: (city) => `Google Business Profile Optimization in ${city.name}, TX`,
    intro: (city) => `Your Google Business Profile is often the first thing ${city.name} customers see before they call or visit — and most local profiles are incomplete, outdated, or missing key information that helps customers choose you over a competitor. Pixel & Panel helps ${city.name} businesses clean up and strengthen their profile so it actually drives calls and quote requests.`,
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
    ],
  },
}

export const cityServiceStaticParams = Object.keys(cityServiceCities).flatMap((citySlug) =>
  Object.keys(cityServiceServices).map((serviceSlug) => ({
    city: citySlug,
    service: serviceSlug,
  }))
)

export function getCityServiceData(citySlug, serviceSlug) {
  const city = cityServiceCities[citySlug]
  const service = cityServiceServices[serviceSlug]
  if (!city || !service) return null
  return { city, service: { ...service, slug: serviceSlug } }
}
