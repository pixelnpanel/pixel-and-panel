import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyMetadata, legalPolicies } from "@/lib/legal-policies";

const policy = legalPolicies.legalNotice;

export const metadata = getPolicyMetadata(policy);

export default function LegalNoticePage() {
  return <PolicyPage policy={policy} />;
}
