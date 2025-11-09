"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image as ImageType } from "@/types/hotel";
import { getImageUrl } from "@/lib/utils";
import "./HeroCarousel.css";
import Fade from "embla-carousel-fade";
import Image from "next/image";

type PropType = {
  slides: ImageType[];
  options?: EmblaOptionsType;
};

const HeroCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      delay: 5000,
      stopOnInteraction: false,
    }),
    Fade(),
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="hero-carousel ">
      <div className="hero-carousel__viewport" ref={emblaRef}>
        <div className="hero-carousel__container">
          {slides.map((image, index) => (
            <div
              className={`hero-carousel__slide ${
                index === activeIndex ? "hero-carousel__slide--active" : ""
              }`}
              key={index}
            >
              <div className="hero-carousel__slide__img_wrapper">
                <Image
                  className="hero-carousel__slide__img"
                  src={getImageUrl(image.url)}
                  alt={image.alt || "Hotel image"}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
