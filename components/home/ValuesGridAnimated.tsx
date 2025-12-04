'use client';

import { motion } from 'framer-motion';

const VALUES = [
  {
    title: 'Keberlanjutan',
    description: 'Menghormati planet dengan memberikan kehidupan baru pada material yang terlupakan.',
    gradient: 'from-primary/8 via-primary/3 to-transparent',
    accentColor: 'bg-primary',
    borderColor: 'hover:border-primary/30',
  },
  {
    title: 'Kesederhanaan',
    description: 'Menemukan keindahan dalam garis bersih, material jujur, dan desain fungsional.',
    gradient: 'from-primary/6 via-primary/2 to-transparent',
    accentColor: 'bg-primary',
    borderColor: 'hover:border-primary/30',
  },
  {
    title: 'Kreativitas',
    description: 'Merangkul pola unik dan cerita warna dalam setiap kreasi.',
    gradient: 'from-primary/8 via-primary/3 to-transparent',
    accentColor: 'bg-primary',
    borderColor: 'hover:border-primary/30',
  },
  {
    title: 'Perhatian',
    description: 'Membuat setiap karya dengan teliti penuh passion dan presisi.',
    gradient: 'from-primary/6 via-primary/2 to-transparent',
    accentColor: 'bg-primary',
    borderColor: 'hover:border-primary/30',
  },
];

export function ValuesGridAnimated() {
  return (
    <div className="relative overflow-hidden bg-gray-50 w-full">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(156,175,136,0.06),transparent_70%)]" />

      <div className="relative flex flex-col gap-16 px-6 sm:px-10 lg:px-20 py-24">
        {/* Header Section - Simple fade in */}
        <motion.div
          className="flex flex-col gap-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Nilai-Nilai Kami
          </h2>

          <p className="text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto text-gray-600">
            Prinsip-prinsip yang memandu setiap jahitan dan keputusan yang kami buat.
          </p>
        </motion.div>

        {/* Grid Layout - No scroll animations, just simple entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {VALUES.map((value, index) => {
            return (
              <motion.div
                key={value.title}
                className={`group relative flex flex-col gap-5 rounded-3xl border-2 border-gray-200 p-8 lg:p-10 bg-white hover:shadow-xl transition-all duration-500 ${value.borderColor} overflow-hidden`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-5">
                  {/* Accent bar */}
                  <motion.div
                    className={`w-12 h-1.5 rounded-full ${value.accentColor}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  />

                  {/* Text Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold leading-tight text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-base font-normal leading-relaxed text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>

                {/* Subtle corner accent */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/4 blur-3xl group-hover:bg-primary/8 transition-colors duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
