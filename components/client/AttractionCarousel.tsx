"use client";
import { EmblaOptionsType } from "embla-carousel";
// import Autoplay from "embla-carousel-autoplay";
import React from "react";

import { Attraction, AttractionData } from "@/types/hotel";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../embla-carousel/embla-attractions.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../embla-carousel/EmblaCarouselArrowButtons";
import { getImageUrl } from "@/lib/utils";

const AttractionCarousel: React.FC<{ attractions: Attraction[] }> = ({
  attractions,
}) => {
  const pathname = usePathname();

  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    ClassNames(),
    // Autoplay(),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div
      className="embla overflow-hidden relative featured-stays-carousel"
      style={{ border: "none", boxShadow: "none" }}
      ref={emblaRef}
    >
      <div className="embla__container flex">
        {attractions.map((attraction, index) => (
          <div
            className="embla__slide flex-[0_0_33.33%] md:flex-[0_0_33.33%] min-w-0"
            key={index}
          >
            <div className=" overflow-hidden w-full h-full">
              <Link
                href={`${pathname}/${attraction.slug}`}
                className="block h-full"
              >
                <div className="relative h-96">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={getImageUrl(attraction.content.hero.imageUrl)}
                    alt={attraction.name}
                  />
                </div>
                <div className="py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg text-left font-cinzel text-text-dark mb-1">
                      {attraction.name}
                    </h3>
                    <p className="text-sm text-left text-text-light">
                      @ {attraction.content.hero.subtitle}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
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
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default AttractionCarousel;
