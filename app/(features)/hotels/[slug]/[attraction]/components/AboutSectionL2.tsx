import React from "react";
import Image from "next/image";
import { AboutSectionContent } from "@/types/hotel";
import { getImageUrl } from "@/lib/utils";

interface Props {
  content: AboutSectionContent;
}

const AboutSectionL2: React.FC<Props> = ({ content }) => {
  const { images, description, title } = content;

  // Ensure we have at least 1 image to work with
  const sourceImages =
    images && images.length > 0 ? images : ["/placeholder.jpg"];
  console.log(sourceImages);

  // Prepare carousel items
  // const carouselItems: CarouselImageItem[] = sourceImages.map((img) => ({
  //   image: img,
  //   name: title,
  // }));

  // Helper to handle subtext which might be string or string[]
  // const carouselTitle = Array.isArray(subtext) ? subtext[0] : subtext;

  return (
    <div className="py-20 container mx-auto px-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <Image
          src={getImageUrl(sourceImages[0])}
          alt="Featured"
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* Right Column - Carousel */}

        <div className="flex flex-col items-start">
          <div className="">
            <h2 className="text-text-dark font-cinzel tracking-widest text-left text-4xl lg:text-5xl leading-tight">
              {title}
            </h2>

            {/* <div className="flex gap-4">
              {buttons && buttons.length > 0
                ? buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      className={
                        btn.type === "primary" ? "btn-primary" : "btn-secondary"
                      }
                    >
                      {btn.text}
                    </button>
                  ))
                : null}
            </div> */}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col gap-4">
              <p className="text-text-dark font-dm-sans text-base leading-relaxed opacity-80">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="w-full">
          <Carousel
            items={carouselItems}
            type="image"
            imageCarouselType="darkHeader"
            title={typeof carouselTitle === "string" ? carouselTitle : ""}
          />
        </div> */}
      </div>
    </div>
  );
};

export default AboutSectionL2;
