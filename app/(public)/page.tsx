import { createClient } from "@/lib/supabase/server";
import HeroCarousel from "@/components/public/HeroCarousel";
import IntroSection from "@/components/public/IntroSection";
import ServicesPreview from "@/components/public/ServicesPreview";
import GalleryTeaser from "@/components/public/GalleryTeaser";
import TestimonialsCarousel from "@/components/public/TestimonialsCarousel";
import PricingSection from "@/components/public/PricingSection";
import FAQSection from "@/components/public/FAQSection";
import ContactCTA from "@/components/public/ContactCTA";

export const revalidate = 3600; // Revalidate every hour

async function getPageData() {
  try {
    const supabase = await createClient();

    const [
      { data: carousel },
      { data: gallery },
      { data: services },
      { data: pricing },
      { data: testimonials },
      { data: faqs },
    ] = await Promise.all([
      supabase
        .from("carousel_images")
        .select("*")
        .eq("active", true)
        .order("display_order"),
      supabase
        .from("gallery_images")
        .select("*")
        .order("display_order")
        .limit(6),
      supabase.from("services").select("*").order("display_order"),
      supabase
        .from("pricing_packages")
        .select("*")
        .order("display_order"),
      supabase.from("testimonials").select("*").order("display_order"),
      supabase.from("faqs").select("*").order("display_order").limit(5),
    ]);

    return {
      carousel: carousel ?? [],
      gallery: gallery ?? [],
      services: services ?? [],
      pricing: pricing ?? [],
      testimonials: testimonials ?? [],
      faqs: faqs ?? [],
    };
  } catch {
    return {
      carousel: [],
      gallery: [],
      services: [],
      pricing: [],
      testimonials: [],
      faqs: [],
    };
  }
}

export default async function HomePage() {
  const { carousel, gallery, services, pricing, testimonials, faqs } =
    await getPageData();

  return (
    <>
      <HeroCarousel images={carousel} />
      <IntroSection />
      <ServicesPreview services={services} />
      <GalleryTeaser images={gallery} />
      <TestimonialsCarousel testimonials={testimonials} />
      <PricingSection packages={pricing} />
      <FAQSection faqs={faqs} />
      <ContactCTA />
    </>
  );
}
