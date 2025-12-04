import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { HeroImageManager } from '@/components/admin/HeroImageManager';

export default async function HeroManagementPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }

  // Fetch hero settings
  const { data: settings } = await supabase
    .from('hero_settings')
    .select('*')
    .single();

  // Fetch hero images
  const { data: images } = await supabase
    .from('hero_images')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Kelola Gambar Hero</h1>
              <p className="text-xs sm:text-sm text-gray-600">{user.email}</p>
            </div>
            <a
              href="/admin"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
            >
              ← Kembali ke Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroImageManager initialSettings={settings} initialImages={images || []} />
      </main>
    </div>
  );
}
