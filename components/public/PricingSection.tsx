import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import type { PricingPackage } from "@/lib/supabase/types";

const DEFAULT_PACKAGES: PricingPackage[] = [
  {
    id: "1",
    name: "Silver Blossoms",
    price_label: "Starting at $2,500",
    description: "Perfect for intimate ceremonies and smaller celebrations.",
    features: [
      "Mandap setup (basic)",
      "Bridal & groom garlands",
      "Table centerpieces (10 tables)",
      "Entrance floral arrangement",
      "Setup & breakdown",
    ],
    is_popular: false,
    event_type: "wedding",
    display_order: 1,
    created_at: "",
  },
  {
    id: "2",
    name: "Golden Marigold",
    price_label: "Starting at $5,500",
    description: "Our most popular package for mid-size weddings.",
    features: [
      "Custom mandap design",
      "Full floral package",
      "Table centerpieces (25 tables)",
      "Stage & backdrop",
      "Ambient lighting",
      "Sweetheart table",
      "Setup & breakdown",
    ],
    is_popular: true,
    event_type: "wedding",
    display_order: 2,
    created_at: "",
  },
  {
    id: "3",
    name: "Royal Heritage",
    price_label: "Starting at $10,000",
    description: "The ultimate luxury experience with bespoke design.",
    features: [
      "Fully custom mandap",
      "Premium floral throughout",
      "Unlimited tables",
      "Grand entrance design",
      "Crystal lighting",
      "Day-of coordination",
      "Setup & breakdown",
    ],
    is_popular: false,
    event_type: "wedding",
    display_order: 3,
    created_at: "",
  },
];

export default function PricingSection({
  packages,
}: {
  packages: PricingPackage[];
}) {
  const weddingPackages = packages.length > 0
    ? packages.filter((p) => p.event_type === "wedding").slice(0, 3)
    : DEFAULT_PACKAGES;

  return (
    <section className="py-20 bg-ivory-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
            Investment
          </p>
          <h2 className="section-heading mb-4">Wedding Packages</h2>
          <p className="section-subheading">
            Transparent pricing with no hidden fees. All packages can be
            customized to match your vision and budget.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {weddingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl overflow-hidden ${
                pkg.is_popular
                  ? "bg-maroon text-ivory shadow-xl scale-105"
                  : "bg-white border border-gold/20 shadow-sm hover:shadow-md"
              } transition-all duration-300`}
            >
              {pkg.is_popular && (
                <div className="absolute top-0 left-0 right-0 bg-gold text-maroon-dark text-center text-xs font-bold py-1.5 tracking-widest uppercase">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${pkg.is_popular ? "pt-12" : ""}`}>
                <h3
                  className={`text-xl font-bold mb-1 ${
                    pkg.is_popular ? "text-gold" : "text-maroon"
                  }`}
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-2xl font-bold mb-3 ${
                    pkg.is_popular ? "text-ivory" : "text-maroon"
                  }`}
                >
                  {pkg.price_label}
                </p>
                <p
                  className={`text-sm mb-6 ${
                    pkg.is_popular ? "text-ivory/70" : "text-muted-foreground"
                  }`}
                >
                  {pkg.description}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          pkg.is_popular ? "text-gold" : "text-maroon"
                        }`}
                      />
                      <span
                        className={
                          pkg.is_popular ? "text-ivory/90" : "text-foreground"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center font-semibold py-3 rounded transition-colors ${
                    pkg.is_popular
                      ? "bg-gold text-maroon-dark hover:bg-gold-light"
                      : "bg-maroon text-ivory hover:bg-maroon-light"
                  }`}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-maroon font-semibold hover:text-maroon-light transition-colors"
          >
            View all packages including events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
