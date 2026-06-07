"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2, ArrowRight, ArrowLeft, Package, CheckCircle,
  Paperclip, X, Store, Globe, Search, Star, HelpCircle,
} from "lucide-react";
import QuoteVisual from "./QuoteVisual";

const ALLOWED_EXTENSIONS = ".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.ai,.eps";
const ALLOWED_EXTENSION_SET = new Set(ALLOWED_EXTENSIONS.split(","));
const ALLOWED_TYPES = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "image/svg+xml", "application/pdf", "application/postscript",
]);
const MAX_FILE_BYTES = 4 * 1024 * 1024;

function getFileExtension(fileName = "") {
  const extensionStart = fileName.lastIndexOf(".");
  return extensionStart >= 0 ? fileName.slice(extensionStart).toLowerCase() : "";
}

const SERVICE_TILES = [
  { label: "Signs & Print", category: "Signage & Print", icon: Store, desc: "Banners, vehicle wraps, yard signs, storefront" },
  { label: "Website Design", category: "Digital Services", icon: Globe, desc: "New site, redesign, or landing pages" },
  { label: "Local SEO", category: "Digital Services", icon: Search, desc: "Google rankings & local visibility" },
  { label: "Google Business Profile", category: "Digital Services", icon: Star, desc: "GBP setup, photos, reviews, listings" },
  { label: "Not sure yet", category: "General", icon: HelpCircle, desc: "Tell us what you're trying to solve" },
];

const TILE_ICONS = {
  store: Store,
  globe: Globe,
  search: Search,
  star: Star,
  help: HelpCircle,
};

const defaultCopy = {
  language: "English",
  eyebrow: "Free Quote",
  h1Start: "Tell Us About",
  h1Highlight: "Your Business.",
  mobileH1Start: "Tell Us What",
  mobileH1Highlight: "You Need.",
  mobileIntro: "Share a few details and we'll reply within 1 business day.",
  intro: "Fill in the form and we will get back to you within 1 business day with a custom quote — no pressure, no obligation.",
  bullets: [
    "Response within 1 business day",
    "No contracts or commitments",
    "Plain English — no jargon",
    "Free consultation included",
  ],
  productSelected: "Product Selected",
  packageSelected: "Package Selected",
  formTitle: "Get a Free Quote",
  pickerHelp: "What can we help you with?",
  contactNote: "Takes less than 2 minutes.",
  packageContactRequirement: "Only your name and phone number are required. Add more details if you want.",
  detailsNote: "Almost there — tell us about your project.",
  stepCounterPrefix: "Step",
  stepCounterMiddle: "of",
  stepLabels: ["What do you need?", "Contact Info", "Project Details"],
  shortStepLabels: ["Contact Info", "Project Details"],
  serviceLabel: "Service:",
  change: "Change",
  continue: "Continue",
  back: "Back",
  backToContactAria: "Back to contact info",
  name: "Your Name",
  businessName: "Business Name",
  email: "Email Address",
  phone: "Phone Number",
  namePlaceholder: "John Martinez",
  businessNamePlaceholder: "Your business",
  emailPlaceholder: "john@email.com",
  phonePlaceholder: "(555) 000-0000",
  contactRequirement: "Email or phone required.",
  productService: "Product / Service",
  message: "What Do You Need?",
  messagePlaceholder: "Tell us size, quantity, deadline, material, location, or anything you already know.",
  attachLabel: "Attach a File",
  attachOptional: "(optional)",
  attachPrompt: "Logo, mockup, or reference image",
  attachTypes: "JPG, PNG, PDF · 4 MB",
  removeAttachmentAria: "Remove attachment",
  fileSizeError: "File must be 4 MB or smaller.",
  fileTypeError: "Only JPG, PNG, PDF, GIF, WebP, SVG, and AI/EPS files are allowed.",
  submit: "Send My Request",
  sending: "Sending...",
  trackOrderPrompt: "Already have an order or already submitted a quote?",
  trackOrderHelp: "Use your order number with the same email or phone to see status, proof notes, and next steps.",
  trackOrder: "Track my order",
  trackOrderHref: "/track-order",
  footer: "We respond within 1 business day. No spam, ever.",
  agreementPrefix: "By submitting this form, you agree to our",
  termsLabel: "Terms & Conditions",
  termsHref: "/terms-and-conditions",
  agreementConnector: "and",
  privacyLabel: "Privacy Policy",
  privacyHref: "/privacy-policy",
  agreementSuffix: ".",
  successTitle: "Request Sent",
  successText: "We received your quote request and will reply within 1 business day.",
  errorFallback: "Unable to send quote request right now.",
  failed: "Quote request failed",
  defaultMessageTemplate: "I would like a quote for {product}.",
  serviceTiles: SERVICE_TILES,
  showBusinessName: false,
  showProductField: false,
};

