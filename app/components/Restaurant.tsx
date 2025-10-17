/* eslint-disable @next/next/no-img-element */
"use client";

import { usePrevNextButtons } from "@/components/embla-carousel/EmblaCarouselArrowButtons";
import "@/components/embla-carousel/embla.css";
import { RestaurantProps } from "@/types";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const Restaurant = ({ data }: RestaurantProps) => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="bg-background-light py-16 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-primary to-secondary h-56 flex items-center justify-center mb-8 relative">
          <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-widest">
            {data.title}
          </h2>
          {/* Overlapping Circular Badge */}
          <div className="absolute z-50 -bottom-24 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 pointer-events-none">
            <Image
              src={data.badge.src}
              alt={data.badge.alt}
              width={160}
              height={160}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <p className="font-semibold tracking-wider uppercase mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                {data.sectionTitle}
              </span>
            </p>
            <h3 className="text-3xl md:text-4xl font-normal text-primary leading-tight mb-4">
              {data.subtitle}
            </h3>
            <p className="text-gray-600 dm-sans mb-6">{data.description}</p>
            <div className="flex justify-center md:justify-start space-x-4">
              {data.ctas.map((cta, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                    cta.variant === "primary"
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {cta.text}
                </button>
              ))}
            </div>
          </div>

          {/* Right Image Carousel */}
          <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {data.images.map((image, index) => (
                <div className="flex-[0_0_100%] min-w-0" key={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={500}
                    className="w-full h-[500px] object-cover"
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
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
