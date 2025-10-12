/* eslint-disable @next/next/no-img-element */
"use client";

import { Image } from "antd";

const galleryImages = [
  "/experience1.png",
  "/about1.png",
  "/experience2.png",
  "/gravitybar.png",
];

const Gallery = () => {
  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-4">
            GALLERY
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-primary leading-tight">
            MOMENTS AT RACO
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {galleryImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="!w-full !h-100 object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold">
            Explore More
          </button>
          <button className="bg-transparent text-primary px-6 py-2 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors font-semibold">
            Follow Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
