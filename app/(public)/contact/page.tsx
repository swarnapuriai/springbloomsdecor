"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission (replace with actual API call or EmailJS)
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", phone: "", eventDate: "", eventType: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-maroon py-16 text-center">
        <p className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">Get In Touch</p>
        <h1 className="text-ivory text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Contact Us
        </h1>
        <p className="text-ivory/70 mt-4 max-w-xl mx-auto">
          Ready to start planning? We&apos;d love to hear about your vision. Reach out for a free consultation.
        </p>
      </div>

      <div className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
              <h2 className="text-maroon text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Priya Sharma" className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="priya@example.com" className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Event Date</label>
                    <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Event Type</label>
                  <select name="eventType" value={form.eventType} onChange={handleChange} className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white">
                    <option value="">Select event type</option>
                    <option>Wedding (Full)</option>
                    <option>Wedding Reception Only</option>
                    <option>Mehndi Night</option>
                    <option>Sangeet</option>
                    <option>Haldi Ceremony</option>
                    <option>Baraat</option>
                    <option>Birthday / Anniversary</option>
                    <option>Corporate Event</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Tell Us About Your Vision *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Describe your dream decor, color theme, guest count, venue, special requests..." className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-maroon text-ivory font-semibold py-3 rounded-lg hover:bg-maroon-light transition-colors disabled:opacity-60">
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
                <h2 className="text-maroon text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Contact Information
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
                    { icon: Mail, label: "Email", value: "info@springbloomsdecor.com", href: "mailto:info@springbloomsdecor.com" },
                    { icon: MapPin, label: "Location", value: "Dallas–Fort Worth, Texas", href: null },
                    { icon: Clock, label: "Business Hours", value: "Mon–Sat: 9 AM – 7 PM CST", href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-maroon" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} className="font-semibold text-foreground hover:text-maroon transition-colors">{value}</a>
                        ) : (
                          <p className="font-semibold text-foreground">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm font-semibold text-foreground mb-3">Follow Our Work</p>
                  <div className="flex gap-3">
                    <a href="https://instagram.com/springbloomsdecor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-maroon transition-colors">
                      <InstagramIcon className="w-4 h-4" /> @springbloomsdecor
                    </a>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <a href="https://facebook.com/springbloomsdecor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-maroon transition-colors">
                      <FacebookIcon className="w-4 h-4" /> Spring Blooms Decor
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gold/10 h-64">
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
        </div>
      </div>
    </div>
  );
}
