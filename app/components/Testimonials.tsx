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
