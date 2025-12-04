'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Plus, Search, Activity, Image as ImageIcon, Home, FolderTree } from 'lucide-react';
import Link from 'next/link';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import type { User } from '@supabase/supabase-js';
import type { Category } from '@/types/models';

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const supabase = createClient();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) {
        setCategories(data as Category[]);
      }
    };

    fetchCategories();
  }, [supabase]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    handleCloseForm();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Panel Admin</h1>
              <p className="text-xs sm:text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home size={18} />
                <span className="hidden md:inline">Kembali ke Halaman Utama</span>
                <span className="md:hidden">Beranda</span>
              </Link>
              <Link
                href="/admin/hero"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ImageIcon size={18} />
                <span className="hidden sm:inline">Gambar Hero</span>
                <span className="sm:hidden">Hero</span>
              </Link>
              <Link
                href="/admin/activity"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Activity size={18} />
                <span className="hidden sm:inline">Log Aktivitas</span>
                <span className="sm:hidden">Log</span>
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FolderTree size={18} />
                <span className="hidden sm:inline">Kelola Kategori</span>
                <span className="sm:hidden">Kategori</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Add Button */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-opacity"
          >
            <Plus size={20} />
            Tambah Produk
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="sortBy" className="block text-xs font-medium text-gray-700 mb-1">
              Urutkan
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="default">Terbaru Ditambahkan</option>
              <option value="name_asc">Nama: A ke Z</option>
              <option value="name_desc">Nama: Z ke A</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="categoryFilter" className="block text-xs font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.display_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onClose={handleCloseForm}
            onSuccess={handleSuccess}
          />
        )}

        {/* Product List */}
        <ProductList
          searchQuery={searchQuery}
          sortBy={sortBy}
          categoryFilter={categoryFilter}
          onEdit={handleEdit}
          key={refreshTrigger}
        />
      </main>
    </div>
  );
}
