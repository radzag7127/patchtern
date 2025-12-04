"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: string;
  imageUrl: string;
  alt: string;
}

interface ProductHighlightsProps {
  products: Product[];
}

export function ProductHighlightsAnimated({
  products,
}: ProductHighlightsProps) {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col gap-12">
        {/* Title with scroll reveal */}
        <motion.h2
          className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight font-serif text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Produk Pilihan
        </motion.h2>

        {/* Product Grid with Stagger Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* "Pelajari Lebih Lanjut" button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
          >
            Jelajahi Produk Kami
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1, // Stagger by index
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
    >
      <Link
        href={`/products/${product.id}`}
        className="group block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
          {/* Image - NO scroll-linked parallax, just hover zoom */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url("${product.imageUrl}")`,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            role="img"
            aria-label={product.alt}
          />

          {/* Overlay gradient on hover */}
          <motion.div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover text overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            initial={{ y: "100%" }}
          >
            <p className="text-sm font-semibold">Lihat Detail</p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
