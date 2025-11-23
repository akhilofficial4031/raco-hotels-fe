"use client";

import Image from "next/image";
import { HeroContent } from "@/types/landing-page";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { TextAnimate } from "@/components/ui/text-animate";
import { useQuickBooking } from "@/contexts/QuickBookingContext";

interface HeroProps {
  content: HeroContent;
}

const Hero = ({ content }: HeroProps) => {
  const { openModal } = useQuickBooking();
  return (
    <section className="bg-background-light" aria-label="Hero section">
      <div className="mx-auto px-4 sm:pr-0 sm:pl-6 lg:pl-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left py-12 md:py-24">
            <AnimatedContainer animationName="fadeUp" delay={0.1}>
              <p
                className="text-lg font-dm-sans uppercase tracking-widest text-primary"
                role="doc-subtitle"
              >
                {content.tagline}
              </p>
            </AnimatedContainer>

            <AnimatedContainer animationName="fadeUp" delay={0.2}>
              <h1 className="text-5xl md:text-6xl font-light my-4 leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text  !font-cinzel">
                  {content.title.highlight}
                </span>
                <br />
                <span className="text-primary">{content.title.subtitle}</span>
              </h1>
            </AnimatedContainer>
            <TextAnimate
              animation="blurInUp"
              delay={0.3}
              duration={0.5}
              by="word"
            >
              {content.description}
            </TextAnimate>
            <AnimatedContainer animationName="fadeUp" delay={0.4}>
              <div className="mt-8">
                <button
                  onClick={openModal}
                  className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={content.primaryButton.text}
                >
                  {content.primaryButton.text}
                </button>
              </div>
            </AnimatedContainer>
          </div>

          <div className="relative h-full">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
