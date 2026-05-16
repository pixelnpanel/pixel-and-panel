"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Eye,
  Loader2,
  Lock,
  Plus,
  RefreshCw,
  Save,
} from "lucide-react";

const statusOptions = [
  ["quote_received", "Quote received"],
  ["review_in_progress", "Review in progress"],
  ["proof_ready", "Proof ready"],
  ["awaiting_approval", "Awaiting approval"],
  ["in_production", "In production"],
  ["install_scheduled", "Install scheduled"],
  ["completed", "Completed"],
];

const emptyOrder = {
  orderNumber: "",
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
  deliveryMethod: "",
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

function Field({ label, children }) {
  return (
    <label>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
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

export default function AdminOrdersClient() {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("pnp-order-admin-token") || "";
  });
  const [orders, setOrders] = useState([]);
  const [configured, setConfigured] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [newOrder, setNewOrder] = useState(emptyOrder);
  const [updateForm, setUpdateForm] = useState({
    status: "review_in_progress",
    quantity: "",
    unitRate: "",
    paymentStatus: "",
    proofStatus: "",
    deliveryMethod: "",
    nextAction: "",
    publicNote: "",
    dueDate: "",
    updateTitle: "",
    updateBody: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selected = useMemo(
    () => orders.find((order) => order.orderNumber === selectedOrder) || orders[0],
    [orders, selectedOrder],
  );

  async function apiFetch(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
        ...(options.headers || {}),
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Request failed.");
    return data;
  }

  async function loadOrders() {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      window.localStorage.setItem("pnp-order-admin-token", token);
      const data = await apiFetch("/api/admin/orders");
      setOrders(data.orders || []);
      setConfigured(Boolean(data.configured));
      setSelectedOrder(data.orders?.[0]?.orderNumber || "");
      if (!data.configured) {
        setMessage("Supabase not configured yet. Showing demo order only.");
      }
    } catch (loadError) {
      setError(loadError.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function createOrder(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await apiFetch("/api/admin/orders", {
        method: "POST",
        body: JSON.stringify(newOrder),
      });
      setNewOrder(emptyOrder);
      setMessage("Order created.");
      await loadOrders();
    } catch (createError) {
      setError(createError.message || "Unable to create order.");
    } finally {
      setSaving(false);
    }
  }

  async function updateOrder(event) {
    event.preventDefault();
    if (!selected?.orderNumber) return;

    const payload = { status: updateForm.status };
    for (const key of [
      "quantity",
      "unitRate",
      "paymentStatus",
      "proofStatus",
      "deliveryMethod",
      "nextAction",
      "publicNote",
      "dueDate",
      "updateTitle",
      "updateBody",
    ]) {
      if (String(updateForm[key] || "").trim()) {
        payload[key] = updateForm[key];
      }
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      await apiFetch(`/api/admin/orders/${encodeURIComponent(selected.orderNumber)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      setMessage("Order updated.");
      await loadOrders();
    } catch (updateError) {
      setError(updateError.message || "Unable to update order.");
    } finally {
      setSaving(false);
    }
  }

  async function syncZoho(mode) {
    if (!selected?.orderNumber) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const result = await apiFetch(
        `/api/admin/orders/${encodeURIComponent(selected.orderNumber)}/sync-zoho`,
        {
          method: "POST",
          body: JSON.stringify({ mode }),
        },
      );
      setMessage(
        `Zoho ${mode === "sales_order" ? "sales order" : "estimate"} synced${
          result.documentNumber ? `: ${result.documentNumber}` : ""
        }.`,
      );
      await loadOrders();
    } catch (syncError) {
      setError(syncError.message || "Unable to sync Zoho Books.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section style={{ background: "#f8fafc", minHeight: "100vh", padding: "6rem 1rem 3rem" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="section-label">Private Admin</span>
            <h1 style={{ color: "#1C1917", marginBottom: "0.55rem" }}>Order manager</h1>
            <p style={{ color: "#64748b", maxWidth: "620px" }}>
              Create customer orders, update status, and write customer-visible
              timeline notes for the tracking page.
            </p>
          </div>
          <a href="/track-order" className="btn-outline" target="_blank" rel="noreferrer">
            <Eye size={15} /> View tracker
          </a>
        </div>

        <section className="white-card" style={{ padding: "1rem", marginBottom: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(min(100%, 320px), 1fr) auto",
              gap: "0.75rem",
              alignItems: "end",
            }}
          >
            <Field label="Admin token">
              <input
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="ORDER_ADMIN_TOKEN"
                style={inputStyle}
              />
            </Field>
            <button
              className="btn-amber"
              type="button"
              onClick={loadOrders}
              disabled={loading || !token}
              style={{ justifyContent: "center" }}
            >
              {loading ? <Loader2 size={15} /> : <RefreshCw size={15} />}
              Load orders
            </button>
          </div>
        </section>

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
            gridTemplateColumns: "minmax(min(100%, 360px), 0.9fr) minmax(min(100%, 420px), 1.1fr)",
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
              <span style={{ color: "#64748b", fontSize: "0.88rem" }}>
                {orders.length} shown
              </span>
            </div>

            <div style={{ display: "grid", gap: "0.7rem" }}>
              {orders.map((order) => (
                <button
                  key={order.orderNumber}
                  type="button"
                  onClick={() => setSelectedOrder(order.orderNumber)}
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
                    {order.customerName} · {order.productName || order.productService} · Qty {order.quantity}
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "0.25rem" }}>
                    Zoho: {order.zohoDocumentNumber || order.zohoStatus || "Not synced"}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="white-card" style={{ padding: "1rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>Update selected order</h2>
            {selected ? (
              <form onSubmit={updateOrder} style={{ display: "grid", gap: "0.85rem" }}>
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.75rem",
                    padding: "0.9rem",
                  }}
                >
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
                    {selected.orderNumber}
                  </p>
                  <p style={{ color: "#1C1917", fontWeight: 800 }}>
                    {selected.projectName}
                  </p>
                </div>

                <Field label="New status">
                  <select
                    value={updateForm.status}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, status: event.target.value })
                    }
                    style={inputStyle}
                  >
                    {statusOptions.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Next action">
                  <input
                    value={updateForm.nextAction}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, nextAction: event.target.value })
                    }
                    placeholder="Review proof, approve invoice, schedule install"
                    style={inputStyle}
                  />
                </Field>

                <Field label="Quantity">
                  <input
                    type="number"
                    min="1"
                    value={updateForm.quantity}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, quantity: event.target.value })
                    }
                    placeholder={String(selected.quantity || 1)}
                    style={inputStyle}
                  />
                </Field>

                <Field label="Unit price">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={updateForm.unitRate}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, unitRate: event.target.value })
                    }
                    placeholder={selected.unitRate ? String(selected.unitRate) : "Required for Zoho"}
                    style={inputStyle}
                  />
                </Field>

                <Field label="Payment status">
                  <input
                    value={updateForm.paymentStatus}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, paymentStatus: event.target.value })
                    }
                    placeholder={selected.paymentStatus || "Invoice sent"}
                    style={inputStyle}
                  />
                </Field>

                <Field label="Proof status">
                  <input
                    value={updateForm.proofStatus}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, proofStatus: event.target.value })
                    }
                    placeholder={selected.proofStatus || "Waiting for approval"}
                    style={inputStyle}
                  />
                </Field>

                <Field label="Delivery / install">
                  <input
                    value={updateForm.deliveryMethod}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, deliveryMethod: event.target.value })
                    }
                    placeholder={selected.deliveryMethod || "Pickup, delivery, or install"}
                    style={inputStyle}
                  />
                </Field>

                <Field label="Target date">
                  <input
                    type="date"
                    value={updateForm.dueDate}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, dueDate: event.target.value })
                    }
                    style={inputStyle}
                  />
                </Field>

                <Field label="Public note">
                  <textarea
                    value={updateForm.publicNote}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, publicNote: event.target.value })
                    }
                    rows={3}
                    placeholder="Short note visible to the customer"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </Field>

                <Field label="Timeline update">
                  <textarea
                    value={updateForm.updateBody}
                    onChange={(event) =>
                      setUpdateForm({ ...updateForm, updateBody: event.target.value })
                    }
                    rows={3}
                    placeholder="Customer-visible update added to the timeline"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </Field>

                <button className="btn-amber" disabled={saving || !configured} type="submit">
                  {saving ? <Loader2 size={15} /> : <Save size={15} />}
                  Save update
                </button>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  <button
                    className="btn-outline"
                    disabled={saving || !configured}
                    type="button"
                    onClick={() => syncZoho("estimate")}
                  >
                    Sync Zoho estimate
                  </button>
                  <button
                    className="btn-outline"
                    disabled={saving || !configured}
                    type="button"
                    onClick={() => syncZoho("sales_order")}
                  >
                    Sync Zoho sales order
                  </button>
                </div>
              </form>
            ) : (
              <p style={{ color: "#64748b" }}>Load orders to update one.</p>
            )}
          </section>
        </div>

        <section className="white-card" style={{ padding: "1rem", marginTop: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Create order</h2>
          <form
            onSubmit={createOrder}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "0.85rem",
            }}
          >
            <Field label="Order number">
              <input
                value={newOrder.orderNumber}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, orderNumber: event.target.value })
                }
                placeholder="PNP-1008"
                style={inputStyle}
              />
            </Field>
            <Field label="Customer name">
              <input
                value={newOrder.customerName}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, customerName: event.target.value })
                }
                placeholder="Customer name"
                style={inputStyle}
              />
            </Field>
            <Field label="Customer email">
              <input
                value={newOrder.customerEmail}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, customerEmail: event.target.value })
                }
                placeholder="customer@email.com"
                style={inputStyle}
              />
            </Field>
            <Field label="Customer phone">
              <input
                value={newOrder.customerPhone}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, customerPhone: event.target.value })
                }
                placeholder="4098006139"
                style={inputStyle}
              />
            </Field>
            <Field label="Project name">
              <input
                value={newOrder.projectName}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, projectName: event.target.value })
                }
                placeholder="Storefront sign"
                style={inputStyle}
              />
            </Field>
            <Field label="Product name">
              <input
                value={newOrder.productName}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, productName: event.target.value })
                }
                placeholder="Storefront sign + window graphics"
                style={inputStyle}
              />
            </Field>
            <Field label="Service">
              <input
                value={newOrder.productService}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, productService: event.target.value })
                }
                placeholder="Storefront Signs"
                style={inputStyle}
              />
            </Field>
            <Field label="Quantity">
              <input
                type="number"
                min="1"
                value={newOrder.quantity}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, quantity: event.target.value })
                }
                style={inputStyle}
              />
            </Field>
            <Field label="Unit price">
              <input
                type="number"
                min="0"
                step="0.01"
                value={newOrder.unitRate}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, unitRate: event.target.value })
                }
                placeholder="450.00"
                style={inputStyle}
              />
            </Field>
            <Field label="Order date">
              <input
                type="date"
                value={newOrder.orderDate}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, orderDate: event.target.value })
                }
                style={inputStyle}
              />
            </Field>
            <Field label="Payment status">
              <input
                value={newOrder.paymentStatus}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, paymentStatus: event.target.value })
                }
                placeholder="Invoice sent, paid deposit, paid in full"
                style={inputStyle}
              />
            </Field>
            <Field label="Proof status">
              <input
                value={newOrder.proofStatus}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, proofStatus: event.target.value })
                }
                placeholder="Not ready, ready, approved"
                style={inputStyle}
              />
            </Field>
            <Field label="Delivery / install">
              <input
                value={newOrder.deliveryMethod}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, deliveryMethod: event.target.value })
                }
                placeholder="Pickup, delivery, or install"
                style={inputStyle}
              />
            </Field>
            <Field label="Status">
              <select
                value={newOrder.status}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, status: event.target.value })
                }
                style={inputStyle}
              >
                {statusOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Target date">
              <input
                type="date"
                value={newOrder.dueDate}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, dueDate: event.target.value })
                }
                style={inputStyle}
              />
            </Field>
            <Field label="Next action">
              <input
                value={newOrder.nextAction}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, nextAction: event.target.value })
                }
                placeholder="Review proof"
                style={inputStyle}
              />
            </Field>
            <Field label="Public note">
              <textarea
                value={newOrder.publicNote}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, publicNote: event.target.value })
                }
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Field>
            <Field label="First timeline note">
              <textarea
                value={newOrder.updateBody}
                onChange={(event) =>
                  setNewOrder({ ...newOrder, updateBody: event.target.value })
                }
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Field>

            <div style={{ display: "flex", alignItems: "end" }}>
              <button className="btn-amber" disabled={saving || !configured} type="submit">
                {saving ? <Loader2 size={15} /> : <Plus size={15} />}
                Create order
              </button>
            </div>
          </form>

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
