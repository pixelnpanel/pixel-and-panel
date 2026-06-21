import { withDefaultSocialImage } from "@/lib/seo";

export const LEGAL_POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund / Reprint Policy", href: "/refund-reprint-policy" },
  { label: "Payment Policy", href: "/payment-policy" },
  { label: "Proof Approval Policy", href: "/proof-approval-policy" },
  { label: "Website Service Terms", href: "/website-service-terms" },
  { label: "Contact / Legal Notice", href: "/legal-notice" },
];

export const POLICY_DISCLAIMER =
  "This page is provided for general business information and is not legal advice. Pixel & Panel may ask a qualified business attorney to review or update these terms.";

export const legalPolicies = {
  privacyPolicy: {
    title: "Privacy Policy",
    href: "/privacy-policy",
    description:
      "How Pixel & Panel collects, uses, stores, and protects information submitted through forms, quote requests, visibility checks, payments, files, and website interactions.",
    metadataDescription:
      "Learn how Pixel & Panel collects, uses, stores, and protects information submitted through forms, quote requests, visibility checks, payments, files, and website interactions.",
    sections: [
      {
        heading: "Introduction",
        body: [
          "Pixel & Panel respects your privacy. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, submit a form, request a quote, request a free visibility check, contact us, or purchase services from us.",
          "Pixel & Panel is a Texas limited liability company that provides branding, website, Google visibility, QR code campaign, design, signage, print marketing, and related business services. We operate as a service-area and remote business. We do not operate a public storefront.",
          "By using our website or submitting information to Pixel & Panel, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        body: ["We may collect information you choose to provide directly, including:"],
        items: [
          "Name, business name, email address, phone number, project details, service interests, quote request details, and free visibility check details.",
          "Messages, notes, files, artwork, logos, brand assets, photos, documents, billing details, or payment-related information connected to a project.",
          "Basic website usage information such as IP address, browser type, device type, pages visited, time spent on pages, referring website, traffic source, analytics data, and performance data.",
        ],
      },
      {
        heading: "How We Use Information",
        items: [
          "Respond to questions, prepare estimates, quotes, proposals, and invoices, and communicate about projects.",
          "Provide website, design, signage, print, QR code, Google visibility, and related services.",
          "Review business visibility, website, Google presence, and marketing needs.",
          "Send proofs, approvals, updates, project instructions, invoices, receipts, and payment communications.",
          "Schedule consultations, delivery, installation, or production steps with service providers when needed.",
          "Improve the website and customer experience, track performance, maintain business records, prevent fraud or misuse, manage disputes or chargebacks, and comply with legal, tax, accounting, or regulatory requirements.",
        ],
        note: "Pixel & Panel does not sell personal information.",
      },
      {
        heading: "Forms and Visibility Checks",
        body: [
          "When someone submits a contact form, quote form, or free visibility check form, Pixel & Panel may use the information provided to understand the request and contact the person back.",
          "If someone requests a free visibility check, Pixel & Panel may review publicly available business information such as a website, Google Business Profile, online listings, social media presence, and other public business visibility details.",
          "Submitting a form does not create a client relationship until both sides agree to move forward with a project, payment, or written service agreement.",
        ],
      },
      {
        heading: "Payment Information",
        body: [
          "Pixel & Panel may use third-party payment processors to process payments, invoices, deposits, balances, and related billing activity.",
          "Pixel & Panel does not intentionally store full credit card numbers or full bank account details on the website. Payment information is handled by the applicable payment processor according to its own privacy and security practices.",
          "Payment-related records may include customer name, business name, billing contact information, invoice number, payment amount, payment status, transaction date, and records needed for accounting, tax, dispute, fraud prevention, or chargeback purposes.",
        ],
      },
      {
        heading: "Third-Party Tools and Service Providers",
        body: [
          "Pixel & Panel may use trusted third-party tools and service providers for website hosting, email, forms, analytics, payment processing, invoicing, customer communication, file storage, project management, design workflow, QR code tracking, and website performance monitoring.",
          "For physical signage, print, installation, delivery, permitting, or related production work, Pixel & Panel may use third-party production partners, installers, or service providers. Pixel & Panel may share only the information reasonably needed to complete the requested work.",
        ],
      },
      {
        heading: "Website Analytics and Cookies",
        body: [
          "The website may use cookies, analytics tools, or similar technologies to understand how visitors use the site, improve the website, and measure marketing performance.",
          "Visitors can adjust browser settings to block or delete cookies. Some website features may not work properly if cookies are disabled.",
        ],
      },
      {
        heading: "QR Code Campaigns and Tracking",
        body: [
          "Pixel & Panel may create QR code campaigns for customers. QR codes may direct users to landing pages, contact forms, menus, review pages, quote pages, or other online destinations.",
          "Depending on the campaign setup, QR code tracking may collect general scan-related information such as number of scans, approximate scan time, general device or browser type, approximate location data where available, campaign source, landing page visits, and form submissions connected to the campaign.",
          "Pixel & Panel does not use QR code tracking to collect sensitive personal information unless a visitor voluntarily submits that information through a form.",
        ],
      },
      {
        heading: "Customer Files and Project Materials",
        body: [
          "Customers may send logos, artwork, brand files, photos, copy, website content, business information, or other materials for a project.",
          "By sending materials to Pixel & Panel, the customer confirms they have the right to use and provide those materials.",
          "Customers are responsible for the accuracy, ownership, licensing, spelling, grammar, legal compliance, and permitted use of any content, artwork, images, trademarks, logos, claims, or materials they provide.",
        ],
      },
      {
        heading: "How Long Information Is Kept",
        body: [
          "Pixel & Panel may keep customer and project information for as long as reasonably needed to respond to inquiries, complete projects, provide support, maintain records, handle accounting and tax obligations, resolve disputes, defend against claims, manage chargebacks or payment issues, and comply with legal requirements.",
        ],
      },
      {
        heading: "Sharing Information",
        body: [
          "Pixel & Panel may share information when reasonably necessary to complete a project, process payments, send invoices or receipts, host or maintain the website, coordinate printing, signage, delivery, installation, or permitting, work with subcontractors or production partners, comply with legal requirements, prevent fraud, or protect business rights.",
          "Pixel & Panel does not sell customer information.",
        ],
      },
      {
        heading: "Communication",
        body: [
          "When someone contacts Pixel & Panel or submits a form, Pixel & Panel may respond by email, phone call, or text message using the contact information provided.",
          "People may ask to stop non-essential marketing communication at any time by contacting hello@pixelnpanel.com.",
        ],
      },
      {
        heading: "Children's Privacy",
        body: [
          "Pixel & Panel's website and services are intended for businesses and adults. Pixel & Panel does not knowingly collect personal information from children under 13.",
        ],
      },
      {
        heading: "Changes to This Policy",
        body: [
          "Pixel & Panel may update this Privacy Policy from time to time. Continued use of the website after updates means the updated policy applies.",
        ],
      },
    ],
  },

  termsAndConditions: {
    title: "Terms & Conditions",
    href: "/terms-and-conditions",
    description:
      "Plain-English terms for using the Pixel & Panel website, requesting quotes, approving proofs, making payments, and purchasing digital, signage, print, and branding services.",
    metadataDescription:
      "Read the terms for using Pixel & Panel's website, requesting quotes, approving proofs, making payments, and purchasing digital, signage, print, and branding services.",
    sections: [
      {
        heading: "Introduction",
        body: [
          "These Terms & Conditions explain the rules for using the Pixel & Panel website and working with Pixel & Panel for services.",
          "Pixel & Panel provides branding, website, Google visibility, QR code campaign, design, signage, print marketing, and related business services. Pixel & Panel operates as a service-area and remote business. We do not operate a public storefront.",
          "By using this website, submitting a form, requesting a quote, approving a project, making a payment, or working with Pixel & Panel, the customer agrees to these Terms & Conditions.",
        ],
      },
      {
        heading: "Services",
        body: [
          "Pixel & Panel offers two main categories of services. Digital services may include website design and development, local Google visibility support, Google Business Profile support, QR code campaigns, digital design, lead capture setup, website care, and related services.",
          "Signs and print services may include yard signs, banners, vehicle graphics, window graphics, print marketing materials, business cards, flyers, decals, rigid signs, event materials, and related design or production services.",
          "Some physical signage, print, installation, delivery, permitting, or production work may be completed by third-party production partners, installers, or service providers.",
        ],
      },
      {
        heading: "Quotes and Estimates",
        body: ["Quotes and estimates are based on the information available at the time they are prepared. Quotes may change if:"],
        items: [
          "Project size, materials, quantity, artwork, timeline, installation needs, delivery needs, or requested work changes.",
          "Vendor, production, or material costs change.",
          "Customer-provided information was incomplete or inaccurate.",
        ],
        note: "Pixel & Panel is not responsible for delays or extra costs caused by incomplete information, late responses, missing files, unclear instructions, or customer-requested changes.",
      },
      {
        heading: "Customer Responsibility",
        body: [
          "Customers are responsible for providing accurate project details, contact information, business information, artwork, content, measurements, approvals, and files.",
          "Customers are responsible for confirming that all names, spelling, phone numbers, website URLs, QR codes, addresses, design details, colors, sizes, quantities, and project information are correct before approval or production.",
        ],
      },
      {
        heading: "Proof Approval",
        body: [
          "For design, signage, print, and website projects, Pixel & Panel may provide proofs, mockups, previews, or drafts.",
          "Customer approval means the customer accepts the design, content, spelling, layout, size, color direction, and project details shown in the proof. Once approved, the project may move into production, printing, ordering, installation, or publishing.",
          "Pixel & Panel is not responsible for customer-approved errors.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "Payment terms may vary by project. Pixel & Panel may require full payment, a deposit, or milestone payments before work begins, before production, before delivery, before installation, or before website launch.",
          "Payments may be processed through approved third-party payment processors or another approved payment method.",
          "Customer agrees not to file false chargebacks or payment disputes for approved, delivered, published, or completed work.",
        ],
      },
      {
        heading: "Refunds and Reprints",
        body: [
          "Refunds and reprints are handled according to the Refund / Reprint Policy.",
          "Custom design, signage, print, website, QR code, and digital services are generally not refundable once work has started, files have been prepared, proofs have been approved, production has started, materials have been ordered, or a website or digital service has been delivered.",
        ],
      },
      {
        heading: "Production, Color, and Material Variation",
        body: [
          "Printed colors may vary from screen previews. Screens, printers, materials, lighting, inks, coatings, substrates, and production methods can affect final color and appearance.",
          "Small variations in color, trimming, material, size, finishing, installation, or production are normal and do not automatically qualify for refund or reprint.",
        ],
      },
      {
        heading: "Third-Party Platforms",
        body: [
          "Some services may involve third-party platforms such as hosting providers, domain registrars, website platforms, email providers, payment processors, analytics tools, Google Business Profile, social media platforms, QR code tools, or CRM systems.",
          "Pixel & Panel is not responsible for outages, policy changes, account restrictions, suspensions, review removals, ranking changes, platform errors, or decisions made by third-party platforms.",
        ],
      },
      {
        heading: "Website Services",
        body: [
          "Website service details are also governed by the Website Service Terms.",
          "Customers are responsible for providing website content, business information, images, legal claims, policies, pricing, offers, login access, domain or hosting access, and approvals when required.",
        ],
      },
      {
        heading: "Delays",
        body: [
          "Project timelines depend on customer response time, file readiness, proof approval, payment, production partner availability, production schedules, shipping, weather, installation conditions, platform access, and other factors.",
          "Pixel & Panel is not responsible for delays caused by customer delays, third-party production partners, shipping carriers, weather, platform outages, permitting offices, or circumstances outside reasonable control.",
        ],
      },
      {
        heading: "Ownership and Use",
        body: [
          "Unless otherwise agreed in writing, final delivered files or completed work may be used by the customer after full payment is received.",
          "Pixel & Panel may retain working files, drafts, design source files, internal templates, process documents, and unused concepts unless a separate written agreement says otherwise.",
          "Pixel & Panel may display completed work in its portfolio, website, social media, marketing, or sales materials unless the customer requests confidentiality in writing and Pixel & Panel agrees.",
        ],
      },
      {
        heading: "Limitation of Liability",
        body: [
          "To the fullest extent allowed by law, Pixel & Panel is not liable for indirect, incidental, special, lost profit, lost revenue, lost business, ranking loss, platform decision, customer mistake, or consequential damages.",
          "Pixel & Panel's total liability for a project is limited to the amount paid by the customer for the specific service giving rise to the claim.",
        ],
      },
      {
        heading: "Governing Law",
        body: [
          "These Terms & Conditions are governed by the laws of the State of Texas, without regard to conflict of law rules.",
        ],
      },
    ],
  },

  refundReprintPolicy: {
    title: "Refund / Reprint Policy",
    href: "/refund-reprint-policy",
    description:
      "How Pixel & Panel handles refunds, reprints, corrections, customer-approved errors, production concerns, chargebacks, and project issue windows.",
    metadataDescription:
      "Review Pixel & Panel's refund, reprint, correction, proof approval, signage, print, website, and digital service policy.",
    sections: [
      {
        heading: "Introduction",
        body: [
          "This Refund / Reprint Policy explains how Pixel & Panel handles refunds, reprints, corrections, and project concerns.",
          "Pixel & Panel provides custom work. Because custom design, website, signage, print, QR code, and marketing services are made specifically for each customer, refunds are limited.",
        ],
      },
      {
        heading: "General Policy",
        body: [
          "All sales are considered final once work has started, proofs have been approved, files have been prepared, production has started, materials have been ordered, third-party costs have been incurred, or digital work has been delivered.",
          "Pixel & Panel may review refund or reprint requests case by case, but approval is not guaranteed.",
        ],
      },
      {
        heading: "Non-Refundable Items",
        body: ["The following are generally non-refundable:"],
        items: [
          "Custom design work, logo work, artwork, layout, or file preparation.",
          "Website design or development work, Google visibility work, QR code campaign setup, or other digital setup work after it has started.",
          "Printed products or signs after proof approval.",
          "Materials ordered for a customer project, rush fees, production partner costs, production costs, shipping, delivery, installation, permit, or other third-party costs.",
          "Deposits after work has started and approved projects with customer errors.",
        ],
      },
      {
        heading: "Customer-Approved Errors",
        body: ["Pixel & Panel is not responsible for errors approved by the customer, including:"],
        items: [
          "Spelling errors, wrong phone numbers, wrong email addresses, wrong website URLs, wrong business names, or wrong dates.",
          "Wrong QR code destination, colors, sizes, quantities, or materials if approved.",
          "Low-quality customer-provided artwork or missing information in customer-provided content.",
        ],
        note: "If a customer approves a proof with an error, any reprint, remake, redesign, or correction may require additional payment.",
      },
      {
        heading: "Reprint Eligibility",
        body: ["A reprint or correction may be considered if:"],
        items: [
          "Pixel & Panel or its production process caused a clear error.",
          "The final product materially differs from the approved proof.",
          "The wrong product, size, quantity, or material was produced due to Pixel & Panel's error.",
          "There is a verified production defect beyond normal print or material tolerance.",
        ],
        note: "Pixel & Panel may request photos, videos, returned materials, or other evidence before approving a reprint.",
      },
      {
        heading: "Color and Material Variation",
        body: [
          "Printed colors may not exactly match screen previews. Color can vary due to monitor settings, lighting, printers, ink, material, coating, lamination, and production methods.",
          "Small differences in color, texture, material, trimming, size, finishing, or installation are normal and do not automatically qualify for refund or reprint.",
        ],
      },
      {
        heading: "Damage After Delivery or Installation",
        body: ["Pixel & Panel is not responsible for damage caused by:"],
        items: [
          "Customer handling, improper storage, weather, wind, water, heat, sun exposure, vandalism, or accidents.",
          "Improper installation by others, surface failure, or normal wear and tear.",
        ],
      },
      {
        heading: "Website and Digital Service Refunds",
        body: [
          "Website, Google visibility, QR code campaign, design, and digital service payments are generally not refundable once work has started.",
          "If a project is canceled before completion, Pixel & Panel may keep payment for work already completed, time spent, third-party costs, setup costs, and administrative costs.",
        ],
      },
      {
        heading: "Chargebacks",
        body: [
          "Customers agree to contact Pixel & Panel first to resolve any billing or project issue before filing a chargeback.",
          "False or improper chargebacks for approved, completed, delivered, printed, installed, or published work may result in collection activity, service suspension, recovery of fees, and refusal of future service.",
        ],
      },
      {
        heading: "Request Window",
        body: [
          "Any refund, reprint, correction, or issue must be reported in writing within 3 business days of delivery, pickup, installation, publication, or project completion.",
          "Requests made after this window may be denied.",
        ],
      },
    ],
  },

  paymentPolicy: {
    title: "Payment Policy",
    href: "/payment-policy",
    description:
      "How Pixel & Panel handles invoices, deposits, balances, payment timing, Texas sales tax, late payments, failed payments, and payment disputes.",
    metadataDescription:
      "Review Pixel & Panel's policy for invoices, deposits, balances, payment timing, Texas sales tax, late payments, failed payments, and payment disputes.",
    sections: [
      {
        heading: "Introduction",
        body: [
          "This Payment Policy explains how Pixel & Panel handles invoices, deposits, balances, payment timing, taxes, late payments, and payment disputes.",
        ],
      },
      {
        heading: "Accepted Payments",
        body: [
          "Pixel & Panel may accept payment through approved methods including business invoice payment links, card payment, bank transfer, or other approved business payment methods.",
        ],
      },
      {
        heading: "Deposits and Upfront Payments",
        body: [
          "Pixel & Panel may require full payment or a deposit before starting work.",
          "For custom signs, print, design, website, QR code, or digital projects, work may not begin until required payment is received.",
          "For larger projects, Pixel & Panel may require milestone payments.",
        ],
      },
      {
        heading: "Final Payment",
        body: ["Final payment may be required before:"],
        items: [
          "Print production, sign production, delivery, pickup, or installation.",
          "Website launch, final file delivery, domain transfer, website handoff, or publishing work online.",
        ],
      },
      {
        heading: "Sales Tax",
        body: [
          "Pixel & Panel is registered for Texas Sales and Use Tax.",
          "Tax may be added where required by Texas law, especially for taxable signs, print products, tangible goods, and certain taxable services.",
          "Some digital or professional services may not be taxable, depending on the type of service and Texas tax rules. Pixel & Panel may update tax handling based on CPA guidance or Texas Comptroller requirements.",
        ],
      },
      {
        heading: "Late Payments",
        body: [
          "Late payments may delay production, delivery, installation, website launch, support, or project completion.",
          "Pixel & Panel may pause work until overdue invoices are paid.",
        ],
      },
      {
        heading: "Failed Payments",
        body: [
          "If a payment fails, is reversed, disputed, or returned, the customer remains responsible for the unpaid balance and any related fees allowed by law or agreed in the invoice or contract.",
        ],
      },
      {
        heading: "Chargebacks and Disputes",
        body: [
          "Customers agree to contact Pixel & Panel first before filing a payment dispute or chargeback.",
          "Filing a chargeback does not cancel the customer's responsibility for approved work, completed work, delivered products, third-party costs, or unpaid balances.",
          "Pixel & Panel may provide signed approvals, invoices, proof approvals, communication records, delivery records, project files, or other evidence to the payment processor or bank in response to a dispute.",
        ],
      },
      {
        heading: "Ownership Until Paid",
        body: [
          "Pixel & Panel may retain ownership, control, access, or delivery of final files, printed products, website files, domain or hosting handoff, QR campaigns, or digital assets until all required payments are completed.",
        ],
      },
    ],
  },

  proofApprovalPolicy: {
    title: "Proof Approval Policy",
    href: "/proof-approval-policy",
    description:
      "How Pixel & Panel handles design proofs, website previews, print proofs, sign proofs, customer approvals, QR code checks, and changes after approval.",
    metadataDescription:
      "Review Pixel & Panel's proof approval policy for design proofs, website previews, print proofs, sign proofs, customer approvals, QR codes, and changes after approval.",
    sections: [
      {
        heading: "Introduction",
        body: [
          "This Proof Approval Policy explains how design proofs, website previews, print proofs, and sign proofs work at Pixel & Panel.",
        ],
      },
      {
        heading: "What a Proof Is",
        body: [
          "A proof is a preview, mockup, draft, layout, screenshot, design file, website preview, or production-ready file shared for customer review.",
          "Proofs are used to confirm design direction, content, size, layout, spelling, colors, QR code placement, materials, quantities, and project details before production or publishing.",
        ],
      },
      {
        heading: "Customer Responsibility",
        body: ["The customer is responsible for reviewing every proof carefully before approval. Customer should check:"],
        items: [
          "Spelling, grammar, business name, phone number, email, website URL, address or service area, dates, pricing, offers, and final message.",
          "QR code destination, logo placement, colors, size, quantity, material, layout, website content, and legal or service claims.",
        ],
      },
      {
        heading: "Approval Means Acceptance",
        body: [
          "When a customer approves a proof by email, text, form, written message, payment, signature, or other clear confirmation, the customer accepts the proof as correct.",
          "After approval, Pixel & Panel may move the project into production, ordering, printing, installation scheduling, website publishing, or final delivery.",
        ],
      },
      {
        heading: "Approved Errors",
        body: [
          "Pixel & Panel is not responsible for customer-approved errors.",
          "If an approved proof contains a mistake, correction may require additional payment for redesign, reprint, remake, materials, production, installation, delivery, or digital updates.",
        ],
      },
      {
        heading: "Color and Display Differences",
        body: [
          "Colors on screens are only previews. Final printed colors may vary due to monitor settings, lighting, printer settings, ink, materials, coatings, lamination, and production methods.",
          "Exact color matching is not guaranteed unless specifically agreed in writing and quoted as a color-critical job.",
        ],
      },
      {
        heading: "Low-Quality Customer Files",
        body: [
          "If customer-provided artwork, logos, photos, or files are low resolution, blurry, incorrect, flattened, compressed, or not production-ready, final output quality may be affected.",
          "Pixel & Panel may recommend file cleanup, vectorization, redesign, or recreation for an additional fee.",
        ],
      },
      {
        heading: "QR Codes",
        body: [
          "Customers are responsible for testing QR codes shown in proofs before approval.",
          "Pixel & Panel may help create or test QR codes, but customer must confirm that the QR code destination is correct before production.",
        ],
      },
      {
        heading: "Changes After Approval",
        body: [
          "Changes requested after approval may cause extra charges, production delays, rush fees, production partner fees, material costs, or reprint costs.",
        ],
      },
    ],
  },

  websiteServiceTerms: {
    title: "Website Service Terms",
    href: "/website-service-terms",
    description:
      "Terms for Pixel & Panel website design, development, updates, website care, Google visibility support, QR code landing pages, and related digital services.",
    metadataDescription:
      "Review Pixel & Panel's website service terms for website design, development, updates, care plans, Google visibility support, QR code landing pages, and digital services.",
    sections: [
      {
        heading: "Introduction",
        body: [
          "These Website Service Terms apply to website design, website development, website updates, website care, Google visibility support, QR code landing pages, and related digital services provided by Pixel & Panel.",
        ],
      },
      {
        heading: "Scope of Work",
        body: [
          "Each website or digital project is based on the approved quote, proposal, invoice, written scope, or package details.",
          "Work outside the approved scope may require additional payment.",
          "Examples of out-of-scope work may include:",
        ],
        items: [
          "Extra pages, extra revisions, new features, copywriting beyond the agreed scope, logo design, advanced integrations, booking systems, e-commerce, CRM setup, or custom forms.",
          "Emergency support, content migration, domain recovery, hosting migration, or third-party platform troubleshooting.",
        ],
      },
      {
        heading: "Customer Content",
        body: [
          "Customer is responsible for providing accurate business information, text, images, service descriptions, pricing, offers, policies, legal disclaimers, contact details, and other website content.",
          "Pixel & Panel may help write, organize, or edit website copy, but the customer is responsible for final review and approval.",
        ],
      },
      {
        heading: "Access and Logins",
        body: [
          "Some projects may require access to domain registrars, hosting accounts, DNS, website platforms, Google Business Profile, email platforms, analytics tools, payment tools, or third-party accounts.",
          "Customer is responsible for providing accurate access when needed.",
          "Pixel & Panel is not responsible for delays caused by missing logins, restricted accounts, lost passwords, account disputes, platform lockouts, or third-party verification issues.",
        ],
      },
      {
        heading: "Domain and Hosting",
        body: [
          "Unless specifically stated in writing, customers are responsible for owning and maintaining their own domain name, hosting account, email account, and third-party platform accounts.",
          "Pixel & Panel may assist with setup or connection, but the customer remains responsible for renewals, billing, account ownership, and platform rules.",
        ],
      },
      {
        heading: "Website Launch",
        body: [
          "A website may not launch until required payment is complete, required content is provided, customer approval is received, and required access is available.",
          "Customer approval of a website preview means the customer accepts the content, layout, links, forms, contact details, service descriptions, and general website presentation.",
        ],
      },
      {
        heading: "Google Visibility and SEO",
        body: [
          "Pixel & Panel may provide Google visibility, Google Business Profile support, local SEO setup, metadata, content structure, tracking setup, and related services.",
          "Pixel & Panel does not guarantee specific rankings, traffic, leads, sales, reviews, calls, map placement, or search results.",
          "Google rankings and visibility depend on many factors outside Pixel & Panel's control, including competition, customer reviews, location, search behavior, Google updates, website history, content quality, backlinks, and platform decisions.",
        ],
      },
      {
        heading: "Third-Party Platforms",
        body: [
          "Pixel & Panel is not responsible for outages, policy changes, account suspensions, review removals, ranking changes, lost access, plugin or platform errors, billing changes, or decisions made by third-party platforms.",
        ],
      },
      {
        heading: "Website Maintenance and Care",
        body: [
          "Website care plans may include only the services listed in the active package or agreement.",
          "Unused care plan time, support, or updates may not roll over unless specifically stated in writing.",
          "Care plans do not include full redesigns, major new features, large content rewrites, emergency recovery, malware cleanup, hosting migration, or third-party platform repair unless included in the selected plan.",
        ],
      },
      {
        heading: "Backups and Security",
        body: [
          "Pixel & Panel may use reasonable practices for website setup, but no website can be guaranteed to be completely secure, error-free, or uninterrupted.",
          "Customers should maintain access to their own domain, hosting, email, and critical business accounts.",
        ],
      },
      {
        heading: "Portfolio Use",
        body: [
          "Pixel & Panel may display completed website or digital work in its portfolio, case studies, website, social media, and marketing materials unless the customer requests confidentiality in writing and Pixel & Panel agrees.",
        ],
      },
    ],
  },

  legalNotice: {
    title: "Contact / Legal Notice",
    href: "/legal-notice",
    description:
      "Official business contact and legal notice information for Pixel & Panel, a Texas LLC serving Southeast Texas as a service-area and remote business.",
    metadataDescription:
      "Official business contact and legal notice information for Pixel & Panel, a Texas LLC serving Southeast Texas as a service-area and remote business.",
    sections: [
      {
        heading: "Official Contact Information",
        rows: [
          { label: "Public Business Name", value: "Pixel & Panel" },
          { label: "Legal Business Name", value: "Pixel & Panel LLC" },
          { label: "Website", value: "www.pixelnpanel.com" },
          { label: "Email", value: "hello@pixelnpanel.com" },
          { label: "Phone", value: "(409) 225-2012" },
          { label: "Entity", value: "Texas limited liability company" },
          { label: "Texas Taxpayer Number", value: "32105975000" },
          { label: "NAICS", value: "541430 - Graphic Design Services" },
        ],
      },
      {
        heading: "Service Area",
        body: [
          "Pixel & Panel serves Southeast Texas, including Beaumont, Nederland, Port Arthur, and surrounding areas.",
        ],
      },
      {
        heading: "Business Model",
        body: [
          "Pixel & Panel is a service-area and remote business. Pixel & Panel does not operate a public storefront.",
        ],
      },
      {
        heading: "Services",
        body: [
          "Pixel & Panel provides branding, website, Google visibility, QR code campaign, design, signage, print marketing, and related services.",
        ],
      },
      {
        heading: "Third-Party Vendors and Partners",
        body: [
          "Some signage, print, installation, delivery, permitting, production, or related services may involve third-party production partners, installers, or service providers.",
        ],
      },
      {
        heading: "Legal Notices",
        body: [
          "Legal, billing, privacy, or policy-related messages may be sent to hello@pixelnpanel.com.",
        ],
      },
      {
        heading: "Response Time",
        body: [
          "Pixel & Panel aims to respond to business inquiries as soon as reasonably possible during normal business days. Response times may vary based on workload, project schedule, holidays, production partner availability, or customer request type.",
        ],
      },
      {
        heading: "No Public Storefront",
        body: [
          "Pixel & Panel does not accept walk-in visits. Customers should contact Pixel & Panel by phone, email, or website form.",
        ],
      },
    ],
  },
};

export function getPolicyMetadata(policy) {
  return withDefaultSocialImage({
    title: {
      absolute: `${policy.title} | Pixel & Panel`,
    },
    description: policy.metadataDescription || policy.description,
    alternates: {
      canonical: policy.href,
    },
    openGraph: {
      title: `${policy.title} | Pixel & Panel`,
      description: policy.metadataDescription || policy.description,
      url: policy.href,
    },
  });
}
