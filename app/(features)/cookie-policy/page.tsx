import PolicyPage from "@/app/components/PolicyPage";
import { getPolicyPageContent } from "@/lib/policy-page";

export default async function Page() {
  const policyPages = await getPolicyPageContent();
  const content = policyPages.cookiePolicy;
  return <PolicyPage params={{ content, heading: "Cookie Policy" }} />;
}
