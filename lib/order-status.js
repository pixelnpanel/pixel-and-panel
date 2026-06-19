export const orderStatusLabels = {
  new: "Order Received",
  in_production: "In Production",
  waiting_on_customer: "Waiting on Your Approval",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const paymentStatusLabels = {
  unpaid: "Payment Pending",
  deposit_paid: "Deposit Paid",
  paid_in_full: "Paid in Full",
  refunded: "Refunded",
};

export const proofStatusLabels = {
  not_sent: "Proof Not Sent Yet",
  sent: "Proof Sent for Review",
  approved: "Artwork Approved",
  revision_requested: "Revision Requested",
};

export const productStatusLabels = {
  not_scheduled: "Production Not Scheduled",
  scheduled: "Scheduled for Production",
  printing: "Printing",
  finishing: "Finishing / Quality Check",
  shipped: "Shipped",
  delivered: "Delivered",
};

export const orderStatusOptions = [
  ["new", "Order received"],
  ["in_production", "In production"],
  ["waiting_on_customer", "Waiting on customer approval"],
  ["completed", "Completed"],
  ["cancelled", "Cancelled"],
];

export const paymentStatusOptions = [
  ["unpaid", "Unpaid"],
  ["deposit_paid", "Deposit paid"],
  ["paid_in_full", "Paid in full"],
  ["refunded", "Refunded"],
];

export const proofStatusOptions = [
  ["not_sent", "Proof not sent"],
  ["sent", "Proof sent"],
  ["approved", "Approved"],
  ["revision_requested", "Revision requested"],
];

export const productStatusOptions = [
  ["not_scheduled", "Not scheduled"],
  ["scheduled", "Scheduled"],
  ["printing", "Printing"],
  ["finishing", "Finishing / quality check"],
  ["shipped", "Shipped"],
  ["delivered", "Delivered"],
];

export const progressStepLabels = [
  "Order Received",
  "Payment Confirmed",
  "Artwork Approved",
  "In Production",
  "Quality Check",
  "Shipped / Ready",
  "Delivered / Completed",
];

const legacyOrderStatusMap = {
  quote_received: "new",
  review_in_progress: "new",
  proof_ready: "waiting_on_customer",
  awaiting_approval: "waiting_on_customer",
  install_scheduled: "in_production",
};

const legacyPaymentStatusMap = {
  "not invoiced": "unpaid",
  "invoice sent": "unpaid",
  "deposit requested": "unpaid",
  "deposit paid": "deposit_paid",
  "partially paid": "deposit_paid",
  "paid in full": "paid_in_full",
  "payment due at pickup": "unpaid",
  refunded: "refunded",
};

const legacyProofStatusMap = {
  "not ready": "not_sent",
  "in design": "not_sent",
  "proof sent": "sent",
  "waiting for approval": "sent",
  "changes requested": "revision_requested",
  approved: "approved",
  "no proof needed": "approved",
};

const legacyProductStatusMap = {
  "not scheduled": "not_scheduled",
  "customer pickup": "scheduled",
  "ready for customer pickup": "finishing",
  "awaiting customer pickup": "finishing",
  "delivery scheduled": "scheduled",
  "out for delivery": "shipped",
  "install scheduled": "scheduled",
  "in installation": "finishing",
  shipped: "shipped",
  completed: "delivered",
};

function normalizeKey(value) {
  return String(value || "").trim();
}

function normalizeLegacyText(value) {
  return normalizeKey(value).toLowerCase();
}

export function normalizeOrderStatus(value) {
  const key = normalizeKey(value);
  return orderStatusLabels[key] ? key : legacyOrderStatusMap[key] || "new";
}

export function normalizePaymentStatus(value) {
  const key = normalizeKey(value);
  if (paymentStatusLabels[key]) return key;
  return legacyPaymentStatusMap[normalizeLegacyText(value)] || "unpaid";
}

export function normalizeProofStatus(value) {
  const key = normalizeKey(value);
  if (proofStatusLabels[key]) return key;
  return legacyProofStatusMap[normalizeLegacyText(value)] || "not_sent";
}

export function normalizeProductStatus(value) {
  const key = normalizeKey(value);
  if (productStatusLabels[key]) return key;
  return legacyProductStatusMap[normalizeLegacyText(value)] || "not_scheduled";
}

function highestCompletedStep(order) {
  const orderStatus = normalizeOrderStatus(order.orderStatus || order.order_status || order.status);
  const paymentStatus = normalizePaymentStatus(order.paymentStatus || order.payment_status);
  const proofStatus = normalizeProofStatus(order.proofStatus || order.proof_status);
  const productStatus = normalizeProductStatus(
    order.productStatus || order.product_status || order.deliveryMethod || order.delivery_method,
  );

  if (orderStatus === "cancelled") return 0;
  if (orderStatus === "completed" || productStatus === "delivered") return 6;
  if (productStatus === "shipped") return 4;
  if (productStatus === "finishing") return 3;
  if (productStatus === "printing" || orderStatus === "in_production") return 2;
  if (proofStatus === "approved") return 2;
  if (paymentStatus === "deposit_paid" || paymentStatus === "paid_in_full") return 1;
  return 0;
}

function currentStepIndex(order) {
  const orderStatus = normalizeOrderStatus(order.orderStatus || order.order_status || order.status);
  const paymentStatus = normalizePaymentStatus(order.paymentStatus || order.payment_status);
  const proofStatus = normalizeProofStatus(order.proofStatus || order.proof_status);
  const productStatus = normalizeProductStatus(
    order.productStatus || order.product_status || order.deliveryMethod || order.delivery_method,
  );

  if (orderStatus === "cancelled" || orderStatus === "completed" || productStatus === "delivered") return 6;
  if (productStatus === "shipped") return 5;
  if (productStatus === "finishing") return 4;
  if (productStatus === "printing" || orderStatus === "in_production") return 3;
  if (proofStatus !== "approved") return 2;
  if (paymentStatus !== "deposit_paid" && paymentStatus !== "paid_in_full") return 1;
  return 3;
}

export function getProgressSteps(order) {
  const completedThrough = highestCompletedStep(order);
  const current = currentStepIndex(order);

  return progressStepLabels.map((label, index) => {
    let state = "upcoming";
    if (index <= completedThrough) state = "completed";
    if (index === current && index > completedThrough) state = "current";
    if (index === current && completedThrough === 6) state = "completed";

    return { label, state };
  });
}
