/* eslint-disable @next/next/no-img-element */
"use client";

const AboutUs = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-12 text-center lg:text-left">
              <p className="font-semibold tracking-wider uppercase mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  ABOUT US
                </span>
              </p>
              <h2 className="text-4xl md:text-5xl font-normal text-gray-800 leading-tight mt-4">
                We create <em className="font-serif italic">experiences</em>,
                not just stays. Our hospitality is defined by warmth and{" "}
                <em className="font-serif italic">passion for elegance</em>.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 lg:items-start">
              <div className="flex-shrink-0 pt-8">
                <img
                  src="/best-choice.png"
                  alt="Best Choice"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="flex-grow flex flex-col items-center">
                <div className="relative flex items-center justify-center w-60 h-60">
                  <div className="absolute inset-0 border border-gray-200 rounded-full" />
                  <p className="text-center text-gray-600 dm-sans text-sm p-8">
                    In a world that moves too fast, we believe in the art of
                    slow living. Natural textures, warm lighting, and thoughtful
                    spaces create an atmosphere of comfort and timeless
                    elegance.
                  </p>
                </div>
                <div className="mt-8">
                  <button className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-semibold">
                    About Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Gallery */}
          <div className="relative">
            <img
              src="/about1.png"
              alt="Hotel Poolside"
              width={300}
              height={250}
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
