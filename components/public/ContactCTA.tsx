import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ContactSettings } from "@/lib/supabase/types";

const DEFAULT_CONTACT: ContactSettings = {
  phone: "+1 (555) 123-4567",
  email: "info@springbloomsdecor.com",
  address: "Dallas–Fort Worth, Texas",
  hours: "Mon–Sat: 9 AM – 7 PM",
};

async function getContactSettings(): Promise<ContactSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "contact")
      .single();
    return (data?.value as ContactSettings) ?? DEFAULT_CONTACT;
  } catch {
    return DEFAULT_CONTACT;
  }
}

export default async function ContactCTA() {
  const contact = await getContactSettings();

  return (
    <section className="py-20 bg-ivory-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - CTA text */}
          <div>
            <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
              Let&apos;s Create Together
            </p>
            <h2
              className="text-maroon text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Ready to Plan Your
              <br />
              <span className="text-gold italic">Dream Wedding?</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Let&apos;s begin your journey to a breathtaking celebration.
              Contact us today for a free consultation and personalized quote.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-maroon" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="font-semibold hover:text-maroon transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-maroon" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-semibold hover:text-maroon transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-maroon" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <span className="font-semibold">{contact.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-maroon" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Hours</div>
                  <span className="font-semibold">{contact.hours}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block text-center bg-maroon text-ivory font-semibold px-8 py-3 rounded hover:bg-maroon-light transition-colors"
              >
                Send a Message
              </Link>
              <a
                href={`tel:${contact.phone.replace(/\D/g, "")}`}
                className="inline-block text-center border-2 border-maroon text-maroon font-semibold px-8 py-3 rounded hover:bg-maroon hover:text-ivory transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>

          {/* Right - Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-80 lg:h-96 bg-ivory-dark border border-gold/20">
            <iframe
              title="Spring Blooms Decor Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429024.2984165!2d-97.28803955000001!3d32.7766642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9940c4c80499%3A0x8af09df5786413a3!2sDallas-Fort%20Worth%20Metroplex%2C%20TX!5e0!3m2!1sen!2sus!4v1714500000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
