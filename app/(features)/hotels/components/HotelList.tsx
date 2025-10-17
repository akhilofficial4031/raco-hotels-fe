import RightCarousel from "@/components/client/RightCarousel";
import { getFetcher } from "@/lib/fetcher";
import { processImageUrl } from "@/lib/utils";
import { ApiResponse } from "@/types/api";
import { HotelResponse } from "@/types/hotel";

export default async function HotelList() {
  const hotelResponse =
    await getFetcher<ApiResponse<HotelResponse>>("/api/hotels");
  const baseUrl = process.env.NEXT_BUCKET_URL ?? "";

  // Process image URLs on server-side for security (keeps bucket URL hidden from client)
  const hotelsWithProcessedImages = hotelResponse.data.hotels.map((hotel) => ({
    ...hotel,
    processedImageUrl: processImageUrl(hotel.images[0]?.url, baseUrl),
  }));

  return (
    <div>
      <RightCarousel hotels={hotelsWithProcessedImages} />
    </div>
  );
}
