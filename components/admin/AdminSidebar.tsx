"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  ImageIcon,
  Wrench,
  DollarSign,
  MessageSquare,
  HelpCircle,
  Phone,
  LogOut,
  Flower2,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero Carousel", href: "/admin/carousel", icon: Images },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "FAQs", href: "/admin/faq", icon: HelpCircle },
  { label: "Contact & Settings", href: "/admin/contact", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen">
      {/* Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-sidebar-primary flex items-center justify-center">
            <Flower2 className="w-5 h-5 text-maroon" />
          </div>
          <div>
            <div className="text-sidebar-primary font-bold text-sm" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Spring Blooms
            </div>
            <div className="text-sidebar-foreground/50 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
