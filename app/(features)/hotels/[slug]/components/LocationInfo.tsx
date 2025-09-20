import { LocationInfo as LocationInfoType } from "@/types/hotel";
import Image from "next/image";
import React from "react";

interface Props {
  locationInfo: LocationInfoType[];
}

const LocationInfo = ({ locationInfo }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  return (
    <div className="py-24">
      <h2 className="text-4xl font-serif text-purple-900 mb-16 text-center">
        Discover the Area
      </h2>
      <div className="space-y-24">
        {locationInfo.map((info, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2">
              <h3 className="text-3xl font-serif text-purple-800">
                {info.heading}
              </h3>
              <p className="text-lg text-gray-500 my-4 font-sans">
                {info.subHeading}
              </p>
              <p className="text-gray-700 leading-relaxed font-sans">
                {info.description}
              </p>
              <ul className="space-y-3 mt-6">
                {info.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-sans">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {info.images.map((image, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={`${image.url}`}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationInfo;
