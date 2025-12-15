import Link from "next/link";
import { Metadata } from "next";
import { getHotelsForNavigation } from "@/lib/hotels";

export const metadata: Metadata = {
  title: "Page Not Found | Raco Hotels",
  description: "The page you're looking for doesn't exist. Explore our hotels and find your perfect stay.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  // Fetch featured hotels for suggestions
  const hotels = await getHotelsForNavigation();
  const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 text-center">
        {/* 404 Error Section */}
        <div className="mb-12">
          <h1 className="text-9xl font-cinzel font-bold text-primary mb-4">
            404
          </h1>
          <h2 className="text-4xl font-cinzel text-text-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or doesn&apos;t exist.
          </p>

          {/* Search and Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Return Home
            </Link>
            <Link
              href="/hotels"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary border-2 border-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Browse Hotels
            </Link>
          </div>
        </div>

        {/* Featured Hotels Section */}
        {featuredHotels.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-cinzel text-text-dark mb-8">
              Explore Our Featured Hotels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredHotels.map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/hotels/${hotel.slug}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 bg-gray-200">
                    {hotel.images && hotel.images.length > 0 ? (
                      <img
                        src={hotel.images[0].url}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                        <svg
                          className="w-16 h-16 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-cinzel text-text-dark mb-2 group-hover:text-primary transition-colors">
                      {hotel.name}
                    </h4>
                    <p className="text-gray-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {hotel.city}, {hotel.countryCode}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links Section */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-cinzel text-text-dark mb-6">
            Popular Pages
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/hotels"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              All Hotels
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/#about"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/#contact"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:contact@racohotels.com"
              className="text-primary hover:underline"
            >
              contact@racohotels.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

