/* eslint-disable @next/next/no-img-element */
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "@/components/embla-carousel/EmblaCarouselArrowButtons";
import { TestimonialsContent } from "@/types/landing-page";
import "@/components/embla-carousel/embla.css";
import "./testimonials.css";

interface TestimonialsProps {
  content: TestimonialsContent;
}

const Testimonials = ({ content }: TestimonialsProps) => {
  const options: EmblaOptionsType = {
    loop: false,
    align: "start",
    slidesToScroll: 1,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4">
            {content.sectionTag}
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-primary leading-tight">
            {content.title}
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative embla embla__testimonials">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {content.items.map((testimonial, index) => (
                <div className="embla__slide min-w-0 pl-4" key={index}>
                  <div className="bg-white p-6 rounded-lg shadow-md h-full text-left">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mb-4"
                    />
                    <p className="text-gray-600 dm-sans mb-4">
                      {testimonial.testimonial}
                    </p>
                    {testimonial.rating && (
                      <div className="flex items-center mb-4">
                        {Array.from({ length: 5 }, (_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating!
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                    <p className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
