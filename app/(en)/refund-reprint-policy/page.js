import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyMetadata, legalPolicies } from "@/lib/legal-policies";

const policy = legalPolicies.refundReprintPolicy;

export const metadata = getPolicyMetadata(policy);

export default function RefundReprintPolicyPage() {
  return <PolicyPage policy={policy} />;
}
