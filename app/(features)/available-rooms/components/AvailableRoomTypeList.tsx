"use client";
import { getImageUrl } from "@/lib/utils";
import { AvailableRoomType } from "@/types/hotel";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import RoomImageCarousel from "@/app/(features)/hotels/[slug]/components/RoomImageCarousel";

interface AvailableRoomTypeListProps {
  roomTypes: AvailableRoomType[];
  hotelId: number;
  checkIn: string;
  checkOut: string;
}

const AvailableRoomTypeList: React.FC<AvailableRoomTypeListProps> = ({
  roomTypes,
  hotelId,
  checkIn,
  checkOut,
}) => {
  const router = useRouter();

  const handleProceedToBooking = (roomType: AvailableRoomType) => {
    const params = new URLSearchParams({
      hotelId: hotelId.toString(),
      roomTypeId: roomType.roomTypeId.toString(),
      checkIn,
      checkOut,
    });
    router.push(`/new-bookings?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roomTypes.map((roomType) => (
          <div
            key={roomType.roomTypeId}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:shadow-xl transition-transform duration-300"
          >
            <div className="relative h-64">
              {roomType.images && roomType.images.length > 1 ? (
                <RoomImageCarousel slides={roomType.images} />
              ) : (
                <Image
                  src={getImageUrl(roomType.images?.[0]?.url)}
                  alt={roomType.images?.[0]?.alt ?? roomType.roomTypeName}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="p-6 mt-2">
              <h3 className="text-2xl font-semibold font-serif text-primary capitalize">
                {roomType.roomTypeName}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <i className="fa fa-users mr-2 text-primary" />
                  <span>
                    Sleeps {roomType.baseOccupancy} - {roomType.maxOccupancy}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-bed mr-2 text-primary" />
                  <span>{roomType.bedType}</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-expand mr-2 text-primary" />
                  <span>{roomType.sizeSqft} sqft</span>
                </div>
                <div className="flex items-center">
                  <i
                    className={`fa ${
                      roomType.smokingAllowed ? "fa-smoking" : "fa-smoking-ban"
                    } mr-2 text-primary`}
                  />
                  <span>
                    {roomType.smokingAllowed ? "Smoking" : "Non-Smoking"}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: roomType.currencyCode,
                    minimumFractionDigits: 0,
                  }).format(roomType.basePriceCents / 100)}
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => handleProceedToBooking(roomType)}
                  className="bg-primary cursor-pointer text-sm text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-300"
                >
                  Proceed to Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomTypeList;
