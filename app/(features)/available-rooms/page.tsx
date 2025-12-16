"use client";
import RacoLoader from "@/app/components/RacoLoader";
import { getAvailableRoomTypesForHotel, getHotelById } from "@/lib/hotels";
import { getImageUrl } from "@/lib/utils";
import { AvailableRoomType, Hotel } from "@/types/hotel";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import AvailableRoomTypeList from "./components/AvailableRoomTypeList";

const AvailableRoomsPageContent = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const numberOfRooms = searchParams.get("numberOfRooms");

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [availableRooms, setAvailableRooms] = useState<AvailableRoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!hotelId || !checkIn || !checkOut || isFetching.current) {
        return;
      }

      try {
        isFetching.current = true;
        setLoading(true);
        const hotelRes = await getHotelById(parseInt(hotelId, 10));
        if (hotelRes.data.hotel) {
          setHotel(hotelRes.data.hotel);
        } else {
          setError("Hotel not found.");
        }

        const availableRoomsRes = await getAvailableRoomTypesForHotel(
          parseInt(hotelId, 10),
          checkIn,
          checkOut,
          undefined,
          parseInt(numberOfRooms ?? "1", 10)
        );

        if (availableRoomsRes.success) {
          setAvailableRooms(availableRoomsRes.data.roomTypes);
        } else {
          setError("Could not fetch available rooms.");
        }
      } catch {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchData();
  }, [hotelId, checkIn, checkOut]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <RacoLoader />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!hotel) return <div>Could not load booking information.</div>;

  return (
    <div className="bg-background-light min-h-screen dm-sans">
      {hotel.images?.length > 0 && (
        <div
          className="h-[50vh] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${getImageUrl(hotel.images[0].url)})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="container mx-auto h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel text-white z-10">
              Book {hotel.name}
            </h1>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel text-white z-10">
              Available Rooms
            </h1>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {availableRooms.length > 0 && hotelId && checkIn && checkOut ? (
          <AvailableRoomTypeList
            roomTypes={availableRooms}
            hotelId={parseInt(hotelId, 10)}
            checkIn={checkIn}
            checkOut={checkOut}
            numberOfRooms={parseInt(numberOfRooms ?? "1", 10)}
          />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">No Rooms Available</h2>
            <p className="mt-2 text-gray-600">
              There are no rooms available for the selected dates. Please try
              different dates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const AvailableRoomsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <RacoLoader />
        </div>
      }
    >
      <AvailableRoomsPageContent />
    </Suspense>
  );
};

export default AvailableRoomsPage;
