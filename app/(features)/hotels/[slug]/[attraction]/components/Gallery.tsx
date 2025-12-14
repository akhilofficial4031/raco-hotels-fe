/* eslint-disable react/no-array-index-key */
"use client";

import { Image } from "antd";
import { GalleryContent } from "@/types/hotel";
import { getImageUrl } from "@/lib/utils";

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
          <div
            className="font-semibold tracking-wider mb-4"
            role="doc-subtitle"
          >
            <span className="tag-head !font-cinzel">{content.tag}</span>
          </div>
          <h2
            id="gallery-heading"
            className="text-4xl md:text-5xl font-normal font-cinzel text-text-dark leading-tight"
          >
            {content.title}
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2" role="list">
          {content.images.map((image, index) => (
            <div
              key={index}
              role="listitem"
              className="gallery-item group overflow-hidden rounded-lg"
            >
              <Image
                src={getImageUrl(image)}
                alt={`Gallery image ${index + 1}`}
                className="!w-full !h-auto md:!h-100 object-cover transform transition-transform duration-300 rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
