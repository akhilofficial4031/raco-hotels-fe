import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Raco Hotels",
  description:
    "The page you're looking for doesn't exist. Explore our hotels and find your perfect stay.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
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

          {/* Navigation Buttons */}
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
              Browse All Properties
            </Link>
          </div>
        </div>

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
              All Properties
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
              href="mailto:hello@racogroup.com"
              className="text-primary hover:underline"
            >
              hello@racogroup.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
