// Explicit public projection: never spread database rows into customer responses.
export function toCustomerOrder(order) {
  if (!order) return null;

  return {
    orderNumber: order.orderNumber,
    company: order.company,
    companyName: order.companyName,
    customerName: order.customerName,
    projectName: order.projectName,
    productName: order.productName,
    quantity: order.quantity,
    orderDate: order.orderDate,
    targetDate: order.targetDate,
    paymentStatus: order.paymentStatus,
    paymentStatusLabel: order.paymentStatusLabel,
    orderStatus: order.orderStatus,
    orderStatusLabel: order.orderStatusLabel,
    proofStatus: order.proofStatus,
    proofStatusLabel: order.proofStatusLabel,
    productStatus: order.productStatus,
    productStatusLabel: order.productStatusLabel,
    publicNote: order.publicNote,
    firstTimelineNote: order.firstTimelineNote,
    trackingNumber: order.trackingNumber,
    timelineEvents: (order.timelineEvents || [])
      .filter((event) => event.isCustomerVisible)
      .map((event) => ({
        title: event.title,
        description: event.description,
        createdAt: event.createdAt,
        isCustomerVisible: true,
      })),
  };
}

