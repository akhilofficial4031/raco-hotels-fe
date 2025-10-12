"use client";
import { EmblaOptionsType } from "embla-carousel";
// import Autoplay from "embla-carousel-autoplay";
import React from "react";

import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import "../embla-carousel/embla.css";
import {
  NextButton,
  usePrevNextButtons,
} from "../embla-carousel/EmblaCarouselArrowButtons";
import { Hotel } from "@/types/hotel";
import Link from "next/link";

const RightCarousel: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
  };
  const baseUrl = process.env.NEXT_BUCKET_URL;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    ClassNames(),
    // Autoplay(),
  ]);

  const { onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla overflow-hidden relative" ref={emblaRef}>
      <div className="embla__container flex">
        {hotels.map((hotel) => (
          <div
            className="embla__slide flex-[0_0_50%] md:flex-[0_0_50%] min-w-0 pl-4"
            key={hotel.id}
          >
            <div className="bg-white rounded-lg overflow-hidden w-full">
              <Link href={`/hotels/${hotel.slug}`}>
                <div className="relative h-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={`${baseUrl}/${hotel.images[0].url.replace(
                      "r2://",
                      ""
                    )}`}
                    alt={hotel.name}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dm-sans mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {hotel.city}, {hotel.state}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-primary">
                      View
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
        <NextButton onClick={onNextButtonClick} />
      </div>
    </div>
  );
};

export default RightCarousel;
