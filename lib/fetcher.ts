// lib/fetcher.ts

import { LandingPageData } from "@/types";
import { performanceMonitor } from "./performance";

// Read API base URL from environment variable or use localhost for development
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");

export async function getFetcher<T>(endpoint: string): Promise<T> {
  return performanceMonitor.measureApiCall(`GET ${endpoint}`, async () => {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching ${url}: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  });
}

// Specific fetcher for landing page data with proper typing
export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    return await getFetcher<LandingPageData>("/api/landing-page");
  } catch (_error) {
    throw new Error("Unable to load page content. Please try again later.");
  }
}

export async function postFetcher<T, Body = unknown>(
  endpoint: string,
  body: Body
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error posting to ${url}: ${response.statusText}`);
  }

  return response.json();
}
