"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import { toast } from "sonner";
import type { GalleryImage } from "@/lib/supabase/types";

const CATEGORIES = ["general", "mandap", "floral", "reception", "mehndi", "haldi", "baraat"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [pendingUpload, setPendingUpload] = useState<{ url: string; path: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const supabase = createClient();

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("gallery_images").select("*").order("display_order");
    if (error) toast.error("Failed to load gallery");
    else setImages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleAdd = async () => {
    if (!pendingUpload) { toast.error("Please upload an image first"); return; }
    setSaving(true);
    const { error } = await supabase.from("gallery_images").insert({
      url: pendingUpload.url,
      storage_path: pendingUpload.path,
      caption: newCaption || null,
      category: newCategory,
      display_order: images.length + 1,
    });
    if (error) toast.error("Failed to add image");
    else {
      toast.success("Image added to gallery");
      setPendingUpload(null);
      setNewCaption("");
      setNewCategory("general");
      setShowAddForm(false);
      fetchImages();
    }
    setSaving(false);
  };

  const deleteImage = async (image: GalleryImage) => {
    if (!confirm("Delete this gallery image?")) return;
    await supabase.storage.from("gallery").remove([image.storage_path]);
    const { error } = await supabase.from("gallery_images").delete().eq("id", image.id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Image deleted"); fetchImages(); }
  };

  const filtered = filterCategory === "all" ? images : images.filter((i) => i.category === filterCategory);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio images.</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 bg-maroon text-ivory px-4 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 mb-8">
          <h2 className="text-maroon font-bold text-lg mb-4">Add Gallery Image</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Upload Image</label>
              <ImageUploader bucket="gallery" onUpload={(url, path) => setPendingUpload({ url, path })} />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Caption (optional)</label>
                <input value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="Describe this image" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleAdd} disabled={saving || !pendingUpload} className="flex items-center gap-2 bg-maroon text-ivory px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 hover:bg-maroon-light transition-colors">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />} Add to Gallery
                </button>
                <button onClick={() => { setShowAddForm(false); setPendingUpload(null); }} className="px-5 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...CATEGORIES].map((cat) => (
          <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filterCategory === cat ? "bg-maroon text-ivory" : "bg-white border border-border hover:border-maroon text-muted-foreground"}`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-maroon animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No images in this category yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((image) => (
            <div key={image.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-border">
              <div className="relative h-40">
                <Image src={image.url} alt={image.caption || "Gallery"} fill className="object-cover" />
                <button onClick={() => deleteImage(image)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <span className="inline-block px-2 py-0.5 bg-maroon/10 text-maroon text-xs rounded-full mb-1.5">{image.category}</span>
                <p className="text-xs text-muted-foreground truncate">{image.caption || "No caption"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
