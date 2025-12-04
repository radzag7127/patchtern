"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

interface HeroImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface HeroSettings {
  carousel_enabled: boolean;
  active_image_id: string | null;
  transition_duration: number;
}

interface HeroCarouselProps {
  images: HeroImage[];
  settings: HeroSettings;
}

export function HeroCarouselAnimated({ images, settings }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track page scroll for subtle parallax effect
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Subtle parallax effects - calm and serene (0.5x scroll speed)
  const imageY = useTransform(smoothScrollY, [0, 500], [0, 75]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  // Get the image to display
  const getDisplayImage = () => {
    if (!images || images.length === 0) {
      return "https://placehold.co/1920x1080/737c6a/white?text=Hero+Image";
    }

    if (settings.carousel_enabled) {
      return images[currentIndex]?.image_url || images[0]?.image_url;
    } else {
      const activeImage = images.find(
        (img) => img.id === settings.active_image_id
      );
      return activeImage?.image_url || images[0]?.image_url;
    }
  };

  // Carousel rotation
  useEffect(() => {
    if (!settings.carousel_enabled || !images || images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, settings.transition_duration || 5000);

    return () => clearInterval(interval);
  }, [settings.carousel_enabled, settings.transition_duration, images]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Image with Subtle Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            y: imageY,
            scale: scale,
          }}
        >
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url("${getDisplayImage()}")`,
            }}
          />
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Logo Only */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="relative w-[250px] h-[125px] sm:w-[400px] sm:h-[200px] md:w-[500px] md:h-[250px] opacity-90 mx-auto">
            <Image
              src="/images/patchtern-logo-2.png"
              alt="Patchtern"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Carousel Indicators */}
      {settings.carousel_enabled && images.length > 1 && (
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-12"
                    : "bg-white/40 w-1.5 group-hover:w-8 group-hover:bg-white/60"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            </button>
          ))}
        </motion.div>
      )}

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2,
        }}
        style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white/70 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
