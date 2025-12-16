"use client";
import React, { Suspense, useEffect, useState } from "react";
import BookingSummary from "./components/BookingSummary";
import BookingStepper from "./components/BookingStepper";
import { useSearchParams } from "next/navigation";
import {
  getHotelById,
  getRoomTypeById,
  getAvailableRoomTypesForHotel,
} from "@/lib/hotels";
import { Hotel, RoomType, AvailableRoomType } from "@/types/hotel";
import RacoLoader from "@/app/components/RacoLoader";
import { useRouter } from "next/navigation";

const NewBookingsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const roomTypeId = searchParams.get("roomTypeId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const numberOfRooms = searchParams.get("numberOfRooms") ?? "1";

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [_availableRooms, setAvailableRooms] = useState<AvailableRoomType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BUCKET_BASE_URL = process.env.NEXT_PUBLIC_BUCKET_URL ?? "";
  const [roomIds, setRoomIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!hotelId || !roomTypeId || !checkIn || !checkOut) {
        setError("Missing hotel, room type, or date information.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const hotelRes = await getHotelById(parseInt(hotelId, 10));
        const roomTypeRes = await getRoomTypeById(parseInt(roomTypeId, 10));
        const availableRoomResponse = await getAvailableRoomTypesForHotel(
          parseInt(hotelId, 10),
          checkIn,
          checkOut,
          parseInt(roomTypeId, 10),
          parseInt(numberOfRooms ?? "1", 10)
        );
        if (availableRoomResponse.success) {
          const numRooms = parseInt(numberOfRooms, 10);
          const availableRooms = availableRoomResponse.data.roomTypes[0].rooms;

          let selectedRoomIds: number[] = [];

          if (numRooms > 1) {
            // Get the first numberOfRooms room IDs
            selectedRoomIds = availableRooms
              .slice(0, numRooms)
              .map((room) => room.roomId);
          } else {
            // Get just the first room ID
            selectedRoomIds = [availableRooms[0].roomId];
          }

          setRoomIds(selectedRoomIds);
        } else {
          setError("Could not fetch available room.");
        }

        if (hotelRes.data.hotel) {
          // Prepend base URL to hotel images
          const hotelWithFullImageUrls = {
            ...hotelRes.data.hotel,
            images: hotelRes.data.hotel.images.map((image) => ({
              ...image,
              url: `${BUCKET_BASE_URL}/${image.url.replace("r2://", "")}`,
            })),
          };
          setHotel(hotelWithFullImageUrls);
        } else {
          setError("Hotel not found.");
        }

        if (roomTypeRes.data?.roomType) {
          const roomTypeData = roomTypeRes.data.roomType;
          setRoomType(roomTypeData);
        } else {
          setError("Room type not found.");
        }

        // Check room availability
        const availableRoomsRes = await getAvailableRoomTypesForHotel(
          parseInt(hotelId, 10),
          checkIn,
          checkOut
        );

        if (availableRoomsRes.success) {
          setAvailableRooms(availableRoomsRes.data.roomTypes);
        } else {
          setError("Could not fetch available rooms.");
        }
      } catch (_err) {
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hotelId, roomTypeId, checkIn, checkOut, BUCKET_BASE_URL, numberOfRooms]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <RacoLoader />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!hotel || !roomType)
    return <div>Could not load booking information.</div>;

  return (
    <div className="bg-gray-50 min-h-screen montserrat">
      {hotel.images?.length > 0 && (
        <div
          className="h-[50vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${hotel.images[0].url})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="container mx-auto h-full flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl cinzel text-white z-10">
              Book {hotel.name}
            </h1>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            className="text-gray-700 hover:text-gray-900 font-semibold flex items-center"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingStepper
              hotel={hotel}
              roomType={roomType}
              roomIds={roomIds ?? []}
              checkInDate={checkIn}
              checkOutDate={checkOut}
              numAdults={parseInt(searchParams.get("adults") ?? "1", 10)}
              numChildren={parseInt(searchParams.get("children") ?? "0", 10)}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-[130px]">
              <BookingSummary
                hotel={hotel}
                roomType={roomType}
                checkIn={checkIn}
                checkOut={checkOut}
                numberOfRooms={parseInt(numberOfRooms, 10)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewBookingsPage = () => {
  return (
    <Suspense fallback={<RacoLoader />}>
      <NewBookingsPageContent />
    </Suspense>
  );
};

export default NewBookingsPage;
