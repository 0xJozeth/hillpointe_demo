"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import IntroductionSection from '@/components/IntroductionSection';
import BottomNav from '@/components/BottomNav';
import ValueProposition from '@/components/ValueProposition';
import NextGenFinancing from '@/components/NextGenFinancing';
import InquirySection from '@/components/InquirySection';
import FaqSection from '@/components/FaqSection';
import GradientOverlaySection from '@/components/GradientOverlaySection';
import Footer from '@/components/Footer';
import LoanProducts from '@/components/LoanProducts';
import { loanProducts } from '@/lib/schemas';

export default function Home() {
  const [heroAnimationProgress, setHeroAnimationProgress] = useState(0);

  const isHeroAnimationComplete = heroAnimationProgress >= 1;

  return (
    <div>
        <Hero setHeroAnimationProgress={setHeroAnimationProgress} />
        <GradientOverlaySection />
        <ValueProposition />
        <IntroductionSection />
        <NextGenFinancing />
        <LoanProducts products={loanProducts} />
        <InquirySection />
        <FaqSection />
        <BottomNav isHeroAnimationComplete={isHeroAnimationComplete} />
      <Footer />
</div>
  );
}
