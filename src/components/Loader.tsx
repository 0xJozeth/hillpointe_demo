"use client"
import { motion } from 'framer-motion';

const progressBarVariants = {
  initial: { width: '0%' },
  animate: {
    width: '100%',
    transition: { duration: 3 },
  },
};

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold" style={{ fontFamily: "'Helvetica Now Text', sans-serif" }}>
          Hillpointe
        </h1>
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
};

export default Loader;