"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/supabase/types";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    client_name: "Priya & Rahul Sharma",
    wedding_date: "October 2024",
    location: "Dallas, TX",
    review:
      "Spring Blooms Decor turned our wedding into an absolute fairy tale! The mandap was breathtaking and every floral arrangement was more beautiful than we imagined.",
    rating: 5,
    image_url: null,
    display_order: 1,
    created_at: "",
  },
  {
    id: "2",
    client_name: "Ananya & Vikram Patel",
    wedding_date: "August 2024",
    location: "Houston, TX",
    review:
      "We hired Spring Blooms for our entire wedding weekend — Mehndi, Sangeet, and Reception. Each event was uniquely decorated yet cohesive. Absolutely worth every penny!",
    rating: 5,
    image_url: null,
    display_order: 2,
    created_at: "",
  },
  {
    id: "3",
    client_name: "Deepika & Arjun Nair",
    wedding_date: "June 2024",
    location: "Irving, TX",
    review:
      "The team was incredible from start to finish. They understood our vision for a modern-traditional fusion and executed it flawlessly. Highly recommend!",
    rating: 5,
    image_url: null,
    display_order: 3,
    created_at: "",
  },
];

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const items =
    testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    );
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="py-20 bg-maroon">
      {/* Top ornament */}
      <div className="text-center mb-12">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
          Love Stories
        </p>
        <h2
          className="text-ivory text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          What Our Couples Say
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gold/40" />
          <span className="text-gold text-xl">✦</span>
          <div className="h-px w-16 bg-gold/40" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {items.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] min-w-0 px-4"
              >
                <div className="bg-maroon-dark/50 rounded-2xl p-8 md:p-12 text-center border border-gold/20">
                  <Quote className="w-10 h-10 text-gold/40 mx-auto mb-6" />
                  <p className="text-ivory/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gold fill-gold"
                      />
                    ))}
                  </div>
                  <p
                    className="text-gold font-bold text-lg"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {t.client_name}
                  </p>
                  {(t.wedding_date || t.location) && (
                    <p className="text-ivory/60 text-sm mt-1">
                      {[t.wedding_date, t.location].filter(Boolean).join(" • ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/40 text-ivory flex items-center justify-center transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/40 text-ivory flex items-center justify-center transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === selectedIndex ? "bg-gold w-6" : "bg-ivory/30 w-2"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
