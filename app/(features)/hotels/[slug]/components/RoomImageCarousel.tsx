/* eslint-disable @next/next/no-img-element */
"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { getImageUrl } from "@/lib/utils";
import React, { useState } from "react";
import {
  DotButton,
  useDotButton,
} from "../../../../../components/embla-carousel/EmblaCarouselDotButton";
import { RoomImage } from "@/types/hotel";
import { Modal } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./RoomCarouselArrowButtons";

type PropType = {
  slides: RoomImage[];
  options?: EmblaOptionsType;
};

const RoomImageCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [emblaRefModal, emblaApiModal] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    selectedIndex: selectedIndexModal,
    scrollSnaps: scrollSnapsModal,
    onDotButtonClick: onDotButtonClickModal,
  } = useDotButton(emblaApiModal);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const {
    prevBtnDisabled: prevBtnDisabledModal,
    nextBtnDisabled: nextBtnDisabledModal,
    onPrevButtonClick: onPrevButtonClickModal,
    onNextButtonClick: onNextButtonClickModal,
  } = usePrevNextButtons(emblaApiModal);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderCarousel = (isModal: boolean) => {
    const ref = isModal ? emblaRefModal : emblaRef;
    const sIndex = isModal ? selectedIndexModal : selectedIndex;
    const sSnaps = isModal ? scrollSnapsModal : scrollSnaps;
    const onDotClick = isModal ? onDotButtonClickModal : onDotButtonClick;
    const prevDisabled = isModal ? prevBtnDisabledModal : prevBtnDisabled;
    const nextDisabled = isModal ? nextBtnDisabledModal : nextBtnDisabled;
    const onPrev = isModal ? onPrevButtonClickModal : onPrevButtonClick;
    const onNext = isModal ? onNextButtonClickModal : onNextButtonClick;

    return (
      <div className={`embla-room ${isModal ? "fullscreen-carousel" : ""}`}>
        <div className="embla-room__viewport" ref={ref}>
          <div className="embla-room__container">
            {slides.map((image) => (
              <div className="embla-room__slide" key={image.id}>
                <img
                  className={`embla-room__slide__img ${!isModal && "h-42"}`}
                  src={getImageUrl(image.url)}
                  alt={image.alt ?? `Room image ${image.id}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="embla-room__dots">
          {sSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotClick(index)}
              className={"!w-2 !h-2 embla-room__dot".concat(
                index === sIndex ? " embla-room__dot--selected" : ""
              )}
            />
          ))}
        </div>
        <PrevButton onClick={onPrev} disabled={prevDisabled} />
        <NextButton onClick={onNext} disabled={nextDisabled} />
      </div>
    );
  };

  return (
    <div className="relative">
      {renderCarousel(false)}
      <button
        onClick={showModal}
        className="absolute top-2 right-2 bg-black/10 bg-opacity-50 text-white px-2 py-1 rounded-md hover:bg-opacity-75 transition-opacity"
        aria-label="View fullscreen"
      >
        <FullscreenOutlined />
      </button>

      {isModalVisible ? (
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          closable={false}
          width="100vw"
          style={{ top: 0, padding: 0, height: "100vh", maxWidth: "100vw" }}
          bodyStyle={{
            padding: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            overflow: "hidden",
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {renderCarousel(true)}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Exit fullscreen"
            >
              <FullscreenExitOutlined />
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default RoomImageCarousel;
