import { ApiResponse } from "@/types/api";
import { PolicyPages } from "@/types/policy-page";
import { getFetcher } from "./fetcher";

export async function getPolicyPageContent(): Promise<PolicyPages> {
  try {
    const response: ApiResponse<PolicyPages> = await getFetcher<
      ApiResponse<PolicyPages>
    >("/api/public/policy-pages");
    if (!response.success || !response.data) {
      throw new Error("Invalid CMS API response");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching policy pages:", error);
    return { privacyPolicy: "", termsAndConditions: "", cookiePolicy: "" };
  }
}
