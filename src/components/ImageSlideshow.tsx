import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface ImageSlideshowProps {
  images: string[];
  alt: string;
  className?: string;
  width?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ImageSlideshow({
  images,
  alt,
  className = '',
  width = 400,
  autoPlay = true,
  autoPlayInterval = 3000,
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoPlay || !isHovering || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isHovering, autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        className={className}
        width={width}
      />
    );
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className={className}
            width={width}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Show on Hover */}
      {isHovering && images.length > 1 && (
        <>
          {/* Previous Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
