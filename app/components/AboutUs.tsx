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
      className="bg-background-ultra-light py-20 lg:py-32 overflow-hidden"
      aria-labelledby="about-us-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left Column: Image Composition */}
          <div className="relative">
            <AnimatedContainer animationName="fadeRight">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden z-10 aspect-[4/3] w-full hidden md:block">
                <Image
                  src={getImageUrl(content.image.src)}
                  alt={content.image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Floating Badge (Bottom Right Overlap) */}
              <div className="absolute -bottom-10 size-40  -right-4 sm:-bottom-12 sm:-right-12 z-20 bg-background-ultra-light rounded-full p-4 hidden md:flex justify-center items-center">
                <img
                  src={getImageUrl(content.badge.src)}
                  alt={content.badge.alt}
                  className="w-24 h-24 mt-2 ml-2 sm:w-32 sm:h-32 object-contain object-center"
                />
              </div>
            </AnimatedContainer>
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col">
            <AnimatedContainer animationName="fadeUp" delay={0.3}>
              <span className="inline-block text-primary font-bold tracking-[0.2em] text-sm uppercase mb-4">
                {content.sectionTag}
              </span>
            </AnimatedContainer>

            <AnimatedContainer animationName="fadeUp" delay={0.4}>
              <h2
                id="about-us-heading"
                className="font-cinzel text-3xl md:text-5xl lg:text-6xl text-text-dark leading-tight mb-8"
              >
                {content.title}
              </h2>
            </AnimatedContainer>

            <AnimatedContainer animationName="fadeUp" delay={0.5}>
              <p className="font-dm-sans text-text-light text-lg leading-relaxed mb-10 text-left">
                {content.description}
              </p>
              <span className={`block w-16 h-0.5 bg-primary/40 mb-6 `} />
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeUp" delay={0.5}>
              <p className=" text-primary text-xl leading-relaxed mb-10 font-cinzel text-justify">
                {content.subtitle}
              </p>
            </AnimatedContainer>

            {/* <AnimatedContainer animationName="fadeUp" delay={0.6}>
              <button
                className="btn-primary self-start uppercase tracking-wider text-sm font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                aria-label={content.primaryButton.text}
              >
                {content.primaryButton.text}
              </button>
            </AnimatedContainer> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
