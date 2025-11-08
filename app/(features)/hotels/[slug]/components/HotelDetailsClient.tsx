"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { message } from "antd";
import { Hotel, RoomType } from "@/types/hotel";
import { getAvailableRoomTypes } from "@/lib/hotels";
import CheckAvailability from "./CheckAvailability";
import LocationInfo from "./LocationInfo";
import RoomTypes from "./RoomTypes";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import AvailableRoomsModal from "./AvailableRoomsModal";
import HeroCarousel from "./HeroCarousel";

interface HotelDetailsClientProps {
  hotel: Hotel;
  initialRoomTypes: RoomType[];
}

const HotelDetailsClient: React.FC<HotelDetailsClientProps> = ({
  hotel,
  initialRoomTypes,
}) => {
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
    dayjs().add(1, "day"),
    dayjs().add(2, "day"),
  ]);
  const [isChecking, setIsChecking] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<RoomType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const handleCheckAvailability = async () => {
    if (!hotel || !dates[0] || !dates[1]) {
      message.error("Please select valid dates.");
      return;
    }
    setIsChecking(true);
    try {
      const checkIn = dates[0].format("YYYY-MM-DD");
      const checkOut = dates[1].format("YYYY-MM-DD");
      const res = await getAvailableRoomTypes(hotel.id, checkIn, checkOut);

      if (res.success && res.data.results.length > 0) {
        setAvailableRooms(res.data.results as unknown as RoomType[]);
        setIsModalVisible(true);
        message.success("Rooms are available for your selected dates!");
      } else {
        setAvailableRooms([]);
        message.warning("No rooms available for the selected dates.");
      }
    } catch (_error) {
      message.error("Failed to check availability. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleProceedToBooking = (_roomType: RoomType) => {
    // TODO: Implement booking logic
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="bg-background-light">
        <div className="relative h-screen w-full">
          <HeroCarousel slides={hotel.images} options={{ loop: true }} />
          <div className="absolute inset-0 bg-black opacity-40 z-10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center h-full text-white text-center">
            <AnimatedContainer animationName="fadeIn" delay={0.3}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-wider">
                {hotel.name}
              </h1>
            </AnimatedContainer>
            <div className="flex items-center mt-4">
              {Array.from({ length: hotel.starRating }, (_, i) => (
                <AnimatedContainer
                  animationName="fadeIn"
                  delay={0.4 + i * 0.1}
                  key={`star-${hotel.id}-${i}`}
                >
                  <svg
                    className="w-8 h-8 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </AnimatedContainer>
              ))}
            </div>
            <AnimatedContainer animationName="fadeIn" delay={0.7}>
              <p className="mt-4 text-lg">
                {hotel.city}, {hotel.countryCode}
              </p>
            </AnimatedContainer>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-white flex flex-col items-end space-y-4 pr-8">
            <AnimatedContainer animationName="fadeIn" delay={1}>
              <div className="flex items-center">
                <span className="mr-2">{hotel.phone}</span>
                <i className="fa fa-phone" aria-hidden="true" />
              </div>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeIn" delay={1.1}>
              <div className="flex items-center">
                <span className="mr-2">{hotel.email}</span>
                <i className="fa fa-envelope" aria-hidden="true" />
              </div>
            </AnimatedContainer>
          </div>
          <AnimatedContainer animationName="zoomIn" delay={1.2}>
            <CheckAvailability
              dates={dates}
              onDatesChange={setDates}
              rooms={rooms}
              onRoomsChange={setRooms}
              adults={adults}
              onAdultsChange={setAdults}
              children={childrenCount} // eslint-disable-line react/no-children-prop
              onChildrenChange={setChildrenCount}
              onCheck={handleCheckAvailability}
              loading={isChecking}
            />
          </AnimatedContainer>
        </div>
        <div className="pt-44 pb-16 bg-white">
          <AnimatedContainer animationName="fadeUp" delay={0.5}>
            <div className="container mx-auto px-4 text-center">
              <i
                className="fa fa-building-o text-4xl text-secondary"
                aria-hidden="true"
              />
              <p className="mt-4 text-sm font-semibold tracking-widest text-primary">
                WELCOME TO {hotel.name.toUpperCase()}
              </p>
              <h2 className="mt-4 text-5xl font-serif text-primary">
                A Serene & Exclusive Experience
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500 leading-relaxed font-sans">
                {hotel.description}
              </p>
            </div>
          </AnimatedContainer>
        </div>
        <div className="pb-16">
          {initialRoomTypes && initialRoomTypes.length > 0 ? (
            <div className="mt-16 max-w-7xl mx-auto px-4 py-16">
              <RoomTypes roomTypes={initialRoomTypes} hotelId={hotel.id} />
            </div>
          ) : null}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <LocationInfo locationInfo={hotel.locationInfo} />
            </div>
          </div>
        </div>
      </div>
      <AvailableRoomsModal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        roomTypes={availableRooms}
        onProceedToBooking={handleProceedToBooking}
      />
    </>
  );
};

export default HotelDetailsClient;
