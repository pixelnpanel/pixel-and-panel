import ShippingPolicy, { shippingMetadata } from "@/components/policy/ShippingPolicy";

export const metadata = shippingMetadata("es");

export default function SpanishShippingPolicyPage() {
  return <ShippingPolicy locale="es" />;
}
