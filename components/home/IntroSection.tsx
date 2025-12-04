interface IntroSectionProps {
  text: string;
}

export function IntroSection({ text }: IntroSectionProps) {
  return (
    <div className="px-6 py-16 sm:py-24 flex justify-center">
      <div className="max-w-2xl text-center">
        <p className="text-base font-normal leading-relaxed sm:text-lg">
          {text}
        </p>
      </div>
    </div>
  );
}
