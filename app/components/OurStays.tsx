"use client";

import { OurStaysContent } from "@/types/landing-page";

interface OurStaysProps {
  content: OurStaysContent;
}

const OurStays = ({ content }: OurStaysProps) => {
  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <p className="font-semibold tracking-wider uppercase mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                {content.sectionTag}
              </span>
            </p>
            <h2 className="text-5xl md:text-6xl font-normal text-primary leading-tight">
              {content.title}
            </h2>
          </div>
          <div>
            <p className="text-gray-600 dm-sans">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStays;
