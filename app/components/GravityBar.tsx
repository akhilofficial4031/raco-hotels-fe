/* eslint-disable @next/next/no-img-element */
"use client";

import { GravityBarProps } from "@/types";
import Image from "next/image";

const GravityBar = ({ data }: GravityBarProps) => {
  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="relative">
        <Image
          src={data.badge.src}
          alt={data.badge.alt}
          width={128}
          height={128}
          className="w-32 z-50 h-auto object-cover absolute top-62 left-1/2 -translate-x-1/2"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-8 mb-8">
          {/* Section Header */}
          <div className="text-right mb-12 items-end">
            <p className="font-semibold tracking-wider uppercase mb-4 text-right">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                {data.sectionTitle}
              </span>
            </p>
            <h2 className="text-4xl md:text-5xl font-normal text-primary leading-tight text-right">
              {data.title}
            </h2>
            <div className="">
              <p className="text-gray-600 dm-sans mt-6 text-right">
                {data.description}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary to-secondary h-auto w-full flex items-center justify-center">
            <h3 className="text-white text-3xl font-semibold">
              {data.sectionTitle}
            </h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-8">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />

          {/* Gradient Box */}

          {/* Overlapping Circular Badge */}

          {/* Navigation Arrow */}
          <button className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/50 backdrop-blur-sm p-3 rounded-full text-gray-800 hover:bg-white transition-all">
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

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8 ">
          {data.ctas.map((cta, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                cta.variant === "primary"
                  ? "bg-primary text-white hover:opacity-90"
                  : "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white"
              }`}
            >
              {cta.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GravityBar;
