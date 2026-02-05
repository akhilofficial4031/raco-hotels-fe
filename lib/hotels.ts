import { ApiResponse } from "@/types/api";
import {
  AttractionResponse,
  AvailableRoomTypesApiResponse,
  HotelDetailsResponse,
  HotelResponse,
  RoomType,
  RoomTypesApiResponse,
} from "@/types/hotel";
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
 * Fetch a specific hotel by ID
 * @param id - Hotel ID
 * @returns Promise<ApiResponse<HotelDetailsResponse>>
 * */
export async function getHotelById(
  id: number
): Promise<ApiResponse<HotelDetailsResponse>> {
  return getFetcher<ApiResponse<HotelDetailsResponse>>(`/api/hotels/${id}`);
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
        addressLine2: hotel.addressLine2,
      }));

    return activeHotels;
  } catch (error) {
    console.error("[getHotelsForNavigation] Error fetching hotels:", error);
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
  } catch (_error) {
    // Error logging removed
    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetch all room types for a specific hotel by ID
 * @param hotelId - The ID of the hotel
 * @returns Promise<RoomTypesApiResponse>
 */
export async function getHotelRoomTypes(
  hotelId: number
): Promise<RoomTypesApiResponse> {
  return getFetcher<RoomTypesApiResponse>(`/api/room-types/hotel/${hotelId}`);
}

/**
 * Fetch a specific room type by ID
 * @param id - Room Type ID
 * @returns Promise<ApiResponse<{ roomType: RoomType }>>
 * */
export async function getRoomTypeById(
  id: number
): Promise<ApiResponse<{ roomType: RoomType }>> {
  return getFetcher<ApiResponse<{ roomType: RoomType }>>(
    `/api/room-types/${id}`
  );
}

/**
 * Fetches available room types for a given hotel and date range.
 * @param hotelId - The ID of the hotel.
 * @param checkInDate - The check-in date in 'YYYY-MM-DD' format.
 * @param checkOutDate - The check-out date in 'YYYY-MM-DD' format.
 * @param roomTypeId - (Optional) The ID of the room type to check.
 * @returns A promise that resolves to the availability API response.
 */
export async function getAvailableRoomTypesForHotel(
  hotelId: number,
  checkInDate: string,
  checkOutDate: string,
  roomTypeId?: number,
  numberOfRooms?: number
): Promise<AvailableRoomTypesApiResponse> {
  const params = new URLSearchParams({
    hotelId: hotelId.toString(),
    checkInDate,
    checkOutDate,
    numberOfRooms: numberOfRooms?.toString() ?? "1",
  });

  if (roomTypeId) {
    params.append("roomTypeId", roomTypeId.toString());
  }

  const endpoint = `/api/rooms/availability?${params.toString()}`;
  try {
    const response = await getFetcher<AvailableRoomTypesApiResponse>(endpoint);
    return response;
  } catch (_error) {
    // console.error("Error fetching available room types:", error);
    // Re-throw the error to be handled by the calling component
    throw new Error("Failed to fetch available room types");
  }
}

export async function getAttractionBySlug(
  slug: string
): Promise<ApiResponse<AttractionResponse>> {
  return getFetcher<ApiResponse<AttractionResponse>>(
    `/api/attractions/slug/${slug}`
  );
}

export async function getAllAttractions(): Promise<
  ApiResponse<AttractionResponse[]>
> {
  return getFetcher<ApiResponse<AttractionResponse[]>>(`/api/attractions`);
}
