/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { GravityBarContent } from "@/types/landing-page";

interface GravityBarProps {
  content: GravityBarContent;
}

const GravityBar = ({ content }: GravityBarProps) => {
  return (
    <section className="bg-background-light py-16 md:py-24 ">
      <div className="relative container mx-auto">
        <img
          src={content.badge.src}
          alt={content.badge.alt}
          className="w-32 z-20 h-auto object-cover absolute top-62 left-1/2 -translate-x-1/2"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-8 mb-8">
          {/* Section Header */}
          <div className="text-right mb-12 items-end">
            <AnimatedContainer animationName="fadeLeft" delay={0.1}>
              <p className="font-semibold tracking-wider uppercase mb-4 text-right">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  {content.sectionTag}
                </span>
              </p>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeLeft" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-normal text-primary leading-tight text-right">
                {content.title}
              </h2>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeLeft" delay={0.3}>
              <div className="">
                <p className="text-gray-600 dm-sans mt-6 text-right">
                  {content.description}
                </p>
              </div>
            </AnimatedContainer>
          </div>
          <AnimatedContainer animationName="fadeRight" delay={0.4}>
            <div className="bg-gradient-to-r from-primary to-secondary h-70 w-full flex items-center justify-center">
              <h3 className="text-white text-3xl font-semibold">
                {content.name}
              </h3>
            </div>
          </AnimatedContainer>
        </div>

        {/* Main Content */}
        <div className="relative px-8">
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="w-full h-auto object-cover"
          />

          {/* Gradient Box */}

          {/* Overlapping Circular Badge */}

          {/* Navigation Arrow */}
          <button className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/50 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white transition-all">
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

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8 ">
          {content.buttons.map((button, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                button.type === "primary"
                  ? "bg-primary text-white hover:opacity-90"
                  : "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white"
              }`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GravityBar;
