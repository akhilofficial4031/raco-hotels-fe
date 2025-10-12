/* eslint-disable @next/next/no-img-element */
"use client";

const SignatureExperiences = () => {
  return (
    <section className="bg-background-light py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div>
          <h2 className="text-5xl md:text-6xl font-normal text-primary leading-tight">
            SIGNATURE
            <br />
            EXPERIENCES
          </h2>
          <div className="h-0.5 w-full bg-gradient-to-r from-primary to-secondary mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end my-8">
          <div />
          <div />
          <p className="text-gray-600 dm-sans">
            In a world that moves too fast, we believe in the art of slow
            living. Natural textures, warm lighting, and thoughtful spaces
            create an atmosphere of comfort and timeless elegance.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-primary to-secondary h-64 flex items-center justify-center">
              <h3 className="text-white text-4xl font-semibold">CLUB 19</h3>
            </div>
            <img
              src="/experience2.png"
              alt="Bar area"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <img
              src="/experience1.png"
              alt="Dining area"
              className="w-full h-auto object-cover"
            />
            <div className="bg-background-light p-8">
              <p className="font-semibold tracking-wider uppercase text-primary mb-2">
                CLUB-19
              </p>
              <h3 className="text-3xl font-normal text-primary leading-tight mb-4">
                MEMBERS-ONLY
                <br />
                LOUNGE: ELEGANT
                <br />
                AND PRIVATE
              </h3>
              <p className="text-gray-600 dm-sans mb-6">
                In a world that moves too fast, we believe in the art of slow
                living. Natural textures, warm lighting, and thoughtful spaces
                create an atmosphere of comfort and timeless elegance.
              </p>
              <div className="flex space-x-4">
                <button className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-semibold">
                  Explore More
                </button>
                <button className="bg-transparent text-primary px-6 py-2 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors font-semibold">
                  Reserve now
                </button>
              </div>
            </div>
          </div>

          {/* Overlapping Circular Badge */}
          <img
            src="/celebrate-your-moments.png"
            alt="Celebrate your moments"
            className="w-32 h-auto object-cover absolute top-52 left-1/2 -translate-x-1/2"
          />
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 pointer-events-none">
            <div className="relative w-full h-full">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="50" fill="var(--primary)" />
                <path
                  id="circlePath"
                  d="
                    M 10, 50
                    a 40,40 0 1,1 80,0
                    40,40 0 1,1 -80,0
                  "
                  fill="none"
                />
                <text fill="white" fontSize="10" fontWeight="bold">
                  <textPath
                    href="#circlePath"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    CELEBRATE YOUR MOMENTS
                  </textPath>
                </text>
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SignatureExperiences;
