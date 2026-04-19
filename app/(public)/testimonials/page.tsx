import { createClient } from "@/lib/supabase/server";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/supabase/types";

export const revalidate = 3600;

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "1", client_name: "Priya & Rahul Sharma", wedding_date: "October 2024", location: "Dallas, TX", review: "Spring Blooms Decor turned our wedding into an absolute fairy tale! The mandap was breathtaking and every floral arrangement was more beautiful than we imagined. Our guests are still talking about it months later!", rating: 5, image_url: null, display_order: 1, created_at: "" },
  { id: "2", client_name: "Ananya & Vikram Patel", wedding_date: "August 2024", location: "Houston, TX", review: "We hired Spring Blooms for our entire wedding weekend — Mehndi, Sangeet, and Reception. Each event was uniquely decorated yet cohesive. Absolutely worth every penny. Professional, creative, and so easy to work with!", rating: 5, image_url: null, display_order: 2, created_at: "" },
  { id: "3", client_name: "Deepika & Arjun Nair", wedding_date: "June 2024", location: "Irving, TX", review: "The team was incredible from start to finish. They understood our vision for a modern-traditional fusion and executed it flawlessly. The floral installations were Instagram-worthy!", rating: 5, image_url: null, display_order: 3, created_at: "" },
  { id: "4", client_name: "Sunita & Karan Mehta", wedding_date: "March 2024", location: "Frisco, TX", review: "Exceptional service and stunning decor! We had a very specific vision with peacock motifs and marigold themes and Spring Blooms brought it to life beyond our expectations. Highly recommend!", rating: 5, image_url: null, display_order: 4, created_at: "" },
];

export default async function TestimonialsPage() {
  let testimonials: Testimonial[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("testimonials").select("*").order("display_order");
    if (data && data.length > 0) testimonials = data;
  } catch {}

  const items = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-maroon py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Love Stories</p>
        <h1 className="text-ivory text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          What Our Couples Say
        </h1>
        <p className="text-ivory/70 mt-4 max-w-xl mx-auto">
          Real stories from real couples whose celebrations we had the honor of making unforgettable.
        </p>
      </div>

      {/* Overall rating */}
      <div className="bg-ivory-dark py-8 border-b border-gold/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5].map((s) => <Star key={s} className="w-6 h-6 text-gold fill-gold" />)}
          </div>
          <p className="text-maroon font-bold text-lg">5.0 out of 5 — 98% Satisfaction Rate</p>
          <p className="text-muted-foreground text-sm">Based on 500+ events decorated across the USA</p>
        </div>
      </div>

      {/* Testimonials grid */}
      <div className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
                <Quote className="w-8 h-8 text-gold/40 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6 italic">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-maroon font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>{t.client_name}</p>
                    <p className="text-muted-foreground text-sm">{[t.wedding_date, t.location].filter(Boolean).join(" • ")}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
