"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40); 

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <video
        autoPlay
        muted
        className="absolute top-0 left-0 w-full h-full object-cover video-filter video-zoom"
      >
        <source src="/foundation-loader.webm" type="video/webm" />
      </video>
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/foundation-w.svg"
          alt="Foundation Logo"
          width={200}
          height={100}
          className="logo-filter"
        />
        <div className="w-64 h-1 mt-4 bg-gray-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;