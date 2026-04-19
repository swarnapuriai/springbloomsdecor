import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GalleryImage } from "@/lib/supabase/types";

const FALLBACK_IMAGES = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    caption: "Mandap Design",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    caption: "Floral Arrangements",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    caption: "Reception Decor",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    caption: "Sangeet Night",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&q=80",
    caption: "Mehndi Decor",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
    caption: "Floral Wall",
  },
];

export default function GalleryTeaser({
  images,
}: {
  images: GalleryImage[];
}) {
  const displayImages =
    images.length > 0 ? images.slice(0, 6) : FALLBACK_IMAGES;

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
            Our Portfolio
          </p>
          <h2 className="section-heading mb-4">Photo Gallery</h2>
          <p className="section-subheading">
            A glimpse into the beautiful celebrations we have had the honor of
            decorating.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-xl group ${
                index === 0 || index === 3 ? "row-span-2 md:row-span-1" : ""
              }`}
              style={{
                aspectRatio: index === 0 || index === 3 ? "1/1.2" : "1/1",
              }}
            >
              <Image
                src={image.url}
                alt={image.caption || `Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/40 transition-colors duration-300 flex items-end">
                {image.caption && (
                  <p className="text-ivory text-sm font-semibold p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {image.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-maroon text-ivory font-semibold px-8 py-3 rounded hover:bg-maroon-light transition-colors"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
