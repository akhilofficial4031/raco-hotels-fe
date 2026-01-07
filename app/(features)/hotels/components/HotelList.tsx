// import RightCarousel from "@/components/client/RightCarousel";
import { getActiveHotels } from "@/lib/hotels";
import HotelListingGrid from "./HotelListingGrid";

export default async function HotelList() {
  const hotels = await getActiveHotels();

  return (
    <div>
      {/* <RightCarousel hotels={hotels} /> */}
      <HotelListingGrid hotels={hotels} showTitles={false} />
    </div>
  );
}
