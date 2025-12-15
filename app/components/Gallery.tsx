import { getImageUrl } from "@/lib/utils";
import { GalleryContent } from "@/types/landing-page";
import { Image } from "antd";

interface GalleryProps {
  content: GalleryContent;
}

const Gallery = ({ content }: GalleryProps) => {
  return (
    <section
      className="bg-background-light py-16 md:py-24"
      aria-labelledby="gallery-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4"
            role="doc-subtitle"
          >
            {content.sectionTag}
          </p>
          <h2
            id="gallery-heading"
            className="text-4xl md:text-5xl font-normal text-primary leading-tight"
          >
            {content.title}
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4" role="list">
          {content.images.map((image, index) => (
            <div
              key={index}
              role="listitem"
              className="gallery-item overflow-hidden rounded-lg"
            >
              <Image
                src={getImageUrl(image.src)}
                alt={image.alt}
                className="!w-full !h-auto md:!h-100 object-cover transform rounded-lg group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <nav
          aria-label="Gallery actions"
          className="flex justify-center space-x-4 mt-8"
        >
          {content.buttons.map((button, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                button.type === "primary"
                  ? "bg-primary text-white hover:opacity-90"
                  : "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white"
              }`}
              aria-label={button.text}
            >
              {button.text}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default Gallery;
