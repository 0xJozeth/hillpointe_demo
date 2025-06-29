"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-300 ${
        isVisible ? 'block' : 'hidden'
      }`}
      aria-label="Scroll to top"
    >
      <Image
        src="/circle-arrow-up.svg"
        alt="Scroll to top"
        width={32}
        height={32}
        className='invert cursor-pointer'
      />
    </motion.button>
  );
};

export default ScrollToTopButton;