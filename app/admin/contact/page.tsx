"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type ContactInfo = {
  phone: string;
  email: string;
  address: string;
  hours: string;
};

type SocialLinks = {
  instagram: string;
  facebook: string;
  pinterest: string;
};

type AboutInfo = {
  tagline: string;
  story: string;
};

export default function AdminContactPage() {
  const [contact, setContact] = useState<ContactInfo>({ phone: "", email: "", address: "", hours: "" });
  const [social, setSocial] = useState<SocialLinks>({ instagram: "", facebook: "", pinterest: "" });
  const [about, setAbout] = useState<AboutInfo>({ tagline: "", story: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      data.forEach((row) => {
        if (row.key === "contact") setContact(row.value as ContactInfo);
        if (row.key === "social") setSocial(row.value as SocialLinks);
        if (row.key === "about") setAbout(row.value as AboutInfo);
      });
    }
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const saveSetting = async (key: string, value: object) => {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (error) throw error;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveSetting("contact", contact),
        saveSetting("social", social),
        saveSetting("about", about),
      ]);
      toast.success("Settings saved successfully");
    } catch {
      toast.error("Failed to save settings");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="p-8 flex justify-center py-16"><Loader2 className="w-8 h-8 text-maroon animate-spin" /></div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Contact & Settings</h1>
          <p className="text-muted-foreground mt-1">Update contact information and site settings.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-maroon text-ivory px-4 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Contact info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/10">
          <h2 className="text-maroon font-bold text-lg mb-5" style={{ fontFamily: "var(--font-playfair), serif" }}>Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Phone Number</label>
              <input value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email Address</label>
              <input type="email" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="info@springbloomsdecor.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Address / Location</label>
              <input value={contact.address} onChange={(e) => setContact((p) => ({ ...p, address: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="123 Blossom Lane, Dallas, TX" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Business Hours</label>
              <input value={contact.hours} onChange={(e) => setContact((p) => ({ ...p, hours: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Mon–Sat: 9 AM – 7 PM" />
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/10">
          <h2 className="text-maroon font-bold text-lg mb-5" style={{ fontFamily: "var(--font-playfair), serif" }}>Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Instagram URL</label>
              <input value={social.instagram} onChange={(e) => setSocial((p) => ({ ...p, instagram: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Facebook URL</label>
              <input value={social.facebook} onChange={(e) => setSocial((p) => ({ ...p, facebook: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Pinterest URL</label>
              <input value={social.pinterest} onChange={(e) => setSocial((p) => ({ ...p, pinterest: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="https://pinterest.com/..." />
            </div>
          </div>
        </div>

        {/* About / Brand */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/10">
          <h2 className="text-maroon font-bold text-lg mb-5" style={{ fontFamily: "var(--font-playfair), serif" }}>Brand / About</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Tagline</label>
              <input value={about.tagline} onChange={(e) => setAbout((p) => ({ ...p, tagline: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Crafting Timeless Indian Wedding Dreams in America" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">About Story (shown on About page)</label>
              <textarea value={about.story} onChange={(e) => setAbout((p) => ({ ...p, story: e.target.value }))} rows={5} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" placeholder="Tell your story..." />
            </div>
          </div>
        </div>

        {/* Save button at bottom */}
        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-maroon text-ivory px-8 py-3 rounded-lg font-semibold disabled:opacity-60 hover:bg-maroon-light transition-colors">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
