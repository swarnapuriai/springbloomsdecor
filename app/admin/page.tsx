import { createClient } from "@/lib/supabase/server";
import { Images, ImageIcon, MessageSquare, DollarSign, HelpCircle, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const supabase = await createClient();
    const [
      { count: carousel },
      { count: gallery },
      { count: services },
      { count: pricing },
      { count: testimonials },
      { count: faqs },
    ] = await Promise.all([
      supabase.from("carousel_images").select("*", { count: "exact", head: true }),
      supabase.from("gallery_images").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("pricing_packages").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("faqs").select("*", { count: "exact", head: true }),
    ]);
    return { carousel, gallery, services, pricing, testimonials, faqs };
  } catch {
    return { carousel: 0, gallery: 0, services: 0, pricing: 0, testimonials: 0, faqs: 0 };
  }
}

const quickLinks = [
  { label: "Manage Hero Carousel", href: "/admin/carousel", icon: Images, desc: "Upload and reorder hero images" },
  { label: "Manage Gallery", href: "/admin/gallery", icon: ImageIcon, desc: "Add and organize gallery photos" },
  { label: "Manage Services", href: "/admin/services", icon: Wrench, desc: "Edit service descriptions" },
  { label: "Manage Pricing", href: "/admin/pricing", icon: DollarSign, desc: "Update packages and pricing" },
  { label: "Manage Testimonials", href: "/admin/testimonials", icon: MessageSquare, desc: "Add client reviews" },
  { label: "Manage FAQs", href: "/admin/faq", icon: HelpCircle, desc: "Edit frequently asked questions" },
];

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const statCards = [
    { label: "Carousel Images", value: stats.carousel ?? 0, icon: Images, href: "/admin/carousel" },
    { label: "Gallery Images", value: stats.gallery ?? 0, icon: ImageIcon, href: "/admin/gallery" },
    { label: "Services", value: stats.services ?? 0, icon: Wrench, href: "/admin/services" },
    { label: "Pricing Packages", value: stats.pricing ?? 0, icon: DollarSign, href: "/admin/pricing" },
    { label: "Testimonials", value: stats.testimonials ?? 0, icon: MessageSquare, href: "/admin/testimonials" },
    { label: "FAQs", value: stats.faqs ?? 0, icon: HelpCircle, href: "/admin/faq" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your website content from here. Changes are reflected live.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="bg-white rounded-xl p-5 shadow-sm border border-gold/10 hover:shadow-md transition-all hover:-translate-y-0.5 text-center group">
            <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-maroon transition-colors">
              <Icon className="w-5 h-5 text-maroon group-hover:text-ivory transition-colors" />
            </div>
            <div className="text-2xl font-bold text-maroon" style={{ fontFamily: "var(--font-playfair), serif" }}>{value}</div>
            <div className="text-muted-foreground text-xs mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-maroon text-xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map(({ label, href, icon: Icon, desc }) => (
          <Link key={href} href={href} className="bg-white rounded-xl p-6 shadow-sm border border-gold/10 hover:shadow-md transition-all hover:-translate-y-0.5 group flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center shrink-0 group-hover:bg-maroon transition-colors">
              <Icon className="w-5 h-5 text-maroon group-hover:text-ivory transition-colors" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground text-sm">{label}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-maroon transition-colors" />
          </Link>
        ))}
      </div>

      {/* Website link */}
      <div className="mt-8 bg-maroon rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-ivory font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Live Website</h3>
          <p className="text-ivory/70 text-sm">View how your website looks to visitors</p>
        </div>
        <Link href="/" target="_blank" className="bg-gold text-maroon-dark font-semibold px-5 py-2 rounded hover:bg-gold-light transition-colors text-sm">
          View Site →
        </Link>
      </div>
    </div>
  );
}
