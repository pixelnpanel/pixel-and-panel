"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clipboard,
  Clock3,
  ExternalLink,
  Link2,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { orderProductOptions } from "@/lib/order-products";
import {
  orderStatusOptions,
  paymentStatusOptions,
  productStatusOptions,
  proofStatusOptions,
} from "@/lib/order-status";

const emptyOrder = {
  orderNumber: "",
  company: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  projectName: "",
  productName: "",
  service: "",
  quantity: "1",
  unitPrice: "",
  invoiceNumber: "",
  invoiceTotal: "",
  paymentStatus: "unpaid",
  paymentMethod: "",
  paymentReference: "",
  shippingCharged: "",
  taxCollected: "",
  stripeFee: "",
  orderStatus: "new",
  proofStatus: "not_sent",
  productStatus: "not_scheduled",
  orderDate: "",
  targetDate: "",
  vendorName: "",
  vendorOrderNumber: "",
  vendorCost: "",
  trackingNumber: "",
  proofFileUrl: "",
  invoiceUrl: "",
  designFileUrl: "",
  publicNote: "",
  firstTimelineNote: "",
  internalNote: "",
};

const emptyTimelineDraft = {
  title: "",
  description: "",
  isCustomerVisible: true,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #dbe4ee",
  borderRadius: "0.65rem",
  color: "#1C1917",
  padding: "0.72rem 0.8rem",
  outline: "none",
  background: "white",
};

const labelStyle = {
  display: "block",
  color: "#334155",
  fontSize: "0.75rem",
  fontWeight: 800,
  letterSpacing: "0.04em",
  marginBottom: "0.35rem",
  textTransform: "uppercase",
};

const sectionStyle = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "0.9rem",
  padding: "1rem",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: "0.85rem",
};

const sections = [
  {
    title: "Customer",
    fields: [
      { key: "orderNumber", label: "Order number", placeholder: "PNP-0245", required: true },
      { key: "company", label: "Company", placeholder: "RoGo" },
      { key: "customerName", label: "Customer name", placeholder: "Rolando Gonzalez" },
      { key: "customerEmail", label: "Customer email", placeholder: "customer@email.com" },
      { key: "customerPhone", label: "Customer phone", placeholder: "4092252012" },
    ],
  },
  {
    title: "Project",
    fields: [
      { key: "projectName", label: "Project name", placeholder: "Outdoor Sign" },
      { key: "productName", label: "Product name", placeholder: "Coroplast Signs", list: "pnp-product-options" },
      { key: "service", label: "Service", placeholder: "Design & Printing" },
      { key: "quantity", label: "Quantity", type: "number", min: "1" },
      { key: "unitPrice", label: "Unit price", type: "number", min: "0", step: "0.01", placeholder: "5.99" },
      { key: "orderDate", label: "Order date", type: "date" },
      { key: "targetDate", label: "Target date", type: "date" },
    ],
  },
  {
    title: "Invoice / payment",
    fields: [
      { key: "invoiceNumber", label: "Invoice number", placeholder: "INV-0245" },
      { key: "invoiceTotal", label: "Invoice total", type: "number", min: "0", step: "0.01", placeholder: "81.08" },
      { key: "paymentStatus", label: "Payment status", type: "select", options: paymentStatusOptions },
      { key: "paymentMethod", label: "Payment method", placeholder: "Stripe, cash, check" },
      { key: "paymentReference", label: "Payment reference", placeholder: "Manual reference" },
      { key: "shippingCharged", label: "Shipping charged", type: "number", min: "0", step: "0.01" },
      { key: "taxCollected", label: "Tax collected", type: "number", min: "0", step: "0.01" },
      { key: "stripeFee", label: "Stripe fee", type: "number", min: "0", step: "0.01" },
    ],
  },
  {
    title: "Production",
    fields: [
      { key: "orderStatus", label: "Order status", type: "select", options: orderStatusOptions },
      { key: "proofStatus", label: "Proof status", type: "select", options: proofStatusOptions },
      { key: "productStatus", label: "Product status", type: "select", options: productStatusOptions },
      { key: "vendorName", label: "Vendor name", placeholder: "Vendor or supplier" },
      { key: "vendorOrderNumber", label: "Vendor order number", placeholder: "Vendor PO / order" },
      { key: "vendorCost", label: "Vendor cost", type: "number", min: "0", step: "0.01" },
      { key: "trackingNumber", label: "Tracking number", placeholder: "Shipment tracking" },
    ],
  },
  {
    title: "Files / notes",
    fields: [
      { key: "proofFileUrl", label: "Proof file URL", placeholder: "Private admin URL" },
      { key: "invoiceUrl", label: "Invoice URL", placeholder: "Private admin URL" },
      { key: "designFileUrl", label: "Design file URL", placeholder: "Private admin URL" },
      { key: "publicNote", label: "Public customer note", type: "textarea", wide: true },
      { key: "firstTimelineNote", label: "First timeline note", type: "textarea", wide: true },
      { key: "internalNote", label: "Internal admin note", type: "textarea", wide: true },
    ],
  },
];

