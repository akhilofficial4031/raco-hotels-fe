/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useQuickBooking } from "@/contexts/QuickBookingContext";
import { HeroContent } from "@/types/landing-page";
// import LandingCarousel from "./LandingCarousel";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

interface HeroProps {
  content: HeroContent;
  // slides: Image[];
}

const Hero = ({ content }: HeroProps) => {
  const { openModal } = useQuickBooking();
  return (
    <section className="bg-background-light " aria-label="Hero section">
      <div className="mx-auto pl-4 pr-4 sm:pr-0 sm:pl-6 lg:pl-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-300px)]">
          <div className="text-center md:text-left py-12 md:py-24 pl-0 md:pl-20 ">
            {/* <AnimatedContainer animationName="fadeUp" delay={0.1}>
              <p
                className="text-lg font-dm-sans uppercase tracking-widest text-primary"
                role="doc-subtitle"
              >
                {content.tagline}
              </p>
            </AnimatedContainer> */}

            <AnimatedContainer animationName="fadeUp" delay={0.2}>
              <h1 className="text-5xl md:text-6xl font-light my-4 leading-tight text-center">
                <span className="text-primary  !font-cinzel text-center">
                  {content.tagline}
                </span>
                <br />
                {/* <span className="!text-primary !font-cinzel">
                  {content.title.subtitle}
                </span> */}
              </h1>
            </AnimatedContainer>
            {/* <TextAnimate
              animation="blurInUp"
              delay={0.3}
              duration={0.5}
              by="word"
            >
              {content.description}
            </TextAnimate> */}
            <AnimatedContainer animationName="fadeUp" delay={0.2}>
              <p className="text-text-light text-2xl !font-dm-sans text-center">
                {content.description}
              </p>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeUp" delay={0.4}>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={openModal}
                  className="btn-primary"
                  aria-label={content.primaryButton.text}
                >
                  {content.primaryButton.text}
                </button>
              </div>
            </AnimatedContainer>
          </div>

          <div className="relative h-full min-h-100">
            <Image
              src={getImageUrl(content.image.src)}
              alt={content.image.alt}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
            {/* <LandingCarousel slides={slides} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
