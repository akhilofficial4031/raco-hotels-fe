import { getCachedLandingPageContent } from "@/lib/landing-page";
import { generateHomePageMetadata } from "@/lib/metadata";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";
import AboutUs from "./components/AboutUs";
import FeaturedStays from "./components/FeaturedStays";
import Gallery from "./components/Gallery";
import GravityBar from "./components/GravityBar";
import HeaderWrapper from "./components/HeaderWrapper";
import Hero from "./components/Hero";
import OurStays from "./components/OurStays";
import Restaurant from "./components/Restaurant";
import SignatureExperiences from "./components/SignatureExperiences";
import Testimonials from "./components/Testimonials";
import TopBanner from "./components/TopBanner";

// Generate metadata dynamically based on content
export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getCachedLandingPageContent();
    return generateHomePageMetadata(content.seo);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error generating metadata:", error);
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
      <TopBanner content={content.topBanner} />
      <HeaderWrapper />
      <main id="main-content" role="main">
        <Hero content={content.hero} />
        <AboutUs content={content.aboutUs} />
        <OurStays content={content.ourStays} />
        <FeaturedStays content={content.featuredStays} />
        <SignatureExperiences content={content.signatureExperiences} />
        <GravityBar content={content.gravityBar} />
        <Restaurant content={content.restaurant} />
        <Testimonials content={content.testimonials} />
        <Gallery content={content.gallery} />
      </main>
    </>
  );
}
