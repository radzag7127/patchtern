import Link from 'next/link';

export function WorkshopTeaser() {
  return (
    <div className="px-6 py-16 sm:py-20 text-center">
      <p className="text-base">
        Ikuti workshop kami yang akan datang.{' '}
        <Link href="/workshop" className="font-medium text-primary hover:underline underline-offset-4">
          Cari Tahu Lebih Lanjut
        </Link>
      </p>
    </div>
  );
}
