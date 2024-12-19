//EmblaCarousel.tsx
"use client";
import React, { useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { useAutoplay } from "./EmblaCarouselAutoPlay";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";
import CarouselView1 from "../EmblaCarouselContent/carousel-view-1";
import CarouselView2 from "../EmblaCarouselContent/carousel-view-2";
import CarouselView3 from "../EmblaCarouselContent/carousel-view-3";
import CarouselView4 from "../EmblaCarouselContent/carousel-view-4";
import CarouselView5 from "../EmblaCarouselContent/carousel-view-5";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};
const carouselViews = [
  <CarouselView1 key={1}/>,
  <CarouselView2 key={2} />,
  <CarouselView3 key={3} />,
  <CarouselView4 key={4} />,
  <CarouselView5 key={5} />,
];
const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000, stopOnInteraction: false }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);
  
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
              {carouselViews[index] || null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => {
              emblaApi?.plugins()?.autoplay?.reset(); // Reinicia o autoplay
              onPrevButtonClick();
            }}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => {
              emblaApi?.plugins()?.autoplay?.reset(); // Reinicia o autoplay
              onNextButtonClick();
            }}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? "" : " embla__progress--hidden"
          )}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
