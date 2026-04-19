import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

const CATEGORIES = ["all", "mandap", "floral", "reception", "mehndi", "haldi", "baraat", "general"];

const FALLBACK_IMAGES = [
  { id: "1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", caption: "Mandap Design", category: "mandap" },
  { id: "2", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", caption: "Floral Arrangements", category: "floral" },
  { id: "3", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", caption: "Reception Decor", category: "reception" },
  { id: "4", url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", caption: "Sangeet Night", category: "mehndi" },
  { id: "5", url: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&q=80", caption: "Mehndi Decor", category: "mehndi" },
  { id: "6", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", caption: "Floral Wall", category: "floral" },
  { id: "7", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", caption: "Haldi Setup", category: "haldi" },
  { id: "8", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", caption: "Reception Stage", category: "reception" },
  { id: "9", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", caption: "Baraat Decor", category: "baraat" },
];

export default async function GalleryPage() {
  let images = FALLBACK_IMAGES;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order");
    if (data && data.length > 0) images = data;
  } catch {}

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-maroon py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Our Portfolio</p>
        <h1 className="text-ivory text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Photo Gallery
        </h1>
        <p className="text-ivory/70 mt-4 max-w-xl mx-auto text-base">
          A glimpse into the beautiful celebrations we have had the honor of decorating across America.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="py-16 bg-ivory max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div key={image.id} className="break-inside-avoid relative group overflow-hidden rounded-xl">
              <Image
                src={image.url}
                alt={image.caption || `Gallery ${index + 1}`}
                width={400}
                height={index % 3 === 0 ? 500 : 300}
                className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/50 transition-colors rounded-xl flex items-end">
                  <p className="text-ivory text-sm font-semibold p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
