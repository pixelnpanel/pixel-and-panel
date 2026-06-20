"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertCircle,
  Search,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";

const inputStyle = {
  width: "100%",
  padding: "0.875rem 1rem",
  border: "2px solid #e2e8f0",
  borderRadius: "0.75rem",
  color: "#1C1917",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-heading)",
  fontWeight: 700,
  fontSize: "0.78rem",
  color: "#1C1917",
  marginBottom: "0.5rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const defaultCopy = {
  eyebrow: "Order Tracking",
  headline: "Check your project status.",
  intro:
    "Use your order number and contact email or phone to see where your sign, print, website, or marketing project stands.",
  quoteCta: "Start a quote",
  quoteHref: "/quote-request",
  noOrderTitle: "Don’t have an order yet?",
  noOrderText:
    "Start with a quote request and we’ll help you choose the right next step for your sign, print, website, or marketing project.",
  formTitle: "Track an order",
  formIntro:
    "Enter the order number from your quote, invoice, or project update. Use the same email or phone you gave Pixel & Panel.",
  orderNumberLabel: "Order number",
  orderNumberPlaceholder: "PNP-1007",
  contactLabel: "Email or phone",
  contactPlaceholder: "you@email.com",
  submit: "Check status",
  checking: "Checking...",
  lookupError: "Unable to check order status.",
  lookupNotFound:
    "We couldn’t find an order with those details. Please check your order number and contact information, or contact Pixel & Panel for help.",
  requestQuote: "Request quote",
};

export default function TrackOrderClient() {
  return <TrackOrderExperience copy={defaultCopy} />;
}

export function TrackOrderExperience({ copy }) {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, contact }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || copy.lookupError);
      }

      const trackingUrl = typeof data.trackingUrl === "string" ? data.trackingUrl : "";
      if (!trackingUrl.startsWith("/track/")) {
        throw new Error(copy.lookupError);
      }

      router.replace(trackingUrl);
    } catch (lookupError) {
      setError(lookupError.message || copy.lookupNotFound || copy.lookupError);
      setLoading(false);
    }
  }

  return (
    <>
      <section
        style={{
          minHeight: "calc(100vh - 72px)",
          background:
            "linear-gradient(135deg, #0C1E3C 0%, #0369A1 62%, #0EA5E9 100%)",
          display: "flex",
          alignItems: "center",
          padding: "6rem 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "36px 36px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: "1180px",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="section-label">
              {copy.eyebrow}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              style={{ color: "white", marginBottom: "1.25rem" }}
            >
              {copy.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "1.05rem",
                maxWidth: "520px",
                marginBottom: "1.75rem",
              }}
            >
              {copy.intro}
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div
              className="white-card"
              style={{
                padding: "2rem",
                boxShadow: "0 24px 70px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "0.875rem",
                  background: "rgba(245,158,11,0.12)",
                  color: "#F59E0B",
                  marginBottom: "1rem",
                }}
              >
                <Search size={22} />
              </div>

              <h2 style={{ color: "#1C1917", marginBottom: "0.5rem" }}>
                {copy.formTitle}
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.95rem",
                  marginBottom: "1.5rem",
                }}
              >
                {copy.formIntro}
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="order-number" style={labelStyle}>
                    {copy.orderNumberLabel}
                  </label>
                  <input
                    id="order-number"
                    value={orderNumber}
                    onChange={(event) => setOrderNumber(event.target.value)}
                    name="orderNumber"
                    placeholder={copy.orderNumberPlaceholder}
                    required
                    style={inputStyle}
                    onFocus={(event) => (event.target.style.borderColor = "#0369A1")}
                    onBlur={(event) => (event.target.style.borderColor = "#e2e8f0")}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="order-contact" style={labelStyle}>
                    {copy.contactLabel}
                  </label>
                  <input
                    id="order-contact"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    name="contact"
                    placeholder={copy.contactPlaceholder}
                    required
                    style={inputStyle}
                    onFocus={(event) => (event.target.style.borderColor = "#0369A1")}
                    onBlur={(event) => (event.target.style.borderColor = "#e2e8f0")}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-amber"
                  disabled={loading}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {loading ? copy.checking : copy.submit} <ArrowRight size={15} />
                </button>
              </form>

              {error && (
                <div
                  role="alert"
                  style={{
                    display: "flex",
                    gap: "0.65rem",
                    marginTop: "1rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.75rem",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#991b1b",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{error}</span>
                </div>
              )}

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "1rem",
                  marginTop: "1.25rem",
                  padding: "1rem",
                }}
              >
                <p
                  style={{
                    color: "#1C1917",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    marginBottom: "0.35rem",
                  }}
                >
                  {copy.noOrderTitle}
                </p>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    marginBottom: "0.85rem",
                  }}
                >
                  {copy.noOrderText}
                </p>
                <Link
                  href={copy.quoteHref || "/quote-request"}
                  className="btn-outline"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {copy.quoteCta || copy.requestQuote} <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
