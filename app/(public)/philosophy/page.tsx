'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function PhilosophyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax values for different layers
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section - Full Screen with Ken Burns Effect */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Background Image with Ken Burns Effect */}
        <motion.div
          className="absolute inset-0 bg-gray-900"
          style={{ scale: heroScale }}
        >
          <motion.div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url("/images/philosophy-hero-image.png")`,
              x: useTransform(scrollYProgress, [0, 0.3], [0, -30]),
              y: heroY
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Hero Text - Word by Word Fade In */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            {["Setiap", "potongan", "kain", "adalah", "sisa", "dari", "cerita", "sebelumnya"].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl font-light italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            Patchtern menggabungkannya menjadi cerita baru
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Chapter 1: What is Patchtern */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Ambient Decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(156,175,136,0.08),transparent_50%)]" />

        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-8">
              Apa itu Patchtern?
            </h2>
            <div className="space-y-6 text-lg leading-loose text-gray-700">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Patchtern adalah seni menyatukan potongan-potongan kain yang berbeda
                menjadi satu karya yang utuh dan bermakna. Teknik ini telah ada
                selama berabad-abad, dipraktikkan oleh berbagai budaya di seluruh
                dunia sebagai bentuk kreativitas, kehematan, dan penghargaan
                terhadap material.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Lebih dari sekadar teknik menjahit, Patchtern adalah filosofi
                tentang transformasi—mengambil sesuatu yang dianggap tidak berguna
                dan mengubahnya menjadi sesuatu yang indah dan fungsional.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section - Meditative Pause */}
      <section className="relative py-40 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(156,175,136,0.06),transparent_50%)]" />

        <motion.div
          className="relative max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <blockquote className="text-3xl sm:text-4xl font-light leading-relaxed text-gray-800 italic">
            "Keindahan bisa muncul dari ketidaksempurnaan"
          </blockquote>
        </motion.div>
      </section>

      {/* Chapter 2: Meaning Section with Glassmorphic Container */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: useTransform(scrollYProgress, [0.3, 0.6], [-50, 50])
          }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{
              backgroundImage: `url("/images/philosophy-hero-image-2.png")`
            }}
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 sm:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-8">
              Makna Menyatukan Potongan
            </h2>
            <div className="space-y-6 text-lg leading-loose text-gray-700">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Setiap potongan kain dalam karya Patchtern kami memiliki
                asal-usulnya sendiri. Ada yang berasal dari pakaian bekas, ada yang
                merupakan sisa produksi garmen, dan ada pula yang berasal dari kain
                vintage yang sudah tidak terpakai.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Ketika kami menyatukan potongan-potongan ini, kami tidak hanya
                menciptakan pola baru—kami menciptakan narasi baru. Setiap karya
                menjadi pertemuan dari berbagai cerita, warna, dan tekstur yang
                berbeda, namun harmonis.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Proses ini mengajarkan kami tentang kesabaran, kreativitas, dan
                bagaimana keindahan bisa muncul dari ketidaksempurnaan.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: Fashion Waste */}
      <section className="relative py-32 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-8">
              Patchtern & Isu Limbah Fashion
            </h2>
            <div className="space-y-6 text-lg leading-loose text-gray-700">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Industri fashion adalah salah satu penyumbang limbah terbesar di
                dunia. Setiap tahun, jutaan ton tekstil berakhir di tempat
                pembuangan akhir, mencemari lingkungan dan memboroskan sumber daya
                berharga.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Patchtern menawarkan solusi alternatif. Dengan menggunakan kembali
                limbah tekstil, kami tidak hanya mengurangi sampah, tetapi juga
                menciptakan produk yang unik dan bermakna—produk yang tidak bisa
                diduplikasi karena setiap karya dibuat dari kombinasi material yang
                berbeda.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Ini adalah bentuk konsumsi yang lebih bertanggung jawab: menghargai
                material yang sudah ada, memperpanjang siklus hidup kain, dan
                mengurangi kebutuhan akan produksi baru.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Moodboard - More Spread Out */}
      <section className="relative py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold leading-tight mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Inspirasi Visual
          </motion.h2>

          {/* Masonry-style Grid with Varied Sizes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-auto">
            {[
              { span: "lg:col-span-2 lg:row-span-2", aspect: "aspect-square", img: "/clothing-examples/pattern1.png" },
              { span: "lg:col-span-1", aspect: "aspect-[3/4]", img: "/clothing-examples/pattern2.png" },
              { span: "lg:col-span-1", aspect: "aspect-[3/4]", img: "/clothing-examples/pattern3.png" },
              { span: "lg:col-span-1", aspect: "aspect-square", img: "/clothing-examples/pattern4.png" },
              { span: "lg:col-span-1", aspect: "aspect-square", img: "/clothing-examples/pattern5.png" },
              { span: "lg:col-span-2", aspect: "aspect-[21/9]", img: "/clothing-examples/pattern6.png" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`${item.span} ${item.aspect} rounded-2xl overflow-hidden shadow-lg`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url("${item.img}")`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Quote - Full Screen */}
      <section className="relative py-40 bg-linear-to-b from-gray-50 to-white overflow-hidden">
        {/* Floating Ambient Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-2xl sm:text-3xl font-light leading-loose text-gray-800">
            Patchtern bagi kami bukan hanya tentang menciptakan produk—ini
            tentang menciptakan gerakan menuju konsumsi yang lebih sadar,
            kreatif yang lebih bermakna, dan masa depan yang lebih
            berkelanjutan.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
