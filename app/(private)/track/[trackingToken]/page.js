import { notFound } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  CreditCard,
  Mail,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { findOrderByTrackingToken } from "@/lib/order-tracking";
import { getProgressSteps } from "@/lib/order-status";

export const dynamic = "force-dynamic";

const SPANISH_STATUS = {
  "Order Received": "Pedido recibido", "In Production": "En producción", "Waiting on Your Approval": "Esperando tu aprobación", "Completed": "Completado", "Cancelled": "Cancelado",
  "Payment Pending": "Pago pendiente", "Deposit Paid": "Depósito recibido", "Paid in Full": "Pagado en su totalidad", "Refunded": "Reembolsado",
  "Proof Not Sent Yet": "Prueba pendiente de envío", "Proof Sent for Review": "Prueba enviada para revisión", "Artwork Approved": "Diseño aprobado", "Revision Requested": "Cambios solicitados",
  "Production Not Scheduled": "Producción sin programar", "Scheduled for Production": "Producción programada", "Printing": "En impresión", "Finishing / Quality Check": "Acabado y revisión de calidad", "Shipped": "Enviado", "Delivered": "Entregado",
  "Payment Confirmed": "Pago confirmado", "Quality Check": "Revisión de calidad", "Shipped / Ready": "Enviado o listo", "Delivered / Completed": "Entregado o completado",
};

function formatDate(date, locale) {
  if (!date) return "";
  const [year, month, day] = String(date).split("-").map(Number);
  if (year && month && day) {
    return new Date(year, month - 1, day).toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return String(date);
  return parsed.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(value, locale) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCustomerName(order) {
  const customerName = String(order.customerName || "").trim();
  const company = String(order.company || order.companyName || "").trim();

  if (!customerName) return "";
  return company ? `${company} / ${customerName}` : customerName;
}

function dedupeTimelineEvents(events) {
  const seen = new Set();

  return events.filter((event) => {
    if (!event.isCustomerVisible) return false;

    const title = String(event.title || "").trim();
    const description = String(event.description || "").trim();
    const key = `${title.toLowerCase()}|${description.toLowerCase()}`;

    if (!title && !description) return false;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function DetailCard({ icon: Icon, label, value }) {
  if (!value && value !== 0) return null;

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e7edf3",
        borderRadius: "0.85rem",
        display: "grid",
        gap: "0.7rem",
        gridTemplateColumns: "34px 1fr",
        padding: "0.95rem",
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: "rgba(14,165,233,0.1)",
          borderRadius: "0.7rem",
          color: "#0369A1",
          display: "flex",
          height: "34px",
          justifyContent: "center",
          width: "34px",
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <p style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label}
        </p>
        <p style={{ color: "#1C1917", fontWeight: 800, lineHeight: 1.35 }}>{value}</p>
      </div>
    </div>
  );
}

function ProgressStep({ step, isLast, spanish }) {
  const isCompleted = step.state === "completed";
  const isCurrent = step.state === "current";
  const iconColor = isCompleted ? "#15803d" : isCurrent ? "#F59E0B" : "#94a3b8";
  const bg = isCompleted ? "#dcfce7" : isCurrent ? "#fffbeb" : "#f1f5f9";
  const border = isCurrent ? "1px solid #fde68a" : "1px solid #e2e8f0";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "38px 1fr", gap: "0.8rem", position: "relative" }}>
      {!isLast && (
        <div
          aria-hidden="true"
          style={{
            background: isCompleted ? "#86efac" : "#e2e8f0",
            bottom: "-1rem",
            left: "18px",
            position: "absolute",
            top: "42px",
            width: "2px",
          }}
        />
      )}
      <div
        style={{
          alignItems: "center",
          background: bg,
          border,
          borderRadius: "999px",
          color: iconColor,
          display: "flex",
          height: "38px",
          justifyContent: "center",
          position: "relative",
          width: "38px",
          zIndex: 1,
        }}
      >
        {isCompleted ? <CheckCircle2 size={20} /> : isCurrent ? <Clock3 size={19} /> : <Circle size={16} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : "1rem" }}>
        <p style={{ color: "#1C1917", fontWeight: 900 }}>{step.label}</p>
        <p style={{ color: isCurrent ? "#92400e" : "#64748b", fontSize: "0.9rem" }}>
          {isCompleted ? (spanish ? "Completado" : "Completed") : isCurrent ? (spanish ? "Paso actual" : "Current step") : (spanish ? "Próximo paso" : "Upcoming")}
        </p>
      </div>
    </div>
  );
}

