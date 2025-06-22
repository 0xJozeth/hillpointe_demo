import { useState, useEffect } from 'react';

const useParallax = (speedFactor: number): string => {
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      const offsetY = window.scrollY;
      setTransform(`translateY(${offsetY * speedFactor}px)`);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speedFactor]);

  return transform;
};

export default useParallax;