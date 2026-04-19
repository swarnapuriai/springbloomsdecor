"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { FAQ } from "@/lib/supabase/types";

const CATEGORIES = ["booking", "services", "payment", "logistics", "general"];

const emptyFaq: Omit<FAQ, "id" | "created_at"> = {
  question: "",
  answer: "",
  category: "general",
  display_order: 0,
};

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ ...emptyFaq });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  const fetchAll = async () => {
    setLoading(true);
    const { data } = await supabase.from("faqs").select("*").order("display_order");
    setFaqs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyFaq, display_order: faqs.length + 1 });
    setShowForm(true);
  };

  const openEdit = (f: FAQ) => {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer, category: f.category, display_order: f.display_order });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.question || !form.answer) { toast.error("Question and answer are required"); return; }
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("faqs").update(form).eq("id", editing.id);
      if (error) toast.error("Failed to update");
      else { toast.success("FAQ updated"); setShowForm(false); fetchAll(); }
    } else {
      const { error } = await supabase.from("faqs").insert(form);
      if (error) toast.error("Failed to create");
      else { toast.success("FAQ added"); setShowForm(false); fetchAll(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Deleted"); fetchAll(); }
  };

  const grouped = faqs.reduce((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>FAQs</h1>
          <p className="text-muted-foreground mt-1">Manage frequently asked questions.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-maroon text-ivory px-4 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 mb-8">
          <h2 className="text-maroon font-bold text-lg mb-4">{editing ? "Edit FAQ" : "Add FAQ"}</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Display Order</label>
                <input type="number" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: parseInt(e.target.value) }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Question *</label>
              <input value={form.question} onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="How far in advance should I book?" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Answer *</label>
              <textarea value={form.answer} onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))} rows={4} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" placeholder="The answer to this question..." />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-maroon text-ivory px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 hover:bg-maroon-light transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {editing ? "Update FAQ" : "Add FAQ"}
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-maroon animate-spin" /></div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-maroon text-lg font-bold mb-3 pb-2 border-b border-gold/20" style={{ fontFamily: "var(--font-playfair), serif" }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="space-y-3">
                {items.map((f) => (
                  <div key={f.id} className="bg-white rounded-xl p-5 shadow-sm border border-gold/10 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-foreground font-semibold mb-1.5">{f.question}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.answer}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => openEdit(f)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(f.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
