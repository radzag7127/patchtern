"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PhilosophyTeaserProps {
  imageUrl?: string;
  title: string;
  description: string;
}

export function PhilosophyTeaserAnimated({
  imageUrl,
  title,
  description,
}: PhilosophyTeaserProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Text reveal animations
  const textY = useTransform(smoothProgress, [0, 0.3], [50, 0]);
  const textOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.8]
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-linear-to-b from-white via-gray-50 to-white w-full"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(156,175,136,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(156,175,136,0.06),transparent_50%)]" />

      <div className="relative flex flex-col gap-10 px-6 sm:px-10 lg:px-20 py-16">
        {/* Content below image */}
        <motion.div
          className="flex flex-col gap-6 max-w-3xl mx-auto text-center"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          {/* Accent line */}
          <motion.div
            className="w-16 h-1 bg-primary mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          />

          {/* Title */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Link href="/philosophy">
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
