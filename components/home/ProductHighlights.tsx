import Link from 'next/link';

interface Product {
  id: string;
  imageUrl: string;
  alt: string;
}

interface ProductHighlightsProps {
  products: Product[];
}

export function ProductHighlights({ products }: ProductHighlightsProps) {
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="text-3xl font-bold leading-tight tracking-tight font-serif sm:text-4xl text-center">
          Produk Pilihan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-xl block"
            >
              <div
                className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-pointer"
                style={{ backgroundImage: `url("${product.imageUrl}")` }}
                role="img"
                aria-label={product.alt}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
