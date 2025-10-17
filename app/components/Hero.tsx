"use client";

import { HeroProps } from "@/types";
import Image from "next/image";

const Hero = ({ data }: HeroProps) => {
  return (
    <section className="bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left py-12 md:py-24">
            <p className="text-lg font-dm-sans uppercase tracking-widest text-primary">
              {data.subtitle}
            </p>
            <h1 className="text-5xl md:text-6xl font-light my-4 leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text  !font-cinzel">
                {data.title.gradient}
              </span>
              <br />
              <span className="text-primary">{data.title.regular}</span>
            </h1>
            <p className="text-gray-600 max-w-md mx-auto md:mx-0 dm-sans">
              {data.description}
            </p>
            <div className="mt-8">
              <button className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-semibold">
                {data.cta.text}
              </button>
            </div>
          </div>

          <div className="relative h-64 md:h-auto">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
