"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll be in touch within 24 hours.");
    setForm({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventType: "",
      message: "",
    });
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gold/10">
      <h2
        className="text-maroon text-2xl font-bold mb-6"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Your Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Priya Sharma"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="priya@example.com"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Event Date
            </label>
            <input
              name="eventDate"
              type="date"
              value={form.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Event Type
          </label>
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white"
          >
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
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Tell Us About Your Vision *
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe your dream decor, color theme, guest count, venue, special requests..."
            className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm bg-white resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-maroon text-ivory font-semibold py-3 rounded-lg hover:bg-maroon-light transition-colors disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
