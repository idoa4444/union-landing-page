import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animated number counting.
 * Counts from 0 to the target value when triggered.
 *
 * @param {number} target - The target number to count to
 * @param {boolean} shouldStart - Whether to start counting
 * @param {Object} options
 * @param {number} options.duration - Animation duration in ms, default 2000
 * @param {number} options.decimals - Number of decimal places, default 0
 * @returns {string} The current count value formatted as string
 */
export default function useCountUp(target, shouldStart = true, { duration = 2000, decimals = 0 } = {}) {
  const [count, setCount] = useState(0);
  const startTime = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    if (!shouldStart) {
      setCount(0);
      return;
    }

    startTime.current = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = eased * target;

      setCount(currentValue);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [target, shouldStart, duration]);

  if (decimals > 0) {
    return count.toFixed(decimals);
  }
  return Math.round(count).toLocaleString();
}
