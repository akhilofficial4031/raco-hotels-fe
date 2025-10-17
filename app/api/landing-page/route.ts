import {
  createHeadResponse,
  createSuccessResponse,
  withErrorHandler,
} from "@/lib/api-response";
import { LandingPageData } from "@/types";
import { NextRequest } from "next/server";

const landingPageData: LandingPageData = {
  topBanner: {
    message: "Raco Unveils Luxury Retreat Offers 2025",
    link: {
      text: "Best Offers",
      href: "#",
    },
  },
  header: {
    logo: {
      src: "/logo.png",
      alt: "Raco Hotels",
      width: 120,
      height: 40,
    },
    navigation: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      {
        href: "#",
        label: "Our Properties",
        dropdown: [
          { href: "/properties/property-1", label: "Property 1" },
          { href: "/properties/property-2", label: "Property 2" },
        ],
      },
      {
        href: "#",
        label: "Dining & Experiences",
        dropdown: [
          { href: "/dining", label: "Dining" },
          { href: "/experiences", label: "Experiences" },
        ],
      },
      { href: "/offers", label: "Offers" },
      { href: "/contact", label: "Contact" },
    ],
    cta: {
      text: "Book Now",
    },
    language: {
      icon: "/globe.svg",
      text: "Eng",
    },
  },
  hero: {
    subtitle: "- Timeless Historical Elegance -",
    title: {
      gradient: "A Serene & Exclusive",
      regular: "Boutique Hotel",
    },
    description:
      "In a world that moves too fast, we believe in the art of slow living. Natural textures, warm lighting, and thoughtful.",
    cta: {
      text: "Quick Booking",
      variant: "primary",
    },
    image: {
      src: "/hero/hero1.png",
      alt: "Hotel Interior",
      width: 500,
      height: 500,
    },
  },
  aboutUs: {
    sectionTitle: "ABOUT US",
    title:
      "We create experiences, not just stays. Our hospitality is defined by warmth and passion for elegance.",
    description:
      "In a world that moves too fast, we believe in the art of slow living. Natural textures, warm lighting, and thoughtful spaces create an atmosphere of comfort and timeless elegance.",
    cta: {
      text: "About Us",
      variant: "primary",
    },
    badge: {
      src: "/best-choice.png",
      alt: "Best Choice",
      width: 150,
      height: 150,
    },
    image: {
      src: "/about1.png",
      alt: "Hotel Poolside",
      width: 300,
      height: 250,
    },
  },
  ourStays: {
    sectionTitle: "OUR STAYS",
    title: "DISCOVER OUR CURATED COLLECTION OF EXQUISITE STAYS",
    description:
      "In a world that moves too fast, we believe in the art of slow living. Natural textures, warm lighting, and thoughtful spaces create an atmosphere of comfort and timeless elegance.",
  },
  featuredStays: {
    title: "RACO CYBER RESIDENCY",
    description:
      "In a world that moves too fast, we believe in the art of slow living. Natural.",
    cta: {
      text: "View All",
      variant: "primary",
    },
  },
  signatureExperiences: {
    sectionTitle: "SIGNATURE EXPERIENCES",
    title: "SIGNATURE EXPERIENCES",
    description:
      "In a world that moves too fast, we believe in the art of slow living. Natural textures, warm lighting, and thoughtful spaces create an atmosphere of comfort and timeless elegance.",
    club19: {
      title: "CLUB 19",
      subtitle: "CLUB-19",
      description:
        "In a world that moves too fast, we believe in the art of slow living. Natural textures, warm lighting, and thoughtful spaces create an atmosphere of comfort and timeless elegance.",
      ctas: [
        { text: "Explore More", variant: "primary" },
        { text: "Reserve now", variant: "secondary" },
      ],
      images: [
        { src: "/experience1.png", alt: "Dining area" },
        { src: "/experience2.png", alt: "Bar area" },
      ],
    },
    badge: {
      src: "/celebrate-your-moments.png",
      alt: "Celebrate your moments",
    },
  },
  gravityBar: {
    sectionTitle: "GRAVITY BAR",
    title: "ROOFTOP VIBES: LIVE MUSIC, COCKTAILS",
    description:
      "In a world that moves too fast, we believe in the art of slow living. Natural textures, warm lighting, and thoughtful spaces create an atmosphere of comfort and timeless elegance.",
    ctas: [
      { text: "Explore More", variant: "primary" },
      { text: "Reserve now", variant: "secondary" },
    ],
    image: {
      src: "/gravitybar.png",
      alt: "Gravity Bar",
    },
    badge: {
      src: "/celebrate-your-moments.png",
      alt: "Celebrate your moments",
    },
  },
  restaurant: {
    sectionTitle: "PRIYAM RESTAURANT",
    title: "PRIYAM RESTAURANT",
    subtitle: "CULINARY ELEGANCE: KERALA CUISINE WITH GLOBAL FUSION",
    description:
      "In a world that moves too fast, we believe in the art of slow living. Natural textures, warm lighting, and thoughtful spaces create an atmosphere of comfort and timeless elegance.",
    ctas: [
      { text: "Explore More", variant: "primary" },
      { text: "Reserve now", variant: "secondary" },
    ],
    images: [
      { src: "/experience1.png", alt: "Priyam Restaurant Interior 1" },
      { src: "/experience2.png", alt: "Priyam Restaurant Interior 2" },
    ],
    badge: {
      src: "/celebrate-your-moments.png",
      alt: "Celebrate your moments",
    },
  },
  testimonials: {
    sectionTitle: "TESTIMONIALS",
    title: "MEMORABLE STAYS, SHARED EXPERIENCES",
    items: [
      {
        name: "Rahul S",
        location: "Sri Lanka",
        image: "/user-avatar.svg",
        testimonial:
          "Raco Hotel made my work trip effortless. The Wi-Fi was reliable, the meeting spaces were well-equipped, and the staff went out of their way to help. Truly professional service.",
      },
      {
        name: "Priya & Family",
        location: "Italy",
        image: "/user-avatar.svg",
        testimonial:
          "Our family loved Raco Hotel! The kids enjoyed the pool, while we relaxed at the spa. The breakfast spread had something for everyone. We'll be back soon.",
      },
      {
        name: "Ananya & Rohit",
        location: "Delhi",
        image: "/user-avatar.svg",
        testimonial:
          "From the moment we arrived at Raco Hotel, we felt pampered. The rooms were spacious, the service top-class, and the rooftop dining experience was unforgettable.",
      },
      {
        name: "John Doe",
        location: "USA",
        image: "/user-avatar.svg",
        testimonial:
          "A fantastic stay! The concierge was incredibly helpful in planning our city tour. The hotel's location is perfect for exploring. Highly recommended for a luxurious getaway.",
      },
      {
        name: "Jane Smith",
        location: "UK",
        image: "/user-avatar.svg",
        testimonial:
          "The attention to detail at Raco Hotel is exceptional. From the welcome drink to the turndown service, every aspect of our stay was perfect. A truly five-star experience.",
      },
    ],
  },
  gallery: {
    sectionTitle: "GALLERY",
    title: "MOMENTS AT RACO",
    images: [
      { src: "/experience1.png", alt: "Gallery image 1" },
      { src: "/about1.png", alt: "Gallery image 2" },
      { src: "/experience2.png", alt: "Gallery image 3" },
      { src: "/gravitybar.png", alt: "Gallery image 4" },
    ],
    ctas: [
      { text: "Explore More", variant: "primary" },
      { text: "Follow Us", variant: "secondary" },
    ],
  },
  seo: {
    title: "Raco Hotels - Luxury Accommodations & Premium Hotel Bookings",
    description:
      "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels - luxury accommodations, exclusive deals, and exceptional service across our hotel group.",
    keywords:
      "hotels, luxury hotels, hotel booking, accommodations, travel, vacation, business travel, hotel reservations, premium hotels, hotel deals, Raco Hotels",
    ogImage: "/images/og-default.jpg",
  },
};

export async function GET(_request: NextRequest) {
  return withErrorHandler(
    () => createSuccessResponse(landingPageData, { cache: "MEDIUM" }),
    "Failed to fetch landing page data"
  );
}

export async function HEAD(_request: NextRequest) {
  return withErrorHandler(
    () => createHeadResponse({ cache: "MEDIUM" }),
    "Failed to process HEAD request"
  );
}
