"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Check, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Testimonial } from "@/lib/supabase/types";

const empty: Omit<Testimonial, "id" | "created_at"> = {
  client_name: "",
  wedding_date: null,
  location: null,
  review: "",
  rating: 5,
  image_url: null,
  display_order: 0,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ ...empty, wedding_date: "", location: "" });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  const fetchAll = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("display_order");
    setTestimonials(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ client_name: "", wedding_date: "", location: "", review: "", rating: 5, image_url: null, display_order: testimonials.length + 1 });
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ client_name: t.client_name, wedding_date: t.wedding_date || "", location: t.location || "", review: t.review, rating: t.rating, image_url: t.image_url, display_order: t.display_order });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.client_name || !form.review) { toast.error("Name and review are required"); return; }
    setSaving(true);
    const payload = { ...form, wedding_date: form.wedding_date || null, location: form.location || null };
    if (editing) {
      const { error } = await supabase.from("testimonials").update(payload).eq("id", editing.id);
      if (error) toast.error("Failed to update");
      else { toast.success("Testimonial updated"); setShowForm(false); fetchAll(); }
    } else {
      const { error } = await supabase.from("testimonials").insert(payload);
      if (error) toast.error("Failed to create");
      else { toast.success("Testimonial added"); setShowForm(false); fetchAll(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Deleted"); fetchAll(); }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client reviews displayed on your website.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-maroon text-ivory px-4 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 mb-8">
          <h2 className="text-maroon font-bold text-lg mb-4">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Client Name *</label>
              <input value={form.client_name} onChange={(e) => setForm((p) => ({ ...p, client_name: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Priya & Rahul Sharma" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Rating</label>
              <select value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: parseInt(e.target.value) }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">
                {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Wedding Date</label>
              <input value={form.wedding_date || ""} onChange={(e) => setForm((p) => ({ ...p, wedding_date: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="October 2024" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Location</label>
              <input value={form.location || ""} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Dallas, TX" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Review *</label>
              <textarea value={form.review} onChange={(e) => setForm((p) => ({ ...p, review: e.target.value }))} rows={4} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" placeholder="What did the client say?" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-maroon text-ivory px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 hover:bg-maroon-light transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {editing ? "Update Review" : "Add Review"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-maroon animate-spin" /></div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm border border-gold/10 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <p className="text-maroon font-semibold" style={{ fontFamily: "var(--font-playfair), serif" }}>{t.client_name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />)}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm italic mb-2">&ldquo;{t.review}&rdquo;</p>
                <p className="text-muted-foreground text-xs">{[t.wedding_date, t.location].filter(Boolean).join(" • ")}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(t)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(t.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
