'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const progressBarVariants = {
  initial: { width: '0%' },
  animate: {
    width: '100%',
    transition: { duration: 3, ease: 'easeInOut' },
  },
};

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion for fade-out
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3300); // Adjusted for a 3s progress bar + fade-out buffer

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, delay: isLoading ? 0 : 0.3 }} // Delay fade-out slightly after progress
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold" style={{ fontFamily: "'Helvetica Now Text', sans-serif" }}>
          Hillpointe
        </h1>
        {/* Progress Bar will be implemented here */}
        <motion.div
          className="mt-4 h-px w-full max-w-xs mx-auto"
          style={{ background: 'linear-gradient(to right, #3b82f6, #1e40af)' }}
          variants={progressBarVariants}
          initial="initial"
          animate="animate"
        />
      </div>
    </motion.div>
  );
}