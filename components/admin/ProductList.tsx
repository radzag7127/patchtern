'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

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
  created_at: string;
  updated_at: string;
}

interface ProductListProps {
  searchQuery: string;
  sortBy: string;
  categoryFilter: string;
  onEdit: (product: Product) => void;
}

export function ProductList({ searchQuery, sortBy, categoryFilter, onEdit }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 12;
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, sortBy, categoryFilter, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (searchQuery.trim()) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      // Apply category filter
      if (categoryFilter && categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      // Apply sorting
      if (sortBy === 'name_asc') {
        query = query.order('name', { ascending: true });
      } else if (sortBy === 'name_desc') {
        query = query.order('name', { ascending: false });
      } else {
        // Default: newest first (recently created/updated)
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      query = query.range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) throw error;

      setDeleteConfirm(null);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Gagal menghapus produk');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_featured: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      fetchProducts();
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('Gagal mengubah status featured');
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {searchQuery ? 'Tidak ada produk yang sesuai dengan pencarian' : 'Belum ada produk'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url("${product.image_url}")` }}
                role="img"
                aria-label={product.name}
              />
              {product.is_featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
              {product.material && (
                <p className="text-xs text-gray-400 mb-3 truncate">{product.material}</p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFeatured(product.id, product.is_featured)}
                  className={`flex-1 text-xs py-2 px-3 rounded transition-colors ${
                    product.is_featured
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {product.is_featured ? 'Unfeatured' : 'Set Featured'}
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded border transition-colors ${
                currentPage === page
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
