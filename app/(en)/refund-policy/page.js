import PolicyPage from "@/components/policy/PolicyPage";

export const metadata = {
  title: {
    absolute: "Refund & Cancellation Policy | Pixel & Panel",
  },
  description:
    "Review Pixel & Panel's refund, cancellation, deposit, proof approval, signage, print, and digital service policy.",
  alternates: {
    canonical: "/refund-policy",
  },
  openGraph: {
    title: "Refund & Cancellation Policy | Pixel & Panel",
    description:
      "Review Pixel & Panel's refund, cancellation, deposit, proof approval, signage, print, and digital service policy.",
    url: "/refund-policy",
  },
};

const sections = [
  {
    heading: "Introduction",
    body: [
      "This Refund & Cancellation Policy explains how Pixel & Panel generally handles deposits, cancellations, design work, signage, print products, rush orders, reprints, and digital services. Specific written quote or invoice terms may also apply to a project.",
    ],
  },
  {
    heading: "Quote and Estimate Stage",
    body: [
      "There is no charge simply for submitting a quote request or reviewing an estimate unless a separate paid consultation, design, or planning service is clearly agreed to in writing. A project begins after the client approves the scope and any required payment terms.",
    ],
  },
  {
    heading: "Deposits",
    body: [
      "Deposits may be required before design, ordering, production, installation planning, or digital work begins. Deposits cover reserved time, planning, design work, materials, production setup, and related project costs.",
    ],
  },
  {
    heading: "Design Work",
    body: [
      "Design fees are generally non-refundable once work has started. This includes logo layout, website design, print design, signage layout, QR campaign design, proof preparation, revisions, and other creative or setup work.",
    ],
  },
  {
    heading: "Signage and Print Products",
    body: [
      "Custom signage and print products are generally non-refundable once a proof is approved and production begins. Custom work may include banners, yard signs, vehicle graphics, window graphics, storefront signs, business cards, flyers, menus, posters, decals, and other made-to-order items.",
    ],
  },
  {
    heading: "Proof Approval",
    body: [
      "Clients are responsible for carefully checking every proof before approval. This includes spelling, layout, size, quantities, colors, phone numbers, emails, website URLs, QR codes, dates, and all other details.",
      "Approval means the client authorizes Pixel & Panel to continue based on the approved proof. Client-approved mistakes may require a paid correction, reprint, remake, or new order.",
    ],
  },
  {
    heading: "Reprints",
    body: [
      "Reprints or remakes are available only when the issue is caused by Pixel & Panel's production or design error. Reprints are not generally provided for client-approved mistakes, incomplete information, low-quality client files, changed preferences, or errors that were visible in an approved proof.",
    ],
  },
  {
    heading: "Digital Services",
    body: [
      "Website design, website setup, SEO, Google profile setup, QR campaign setup, CRM setup, and other digital services are generally non-refundable once work has started. Completed work, planning time, design time, setup time, account configuration, publishing support, and third-party costs may be billed or retained.",
    ],
  },
  {
    heading: "Cancellations Before Work Starts",
    body: [
      "If a cancellation is requested before any work begins and before any project costs are incurred, Pixel & Panel may cancel the project and refund eligible payments, minus any payment processing fees or agreed planning costs if applicable.",
    ],
  },
  {
    heading: "Cancellations After Work Starts",
    body: [
      "If cancellation is requested after work starts, Pixel & Panel may retain or bill for the portion of work completed, deposits, design time, production setup, materials, third-party charges, rush fees, and other non-recoverable costs.",
    ],
  },
  {
    heading: "Rush Orders",
    body: [
      "Rush fees are generally non-refundable once rush work, scheduling, design, ordering, or production begins. Rush timelines depend on complete client materials, fast approvals, and production availability.",
    ],
  },
  {
    heading: "Color Variation",
    body: [
      "Colors may vary between screens, proofs, print materials, signage materials, lighting conditions, and production methods. Reasonable color variation is not usually considered a defect unless a specific color-matching requirement was agreed to in writing before production.",
    ],
  },
  {
    heading: "Timeline Delays",
    body: [
      "Project timelines may be delayed if client materials, payment, access, feedback, or proof approvals are missing or late. Pixel & Panel is not responsible for delays caused by incomplete information, late approvals, third-party tools, weather, shipping, installation conditions, or other factors outside Pixel & Panel's control.",
    ],
  },
  {
    heading: "Contact Information",
    body: [
      "Questions about refunds, cancellations, proof approvals, or a specific project may be sent to hello@pixelnpanel.com or directed by phone to (409) 225-2012.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund & Cancellation Policy"
      description="How Pixel & Panel handles deposits, cancellations, proof approvals, custom signage, print products, rush orders, reprints, and digital service work."
      currentHref="/refund-policy"
      sections={sections}
    />
  );
}
