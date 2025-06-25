import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

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
const TOTAL_WHEEL_INTERACTION_RANGE = 1000;

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

  // stores calculated initial height of modal video container (pixels)
  // important for smooth height animation
  const [initialModalHeightPx, setInitialModalHeightPx] = useState(0);

  // accumulates deltaY from wheel events, drives animation progress
  const [accumulatedWheelDelta, setAccumulatedWheelDelta] = useState(0);

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
    const initialModalWidthPercent = 75; // modal starts at 75% of parent's width
    const targetModalWidthPercent = 100; // modal ends at 100% of parent's width (full screen)
    // interpolate width: smooth transition from initial to target width based on progress 'prog'
    modalC.style.width = `${initialModalWidthPercent + prog * (targetModalWidthPercent - initialModalWidthPercent)}%`;

    const targetHeightPx = heroSectionRef.current.offsetHeight; // modal's target height is full hero section height
    // interpolate height: smooth transition from calculated initial height to full section height
    modalC.style.height = `${initialModalHeightPx * (1 - prog) + targetHeightPx * prog}px`;
    
    // interpolate border radius: corners sharpen (radius decreases) as modal expands
    modalC.style.borderRadius = `${10 * (1 - prog)}px`;
    // interpolate box shadow: shadow fades (less intense, smaller) as modal expands
    modalC.style.boxShadow = `0 ${4 * (1 - prog)}px ${12 * (1 - prog)}px rgba(0, 0, 0, ${0.3 * (1 - prog)})`;

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


  // effect sets up and tears down 'wheel' event listener for animation
  // runs when initialmodalheightpx set or accumulatedwheeldelta changes
  useEffect(() => {
    const hSection = heroSectionRef.current;
    // don't attach listener if hero section not rendered or initial height not ready
    if (!hSection || initialModalHeightPx === 0) return;

    /**
     * handles mouse wheel event on hero section
     * updates accumulated wheel delta, triggers visual update
     * prevents default page scrolling if animation active
     * @param event the wheelevent from browser
     */
    const handleWheel = (event: WheelEvent) => {
      // update total accumulated scroll delta
      let newDelta = accumulatedWheelDelta + event.deltaY;
      // clamp delta within defined interaction range (0 to total_wheel_interaction_range)
      newDelta = Math.min(TOTAL_WHEEL_INTERACTION_RANGE, Math.max(0, newDelta));
      
      setAccumulatedWheelDelta(newDelta);

      const currentProgress = newDelta / TOTAL_WHEEL_INTERACTION_RANGE;

      // prevent browser's default page scroll if animation in progress
      // allows wheel event to exclusively control animation
      if (event.deltaY > 0 && currentProgress < 1) { // scrolling down, animation not at end
        event.preventDefault();
      } else if (event.deltaY < 0 && currentProgress > 0) { // scrolling up, animation not at start
        event.preventDefault();
      }
      
      // use requestanimationframe to schedule visual update
      // helps achieve smoother animations by syncing with browser's repaint cycle
      // cancel any previously requested frame to avoid redundant work
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        updateVisuals(currentProgress);
      });
    };

    // attach wheel event listener to hero section
    // 'passive: false' crucial to allow 'event.preventdefault()'
    hSection.addEventListener('wheel', handleWheel, { passive: false });

    // perform initial update to set visuals based on current (likely zero) accumulated delta
    updateVisuals(accumulatedWheelDelta / TOTAL_WHEEL_INTERACTION_RANGE);

    // cleanup function: runs when component unmounts or before effect re-runs
    // important to remove event listener to prevent memory leaks
    return () => {
      hSection.removeEventListener('wheel', handleWheel);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // dependencies for effect: re-runs if these values change
  }, [heroSectionRef, initialModalHeightPx, accumulatedWheelDelta, updateVisuals]); // added updatevisuals to dependency array as used inside


  // effect ensures if initialmodalheightpx or accumulatedwheeldelta changes
  // (e.g. after initial calculation or if delta set programmatically elsewhere - not current case),
  // visuals updated accordingly
  useEffect(() => {
    if (initialModalHeightPx > 0) {
        updateVisuals(accumulatedWheelDelta / TOTAL_WHEEL_INTERACTION_RANGE);
    }
  // dependencies for effect
  }, [initialModalHeightPx, accumulatedWheelDelta, updateVisuals]); // added updatevisuals

  return { animationProgress };
};

export default useHeroAnimation;