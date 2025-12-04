'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  defaultValue: string;
}

export function ProductSearch({ defaultValue }: ProductSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }

    // Reset to page 1 when searching
    params.delete('page');

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari produk berdasarkan nama..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          disabled={isPending}
        />
      </div>
    </form>
  );
}
