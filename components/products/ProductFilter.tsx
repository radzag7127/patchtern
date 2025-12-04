'use client';

import { useState } from 'react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export function ProductFilter() {
  const [selected, setSelected] = useState('all');

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex gap-2 bg-background-light border border-border-light rounded-full p-1">
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelected(category.value)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selected === category.value
                ? 'bg-primary text-white'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
