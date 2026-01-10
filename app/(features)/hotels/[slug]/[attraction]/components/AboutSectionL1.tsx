/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AboutSectionContent } from "@/types/hotel";
import { getImageUrl } from "@/lib/utils";

interface Props {
  content: AboutSectionContent;
}

const AboutSectionL1: React.FC<Props> = ({ content }) => {
  return (
    <div className="">
      <div className="container mx-auto">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 ">
          <div className="col-span-2 ">
            <img
              src={getImageUrl(content.images[0])}
              alt={content.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
          <div className="col-span-1 max-h-[500px]">
            <img
              src={getImageUrl(content.images[1])}
              alt={content.title}
              className="w-full h-full max-h-[500px] object-cover"
            />
          </div>
        </div>
        <div className="py-20">
          <h2 className="text-text-dark font-dm-sans tracking-widest text-center text-xl">
            {content.description}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default AboutSectionL1;
