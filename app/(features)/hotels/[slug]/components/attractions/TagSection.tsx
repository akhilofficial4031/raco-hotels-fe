import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { TagSectionContent } from "@/types/attractions";

interface TagSectionProps {
  content: TagSectionContent;
}

const getBgColor = (bg: string) => {
  switch (bg) {
    case "white":
      return "bg-white";
    case "color":
      return "bg-background-light";
    case "color-light":
      return "bg-background-ultra-light";
  }
};

const TagSection = ({ content }: TagSectionProps) => {
  return (
    <section
      className={`${getBgColor(content.bg)} pt-16`}
      aria-labelledby="our-stays-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <AnimatedContainer animationName="zoomIn">
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
            <AnimatedContainer animationName="zoomIn">
              <p className="text-gray-600 dm-sans">{content.description}</p>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagSection;
