import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSearch } from "@/components/products/ProductSearch";
import { Pagination } from "@/components/products/Pagination";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = (params.search as string) || "";
  const ITEMS_PER_PAGE = 12;

  const supabase = await createClient();

  // Build query
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("is_visible", true)
    .order("display_order", { ascending: true });

  // Add search filter if provided
  if (search.trim()) {
    query = query.ilike("name", `%${search}%`);
  }

  // Add pagination
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;
  query = query.range(from, to);

  const { data: products, error, count } = await query;

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4">
            Produk Kami
          </h1>
          <p className="text-base sm:text-lg text-subtle-light max-w-2xl mx-auto">
            Koleksi karya Patchtern yang dibuat dengan tangan dari limbah kain
            berkualitas
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <ProductSearch defaultValue={search} />
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-600">Gagal memuat produk</p>
          </div>
        )}

        {/* Empty State */}
        {!error && products && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-subtle-light">
              {search
                ? "Tidak ada produk yang sesuai dengan pencarian"
                : "Belum ada produk tersedia"}
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!error && products && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                search={search}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
