"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useParallax from '@/hooks/useParallax'; 

const progressBarVariants = {
  initial: { width: '0%' },
  animate: {
    width: '100%',
    transition: { duration: 3 },
  },
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const backgroundTransform = useParallax(0.3);
  const foregroundTransform = useParallax(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  if (loading) {
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
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section section-one">
        <div className="hero-left-column">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants}>BUILD</motion.span>
            <br />
            <motion.span variants={itemVariants}>LASTING</motion.span>
            <br />
            <motion.span variants={itemVariants}>VALUE</motion.span>
          </motion.h1>
          <p>Unlocking Smart Capital For Data-Driven Investors</p>
          <button>Apply Now <span className="arrow-icon">↗</span></button>
        </div>
        <div className="relative hero-right-column hero-right-container hero-image-stack">
          <Image
            src="/building_1.png"
            alt="Building Background"
            layout="fill"
            objectFit="cover"
            className="hero-background-image"
            style={{ transform: backgroundTransform }}
          />
          <Image
            src="/iphone_outline_white.svg"
            alt="iPhone Outline"
            width={400}
            height={200}
            className="hero-foreground-image backdrop-blur-sm"
            style={{ transform: foregroundTransform }}
          />
          <div className='absolute bg-slate-400 rounded-lg w-[380px] h-[280px] top-[320px] z-40 opacity-30' />
        </div>
      </div>
      <div className="section section-two">
        <div className="section-text-content">
          <p>Section 2</p>
        </div>
        <Image
          src="/building_2.png"
          alt="Building 2"
          className="section-image"
          width={900}
          height={700}
        />
      </div>
      <div className="section section-three">
        <Image
          src="/building_3.png"
          alt="Building 3"
          className="section-image"
          width={900}
          height={700}
        />
        <div className="section-text-content">
          <p>Section 3</p>
        </div>
      </div>
    </motion.div>
  );
}
