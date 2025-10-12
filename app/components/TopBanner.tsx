"use client";

import { useState } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 flex items-center justify-center text-center text-sm relative dm-sans">
      <div className="flex items-center space-x-2">
        <span className="text-xs">▶</span>
        <span>Raco Unveils Luxury Retreat Offers 2025</span>
        <a href="#" className="underline hover:text-gray-200 ml-2">
          Best Offers
        </a>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:text-gray-300"
        aria-label="Close banner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default TopBanner;
