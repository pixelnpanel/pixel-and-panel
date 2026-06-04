import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyMetadata, legalPolicies } from "@/lib/legal-policies";

const policy = legalPolicies.proofApprovalPolicy;

export const metadata = getPolicyMetadata(policy);

export default function ProofApprovalPolicyPage() {
  return <PolicyPage policy={policy} />;
}
