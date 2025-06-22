"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import useParallax from '@/hooks/useParallax';

const Hero = () => {
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

  return (
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
        <p>Unlocking Smart Capital For <br /><span className='tagline-hero'>Data-Driven Investors</span></p>
        <button>Apply Now <span className="arrow-icon">↗</span></button>
      </div>
      <div className="relative hero-right-column hero-image-stack">
        <Image
          src="/building_1.png"
          alt="Building Background"
          layout="fill"
          objectFit="contain"
          className="hero-background-image"
          style={{ transform: backgroundTransform }}
        />
        <div className='shrink-0 flex items-center justify-center mx-auto z-10'>
          <Image
            src="/iphone_outline_white.svg"
            alt="iPhone Outline"
            width={400}
            height={200}
            objectFit='contain'
            className="responsive-iphone relative hero-foreground-image mx-auto backdrop-blur-sm z-10"
            style={{ transform: foregroundTransform }}
          />
          <div className='hero-image-overlay responsive-iphone-screen absolute bg-slate-400 top-[320px] z-40 opacity-30' />
        </div>
      </div>
    </div>
  );
};

export default Hero;