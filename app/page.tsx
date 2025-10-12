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
import { generateHomePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateHomePageMetadata();

export default function Home() {
  return (
    <>
      <TopBanner />
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <OurStays />
        <FeaturedStays />
        <SignatureExperiences />
        <GravityBar />
        <Restaurant />
        <Testimonials />
        <Gallery />
      </main>
      {/* The rest of the home page sections will be added here */}
    </>
  );
}
