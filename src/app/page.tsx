"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import BottomNav from '@/components/BottomNav';
import ValueProposition from '@/components/ValueProposition';

export default function Home() {
  const [heroAnimationProgress, setHeroAnimationProgress] = useState(0);

  const isHeroAnimationComplete = heroAnimationProgress >= 1;

  return (
    <div>
      <Hero setHeroAnimationProgress={setHeroAnimationProgress} />
      <ValueProposition />
      <BottomNav isHeroAnimationComplete={isHeroAnimationComplete} />
    </div>
  );
}
