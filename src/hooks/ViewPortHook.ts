import { useEffect } from 'react';

const useViewportHeight = () => {
  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial call to set the viewport height
    updateViewportHeight();

    // Recalculate on window resize
    window.addEventListener('resize', updateViewportHeight);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);
};

export default useViewportHeight;
