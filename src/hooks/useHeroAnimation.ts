import { useEffect, useState, useRef, RefObject, useCallback } from 'react';
import { useLenis } from '@/hooks/useLenis';

// types for refs passed to hook
// initialized with `null` by `useref`, so `current` property can be null
interface HeroAnimationRefs {
  heroSectionRef: RefObject<HTMLDivElement | null>;
  modalVideoContainerRef: RefObject<HTMLDivElement | null>;
  bgVideoRef: RefObject<HTMLVideoElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  modalVideoPlayerRef: RefObject<HTMLVideoElement | null>;
  heroTitleBottomRef: RefObject<HTMLHeadingElement | null>;
  heroTitleTopRef: RefObject<HTMLHeadingElement | null>;
}

// total "distance" user needs to "scroll" with mouse wheel for full animation
// larger number = more scrolling = less sensitive to small wheel movements
const SCROLL_RANGE = 125; // The scroll distance over which the animation occurs

/**
 * custom react hook for hero section's scroll-to-zoom video animation
 * encapsulates logic for:
 * - tracking mouse wheel input
 * - calculating animation progress
 * - updating element styles for visual effect
 * - handling initial setup and cleanup
 * @param refs object with react refs to dom elements for animation
 */
const useHeroAnimation = (refs: HeroAnimationRefs) => {
  const {
    heroSectionRef,
    modalVideoContainerRef,
    bgVideoRef,
    overlayRef,
    modalVideoPlayerRef,
    heroTitleBottomRef,
    heroTitleTopRef,
  } = refs;

  const lenis = useLenis();

  // stores calculated initial height of modal video container (pixels)
  // important for smooth height animation
  const [initialModalHeightPx, setInitialModalHeightPx] = useState(0);

  // Animation progress state (0 to 1)
  const [animationProgress, setAnimationProgress] = useState(0);

  // id of current animation frame request, for cancelling pending frames (performance)
  const animationFrameId = useRef<number | null>(null);


  // effect runs once on mount
  // calculates initial height of modal video container
  // height based on container's actual rendered width and 16:9 aspect ratio
  useEffect(() => {
    if (modalVideoContainerRef.current) {
      const modalContainerWidth = modalVideoContainerRef.current.offsetWidth;
      // proceed only if container has measurable width
      if (modalContainerWidth > 0) {
        const calculatedHeight = modalContainerWidth * (9 / 16); // standard 16:9 aspect ratio
        setInitialModalHeightPx(calculatedHeight);
        // Set the initial height on the container. This is important for the scale transform to work correctly.
        modalVideoContainerRef.current.style.height = `${calculatedHeight}px`;
      }
    }
    // empty dependency array: effect runs once after initial render
  }, [modalVideoContainerRef]);


  /**
   * core function applying style changes to dom elements
   * based on current animation progress
   * @param progressValue number between 0 (animation start) and 1 (animation end)
   */
  const updateVisuals = useCallback((progressValue: number) => {
    // exit if required elements aren't available or initial height not calculated
    // check ensures no attempt to access properties of null refs
    if (
      !heroSectionRef.current ||
      !modalVideoContainerRef.current ||
      !bgVideoRef.current ||
      !overlayRef.current ||
      !modalVideoPlayerRef.current ||
      !heroTitleBottomRef.current ||
      !heroTitleTopRef.current ||
      initialModalHeightPx === 0
    ) {
      return;
    }

    // ensure progress 'prog' is clamped between 0 (start) and 1 (end)
    const prog = Math.min(1, Math.max(0, progressValue));
    // 'fastfadeprogress' makes background elements (main background video, overlay)
    // fade out quicker than primary modal expansion
    const fastFadeProgress = Math.min(1, prog * 1.5);

    // --- style updates for modal video container ---
    // main element that scales and changes appearance
    const modalC = modalVideoContainerRef.current;
    const heroSection = heroSectionRef.current;

    // To improve performance, we use `transform: scale()` instead of animating width and height.
    // This offloads the animation to the GPU and avoids expensive layout recalculations.
    const targetHeightPx = heroSection.offsetHeight;
    
    // The modal starts at 75% width, so the final scale factor for X is 1/0.75.
    const scaleX = 1 / 0.75;
    const scaleY = initialModalHeightPx > 0 ? targetHeightPx / initialModalHeightPx : 1;

    // Interpolate scale from 1 to the target scale
    const currentScaleX = 1 + (scaleX - 1) * prog;
    const currentScaleY = 1 + (scaleY - 1) * prog;

    // We use scale for a smoother animation. We assume the element is centered.
    modalC.style.transform = `scale(${currentScaleX}, ${currentScaleY})`;
    
    // interpolate border radius: corners sharpen (radius decreases) as modal expands
    modalC.style.borderRadius = `${10 * (1 - prog)}px`;
    // box-shadow animation is expensive, so we remove it for performance.
    modalC.style.boxShadow = 'none';

    // --- style updates for video player inside modal ---
    // actual <video> element
    const modalVidPlayer = modalVideoPlayerRef.current;
    // border radius also animates to match container for clean look
    modalVidPlayer.style.borderRadius = `${6 * (1 - prog)}px`;

    // --- style updates for background elements (fade out) ---
    // main background video and overlay fade out as modal takes over
    // math.max(0, ...) ensures opacity doesn't go below 0
    bgVideoRef.current.style.opacity = Math.max(0, 0.1 * (1 - fastFadeProgress)).toString(); // fades to 0 from initial 0.1
    overlayRef.current.style.opacity = Math.max(0, 1 * (1 - fastFadeProgress)).toString();   // fades to 0 from initial 1

    // --- style updates for hero titles (parallax effect) ---
    const parallaxOffset = prog * 150; // move titles down by 150px at full progress
    heroTitleBottomRef.current.style.transform = `translate(-50%, -50%) translateY(${parallaxOffset}px)`;
    heroTitleTopRef.current.style.transform = `translate(-50%, -50%) translateY(${parallaxOffset}px)`;

    // Update the shared animation progress state
    setAnimationProgress(prog);

  }, [heroSectionRef, modalVideoContainerRef, bgVideoRef, overlayRef, modalVideoPlayerRef, initialModalHeightPx, heroTitleBottomRef, heroTitleTopRef, setAnimationProgress]);


  useEffect(() => {
    if (!lenis || initialModalHeightPx === 0) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      const scrollY = scroll;
      let progress = scrollY / SCROLL_RANGE;
      progress = Math.min(1, Math.max(0, progress));

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        updateVisuals(progress);
      });
    };

    lenis.on('scroll', handleScroll);

    // initial update
    updateVisuals(lenis.scroll / SCROLL_RANGE);

    return () => {
      lenis.off('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [lenis, initialModalHeightPx, updateVisuals]);

  return { animationProgress };
};

export default useHeroAnimation;