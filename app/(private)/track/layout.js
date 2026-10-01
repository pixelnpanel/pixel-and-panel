import { createOrderTrackingMetadata } from "@/lib/order-tracking-metadata";

export const metadata = createOrderTrackingMetadata();

export default function TrackLayout({ children }) {
  return children;
}
