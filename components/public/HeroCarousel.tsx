"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselImage } from "@/lib/supabase/types";

const FALLBACK_SLIDES = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    caption: "Breathtaking Mandap Designs",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=80",
    caption: "Exquisite Floral Arrangements",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80",
    caption: "Unforgettable Reception Decor",
  },
];

type Slide = {
  id: string;
  url: string;
  caption: string | null;
};

export default function HeroCarousel({
  images,
}: {
  images: CarouselImage[];
}) {
  const slides: Slide[] = images.length > 0 ? images : FALLBACK_SLIDES;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] h-full min-w-0"
            >
              <Image
                src={slide.url}
                alt={slide.caption || `Wedding decor slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        {/* Decorative element */}
        <div className="text-gold/80 text-2xl mb-3">✦ ✦ ✦</div>
        <p className="text-gold uppercase tracking-widest text-sm md:text-base mb-3 font-light">
          Indian Wedding &amp; Event Decorators
        </p>
        <h1
          className="text-ivory text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 drop-shadow-2xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Spring Blooms
          <br />
          <span className="text-gold">Decor</span>
        </h1>
        <p className="text-ivory/90 text-base md:text-xl max-w-2xl mb-8 font-light">
          Crafting timeless Indian wedding dreams across America with
          breathtaking florals, mandap setups, and bespoke event design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/gallery"
            className="bg-gold text-maroon-dark font-semibold px-8 py-3 rounded hover:bg-gold-light transition-colors"
          >
            View Our Work
          </Link>
          <Link
            href="/contact"
            className="border-2 border-ivory text-ivory font-semibold px-8 py-3 rounded hover:bg-ivory hover:text-maroon transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Caption */}
        {slides[selectedIndex]?.caption && (
          <div className="mt-8 text-ivory/70 text-sm italic">
            {slides[selectedIndex].caption}
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-ivory flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-ivory flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-gold w-6"
                : "bg-ivory/50 hover:bg-ivory/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
