"use client";
import RacoLoader from "@/app/components/RacoLoader";
import { getAvailableRoomTypesForHotel, getHotelById } from "@/lib/hotels";
import { getImageUrl } from "@/lib/utils";
import { AvailableRoomType, Hotel } from "@/types/hotel";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AvailableRoomTypeList from "./components/AvailableRoomTypeList";

const AvailableRoomsPageContent = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const numberOfRooms = searchParams.get("numberOfRooms");
  const adults = parseInt(searchParams.get("adults") ?? "1", 10);
  const children = parseInt(searchParams.get("children") ?? "0", 10);
  const childAges = (searchParams.get("childAges") ?? "")
    .split(",")
    .filter(Boolean)
    .map(Number);
  const effectiveAdults = adults + childAges.filter((age) => age > 10).length;

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [availableRooms, setAvailableRooms] = useState<AvailableRoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hotelId || !checkIn || !checkOut) return;

    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setHotel(null);
        setAvailableRooms([]);
        setError(null);

        const [hotelRes, availableRoomsRes] = await Promise.all([
          getHotelById(parseInt(hotelId, 10)),
          getAvailableRoomTypesForHotel(
            parseInt(hotelId, 10),
            checkIn,
            checkOut,
            undefined,
            parseInt(numberOfRooms ?? "1", 10)
          ),
        ]);

        if (cancelled) return;

        if (hotelRes.data.hotel) {
          setHotel(hotelRes.data.hotel);
        } else {
          setError("Hotel not found.");
        }

        if (availableRoomsRes.success) {
          setAvailableRooms(availableRoomsRes.data.roomTypes);
        } else {
          setError("Could not fetch available rooms.");
        }
      } catch {
        if (!cancelled) setError("Failed to fetch data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [hotelId, checkIn, checkOut, numberOfRooms]);

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
    <div className="bg-white min-h-screen dm-sans">
      {hotel.images?.length > 0 && (
        <div
          className="h-[50vh] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${getImageUrl(hotel.images[0].url)})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="container mx-auto h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl text-center md:text-left sm:text-5xl lg:text-6xl font-cinzel text-white z-10">
              {hotel.name}
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
            adults={adults}
            numberOfChildren={children}
            childAges={childAges}
            effectiveAdults={effectiveAdults}
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
