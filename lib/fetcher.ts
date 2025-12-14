// lib/fetcher.ts

// Read API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * Fetch with retry logic for better reliability
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  retries = 2
): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      const isLastAttempt = i === retries;

      if (isLastAttempt) {
        console.error(
          `Fetch failed after ${retries + 1} attempts:`,
          url,
          error
        );
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, i), 5000);
      console.warn(
        `Fetch attempt ${i + 1} failed for ${url}, retrying in ${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Fetch failed");
}

export async function getFetcher<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  return fetchWithRetry<T>(url, {
    cache: "no-store", // Disable caching for dynamic data
    next: { revalidate: 0 }, // Revalidate on every request
    signal: AbortSignal.timeout(10000), // 10 second timeout per attempt
  });
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
