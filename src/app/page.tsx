"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import BottomNav from '@/components/BottomNav';
import ValueProposition from '@/components/ValueProposition';
import InquirySection from '@/components/InquirySection';
import GradientOverlaySection from '@/components/GradientOverlaySection';
import Footer from '@/components/Footer';

export default function Home() {
  const [heroAnimationProgress, setHeroAnimationProgress] = useState(0);

  const isHeroAnimationComplete = heroAnimationProgress >= 1;

  return (
    <div>
      <Hero setHeroAnimationProgress={setHeroAnimationProgress} />
      <ValueProposition />
      <InquirySection /> 
      <GradientOverlaySection />
      <BottomNav isHeroAnimationComplete={isHeroAnimationComplete} />
      <Footer />
    </div>
  );
}
