import { createOrderTrackingMetadata } from "@/lib/order-tracking-metadata";
import TrackOrderClient from "./TrackOrderClient";

export const metadata = createOrderTrackingMetadata({
  alternates: {
    canonical: "https://www.pixelnpanel.com/track-order",
    languages: {
      "en-US": "https://www.pixelnpanel.com/track-order",
      "es-US": "https://www.pixelnpanel.com/es/rastrear-pedido",
    },
  },
  url: "https://www.pixelnpanel.com/track-order",
});

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
