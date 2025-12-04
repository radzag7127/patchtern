'use client';

import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';

export function ProductGrid() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-subtle-light">Memuat produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">Gagal memuat produk: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-subtle-light">Belum ada produk tersedia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
