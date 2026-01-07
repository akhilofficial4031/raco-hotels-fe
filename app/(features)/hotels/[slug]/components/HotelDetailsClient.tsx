"use client";

import OurStays from "@/app/components/OurStays";
import AttractionCarousel from "@/components/client/AttractionCarousel";
import MapComponent from "@/components/client/MapComponent";
import { message } from "@/components/message";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { Hotel, RoomType } from "@/types/hotel";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { hotelAttractions } from "../../constants/our-attractions";
import AvailableRoomsModal from "./AvailableRoomsModal";
import CheckAvailability from "./CheckAvailability";
import HeroCarousel from "./HeroCarousel";
import LocationInfo from "./LocationInfo";
import RoomTypes from "./RoomTypes";
import HotelAbout from "./HotelAbout";
import { useQuickBooking } from "@/contexts/QuickBookingContext";
import HotelSignature from "@/app/components/HotelSignature";
interface HotelDetailsClientProps {
  hotel: Hotel;
  initialRoomTypes: RoomType[];
  showHotelAttractions: boolean;
}

const HotelDetailsClient: React.FC<HotelDetailsClientProps> = ({
  hotel,
  initialRoomTypes,
}) => {
  const router = useRouter();
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
    dayjs().add(1, "day"),
    dayjs().add(2, "day"),
  ]);
  const [availableRooms, _setAvailableRooms] = useState<RoomType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rooms, setRooms] = useState(1);
  const { openModal } = useQuickBooking();

  const handleCheckAvailability = async () => {
    if (!hotel || !dates[0] || !dates[1]) {
      message.error("Please select valid dates.");
      return;
    }
    const checkIn = dates[0].format("YYYY-MM-DD");
    const checkOut = dates[1].format("YYYY-MM-DD");
    const numberOfRooms = rooms;
    const params = new URLSearchParams({
      hotelId: hotel.id.toString(),
      checkIn,
      checkOut,
      numberOfRooms: numberOfRooms.toString(),
    });
    router.push(`/available-rooms?${params.toString()}`);
  };

  const onCheckinDatesChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]
  ) => {
    if (dates?.[0] && dates?.[1]) {
      setDates(dates);
    } else {
      setDates([null, null]);
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
          <div className="absolute bg-black opacity-70 z-10 w-full h-full" />

          <HeroCarousel slides={hotel.images} options={{ loop: true }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center h-full text-white text-center">
            <AnimatedContainer animationName="fadeIn" delay={0.3}>
              <h1 className="text-5xl md:text-6xl !mb-2 tracking-wider !font-cinzel">
                {hotel.name}
              </h1>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeIn" delay={0.6}>
              <p className="text-xl">{hotel.tagline}</p>
            </AnimatedContainer>
            {/* <div className="flex items-center mt-4">
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
            </div> */}
            {/* <AnimatedContainer animationName="fadeIn" delay={0.7}>
              <p className="mt-4 text-lg">
                {hotel.city}, {hotel.countryCode}
              </p>
              <div className="flex lg:hidden items-center justify-center">
                <span className="mr-2">{hotel.phone}</span>
                <i className="fa fa-phone" aria-hidden="true" />
              </div>
              <div className="flex lg:hidden items-center justify-center">
                <span className="mr-2">{hotel.email}</span>
                <i className="fa fa-envelope" aria-hidden="true" />
              </div>
            </AnimatedContainer> */}
          </div>
          {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-white hidden lg:flex flex-col items-end space-y-4 pr-8">
            <AnimatedContainer animationName="fadeIn" delay={1}>
              <div className="flex items-center">
                <span className="mr-2">
                  <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                </span>
                <i className="fa fa-phone" aria-hidden="true" />
              </div>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeIn" delay={1.1}>
              <div className="flex items-center">
                <span className="mr-2">
                  <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
                </span>
                <i className="fa fa-envelope" aria-hidden="true" />
              </div>
            </AnimatedContainer>
          </div> */}
          {/* <AnimatedContainer animationName="zoomIn" delay={1.2}> */}
          <CheckAvailability
            dates={dates}
            onDatesChange={onCheckinDatesChange}
            rooms={rooms}
            onRoomsChange={setRooms}
            onCheck={handleCheckAvailability}
            loading={false}
          />
          {/* </AnimatedContainer> */}
        </div>
        <div className="pt-44 pb-16 bg-background-ultra-light">
          {/* <AnimatedContainer animationName="fadeUp" delay={0.5}> */}
          <div className="container mx-auto px-4 text-center">
            <p className="mt-4 text-sm font-semibold text-text-light tracking-widest ">
              WELCOME TO
            </p>
            <h2 className="mt-4 text-5xl  text-primary !font-cinzel">
              {hotel.name.toUpperCase()}
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500 leading-relaxed font-sans">
              {hotel.description}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button className="btn-primary inline-block" onClick={openModal}>
              Book Your Stay
            </button>
            <button className="btn-outline inline-block">View Gallery</button>
          </div>
          {/* </AnimatedContainer> */}
        </div>

        {/* about the hotel */}
        <HotelAbout
          headline={hotel.aboutTitle}
          subHeadline={hotel.aboutSubtitle}
          body={hotel.aboutDescription}
          statement={hotel.aboutStatement}
          imageUrl={hotel.images?.[0]?.url}
          imageAlt={`${hotel.name} About`}
        />

        <div className="">
          {initialRoomTypes && initialRoomTypes.length > 0 ? (
            <div className="bg-white">
              <div className="pt-16 max-w-7xl mx-auto px-4 py-16 ">
                <RoomTypes roomTypes={initialRoomTypes} hotelId={hotel.id} />
              </div>
            </div>
          ) : null}

          {hotel.attractions && hotel.attractions.length > 0 ? (
            <>
              <OurStays content={hotelAttractions} />
              <div className="container mx-auto px-4 text-center py-16 border-t border-border">
                <AttractionCarousel attractions={hotel.attractions} />
              </div>
            </>
          ) : null}

          <HotelSignature content={hotel.signature} theme="theme-light" />

          <div>
            <div className="max-w-7xl mx-auto px-4">
              <LocationInfo locationInfo={hotel.locationInfo} />
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 bg-background-ultra-light ">
        <div className="container mx-auto px-4 rounded-lg">
          <h2 className="text-4xl font-cinzel text-text-dark !mb-10 text-center">
            Where we are
          </h2>
          <MapComponent latitude={hotel.latitude} longitude={hotel.longitude} />
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
