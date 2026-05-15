"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Package, CheckCircle, Paperclip, X } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, slideRight, stagger } from "@/lib/animations";
import QuoteVisual from "./QuoteVisual";

const ALLOWED_EXTENSIONS = ".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.ai,.eps";
const ALLOWED_EXTENSION_SET = new Set(ALLOWED_EXTENSIONS.split(","));
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/postscript",
]);
const MAX_FILE_BYTES = 4 * 1024 * 1024;

function getFileExtension(filename) {
    const index = filename.lastIndexOf(".");
    return index >= 0 ? filename.slice(index).toLowerCase() : "";
}

function isAllowedFile(file) {
    return ALLOWED_TYPES.has(file.type) || ALLOWED_EXTENSION_SET.has(getFileExtension(file.name));
}

const defaultCopy = {
    language: "English",
    eyebrow: "Free Quote",
    h1Start: "Tell Us About",
    h1Highlight: "Your Business.",
    intro: "Fill in the form and we will get back to you within 1 business day with a custom quote — no pressure, no obligation.",
    bullets: [
        "Response within 1 business day",
        "No contracts or commitments",
        "Plain English — no jargon",
        "Free consultation included",
    ],
    formTitle: "Get a Free Quote",
    formNote: "Takes less than 2 minutes to fill out.",
    productSelected: "Product Selected",
    name: "Your Name",
    businessName: "Business Name",
    email: "Email Address",
    phone: "Phone Number",
    productService: "Product Selected",
    message: "What Do You Need?",
    messagePlaceholder: "Tell us size, quantity, deadline, material, location, or anything you already know.",
    submit: "Send My Request",
    sending: "Sending...",
    footer: "We respond within 1 business day. No spam, ever.",
    successTitle: "Request Sent",
    successText: "We received your quote request and will reply within 1 business day.",
    errorFallback: "Unable to send quote request right now.",
    failed: "Quote request failed",
    defaultMessageTemplate: "I would like a quote for {product}.",
    showBusinessName: false,
    showProductField: false,
};

