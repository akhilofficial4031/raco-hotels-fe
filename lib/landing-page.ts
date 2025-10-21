import { LandingPageContent } from "@/types/landing-page";
import fs from "fs";
import path from "path";

/**
 * Fetches landing page content from the mock JSON file
 * In production, this would fetch from a CMS API
 */
export async function getLandingPageContent(): Promise<LandingPageContent> {
  try {
    // In production, this would be an API call to your CMS
    // For now, we're reading from a local JSON file
    const filePath = path.join(
      process.cwd(),
      "mock",
      "landing-page-content.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const content: LandingPageContent = JSON.parse(fileContents);

    // Validate the content structure (basic validation)
    if (!content.hero || !content.aboutUs || !content.seo) {
      throw new Error("Invalid landing page content structure");
    }

    return content;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching landing page content:", error);

    // Return fallback content in case of error
    return getFallbackContent();
  }
}

/**
 * Fallback content in case the main content fails to load
 */
function getFallbackContent(): LandingPageContent {
  return {
    topBanner: {
      isVisible: true,
      text: "Welcome to Raco Hotels",
      linkText: "Learn More",
      linkUrl: "#",
    },
    hero: {
      tagline: "- Luxury Hospitality -",
      title: {
        highlight: "Premium Hotel",
        subtitle: "Experience",
      },
      description:
        "Discover exceptional hospitality and luxury accommodations.",
      primaryButton: {
        text: "Book Now",
        action: "booking",
      },
      image: {
        src: "/hero/hero1.png",
        alt: "Hotel",
      },
    },
    aboutUs: {
      sectionTag: "ABOUT US",
      title: "We create exceptional experiences",
      description: "Luxury hospitality at its finest.",
      badge: {
        src: "/best-choice.png",
        alt: "Best Choice",
      },
      primaryButton: {
        text: "Learn More",
        action: "about",
      },
      image: {
        src: "/about1.png",
        alt: "Hotel",
      },
    },
    ourStays: {
      sectionTag: "OUR STAYS",
      title: "DISCOVER OUR COLLECTION",
      description: "Premium accommodations worldwide.",
    },
    featuredStays: {
      title: "FEATURED PROPERTIES",
      description: "Exceptional stays await.",
      primaryButton: {
        text: "View All",
        action: "view-hotels",
      },
    },
    signatureExperiences: {
      sectionTag: "EXPERIENCES",
      title: "SIGNATURE EXPERIENCES",
      description: "Unforgettable moments.",
      club: {
        name: "CLUB",
        tagline: "EXCLUSIVE",
        title: "MEMBERS LOUNGE",
        description: "Private and elegant.",
        buttons: [
          { text: "Explore", type: "primary", action: "explore" },
          { text: "Reserve", type: "secondary", action: "reserve" },
        ],
      },
      images: [{ src: "/experience1.png", alt: "Experience" }],
      badge: {
        src: "/celebrate-your-moments.png",
        alt: "Celebrate",
      },
    },
    gravityBar: {
      sectionTag: "BAR",
      title: "ROOFTOP BAR",
      description: "Live music and cocktails.",
      name: "GRAVITY BAR",
      image: {
        src: "/gravitybar.png",
        alt: "Bar",
      },
      buttons: [{ text: "Explore", type: "primary", action: "explore" }],
      badge: {
        src: "/celebrate-your-moments.png",
        alt: "Celebrate",
      },
    },
    restaurant: {
      name: "RESTAURANT",
      sectionTag: "DINING",
      title: "CULINARY EXCELLENCE",
      description: "Fine dining experience.",
      buttons: [{ text: "Explore", type: "primary", action: "explore" }],
      images: [{ src: "/experience1.png", alt: "Restaurant" }],
      badge: {
        src: "/celebrate-your-moments.png",
        alt: "Celebrate",
      },
    },
    testimonials: {
      sectionTag: "TESTIMONIALS",
      title: "GUEST EXPERIENCES",
      items: [
        {
          name: "Guest",
          location: "Location",
          avatar: "/avatar.jpg",
          testimonial: "Excellent service.",
        },
      ],
    },
    gallery: {
      sectionTag: "GALLERY",
      title: "MOMENTS",
      images: [{ src: "/experience1.png", alt: "Gallery" }],
      buttons: [{ text: "View More", type: "primary", action: "gallery" }],
    },
    seo: {
      title: "Raco Hotels - Luxury Accommodations",
      description: "Premium hotel experiences worldwide.",
      keywords: "hotels, luxury, accommodations",
    },
  };
}

/**
 * Cache for landing page content to improve performance
 */
let contentCache: LandingPageContent | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get landing page content with caching for better performance
 */
export async function getCachedLandingPageContent(): Promise<LandingPageContent> {
  const now = Date.now();

  // Return cached content if it's still valid
  if (contentCache && now - cacheTimestamp < CACHE_DURATION) {
    return contentCache;
  }

  // Fetch fresh content
  contentCache = await getLandingPageContent();
  cacheTimestamp = now;

  return contentCache;
}
