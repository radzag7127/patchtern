interface HeroSectionProps {
  imageUrl: string;
  tagline: string;
}

export function HeroSection({ imageUrl, tagline }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${imageUrl}")`,
        }}
      />
      <div className="relative px-4 z-10 flex flex-col items-center gap-4 max-w-3xl">
        <h1 className="text-black text-4xl font-black leading-tight tracking-tight font-serif sm:text-5xl">
          {tagline}
        </h1>
      </div>
    </div>
  );
}
