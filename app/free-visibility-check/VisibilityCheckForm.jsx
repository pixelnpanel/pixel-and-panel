"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const HELP_OPTIONS = [
  "Website",
  "Google Business Profile / Local SEO",
  "Signs / Print Materials",
  "QR Code Campaign",
  "Not sure yet",
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

export default function VisibilityCheckForm() {
  const [form, setForm] = useState(initialForm);
  const [helpOptions, setHelpOptions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

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
      return "Please include your name and business name.";
    }

    if (!form.email.trim() && !form.phone.trim()) {
      return "Please include an email address or phone number.";
    }

    if (!helpOptions.length && !form.message.trim()) {
      return "Please choose at least one area or tell us what you are trying to improve.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

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
      sourcePage: typeof window !== "undefined" ? window.location.href : "/free-visibility-check",
    };

    try {
      const response = await fetch("/api/visibility-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please email us directly at hello@pixelnpanel.com.");
      }

      setStatus("success");
      setForm(initialForm);
      setHelpOptions([]);
      event.currentTarget.reset();
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please email us directly at hello@pixelnpanel.com.");
    }
  }

  return (
    <div
      id="visibility-check-form"
      className="scroll-mt-28 rounded-xl border border-slate-200 bg-white p-5 shadow-xl md:p-8"
    >
      {isSuccess ? (
        <div className="py-10 text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-[#F59E0B]/15 text-[#F59E0B]">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h2 className="text-[#1C1917]">Thank you — your request was sent.</h2>
          <p className="mx-auto mt-4 max-w-md text-slate-600">
            Pixel &amp; Panel will review it and contact you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-7">
            <p className="section-label mb-3 text-[#0369A1]">Start Here</p>
            <h2 className="text-[#1C1917]">Request Your Free Visibility Check</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Share the basics and Pixel &amp; Panel will review where customers find you,
              what they see, and how easy it is to take the next step.
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
              label="Name"
              name="name"
              value={form.name}
              onChange={updateField}
              required
              autoComplete="name"
            />
            <Field
              label="Business name"
              name="businessName"
              value={form.businessName}
              onChange={updateField}
              required
              autoComplete="organization"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              autoComplete="tel"
            />
            <Field
              label="Website URL optional"
              name="websiteUrl"
              type="url"
              value={form.websiteUrl}
              onChange={updateField}
              placeholder="https://example.com"
              autoComplete="url"
            />
            <Field
              label="Business city"
              name="businessCity"
              value={form.businessCity}
              onChange={updateField}
              autoComplete="address-level2"
            />
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917]">
              What do you need help with?
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {HELP_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-[#FAF8F4] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#F59E0B]"
                >
                  <input
                    type="checkbox"
                    name="helpOptions"
                    value={option}
                    checked={helpOptions.includes(option)}
                    onChange={() => toggleHelpOption(option)}
                    className="h-4 w-4 accent-[#F59E0B]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="mb-2 block font-heading text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917]"
            >
              Tell us what you are trying to improve.
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={updateField}
              className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-[#1C1917] outline-none transition focus:border-[#0369A1]"
              placeholder="Example: More calls from Google, clearer storefront signs, a better website, QR codes on menus or banners..."
            />
          </div>

          {error && (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-amber mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Sending..." : "Start My Free Visibility Check"}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="mt-4 text-center text-xs leading-6 text-slate-500">
            No ranking guarantees, no pressure. Just practical next steps for your business.
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
