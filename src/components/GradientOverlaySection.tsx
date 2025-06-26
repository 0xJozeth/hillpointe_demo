import React from 'react';
import LearnMoreButton from './LearnMoreButton';

interface GradientOverlaySectionProps {
  className?: string;
  backgroundImageUrl?: string;
}

const GradientOverlaySection: React.FC<GradientOverlaySectionProps> = ({
  className = '',
  backgroundImageUrl = '/building-1.webp',
}) => {
  return (
    <section
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
            <div className="relative flex justify-center items-start space-x-12 px-4 py-8"> 
              <div className="bg-gray-300 w-[420px] h-96 rounded-md shadow-lg"></div>
              <div className="bg-gray-300 w-[420px] h-96 rounded-md shadow-lg relative top-16"></div>
              <div className="bg-gray-300 w-[420px] h-96 rounded-md shadow-lg relative top-32"></div>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>


          {/* Right Column - Text Content */}
          <div className="relative flex flex-col justify-center pt-0 md:pt-8 text-left"> 
            <p className="text-sm text-gray-600 mb-2">
              Next-Gen Financing
            </p>
            <h2
              className="text-3xl md:text-4xl text-gray-900 mb-4 leading-tight"
              style={{ fontFamily: "'Gestiva', serif", fontWeight: 'normal' }}
            >
              At Foundation, our innovative technology powers every decision. Our intelligent, unbiased approach analyzes your investment goals in real time—delivering customized financing solutions that are faster, smarter, and seamlessly tailored to your needs.
            </h2>
            <p className="text-lg text-gray-700 mb-8"> 
              Investment Property Financing, Reinvented.
            </p>
            <LearnMoreButton className="mt-6 self-start" /> 
          </div>
        </div>
      </div>
    </section>
  );
};

export default GradientOverlaySection;