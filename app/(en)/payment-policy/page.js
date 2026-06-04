import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyMetadata, legalPolicies } from "@/lib/legal-policies";

const policy = legalPolicies.paymentPolicy;

export const metadata = getPolicyMetadata(policy);

export default function PaymentPolicyPage() {
  return <PolicyPage policy={policy} />;
}
