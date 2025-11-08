"use client";
import { getImageUrl } from "@/lib/utils";
import { RoomType, AvailableRoom } from "@/types/hotel";
import { checkRoomAvailability } from "@/lib/hotels";
import Image from "next/image";
import React, { useState } from "react";
import { DatePicker, Button, Modal, Spin, message } from "antd";
import dayjs from "dayjs";
import RoomImageCarousel from "./RoomImageCarousel";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

interface RoomTypesProps {
  roomTypes: RoomType[];
  hotelId: number;
}

const RoomTypes: React.FC<RoomTypesProps> = ({ roomTypes, hotelId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
    dayjs().add(1, "day"),
    dayjs().add(2, "day"),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const router = useRouter();

  const showModal = (roomType: RoomType) => {
    setSelectedRoom(roomType);
    setIsModalVisible(true);
  };

  const handleCheckAvailability = async () => {
    if (!selectedRoom || !dates[0] || !dates[1]) {
      message.error("Please select valid dates");
      return;
    }

    setIsLoading(true);
    try {
      const checkInDate = dates[0].format("YYYY-MM-DD");
      const checkOutDate = dates[1].format("YYYY-MM-DD");

      const response = await checkRoomAvailability(
        hotelId,
        selectedRoom.id,
        checkInDate,
        checkOutDate
      );

      if (response.success && response.data.results.length > 0) {
        setAvailableRooms(response.data.results);
        setIsAvailable(true);
        message.success(` available for your selected dates!`);
      } else {
        setAvailableRooms([]);
        setIsAvailable(false);
        message.warning(
          "No rooms available for your selected dates. Please try different dates."
        );
      }
    } catch (_error) {
      message.error("Failed to check availability. Please try again.");
      setIsAvailable(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToBooking = () => {
    if (!selectedRoom || !dates[0] || !dates[1]) return;
    const checkIn = dates[0].format("YYYY-MM-DD");
    const checkOut = dates[1].format("YYYY-MM-DD");
    const params = new URLSearchParams({
      hotelId: hotelId.toString(),
      roomTypeId: selectedRoom.id.toString(),
      checkIn,
      checkOut,
    });
    router.push(`/new-bookings?${params.toString()}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAvailable(null);
    setAvailableRooms([]);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-primary text-center mb-12">
          Our Rooms & Suites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomTypes.map((roomType) => (
            <div
              key={roomType.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:shadow-xl transition-transform duration-300"
            >
              <div className="relative h-64">
                {roomType.images && roomType.images.length > 1 ? (
                  <RoomImageCarousel slides={roomType.images} />
                ) : (
                  <Image
                    src={getImageUrl(roomType.images[0]?.url)}
                    alt={roomType.images[0]?.alt ?? roomType.name}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold font-serif text-primary">
                  {roomType.name}{" "}
                  {/* <i className="fa fa-info-circle ml-2 font-thin text-sm" /> */}
                </h3>
                {/* <p className="mt-2 text-gray-600 font-sans">
                  {roomType.description}
                </p> */}
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
                      className={`fa ${roomType.smokingAllowed ? "fa-smoking" : "fa-smoking-ban"} mr-2 text-primary`}
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
                    onClick={() => showModal(roomType)}
                    className="bg-primary cursor-pointer text-sm text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-300"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedRoom ? (
        <Modal
          title={`Check Availability for ${selectedRoom.name}`}
          open={isModalVisible}
          onCancel={handleCancel}
          centered
          afterClose={() => setSelectedRoom(null)}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={
                isAvailable ? handleProceedToBooking : handleCheckAvailability
              }
              loading={isLoading}
              className="!bg-primary !text-white hover:!bg-primary/90"
            >
              {isAvailable ? "Proceed to Booking" : "Check Now"}
            </Button>,
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your dates:
              </label>
              <RangePicker
                value={dates}
                onChange={(dates) => {
                  setDates(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null]);
                  setIsAvailable(null); // Reset availability when dates change
                  setAvailableRooms([]);
                }}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
                className="w-full"
              />
            </div>

            {isLoading ? (
              <div className="text-center py-4">
                <Spin size="large" />
                <p className="mt-2 text-gray-600">Checking availability...</p>
              </div>
            ) : null}

            {isAvailable === true && availableRooms.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center">
                  <i className="fa fa-check-circle text-green-500 mr-2" />
                  <span className="text-green-700 font-medium">
                    Great! available for your selected dates.
                  </span>
                </div>
              </div>
            )}

            {isAvailable === false && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center">
                  <i className="fa fa-times-circle text-red-500 mr-2" />
                  <span className="text-red-700 font-medium">
                    Sorry, no rooms available for your selected dates. Please
                    try different dates.
                  </span>
                </div>
              </div>
            )}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default RoomTypes;
