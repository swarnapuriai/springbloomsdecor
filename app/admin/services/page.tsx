"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Service } from "@/lib/supabase/types";

const ICON_OPTIONS = ["Flower2", "Leaf", "Sparkles", "Star", "Sun", "Crown", "Heart", "Gift"];

const emptyService: Omit<Service, "id" | "created_at"> = {
  title: "",
  description: "",
  icon_name: "Flower2",
  features: [],
  display_order: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ ...emptyService, features: [] as string[] });
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("services").select("*").order("display_order");
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyService, features: [], display_order: services.length + 1 });
    setFeatureInput("");
    setShowForm(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description, icon_name: s.icon_name, features: [...s.features], display_order: s.display_order });
    setFeatureInput("");
    setShowForm(true);
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm((prev) => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
    setFeatureInput("");
  };

  const removeFeature = (i: number) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  };

  const handleSave = async () => {
    if (!form.title || !form.description) { toast.error("Title and description are required"); return; }
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("services").update(form).eq("id", editing.id);
      if (error) toast.error("Failed to update");
      else { toast.success("Service updated"); setShowForm(false); fetch(); }
    } else {
      const { error } = await supabase.from("services").insert(form);
      if (error) toast.error("Failed to create");
      else { toast.success("Service added"); setShowForm(false); fetch(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Service deleted"); fetch(); }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Services</h1>
          <p className="text-muted-foreground mt-1">Manage the services displayed on your website.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-maroon text-ivory px-4 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 mb-8">
          <h2 className="text-maroon font-bold text-lg mb-4">{editing ? "Edit Service" : "Add Service"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Title *</label>
              <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Mandap & Ceremonial Decor" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Icon</label>
              <select value={form.icon_name} onChange={(e) => setForm((p) => ({ ...p, icon_name: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">
                {ICON_OPTIONS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Description *</label>
              <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" placeholder="Describe this service..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Features</label>
              <div className="flex gap-2 mb-2">
                <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFeature()} className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Add a feature and press Enter" />
                <button onClick={addFeature} className="px-4 py-2.5 bg-maroon text-ivory rounded-lg text-sm hover:bg-maroon-light transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.features.map((f, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-maroon/10 text-maroon rounded-full text-sm">
                    {f}
                    <button onClick={() => removeFeature(i)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Display Order</label>
              <input type="number" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: parseInt(e.target.value) }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-maroon text-ivory px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 hover:bg-maroon-light transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {editing ? "Update Service" : "Add Service"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-maroon animate-spin" /></div>
      ) : (
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl p-5 shadow-sm border border-gold/10 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-maroon/10 text-maroon px-2 py-0.5 rounded-full">{s.icon_name}</span>
                  <h3 className="text-maroon font-semibold">{s.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{s.description}</p>
                {s.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.features.map((f) => <span key={f} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>)}
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(s.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
