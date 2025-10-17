import { Feature } from "@/types/hotel";

interface Props {
  features: Feature[];
}

const Features = ({ features }: Props) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
            <i
              className="fa fa-gem text-purple-600 text-2xl"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Distinctive Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes our hotel unique with these exceptional features
            and services
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Feature Card */}
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full transform translate-x-16 -translate-y-16" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and Title Row */}
                    <div className="flex items-start space-x-4 mb-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <i
                            className="fa fa-check text-white text-lg"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                          {feature.name}
                        </h3>

                        {/* Description */}
                        {feature.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="flex items-center mt-6">
                      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:w-24 transition-all duration-300" />
                      <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full opacity-60" />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <div className="flex items-center space-x-2">
              <i
                className="fa fa-star text-purple-400 text-sm"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-gray-500">
                Premium Experience
              </span>
              <i
                className="fa fa-star text-purple-400 text-sm"
                aria-hidden="true"
              />
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
