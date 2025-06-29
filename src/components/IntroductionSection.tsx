'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IntroductionSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Staggered opacity animations
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.23, 0.4, 0.48], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.28, 0.36, 0.5, 0.58], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.41, 0.49, 0.6, 0.68], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.54, 0.62, 0.7, 0.78], [0, 1, 1, 0]);
  const opacity5 = useTransform(scrollYProgress, [0.67, 0.75], [0, 1]);
  // Parallax scroll animations
  const y1 = useTransform(scrollYProgress, [0.15, 0.5], ['20vh', '-40vh']);
  const y2 = useTransform(scrollYProgress, [0.28, 0.6], ['25vh', '-50vh']);
  const y3 = useTransform(scrollYProgress, [0.41, 0.7], ['20vh', '-45vh']);
  const y4 = useTransform(scrollYProgress, [0.54, 0.8], ['25vh', '-55vh']);
  const y5 = useTransform(scrollYProgress, [0.67, 1], ['20vh', '-20vh']);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-black text-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Image Container */}
        <div className="absolute inset-0 z-10">
          {/* Image 1 */}
          <motion.div
            className="absolute top-[25%] left-[5%] w-[28%] h-[30%]"
            style={{ opacity: opacity1, y: y1 }}
          >
            <Image src="/intro-section-1.webp" alt="Intro Image 1" layout="fill" objectFit="cover" />
          </motion.div>

          {/* Image 2 */}
          <motion.div
            className="absolute top-[15%] right-[8%] w-[35%] h-[38%]"
            style={{ opacity: opacity2, y: y2 }}
          >
            <Image src="/intro-section-2.webp" alt="Intro Image 2" layout="fill" objectFit="cover" />
          </motion.div>

          {/* Image 3 */}
          <motion.div
            className="absolute top-[50%] left-[10%] w-[30%] h-[55%]"
            style={{ opacity: opacity3, y: y3 }}
          >
            <Image src="/intro-section-3.webp" alt="Intro Image 3" layout="fill" objectFit="cover" />
          </motion.div>

          {/* Image 4 */}
          <motion.div
            className="absolute top-[60%] right-[18%] w-[28%] h-[40%]"
            style={{ opacity: opacity4, y: y4 }}
          >
            <Image src="/intro-section-4.webp" alt="Intro Image 4" layout="fill" objectFit="cover" />
          </motion.div>

          {/* Image 5 */}
          <motion.div
            className="absolute bottom-[5%] left-[15%] w-[30%] h-[45%]"
            style={{ opacity: opacity5, y: y5 }}
          >
            <Image src="/intro-section-5.webp" alt="Intro Image 5" layout="fill" objectFit="cover" />
          </motion.div>
        </div>

        {/* Overlay Logo */}
        <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ mixBlendMode: 'overlay' }}>
          <div className="mb-8">
            <Image
              src="/foundation-w.svg"
              alt="Foundation Logo"
              width={800}
              height={100}
              className="filter-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;