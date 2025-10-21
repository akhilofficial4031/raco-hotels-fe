import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts R2 bucket URLs to HTTP URLs
 * @param imageUrl - The image URL from the API (may contain r2:// protocol)
 * @param fallbackUrl - Fallback URL if the image URL is invalid (default: '/placeholder-hotel.jpg')
 * @returns HTTP URL for the image
 */
export function getImageUrl(
  imageUrl?: string,
  fallbackUrl: string = "/placeholder-hotel.jpg"
): string {
  if (!imageUrl) {
    return fallbackUrl;
  }

  // If the URL already starts with http/https, return as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // If it's an R2 URL, convert it to HTTP URL
  if (imageUrl.startsWith("r2://")) {
    const bucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

    if (!bucketBaseUrl) {
      return fallbackUrl;
    }

    // Remove r2:// prefix and construct HTTP URL
    const path = imageUrl.replace("r2://", "");
    return `${bucketBaseUrl}/${path}`;
  }

  // If it's a relative path, return as is (assuming it's a local asset)
  return imageUrl;
}
