import { useState, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';

const useParallax = (speedFactor: number): string => {
  const [transform, setTransform] = useState('translateY(0px)');
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      setTransform(`translateY(${scroll * speedFactor}px)`);
    };

    lenis.on('scroll', handleScroll);
    // Initial position
    handleScroll({ scroll: lenis.scroll });

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis, speedFactor]);

  return transform;
};

export default useParallax;