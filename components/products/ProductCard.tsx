import { Product } from '@/types/models';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="overflow-hidden rounded-xl mb-4">
        <div
          className="w-full aspect-[3/4] bg-center bg-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          style={{ backgroundImage: `url("${product.image_url}")` }}
          role="img"
          aria-label={product.name}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-sm text-subtle-light line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 text-xs text-subtle-light">
          <span>{product.material}</span>
          {product.size && (
            <>
              <span>•</span>
              <span>{product.size}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
