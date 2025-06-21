"use client"
import Image from 'next/image';
import useParallax from '@/hooks/useParallax'; // Adjusted path

// Helper function to create a Suspense resource
function createResource<T>(asyncFn: () => Promise<T>): { read: () => T } {
  let status = 'pending';
  let result: T;
  let error: Error;
  const suspender = asyncFn().then(
    (r: T) => {
      status = 'success';
      result = r;
    },
    (e: unknown) => {
      status = 'error';
      error = e as Error; // Cast to Error for consistency if needed, or handle unknown
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw error;
      } else if (status === 'success') {
        return result;
      }
      throw new Error('Resource in an invalid state');
    },
  };
}

const delayedMessageResource = createResource<string>(
  () => new Promise(resolve => setTimeout(() => resolve("Page data loaded after delay!"), 5000))
);

export default function Home() {
  const message = delayedMessageResource.read(); // This will suspend the component
  console.log('Delayed message:', message); // Use the message to satisfy ESLint

  const backgroundTransform = useParallax(0.3);
  const foregroundTransform = useParallax(0.1);

  return (
    <>
      <div className="section section-one">
        <div className="hero-left-column">
          <h1>BUILDING<br/>LASTING<br/>VALVE</h1>
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
          <div className='absolute bg-slate-400 rounded-lg w-[380px] h-[280px] top-[320px] z-40 opacity-30'/>
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
    </>
  );
}
