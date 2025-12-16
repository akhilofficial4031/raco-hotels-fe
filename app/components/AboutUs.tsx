/* eslint-disable @next/next/no-img-element */

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { getImageUrl } from "@/lib/utils";
import { AboutUsContent } from "@/types/landing-page";
import Image from "next/image";

interface AboutUsProps {
  content: AboutUsContent;
}

const AboutUs = ({ content }: AboutUsProps) => {
  return (
    <section
      className="bg-white py-16 md:py-24"
      aria-labelledby="about-us-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="font-semibold tracking-wider uppercase mb-4"
          role="doc-subtitle"
        >
          <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            {content.sectionTag}
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1" />
          <div className="col-span-2">
            <AnimatedContainer animationName="fadeIn" delay={0.1}>
              <div className="mb-12 text-center md:text-left">
                <h2
                  id="about-us-heading"
                  className="text-2xl md:text-5xl font-normal text-gray-800 leading-tight mt-4"
                >
                  {content.title}
                </h2>
              </div>
            </AnimatedContainer>
          </div>
          <div className="col-span-1" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Content */}
          <div className="flex items-center md:items-start justify-center h-full">
            <AnimatedContainer animationName="fadeIn" delay={0.2}>
              <div className="flex-shrink-0 pt-8">
                <img
                  src={getImageUrl(content.badge.src)}
                  alt={content.badge.alt}
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
            </AnimatedContainer>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <AnimatedContainer animationName="fadeIn" delay={0.3}>
              <div>
                <p className="text-center md:text-left text-gray-600 dm-sans w-full md:w-3/4 text-sm">
                  {content.description}
                </p>
              </div>
            </AnimatedContainer>
            {/* <AnimatedContainer animationName="fadeIn" delay={0.4}>
              <div className="mt-8">
                <button
                  aria-label={content.primaryButton.text}
                  className="btn-primary"
                >
                  {content.primaryButton.text}
                </button>
              </div>
            </AnimatedContainer> */}
          </div>

          {/* Right Image Gallery */}
          <AnimatedContainer animationName="fadeIn" delay={0.2}>
            <div className="relative">
              <Image
                src={getImageUrl(content.image.src)}
                alt={content.image.alt}
                width={300}
                height={250}
                className="rounded-lg object-cover"
                loading="lazy"
              />
              {/* <button
                className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="View more about us"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button> */}
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
