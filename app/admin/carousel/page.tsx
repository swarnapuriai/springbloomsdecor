"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Eye, EyeOff, GripVertical, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import { toast } from "sonner";
import type { CarouselImage } from "@/lib/supabase/types";

export default function AdminCarouselPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [pendingUpload, setPendingUpload] = useState<{ url: string; path: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("carousel_images")
      .select("*")
      .order("display_order");
    if (error) toast.error("Failed to load images");
    else setImages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = (url: string, path: string) => {
    setPendingUpload({ url, path });
  };

  const handleAdd = async () => {
    if (!pendingUpload) { toast.error("Please upload an image first"); return; }
    setSaving(true);
    const { error } = await supabase.from("carousel_images").insert({
      url: pendingUpload.url,
      storage_path: pendingUpload.path,
      caption: newCaption || null,
      display_order: images.length + 1,
      active: true,
    });
    if (error) toast.error("Failed to add image");
    else {
      toast.success("Image added to carousel");
      setPendingUpload(null);
      setNewCaption("");
      setShowAddForm(false);
      fetchImages();
    }
    setSaving(false);
  };

  const toggleActive = async (image: CarouselImage) => {
    const { error } = await supabase
      .from("carousel_images")
      .update({ active: !image.active })
      .eq("id", image.id);
    if (error) toast.error("Failed to update");
    else {
      toast.success(image.active ? "Image hidden" : "Image shown");
      fetchImages();
    }
  };

  const deleteImage = async (image: CarouselImage) => {
    if (!confirm("Delete this image from the carousel?")) return;
    const { error: storageError } = await supabase.storage.from("carousel").remove([image.storage_path]);
    if (storageError) console.warn("Storage delete failed:", storageError.message);
    const { error } = await supabase.from("carousel_images").delete().eq("id", image.id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Image deleted"); fetchImages(); }
  };

  const updateCaption = async (id: string, caption: string) => {
    const { error } = await supabase.from("carousel_images").update({ caption }).eq("id", id);
    if (error) toast.error("Failed to update caption");
    else toast.success("Caption updated");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-maroon text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Hero Carousel</h1>
          <p className="text-muted-foreground mt-1">Manage the full-screen hero images on your homepage.</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 bg-maroon text-ivory px-4 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gold/20 mb-8">
          <h2 className="text-maroon font-bold text-lg mb-4">Add New Carousel Image</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Upload Image</label>
              <ImageUploader bucket="carousel" onUpload={handleUpload} />
              {pendingUpload && <p className="text-xs text-green-600 mt-2">✓ Image uploaded, click Add to save</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Caption (optional)</label>
              <input value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="e.g. Breathtaking Mandap Designs" className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              <div className="mt-4 flex gap-3">
                <button onClick={handleAdd} disabled={saving || !pendingUpload} className="flex items-center gap-2 bg-maroon text-ivory px-5 py-2 rounded-lg hover:bg-maroon-light transition-colors text-sm font-semibold disabled:opacity-60">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />} Add to Carousel
                </button>
                <button onClick={() => { setShowAddForm(false); setPendingUpload(null); setNewCaption(""); }} className="px-5 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-maroon animate-spin" /></div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No carousel images yet. Add your first image above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${image.active ? "border-gold/20" : "border-border opacity-60"}`}>
              <div className="relative h-48">
                <Image src={image.url} alt={image.caption || "Carousel image"} fill className="object-cover" />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <button onClick={() => toggleActive(image)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${image.active ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-400 text-white hover:bg-gray-500"}`} title={image.active ? "Hide" : "Show"}>
                    {image.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => deleteImage(image)} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute top-2 left-2">
                  <GripVertical className="w-5 h-5 text-white/60" />
                </div>
              </div>
              <div className="p-4">
                <input
                  defaultValue={image.caption || ""}
                  onBlur={(e) => updateCaption(image.id, e.target.value)}
                  placeholder="Add a caption..."
                  className="w-full text-sm border-b border-dashed border-border focus:outline-none focus:border-gold bg-transparent pb-1"
                />
                <p className="text-xs text-muted-foreground mt-1.5">Order: {image.display_order}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
