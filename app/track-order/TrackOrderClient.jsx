"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  CreditCard,
  ExternalLink,
  FileText,
  Hash,
  Mail,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Truck,
  Upload,
  User,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { BRAND } from "@/lib/constants";

const previewSteps = [
  {
    label: "Quote received",
    detail: "Project request is in review.",
    icon: FileText,
    state: "done",
  },
  {
    label: "Proof ready",
    detail: "Design proof or project details ready for review.",
    icon: ShieldCheck,
    state: "active",
  },
  {
    label: "In production",
    detail: "Approved job moves into print, build, or website work.",
    icon: Clock3,
    state: "next",
  },
  {
    label: "Pickup or install",
    detail: "Final scheduling for pickup, delivery, or installation.",
    icon: Truck,
    state: "next",
  },
];

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

function formatDate(date) {
  if (!date) return "";
  const [year, month, day] = String(date).split("-").map(Number);
  if (!year || !month || !day) return String(date);
  return new Date(year, month - 1, day).toLocaleDateString();
}

function DetailItem({ icon: Icon, label, value }) {
  if (!value && value !== 0) return null;

  return (
    <div
      style={{
        alignItems: "flex-start",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "0.75rem",
        display: "grid",
        gap: "0.65rem",
        gridTemplateColumns: "28px 1fr",
        padding: "0.85rem",
      }}
    >
      <Icon size={18} style={{ color: "#0369A1", marginTop: 3 }} />
      <div>
        <p style={{ color: "#94a3b8", fontSize: "0.76rem", marginBottom: "0.18rem" }}>
          {label}
        </p>
        <p style={{ color: "#1C1917", fontWeight: 800, lineHeight: 1.35 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function TrackOrderClient() {
  const resultRef = useRef(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!order) return undefined;

    const timeout = window.setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [order]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, contact }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to check order status.");
      }

      setOrder(data.order);
    } catch (lookupError) {
      setError(lookupError.message || "Unable to check order status.");
    } finally {
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
              Order Tracking
            </motion.span>
            <motion.h1
              variants={fadeUp}
              style={{ color: "white", marginBottom: "1.25rem" }}
            >
              Check your project status.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "1.05rem",
                maxWidth: "520px",
                marginBottom: "2rem",
              }}
            >
              Use your order number and contact email or phone to see where your
              sign, print, website, or marketing project stands.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
            >
              <Link href="/quote-request" className="btn-amber">
                Start a quote <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Contact us
              </Link>
            </motion.div>
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
                Track an order
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.95rem",
                  marginBottom: "1.5rem",
                }}
              >
                Enter the order number from your quote, invoice, or project
                update. Use the same email or phone you gave Pixel & Panel.
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="order-number" style={labelStyle}>
                    Order number
                  </label>
                  <input
                    id="order-number"
                    value={orderNumber}
                    onChange={(event) => setOrderNumber(event.target.value)}
                    name="orderNumber"
                    placeholder="PNP-1007"
                    required
                    style={inputStyle}
                    onFocus={(event) => (event.target.style.borderColor = "#0369A1")}
                    onBlur={(event) => (event.target.style.borderColor = "#e2e8f0")}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="order-contact" style={labelStyle}>
                    Email or phone
                  </label>
                  <input
                    id="order-contact"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    name="contact"
                    placeholder="you@email.com"
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
                  {loading ? "Checking..." : "Check status"} <ArrowRight size={15} />
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
            </div>
          </motion.div>
        </div>
      </section>

      {order && (
        <section
          ref={resultRef}
          className="section-base"
          style={{ background: "white", scrollMarginTop: "88px" }}
        >
          <div className="container-px">
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "1.25rem",
                alignItems: "start",
              }}
            >
              <div className="white-card" style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {order.orderNumber}
                    </p>
                    <h2 style={{ color: "#1C1917" }}>{order.projectName}</h2>
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-start",
                      background: "rgba(245,158,11,0.14)",
                      border: "1px solid rgba(245,158,11,0.28)",
                      borderRadius: "999px",
                      color: "#92400e",
                      fontWeight: 800,
                      padding: "0.45rem 0.8rem",
                      fontSize: "0.82rem",
                    }}
                  >
                    {order.statusLabel}
                  </div>
                </div>

                <div style={{ display: "grid", gap: "1rem" }}>
                  {order.updates?.map((update, index) => (
                    <div
                      key={`${update.title}-${update.createdAt || index}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "42px 1fr",
                        gap: "0.9rem",
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: "0.8rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            index === order.updates.length - 1
                              ? "rgba(245,158,11,0.14)"
                              : "rgba(34,197,94,0.12)",
                          color:
                            index === order.updates.length - 1
                              ? "#F59E0B"
                              : "#16a34a",
                        }}
                      >
                        {index === order.updates.length - 1 ? (
                          <Clock3 size={20} />
                        ) : (
                          <CheckCircle2 size={20} />
                        )}
                      </div>
                      <div>
                        <h3 style={{ marginBottom: "0.25rem" }}>{update.title}</h3>
                        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                          {update.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="white-card" style={{ padding: "1.5rem" }}>
                <h2 style={{ marginBottom: "0.85rem" }}>Project details</h2>
                <div style={{ display: "grid", gap: "0.85rem" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    <DetailItem icon={User} label="Client" value={order.customerName} />
                    <DetailItem icon={Package} label="Product" value={order.productName} />
                    <DetailItem icon={Hash} label="Quantity" value={order.quantity} />
                    <DetailItem icon={FileText} label="Service" value={order.productService} />
                    <DetailItem icon={CalendarDays} label="Order date" value={formatDate(order.orderDate)} />
                    <DetailItem icon={CreditCard} label="Payment" value={order.paymentStatus} />
                    <DetailItem icon={FileText} label="Accounting doc" value={order.zohoDocumentNumber || order.zohoStatus} />
                    <DetailItem icon={ClipboardCheck} label="Proof" value={order.proofStatus} />
                    <DetailItem icon={Truck} label="Delivery / install" value={order.deliveryMethod} />
                  </div>
                  {order.dueDate && (
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <CalendarDays size={17} style={{ color: "#0369A1" }} />
                      <p style={{ color: "#1C1917", fontWeight: 700 }}>
                        Target date: {formatDate(order.dueDate)}
                      </p>
                    </div>
                  )}
                  {order.nextAction && (
                    <div
                      style={{
                        background: "#fffbeb",
                        border: "1px solid #fde68a",
                        borderRadius: "0.75rem",
                        padding: "1rem",
                      }}
                    >
                      <p
                        style={{
                          color: "#92400e",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          marginBottom: "0.3rem",
                        }}
                      >
                        Next action
                      </p>
                      <p style={{ color: "#78350f", fontSize: "0.95rem" }}>
                        {order.nextAction}
                      </p>
                    </div>
                  )}
                  {order.publicNote && (
                    <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                      {order.publicNote}
                    </p>
                  )}
                  {order.files?.length > 0 && (
                    <div style={{ display: "grid", gap: "0.6rem" }}>
                      <p style={{ color: "#94a3b8", fontSize: "0.78rem" }}>Files</p>
                      {order.files.map((file) => (
                        <a
                          key={`${file.label}-${file.fileUrl}`}
                          href={file.fileUrl}
                          target={file.fileUrl?.startsWith("http") ? "_blank" : undefined}
                          rel={file.fileUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "0.75rem",
                            padding: "0.8rem 0.9rem",
                            borderRadius: "0.75rem",
                            border: "1px solid #e2e8f0",
                            color: "#0369A1",
                            fontWeight: 700,
                          }}
                        >
                          {file.label}
                          <ExternalLink size={15} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-base" style={{ background: "#FAF8F4" }}>
        <div className="container-px">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "1rem",
              alignItems: "stretch",
            }}
          >
            <div className="white-card" style={{ padding: "1.5rem" }}>
              <h2 style={{ marginBottom: "0.75rem" }}>What customers will see</h2>
              <p style={{ color: "#64748b", marginBottom: "1.25rem" }}>
                Simple status timeline, next action, project contact, and proof
                or file links when available.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {previewSteps.map((step) => {
                  const Icon = step.icon;
                  const isDone = step.state === "done";
                  const isActive = step.state === "active";
                  return (
                    <div
                      key={step.label}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "40px 1fr",
                        gap: "0.85rem",
                        alignItems: "start",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isDone
                            ? "rgba(34,197,94,0.12)"
                            : isActive
                              ? "rgba(245,158,11,0.14)"
                              : "#f1f5f9",
                          color: isDone ? "#16a34a" : isActive ? "#F59E0B" : "#64748b",
                        }}
                      >
                        {isDone ? <CheckCircle2 size={20} /> : <Icon size={19} />}
                      </div>
                      <div>
                        <h3 style={{ marginBottom: "0.2rem" }}>{step.label}</h3>
                        <p style={{ color: "#64748b", fontSize: "0.92rem" }}>
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="white-card"
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <h2 style={{ marginBottom: "0.75rem" }}>Useful first features</h2>
                <div style={{ display: "grid", gap: "0.8rem" }}>
                  {[
                    "Private order lookup by order number and email",
                    "Visible notes for design proof, production, pickup, or install",
                    "File upload area for logos, artwork, photos, and approvals",
                    "Email updates when status changes",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}
                    >
                      <CheckCircle2
                        size={17}
                        style={{ color: "#16a34a", flexShrink: 0, marginTop: 4 }}
                      />
                      <p style={{ color: "#475569", fontSize: "0.95rem" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "1.25rem",
                  display: "grid",
                  gap: "0.75rem",
                }}
              >
                <a
                  href={`mailto:${BRAND.email}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#0369A1", fontWeight: 700 }}
                >
                  <Mail size={16} /> {BRAND.email}
                </a>
                <a
                  href={BRAND.phoneHref}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#0369A1", fontWeight: 700 }}
                >
                  <Phone size={16} /> {BRAND.phone}
                </a>
              </div>
            </div>

            <div
              className="white-card"
              style={{
                padding: "1.5rem",
                background: "#0C1E3C",
                borderColor: "rgba(14,165,233,0.18)",
                color: "white",
              }}
            >
              <Upload size={28} style={{ color: "#F59E0B", marginBottom: "1rem" }} />
              <h2 style={{ color: "white", marginBottom: "0.75rem" }}>
                Next build step
              </h2>
              <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: "1.5rem" }}>
                Supabase schema is ready in the project docs. Add keys to Vercel
                and this page will read real order data from your database.
              </p>
              <Link href="/quote-request" className="btn-amber">
                Request quote <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
