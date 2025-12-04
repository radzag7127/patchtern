import { Leaf, Circle, Palette, Heart } from 'lucide-react';

const VALUES = [
  {
    icon: Leaf,
    title: 'Keberlanjutan',
    description: 'Menghormati planet dengan memberikan kehidupan baru pada material yang terlupakan.',
  },
  {
    icon: Circle,
    title: 'Kesederhanaan',
    description: 'Menemukan keindahan dalam garis bersih, material jujur, dan desain fungsional.',
  },
  {
    icon: Palette,
    title: 'Kreativitas',
    description: 'Merangkul pola unik dan cerita warna dalam setiap kreasi.',
  },
  {
    icon: Heart,
    title: 'Perhatian',
    description: 'Membuat setiap karya dengan teliti penuh passion dan presisi.',
  },
];

export function ValuesGrid() {
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight font-serif sm:text-4xl">
            Nilai-Nilai Kami
          </h2>
          <p className="text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Prinsip-prinsip yang memandu setiap jahitan dan keputusan yang kami buat.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flex flex-col gap-3 rounded-xl border border-border-light p-6"
              >
                <Icon className="text-primary w-8 h-8" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold leading-tight">{value.title}</h3>
                  <p className="text-sm font-normal leading-normal text-subtle-light">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
