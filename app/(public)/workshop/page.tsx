export default function WorkshopPage() {
  return (
    <div className="px-4 sm:px-10 py-16">
      <div className="mx-auto max-w-[680px]">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Workshop Patchtern
          </h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-highlight-light border border-border-light rounded-lg p-6 mb-12">
          <p className="text-sm text-subtle-light text-center">
            Workshop saat ini masih dalam tahap pengembangan dokumentasi & modul
          </p>
        </div>

        {/* Purpose */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Tujuan Workshop</h2>
          <p className="text-base leading-loose mb-4">
            Workshop Patchtern dirancang untuk memberikan pengetahuan dan
            keterampilan praktis dalam mengolah limbah kain menjadi produk
            Patchtern yang bernilai.
          </p>
          <p className="text-base leading-loose">
            Kami ingin memberdayakan komunitas untuk melihat limbah tekstil
            bukan sebagai sampah, tetapi sebagai sumber daya yang berharga untuk
            berkreasi.
          </p>
        </div>

        {/* Workshop Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Jenis Workshop</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base leading-loose">
                Pengenalan Dasar Patchtern - Teknik dasar menjahit dan
                menyatukan kain
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base leading-loose">
                Pengelolaan Limbah Fashion - Memahami dampak limbah tekstil dan
                cara menguranginya
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base leading-loose">
                Kreasi Produk Sederhana - Membuat pouch, coaster, atau aksesori
                kecil
              </span>
            </li>
          </ul>
        </div>

        {/* Target Audience */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Sasaran Workshop</h2>
          <p className="text-base leading-loose mb-4">
            Workshop kami terbuka untuk berbagai kelompok, terutama:
          </p>
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base">
                PKK dan kelompok ibu rumah tangga
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base">Komunitas desa dan kelurahan</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base">
                Kelompok perempuan dan pengrajin
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span className="text-base">
                Sekolah dan institusi pendidikan
              </span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-base mb-6">
            Tertarik mengadakan workshop di komunitas Anda?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-opacity"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
