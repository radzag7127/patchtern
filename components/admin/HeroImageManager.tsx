'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HeroImageCard } from './HeroImageCard';

interface HeroSettings {
  id: string;
  carousel_enabled: boolean;
  active_image_id: string | null;
  transition_duration: number;
}

interface HeroImage {
  id: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

interface HeroImageManagerProps {
  initialSettings: HeroSettings | null;
  initialImages: HeroImage[];
}

export function HeroImageManager({ initialSettings, initialImages }: HeroImageManagerProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<HeroSettings | null>(initialSettings);
  const [images, setImages] = useState<HeroImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const supabase = createClient();

  // Sync state with props when router refreshes
  useEffect(() => {
    setSettings(initialSettings);
    setImages(initialImages);
  }, [initialSettings, initialImages]);

  const refreshData = () => {
    router.refresh();
  };

  const handleCarouselToggle = async () => {
    if (!settings) return;

    const newValue = !settings.carousel_enabled;
    const { error } = await supabase
      .from('hero_settings')
      .update({ carousel_enabled: newValue, updated_at: new Date().toISOString() })
      .eq('id', settings.id);

    if (!error) {
      setSettings({ ...settings, carousel_enabled: newValue });
    } else {
      alert('Gagal memperbarui pengaturan carousel');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    if (images.length >= 5) {
      alert('Maksimal 5 gambar hero');
      return;
    }

    setUploading(true);
    setUploadSuccess(false);

    try {
      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('hero-images')
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from('hero_images')
        .insert([{
          image_url: urlData.publicUrl,
          display_order: images.length,
          is_active: true
        }]);

      if (dbError) throw dbError;

      // Show success indicator
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

      refreshData();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal mengupload gambar');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (image: HeroImage) => {
    if (!confirm('Hapus gambar hero ini?')) return;

    try {
      // Extract filename from URL
      const fileName = image.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('hero-images').remove([fileName]);
      }

      // Delete from database
      const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', image.id);

      if (error) throw error;

      refreshData();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Gagal menghapus gambar');
    }
  };

  const handleSetActive = async (imageId: string) => {
    if (!settings) return;

    const { error } = await supabase
      .from('hero_settings')
      .update({ active_image_id: imageId, updated_at: new Date().toISOString() })
      .eq('id', settings.id);

    if (!error) {
      setSettings({ ...settings, active_image_id: imageId });
      refreshData();
    } else {
      alert('Gagal mengatur gambar aktif');
    }
  };

  return (
    <div className="space-y-8">
      {/* Success notification */}
      {uploadSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Gambar berhasil diupload!</span>
        </div>
      )}

      {/* Carousel Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Pengaturan Carousel</h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings?.carousel_enabled || false}
              onChange={handleCarouselToggle}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <div>
              <span className="font-medium">Aktifkan Carousel</span>
              <p className="text-sm text-gray-500">
                Jika diaktifkan, semua gambar akan berputar otomatis. Jika dinonaktifkan, hanya gambar terpilih yang ditampilkan.
              </p>
            </div>
          </label>

          {!settings?.carousel_enabled && (
            <div className="pl-8 text-sm text-gray-600">
              <p>Pilih gambar yang akan ditampilkan dengan klik ikon mata di bawah.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Gambar Hero</h2>
            <p className="text-sm text-gray-500">Maksimal 5 gambar, masing-masing 5MB. Gambar akan berganti setiap 5 detik dengan efek fade.</p>
          </div>

          {images.length < 5 && (
            <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 cursor-pointer transition-colors">
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Mengupload...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Gambar</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading || images.length >= 5}
              />
            </label>
          )}
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Belum ada gambar hero. Upload gambar pertama Anda!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <HeroImageCard
                key={image.id}
                image={image}
                index={index}
                isActive={settings?.active_image_id === image.id}
                showActiveButton={!settings?.carousel_enabled}
                onSetActive={handleSetActive}
                onDelete={handleDeleteImage}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">💡 Cara kerja:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><strong>Carousel AKTIF:</strong> Semua gambar berputar otomatis dengan transisi fade (5 detik per gambar)</li>
          <li><strong>Carousel NONAKTIF:</strong> Hanya gambar "Aktif" yang dipilih akan ditampilkan</li>
          <li><strong>Optimasi:</strong> Gambar otomatis disajikan melalui Supabase CDN untuk loading cepat</li>
          <li><strong>Rekomendasi:</strong> Gunakan gambar landscape (1920x1080 atau sejenisnya) untuk hasil terbaik</li>
        </ul>
      </div>
    </div>
  );
}
