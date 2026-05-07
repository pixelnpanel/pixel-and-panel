export const digitalServices = [
  {
    slug: "web-development",
    name: "Website Development",
    title: "Website Development for Local Businesses",
    description:
      "Fast, mobile-friendly website development for local businesses in Beaumont, Nederland, and Port Arthur, TX.",
    h1: "Website Development for Local Businesses",
    intro:
      "A good website should make your business look professional, explain what you do, and make it easy for customers to call, request a quote, or visit. Pixel & Panel builds fast, mobile-first websites for local businesses that need practical results, not confusing tech talk.",
    includes: ["Mobile-first website structure", "Clear service and contact pages", "Quote request flow", "Basic local SEO setup", "Google-ready page metadata"],
    faqs: [
      ["Do I need a website if I already have a Google profile?", "Yes. A website gives you more control over your services, location pages, quote flow, and brand trust."],
      ["Will the site work on phones?", "Yes. Mobile layout is a priority because many local customers search and call from their phone."],
      ["Can my website connect to signage or QR codes?", "Yes. We can connect QR codes from signs, flyers, and business cards to useful landing pages."],
    ],
    related: ["local-seo", "google-business-profile", "qr-code-campaigns"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    title: "Local SEO Services for Beaumont, Nederland & Port Arthur",
    description:
      "Local SEO services that help businesses improve visibility in Google search and maps across Beaumont, Nederland, and Port Arthur, TX.",
    h1: "Local SEO That Helps Nearby Customers Find You",
    intro:
      "Local SEO helps your business show up when nearby customers search for what you offer. We focus on practical improvements: stronger pages, cleaner local signals, better Google profile information, and service-area content that is useful instead of stuffed with keywords.",
    includes: ["Local keyword planning", "On-page SEO improvements", "Internal link structure", "Service area content guidance", "Google Business Profile alignment"],
    faqs: [
      ["How long does local SEO take?", "Local SEO is ongoing, but cleanup and foundational improvements can start helping Google understand your business more clearly."],
      ["Is local SEO only for websites?", "No. Your website, Google Business Profile, citations, reviews, and content all support local visibility."],
      ["Can SEO help contractors and service businesses?", "Yes. Local SEO is especially useful for businesses that depend on calls, quote requests, and nearby service searches."],
    ],
    related: ["google-business-profile", "web-development", "qr-code-campaigns"],
  },
  {
    slug: "google-business-profile",
    name: "Google Business Profile",
    title: "Google Business Profile Optimization",
    description:
      "Google Business Profile optimization for businesses in Beaumont, Nederland, and Port Arthur, TX that want better local visibility.",
    h1: "Google Business Profile Optimization for Local Businesses",
    intro:
      "Your Google Business Profile is often the first thing customers see before they call, visit, or ask for a quote. We help local businesses clean up profile information, service categories, photos, descriptions, links, and posting structure so the profile supports real customer action.",
    includes: ["Profile information review", "Category and service cleanup", "Description and service copy", "Website and quote link alignment", "Posting and update guidance"],
    faqs: [
      ["Can you create a new Google Business Profile?", "We can guide setup and optimization so the profile is accurate and useful for customers."],
      ["What should be on my Google profile?", "Correct contact details, service categories, photos, business description, services, and links to useful pages."],
      ["Does a Google profile replace a website?", "No. The profile helps discovery, while the website gives customers deeper information and a controlled quote flow."],
    ],
    related: ["local-seo", "web-development", "crm-automation"],
  },
  {
    slug: "crm-automation",
    name: "CRM & Automation",
    title: "CRM Automation for Local Business Leads",
    description:
      "Simple CRM and lead follow-up automation for local businesses in Beaumont, Nederland, and Port Arthur, TX.",
    h1: "CRM Automation That Helps You Follow Up Faster",
    intro:
      "Many local leads are lost because follow-up is slow or scattered. CRM automation helps organize inquiries from your website, quote forms, QR codes, and campaigns so customers get a faster response and your team has a clearer next step.",
    includes: ["Lead capture planning", "Quote request workflow", "Basic pipeline structure", "Email follow-up guidance", "QR campaign lead routing"],
    faqs: [
      ["Do I need a complicated CRM?", "No. Most local businesses need a simple system that captures leads and makes follow-up easier."],
      ["Can quote forms connect to follow-up?", "Yes. Quote forms can be structured so lead details are easier to review and respond to."],
      ["Can QR scans become leads?", "Yes. QR campaigns can send customers to pages or forms that feed your follow-up process."],
    ],
    related: ["qr-code-campaigns", "web-development", "local-seo"],
  },
  {
    slug: "qr-code-campaigns",
    name: "QR Code Campaigns",
    title: "QR Code Campaigns for Signs & Print",
    description:
      "QR code campaigns that connect signs, banners, flyers, business cards, and menus to trackable digital actions.",
    h1: "QR Code Campaigns That Connect Print to Digital Results",
    intro:
      "QR codes can turn signs and print materials into measurable marketing tools. We help plan where the code should go, what page it should open, and how the campaign should support calls, quote requests, menus, offers, or event registrations.",
    includes: ["QR destination planning", "Landing page recommendations", "Print placement guidance", "Scan-to-call or scan-to-quote flows", "Campaign tracking structure"],
    faqs: [
      ["Can every sign include a QR code?", "Many signs can include a QR code, but placement and viewing distance matter."],
      ["Where should a QR code send customers?", "It should send them to a useful next step, such as a quote form, menu, offer page, or contact page."],
      ["Are QR campaigns useful for print materials?", "Yes. Flyers, business cards, posters, menus, and banners can all connect to digital actions."],
    ],
    related: ["web-development", "crm-automation", "local-seo"],
  },
];

export function getDigitalService(slug) {
  return digitalServices.find((service) => service.slug === slug);
}

export function getRelatedDigitalServices(service) {
  return service.related.map((slug) => getDigitalService(slug)).filter(Boolean);
}
