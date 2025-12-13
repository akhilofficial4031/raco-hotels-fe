"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselImageItem } from "./types";
import styles from "./carousel.module.css";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { ReviewItem } from "@/types/hotel";

interface Props {
  items: (CarouselImageItem | ReviewItem)[];
  type: "image" | "review";
  imageCarouselType?: "default" | "darkHeader" | "lightFooterNav";
  title?: string;
}

// const StarIcon = () => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
//   </svg>
// );

const ReviewCard: React.FC<{ item: ReviewItem }> = ({ item }) => (
  <div className={`${styles.reviewCard}`}>
    <Image
      src="/avatar.jpg"
      alt={item.name}
      width={80}
      height={80}
      className={styles.reviewAvatar}
    />
    <p className={`${styles.reviewText} text-left `}>{item.review}</p>
    {/* <div className={`${styles.reviewRating} text-primary`}>
      {Array(item.stars)
        .fill(0)
        .map((_, i) => (
          <StarIcon key={i} />
        ))}
    </div> */}
    <p className={`${styles.reviewUser} text-primary`}>{item.name}</p>
  </div>
);

const ArrowButtons = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => (
  <>
    <button
      className={`${styles.embla__button} ${styles.embla__button__prev}`}
      onClick={onPrev}
      aria-label="Previous slide"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
    <button
      className={`${styles.embla__button} ${styles.embla__button__next}`}
      onClick={onNext}
      aria-label="Next slide"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </>
);

const Carousel: React.FC<Props> = ({
  items,
  type,
  imageCarouselType = "default",
  title,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div
      className={`${styles.embla} ${
        type === "image" ? styles[imageCarouselType] : ""
      } container mx-auto`}
    >
      {type === "image" && imageCarouselType === "darkHeader" && (
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>{title}</h2>
          <div className={styles.headerNav}>
            <ArrowButtons onPrev={scrollPrev} onNext={scrollNext} />
          </div>
        </div>
      )}
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {items.map((item, index) => (
            <div className={styles.embla__slide} key={index}>
              {type === "image" ? (
                <>
                  <Image
                    src={getImageUrl((item as CarouselImageItem).image)}
                    alt={(item as CarouselImageItem).name}
                    width={200}
                    height={200}
                    className={styles.embla__slide__img}
                  />
                  {imageCarouselType === "default" && (
                    <h3 className={styles.embla__slide__title}>
                      {(item as CarouselImageItem).name}
                    </h3>
                  )}
                </>
              ) : (
                <ReviewCard item={item as ReviewItem} />
              )}
            </div>
          ))}
        </div>
      </div>

      {(type === "review" ||
        (type === "image" && imageCarouselType === "default")) && (
        <ArrowButtons onPrev={scrollPrev} onNext={scrollNext} />
      )}
      {type === "image" && imageCarouselType === "lightFooterNav" && (
        <div className={styles.footerNav}>
          <ArrowButtons onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      )}
    </div>
  );
};

export default Carousel;
