import { Amenity } from "@/types/hotel";

interface Props {
  amenities: Amenity[];
}

const Amenities = ({ amenities }: Props) => {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <i
              className="fa fa-star text-purple-600 text-2xl"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Premium Amenities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience luxury and comfort with our carefully curated selection
            of world-class amenities
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div
                key={amenity.id}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i
                      className={`fa ${amenity.icon} text-white text-2xl`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                    {amenity.name}
                  </h3>

                  {/* Decorative Line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:w-20 transition-all duration-300" />
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-8 h-px bg-gray-300" />
            <i className="fa fa-diamond text-purple-400" aria-hidden="true" />
            <div className="w-8 h-px bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
