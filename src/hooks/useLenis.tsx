"use client";

import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// create a context to hold the Lenis instance
const LenisContext = createContext<Lenis | null>(null);

// custom hook to access the Lenis instance
export const useLenis = () => {
  return useContext(LenisContext);
};

// provider component to initialize and manage the Lenis instance
export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // initialize here
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // cleanup on unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};