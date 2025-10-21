import HotelList from "@/app/(features)/hotels/components/HotelList";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { FeaturedStaysContent } from "@/types/landing-page";

interface FeaturedStaysProps {
  content: FeaturedStaysContent;
}

const FeaturedStays = ({ content }: FeaturedStaysProps) => {
  return (
    <section className="bg-background-light py-16 md:py-24 border-t border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-6 h-full flex flex-col justify-between">
            <AnimatedContainer animationName="fadeRight">
              <div>
                <h2 className="text-4xl text-secondary">{content.title}</h2>
                <p className="text-gray-600 dm-sans">{content.description}</p>
              </div>
            </AnimatedContainer>
            <AnimatedContainer animationName="fadeRight" delay={0.1}>
              <button className="bg-primary w-fit text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-semibold">
                {content.primaryButton.text}
              </button>
            </AnimatedContainer>
          </div>
          <div className="lg:col-span-2">
            <AnimatedContainer animationName="fadeLeft" delay={0.2}>
              <HotelList />
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStays;
