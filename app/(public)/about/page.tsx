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
              Patchtern adalah brand yang lahir dari proses melihat kembali apa
              yang selama ini terabaikan. Sebagai bagian dari aktivitas produksi
              di Rira Konveksi dan Rira Taylor, setiap hari selalu ada
              potongan-potongan kain yang tersisa. Potongan kecil yang tidak
              lagi digunakan, sering kali dianggap sebagai akhir dari sebuah
              proses.
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
              Namun dari situ muncul pertanyaan sederhana: apakah semua yang
              tersisa memang harus berakhir sebagai limbah?
            </motion.p>

            <div className="h-6" />

            <motion.p
              className="text-lg leading-[1.9] text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Patchtern hadir sebagai upaya untuk menjawab pertanyaan
              tersebut—dengan cara yang pelan, sadar, dan bertanggung jawab.
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
              "Apakah semua yang tersisa memang harus berakhir sebagai limbah?"
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
            Apa yang Kami Lakukan
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Cara Kami Melihat Limbah",
                description:
                  "Bagi kami, limbah bukan sekadar sesuatu yang harus dibuang atau dihilangkan. Ia adalah bagian dari proses yang belum selesai. Melalui Patchtern, kami mencoba mengubah cara pandang tersebut. Potongan-potongan kain yang sebelumnya terpisah kami susun kembali, membentuk pola baru yang memiliki nilai, fungsi, dan cerita. Setiap produk bukan hanya hasil dari proses produksi, tetapi hasil dari cara berpikir yang berbeda.",
                delay: 0,
              },
              {
                title: "Proses",
                description:
                  "Setiap lembar patchwork disusun secara manual. Kami memilih potongan kain berdasarkan warna, tekstur, dan bentuk. Tidak ada proses yang terburu-buru, karena setiap bagian perlu menemukan tempatnya sendiri. Pendekatan ini membuat setiap karya memiliki karakter yang unik dan tidak dapat direplikasi secara persis. Dalam prosesnya, kami juga bekerja bersama mitra penjahit lokal—sebagian besar adalah perempuan dengan pengalaman di industri garmen yang kini memilih bekerja dari rumah. Melalui kolaborasi ini, Patchtern tidak hanya menjadi ruang produksi, tetapi juga ruang yang memberi fleksibilitas bagi mereka untuk tetap berkarya sambil menjalankan peran di rumah.",
                delay: 0.1,
              },
              {
                title: "Produk",
                description:
                  "Patchtern menghadirkan berbagai produk berbasis patchwork, dimulai dari kemeja, outer, hingga pengembangan produk lainnya ke depan. Setiap produk dibuat dari kain sisa produksi yang telah dipilih dan disusun kembali, sehingga tidak ada dua produk yang benar-benar sama. Keunikan ini bukan dibuat-buat, tetapi terjadi secara alami dari keterbatasan material yang ada.",
                delay: 0.2,
              },
              {
                title: "Dampak",
                description:
                  "Kami tidak mengklaim sebagai solusi besar. Namun melalui Patchtern, kami berusaha mengambil langkah kecil yang nyata: mengurangi limbah tekstil dari proses produksi kami sendiri dan memberinya kehidupan kedua. Kami percaya bahwa perubahan bisa dimulai dari hal yang paling dekat—dan dilakukan bersama.",
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
            Arah Ke Depan
          </motion.h2>

          <div className="max-w-2xl mb-16">
            <motion.p
              className="text-lg leading-[1.9] text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Patchtern akan terus berkembang sebagai ruang
              eksplorasi—menggabungkan antara produksi, kreativitas, dan
              kesadaran lingkungan.
            </motion.p>

            <div className="h-4" />

            <motion.p
              className="text-lg leading-[1.9] text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Kami terbuka untuk kolaborasi dengan berbagai pihak yang memiliki
              nilai sejalan, serta ingin menghadirkan pendekatan baru dalam
              melihat limbah dan produk fashion.
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
            "Patchtern bukan hanya tentang membuat sesuatu dari sisa. Tetapi
            tentang bagaimana kita memilih untuk melihatnya. Dari yang dianggap
            akhir, kami melihat kemungkinan baru."
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
