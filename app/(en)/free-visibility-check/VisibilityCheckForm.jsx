"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackLead } from "@/lib/analytics";

const DEFAULT_HELP_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Google Business Profile / Local SEO", label: "Google Business Profile / Local SEO" },
  { value: "Signs / Print Materials", label: "Signs / Print Materials" },
  { value: "QR Code Campaign", label: "QR Code Campaign" },
  { value: "Not sure yet", label: "Not sure yet" },
];

const CAMPAIGN_HELP_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Google Business Profile", label: "Google Business Profile" },
  { value: "Local SEO", label: "Local SEO" },
  { value: "Business Cards / Flyers", label: "Business Cards / Flyers" },
  { value: "Yard Signs / Banners", label: "Yard Signs / Banners" },
  { value: "Vehicle Graphics", label: "Vehicle Graphics" },
  { value: "QR Code Campaigns", label: "QR Code Campaigns" },
  { value: "Not Sure Yet", label: "Not Sure Yet" },
];

const initialForm = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  businessCity: "",
  needHelpWith: "",
  message: "",
};

const trackingDefaults = {
  source: "direct",
  campaign: "local-launch",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
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
  contactRequirement: "Email or phone required.",
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
  successText: "Thanks! Your free visibility check request was sent. We'll review it and follow up soon.",
  validationName: "Please include your name and business name.",
  validationContact: "Please include an email address or phone number.",
  validationHelp: "Please choose at least one area or tell us what you are trying to improve.",
  error: "Something went wrong. Please email us directly at hello@pixelnpanel.com.",
  sourceFallback: "/free-visibility-check",
  helpOptions: DEFAULT_HELP_OPTIONS,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getFormValue(formData, name, fallback = "") {
  return cleanValue(formData.get(name)) || cleanValue(fallback);
}

function getTrackingFromUrl() {
  if (typeof window === "undefined") return trackingDefaults;

  const params = new URLSearchParams(window.location.search);

  return {
    source: cleanValue(params.get("source")) || trackingDefaults.source,
    campaign: cleanValue(params.get("campaign")) || trackingDefaults.campaign,
    utm_source: cleanValue(params.get("utm_source")),
    utm_medium: cleanValue(params.get("utm_medium")),
    utm_campaign: cleanValue(params.get("utm_campaign")),
  };
}

function getTrackingFromForm(formData) {
  const urlTracking = getTrackingFromUrl();

  return {
    source: cleanValue(formData.get("source")) || urlTracking.source,
    campaign: cleanValue(formData.get("campaign")) || urlTracking.campaign,
    utm_source: cleanValue(formData.get("utm_source")) || urlTracking.utm_source,
    utm_medium: cleanValue(formData.get("utm_medium")) || urlTracking.utm_medium,
    utm_campaign: cleanValue(formData.get("utm_campaign")) || urlTracking.utm_campaign,
  };
}

export default function VisibilityCheckForm({ copy = defaultCopy, campaignMode = false }) {
  const content = { ...defaultCopy, ...copy };
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [helpOptions, setHelpOptions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const campaignSuccessTitle = "Thanks — we received your request.";
  const campaignSuccessText =
    "Pixel & Panel will review your business visibility and follow up within 1 business day.";
  const defaultSuccessText = campaignMode ? campaignSuccessText : content.successText;
  const [successMessage, setSuccessMessage] = useState(defaultSuccessText);

  const isLoading = isSubmitting;
  const isSuccess = status === "success";
  const successTitle = campaignMode ? campaignSuccessTitle : content.successTitle;

  useEffect(() => {
    if (!campaignMode || !formRef.current) return;

    const tracking = getTrackingFromUrl();

    Object.entries(tracking).forEach(([name, value]) => {
      const field = formRef.current.elements.namedItem(name);
      if (field) field.value = value;
    });
  }, [campaignMode]);

  useEffect(() => {
    if (status !== "success" || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    containerRef.current.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [status]);

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

  function getSubmittedForm(formData) {
    return {
      ...form,
      name: getFormValue(formData, "name", form.name),
      businessName: getFormValue(formData, "businessName", form.businessName),
      email: getFormValue(formData, "email", form.email),
      phone: getFormValue(formData, "phone", form.phone),
      websiteUrl: getFormValue(formData, "websiteUrl", form.websiteUrl),
      businessCity: getFormValue(formData, "businessCity", form.businessCity),
      needHelpWith: getFormValue(formData, "needHelpWith", form.needHelpWith),
      message: getFormValue(formData, "message", form.message),
    };
  }

  function validate(values) {
    if (!values.name || !values.businessName) {
      return content.validationName;
    }

    if (campaignMode) {
      if (!values.email && !values.phone) {
        return content.validationContact;
      }

      if (values.email && !emailPattern.test(values.email)) {
        return "Please enter a valid email address.";
      }

      return "";
    }

    if (!values.email && !values.phone) {
      return content.validationContact;
    }

    if (!values.websiteUrl && !helpOptions.length && !values.message) {
      return content.validationHelp;
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");
    setStatus("idle");
    setSuccessMessage(content.successText);

    const formData = new FormData(event.currentTarget);
    const submittedForm = getSubmittedForm(formData);

    const validationError = validate(submittedForm);
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = campaignMode
      ? {
          name: submittedForm.name,
          businessName: submittedForm.businessName,
          phone: submittedForm.phone,
          email: submittedForm.email,
          needHelpWith: submittedForm.needHelpWith,
          message: submittedForm.message,
          ...getTrackingFromForm(formData),
          company: String(formData.get("company") || ""),
          language: content.language,
          sourcePage: typeof window !== "undefined" ? window.location.href : content.sourceFallback,
        }
      : {
          ...form,
          helpOptions,
          company: String(formData.get("company") || ""),
          language: content.language,
          sourcePage: typeof window !== "undefined" ? window.location.href : content.sourceFallback,
        };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/visibility-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || result.error || "Unable to send visibility check request right now.",
        );
      }

      setForm(initialForm);
      setHelpOptions([]);
      setError("");
      setSuccessMessage(
        !campaignMode && content.language === defaultCopy.language && result.message
          ? result.message
          : defaultSuccessText,
      );
      setStatus("success");
      trackLead("visibility", {
        label: helpOptions.join(", "),
        language: content.language,
      });
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message || content.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      id="visibility-check-form"
      ref={containerRef}
      className="scroll-mt-28 rounded-xl border border-slate-200 bg-white p-5 shadow-xl md:p-8"
    >
      {isSuccess ? (
        <div role="status" className="py-10 text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="text-[#1C1917]">{successTitle}</h2>
          <p className="mx-auto mt-4 max-w-md text-green-700">
            {successMessage}
          </p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
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
          {campaignMode &&
            Object.entries(trackingDefaults).map(([name, value]) => (
              <input key={name} type="hidden" name={name} defaultValue={value} />
            ))}

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
              label={content.phone}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              autoComplete="tel"
              placeholder="(409) 555-0000"
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
            {campaignMode && (
              <p className="md:col-span-2 text-xs font-medium text-slate-500">
                {content.contactRequirement}
              </p>
            )}
            {!campaignMode && (
              <>
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
              </>
            )}
          </div>

          {campaignMode ? (
            <div className="mt-6">
              <label
                htmlFor="needHelpWith"
                className="mb-2 block font-heading text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917]"
              >
                {content.helpLegend}
              </label>
              <select
                id="needHelpWith"
                name="needHelpWith"
                value={form.needHelpWith}
                onChange={updateField}
                className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-[#1C1917] outline-none transition focus:border-[#0369A1]"
              >
                <option value="">Choose one</option>
                {CAMPAIGN_HELP_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
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
          )}

          <div className="mt-6">
            <label
              htmlFor="message"
              className="mb-2 block font-heading text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917]"
            >
              {campaignMode ? "Message" : content.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={updateField}
              className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-[#1C1917] outline-none transition focus:border-[#0369A1]"
              placeholder={
                campaignMode
                  ? "Tell us what you want to improve or where customers usually find you now."
                  : content.messagePlaceholder
              }
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
