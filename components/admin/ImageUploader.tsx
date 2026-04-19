"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Props = {
  bucket: string;
  onUpload: (url: string, storagePath: string) => void;
  accept?: string;
};

export default function ImageUploader({ bucket, onUpload, accept = "image/*" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10 MB");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: false });

    if (uploadError) {
      toast.error(`Upload failed: ${uploadError.message}`);
      setPreview(null);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onUpload(data.publicUrl, path);
    toast.success("Image uploaded successfully");
    setUploading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        id="image-upload-input"
      />
      {preview ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          {!uploading && (
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <label
          htmlFor="image-upload-input"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gold/40 rounded-xl cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors"
        >
          <Upload className="w-8 h-8 text-gold/60 mb-2" />
          <p className="text-muted-foreground text-sm font-medium">
            Click or drag to upload
          </p>
          <p className="text-muted-foreground text-xs mt-1">PNG, JPG, WEBP up to 10 MB</p>
        </label>
      )}
    </div>
  );
}
