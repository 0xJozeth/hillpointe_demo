"use client"

import React, { useRef, useEffect } from 'react';
import useHeroAnimation from '@/hooks/useHeroAnimation';

/**
 * hero component displays full-screen section w/ bg vid,
 * overlay, and central modal vid.
 * complex animation logic handled by `useheroanimation` custom hook.
 */
const Hero = ({ setHeroAnimationProgress }: { setHeroAnimationProgress: (progress: number) => void }) => {
  // create refs for all dom elements animation interacts with
  // refs passed to custom animation hook
  const heroSectionRef = useRef<HTMLDivElement>(null); // main container for hero section
  const modalVideoContainerRef = useRef<HTMLDivElement>(null); // container for smaller, centered video
  const bgVideoRef = useRef<HTMLVideoElement>(null); // full background video element
  const overlayRef = useRef<HTMLDivElement>(null); // overlay on background video
  const modalVideoPlayerRef = useRef<HTMLVideoElement>(null); // actual <video> element inside modal container
  const heroTitleBottomRef = useRef<HTMLHeadingElement>(null);
  const heroTitleTopRef = useRef<HTMLHeadingElement>(null);

  // custom animation hook here, passing necessary refs
  // hook handles event listeners and style updates
  const { animationProgress } = useHeroAnimation({
    heroSectionRef,
    modalVideoContainerRef,
    bgVideoRef,
    overlayRef,
    modalVideoPlayerRef,
    heroTitleBottomRef,
    heroTitleTopRef,
  });

  // Update parent component with animation progress
  useEffect(() => {
    setHeroAnimationProgress(animationProgress);
  }, [animationProgress, setHeroAnimationProgress]);

  return (
    <div className="hero-section" ref={heroSectionRef}>
      {/* video serves as desaturated, low-opacity background */}
      <video autoPlay loop muted className="hero-video" ref={bgVideoRef}>
        <source src="/video_2_comp.mp4" type="video/mp4" />
        your browser does not support the video tag.
      </video>
      {/* textured, dark overlay; fades out during animation */}
      <div className="hero-overlay" ref={overlayRef}></div>
      {/* div centers modal video content */}
      <div className="hero-content">
        <h1 className="hero-title hero-title-bottom" ref={heroTitleBottomRef}>BUILD <br/> LASTING <br/> VALUE</h1>
        {/* container for modal video; element that scales and animates */}
        <div className="hero-modal-video-container" ref={modalVideoContainerRef}>
          {/* modal video itself */}
          <video autoPlay loop muted className="hero-modal-video" ref={modalVideoPlayerRef}>
            <source src="/video_2_comp.mp4" type="video/mp4" />
            your browser does not support the video tag.
          </video>
        </div>
        <h1 className="hero-title hero-title-top" ref={heroTitleTopRef}>BUILD <br/>LASTING <br/> VALUE</h1>
      </div>
    </div>
  );
};

export default Hero;