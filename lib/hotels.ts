import { ApiResponse } from "@/types/api";
import { HotelDetailsResponse, HotelResponse } from "@/types/hotel";
import { getFetcher } from "./fetcher";

/**
 * Fetch all hotels with optional pagination
 * @param page - Page number (optional)
 * @param limit - Items per page (optional)
 * @returns Promise<ApiResponse<HotelResponse>>
 */
export async function getHotels(
  page?: number,
  limit?: number
): Promise<ApiResponse<HotelResponse>> {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.append("page", page.toString());
  }

  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }

  const endpoint = `/api/hotels${params.toString() ? `?${params.toString()}` : ""}`;

  return getFetcher<ApiResponse<HotelResponse>>(endpoint);
}

/**
 * Fetch a specific hotel by slug
 * @param slug - Hotel slug
 * @returns Promise<ApiResponse<HotelDetailsResponse>>
 */
export async function getHotelBySlug(
  slug: string
): Promise<ApiResponse<HotelDetailsResponse>> {
  return getFetcher<ApiResponse<HotelDetailsResponse>>(
    `/api/hotels/slug/${slug}`
  );
}

/**
 * Fetch hotels for navigation purposes (active hotels only)
 * This is optimized for header navigation and returns a simplified structure
 */
export async function getHotelsForNavigation() {
  try {
    const response = await getHotels();

    // Filter only active hotels and return simplified data for navigation
    const activeHotels = response.data.hotels
      .filter((hotel) => hotel.isActive === 1)
      .map((hotel) => ({
        id: hotel.id,
        name: hotel.name,
        slug: hotel.slug,
        city: hotel.city,
        state: hotel.state,
      }));

    return activeHotels;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching hotels for navigation:", error);
    // Return empty array as fallback to prevent header from breaking
    return [];
  }
}

/**
 * Fetch all active hotels with full data including images
 * This returns complete hotel objects for components that need images
 */
export async function getActiveHotels() {
  try {
    const response = await getHotels();

    // Filter only active hotels and return full data
    const activeHotels = response.data.hotels.filter(
      (hotel) => hotel.isActive === 1
    );

    return activeHotels;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching active hotels:", error);
    // Return empty array as fallback
    return [];
  }
}
