import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import styles from "./LandingCarousel.module.css";
import Image from "next/image";
import { Image as ImageType } from "@/types/landing-page";
import { getImageUrl } from "@/lib/utils";

type PropType = {
  slides: ImageType[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
      ...options,
    },
    [
      Autoplay({
        delay: 2000, // autoplay delay in ms
        stopOnInteraction: false, // keeps autoplay running after user interaction
        stopOnMouseEnter: true, // pause on hover (recommended)
      }),
    ]
  );

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((image, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image
                src={getImageUrl(image.src)}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
