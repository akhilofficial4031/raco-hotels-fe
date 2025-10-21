import RightCarousel from "@/components/client/RightCarousel";
import { getActiveHotels } from "@/lib/hotels";

export default async function HotelList() {
  const hotels = await getActiveHotels();

  return (
    <div>
      <RightCarousel hotels={hotels} />
    </div>
  );
}
