"use client";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";

import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import "../embla-carousel/embla.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../embla-carousel/EmblaCarouselArrowButtons";

import { Hotel } from "@/types/hotel";
import Link from "next/link";

const RightCarousel: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
  const options: EmblaOptionsType = {};
  const baseUrl = process.env.NEXT_BUCKET_URL;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {hotels.map((hotel) => (
            <div className="embla__slide" key={hotel.id}>
              <Link href={`/hotels/${hotel.slug}`}>
                <img
                  className="embla__slide__img"
                  src={`${baseUrl}/${hotel.images[0].url.replace("r2://", "")}`}
                  alt="Your alt text"
                />
                <div className="mt-2">
                  <h1>{hotel.name}</h1>
                  <p>
                    {hotel.city},{hotel.state}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default RightCarousel;
