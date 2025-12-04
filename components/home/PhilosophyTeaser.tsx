import Link from 'next/link';

interface PhilosophyTeaserProps {
  imageUrl: string;
  title: string;
  description: string;
}

export function PhilosophyTeaser({ imageUrl, title, description }: PhilosophyTeaserProps) {
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div
          className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        <div className="flex flex-col gap-6 items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold leading-tight tracking-tight font-serif sm:text-4xl">
              {title}
            </h2>
            <p className="text-base font-normal leading-relaxed">
              {description}
            </p>
          </div>
          <Link href="/philosophy">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 sm:h-12 sm:px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
              <span className="truncate">Pelajari Lebih Lanjut</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
