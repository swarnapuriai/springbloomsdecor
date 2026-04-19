import { createClient } from "@/lib/supabase/server";
import { Check, Flower2, Leaf, Sparkles, Star, Sun, Crown } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/lib/supabase/types";

export const revalidate = 3600;

const iconMap: Record<string, React.ElementType> = {
  Flower2, Leaf, Sparkles, Star, Sun, Crown,
};

const DEFAULT_SERVICES: Service[] = [
  { id: "1", title: "Mandap & Ceremonial Decor", description: "Stunning mandap setups that blend traditional Indian artistry with elegant floral designs, creating the perfect sacred space for your wedding ceremony.", icon_name: "Flower2", features: ["Custom mandap design", "Fresh floral arrangements", "Fabric draping & lighting", "Traditional motifs", "Setup & teardown included"], display_order: 1, created_at: "" },
  { id: "2", title: "Floral Arrangements", description: "From bridal garlands to table centerpieces, our expert florists craft exquisite arrangements using seasonal blooms and traditional Indian flowers.", icon_name: "Leaf", features: ["Bridal & groom garlands", "Table centerpieces", "Ceremony florals", "Reception arrangements", "Marigold & rose decor"], display_order: 2, created_at: "" },
  { id: "3", title: "Reception & Banquet Decor", description: "Transform your reception venue into a magical space with our comprehensive decor packages including lighting, table settings, and stage design.", icon_name: "Sparkles", features: ["Stage & backdrop design", "Table centerpieces", "Ambient lighting", "Entrance decor", "Sweetheart table setup"], display_order: 3, created_at: "" },
  { id: "4", title: "Mehndi & Sangeet Decor", description: "Vibrant and festive decorations for your pre-wedding celebrations featuring bright colors, traditional patterns, and a joyful atmosphere.", icon_name: "Star", features: ["Colorful draping", "Photobooth setup", "Cushion seating areas", "Floral installations", "LED & fairy lights"], display_order: 4, created_at: "" },
  { id: "5", title: "Haldi Ceremony Decor", description: "Bright yellow and marigold themed decorations that bring the auspicious energy of the Haldi ceremony to life.", icon_name: "Sun", features: ["Marigold flower walls", "Yellow & orange draping", "Petal rangoli", "Traditional urns & decor", "Natural elements"], display_order: 5, created_at: "" },
  { id: "6", title: "Baraat Decor", description: "Make a grand entrance with beautifully decorated procession arrangements that create an unforgettable Baraat experience.", icon_name: "Crown", features: ["Decorated horse/carriage", "Flower petals & garlands", "Dhol coordination", "Processional florals", "Grand entrance setup"], display_order: 6, created_at: "" },
];

export default async function ServicesPage() {
  let services: Service[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("services").select("*").order("display_order");
    if (data && data.length > 0) services = data;
  } catch {}

  const displayServices = services.length > 0 ? services : DEFAULT_SERVICES;

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-maroon py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">What We Offer</p>
        <h1 className="text-ivory text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Our Services
        </h1>
        <p className="text-ivory/70 mt-4 max-w-xl mx-auto">
          From intimate ceremonies to grand celebrations, we craft every detail with passion and artistry.
        </p>
      </div>

      {/* Services */}
      <div className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {displayServices.map((service, index) => {
              const Icon = iconMap[service.icon_name] || Flower2;
              const isEven = index % 2 === 0;
              return (
                <div key={service.id} className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? "" : "md:flex-row-reverse"}`}>
                  {/* Icon block */}
                  <div className="flex-shrink-0 w-full md:w-48 h-48 bg-maroon/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-20 h-20 text-maroon/30" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-maroon" />
                      </div>
                      <h2 className="text-maroon text-2xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    {service.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-gold shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 bg-maroon rounded-2xl p-10">
            <h3 className="text-ivory text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Ready to Create Something Beautiful?
            </h3>
            <p className="text-ivory/70 mb-6">Contact us for a free consultation and personalized quote.</p>
            <Link href="/contact" className="inline-block bg-gold text-maroon-dark font-semibold px-8 py-3 rounded hover:bg-gold-light transition-colors">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
