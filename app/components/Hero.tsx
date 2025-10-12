"use client";

const Hero = () => {
  return (
    <section className="bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left py-12 md:py-24">
            <p className="text-lg font-dm-sans uppercase tracking-widest text-primary">
              - Timeless Historical Elegance -
            </p>
            <h1 className="text-5xl md:text-6xl font-light my-4 leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text  !font-cinzel">
                A Serene & Exclusive
              </span>
              <br />
              <span className="text-primary">Boutique Hotel</span>
            </h1>
            <p className="text-gray-600 max-w-md mx-auto md:mx-0 dm-sans">
              In a world that moves too fast, we believe in the art of slow
              living. Natural textures, warm lighting, and thoughtful.
            </p>
            <div className="mt-8">
              <button className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-semibold">
                Quick Booking
              </button>
            </div>
          </div>

          <div className="relative h-64 md:h-auto">
            <img
              src="/hero/hero1.png"
              alt="Hotel Interior"
              width="500"
              height="500"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
