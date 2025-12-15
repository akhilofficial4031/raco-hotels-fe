import { getAttractionBySlug, getHotelBySlug } from "@/lib/hotels";
import {
  generateAttractionMetadata,
  withMetadataErrorHandling,
} from "@/lib/metadata";
import { getImageUrl } from "@/lib/utils";
import { AttractionLayout } from "@/types/attractions";
import { Metadata } from "next";
import Image from "next/image";
import Carousel from "../components/attractions/Carousel";
import TagSection from "../components/attractions/TagSection";
import AboutSectionL1 from "./components/AboutSectionL1";
import AboutSectionL2 from "./components/AboutSectionL2";
import AboutSectionL3 from "./components/AboutSectionL3";
import Gallery from "./components/Gallery";
import Marquee from "./components/Marquee";

interface Props {
  params: Promise<{
    slug: string;
    attraction: string;
  }>;
}

export const generateMetadata = withMetadataErrorHandling(
  async ({ params }: Props): Promise<Metadata> => {
    const { slug: hotelSlug, attraction: attractionSlug } = await params;
    const attractionResponse = await getAttractionBySlug(attractionSlug);
    const attraction = attractionResponse.data;

    // Fetch hotel to get hotel name for metadata
    const hotelResponse = await getHotelBySlug(hotelSlug);
    const hotel = hotelResponse.data.hotel;

    return generateAttractionMetadata({
      attraction: {
        name: attraction.attraction.name,
        content: attraction.attraction.content,
        hotelName: hotel.name,
      },
      slug: attractionSlug,
      hotelSlug,
    });
  },
  "Attraction Details"
);

const AttractionPage = async ({ params }: Props) => {
  const { attraction: attractionSlug } = await params;
  const attractionResponse = await getAttractionBySlug(attractionSlug);
  const attraction = attractionResponse.data;
  const heroImageUrl = getImageUrl(attraction.attraction.content.hero.imageUrl);
  const attractionContent = attraction.attraction.content;

  return (
    <div>
      <section className="h-[calc(100vh-120px)]">
        <div className="relative h-full w-full">
          <Image
            src={heroImageUrl}
            alt={attraction.attraction.name}
            fill
            className="w-full h-full object-cover"
            priority
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center border border-white/70 text-white text-center bg-white/20 p-8 rounded-3xl backdrop-blur-sm w-max">
            <h1 className="text-5xl font-cinzel capitalize">
              {attraction.attraction.content.hero.title}
            </h1>
            <p className="text-2xl font-cinzel tracking-widest !text-black">
              {attraction.attraction.content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>
      {attraction.attraction.layout === AttractionLayout.layout1 ? (
        <section>
          <div className="py-16">
            <Marquee texts={attraction.attraction.content.marqueeTexts} />
          </div>
        </section>
      ) : null}
      <section>
        {attraction.attraction.layout === AttractionLayout.layout1 ? (
          <AboutSectionL1 content={attractionContent.aboutSection} />
        ) : null}
        {attraction.attraction.layout === AttractionLayout.layout2 ? (
          <AboutSectionL2 content={attractionContent.aboutSection} />
        ) : null}
        {attraction.attraction.layout === AttractionLayout.layout3 ? (
          <AboutSectionL3 content={attractionContent.aboutSection} />
        ) : null}
      </section>
      <section>
        <TagSection
          content={{
            sectionTag: attractionContent.feature.tag,
            title: attractionContent.feature.title,
            description: attractionContent.feature.subtitle,
            bg: "color",
          }}
        />
        <div className="py-20 bg-background-light">
          <Carousel
            items={attractionContent.carouselSection.images.map((image) => ({
              image,
              name: "",
            }))}
            type="image"
            imageCarouselType="default"
            title="MEMORABLE STAYS, SHARED EXPERIENCES"
          />
        </div>
        {/* <div className="py-20">
          <Carousel
            items={attractionContent.carouselSection.images.map((image) => ({
              image,
              name: "",
            }))}
            type="image"
            imageCarouselType="lightFooterNav"
          />
        </div> */}
      </section>

      <section>
        <TagSection
          content={{
            sectionTag: attractionContent.reviews.tag,
            title: attractionContent.reviews.title,
            description: "",
            bg: "color-light",
          }}
        />
        <div className="pb-20 bg-background-ultra-light pt-16">
          <Carousel items={attractionContent.reviews.items} type="review" />
        </div>
      </section>
      <Gallery content={attractionContent.gallery} />
    </div>
  );
};

export default AttractionPage;
