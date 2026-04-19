import Link from "next/link";
import {
  Flower2,
  Leaf,
  Sparkles,
  Star,
  Sun,
  Crown,
  ArrowRight,
} from "lucide-react";
import type { Service } from "@/lib/supabase/types";

const iconMap: Record<string, React.ElementType> = {
  Flower2,
  Leaf,
  Sparkles,
  Star,
  Sun,
  Crown,
};

const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "Mandap & Ceremonial Decor",
    description:
      "Stunning mandap setups blending traditional Indian artistry with elegant floral designs.",
    icon_name: "Flower2",
    features: [],
    display_order: 1,
    created_at: "",
  },
  {
    id: "2",
    title: "Floral Arrangements",
    description:
      "From bridal garlands to table centerpieces, crafted with seasonal blooms and traditional Indian flowers.",
    icon_name: "Leaf",
    features: [],
    display_order: 2,
    created_at: "",
  },
  {
    id: "3",
    title: "Reception & Banquet Decor",
    description:
      "Transform your reception venue into a magical space with lighting, table settings, and stage design.",
    icon_name: "Sparkles",
    features: [],
    display_order: 3,
    created_at: "",
  },
  {
    id: "4",
    title: "Mehndi & Sangeet Decor",
    description:
      "Vibrant and festive decorations for your pre-wedding celebrations.",
    icon_name: "Star",
    features: [],
    display_order: 4,
    created_at: "",
  },
  {
    id: "5",
    title: "Haldi Ceremony Decor",
    description:
      "Bright marigold themed decorations that bring the auspicious energy of Haldi to life.",
    icon_name: "Sun",
    features: [],
    display_order: 5,
    created_at: "",
  },
  {
    id: "6",
    title: "Baraat Arrangements",
    description:
      "Make a grand entrance with beautifully decorated procession arrangements.",
    icon_name: "Crown",
    features: [],
    display_order: 6,
    created_at: "",
  },
];

export default function ServicesPreview({ services }: { services: Service[] }) {
  const displayServices =
    services.length > 0 ? services.slice(0, 6) : DEFAULT_SERVICES;

  return (
    <section className="py-20 bg-ivory-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
            What We Offer
          </p>
          <h2 className="section-heading mb-4">Our Services</h2>
          <p className="section-subheading">
            From intimate ceremonies to grand celebrations, we bring your vision
            to life with artistry and tradition.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => {
            const Icon = iconMap[service.icon_name] || Flower2;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gold/10 group"
              >
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon transition-colors">
                  <Icon className="w-6 h-6 text-maroon group-hover:text-ivory transition-colors" />
                </div>
                <h3
                  className="text-maroon font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-maroon text-ivory font-semibold px-8 py-3 rounded hover:bg-maroon-light transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
