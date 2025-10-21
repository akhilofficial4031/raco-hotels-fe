import { Image } from "antd";
import { GalleryContent } from "@/types/landing-page";

interface GalleryProps {
  content: GalleryContent;
}

const Gallery = ({ content }: GalleryProps) => {
  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4">
            {content.sectionTag}
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-primary leading-tight">
            {content.title}
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              className="!w-full !h-100 object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
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
    </section>
  );
};

export default Gallery;
