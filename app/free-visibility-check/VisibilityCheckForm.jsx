"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const DEFAULT_HELP_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Google Business Profile / Local SEO", label: "Google Business Profile / Local SEO" },
  { value: "Signs / Print Materials", label: "Signs / Print Materials" },
  { value: "QR Code Campaign", label: "QR Code Campaign" },
  { value: "Not sure yet", label: "Not sure yet" },
];

const initialForm = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  businessCity: "",
  message: "",
};

const defaultCopy = {
  language: "English",
  sectionLabel: "Start Here",
  title: "Request Your Free Visibility Check",
  intro:
    "Share the basics and Pixel & Panel will review where customers find you, what they see, and how easy it is to take the next step.",
  name: "Name",
  businessName: "Business name",
  email: "Email",
  phone: "Phone",
  websiteUrl: "Website URL optional",
  businessCity: "Business city",
  helpLegend: "What do you need help with?",
  messageLabel: "Tell us what you are trying to improve.",
  messagePlaceholder:
    "Example: More calls from Google, clearer storefront signs, a better website, QR codes on menus or banners...",
  submit: "Start My Free Visibility Check",
  sending: "Sending...",
  footer: "No ranking guarantees, no pressure. Just practical next steps for your business.",
  successTitle: "Thank you — your request was sent.",
  successText: "Pixel & Panel will review it and contact you soon.",
  validationName: "Please include your name and business name.",
  validationContact: "Please include an email address or phone number.",
  validationHelp: "Please choose at least one area or tell us what you are trying to improve.",
  error: "Something went wrong. Please email us directly at hello@pixelnpanel.com.",
  sourceFallback: "/free-visibility-check",
  helpOptions: DEFAULT_HELP_OPTIONS,
};

export default function VisibilityCheckForm({ copy = defaultCopy }) {
  const content = { ...defaultCopy, ...copy };
  const [form, setForm] = useState(initialForm);
  const [helpOptions, setHelpOptions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(content.successText);

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleHelpOption(option) {
    setHelpOptions((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  function validate() {
    if (!form.name.trim() || !form.businessName.trim()) {
      return content.validationName;
    }

    if (!form.email.trim() && !form.phone.trim()) {
      return content.validationContact;
    }

    if (!form.websiteUrl.trim() && !helpOptions.length && !form.message.trim()) {
      return content.validationHelp;
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage(content.successText);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("loading");
    const formData = new FormData(event.currentTarget);

    const payload = {
      ...form,
      helpOptions,
      company: String(formData.get("company") || ""),
      language: content.language,
      sourcePage: typeof window !== "undefined" ? window.location.href : content.sourceFallback,
    };

    try {
      const response = await fetch("/api/visibility-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || result.error || "Unable to send visibility check request right now.");
      }

      setError("");
      setSuccessMessage(
        content.language === defaultCopy.language && result.message
          ? result.message
          : content.successText,
      );
      setStatus("success");
      setForm(initialForm);
      setHelpOptions([]);
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message || content.error);
    }
  }

  return (
    <div
      id="visibility-check-form"
      className="scroll-mt-28 rounded-xl border border-slate-200 bg-white p-5 shadow-xl md:p-8"
    >
      {isSuccess ? (
        <div role="status" className="py-10 text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="text-[#1C1917]">{content.successTitle}</h2>
          <p className="mx-auto mt-4 max-w-md text-green-700">
            {successMessage}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-7">
            <p className="section-label mb-3 text-[#0369A1]">{content.sectionLabel}</p>
            <h2 className="text-[#1C1917]">{content.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {content.intro}
            </p>
          </div>

          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-px w-px opacity-0"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label={content.name}
              name="name"
              value={form.name}
              onChange={updateField}
              required
              autoComplete="name"
              placeholder="John Martinez"
            />
            <Field
              label={content.businessName}
              name="businessName"
              value={form.businessName}
              onChange={updateField}
              required
              autoComplete="organization"
              placeholder="Martinez Trucking LLC"
            />
            <Field
              label={content.email}
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
              placeholder="john@email.com"
            />
            <Field
              label={content.phone}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              autoComplete="tel"
              placeholder="(409) 555-0000"
            />
            <Field
              label={content.websiteUrl}
              name="websiteUrl"
              type="url"
              value={form.websiteUrl}
              onChange={updateField}
              placeholder="www.website.com"
              autoComplete="url"
            />
            <Field
              label={content.businessCity}
              name="businessCity"
              value={form.businessCity}
              onChange={updateField}
              autoComplete="address-level2"
              placeholder="Beaumont"
            />
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917]">
              {content.helpLegend}
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.helpOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-[#FAF8F4] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#F59E0B]"
                >
                  <input
                    type="checkbox"
                    name="helpOptions"
                    value={option.value}
                    checked={helpOptions.includes(option.value)}
                    onChange={() => toggleHelpOption(option.value)}
                    className="h-4 w-4 accent-[#F59E0B]"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="mb-2 block font-heading text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917]"
            >
              {content.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={updateField}
              className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-[#1C1917] outline-none transition focus:border-[#0369A1]"
              placeholder={content.messagePlaceholder}
            />
          </div>

          {error && (
            <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-amber mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? content.sending : content.submit}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-slate-500">
            {content.footer}
          </p>
        </form>
      )}
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required = false, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-heading text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917]"
      >
        {label}
        {required && <span className="text-[#F59E0B]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-[#1C1917] outline-none transition focus:border-[#0369A1]"
        {...props}
      />
    </div>
  );
}
