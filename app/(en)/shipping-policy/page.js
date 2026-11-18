import ShippingPolicy, { shippingMetadata } from "@/components/policy/ShippingPolicy";

export const metadata = shippingMetadata("en");

export default function ShippingPolicyPage() {
  return <ShippingPolicy />;
}
