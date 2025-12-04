import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch product data
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-subtle-light hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Produk</span>
        </Link>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url("${product.image_url}")` }}
              role="img"
              aria-label={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Product Name */}
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Category */}
            <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full w-fit capitalize">
              {product.category}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-lg">
                <p className="text-subtle-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Details */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {product.material && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Material
                  </h3>
                  <p className="text-lg">{product.material}</p>
                </div>
              )}

              {product.size && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Ukuran
                  </h3>
                  <p className="text-lg">{product.size}</p>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Lihat Produk Lainnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
