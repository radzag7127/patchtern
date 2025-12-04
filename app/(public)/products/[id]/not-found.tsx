import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-bold text-gray-300">404</div>
        <h1 className="text-3xl font-bold">Produk Tidak Ditemukan</h1>
        <p className="text-subtle-light">
          Maaf, produk yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Lihat Semua Produk
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-gray-300 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
