"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  LogOut,
  Loader2,
  Lock,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { orderProductOptions } from "@/lib/order-products";

const statusOptions = [
  ["quote_received", "Quote received"],
  ["review_in_progress", "Review in progress"],
  ["proof_ready", "Proof ready"],
  ["awaiting_approval", "Awaiting approval"],
  ["in_production", "In production"],
  ["install_scheduled", "Install scheduled"],
  ["completed", "Completed"],
];

const nextActionOptions = [
  ["", "No customer action needed"],
  ["Review the design proof and send approval or changes.", "Review proof / approve or request changes"],
  ["Approve the invoice or payment request.", "Approve invoice or payment"],
  ["Send artwork, logo files, photos, or missing project details.", "Send artwork or missing files"],
  ["Confirm pickup details with Pixel & Panel.", "Confirm pickup details"],
  ["Confirm delivery details with Pixel & Panel.", "Confirm delivery details"],
  ["Confirm installation timing with Pixel & Panel.", "Confirm installation timing"],
  ["We will contact you with the next step.", "Pixel & Panel will contact customer"],
];

const paymentStatusOptions = [
  "Not invoiced",
  "Invoice sent",
  "Deposit requested",
  "Deposit paid",
  "Partially paid",
  "Paid in full",
  "Payment due at pickup",
  "Refunded",
];

const proofStatusOptions = [
  "Not ready",
  "In design",
  "Proof sent",
  "Waiting for approval",
  "Changes requested",
  "Approved",
  "No proof needed",
];

const productStatusOptions = [
  "Not scheduled",
  "Customer pickup",
  "Ready for customer pickup",
  "Awaiting customer pickup",
  "Delivery scheduled",
  "Out for delivery",
  "Install scheduled",
  "In installation",
  "Shipped",
  "Completed",
];

const emptyOrder = {
  orderNumber: "",
  companyName: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  projectName: "",
  productName: "",
  productService: "",
  quantity: "1",
  unitRate: "",
  orderDate: "",
  paymentStatus: "Not invoiced",
  proofStatus: "Not ready",
  deliveryMethod: "Not scheduled",
  status: "quote_received",
  nextAction: "",
  dueDate: "",
  publicNote: "",
  updateBody: "",
};

