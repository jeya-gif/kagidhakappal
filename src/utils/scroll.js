/**
 * Scroll utility functions for smooth navigation
 * Works with HashRouter on GitHub Pages
 */

/**
 * Smoothly scrolls to an element by its ID
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Offset in pixels (default: -80)
 * @param {number} duration - Animation duration in milliseconds (default: 800)
 * @param {number} retries - Number of retries if element not found (default: 5)
 */
export const scrollToElement = (elementId, offset = -80, duration = 800, retries = 5) => {
  const element = document.getElementById(elementId);
  if (!element) {
    if (retries > 0) {
      // Retry after a short delay (useful when navigating between routes)
      setTimeout(() => {
        scrollToElement(elementId, offset, duration, retries - 1);
      }, 100);
      return;
    }
    console.warn(`Element with id "${elementId}" not found after retries`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset + offset;

  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  let startTime = null;

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, offsetPosition);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Gets the current active section based on scroll position
 * @param {string[]} sectionIds - Array of section IDs to check
 * @param {number} offset - Offset in pixels (default: 100)
 * @returns {string|null} The ID of the currently active section
 */
export const getActiveSection = (sectionIds, offset = 100) => {
  const scrollPosition = window.scrollY + offset;

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const section = document.getElementById(sectionIds[i]);
    if (section && section.offsetTop <= scrollPosition) {
      return sectionIds[i];
    }
  }

  return sectionIds[0] || null;
};

