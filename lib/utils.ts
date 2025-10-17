import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Processes an R2 image URL by removing the r2:// prefix and prepending the bucket base URL
 * This function should only be used in server components where process.env.NEXT_BUCKET_URL is available
 *
 * @param imageUrl - The raw image URL (may have r2:// prefix)
 * @param baseUrl - The bucket base URL (from process.env.NEXT_BUCKET_URL)
 * @returns The fully resolved image URL
 */
export function processImageUrl(
  imageUrl: string | undefined,
  baseUrl: string
): string {
  if (!imageUrl) return "";

  // Remove r2:// prefix and any leading slashes from the image URL
  const cleanUrl = imageUrl.replace("r2://", "").replace(/^\//, "");

  // Remove any trailing slashes from the base URL
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");

  return cleanBaseUrl ? `${cleanBaseUrl}/${cleanUrl}` : cleanUrl;
}

/**
 * Processes multiple image URLs
 *
 * @param images - Array of image objects with url property
 * @param baseUrl - The bucket base URL
 * @returns Array of images with processed URLs
 */
export function processImageUrls<T extends { url: string }>(
  images: T[],
  baseUrl: string
): (T & { processedUrl: string })[] {
  return images.map((img) => ({
    ...img,
    processedUrl: processImageUrl(img.url, baseUrl),
  }));
}
