"use client";

import { TopBannerContent } from "@/types/landing-page";

interface TopBannerProps {
  content: TopBannerContent;
}

const TopBanner = ({ content }: TopBannerProps) => {
  return (
    <div className="overflow-hidden bg-primary text-white py-2">
      <div className="animate-marquee whitespace-nowrap flex hover:[animation-play-state:paused]">
        <span className="px-4 lg:px-40">{content.text}</span>
        <span className="px-4 lg:px-40">{content.text}</span>
        <span className="px-4 lg:px-40">{content.text}</span>
        <span className="px-4 lg:px-40">{content.text}</span>
        <span className="px-4 lg:px-40">{content.text}</span>
        <span className="px-4 lg:px-40">{content.text}</span>
      </div>
    </div>
  );
};

export default TopBanner;
