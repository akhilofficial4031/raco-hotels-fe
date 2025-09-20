import { getFetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/api";
import { HotelResponse } from "@/types/hotel";
import RightCarousel from "@/components/client/RightCarousel";

export default async function HotelList() {
  const hotels = await getFetcher<ApiResponse<HotelResponse>>("/api/hotels");

  return (
    <div>
      <RightCarousel hotels={hotels.data.hotels} />
    </div>
  );
}
