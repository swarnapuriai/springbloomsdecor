"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Check, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { PricingPackage } from "@/lib/supabase/types";

const emptyPkg: Omit<PricingPackage, "id" | "created_at"> = {
  name: "",
  price_label: "",
  description: "",
  features: [],
  is_popular: false,
  event_type: "wedding",
  display_order: 0,
};

export default function AdminPricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PricingPackage | null>(null);
  const [form, setForm] = useState({ ...emptyPkg });
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("pricing_packages").select("*").order("display_order");
    setPackages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyPkg, features: [], display_order: packages.length + 1 });
    setFeatureInput("");
    setShowForm(true);
  };

  const openEdit = (p: PricingPackage) => {
    setEditing(p);
    setForm({ name: p.name, price_label: p.price_label, description: p.description, features: [...p.features], is_popular: p.is_popular, event_type: p.event_type, display_order: p.display_order });
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
    if (!form.name || !form.price_label || !form.description) { toast.error("Please fill all required fields"); return; }
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("pricing_packages").update(form).eq("id", editing.id);
      if (error) toast.error("Failed to update");
      else { toast.success("Package updated"); setShowForm(false); fetch(); }
    } else {
      const { error } = await supabase.from("pricing_packages").insert(form);
      if (error) toast.error("Failed to create");
      else { toast.success("Package added"); setShowForm(false); fetch(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    const { error } = await supabase.from("pricing_packages").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Package deleted"); fetch(); }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Pricing Packages</h1>
          <p className="text-muted-foreground mt-1">Manage your pricing packages shown on the website.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-maroon text-ivory px-4 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 mb-8">
          <h2 className="text-maroon font-bold text-lg mb-4">{editing ? "Edit Package" : "Add Package"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Package Name *</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Golden Marigold" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Price Label *</label>
              <input value={form.price_label} onChange={(e) => setForm((p) => ({ ...p, price_label: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Starting at $5,500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Event Type</label>
              <select value={form.event_type} onChange={(e) => setForm((p) => ({ ...p, event_type: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">
                <option value="wedding">Wedding</option>
                <option value="event">Event / Party</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" id="is_popular" checked={form.is_popular} onChange={(e) => setForm((p) => ({ ...p, is_popular: e.target.checked }))} className="w-4 h-4 accent-maroon" />
              <label htmlFor="is_popular" className="text-sm font-semibold">Mark as Most Popular</label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Description *</label>
              <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" placeholder="Brief package description" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Features</label>
              <div className="flex gap-2 mb-2">
                <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFeature()} className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Add feature and press Enter" />
                <button onClick={addFeature} className="px-4 py-2.5 bg-maroon text-ivory rounded-lg text-sm hover:bg-maroon-light transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.features.map((f, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-maroon/10 text-maroon rounded-full text-sm">
                    {f}<button onClick={() => removeFeature(i)}><X className="w-3 h-3" /></button>
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
              {editing ? "Update Package" : "Add Package"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-maroon animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((p) => (
            <div key={p.id} className={`bg-white rounded-xl p-5 shadow-sm border ${p.is_popular ? "border-gold" : "border-gold/10"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {p.is_popular && <Sparkles className="w-4 h-4 text-gold" />}
                    <h3 className="text-maroon font-bold">{p.name}</h3>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{p.event_type}</span>
                  </div>
                  <p className="text-gold font-bold">{p.price_label}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.features.map((f) => <span key={f} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
