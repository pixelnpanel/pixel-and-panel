import PolicyPage from "@/components/policy/PolicyPage";
import { getPolicyMetadata, legalPolicies } from "@/lib/legal-policies";

const policy = legalPolicies.websiteServiceTerms;

export const metadata = getPolicyMetadata(policy);

export default function WebsiteServiceTermsPage() {
  return <PolicyPage policy={policy} />;
}
