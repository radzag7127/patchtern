'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search?: string;
}

export function Pagination({ currentPage, totalPages, search }: PaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (search) {
      params.set('search', search);
    }
    return `/products?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-2">
      {/* Previous Button */}
      <Link
        href={buildUrl(Math.max(1, currentPage - 1))}
        className={`p-2 rounded border transition-colors ${
          currentPage === 1
            ? 'border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'
            : 'border-gray-300 hover:bg-gray-50'
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <Link
            key={index}
            href={buildUrl(page)}
            className={`px-4 py-2 rounded border transition-colors ${
              currentPage === page
                ? 'bg-primary text-white border-primary'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="px-2 text-gray-400">
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <Link
        href={buildUrl(Math.min(totalPages, currentPage + 1))}
        className={`p-2 rounded border transition-colors ${
          currentPage === totalPages
            ? 'border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'
            : 'border-gray-300 hover:bg-gray-50'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
}
