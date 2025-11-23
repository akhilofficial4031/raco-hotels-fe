"use client";

import { useState } from "react";
import { TopBannerContent } from "@/types/landing-page";
import { Button } from "antd";

interface TopBannerProps {
  content: TopBannerContent;
}

const TopBanner = ({ content }: TopBannerProps) => {
  const [isVisible, setIsVisible] = useState(content.isVisible);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 flex items-center justify-center text-center text-sm  dm-sans">
      <div className="flex items-center space-x-2">
        <span className="text-xs">▶</span>
        <span>{content.text}</span>
        <Button
          type="text"
          onClick={content.onClick}
          className="underline !hover:text-gray-100 !text-gray-200 ml-2 cursor-pointer"
        >
          {content.linkText}
        </Button>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className=" text-white hover:text-gray-300 ml-4"
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