export default function QuoteRequestClient({ selectedProduct = "", selectedCategory = "", copy = defaultCopy }) {
    const content = { ...defaultCopy, ...copy };
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [fileError, setFileError] = useState("");
    const hasSelectedProduct = Boolean(selectedProduct);

    const hiddenProductValue = hasSelectedProduct
        ? selectedCategory ? `${selectedCategory} — ${selectedProduct}` : selectedProduct
        : "General Quote";

    const defaultMessage = hasSelectedProduct
        ? content.defaultMessageTemplate.replace("{product}", selectedProduct)
        : "";

    function handleFileChange(e) {
        setFileError("");
        const file = e.target.files?.[0];
        if (!file) { setAttachment(null); return; }
        if (file.size > MAX_FILE_BYTES) {
            setFileError("File must be 4 MB or smaller.");
            e.target.value = "";
            setAttachment(null);
            return;
        }
        if (!isAllowedFile(file)) {
            setFileError("Only JPG, PNG, PDF, GIF, WebP, SVG, and AI/EPS files are allowed.");
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get("email") || "");
        const phone = String(formData.get("phone") || "");

        if (!email.trim() && !phone.trim()) {
            setError(content.language === "Spanish" ? "Por favor incluye correo electrónico o teléfono." : "Please include an email address or phone number.");
            setLoading(false);
            return;
        }

        if (attachment) {
            formData.set("attachment", attachment);
        }
        formData.set("language", content.language);
        formData.set("sourcePage", typeof window !== "undefined" ? window.location.href : "Quote Request Page");

        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                body: formData,
            });

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
        } catch (submitError) {
            setError(submitError.message || content.errorFallback);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0369A1] bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.65),transparent_32%),linear-gradient(135deg,#06213f_0%,#0369A1_48%,#0EA5E9_100%)] text-white">
            <section className="relative overflow-hidden px-6 py-24 sm:py-28 lg:px-8">
                <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
                </div>

                <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">

                    {/* Left — staggered fade up */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p variants={fadeUp} className="mb-5 section-label">
                            {content.eyebrow}
                        </motion.p>

                        <motion.h1 variants={fadeUp} className="max-w-xl" style={{ color: 'white' }}>
                            {content.h1Start}{" "}
                            <span style={{ color: '#F59E0B' }}>{content.h1Highlight}</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="mt-8 max-w-lg text-lg leading-8 text-slate-200">
                            {content.intro}
                        </motion.p>

                        <motion.div variants={stagger} className="mt-10 grid gap-4 text-sm text-slate-200">
                            {content.bullets.map((item) => (
                                <motion.div key={item} variants={fadeUp} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div variants={fadeUp} className="mt-10">
                            <QuoteVisual />
                        </motion.div>
                    </motion.div>

                    {/* Right — slides in from right */}
                    <motion.div
                        variants={slideRight}
                        initial="hidden"
                        animate="visible"
                        className="rounded-[2rem] bg-white p-8 text-[#1C1917] shadow-2xl sm:p-10"
                    >
                        <h2 style={{ color: '#1C1917', marginBottom: '0.25rem' }}>
                            {content.formTitle}
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">{content.formNote}</p>

                        {hasSelectedProduct && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="mt-6 flex items-center gap-4 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 p-4"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B] text-[#1C1917]">
                                    <Package className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#1C1917]">{content.productSelected}</p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {selectedCategory ? `${selectedCategory} — ${selectedProduct}` : selectedProduct}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {submitted ? (
                            <motion.div
                                role="status"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"
                            >
                                <CheckCircle className="mx-auto h-10 w-10 text-emerald-500" />
                                <h3 className="mt-4" style={{ color: "#1C1917" }}>{content.successTitle}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {content.successText}
                                </p>
                            </motion.div>
                        ) : (
                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            {!content.showProductField && (
                                <input type="hidden" name="productService" value={hiddenProductValue} />
                            )}
                            <input
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
                            />

                            <div>
                                <label htmlFor="quote-name" className="mb-2 block text-xs font-bold uppercase tracking-wide">{content.name} *</label>
                                <input id="quote-name" type="text" name="name" required placeholder="John Martinez" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]" />
                            </div>
                            {content.showBusinessName && (
                                <div>
                                    <label htmlFor="quote-business-name" className="mb-2 block text-xs font-bold uppercase tracking-wide">{content.businessName}</label>
                                    <input id="quote-business-name" type="text" name="businessName" placeholder="Nombre de tu negocio" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]" />
                                </div>
                            )}
                            <div>
                                <label htmlFor="quote-email" className="mb-2 block text-xs font-bold uppercase tracking-wide">{content.email}</label>
                                <input id="quote-email" type="email" name="email" placeholder="john@email.com" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]" />
                            </div>
                            <div>
                                <label htmlFor="quote-phone" className="mb-2 block text-xs font-bold uppercase tracking-wide">{content.phone}</label>
                                <input id="quote-phone" type="tel" name="phone" placeholder="(555) 000-0000" className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]" />
                            </div>
                            {content.showProductField && (
                                <div>
                                    <label htmlFor="quote-product-service" className="mb-2 block text-xs font-bold uppercase tracking-wide">{content.productService}</label>
                                    <input id="quote-product-service" type="text" name="productService" defaultValue={hiddenProductValue} className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]" />
                                </div>
                            )}
                            <div>
                                <label htmlFor="quote-message" className="mb-2 block text-xs font-bold uppercase tracking-wide">{content.message} *</label>
                                <textarea id="quote-message" name="message" required defaultValue={defaultMessage} placeholder={content.messagePlaceholder} rows={5} className="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#0369A1]" />
                            </div>

                            {/* File attachment */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
                                    Attach a File <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span>
                                </label>
                                {attachment ? (
                                    <div className="flex items-center gap-3 rounded-xl border-2 border-[#0369A1]/30 bg-[#0369A1]/5 px-4 py-3">
                                        <Paperclip className="h-4 w-4 shrink-0 text-[#0369A1]" />
                                        <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{attachment.name}</span>
                                        <button
                                            type="button"
                                            onClick={removeAttachment}
                                            className="shrink-0 rounded-full p-0.5 text-slate-400 transition hover:text-red-500"
                                            aria-label="Remove attachment"
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
                                        <span className="text-sm text-slate-500">
                                            Logo, mockup, or reference image
                                        </span>
                                        <span className="ml-auto shrink-0 text-xs text-slate-400">JPG, PNG, PDF, SVG, AI, EPS · 4 MB max</span>
                                    </label>
                                )}
                                <input
                                    id="quote-attachment"
                                    type="file"
                                    name="attachment"
                                    accept={ALLOWED_EXTENSIONS}
                                    onChange={handleFileChange}
                                    className="sr-only"
                                />
                                {fileError && (
                                    <p className="mt-1 text-xs text-red-600">{fileError}</p>
                                )}
                            </div>

                            {error && (
                                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {error}
                                </p>
                            )}

                            <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#F59E0B] px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#1C1917] transition hover:-translate-y-0.5 hover:bg-[#FBBF24] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70">
                                {loading ? content.sending : content.submit}
                                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                            </button>
                            <p className="text-center text-xs text-slate-400">{content.footer}</p>
                        </form>
                        )}
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
