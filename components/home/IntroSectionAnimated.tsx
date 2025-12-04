"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface IntroSectionProps {
  text: string;
}

export function IntroSectionAnimated({ text }: IntroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Text effects based on scroll
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.5]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  );

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -30]);

  // Split text into words for animation
  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className="px-6 py-12 sm:py-16 flex justify-center overflow-hidden" // Reduced vertical padding
    >
      <motion.div
        className="max-w-3xl text-center"
        style={{ opacity, scale, y }}
      >
        <motion.p className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-gray-700">
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.03, // Stagger word appearance
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.1 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </div>
  );
}
