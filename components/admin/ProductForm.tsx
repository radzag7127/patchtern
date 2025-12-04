"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, Upload, Loader2 } from "lucide-react";
import type { Category } from "@/types/models";

interface Product {
  id: string;
  name: string;
  description: string | null;
  material: string | null;
  size: string | null;
  image_url: string;
  category: string;
  display_order: number;
  is_visible: boolean;
  is_featured: boolean;
}

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(
    product?.image_url || ""
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    material: product?.material || "",
    size: product?.size || "",
    category: product?.category || "kemeja",
    display_order: 0, // Always 0, field removed from UI
    is_visible: true, // Always visible, field removed from UI
    is_featured: product?.is_featured || false,
    image_url: product?.image_url || "",
  });

  const supabase = createClient();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });

      if (data) {
        setCategories(data as Category[]);
      }
    };

    fetchCategories();
  }, [supabase]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    setUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image_url: urlData.publicUrl }));
      setImagePreview(urlData.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengupload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Nama produk harus diisi");
      return;
    }
    if (!formData.image_url) {
      alert("Gambar produk harus diupload");
      return;
    }

    setLoading(true);
    try {
      const productData = {
        ...formData,
        updated_at: new Date().toISOString(),
      };

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert([productData]);

        if (error) throw error;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Gagal menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {product ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Produk *
            </label>
            <div className="space-y-3">
              {imagePreview && (
                <div className="relative w-full aspect-square max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url("${imagePreview}")` }}
                    role="img"
                    aria-label="Preview"
                  />
                </div>
              )}
              <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary cursor-pointer transition-colors">
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengupload...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>
                      {imagePreview ? "Ganti Gambar" : "Upload Gambar"}
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading || loading}
                />
              </label>
              <p className="text-xs text-gray-500 text-center">
                Format: JPG, PNG. Maksimal 5MB
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama Produk *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Contoh: Kemeja Patchtern Vintage"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Deskripsi produk..."
            />
          </div>

          {/* Material & Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Material
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Contoh: Katun Patchtern"
              />
            </div>
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ukuran
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Contoh: L, XL"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kategori
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.display_name}
                  </option>
                ))
              ) : (
                <option value="kemeja">Kemeja</option>
              )}
            </select>
          </div>

          {/* Featured Checkbox */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">
                Jadikan produk unggulan (featured)
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Produk unggulan akan ditampilkan di halaman utama
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>{product ? "Update Produk" : "Tambah Produk"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
