/* eslint-disable @next/next/no-img-element */
"use client";

import { AboutUsProps } from "@/types";
import Image from "next/image";

const AboutUs = ({ data }: AboutUsProps) => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-12 text-center lg:text-left">
              <p className="font-semibold tracking-wider uppercase mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  {data.sectionTitle}
                </span>
              </p>
              <h2 className="text-4xl md:text-5xl font-normal text-gray-800 leading-tight mt-4">
                {data.title.split("experiences").map((part, index) =>
                  index === 0 ? (
                    <span key={index}>
                      {part}
                      <em className="font-serif italic">experiences</em>
                    </span>
                  ) : (
                    <span key={index}>
                      {part
                        .split("passion for elegance")
                        .map((subpart, subindex) =>
                          subindex === 0 ? (
                            <span key={subindex}>
                              {subpart}
                              <em className="font-serif italic">
                                passion for elegance
                              </em>
                            </span>
                          ) : (
                            <span key={subindex}>{subpart}</span>
                          )
                        )}
                    </span>
                  )
                )}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 lg:items-start">
              <div className="flex-shrink-0 pt-8">
                <Image
                  src={data.badge.src}
                  alt={data.badge.alt}
                  width={data.badge.width}
                  height={data.badge.height}
                  className="mx-auto"
                />
              </div>
              <div className="flex-grow flex flex-col items-center">
                <div className="relative flex items-center justify-center w-60 h-60">
                  <div className="absolute inset-0 border border-gray-200 rounded-full" />
                  <p className="text-center text-gray-600 dm-sans text-sm p-8">
                    {data.description}
                  </p>
                </div>
                <div className="mt-8">
                  <button className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-semibold">
                    {data.cta.text}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Gallery */}
          <div className="relative">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              className="rounded-lg object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
