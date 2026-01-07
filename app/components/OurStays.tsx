import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { OurStaysContent } from "@/types/landing-page";

interface OurStaysProps {
  content: OurStaysContent;
}

const OurStays = ({ content }: OurStaysProps) => {
  return (
    <section
      className="bg-background-light py-16 md:py-24"
      aria-labelledby="our-stays-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <AnimatedContainer animationName="fadeUp">
              <div
                className="font-semibold tracking-wider mb-4"
                role="doc-subtitle"
              >
                <span className="tag-head !font-cinzel">
                  {content.sectionTag}
                </span>
              </div>
              <h2
                id="our-stays-heading"
                className="text-5xl md:text-6xl font-normal text-primary leading-tight !font-cinzel"
              >
                {content.title}
              </h2>
            </AnimatedContainer>
          </div>
          <div>
            <AnimatedContainer animationName="fadeUp">
              <p className="text-gray-600 text-lg dm-sans text-justify">
                {content.description}
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStays;
