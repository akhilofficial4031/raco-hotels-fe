import { getFetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/api";
import { Hotel, HotelDetailsResponse } from "@/types/hotel";
import React from "react";
import Amenities from "./components/Amenities";
import Features from "./components/Features";
import LocationInfo from "./components/LocationInfo";
import CheckAvailability from "./components/CheckAvailability";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";

interface Props {
  params: {
    slug: string;
  };
}

const HotelDetailsPage = async ({ params: { slug } }: Props) => {
  const hotelResponse = await getFetcher<ApiResponse<HotelDetailsResponse>>(
    `/api/hotels/slug/${slug}`
  );

  const hotel = hotelResponse.data.hotel;
  const baseUrl = process.env.NEXT_BUCKET_URL;
  console.log("hotel", hotel);

  return (
    <div className="bg-[#F8F5F2]">
      <div
        className="relative h-screen w-full"
        style={{
          backgroundImage: `url(${baseUrl}/${hotel.images[0].url.replace("r2://", "")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
          {/* <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-wider">
            {hotel.name}{" "}
          </h1> */}
          <BlurFade
            delay={0.2}
            duration={0.5}
            className="text-5xl md:text-6xl lg:text-7xl tracking-wider"
          >
            {hotel.name}
          </BlurFade>
          <div className="flex items-center mt-4">
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <p className="mt-4 text-lg">
            {hotel.city}, {hotel.countryCode}
          </p>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-white flex flex-col items-end space-y-4 pr-8">
          <div className="flex items-center">
            <span className="mr-2">{hotel.phone}</span>
            <i className="fa fa-phone" aria-hidden="true"></i>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{hotel.email}</span>
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </div>
        </div>
        <CheckAvailability />
      </div>

      <div className="py-44">
        <div className="container mx-auto px-4 text-center">
          <i
            className="fa fa-building-o text-4xl text-purple-400"
            aria-hidden="true"
          ></i>
          <p className="mt-4 text-sm font-semibold tracking-widest text-purple-600">
            WELCOME TO {hotel.name.toUpperCase()}
          </p>
          <h2 className="mt-4 text-5xl font-serif text-purple-900">
            A Serene & Exclusive Experience
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500 leading-relaxed font-sans">
            {hotel.description}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-16">
        {/* <div className="-mt-32">
          <Amenities amenities={hotel.amenities} />
        </div>
        <div>
          <Features features={hotel.features} />
        </div> */}
        <LocationInfo locationInfo={hotel.locationInfo} />
      </div>
    </div>
  );
};

export default HotelDetailsPage;