function Field({ label, wide, children }) {
  return (
    <label style={wide ? { gridColumn: "1 / -1" } : undefined}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, ...props }) {
  return (
    <input
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      style={inputStyle}
      {...props}
    />
  );
}

function TextArea({ value, onChange, rows = 3, ...props }) {
  return (
    <textarea
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      rows={rows}
      style={{ ...inputStyle, resize: "vertical" }}
      {...props}
    />
  );
}

function SelectInput({ value, onChange, options }) {
  const hasValue = !value || options.some(([optionValue]) => optionValue === value);

  return (
    <select value={value || ""} onChange={(event) => onChange(event.target.value)} style={inputStyle}>
      {!hasValue && <option value={value}>{value}</option>}
      {options.map(([optionValue, label]) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </select>
  );
}

function Section({ title, children }) {
  return (
    <div style={sectionStyle}>
      <h3 style={{ marginBottom: "0.85rem" }}>{title}</h3>
      {children}
    </div>
  );
}

function StatusBadge({ label }) {
  return (
    <span
      style={{
        background: "rgba(245,158,11,0.13)",
        border: "1px solid rgba(245,158,11,0.28)",
        borderRadius: "999px",
        color: "#92400e",
        fontSize: "0.76rem",
        fontWeight: 800,
        padding: "0.32rem 0.62rem",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function formNumber(value) {
  return value || value === 0 ? String(value) : "";
}

function orderToForm(order) {
  if (!order) return emptyOrder;

  return {
    orderNumber: order.orderNumber || "",
    company: order.company || order.companyName || "",
    customerName: order.customerName || "",
    customerEmail: order.customerEmail || "",
    customerPhone: order.customerPhone || "",
    projectName: order.projectName || "",
    productName: order.productName || "",
    service: order.service || order.productService || "",
    quantity: formNumber(order.quantity) || "1",
    unitPrice: formNumber(order.unitPrice),
    invoiceNumber: order.invoiceNumber || "",
    invoiceTotal: formNumber(order.invoiceTotal),
    paymentStatus: order.paymentStatus || "unpaid",
    paymentMethod: order.paymentMethod || "",
    paymentReference: order.paymentReference || "",
    shippingCharged: formNumber(order.shippingCharged),
    taxCollected: formNumber(order.taxCollected),
    stripeFee: formNumber(order.stripeFee),
    orderStatus: order.orderStatus || "new",
    proofStatus: order.proofStatus || "not_sent",
    productStatus: order.productStatus || "not_scheduled",
    orderDate: order.orderDate || "",
    targetDate: order.targetDate || order.dueDate || "",
    vendorName: order.vendorName || "",
    vendorOrderNumber: order.vendorOrderNumber || "",
    vendorCost: formNumber(order.vendorCost),
    trackingNumber: order.trackingNumber || "",
    proofFileUrl: order.proofFileUrl || "",
    invoiceUrl: order.invoiceUrl || "",
    designFileUrl: order.designFileUrl || "",
    publicNote: order.publicNote || "",
    firstTimelineNote: order.firstTimelineNote || "",
    internalNote: order.internalNote || "",
  };
}

function displayCustomer(order) {
  if (!order) return "";
  if (order.company && order.customerName) return `${order.company} / ${order.customerName}`;
  return order.company || order.customerName || "No customer name";
}

function trackingLink(order) {
  if (!order?.trackingToken) return "";
  return `${BRAND.siteUrl}/track/${order.trackingToken}`;
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

function OrderFields({ form, onChange }) {
  return (
    <>
      {sections.map((section) => (
        <Section key={section.title} title={section.title}>
          <div style={formGridStyle}>
            {section.fields.map((field) => (
              <Field key={field.key} label={field.label} wide={field.wide}>
                {field.type === "select" ? (
                  <SelectInput
                    value={form[field.key]}
                    onChange={(value) => onChange(field.key, value)}
                    options={field.options}
                  />
                ) : field.type === "textarea" ? (
                  <TextArea
                    value={form[field.key]}
                    onChange={(value) => onChange(field.key, value)}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <TextInput
                    type={field.type || "text"}
                    min={field.min}
                    step={field.step}
                    list={field.list}
                    required={field.required}
                    value={form[field.key]}
                    onChange={(value) => onChange(field.key, value)}
                    placeholder={field.placeholder}
                  />
                )}
              </Field>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState([]);
  const [configured, setConfigured] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [newOrder, setNewOrder] = useState(emptyOrder);
  const [editOrder, setEditOrder] = useState(emptyOrder);
  const [timelineDraft, setTimelineDraft] = useState(emptyTimelineDraft);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const noticeAnchorRef = useRef(null);

  const selected = useMemo(
    () => orders.find((order) => order.orderNumber === selectedOrder) || orders[0] || null,
    [orders, selectedOrder],
  );

  const selectedTrackingLink = trackingLink(selected);

  const apiFetch = useCallback(async function apiFetch(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Request failed.");
    return data;
  }, []);

  const loadOrders = useCallback(
    async function loadOrders(preferredOrderNumber = "", options = {}) {
      const { clearNotices = true } = options;
      setLoading(true);
      if (clearNotices) {
        setError("");
        setMessage("");
      }
      try {
        const data = await apiFetch("/api/admin/orders");
        const nextOrders = data.orders || [];
        const preferredOrder =
          nextOrders.find((order) => order.orderNumber === preferredOrderNumber) ||
          nextOrders[0] ||
          null;

        setOrders(nextOrders);
        setConfigured(Boolean(data.configured));
        setSelectedOrder(preferredOrder?.orderNumber || "");
        setEditOrder(orderToForm(preferredOrder));
        if (!data.configured && clearNotices) {
          setMessage("Supabase is not configured yet. Manual order entry unlocks after env vars are set.");
        }
      } catch (loadError) {
        setError(loadError.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    },
    [apiFetch],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => loadOrders(), 0);
    return () => window.clearTimeout(timer);
  }, [loadOrders]);

  useEffect(() => {
    if (!message && !error) return;
    const timer = window.setTimeout(() => {
      noticeAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [message, error]);

  function updateNewOrder(field, value) {
    setNewOrder((current) => ({ ...current, [field]: value }));
  }

  function updateEditOrder(field, value) {
    setEditOrder((current) => ({ ...current, [field]: value }));
  }

  function updateTimeline(field, value) {
    setTimelineDraft((current) => ({ ...current, [field]: value }));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function createOrder(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const result = await apiFetch("/api/admin/orders", {
        method: "POST",
        body: JSON.stringify(newOrder),
      });
      setNewOrder(emptyOrder);
      setMessage("Order created. The private customer tracking link is ready to copy.");
      await loadOrders(result.orderNumber || newOrder.orderNumber, { clearNotices: false });
    } catch (createError) {
      setError(createError.message || "Unable to create order.");
    } finally {
      setSaving(false);
    }
  }

  async function updateOrder(event) {
    event.preventDefault();
    if (!selected?.orderNumber) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const result = await apiFetch(`/api/admin/orders/${encodeURIComponent(selected.orderNumber)}`, {
        method: "PATCH",
        body: JSON.stringify(editOrder),
      });
      setMessage("Order updated.");
      await loadOrders(result.orderNumber || editOrder.orderNumber, { clearNotices: false });
    } catch (updateError) {
      setError(updateError.message || "Unable to update order.");
    } finally {
      setSaving(false);
    }
  }

  async function addTimelineUpdate(event) {
    event.preventDefault();
    if (!selected?.orderNumber) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      await apiFetch(`/api/admin/orders/${encodeURIComponent(selected.orderNumber)}/timeline`, {
        method: "POST",
        body: JSON.stringify(timelineDraft),
      });
      setTimelineDraft(emptyTimelineDraft);
      setMessage("Timeline update added.");
      await loadOrders(selected.orderNumber, { clearNotices: false });
    } catch (timelineError) {
      setError(timelineError.message || "Unable to add timeline update.");
    } finally {
      setSaving(false);
    }
  }

  async function copyCustomerTrackingLink() {
    if (!selectedTrackingLink) return;
    try {
      await navigator.clipboard.writeText(selectedTrackingLink);
      setMessage("Customer tracking link copied.");
      setError("");
    } catch {
      window.prompt("Copy customer tracking link", selectedTrackingLink);
    }
  }

  async function deleteOrder() {
    if (!selected?.orderNumber) return;
    const confirmed = window.confirm(`Delete order ${selected.orderNumber}? This removes its timeline updates.`);
    if (!confirmed) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      await apiFetch(`/api/admin/orders/${encodeURIComponent(selected.orderNumber)}`, {
        method: "DELETE",
      });
      setSelectedOrder("");
      setEditOrder(emptyOrder);
      setMessage(`Order ${selected.orderNumber} deleted.`);
      await loadOrders("", { clearNotices: false });
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete order.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section style={{ background: "#f8fafc", minHeight: "100vh", padding: "2rem 1rem 3rem" }}>
      <div style={{ maxWidth: "1480px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="section-label">Private Admin</span>
            <h1 style={{ color: "#1C1917", marginBottom: "0.45rem" }}>Manual order tracking</h1>
            <p style={{ color: "#64748b", maxWidth: "720px" }}>
              Create and update Supabase orders manually. No Zoho sync, Stripe webhooks, or automatic payment sync is active here.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button className="btn-outline" type="button" onClick={() => loadOrders(selectedOrder)} disabled={loading}>
              {loading ? <Loader2 size={15} /> : <RefreshCw size={15} />}
              Refresh
            </button>
            <button className="btn-outline" type="button" onClick={logout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        <div ref={noticeAnchorRef} />

        {error && (
          <div
            role="alert"
            style={{
              alignItems: "center",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "0.75rem",
              color: "#991b1b",
              display: "flex",
              gap: "0.6rem",
              marginBottom: "1rem",
              padding: "0.85rem 1rem",
            }}
          >
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            style={{
              alignItems: "center",
              background: configured ? "#ecfdf5" : "#fffbeb",
              border: configured ? "1px solid #bbf7d0" : "1px solid #fde68a",
              borderRadius: "0.75rem",
              color: configured ? "#166534" : "#92400e",
              display: "flex",
              gap: "0.6rem",
              marginBottom: "1rem",
              padding: "0.85rem 1rem",
            }}
          >
            {configured ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          <section className="white-card" style={{ padding: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h2>Orders</h2>
              <span style={{ color: "#64748b", fontSize: "0.88rem" }}>{orders.length} shown</span>
            </div>

            <div style={{ display: "grid", gap: "0.7rem" }}>
              {orders.map((order) => (
                <button
                  key={order.orderNumber}
                  type="button"
                  onClick={() => {
                    setSelectedOrder(order.orderNumber);
                    setEditOrder(orderToForm(order));
                    setTimelineDraft(emptyTimelineDraft);
                  }}
                  style={{
                    background: selected?.orderNumber === order.orderNumber ? "#eff6ff" : "white",
                    border:
                      selected?.orderNumber === order.orderNumber
                        ? "1px solid #93c5fd"
                        : "1px solid #e2e8f0",
                    borderRadius: "0.8rem",
                    cursor: "pointer",
                    padding: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.45rem" }}>
                    <strong>{order.orderNumber}</strong>
                    <StatusBadge label={order.orderStatusLabel || order.statusLabel} />
                  </div>
                  <p style={{ color: "#1C1917", fontWeight: 700 }}>{order.projectName}</p>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                    {displayCustomer(order)} · {order.productName || order.service || "Project"} · Qty {order.quantity || "-"}
                  </p>
                </button>
              ))}
              {orders.length === 0 && (
                <div style={{ border: "1px dashed #cbd5e1", borderRadius: "0.8rem", color: "#64748b", padding: "1rem" }}>
                  No Supabase orders loaded yet.
                </div>
              )}
            </div>
          </section>

          <div style={{ display: "grid", gap: "1rem" }}>
            <section className="white-card" style={{ padding: "1rem" }}>
              <h2 style={{ marginBottom: "0.35rem" }}>Edit selected order</h2>
              <p style={{ color: "#64748b", marginBottom: "1rem" }}>
                Customer tracking uses a private token URL, never only the order number.
              </p>

              {selected ? (
                <form onSubmit={updateOrder} style={{ display: "grid", gap: "1rem" }}>
                  <div
                    style={{
                      background: "#fffbeb",
                      border: "1px solid #fde68a",
                      borderRadius: "0.85rem",
                      display: "grid",
                      gap: "0.75rem",
                      padding: "1rem",
                    }}
                  >
                    <div>
                      <p style={{ color: "#92400e", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Customer tracking link
                      </p>
                      <p style={{ color: "#78350f", fontSize: "0.92rem", overflowWrap: "anywhere" }}>
                        {selectedTrackingLink || "Tracking token will be created with the order."}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                      <button
                        className="btn-amber"
                        disabled={!selectedTrackingLink}
                        onClick={copyCustomerTrackingLink}
                        type="button"
                      >
                        <Clipboard size={15} />
                        Copy Customer Tracking Link
                      </button>
                      {selectedTrackingLink && (
                        <a className="btn-outline" href={selectedTrackingLink} target="_blank" rel="noreferrer">
                          <ExternalLink size={15} />
                          Open tracking page
                        </a>
                      )}
                    </div>
                  </div>

                  <OrderFields form={editOrder} onChange={updateEditOrder} />

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "space-between" }}>
                    <button className="btn-amber" disabled={saving || !configured} type="submit">
                      {saving ? <Loader2 size={15} /> : <Save size={15} />}
                      Save order
                    </button>
                    <button
                      disabled={saving || !configured}
                      onClick={deleteOrder}
                      style={{
                        alignItems: "center",
                        background: "#fff",
                        border: "1px solid #fecaca",
                        borderRadius: "0.65rem",
                        color: "#991b1b",
                        cursor: saving || !configured ? "not-allowed" : "pointer",
                        display: "inline-flex",
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        gap: "0.4rem",
                        letterSpacing: "0.04em",
                        padding: "0.72rem 0.85rem",
                        textTransform: "uppercase",
                      }}
                      type="button"
                    >
                      <Trash2 size={14} /> Delete order
                    </button>
                  </div>
                </form>
              ) : (
                <p style={{ color: "#64748b" }}>Create or load an order to update one.</p>
              )}
            </section>

            {selected && (
              <section className="white-card" style={{ padding: "1rem" }}>
                <h2 style={{ marginBottom: "0.35rem" }}>Timeline updates</h2>
                <p style={{ color: "#64748b", marginBottom: "1rem" }}>
                  Add manual customer-visible updates below the main progress tracker.
                </p>

                <form onSubmit={addTimelineUpdate} style={{ display: "grid", gap: "0.85rem", marginBottom: "1rem" }}>
                  <div style={formGridStyle}>
                    <Field label="Title">
                      <TextInput
                        required
                        value={timelineDraft.title}
                        onChange={(value) => updateTimeline("title", value)}
                        placeholder="Production scheduled"
                      />
                    </Field>
                    <label
                      style={{
                        alignItems: "center",
                        alignSelf: "end",
                        color: "#334155",
                        display: "flex",
                        fontWeight: 800,
                        gap: "0.5rem",
                        minHeight: "44px",
                      }}
                    >
                      <input
                        checked={timelineDraft.isCustomerVisible}
                        onChange={(event) => updateTimeline("isCustomerVisible", event.target.checked)}
                        type="checkbox"
                      />
                      Customer visible
                    </label>
                  </div>
                  <Field label="Description" wide>
                    <TextArea
                      value={timelineDraft.description}
                      onChange={(value) => updateTimeline("description", value)}
                      placeholder="Short update for the customer."
                    />
                  </Field>
                  <div>
                    <button className="btn-amber" disabled={saving || !configured} type="submit">
                      {saving ? <Loader2 size={15} /> : <Plus size={15} />}
                      Add Timeline Update
                    </button>
                  </div>
                </form>

                <div style={{ display: "grid", gap: "0.65rem" }}>
                  {(selected.timelineEvents || []).map((event) => (
                    <div
                      key={event.id || `${event.title}-${event.createdAt}`}
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.8rem",
                        display: "grid",
                        gap: "0.35rem",
                        padding: "0.85rem",
                      }}
                    >
                      <div style={{ alignItems: "center", display: "flex", gap: "0.5rem", justifyContent: "space-between" }}>
                        <strong style={{ color: "#1C1917" }}>{event.title}</strong>
                        <span style={{ color: event.isCustomerVisible ? "#166534" : "#64748b", fontSize: "0.78rem", fontWeight: 800 }}>
                          {event.isCustomerVisible ? "Customer visible" : "Internal only"}
                        </span>
                      </div>
                      {event.description && <p style={{ color: "#64748b", fontSize: "0.92rem" }}>{event.description}</p>}
                      {event.createdAt && (
                        <p style={{ alignItems: "center", color: "#94a3b8", display: "inline-flex", fontSize: "0.78rem", gap: "0.35rem" }}>
                          <Clock3 size={13} /> {formatDateTime(event.createdAt)}
                        </p>
                      )}
                    </div>
                  ))}
                  {(!selected.timelineEvents || selected.timelineEvents.length === 0) && (
                    <p style={{ color: "#64748b" }}>No manual timeline updates yet.</p>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        <section className="white-card" style={{ padding: "1rem", marginTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem" }}>
            <Link2 size={20} style={{ color: "#0369A1" }} />
            <h2>Create order</h2>
          </div>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Add a new manually managed order. A private tracking token is generated automatically in Supabase.
          </p>
          <form onSubmit={createOrder} style={{ display: "grid", gap: "1rem" }}>
            <OrderFields form={newOrder} onChange={updateNewOrder} />
            <div style={{ display: "flex", alignItems: "end" }}>
              <button className="btn-amber" disabled={saving || !configured} type="submit">
                {saving ? <Loader2 size={15} /> : <Plus size={15} />}
                Create order
              </button>
            </div>
          </form>

          <datalist id="pnp-product-options">
            {orderProductOptions.map((group) =>
              group.products.map((product) => (
                <option key={`${group.category}-${product}`} value={product}>
                  {group.category}
                </option>
              )),
            )}
          </datalist>
        </section>
      </div>
    </section>
  );
}
