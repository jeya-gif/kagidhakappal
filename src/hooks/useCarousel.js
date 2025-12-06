import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing carousel/slider functionality
 * @param {number} totalItems - Total number of items in the carousel
 * @param {number} autoplayInterval - Interval in milliseconds for autoplay (default: 5000)
 * @returns {Object} Carousel state and navigation functions
 */
export const useCarousel = (totalItems, autoplayInterval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  }, [totalItems]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplayInterval > 0) {
      const interval = setInterval(next, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplayInterval, next]);

  return {
    currentIndex,
    next,
    previous,
  };
};

