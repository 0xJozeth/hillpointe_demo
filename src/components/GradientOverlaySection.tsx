import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import LearnMoreButton from './LearnMoreButton';

interface GradientOverlaySectionProps {
  className?: string;
  backgroundImageUrl?: string;
}

const GradientOverlaySection: React.FC<GradientOverlaySectionProps> = ({
  className = '',
  backgroundImageUrl = '/building-1.webp',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 1.0, // Start after images are mostly done
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
    id='gradientOverlay'
      ref={ref}
      className={`relative w-full min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden ${className} py-16 md:py-24`}
    >
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-tr from-[#fcf7e3] to-[#fdfcf8] blur-lg bg-blend-difference"
        style={{ opacity: 0.35 }}
      />

      {/* Content Area */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="flex flex-col justify-center">
            <motion.div
              className="relative flex flex-row items-start justify-center px-4 py-8 space-x-4 md:space-x-12"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <motion.div variants={itemVariants} className="w-1/2 md:w-[420px] h-96 rounded-md shadow-lg overflow-hidden">
                <Image src="/building-2.webp" alt="Building 2" width={420} height={384} className="object-cover w-full h-full" />
              </motion.div>
              <motion.div variants={itemVariants} className="w-1/2 md:w-[420px] h-96 rounded-md shadow-lg overflow-hidden md:translate-y-16">
                <Image src="/building-3.webp" alt="Building 3" width={420} height={384} className="object-cover w-full h-full" />
              </motion.div>
              <motion.div variants={itemVariants} className="w-[420px] h-96 rounded-md shadow-lg overflow-hidden hidden md:block md:translate-y-32">
                <Image src="/building-4.webp" alt="Building 4" width={420} height={384} className="object-cover w-full h-full" />
              </motion.div>
            </motion.div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>


          {/* Right Column - Text Content */}
          <motion.div
            className="relative flex flex-col justify-center pt-2 md:pt-8 text-left"
            variants={textContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.p variants={itemVariants} className="text-sm text-gray-600 mb-2">
              Next-Gen Financing
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl text-gray-900 mb-4 leading-tight"
              style={{ fontFamily: "'Gestiva', serif", fontWeight: 'bold' }}
            >
              At Foundation, our innovative technology powers every decision. Our intelligent, unbiased approach analyzes your investment goals in real time—delivering customized financing solutions that are faster, smarter, and seamlessly tailored to your needs.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8">
              Investment Property Financing, Reinvented.
            </motion.p>
            <motion.div variants={itemVariants}>
              <LearnMoreButton className="mt-6 self-start" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GradientOverlaySection;