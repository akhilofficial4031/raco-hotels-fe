/* eslint-disable @next/next/no-img-element */
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { usePrevNextButtons } from "@/components/embla-carousel/EmblaCarouselArrowButtons";
import { RestaurantContent } from "@/types/landing-page";
import "@/components/embla-carousel/embla.css";

interface RestaurantProps {
  content: RestaurantContent;
}

const Restaurant = ({ content }: RestaurantProps) => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="bg-background-light py-16 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-primary to-secondary h-56 flex items-center justify-center mb-8 relative">
          <h2 className="text-white text-4xl md:text-5xl font-semibold tracking-widest">
            {content.name}
          </h2>
          {/* Overlapping Circular Badge */}
          <div className="absolute z-50 -bottom-24 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 pointer-events-none">
            <img
              src={content.badge.src}
              alt={content.badge.alt}
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
                {content.sectionTag}
              </span>
            </p>
            <h3 className="text-3xl md:text-4xl font-normal text-primary leading-tight mb-4">
              {content.title}
            </h3>
            <p className="text-gray-600 dm-sans mb-6">
              {content.description}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {content.buttons.map((button, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    button.type === 'primary'
                      ? 'bg-primary text-white hover:opacity-90'
                      : 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>

          {/* Right Image Carousel */}
          <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {content.images.map((image, index) => (
                <div className="flex-[0_0_100%] min-w-0" key={index}>
                  <img
                    src={image.src}
                    alt={image.alt}
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
