import Image from "next/image";
import { HeroContent } from "@/types/landing-page";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { TextAnimate } from "@/components/ui/text-animate";

interface HeroProps {
  content: HeroContent;
}

const Hero = ({ content }: HeroProps) => {
  return (
    <section className="bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left py-12 md:py-24">
            <AnimatedContainer animationName="fadeUp" delay={0.1}>
              <p className="text-lg font-dm-sans uppercase tracking-widest text-primary">
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
                <button className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-semibold">
                  {content.primaryButton.text}
                </button>
              </div>
            </AnimatedContainer>
          </div>

          <div className="relative h-64 md:h-auto">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
