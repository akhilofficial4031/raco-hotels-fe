"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { usePrevNextButtons } from "@/components/embla-carousel/EmblaCarouselArrowButtons";
import { Image as ImageType } from "@/types/landing-page";
import "@/components/embla-carousel/embla.css";
import Image from "next/image";

interface RestaurantCarouselProps {
  images: ImageType[];
}

const RestaurantCarousel = ({ images }: RestaurantCarouselProps) => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {images.map((image, index) => (
          <div className="flex-[0_0_100%] min-w-0 relative h-[500px]" key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-end pr-4 pointer-events-none">
        <button
          onClick={onNextButtonClick}
          className="bg-white/50 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white transition-all pointer-events-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </button>
      </div>
    </div>
  );
};

export default RestaurantCarousel;
