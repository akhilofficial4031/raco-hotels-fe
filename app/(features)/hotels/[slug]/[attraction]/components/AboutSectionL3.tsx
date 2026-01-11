/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AboutSectionContent } from "@/types/hotel";
import { getImageUrl } from "@/lib/utils";

interface Props {
  content: AboutSectionContent;
}

const AboutSectionL3: React.FC<Props> = ({ content }) => {
  const { images, description, title, subtext } = content;

  // Ensure we have at least 1 image to work with
  const sourceImages =
    images && images.length > 0 ? images : ["/placeholder.jpg"];

  // Create an array of 3 images by repeating if necessary
  const displayImages = [...sourceImages];
  while (displayImages.length < 3) {
    displayImages.push(
      sourceImages[displayImages.length % sourceImages.length]
    );
  }

  return (
    <div className="py-16 container mx-auto">
      <div className="max-w-full px-4 md:max-w-3/5 mx-auto mb-12">
        <h1 className="text-text-dark font-cinzel tracking-widest text-center text-5xl mb-8">
          {title}
        </h1>
        <p className="text-text-dark font-dm-sans tracking-widest text-center text-lg">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-4 w-full p-4">
        {/* Text Card 1: Title & Subtext */}
        <div className="lg:col-start-3 lg:row-start-1 rounded-2xl bg-black-bg px-8 tracking-widest text-center p-4 flex flex-col justify-center items-center min-h-[200px]">
          <p className="text-3xl text-left font-cinzel text-blackbg-text1 mb-4">
            {title}
          </p>
          <p className="text-blackbg-text2 text-lg text-left font-dm-sans">
            {subtext}
          </p>
        </div>

        {/* Text Card 2: Description */}

        {/* Image 1 */}
        <div className="lg:col-span-2 lg:row-start-1 lg:col-start-1">
          <img
            className="w-full h-[400px] object-cover rounded-2xl"
            src={getImageUrl(displayImages[0])}
            alt={title}
          />
        </div>

        {/* Image 2 */}
      </div>
    </div>
  );
};

export default AboutSectionL3;
