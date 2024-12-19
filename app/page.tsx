


import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
  return (
   
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
     

  );
}
