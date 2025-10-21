/* eslint-disable @next/next/no-img-element */

import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { RestaurantContent } from "@/types/landing-page";
import RestaurantCarousel from "./RestaurantCarousel";

interface RestaurantProps {
  content: RestaurantContent;
}

const Restaurant = ({ content }: RestaurantProps) => {
  return (
    <section className="bg-background-light py-16 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient Header */}
        <AnimatedContainer animationName="fadeDown">
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
        </AnimatedContainer>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
          {/* Left Content */}
          <AnimatedContainer animationName="fadeRight">
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

          {/* Right Image Carousel */}
          <AnimatedContainer animationName="fadeLeft" delay={0.1}>
            <RestaurantCarousel images={content.images} />
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
