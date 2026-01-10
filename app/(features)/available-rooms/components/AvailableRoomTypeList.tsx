"use client";
import { getImageUrl } from "@/lib/utils";
import { AvailableRoomType } from "@/types/hotel";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button } from "antd";
import RoomImageCarousel from "@/app/(features)/hotels/[slug]/components/RoomImageCarousel";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

interface AvailableRoomTypeListProps {
  roomTypes: AvailableRoomType[];
  hotelId: number;
  checkIn: string;
  checkOut: string;
  numberOfRooms: number;
}

const AvailableRoomTypeList: React.FC<AvailableRoomTypeListProps> = ({
  roomTypes,
  hotelId,
  checkIn,
  checkOut,
  numberOfRooms,
}) => {
  const router = useRouter();
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoomType | null>(
    null
  );

  const handleProceedToBooking = (roomType: AvailableRoomType) => {
    const params = new URLSearchParams({
      hotelId: hotelId.toString(),
      roomTypeId: roomType.roomTypeId.toString(),
      checkIn,
      checkOut,
      numberOfRooms: numberOfRooms.toString(),
    });
    router.push(`/new-bookings?${params.toString()}`);
  };

  const handleShowAllAmenities = (roomType: AvailableRoomType) => {
    setSelectedRoom(roomType);
    setShowAllAmenities(true);
  };

  const handleCloseAllAmenities = () => {
    setSelectedRoom(null);
    setShowAllAmenities(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl md:text-5xl font-cinzel text-text-dark text-center !mb-16 relative inline-block w-full">
        <span className="relative z-10">Available Rooms</span>
      </h2>
      <div className="flex flex-col gap-16">
        {roomTypes.map((roomType, index) => (
          <AnimatedContainer
            key={roomType.roomTypeId}
            animationName="fadeUp"
            delay={index * 0.2}
          >
            <div
              key={roomType.roomTypeId}
              className="group bg-background-ultra-light rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col lg:flex-row min-h-[400px]"
            >
              {/* Image Section - Left Side */}
              <div className="relative w-full lg:w-[45%] h-72 lg:h-auto overflow-hidden">
                {roomType.images && roomType.images.length > 1 ? (
                  <div className="h-full w-full">
                    <RoomImageCarousel slides={roomType.images} />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={getImageUrl(roomType.images?.[0]?.url)}
                      alt={roomType.images?.[0]?.alt ?? roomType.roomTypeName}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-700 "
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                )}
              </div>

              {/* Details Section - Right Side */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between relative ">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-gray-100">
                    <h3 className="text-2xl md:text-3xl font-cinzel text-text-dark font-medium group-hover:text-primary transition-colors duration-300">
                      {roomType.roomTypeName}
                    </h3>
                  </div>

                  <p className="text-gray-600 font-dm-sans mb-6 leading-relaxed line-clamp-3 lg:line-clamp-4 text-base text-justify">
                    {roomType.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 text-sm text-gray-700 font-dm-sans mb-6">
                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-8 h-8 rounded-full bg-background-light flex items-center justify-center text-primary group-hover/icon:bg-primary group-hover/icon:text-white transition-colors duration-300">
                        <i className="fa fa-users" />
                      </div>
                      <span className="font-medium text-text-light">
                        {roomType.baseOccupancy} - {roomType.maxOccupancy}{" "}
                        Guests
                      </span>
                    </div>

                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-8 h-8 rounded-full bg-background-light flex items-center justify-center text-primary group-hover/icon:bg-primary group-hover/icon:text-white transition-colors duration-300">
                        <i className="fa fa-bed" />
                      </div>
                      <span className="font-medium text-text-light">
                        {roomType.bedType ? roomType.bedType : "-"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-8 h-8 rounded-full bg-background-light flex items-center justify-center text-primary group-hover/icon:bg-primary group-hover/icon:text-white transition-colors duration-300">
                        <i className="fa fa-expand" />
                      </div>
                      <span className="font-medium text-text-light">
                        {roomType.sizeSqft} sqft
                      </span>
                    </div>

                    <div className="flex items-center gap-2 group/icon">
                      <div className="w-8 h-8 rounded-full bg-background-light flex items-center justify-center text-primary group-hover/icon:bg-primary group-hover/icon:text-white transition-colors duration-300">
                        <i
                          className={`fa ${
                            roomType.smokingAllowed ? "fa-check" : "fa-ban"
                          }`}
                        />
                      </div>
                      <span className="font-medium text-text-light">
                        {roomType.smokingAllowed ? "Smoking" : "Non-Smoking"}
                      </span>
                    </div>
                  </div>

                  {roomType.amenities && roomType.amenities.length >= 1 ? (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {roomType.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity.amenityId}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background-ultra-light text-text-light border border-border/30"
                          >
                            <i
                              className={`fa ${amenity.icon} mr-1.5 text-primary`}
                              aria-hidden="true"
                            />
                            {amenity.name}
                          </span>
                        ))}
                        {roomType.amenities.length > 4 && (
                          <button
                            onClick={() => handleShowAllAmenities(roomType)}
                            className="inline-flex items-center px-3 py-1 rounded-full !text-xs font-medium bg-background-light text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                          >
                            +{roomType.amenities.length - 4} more
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-auto pt-6 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-dm-sans mb-1">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-2">
                      {roomType.offerPrice !== null &&
                        roomType.offerPrice !== undefined && (
                          <span className="line-through text-gray-400 text-sm font-dm-sans">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: roomType.currencyCode,
                              minimumFractionDigits: 0,
                            }).format(roomType.basePriceCents / 100)}
                          </span>
                        )}
                      <span className="text-3xl font-cinzel font-bold text-primary">
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
                      </span>
                      <span className="text-sm text-gray-500 font-dm-sans">
                        / night
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleProceedToBooking(roomType)}
                    className="w-full md:w-auto bg-primary !text-white px-8 py-3 rounded-full hover:bg-primary-light hover:text-text-button transition-all duration-300 font-medium font-dm-sans shadow-lg hover:shadow-primary/30 active:transform active:scale-95"
                  >
                    Proceed to Booking
                  </button>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        ))}
      </div>

      {showAllAmenities ? (
        <Modal
          title={`All Amenities for ${selectedRoom?.roomTypeName}`}
          open={showAllAmenities}
          onCancel={handleCloseAllAmenities}
          footer={[
            <Button key="back" onClick={handleCloseAllAmenities}>
              Close
            </Button>,
          ]}
          centered
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mt-3">
              {selectedRoom?.amenities.map((amenity) => (
                <div
                  key={amenity.amenityId}
                  className="flex items-center gap-2"
                >
                  <i
                    className={`fa ${amenity.icon} text-gray-500 !flex !items-center justify-center`}
                    aria-hidden="true"
                  />
                  <span className="capitalize">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default AvailableRoomTypeList;
