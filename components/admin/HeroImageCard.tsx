'use client';

import { Trash2, Eye, EyeOff } from 'lucide-react';

interface HeroImageCardProps {
  image: {
    id: string;
    image_url: string;
  };
  index: number;
  isActive: boolean;
  showActiveButton: boolean;
  onSetActive: (id: string) => void;
  onDelete: (image: any) => void;
}

export function HeroImageCard({
  image,
  index,
  isActive,
  showActiveButton,
  onSetActive,
  onDelete,
}: HeroImageCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      {/* Active Badge */}
      {isActive && showActiveButton && (
        <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block">
          Aktif
        </div>
      )}

      {/* Image - Simple, no overlay */}
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={image.image_url}
          alt={`Hero ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image Number */}
      <p className="text-sm font-medium text-gray-700">Gambar {index + 1}</p>

      {/* Buttons - Below image, not on top */}
      <div className="flex gap-2">
        {showActiveButton && (
          <button
            onClick={() => onSetActive(image.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isActive ? (
              <>
                <Eye className="w-4 h-4" />
                <span>Aktif</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Atur Aktif</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={() => onDelete(image)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Hapus</span>
        </button>
      </div>
    </div>
  );
}
