import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { SignatureContent } from "@/types/landing-page";

interface SignatureProps {
  content: SignatureContent;
  theme?: "white" | "theme-light";
}

const HotelSignature = ({ content, theme = "white" }: SignatureProps) => {
  const bgColor = theme === "white" ? "bg-white" : "bg-background-ultra-light";
  const cardColor =
    theme === "white" ? "bg-background-ultra-light" : "bg-background-light";
  return (
    <section
      className={`${bgColor} py-16 md:py-24`}
      aria-labelledby="comfort-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContainer animationName="fadeUp">
          <h2
            id="comfort-heading"
            className="text-4xl md:text-5xl font-cinzel text-center text-primary !mb-12"
          >
            {content.title}
          </h2>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content.items.map((item, index) => (
            <AnimatedContainer
              key={index}
              animationName="fadeUp"
              delay={index * 0.2}
            >
              <div
                className={`${cardColor} p-8 rounded-lg h-ful transition-colors min-h-[160px]`}
              >
                <h3 className="font-cinzel text-xl text-text-dark mb-4">
                  {item.title}
                </h3>
                <p className="font-dm-sans text-text-light">
                  {item.description}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer animationName="fadeUp" delay={0.6}>
          <p className="text-center text-lg md:text-xl text-primary max-w-4xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default HotelSignature;
