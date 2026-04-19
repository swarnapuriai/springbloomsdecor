import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ContactSettings, SocialSettings } from "@/lib/supabase/types";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Mandap & Ceremony Decor",
  "Floral Arrangements",
  "Reception Decor",
  "Mehndi & Sangeet",
  "Haldi Ceremony",
  "Baraat Arrangements",
];

const DEFAULT_CONTACT: ContactSettings = {
  phone: "+1 (555) 123-4567",
  email: "info@springbloomsdecor.com",
  address: "Dallas–Fort Worth, Texas",
  hours: "Mon–Sat: 9 AM – 7 PM",
};

const DEFAULT_SOCIAL: SocialSettings = {
  instagram: "https://instagram.com/springbloomsdecor",
  facebook: "https://facebook.com/springbloomsdecor",
  pinterest: "https://pinterest.com/springbloomsdecor",
};

async function getSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["contact", "social"]);

    const contact =
      (data?.find((r) => r.key === "contact")?.value as ContactSettings) ??
      DEFAULT_CONTACT;
    const social =
      (data?.find((r) => r.key === "social")?.value as SocialSettings) ??
      DEFAULT_SOCIAL;

    return { contact, social };
  } catch {
    return { contact: DEFAULT_CONTACT, social: DEFAULT_SOCIAL };
  }
}

export default async function Footer() {
  const { contact, social } = await getSettings();

  return (
    <footer className="bg-maroon-dark text-ivory">
      {/* Decorative border */}
      <div className="h-1 bg-gradient-to-r from-maroon via-gold to-maroon" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/images/logo.jpg"
                  alt="Spring Blooms Decor"
                  width={160}
                  height={52}
                  className="h-14 w-auto object-contain brightness-200 contrast-75"
                />
              </Link>
            </div>
            <p className="text-ivory/70 text-sm leading-relaxed mb-5">
              Crafting timeless Indian wedding dreams across America with
              breathtaking florals, mandap setups, and bespoke event design.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-maroon hover:bg-gold hover:text-maroon transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-maroon hover:bg-gold hover:text-maroon transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {social.pinterest && (
                <a
                  href={social.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-maroon hover:bg-gold hover:text-maroon transition-colors flex items-center justify-center"
                  aria-label="Pinterest"
                >
                  <PinterestIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-gold font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-gold font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-ivory/70 hover:text-gold text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-gold font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-ivory/70 text-sm">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="hover:text-gold transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ivory/70 text-sm">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ivory/70 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>{contact.address}</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block bg-gold text-maroon-dark font-semibold px-5 py-2 rounded hover:bg-gold-light transition-colors text-sm"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-maroon flex flex-col sm:flex-row justify-between items-center gap-3 text-ivory/50 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Spring Blooms Decor. All rights
            reserved.
          </p>
          <p>Crafted with love for Indian weddings in America 🌸</p>
        </div>
      </div>
    </footer>
  );
}