// Step logic:
//   showPicker (English, no preselected product): 3 steps — 0=service picker, 1=contact, 2=details
//   otherwise (preselected product/package or product field mode): 2 steps — 1=contact, 2=details
export default function QuoteRequestClient({
  selectedProduct = "",
  selectedPackage = "",
  selectedCategory = "",
  copy = {},
}) {
  const searchParams = useSearchParams();
  const queryProduct = searchParams.get("product") || "";
  const queryPackage = searchParams.get("package") || "";
  const queryCategory = searchParams.get("category") || "";
  const requestedProduct = selectedProduct || queryProduct;
  const requestedPackage = requestedProduct ? "" : (selectedPackage || queryPackage);
  const requestedCategory = selectedCategory || queryCategory;
  const content = { ...defaultCopy, ...copy };
  const selectedItem = requestedProduct
    ? {
        type: "product",
        heading: content.productSelected,
        name: requestedProduct,
        category: requestedCategory,
      }
    : requestedPackage
      ? {
          type: "package",
          heading: content.packageSelected,
          name: requestedPackage,
          category: requestedCategory,
        }
      : null;

  const hasPreselected = Boolean(selectedItem);
  const hasPackageRequest = selectedItem?.type === "package";
  const showPicker = !hasPreselected && !content.showProductField;
  const showBusinessName = content.showBusinessName || hasPackageRequest;
  const initialStep = showPicker ? 0 : 1;
  const totalSteps = showPicker ? 3 : 2;

  const [step, setStep] = useState(initialStep);
  const [pickedService, setPickedService] = useState(
    hasPreselected ? { label: selectedItem.name, category: selectedItem.category } : null
  );

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productField, setProductField] = useState(
    hasPreselected
      ? (selectedItem.category ? `${selectedItem.category} — ${selectedItem.name}` : selectedItem.name)
      : ""
  );
  const [message, setMessage] = useState(
    hasPreselected && selectedItem.type === "product"
      ? content.defaultMessageTemplate.replace("{product}", selectedItem.name)
      : ""
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateScreenState = () => setIsLargeScreen(mediaQuery.matches);

    updateScreenState();
    mediaQuery.addEventListener("change", updateScreenState);

    return () => mediaQuery.removeEventListener("change", updateScreenState);
  }, []);

  const effectiveProduct = hasPreselected ? selectedItem.name : (pickedService?.label || productField || "");
  const effectiveCategory = hasPreselected ? selectedItem.category : (pickedService?.category || "");
  const hiddenProductValue = effectiveProduct
    ? (effectiveCategory ? `${effectiveCategory} — ${effectiveProduct}` : effectiveProduct)
    : "General Quote";
  const hasContact = hasPackageRequest ? Boolean(phone.trim()) : Boolean(email.trim() || phone.trim());

  const displayStep = step - initialStep + 1;
  const stepLabel = showPicker
    ? content.stepLabels[step]
    : content.shortStepLabels[step - 1];

  function handleServicePick(tile) {
    setPickedService(tile);
    if (!message) {
      setMessage(content.defaultMessageTemplate.replace("{product}", tile.label));
    }
    setStep(1);
  }

  function handleFileChange(e) {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) { setAttachment(null); return; }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(content.fileSizeError);
      e.target.value = "";
      setAttachment(null);
      return;
    }
    const hasAllowedMime = file.type ? ALLOWED_TYPES.has(file.type) : false;
    const hasAllowedExtension = ALLOWED_EXTENSION_SET.has(getFileExtension(file.name));

    if (!hasAllowedMime && !hasAllowedExtension) {
      setFileError(content.fileTypeError);
      e.target.value = "";
      setAttachment(null);
      return;
    }
    setAttachment(file);
  }

  function removeAttachment() {
    setAttachment(null);
    setFileError("");
    const input = document.getElementById("quote-attachment");
    if (input) input.value = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.set("name", name);
    if (showBusinessName && businessName) formData.set("businessName", businessName);
    formData.set("email", email);
    if (phone) formData.set("phone", phone);
    formData.set("message", message);
    formData.set("productService", hiddenProductValue);
    if (selectedItem?.category) formData.set("selectedCategory", selectedItem.category);
    if (selectedItem?.type === "product") formData.set("selectedProduct", selectedItem.name);
    if (selectedItem?.type === "package") formData.set("selectedPackage", selectedItem.name);
    formData.set("language", content.language);
    formData.set("sourcePage", typeof window !== "undefined" ? window.location.href : "Quote Request Page");
    formData.set("company", ""); // honeypot — empty for real users
    if (attachment) formData.set("attachment", attachment);

    try {
      const response = await fetch("/api/quote", { method: "POST", body: formData });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || content.failed);
      }
      setSubmitted(true);
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "quote_request_submitted", {
          event_category: "Lead",
          event_label: hiddenProductValue,
          value: 1,
        });
      }
    } catch (err) {
      setError(err.message || content.errorFallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0369A1] bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.65),transparent_32%),linear-gradient(135deg,#06213f_0%,#0369A1_48%,#0EA5E9_100%)] text-white">
      <section className="pnp-mobile-quote-hero relative overflow-hidden px-6 py-24 sm:py-28 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="pnp-mobile-form-grid relative mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-2">

          {/* ── LEFT ──────────────────────────────────────────── */}
          <div className="pnp-mobile-form-intro mobile-reveal lg:sticky lg:top-24">
            <p className="mb-5 section-label">
              {content.eyebrow}
            </p>
            <h1 className="pnp-mobile-form-title max-w-[342px] break-words md:hidden" style={{ color: "white" }}>
              {content.mobileH1Start || content.h1Start}
              <br />
              <span style={{ color: "#F59E0B" }}>{content.mobileH1Highlight || content.h1Highlight}</span>
            </h1>
            <h1 className="hidden max-w-[342px] break-words text-[1.85rem] leading-tight md:block md:max-w-xl md:text-[clamp(2rem,4vw,3rem)]" style={{ color: "white" }}>
              {content.h1Start}{" "}
              <span style={{ color: "#F59E0B" }}>{content.h1Highlight}</span>
            </h1>
            <p className="pnp-mobile-form-copy mt-5 max-w-[342px] break-words text-base leading-8 text-slate-200 md:hidden">
              {content.mobileIntro || content.intro}
            </p>
            <p className="mt-8 hidden max-w-[342px] break-words text-base leading-8 text-slate-200 md:block md:max-w-lg md:text-lg">
              {content.intro}
            </p>
            <div className="mt-10 hidden gap-4 text-sm text-slate-200 md:grid">
              {content.bullets.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 hidden lg:block">
              {isLargeScreen && <QuoteVisual />}
            </div>
          </div>

          {/* ── RIGHT (card) ──────────────────────────────────── */}
          <div
            className="mobile-reveal min-w-0 w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] overflow-hidden rounded-[2rem] bg-white p-8 text-[#1C1917] shadow-2xl sm:p-10 lg:w-auto lg:max-w-none"
            style={{ "--reveal-delay": "90ms" }}
          >
            {/* Pre-selected product/package banner */}
            {selectedItem && (
              <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B] text-[#1C1917]">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1C1917]">{selectedItem.heading}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedItem.category ? `${selectedItem.category} — ${selectedItem.name}` : selectedItem.name}
                  </p>
                </div>
              </div>
            )}

            {/* Progress bar */}
            {!submitted && (
              <div className="mb-7">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {content.stepCounterPrefix} {displayStep} {content.stepCounterMiddle} {totalSteps}
                  </p>
                  <p className="text-xs font-semibold text-[#0369A1]">{stepLabel}</p>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        i < displayStep ? "bg-[#F59E0B]" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── SUCCESS ─────────────────────────────────────── */}
            {submitted ? (
              <div
                role="status"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
              >
                <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-4" style={{ color: "#1C1917" }}>{content.successTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{content.successText}</p>
                <Link
                  href={content.trackOrderHref}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0369A1] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#0284C7]"
                >
                  {content.trackOrder} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>

                {/* ── STEP 0 — Service picker ──────────────────── */}
                {step === 0 && (
                  <div
                    key="step-0"
                  >
                    <h2 style={{ color: "#1C1917" }} className="mb-1">{content.formTitle}</h2>
                    <p className="mb-7 text-sm text-slate-400">{content.pickerHelp}</p>
                    <div className="grid gap-3">
                      {content.serviceTiles.map((tile) => {
                        const Icon = (typeof tile.icon === "string" ? TILE_ICONS[tile.icon] : tile.icon) || HelpCircle;
                        return (
                          <button
                            key={tile.label}
                            type="button"
                            onClick={() => handleServicePick(tile)}
                            className="flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-[#0369A1] hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-[#0369A1]/25 active:scale-[0.99]"
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0369A1]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-[#1C1917]">{tile.label}</p>
                              <p className="mt-0.5 text-xs text-slate-500">{tile.desc}</p>
                            </div>
                            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300" />
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-5 rounded-2xl border border-[#0369A1]/15 bg-[#0369A1]/5 p-4">
                      <p className="font-heading text-sm font-bold text-[#1C1917]">{content.trackOrderPrompt}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{content.trackOrderHelp}</p>
                      <Link
                        href={content.trackOrderHref}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-[#0369A1]/25 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#0369A1] transition hover:border-[#0369A1] hover:bg-white"
                      >
                        {content.trackOrder} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="mt-6 text-center text-xs text-slate-400">{content.footer}</p>
                  </div>
                )}

                {/* ── STEP 1 — Contact info ────────────────────── */}
                {step === 1 && (
                  <div
                    key="step-1"
                  >
                    <h2 style={{ color: "#1C1917" }} className="mb-1">{content.formTitle}</h2>
                    <p className="mb-6 text-sm text-slate-400">{content.contactNote}</p>

                    {/* Picked service chip — shown only in picker flow */}
                    {showPicker && pickedService && (
                      <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{content.serviceLabel}</span>
                        <span className="text-sm font-semibold text-[#1C1917]">{pickedService.label}</span>
                        <button
                          type="button"
                          onClick={() => setStep(0)}
                          className="ml-auto text-xs font-medium text-[#0369A1] hover:underline"
                        >
                          {content.change}
                        </button>
                      </div>
                    )}

                    <div className="space-y-5">
                      <div>
                        <label htmlFor="q-name" className="mb-2 block text-xs font-bold uppercase tracking-wide">
                          {content.name} *
                        </label>
                        <input
                          id="q-name" type="text" autoComplete="name"
                          value={name} onChange={(e) => setName(e.target.value)}
                          placeholder={content.namePlaceholder}
                          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                        />
                      </div>
                      {showBusinessName && (
                        <div>
                          <label htmlFor="q-business" className="mb-2 block text-xs font-bold uppercase tracking-wide">
                            {content.businessName}
                          </label>
                          <input
                            id="q-business" type="text" autoComplete="organization"
                            value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                            placeholder={content.businessNamePlaceholder}
                            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                          />
                        </div>
                      )}
                      <div>
                        <label htmlFor="q-email" className="mb-2 block text-xs font-bold uppercase tracking-wide">
                          {content.email}
                        </label>
                        <input
                          id="q-email" type="email" autoComplete="email"
                          aria-describedby="quote-contact-requirement"
                          value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder={content.emailPlaceholder}
                          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                        />
                      </div>
                      <div>
                        <label htmlFor="q-phone" className="mb-2 block text-xs font-bold uppercase tracking-wide">
                          {content.phone}{hasPackageRequest ? " *" : ""}
                        </label>
                        <input
                          id="q-phone" type="tel" autoComplete="tel"
                          aria-describedby="quote-contact-requirement"
                          value={phone} onChange={(e) => setPhone(e.target.value)}
                          placeholder={content.phonePlaceholder}
                          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                        />
                      </div>
                      <p id="quote-contact-requirement" className="text-xs font-medium text-slate-500">
                        {hasPackageRequest ? content.packageContactRequirement : content.contactRequirement}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={!name.trim() || !hasContact}
                      onClick={() => setStep(2)}
                      className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#0369A1] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-[#0284C7] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {content.continue} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </button>
                    <p className="mt-4 text-center text-xs text-slate-400">{content.footer}</p>
                  </div>
                )}

                {/* ── STEP 2 — Project details ─────────────────── */}
                {step === 2 && (
                  <form
                    key="step-2"
                    onSubmit={handleSubmit}
                  >
                    <h2 style={{ color: "#1C1917" }} className="mb-1">{content.formTitle}</h2>
                    <p className="mb-6 text-sm text-slate-400">{content.detailsNote}</p>

                    <div className="space-y-5">
                      {/* Product field — visible only when showProductField=true */}
                      {content.showProductField && (
                        <div>
                          <label htmlFor="q-product" className="mb-2 block text-xs font-bold uppercase tracking-wide">
                            {content.productService}
                          </label>
                          <input
                            id="q-product" type="text"
                            value={productField} onChange={(e) => setProductField(e.target.value)}
                            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="quote-message" className="mb-2 block text-xs font-bold uppercase tracking-wide">
                          {content.message}{hasPackageRequest ? "" : " *"}
                        </label>
                        <textarea
                          id="quote-message" required={!hasPackageRequest} rows={5}
                          value={message} onChange={(e) => setMessage(e.target.value)}
                          placeholder={content.messagePlaceholder}
                          className="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]"
                        />
                      </div>

                      {/* File attachment */}
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
                          {content.attachLabel}{" "}
                          <span className="font-normal normal-case tracking-normal text-slate-400">{content.attachOptional}</span>
                        </label>
                        {attachment ? (
                          <div className="flex items-center gap-3 rounded-xl border-2 border-[#0369A1]/30 bg-[#0369A1]/5 px-4 py-3">
                            <Paperclip className="h-4 w-4 shrink-0 text-[#0369A1]" />
                            <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{attachment.name}</span>
                            <button
                              type="button" onClick={removeAttachment}
                              className="shrink-0 rounded-full p-0.5 text-slate-400 transition hover:text-red-500"
                              aria-label={content.removeAttachmentAria}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="quote-attachment"
                            className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 px-4 py-3 transition hover:border-[#0369A1]/50 hover:bg-slate-50"
                          >
                            <Paperclip className="h-4 w-4 shrink-0 text-slate-400" />
                            <span className="text-sm text-slate-500">{content.attachPrompt}</span>
                            <span className="ml-auto shrink-0 text-xs text-slate-400">{content.attachTypes}</span>
                          </label>
                        )}
                        <input
                          id="quote-attachment" type="file"
                          accept={ALLOWED_EXTENSIONS} onChange={handleFileChange}
                          className="sr-only"
                        />
                        {fileError && <p className="mt-1 text-xs text-red-600">{fileError}</p>}
                      </div>
                    </div>

                    {error && (
                      <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                      </p>
                    )}

                    <div className="mt-7 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex shrink-0 items-center gap-2 rounded-xl border-2 border-slate-200 px-5 py-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                        aria-label={content.backToContactAria}
                      >
                        <ArrowLeft className="h-4 w-4" /> {content.back}
                      </button>
                      <button
                        type="submit"
                        disabled={loading || (!hasPackageRequest && !message.trim())}
                        className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#F59E0B] px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#1C1917] transition hover:-translate-y-0.5 hover:bg-[#FBBF24] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {loading ? content.sending : content.submit}
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                      </button>
                    </div>
                    <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                      {content.agreementPrefix}{" "}
                      <Link href={content.termsHref} className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">
                        {content.termsLabel}
                      </Link>{" "}
                      {content.agreementConnector}{" "}
                      <Link href={content.privacyHref} className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">
                        {content.privacyLabel}
                      </Link>
                      {content.agreementSuffix}
                    </p>
                    <p className="mt-4 text-center text-xs text-slate-400">{content.footer}</p>
                  </form>
                )}

              </>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
