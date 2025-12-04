'use client';

import { useState, useEffect } from 'react';

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

export function HeroCarousel({ images, settings }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get the image to display
  const getDisplayImage = () => {
    if (!images || images.length === 0) {
      return 'https://placehold.co/1920x1080/737c6a/white?text=Hero+Image';
    }

    if (settings.carousel_enabled) {
      return images[currentIndex]?.image_url || images[0]?.image_url;
    } else {
      // Show active image when carousel is off
      const activeImage = images.find((img) => img.id === settings.active_image_id);
      return activeImage?.image_url || images[0]?.image_url;
    }
  };

  // Carousel rotation effect
  useEffect(() => {
    if (!settings.carousel_enabled || !images || images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Fade duration
    }, settings.transition_duration || 5000);

    return () => clearInterval(interval);
  }, [settings.carousel_enabled, settings.transition_duration, images]);

  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Fade Effect */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${getDisplayImage()}")`,
        }}
      />
    </div>
  );
}
