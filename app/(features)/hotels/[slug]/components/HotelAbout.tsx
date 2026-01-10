import React from "react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

interface HotelAboutProps {
  headline: string;
  subHeadline: string;
  body: string;
  statement: string;
  imageUrl?: string;
  imageAlt?: string;
}

const HotelAbout: React.FC<HotelAboutProps> = ({
  headline,
  subHeadline,
  body,
  statement,
  imageUrl,
  imageAlt = "Hotel Ambience",
}) => {
  return (
    <section className="py-20 bg-background-light overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side - Only render if imageUrl is provided */}
          {imageUrl ? (
            <div className="w-full lg:w-1/2">
              <AnimatedContainer animationName="fadeUp">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={getImageUrl(imageUrl)}
                    alt={imageAlt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </AnimatedContainer>
            </div>
          ) : null}

          {/* Content Side */}
          <div
            className={`w-full ${imageUrl ? "lg:w-1/2 text-center lg:text-left" : "max-w-4xl mx-auto text-center"}`}
          >
            <AnimatedContainer animationName="fadeUp">
              <div>
                <h2 className="text-3xl md:text-5xl font-cinzel text-primary mb-4 tracking-wide leading-tight">
                  {headline}
                </h2>
                <h3 className="text-xl md:text-2xl font-cinzel text-text-dark mb-8 tracking-wider">
                  {subHeadline}
                </h3>
                <p className="text-lg md:text-xl text-text-light font-sans leading-relaxed mb-10 text-justify">
                  {body}
                </p>
                <div
                  className={`relative pt-6 pb-4 ${imageUrl ? "" : "flex flex-col items-center"}`}
                >
                  {/* Separator line */}
                  <span
                    className={`block w-16 h-0.5 bg-primary/40 mb-6 ${imageUrl ? "" : "mx-auto"}`}
                  />
                  <p className="text-xl md:text-2xl  text-primary font-medium ">
                    {statement}
                  </p>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelAbout;
