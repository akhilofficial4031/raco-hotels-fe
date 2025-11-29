/* eslint-disable @next/next/no-img-element */
"use client";

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { SignatureExperiencesContent } from "@/types/landing-page";

interface SignatureExperiencesProps {
  content: SignatureExperiencesContent;
}

const SignatureExperiences = ({ content }: SignatureExperiencesProps) => {
  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div>
          <h2 className="text-5xl md:text-6xl font-normal text-primary leading-tight">
            {content.title}
          </h2>
          <div className="h-0.5 w-full bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end my-8">
          <div />
          <div />
          <p className="text-gray-600 dm-sans">{content.description}</p>
        </div>

        {/* Main Content Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <AnimatedContainer animationName="fadeLeft" delay={0.1}>
              <div className="bg-gradient-to-r from-primary to-secondary h-64 flex items-center justify-center">
                <h3 className="text-white text-4xl font-semibold">
                  {content.club.name}
                </h3>
              </div>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeLeft" delay={0.1}>
              <img
                src={content.images[1]?.src || "/experience2.png"}
                alt={content.images[1]?.alt || "Bar area"}
                className="w-full h-auto object-cover"
              />
            </AnimatedContainer>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <AnimatedContainer animationName="fadeRight" delay={0.1}>
              <img
                src={content.images[0]?.src || "/experience1.png"}
                alt={content.images[0]?.alt || "Dining area"}
                className="w-full h-auto object-cover"
              />
            </AnimatedContainer>
            <AnimatedContainer animationName="zoomIn" delay={0.1}>
              <div className="bg-background-light p-8">
                <p className="font-semibold tracking-wider uppercase text-primary mb-2">
                  {content.club.tagline}
                </p>
                <h3 className="text-3xl font-normal text-primary leading-tight mb-4">
                  {content.club.title}
                </h3>
                <p className="text-gray-600 dm-sans mb-6">
                  {content.club.description}
                </p>
                <div className="flex space-x-4">
                  {content.club.buttons.map((button, index) => (
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
            </AnimatedContainer>
          </div>

          {/* Overlapping Circular Badge */}
          <img
            src={content.badge.src}
            alt={content.badge.alt}
            className="w-32 h-auto object-cover absolute top-52 left-1/2 -translate-x-1/2"
          />
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 pointer-events-none">
            <div className="relative w-full h-full">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="50" fill="var(--primary)" />
                <path
                  id="circlePath"
                  d="
                    M 10, 50
                    a 40,40 0 1,1 80,0
                    40,40 0 1,1 -80,0
                  "
                  fill="none"
                />
                <text fill="white" fontSize="10" fontWeight="bold">
                  <textPath
                    href="#circlePath"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    CELEBRATE YOUR MOMENTS
                  </textPath>
                </text>
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SignatureExperiences;
