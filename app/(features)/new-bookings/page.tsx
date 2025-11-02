"use client";
import React, { useEffect, useState } from "react";
import BookingForm from "./components/BookingForm";
import PaymentDetails from "./components/PaymentDetails";
import BookingSummary from "./components/BookingSummary";
import { useSearchParams } from "next/navigation";
import { getHotelById, getRoomTypeById } from "@/lib/hotels";
import { Hotel, RoomType } from "@/types/hotel";
import RacoLoader from "@/app/components/RacoLoader";

const NewBookingsPageContent = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const roomTypeId = searchParams.get("roomTypeId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const BUCKET_BASE_URL = process.env.NEXT_PUBLIC_BUCKET_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      if (!hotelId || !roomTypeId) {
        setError("Missing hotel or room type information.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const hotelRes = await getHotelById(parseInt(hotelId, 10));
        const roomTypeRes = await getRoomTypeById(parseInt(roomTypeId, 10));
        console.log("hotelRes", hotelRes);

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
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch booking details:", err);
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hotelId, roomTypeId]);

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
    <div className="bg-background-light min-h-screen dm-sans">
      {hotel.images?.length > 0 && (
        <div
          className="h-[50vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${hotel.images[0].url})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="container mx-auto h-full flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel text-white z-10">
              Booking confirmation
            </h1>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <BookingForm />
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-8">
              <BookingSummary
                hotel={hotel}
                roomType={roomType}
                checkIn={checkIn}
                checkOut={checkOut}
              />
              <PaymentDetails roomType={roomType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewBookingsPage = () => {
  return <NewBookingsPageContent />;
};

export default NewBookingsPage;
