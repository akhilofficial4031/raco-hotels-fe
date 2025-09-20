// lib/fetcher.ts

// Read API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function getFetcher<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log("url", url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }

  return response.json();
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
