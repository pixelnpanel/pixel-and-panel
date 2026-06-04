import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyMetadata, legalPolicies } from "@/lib/legal-policies";

const policy = legalPolicies.termsAndConditions;

export const metadata = getPolicyMetadata(policy);

export default function TermsAndConditionsPage() {
  return <PolicyPage policy={policy} />;
}
