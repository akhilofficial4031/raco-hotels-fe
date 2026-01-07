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
import StayWithComfort from "./components/HotelSignature";

const stayWithComfort = {
  title: "The Raco Signature",
  items: [
    {
      title: "Excellence Without Exception",
      description: "A gold standard of comfort in every corner.",
    },
    {
      title: "Serenity by Design",
      description:
        "A calm, sophisticated oasis amidst the city’s vibrant energy.",
    },
    {
      title: "The Power of Personalization",
      description: "Bespoke experiences that feel considered, never generic.",
    },
  ],
  description:
    "You are not just booking a room. You are securing a legacy of peace, prestige, and perfection.",
};
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
        <StayWithComfort content={stayWithComfort} />

        {/* <SignatureExperiences content={content.signatureExperiences} /> */}
        {/* <GravityBar content={content.gravityBar} /> */}
        {/* <Restaurant content={content.restaurant} /> */}
        {/* <Testimonials content={content.testimonials} /> */}
        <Gallery content={content.gallery} />
      </main>
    </>
  );
}