const inputStyle = {
  width: "100%",
  border: "1px solid #dbe4ee",
  borderRadius: "0.65rem",
  color: "#1C1917",
  padding: "0.72rem 0.8rem",
  outline: "none",
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

const panelStyle = {
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

function Field({ label, children }) {
  return (
    <label>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, ...props }) {
  return <input value={value || ""} onChange={(event) => onChange(event.target.value)} style={inputStyle} {...props} />;
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
  const normalizedOptions = options.map((option) =>
    Array.isArray(option) ? option : [option, option],
  );
  const hasValue = !value || normalizedOptions.some(([optionValue]) => optionValue === value);

  return (
    <select value={value || ""} onChange={(event) => onChange(event.target.value)} style={inputStyle}>
      {!hasValue && <option value={value}>{value}</option>}
      {normalizedOptions.map(([optionValue, label]) => (
        <option key={optionValue || label} value={optionValue}>
          {label}
        </option>
      ))}
    </select>
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

function orderToForm(order) {
  if (!order) return emptyOrder;

  return {
    orderNumber: order.orderNumber || "",
    companyName: order.companyName || "",
    customerName: order.customerName || "",
    customerEmail: order.customerEmail || "",
    customerPhone: order.customerPhone || "",
    projectName: order.projectName || "",
    productName: order.productName || "",
    productService: order.productService || "",
    quantity: String(order.quantity || "1"),
    unitRate: order.unitRate || order.unitRate === 0 ? String(order.unitRate) : "",
    orderDate: order.orderDate || "",
    paymentStatus: order.paymentStatus || "Not invoiced",
    proofStatus: order.proofStatus || "Not ready",
    deliveryMethod: order.deliveryMethod || "Not scheduled",
    status: order.status || "review_in_progress",
    nextAction: order.nextAction || "",
    dueDate: order.dueDate || "",
    publicNote: order.publicNote || "",
    updateBody: "",
  };
}

function displayCustomer(order) {
  if (!order) return "";
  if (order.companyName && order.customerName) return `${order.companyName} / ${order.customerName}`;
  return order.companyName || order.customerName || "No customer name";
}

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState([]);
  const [configured, setConfigured] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [newOrder, setNewOrder] = useState(emptyOrder);
  const [editOrder, setEditOrder] = useState(emptyOrder);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selected = useMemo(
    () => orders.find((order) => order.orderNumber === selectedOrder) || orders[0],
    [orders, selectedOrder],
  );

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
    async function loadOrders(preferredOrderNumber = "") {
      setLoading(true);
      setError("");
      setMessage("");
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
        if (!data.configured) {
          setMessage("Supabase not configured yet. Showing demo order only.");
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

  function updateNewOrder(field, value) {
    setNewOrder((current) => ({ ...current, [field]: value }));
  }

  function updateEditOrder(field, value) {
    setEditOrder((current) => ({ ...current, [field]: value }));
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
      setMessage("Order created.");
      await loadOrders(result.orderNumber);
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
      await loadOrders(result.orderNumber || editOrder.orderNumber);
    } catch (updateError) {
      setError(updateError.message || "Unable to update order.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteOrder() {
    if (!selected?.orderNumber) return;
    const confirmed = window.confirm(
      `Delete order ${selected.orderNumber}? This removes its customer timeline and files from tracking.`,
    );
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
      await loadOrders("");
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
            <h1 style={{ color: "#1C1917", marginBottom: "0.45rem" }}>Order manager</h1>
            <p style={{ color: "#64748b", maxWidth: "680px" }}>
              Create customer orders, edit order details, and control what customers see on the tracking page.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "flex-end",
            }}
          >
            <a href="/track-order" className="btn-outline" target="_blank" rel="noreferrer">
              <Eye size={15} /> View tracker
            </a>
            <button className="btn-outline" type="button" onClick={() => loadOrders(selectedOrder)} disabled={loading}>
              {loading ? <Loader2 size={15} /> : <RefreshCw size={15} />}
              Refresh
            </button>
            <button className="btn-outline" type="button" onClick={logout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

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
            {configured ? <CheckCircle2 size={18} /> : <Lock size={18} />}
            {message}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      marginBottom: "0.45rem",
                    }}
                  >
                    <strong>{order.orderNumber}</strong>
                    <StatusBadge label={order.statusLabel} />
                  </div>
                  <p style={{ color: "#1C1917", fontWeight: 700 }}>{order.projectName}</p>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                    {displayCustomer(order)} · {order.productName || order.productService} · Qty {order.quantity}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="white-card" style={{ padding: "1rem" }}>
            <h2 style={{ marginBottom: "0.35rem" }}>Edit selected order</h2>
            <p style={{ color: "#64748b", marginBottom: "1rem" }}>
              Modify customer, project, payment, proof, and product status details in one place.
            </p>

            {selected ? (
              <form onSubmit={updateOrder} style={{ display: "grid", gap: "1rem" }}>
                <div style={panelStyle}>
                  <h3 style={{ marginBottom: "0.85rem" }}>Customer</h3>
                  <div style={formGridStyle}>
                    <Field label="Order number">
                      <TextInput value={editOrder.orderNumber} onChange={(value) => updateEditOrder("orderNumber", value)} placeholder="PNP-1008" />
                    </Field>
                    <Field label="Company">
                      <TextInput value={editOrder.companyName} onChange={(value) => updateEditOrder("companyName", value)} placeholder="Company name" />
                    </Field>
                    <Field label="Customer name">
                      <TextInput value={editOrder.customerName} onChange={(value) => updateEditOrder("customerName", value)} placeholder="Customer name" />
                    </Field>
                    <Field label="Customer email">
                      <TextInput value={editOrder.customerEmail} onChange={(value) => updateEditOrder("customerEmail", value)} placeholder="customer@email.com" />
                    </Field>
                    <Field label="Customer phone">
                      <TextInput value={editOrder.customerPhone} onChange={(value) => updateEditOrder("customerPhone", value)} placeholder="4098006139" />
                    </Field>
                  </div>
                </div>

                <div style={panelStyle}>
                  <h3 style={{ marginBottom: "0.85rem" }}>Project details</h3>
                  <div style={formGridStyle}>
                    <Field label="Project name">
                      <TextInput value={editOrder.projectName} onChange={(value) => updateEditOrder("projectName", value)} placeholder="Storefront sign" />
                    </Field>
                    <Field label="Product name">
                      <TextInput
                        list="pnp-product-options"
                        value={editOrder.productName}
                        onChange={(value) => updateEditOrder("productName", value)}
                        placeholder="Choose product or type custom"
                      />
                    </Field>
                    <Field label="Service">
                      <TextInput value={editOrder.productService} onChange={(value) => updateEditOrder("productService", value)} placeholder="Storefront Signs" />
                    </Field>
                    <Field label="Quantity">
                      <TextInput type="number" min="1" value={editOrder.quantity} onChange={(value) => updateEditOrder("quantity", value)} />
                    </Field>
                    <Field label="Unit price">
                      <TextInput type="number" min="0" step="0.01" value={editOrder.unitRate} onChange={(value) => updateEditOrder("unitRate", value)} placeholder="450.00" />
                    </Field>
                    <Field label="Order date">
                      <TextInput type="date" value={editOrder.orderDate} onChange={(value) => updateEditOrder("orderDate", value)} />
                    </Field>
                    <Field label="Target date">
                      <TextInput type="date" value={editOrder.dueDate} onChange={(value) => updateEditOrder("dueDate", value)} />
                    </Field>
                  </div>
                </div>

                <div style={panelStyle}>
                  <h3 style={{ marginBottom: "0.85rem" }}>Status and next steps</h3>
                  <div style={formGridStyle}>
                    <Field label="Order status">
                      <SelectInput value={editOrder.status} onChange={(value) => updateEditOrder("status", value)} options={statusOptions} />
                    </Field>
                    <Field label="Next action">
                      <SelectInput value={editOrder.nextAction} onChange={(value) => updateEditOrder("nextAction", value)} options={nextActionOptions} />
                    </Field>
                    <Field label="Payment status">
                      <SelectInput value={editOrder.paymentStatus} onChange={(value) => updateEditOrder("paymentStatus", value)} options={paymentStatusOptions} />
                    </Field>
                    <Field label="Proof status">
                      <SelectInput value={editOrder.proofStatus} onChange={(value) => updateEditOrder("proofStatus", value)} options={proofStatusOptions} />
                    </Field>
                    <Field label="Product status">
                      <SelectInput value={editOrder.deliveryMethod} onChange={(value) => updateEditOrder("deliveryMethod", value)} options={productStatusOptions} />
                    </Field>
                  </div>
                </div>

                <div style={panelStyle}>
                  <h3 style={{ marginBottom: "0.85rem" }}>Customer notes</h3>
                  <div style={formGridStyle}>
                    <Field label="Public note">
                      <TextArea value={editOrder.publicNote} onChange={(value) => updateEditOrder("publicNote", value)} placeholder="Short note visible to the customer" />
                    </Field>
                    <Field label="Timeline update">
                      <TextArea value={editOrder.updateBody} onChange={(value) => updateEditOrder("updateBody", value)} placeholder="Optional customer-visible update added to the timeline" />
                    </Field>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    justifyContent: "space-between",
                  }}
                >
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
              <p style={{ color: "#64748b" }}>Load orders to update one.</p>
            )}
          </section>
        </div>

        <section className="white-card" style={{ padding: "1rem", marginTop: "1rem" }}>
          <h2 style={{ marginBottom: "0.35rem" }}>Create order</h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Add a new tracking record. Company and customer name are separate, and you can use either one or both.
          </p>
          <form onSubmit={createOrder} style={{ display: "grid", gap: "1rem" }}>
            <div style={panelStyle}>
              <h3 style={{ marginBottom: "0.85rem" }}>Customer</h3>
              <div style={formGridStyle}>
                <Field label="Order number">
                  <TextInput value={newOrder.orderNumber} onChange={(value) => updateNewOrder("orderNumber", value)} placeholder="PNP-1008" />
                </Field>
                <Field label="Company">
                  <TextInput value={newOrder.companyName} onChange={(value) => updateNewOrder("companyName", value)} placeholder="Company name" />
                </Field>
                <Field label="Customer name">
                  <TextInput value={newOrder.customerName} onChange={(value) => updateNewOrder("customerName", value)} placeholder="Customer name" />
                </Field>
                <Field label="Customer email">
                  <TextInput value={newOrder.customerEmail} onChange={(value) => updateNewOrder("customerEmail", value)} placeholder="customer@email.com" />
                </Field>
                <Field label="Customer phone">
                  <TextInput value={newOrder.customerPhone} onChange={(value) => updateNewOrder("customerPhone", value)} placeholder="4098006139" />
                </Field>
              </div>
            </div>

            <div style={panelStyle}>
              <h3 style={{ marginBottom: "0.85rem" }}>Project details</h3>
              <div style={formGridStyle}>
                <Field label="Project name">
                  <TextInput value={newOrder.projectName} onChange={(value) => updateNewOrder("projectName", value)} placeholder="Storefront sign" />
                </Field>
                <Field label="Product name">
                  <TextInput
                    list="pnp-product-options"
                    value={newOrder.productName}
                    onChange={(value) => updateNewOrder("productName", value)}
                    placeholder="Choose product or type custom"
                  />
                </Field>
                <Field label="Service">
                  <TextInput value={newOrder.productService} onChange={(value) => updateNewOrder("productService", value)} placeholder="Storefront Signs" />
                </Field>
                <Field label="Quantity">
                  <TextInput type="number" min="1" value={newOrder.quantity} onChange={(value) => updateNewOrder("quantity", value)} />
                </Field>
                <Field label="Unit price">
                  <TextInput type="number" min="0" step="0.01" value={newOrder.unitRate} onChange={(value) => updateNewOrder("unitRate", value)} placeholder="450.00" />
                </Field>
                <Field label="Order date">
                  <TextInput type="date" value={newOrder.orderDate} onChange={(value) => updateNewOrder("orderDate", value)} />
                </Field>
                <Field label="Target date">
                  <TextInput type="date" value={newOrder.dueDate} onChange={(value) => updateNewOrder("dueDate", value)} />
                </Field>
              </div>
            </div>

            <div style={panelStyle}>
              <h3 style={{ marginBottom: "0.85rem" }}>Status and next steps</h3>
              <div style={formGridStyle}>
                <Field label="Order status">
                  <SelectInput value={newOrder.status} onChange={(value) => updateNewOrder("status", value)} options={statusOptions} />
                </Field>
                <Field label="Next action">
                  <SelectInput value={newOrder.nextAction} onChange={(value) => updateNewOrder("nextAction", value)} options={nextActionOptions} />
                </Field>
                <Field label="Payment status">
                  <SelectInput value={newOrder.paymentStatus} onChange={(value) => updateNewOrder("paymentStatus", value)} options={paymentStatusOptions} />
                </Field>
                <Field label="Proof status">
                  <SelectInput value={newOrder.proofStatus} onChange={(value) => updateNewOrder("proofStatus", value)} options={proofStatusOptions} />
                </Field>
                <Field label="Product status">
                  <SelectInput value={newOrder.deliveryMethod} onChange={(value) => updateNewOrder("deliveryMethod", value)} options={productStatusOptions} />
                </Field>
              </div>
            </div>

            <div style={panelStyle}>
              <h3 style={{ marginBottom: "0.85rem" }}>Customer notes</h3>
              <div style={formGridStyle}>
                <Field label="Public note">
                  <TextArea value={newOrder.publicNote} onChange={(value) => updateNewOrder("publicNote", value)} placeholder="Short note visible to the customer" />
                </Field>
                <Field label="First timeline note">
                  <TextArea value={newOrder.updateBody} onChange={(value) => updateNewOrder("updateBody", value)} placeholder="Customer-visible first update" />
                </Field>
              </div>
            </div>

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

          {!configured && (
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "1rem" }}>
              Create and update actions unlock after Supabase env vars are configured.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
