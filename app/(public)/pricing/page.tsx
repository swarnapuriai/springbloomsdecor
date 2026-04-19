import { createClient } from "@/lib/supabase/server";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import type { PricingPackage } from "@/lib/supabase/types";

export const revalidate = 3600;

const DEFAULT_PACKAGES: PricingPackage[] = [
  { id: "1", name: "Silver Blossoms", price_label: "Starting at $2,500", description: "Perfect for intimate ceremonies and smaller celebrations with elegant essential decor.", features: ["Mandap setup (basic)", "Bridal & groom garlands", "Table centerpieces (10 tables)", "Entrance floral arrangement", "Setup & breakdown"], is_popular: false, event_type: "wedding", display_order: 1, created_at: "" },
  { id: "2", name: "Golden Marigold", price_label: "Starting at $5,500", description: "Our most popular package for mid-size weddings with comprehensive decor services.", features: ["Custom mandap design", "Full floral package", "Table centerpieces (25 tables)", "Stage & backdrop", "Ambient lighting", "Entrance & aisle decor", "Sweetheart table", "Setup & breakdown"], is_popular: true, event_type: "wedding", display_order: 2, created_at: "" },
  { id: "3", name: "Royal Heritage", price_label: "Starting at $10,000", description: "The ultimate luxury experience with bespoke design, premium florals, and full-service coordination.", features: ["Fully custom mandap", "Premium floral throughout", "Unlimited tables", "Grand entrance design", "Crystal chandelier lighting", "Lounge areas", "Photo wall & installations", "Day-of coordination", "Setup & breakdown"], is_popular: false, event_type: "wedding", display_order: 3, created_at: "" },
  { id: "4", name: "Celebration Package", price_label: "Starting at $1,200", description: "Great for Sangeet, Mehndi, Birthday, and other celebrations.", features: ["Colorful draping", "Stage backdrop", "Table centerpieces (10 tables)", "Photobooth corner", "Basic lighting"], is_popular: false, event_type: "event", display_order: 4, created_at: "" },
];

function PackageCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${pkg.is_popular ? "bg-maroon text-ivory shadow-xl" : "bg-white border border-gold/20 shadow-sm"}`}>
      {pkg.is_popular && (
        <div className="bg-gold text-maroon-dark text-center text-xs font-bold py-1.5 tracking-widest uppercase">
          <Sparkles className="w-3 h-3 inline mr-1" />Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className={`text-xl font-bold mb-1 ${pkg.is_popular ? "text-gold" : "text-maroon"}`} style={{ fontFamily: "var(--font-playfair), serif" }}>
          {pkg.name}
        </h3>
        <p className={`text-3xl font-bold mb-3 ${pkg.is_popular ? "text-ivory" : "text-maroon"}`}>{pkg.price_label}</p>
        <p className={`text-sm mb-6 ${pkg.is_popular ? "text-ivory/70" : "text-muted-foreground"}`}>{pkg.description}</p>
        <ul className="space-y-2.5 mb-8">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.is_popular ? "text-gold" : "text-maroon"}`} />
              <span className={pkg.is_popular ? "text-ivory/90" : ""}>{f}</span>
            </li>
          ))}
        </ul>
        <Link href="/contact" className={`block text-center font-semibold py-3 rounded transition-colors ${pkg.is_popular ? "bg-gold text-maroon-dark hover:bg-gold-light" : "bg-maroon text-ivory hover:bg-maroon-light"}`}>
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

export default async function PricingPage() {
  let packages: PricingPackage[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("pricing_packages").select("*").order("display_order");
    if (data && data.length > 0) packages = data;
  } catch {}

  const allPackages = packages.length > 0 ? packages : DEFAULT_PACKAGES;
  const weddingPackages = allPackages.filter((p) => p.event_type === "wedding");
  const eventPackages = allPackages.filter((p) => p.event_type !== "wedding");

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-maroon py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Investment</p>
        <h1 className="text-ivory text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Pricing & Packages
        </h1>
        <p className="text-ivory/70 mt-4 max-w-xl mx-auto">
          Transparent pricing with no hidden fees. Every package can be fully customized.
        </p>
      </div>

      <div className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Wedding packages */}
          <div className="mb-16">
            <h2 className="text-maroon text-2xl md:text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Wedding Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weddingPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>
          </div>

          {/* Event packages */}
          {eventPackages.length > 0 && (
            <div className="mb-16">
              <h2 className="text-maroon text-2xl md:text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Event Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {eventPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            </div>
          )}

          {/* Note */}
          <div className="bg-ivory-dark rounded-2xl p-8 text-center border border-gold/20">
            <h3 className="text-maroon text-xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Need Something Custom?
            </h3>
            <p className="text-muted-foreground mb-5 max-w-2xl mx-auto">
              All packages are fully customizable. We&apos;ll work within your budget to create the wedding of your dreams.
              Contact us for a free consultation and personalized quote.
            </p>
            <Link href="/contact" className="inline-block bg-maroon text-ivory font-semibold px-8 py-3 rounded hover:bg-maroon-light transition-colors">
              Request Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
