import PolicyPage from "@/components/policy/PolicyPage";

export const metadata = {
  title: {
    absolute: "Terms of Service | Pixel & Panel",
  },
  description:
    "Read the terms for using Pixel & Panel's website, requesting quotes, placing orders, approving design proofs, and purchasing digital, signage, print, and branding services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Pixel & Panel",
    description:
      "Read the terms for using Pixel & Panel's website, requesting quotes, placing orders, approving design proofs, and purchasing digital, signage, print, and branding services.",
    url: "/terms",
  },
};

const sections = [
  {
    heading: "Introduction",
    body: [
      "These Terms of Service are general business terms for Pixel & Panel LLC, doing business publicly as Pixel & Panel. They explain how website use, quote requests, orders, design approvals, digital services, signage, print, and branding work with Pixel & Panel.",
      "These terms are general business terms and are not legal advice. If you need legal guidance for your own business or project, please speak with a qualified attorney.",
    ],
  },
  {
    heading: "Services Covered",
    body: [
      "Pixel & Panel provides digital services, signage, print marketing materials, design services, Google visibility services, QR code campaigns, and related local branding support. A written quote, invoice, estimate, or project message may include details that apply to a specific order.",
    ],
  },
  {
    heading: "Quotes and Estimates",
    body: [
      "Quotes and estimates are based on the information available at the time they are prepared. Pricing, materials, timelines, and scope may change if project details, quantities, sizes, artwork, installation needs, rush timing, or third-party requirements change.",
      "Submitting a quote request does not require you to purchase anything. A project begins only after the client approves the scope and any required payment terms.",
    ],
  },
  {
    heading: "Payments and Deposits",
    body: [
      "Some projects may require a deposit, partial payment, or full payment before design, ordering, production, or digital work begins. Payment terms will be shared in the quote, invoice, or project communication.",
      "Final files, completed products, publishing, installation, delivery, or release of work may be held until required balances are paid.",
    ],
  },
  {
    heading: "Client Responsibilities",
    items: [
      "Provide accurate contact information, project details, sizes, quantities, deadlines, and billing information.",
      "Provide usable logos, artwork, copy, photos, files, access, approvals, and account information when needed.",
      "Review all proofs, links, forms, URLs, QR codes, colors, spelling, phone numbers, emails, and other details before approval.",
      "Respond in a timely way when feedback, access, or approvals are needed to keep a project moving.",
    ],
  },
  {
    heading: "Design Proofs and Approval",
    body: [
      "Design proofs are provided so the client can review layout, copy, sizing, colors, project details, and production intent before work continues. Once a proof is approved, Pixel & Panel may proceed with production, publishing, ordering, or other project work based on that approval.",
      "Client-approved mistakes, including spelling, contact information, QR codes, URLs, size choices, layout preferences, or omitted details, may require a paid revision, reprint, or new order.",
    ],
  },
  {
    heading: "Revisions and Changes",
    body: [
      "Reasonable revisions may be included when stated in the project scope. Extra revisions, major direction changes, rush changes, new sizes, new quantities, new copy, new artwork, or changes after approval may require additional charges and may affect timelines.",
    ],
  },
  {
    heading: "Signage, Print, and Production Timelines",
    body: [
      "Signage and print timelines are estimates unless a written agreement says otherwise. Timelines may be affected by proof approvals, artwork quality, client response time, materials, production availability, weather, installation conditions, shipping, and other factors outside Pixel & Panel's control.",
    ],
  },
  {
    heading: "Digital Service Timelines",
    body: [
      "Website, design, SEO, Google profile, QR campaign, and other digital service timelines depend on scope, client feedback, content availability, account access, third-party platform behavior, and approval timing. Pixel & Panel will communicate practical next steps, but exact third-party processing or ranking timelines cannot be guaranteed.",
    ],
  },
  {
    heading: "Cancellations",
    body: [
      "A client may request cancellation before work begins. If work has already started, approved deposits, design fees, production costs, rush fees, digital work, third-party costs, or completed portions of the project may be non-refundable or billed before cancellation is complete.",
    ],
  },
  {
    heading: "Intellectual Property and Design Ownership",
    body: [
      "Unless otherwise agreed in writing, the client owns final approved deliverables created specifically for the client after the project is paid in full. Pixel & Panel may retain ownership of unused concepts, internal processes, source files, templates, code patterns, tools, drafts, and design approaches not expressly transferred.",
      "Clients are responsible for having permission to use any logos, photos, fonts, artwork, copy, trademarks, or materials they provide.",
    ],
  },
  {
    heading: "Website Content, Images, and Client-Provided Materials",
    body: [
      "Client-provided materials may be used to prepare quotes, designs, proofs, websites, print pieces, signage, QR campaigns, and related services. Pixel & Panel may reject or request replacement materials that are low quality, incomplete, illegal, misleading, infringing, unsafe, or not appropriate for the project.",
    ],
  },
  {
    heading: "Third-Party Platforms and Tools",
    body: [
      "Some projects may rely on third-party platforms, payment providers, hosting, email tools, analytics, Google services, QR tools, website platforms, domain registrars, or other business tools. Pixel & Panel is not responsible for outages, account restrictions, pricing changes, policy changes, ranking changes, or other decisions made by those third parties.",
    ],
  },
  {
    heading: "No Guaranteed Rankings or Results",
    body: [
      "Pixel & Panel may help improve clarity, setup, visibility, design, and marketing systems, but no specific ranking, traffic level, lead volume, sale amount, review count, or business result is guaranteed.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent allowed by applicable law, Pixel & Panel is not liable for indirect, incidental, special, consequential, or lost-profit damages related to website use, project delays, third-party services, client-approved mistakes, or business outcomes. Pixel & Panel's responsibility for a project is generally limited to the amount paid for the affected service.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These terms are governed by the laws of Texas, United States, without regard to conflict-of-law rules.",
    ],
  },
  {
    heading: "Contact Information",
    body: [
      "Questions about these terms may be sent to hello@pixelnpanel.com or directed by phone to (409) 225-2012.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Service"
      description="Plain-English terms for using the Pixel & Panel website, requesting quotes, approving proofs, and purchasing digital, signage, print, and branding services."
      currentHref="/terms"
      sections={sections}
    />
  );
}
