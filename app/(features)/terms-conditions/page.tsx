import PolicyPage from "@/app/components/PolicyPage";
import { getPolicyPageContent } from "@/lib/policy-page";

export default async function Page() {
  const policyPages = await getPolicyPageContent();
  const content = policyPages.termsAndConditions;
  return <PolicyPage params={{ content, heading: "Terms & Conditions" }} />;
}
