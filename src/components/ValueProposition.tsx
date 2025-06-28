import React from 'react';
import Image from 'next/image';

const ValueProposition = () => {
  return (
    <section
      className="w-full flex items-center text-black"
      style={{ height: '300px', backgroundColor: 'rgba(245, 222, 179, 0.1)' }}
    >
      <div className="container mx-auto px-4 flex h-full">
        {/* Left Column */}
        <div className="w-1/2 flex justify-center items-center pr-8">
          <h2
            className="text-6xl leading-tight"
            style={{ fontFamily: "'Gestiva', serif" }}
          >
            Unlocking Smart Capital For Data-Driven Investors
          </h2>
        </div>

        {/* Vertical Line */}
        <div className="w-px bg-gray-300"></div>

        {/* Right Column */}
        <div className="w-1/2 flex justify-center items-center pl-8">
          <div className="flex items-center justify-center space-x-12">
            <Image
              src="/blackrock-logo-nav.svg"
              alt="BlackRock Logo"
              width={150}
              height={100}
            />
            <h2
            className="text-6xl leading-tight"
            style={{ fontFamily: "'Gestiva', serif" }}
          >
            &
          </h2>
            <Image
              src="/foundation-w.svg"
              alt="Foundation Logo"
              width={150}
              height={100}
              style={{ filter: 'brightness(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;