export default async function CustomerTrackingPage({ params, searchParams }) {
  const { trackingToken } = await params;
  const order = await findOrderByTrackingToken(trackingToken);

  if (!order) notFound();

  const spanish = (await searchParams)?.lang === "es";
  const locale = spanish ? "es-US" : "en-US";
  const statusLabel = (value) => (spanish ? SPANISH_STATUS[value] || value : value);
  const progressSteps = getProgressSteps(order);
  const visibleEvents = dedupeTimelineEvents(order.timelineEvents || []);
  const customerDisplayName = formatCustomerName(order);
  const showInitialTimelineNote = visibleEvents.length === 0 && order.firstTimelineNote;

  return (
    <section lang={locale} style={{ background: "#FAF8F4", minHeight: "100vh" }}>
      <div style={{ margin: "0 auto", maxWidth: "1120px", padding: "8.25rem 1rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
          <span
            style={{
              background: "rgba(245,158,11,0.16)",
              border: "1px solid rgba(245,158,11,0.34)",
              borderRadius: "999px",
              color: "#92400e",
              fontSize: "0.82rem",
              fontWeight: 900,
              padding: "0.45rem 0.8rem",
            }}
          >
            {statusLabel(order.orderStatusLabel)}
          </span>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)",
            borderRadius: "1rem",
            boxShadow: "0 22px 60px rgba(3,105,161,0.22)",
            color: "white",
            marginBottom: "1rem",
            overflow: "hidden",
            padding: "1.4rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.82rem", fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {order.orderNumber}
          </p>
          <h1 style={{ color: "white", marginBottom: "0.65rem" }}>{order.projectName}</h1>
          <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: "720px" }}>
            {spanish ? "Consulta el estado de tu pedido. Comunícate con Pixel & Panel si tienes alguna pregunta o necesitas ayuda." : "Check your order’s progress. Contact Pixel & Panel if you have a question or need help."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              className="white-card"
              style={{
                border: "1px solid #e7edf3",
                boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
                padding: "1rem",
              }}
            >
              <h2 style={{ marginBottom: "0.8rem" }}>{spanish ? "Detalles del pedido" : "Order details"}</h2>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <DetailCard icon={UserRound} label={spanish ? "Cliente" : "Customer"} value={customerDisplayName} />
                <DetailCard icon={Package} label={spanish ? "Producto" : "Product"} value={order.productName} />
                <DetailCard icon={Package} label={spanish ? "Cantidad" : "Quantity"} value={order.quantity} />
                <DetailCard icon={CalendarDays} label={spanish ? "Fecha de pedido" : "Order date"} value={formatDate(order.orderDate, locale)} />
                <DetailCard icon={CalendarDays} label={spanish ? "Entrega estimada" : "Estimated delivery"} value={formatDate(order.targetDate, locale)} />
                <DetailCard icon={CreditCard} label={spanish ? "Estado del pago" : "Payment status"} value={statusLabel(order.paymentStatusLabel)} />
                <DetailCard icon={ShieldCheck} label={spanish ? "Estado de la prueba" : "Proof status"} value={statusLabel(order.proofStatusLabel)} />
                <DetailCard icon={Truck} label={spanish ? "Estado de producción" : "Production status"} value={statusLabel(order.productStatusLabel)} />
              </div>
            </div>

            {order.publicNote && (
              <div
                style={{
                  background: "#fffbeb",
                  border: "1px solid #fde68a",
                  borderRadius: "0.9rem",
                  padding: "1rem",
                }}
              >
                <p style={{ color: "#92400e", fontSize: "0.78rem", fontWeight: 900, letterSpacing: "0.06em", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                  {spanish ? "Nota de Pixel & Panel" : "Note from Pixel & Panel"}
                </p>
                <p style={{ color: "#78350f", fontWeight: 700 }}>{order.publicNote}</p>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div
              className="white-card"
              style={{
                border: "1px solid #e7edf3",
                boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
                padding: "1rem",
              }}
            >
              <h2 style={{ marginBottom: "0.85rem" }}>{spanish ? "Progreso" : "Progress"}</h2>
              <div style={{ display: "grid" }}>
                {progressSteps.map((step, index) => (
                  <ProgressStep
                    key={step.label}
                    step={{ ...step, label: statusLabel(step.label) }}
                    spanish={spanish}
                    isLast={index === progressSteps.length - 1}
                  />
                ))}
              </div>
            </div>

            <div
              className="white-card"
              style={{
                border: "1px solid #e7edf3",
                boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
                padding: "1rem",
              }}
            >
              <h2 style={{ marginBottom: "0.85rem" }}>{spanish ? "Actualizaciones del pedido" : "Timeline updates"}</h2>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {showInitialTimelineNote && (
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.85rem",
                      padding: "0.9rem",
                    }}
                  >
                    <p style={{ color: "#1C1917", fontWeight: 900 }}>{spanish ? "Primera actualización" : "Initial update"}</p>
                    <p style={{ color: "#64748b", fontSize: "0.95rem", marginTop: "0.25rem" }}>
                      {order.firstTimelineNote}
                    </p>
                  </div>
                )}
                {visibleEvents.map((event) => (
                  <div
                    key={event.id || `${event.title}-${event.createdAt}`}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.85rem",
                      padding: "0.9rem",
                    }}
                  >
                    <p style={{ color: "#1C1917", fontWeight: 900 }}>{event.title}</p>
                    {event.description && (
                      <p style={{ color: "#64748b", fontSize: "0.95rem", marginTop: "0.25rem" }}>
                        {event.description}
                      </p>
                    )}
                    {event.createdAt && (
                      <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                        {formatDateTime(event.createdAt, locale)}
                      </p>
                    )}
                  </div>
                ))}
                {visibleEvents.length === 0 && !order.firstTimelineNote && (
                  <p style={{ color: "#64748b" }}>{spanish ? "Todavía no hay más actualizaciones." : "No further updates yet."}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid #e7edf3",
            borderRadius: "1rem",
            marginTop: "1rem",
            padding: "1rem",
          }}
        >
          <h2 style={{ marginBottom: "0.75rem" }}>{spanish ? "¿Necesitas ayuda?" : "Need help?"}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
              gap: "0.75rem",
            }}
          >
            <a className="btn-amber" href={BRAND.phoneHref} style={{ justifyContent: "center" }}>
              <Phone size={16} /> {spanish ? "Llamar" : "Call"}
            </a>
            <a className="btn-amber" href="https://wa.me/14092252012" style={{ justifyContent: "center" }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a className="btn-amber" href={`mailto:${BRAND.email}`} style={{ justifyContent: "center" }}>
              <Mail size={16} /> {spanish ? "Correo" : "Email"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
