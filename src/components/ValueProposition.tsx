import React from 'react';
import Image from 'next/image';

const ValueProposition = () => {
  return (
    <section
      className="w-full flex items-center text-black py-12 md:py-0"
      style={{
        minHeight: '300px',
        backgroundColor: 'rgba(245, 222, 179, 0.1)',
      }}
    >
      <div className="container mx-auto flex h-full flex-col items-center px-4 md:flex-row">
        {/* Left Column */}
        <div className="flex w-full items-center justify-center text-center md:w-1/2 md:pr-8 md:text-left">
          <h2
            className="text-4xl leading-tight md:text-6xl"
            style={{ fontFamily: "'Gestiva', serif" }}
          >
            Unlocking Smart Capital For Data-Driven Investors
          </h2>
        </div>

        {/* Separator */}
        <div className="my-8 w-full h-px bg-gray-300 md:hidden" />
        <div className="mx-8 hidden h-48 w-px bg-gray-300 md:block" />

        {/* Right Column */}
        <div className="flex w-full items-center justify-center md:w-1/2 md:pl-8">
          <div className="flex items-center justify-center space-x-8 md:space-x-12">
            <Image
              src="/blackrock-logo-nav.svg"
              alt="BlackRock Logo"
              width={120}
              height={80}
            />
            <h2
              className="text-4xl leading-tight md:text-6xl"
              style={{ fontFamily: "'Gestiva', serif" }}
            >
              &
            </h2>
            <Image
              src="/foundation-w.svg"
              alt="Foundation Logo"
              width={120}
              height={80}
              style={{ filter: 'brightness(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;