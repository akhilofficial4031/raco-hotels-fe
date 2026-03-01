"use client";
import { getImageUrl } from "@/lib/utils";
import { RoomType, AvailableRoomDetails } from "@/types/hotel";
import { getAvailableRoomTypesForHotel } from "@/lib/hotels";
import Image from "next/image";
import React, { useState } from "react";
import { DatePicker, Button, Modal, Spin, InputNumber, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { message } from "@/components/message";
import dayjs from "dayjs";
import RoomImageCarousel from "./RoomImageCarousel";
import { useRouter } from "next/navigation";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { getRoomsNeeded } from "@/lib/booking-calc";

const renderDropdownNoScroll = (menu: React.ReactNode) => (
  <div onWheel={(e) => e.stopPropagation()}>{menu}</div>
);

const CHILD_AGE_OPTIONS = [
  { value: 0, label: "Below 1 year" },
  ...Array.from({ length: 18 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} year`,
  })),
];

const { RangePicker } = DatePicker;

interface RoomTypesProps {
  roomTypes: RoomType[];
  hotelId: number;
}

const RoomTypes: React.FC<RoomTypesProps> = ({ roomTypes, hotelId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<number[]>([]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
    dayjs().add(1, "day"),
    dayjs().add(2, "day"),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<AvailableRoomDetails[]>(
    []
  );
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const router = useRouter();

  // Derived occupancy — recalculated on every render from current state
  const effectiveAdults =
    adults + childAges.filter((age) => age > 10).length;
  const minRoomsNeeded = selectedRoom
    ? getRoomsNeeded(effectiveAdults, selectedRoom.maxOccupancy, numberOfRooms)
    : numberOfRooms;
  const capacityExceeded = selectedRoom
    ? effectiveAdults > numberOfRooms * (selectedRoom.maxOccupancy + 1)
    : false;

  const handleRoomsChange = (value: number) => {
    setNumberOfRooms(value);
    setIsAvailable(null);
    setAvailableRooms([]);
  };

  const handleAdultsChange = (value: number) => {
    setAdults(value);
    setIsAvailable(null);
    setAvailableRooms([]);
  };

  const handleChildrenCountChange = (count: number) => {
    setChildren(count);
    setChildAges(Array.from({ length: count }, (_, i) => childAges[i] ?? 0));
    setIsAvailable(null);
    setAvailableRooms([]);
  };

  const handleChildAgeChange = (index: number, age: number) => {
    const updated = [...childAges];
    updated[index] = age;
    setChildAges(updated);
    setIsAvailable(null);
    setAvailableRooms([]);
  };

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

      const response = await getAvailableRoomTypesForHotel(
        hotelId,
        checkInDate,
        checkOutDate,
        selectedRoom.id,
        numberOfRooms
      );

      if (
        response.success &&
        response.data.roomTypes.length > 0 &&
        response.data.roomTypes[0].availableRooms > 0
      ) {
        setAvailableRooms(response.data.roomTypes[0].rooms);
        setIsAvailable(true);
        message.success(`Rooms are available for your selected dates!`);
      } else {
        setAvailableRooms([]);
        setIsAvailable(false);
        message.warning(
          "No rooms available for your selected dates. Please try different dates."
        );
      }
    } catch (_error) {
      // console.error("Error checking availability:", error);
      message.error("Failed to check availability. Please try again.");
      setIsAvailable(false);
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
      numberOfRooms: numberOfRooms.toString(),
      adults: adults.toString(),
      children: children.toString(),
      childAges: childAges.join(","),
    });
    router.push(`/new-bookings?${params.toString()}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsAvailable(null);
    setAvailableRooms([]);
    setAdults(1);
    setChildren(0);
    setChildAges([]);
    setNumberOfRooms(1);
  };

  const handleShowAllAmenities = (roomType: RoomType) => {
    setSelectedRoom(roomType);
    setShowAllAmenities(true);
  };

  const handleCloseAllAmenities = () => {
    setSelectedRoom(null);
    setShowAllAmenities(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl md:text-5xl font-cinzel text-text-dark text-center !mb-16 relative inline-block w-full">
          <span className="relative z-10">Our Rooms & Suites</span>
        </h2>
        <div className="flex flex-col gap-16">
          {roomTypes.map((roomType, index) => (
            <AnimatedContainer
              key={index}
              animationName="fadeUp"
              delay={index * 0.2}
            >
              <div
                key={roomType.id}
                className="group bg-background-ultra-light rounded-xl  overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col lg:flex-row min-h-[400px]"
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
                        src={getImageUrl(roomType.images[0]?.url)}
                        alt={roomType.images[0]?.alt ?? roomType.name}
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
                        {roomType.name}
                      </h3>
                    </div>

                    <p
                      className="text-gray-600 font-dm-sans mb-6 leading-relaxed line-clamp-3 lg:line-clamp-4 text-base text-left"
                      data-testid="room-description"
                    >
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
                          {roomType.bedType}
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
                            className={`fa ${roomType.smokingAllowed ? "fa-check" : "fa-ban"}`}
                          />
                        </div>
                        <span className="font-medium text-text-light">
                          {roomType.smokingAllowed ? "Smoking" : "Non-Smoking"}
                        </span>
                      </div>
                    </div>

                    {roomType.amenities.length >= 1 ? (
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
                        {roomType.offerRate !== null &&
                          roomType.offerRate !== undefined && (
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
                            roomType.offerRate !== null &&
                              roomType.offerRate !== undefined
                              ? roomType.offerRate / 100
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
                      onClick={() => showModal(roomType)}
                      className="w-full md:w-auto bg-primary !text-white px-8 py-3 rounded-full hover:bg-primary-light hover:text-text-button transition-all duration-300 font-medium font-dm-sans shadow-lg hover:shadow-primary/30 active:transform active:scale-95"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
      {selectedRoom ? (
        <Modal
          title={`Check Availability — ${selectedRoom.name}`}
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
              disabled={
                !dates[0] ||
                !dates[1] ||
                (children > 0 && childAges.length < children) ||
                capacityExceeded
              }
              className="!bg-primary !text-white hover:!bg-primary/90"
            >
              {isAvailable ? "Proceed to Booking" : "Check Now"}
            </Button>,
          ]}
        >
          <div className="space-y-4 pt-2">
            {/* Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check In — Check Out
              </label>
              <RangePicker
                value={dates}
                onChange={(d) => {
                  setDates(d as [dayjs.Dayjs | null, dayjs.Dayjs | null]);
                  setIsAvailable(null);
                  setAvailableRooms([]);
                }}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
                className="!w-full"
                size="large"
              />
            </div>

            {/* Rooms / Adults / Children */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rooms
                </label>
                <InputNumber
                  min={1}
                  max={20}
                  value={numberOfRooms}
                  onChange={(v) => handleRoomsChange(v ?? 1)}
                  className={`!w-full${capacityExceeded ? " !border-amber-400" : ""}`}
                  size="large"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adults
                </label>
                <InputNumber
                  min={1}
                  max={20}
                  value={adults}
                  onChange={(v) => handleAdultsChange(v ?? 1)}
                  className="!w-full"
                  size="large"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Children
                </label>
                <InputNumber
                  min={0}
                  max={20}
                  value={children}
                  onChange={(v) => handleChildrenCountChange(v ?? 0)}
                  className="!w-full"
                  size="large"
                />
              </div>
            </div>

            {/* Occupancy warning */}
            {capacityExceeded && selectedRoom ? (
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-md px-4 py-3 text-sm">
                <i className="fa fa-exclamation-triangle text-amber-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-amber-800 font-medium">
                    Not enough rooms for {effectiveAdults} adult
                    {effectiveAdults > 1 ? "s" : ""}
                  </p>
                  <p className="text-amber-700 mt-0.5">
                    Each room fits up to{" "}
                    <strong>{selectedRoom.maxOccupancy + 1}</strong> guests
                    (incl. 1 extra adult). You need at least{" "}
                    <strong>{minRoomsNeeded}</strong> room
                    {minRoomsNeeded > 1 ? "s" : ""}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRoomsChange(minRoomsNeeded)}
                  className="shrink-0 text-xs font-semibold text-amber-800 underline hover:text-amber-900 whitespace-nowrap"
                >
                  Set to {minRoomsNeeded}
                </button>
              </div>
            ) : null}

            {/* Child ages */}
            {children > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Age of {children === 1 ? "child" : "children"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: children }, (_, i) => (
                    <div key={i}>
                      <label className="block text-xs text-gray-500 mb-1">
                        Child {i + 1}
                      </label>
                      <Select
                        size="large"
                        placeholder="Select age"
                        value={childAges[i] ?? undefined}
                        onChange={(v) => handleChildAgeChange(i, v)}
                        options={CHILD_AGE_OPTIONS}
                        className="!w-full"
                        getPopupContainer={(trigger) =>
                          trigger.parentElement ?? document.body
                        }
                        dropdownRender={renderDropdownNoScroll}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info note */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <InfoCircleOutlined className="shrink-0" />
              <span>Children above age 10 are considered as adults</span>
            </div>

            {/* Availability feedback */}
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
                    Great! Rooms are available for your selected dates.
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

      {showAllAmenities ? (
        <Modal
          title={`All Amenities for ${selectedRoom?.name}`}
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
    </>
  );
};

export default RoomTypes;
