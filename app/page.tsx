import { getLandingPageData } from "@/lib/fetcher";
import { generateHomePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import AboutUs from "./components/AboutUs";
import FeaturedStays from "./components/FeaturedStays";
import Gallery from "./components/Gallery";
import GravityBar from "./components/GravityBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OurStays from "./components/OurStays";
import Restaurant from "./components/Restaurant";
import SignatureExperiences from "./components/SignatureExperiences";
import Testimonials from "./components/Testimonials";
import TopBanner from "./components/TopBanner";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getLandingPageData();
    return generateHomePageMetadata(data.seo);
  } catch (_error) {
    // Fallback to default metadata if API fails
    return generateHomePageMetadata();
  }
}

export default async function Home() {
  let data;

  try {
    data = await getLandingPageData();
  } catch (_error) {
    // Return a basic error page or fallback
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Unable to load page content
          </h1>
          <p className="text-gray-600">
            Please try refreshing the page or contact support if the issue
            persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopBanner data={data.topBanner} />
      <Header data={data.header} />
      <main>
        <Hero data={data.hero} />
        <AboutUs data={data.aboutUs} />
        <OurStays data={data.ourStays} />
        <FeaturedStays data={data.featuredStays} />
        <SignatureExperiences data={data.signatureExperiences} />
        <GravityBar data={data.gravityBar} />
        <Restaurant data={data.restaurant} />
        <Testimonials data={data.testimonials} />
        <Gallery data={data.gallery} />
      </main>
      {/* The rest of the home page sections will be added here */}
    </>
  );
}
