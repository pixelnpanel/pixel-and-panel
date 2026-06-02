import PolicyPage from "@/components/policy/PolicyPage";

export const metadata = {
  title: {
    absolute: "Privacy Policy | Pixel & Panel",
  },
  description:
    "Learn how Pixel & Panel collects, uses, and protects information submitted through forms, quote requests, emails, calls, and website interactions.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Pixel & Panel",
    description:
      "Learn how Pixel & Panel collects, uses, and protects information submitted through forms, quote requests, emails, calls, and website interactions.",
    url: "/privacy-policy",
  },
};

const sections = [
  {
    heading: "Introduction",
    body: [
      "This Privacy Policy explains how Pixel & Panel collects, uses, and protects information submitted through website forms, quote requests, uploaded files, emails, calls, messages, invoices, and website interactions.",
    ],
  },
  {
    heading: "Information We Collect",
    items: [
      "Name, business name, email address, phone number, and contact preferences.",
      "Project details, service interests, quote requests, messages, deadlines, files, artwork, logos, photos, and uploaded materials.",
      "Website analytics, form submissions, page interactions, referral information, browser or device information, and basic technical data.",
      "Payment, invoice, and order-related information needed to process work and communicate about a project.",
    ],
  },
  {
    heading: "How Information Is Used",
    items: [
      "Prepare quotes, estimates, invoices, proofs, designs, project plans, and service recommendations.",
      "Communicate about projects, orders, approvals, support, scheduling, delivery, and follow-up questions.",
      "Provide digital services, signage, print, design work, Google visibility support, QR code campaigns, and related branding services.",
      "Maintain internal records, improve website performance, prevent spam or abuse, and support normal business operations.",
      "Send marketing or follow-up communication only when permitted or when it relates to a client inquiry, project, or business relationship.",
    ],
  },
  {
    heading: "Payment Information",
    body: [
      "Payments may be processed through third-party payment providers. Pixel & Panel does not store full card numbers on the website. Payment providers may collect and process payment details according to their own terms and privacy policies.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "Pixel & Panel may use Zoho, payment processors, analytics tools, hosting providers, email tools, form tools, security tools, Google services, and other business tools to operate the website, respond to requests, process payments, manage projects, and deliver services.",
      "These third-party services may process information as needed to provide their services. Pixel & Panel does not control every third-party privacy practice, so clients should review those providers' policies when appropriate.",
    ],
  },
  {
    heading: "Cookies and Analytics",
    body: [
      "The website may use cookies, analytics, or similar technologies to understand traffic, measure performance, prevent abuse, and improve the site. Browser settings may allow users to block or delete some cookies, although parts of the website may work differently if cookies are disabled.",
    ],
  },
  {
    heading: "Data Sharing",
    body: [
      "Pixel & Panel does not sell personal information. Information may be shared only as needed to respond to requests, complete projects, process payments, use business tools, comply with legal obligations, prevent abuse, or protect Pixel & Panel, clients, or others.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "Pixel & Panel may retain contact information, project records, quotes, invoices, messages, uploaded files, proofs, and related materials for as long as reasonably needed for business records, service delivery, support, legal compliance, dispute resolution, and internal operations.",
    ],
  },
  {
    heading: "Client Uploaded Files and Project Materials",
    body: [
      "Client-provided files and project materials may be used to prepare quotes, designs, proofs, signs, print materials, websites, QR campaigns, and other requested services. Clients should avoid submitting sensitive personal information unless it is required for the project.",
    ],
  },
  {
    heading: "Your Rights and Choices",
    body: [
      "Users may contact Pixel & Panel to ask privacy questions, request updates to contact information, or ask about information related to a project or form submission. Some records may need to be retained for business, legal, security, or accounting reasons.",
    ],
  },
  {
    heading: "Contact Information",
    body: [
      "Privacy questions may be sent to hello@pixelnpanel.com or directed by phone to (409) 225-2012.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="How Pixel & Panel handles information submitted through forms, quote requests, emails, calls, uploaded files, payments, and website interactions."
      currentHref="/privacy-policy"
      sections={sections}
    />
  );
}
