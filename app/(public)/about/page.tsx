"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1.1, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section with Founder Photo / Workspace */}
      <motion.section className="relative h-[70vh] overflow-hidden">
        {/* Background Image with Slow Zoom */}
        <motion.div
          className="absolute inset-0 bg-gray-900"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url("/images/about-hero-image.png")`,
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <motion.div
          className="relative z-10 h-full flex items-center justify-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-center max-w-4xl">
            Tentang Patchtern
          </h1>
        </motion.div>
      </motion.section>

      {/* Story Section - Heart to Heart */}
      <section className="relative py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Short paragraph with breathing space */}
            <motion.p
              className="text-lg leading-[1.9] text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Patchtern lahir dari kepedulian terhadap limbah fashion yang
              semakin menumpuk. Kami percaya bahwa setiap potongan kain memiliki
              cerita dan potensi untuk dihidupkan kembali menjadi sesuatu yang
              bermakna dan indah.
            </motion.p>

            {/* Breathing space */}
            <div className="h-6" />

            <motion.p
              className="text-lg leading-[1.9] text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Perjalanan kami dimulai dari keinginan sederhana: mengubah cara
              pandang terhadap limbah tekstil.
            </motion.p>

            <div className="h-6" />

            <motion.p
              className="text-lg leading-[1.9] text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Alih-alih membuangnya, kami melihat peluang untuk menciptakan
              karya seni fungsional yang tidak hanya indah, tetapi juga ramah
              lingkungan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <motion.div
          className="max-w-3xl mx-auto px-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="relative pl-8 border-l-4 border-primary">
            <blockquote className="text-3xl sm:text-4xl font-light italic text-gray-800 leading-relaxed">
              "Setiap produk dibuat dengan tangan, menggabungkan
              potongan-potongan kain menjadi pola baru yang unik."
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* Mission/Vision/Values - Glassmorphic Cards */}
      <section className="relative py-32 overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: useTransform(scrollYProgress, [0.4, 0.7], [-100, 100]),
          }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover opacity-10"
            style={{
              backgroundImage: `url("/images/about-hero-image-2.png")`,
            }}
          />
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Nilai-Nilai Kami
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Keberlanjutan",
                description:
                  "Mengurangi limbah fashion dengan memberikan kehidupan baru pada material yang terbuang.",
                delay: 0,
              },
              {
                title: "Kerajinan Tangan",
                description:
                  "Setiap produk dibuat dengan tangan, menjaga tradisi kerajinan dan memberikan sentuhan personal.",
                delay: 0.1,
              },
              {
                title: "Desain Fungsional",
                description:
                  "Menggabungkan estetika dengan fungsi, menciptakan produk yang indah dan berguna.",
                delay: 0.2,
              },
              {
                title: "Kesadaran Lingkungan",
                description:
                  "Mendorong konsumsi yang lebih bertanggung jawab dan mengurangi jejak karbon.",
                delay: 0.3,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-sm bg-white/70 rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: value.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Patchtern - Photo Gallery with Stagger */}
      <section className="relative py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Mengapa Patchtern?
          </motion.h2>

          <div className="max-w-2xl mb-16">
            <motion.p
              className="text-lg leading-[1.9] text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Patchtern adalah seni menyatukan potongan-potongan kain yang
              berbeda menjadi satu kesatuan yang harmonis.
            </motion.p>

            <div className="h-4" />

            <motion.p
              className="text-lg leading-[1.9] text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Bagi kami, Patchtern bukan hanya teknik, tetapi filosofi. Setiap
              potongan kain mewakili cerita yang berbeda—dari pakaian yang
              pernah dikenakan, hingga sisa produksi yang tak terpakai.
            </motion.p>
          </div>

          {/* Photo Gallery with Stagger Effects */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/clothing-examples/pattern1.png",
              "/clothing-examples/pattern2.png",
              "/clothing-examples/pattern3.png",
              "/clothing-examples/pattern4.png",
              "/clothing-examples/pattern5.png",
              "/clothing-examples/pattern6.png",
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Simplified Image display: No hover effects, no overlay text */}
                <div
                  className="absolute inset-0 w-full h-full bg-gray-200"
                  style={{
                    backgroundImage: `url("${img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Quote - Signature Style */}
      <section className="relative py-32 bg-gray-50">
        <motion.div
          className="max-w-3xl mx-auto px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-3xl sm:text-4xl font-light italic text-gray-800 leading-relaxed mb-8">
            "Setiap potongan kain adalah sisa dari cerita sebelumnya. Patchtern
            menggabungkannya menjadi cerita baru."
          </blockquote>

          {/* Handwritten-style signature */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-1 bg-primary/30" />
            <p className="text-lg text-gray-600">— Tim Patchtern</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

// Photo Card Component with Hover Effects
function PhotoCard({ index, delay }: { index: number; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-700"
        style={{
          backgroundImage: `url("https://placehold.co/600x600/9caf88/white?text=Photo+${index}")`,
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      />

      {/* Caption Reveal on Hover */}
      <motion.div
        className="absolute inset-0 bg-black/60 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white text-center font-medium">Foto {index}</p>
      </motion.div>
    </motion.div>
  );
}
