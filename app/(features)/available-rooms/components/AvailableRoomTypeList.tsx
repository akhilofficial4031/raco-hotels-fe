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
      <h2 className="text-4xl font-cinzel text-text-dark text-center !my-12">
        Available Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roomTypes.map((roomType) => (
          <div
            key={roomType.roomTypeId}
            className="bg-white shadow-lg overflow-hidden transform hover:shadow-xl transition-transform duration-300"
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
            <div className="p-6">
              <h3 className="text-2xl font-semibold font-cinzel text-text-dark">
                {roomType.roomTypeName}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <i className="fa fa-users mr-2 text-gray-500" />
                  <span>
                    Sleeps {roomType.baseOccupancy} - {roomType.maxOccupancy}
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-bed mr-2 text-gray-500" />
                  <span>{roomType.bedType}</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-expand mr-2 text-gray-500" />
                  <span>{roomType.sizeSqft} sqft</span>
                </div>
                <div className="flex items-center">
                  <i
                    className={`fa ${
                      roomType.smokingAllowed ? "fa-smoking" : "fa-smoking-ban"
                    } mr-2 text-gray-500`}
                  />
                  <span>
                    {roomType.smokingAllowed ? "Smoking" : "Non-Smoking"}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-2 items-center mb-3">
                  {/* Always reserve space for strike-through price to maintain consistent card heights */}
                  <p className="text-sm font-normal text-gray-500 h-5 !mb-0 font-dm-sans">
                    {roomType.offerPrice !== null &&
                    roomType.offerPrice !== undefined ? (
                      <span className="line-through text-lg">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: roomType.currencyCode,
                          minimumFractionDigits: 0,
                        }).format(roomType.basePriceCents / 100)}
                      </span>
                    ) : null}
                  </p>
                  <p
                    className={`text-2xl font-semibold !mb-0 font-dm-sans ${
                      roomType.offerPrice !== null &&
                      roomType.offerPrice !== undefined
                        ? "text-green-600"
                        : "text-text-light"
                    }`}
                  >
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: roomType.currencyCode,
                      minimumFractionDigits: 0,
                    }).format(
                      roomType.offerPrice !== null &&
                        roomType.offerPrice !== undefined
                        ? roomType.offerPrice / 100
                        : roomType.basePriceCents / 100
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleProceedToBooking(roomType)}
                className="bg-primary cursor-pointer w-full text-sm !text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-300"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomTypeList;
