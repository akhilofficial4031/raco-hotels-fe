import { processImageUrl } from "@/lib/utils";
import { Hotel, LocationInfo as LocationInfoType } from "@/types/hotel";
import Image from "next/image";

interface Props {
  locationInfo: LocationInfoType[];
  hotel: Hotel;
}

const LocationInfo = ({ locationInfo, hotel }: Props) => {
  const baseUrl = process.env.NEXT_BUCKET_URL ?? "";

  // Fallback image for missing images (using existing image as fallback)
  const fallbackImage = "/hero/hero1.png";

  // Google Maps embed URL
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${hotel.latitude},${hotel.longitude}&zoom=15`;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mb-6">
            <i
              className="fa fa-map-marker-alt text-green-600 text-2xl"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Discover the Area
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the vibrant surroundings and attractions near {hotel.name}
          </p>
        </div>

        {/* Hotel Address Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Address Information */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mr-4">
                    <i
                      className="fa fa-building text-white text-lg"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Our Location
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <i
                      className="fa fa-map-marker-alt text-purple-500 text-lg mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-gray-900 font-medium">
                        {hotel.addressLine1}
                      </p>
                      {hotel.addressLine2 && (
                        <p className="text-gray-700">{hotel.addressLine2}</p>
                      )}
                      <p className="text-gray-700">
                        {hotel.city}, {hotel.state} {hotel.postalCode}
                      </p>
                      <p className="text-gray-600">{hotel.countryCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <i
                      className="fa fa-phone text-purple-500 text-lg"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:${hotel.phone}`}
                      className="text-gray-900 hover:text-purple-600 transition-colors"
                    >
                      {hotel.phone}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <i
                      className="fa fa-envelope text-purple-500 text-lg"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${hotel.email}`}
                      className="text-gray-900 hover:text-purple-600 transition-colors"
                    >
                      {hotel.email}
                    </a>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="mt-8">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <i
                      className="fa fa-directions text-white mr-2"
                      aria-hidden="true"
                    />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div className="relative h-80 lg:h-full min-h-[400px]">
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title={`Map showing location of ${hotel.name}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Information Sections */}
        {locationInfo && locationInfo.length > 0 && (
          <div className="space-y-20">
            {locationInfo.map((info, index) => (
              <div
                key={index}
                className="max-w-7xl mx-auto"
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 !== 0 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`space-y-6 ${index % 2 !== 0 ? "lg:col-start-2" : ""}`}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl mb-4">
                      <i
                        className="fa fa-location-arrow text-purple-600 text-lg"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif text-gray-900">
                      {info.heading}
                    </h3>

                    <p className="text-xl text-purple-600 font-medium">
                      {info.subHeading}
                    </p>

                    <p className="text-gray-700 leading-relaxed text-lg">
                      {info.description}
                    </p>

                    {/* Bullet Points */}
                    {info.bulletPoints && info.bulletPoints.length > 0 && (
                      <ul className="space-y-3">
                        {info.bulletPoints.map((point, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                <i
                                  className="fa fa-check text-white text-xs"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                            <span className="text-gray-700 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Images */}
                  <div className={`${index % 2 !== 0 ? "lg:col-start-1" : ""}`}>
                    <div className="grid grid-cols-2 gap-4">
                      {info.images && info.images.length > 0
                        ? info.images.map((image, i) => (
                            <div
                              key={i}
                              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                              <div className="aspect-[4/3] relative">
                                <Image
                                  src={
                                    processImageUrl(image.url, baseUrl) ||
                                    fallbackImage
                                  }
                                  alt={
                                    image.alt ||
                                    `${info.heading} - Image ${i + 1}`
                                  }
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                          ))
                        : // Fallback images when no images are provided
                          Array.from({ length: 2 }, (_, i) => (
                            <div
                              key={i}
                              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                              <div className="aspect-[4/3] relative bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                <div className="text-center">
                                  <i
                                    className="fa fa-image text-purple-400 text-4xl mb-2"
                                    aria-hidden="true"
                                  />
                                  <p className="text-purple-600 text-sm font-medium">
                                    Location Image
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <div className="flex items-center space-x-2">
              <i
                className="fa fa-map text-purple-400 text-sm"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-gray-500">
                Explore & Discover
              </span>
              <i
                className="fa fa-compass text-purple-400 text-sm"
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

export default LocationInfo;
