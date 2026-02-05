import { getCachedLandingPageContent } from "@/lib/landing-page";
import { generateHomePageMetadata } from "@/lib/metadata";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";
import AboutUs from "./components/AboutUs";
import FeaturedStays from "./components/FeaturedStays";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import OurStays from "./components/OurStays";
import HotelSignature from "./components/HotelSignature";
import AllAttractions from "./components/AllAttractions";

// Generate metadata dynamically based on content
export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getCachedLandingPageContent();
    return generateHomePageMetadata(content.seo);
  } catch (_error) {
    // Error logging removed
    return generateHomePageMetadata();
  }
}

export default async function Home() {
  // Fetch landing page content
  const content = await getCachedLandingPageContent();

  // Generate structured data for homepage
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      {/* Structured Data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <main id="main-content" role="main">
        <Hero content={content.hero} />
        <AboutUs content={content.aboutUs} />
        <OurStays content={content.ourStays} />
        <FeaturedStays content={content.featuredStays} />
        <AllAttractions />
        <HotelSignature content={content.signatureSection} />
        <Gallery content={content.gallery} />
      </main>
    </>
  );
}
