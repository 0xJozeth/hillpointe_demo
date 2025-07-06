"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const financingData = [
  {
    id: '01',
    title: 'AI-Powered Insights',
    description: 'Leverage AI to analyze market trends and maximize your returns.',
    image: '/building-1.webp',
  },
  {
    id: '02',
    title: 'Smarter, Faster Financing',
    description: 'Our proprietary tech offers custom financing with efficiency and transparency.',
    image: '/building-2.webp',
  },
  {
    id: '03',
    title: 'Optimized Portfolio Growth',
    description: 'Compare investment scenarios, minimize risk, and unlock higher ROI.',
    image: '/building-3.webp',
  },
  {
    id: '04',
    title: 'Real-Time Market Intelligence',
    description: 'Access live data on property performance, neighborhood trends, and financial projections.',
    image: '/building-4.webp',
  },
  {
    id: '05',
    title: 'Seamless, Stress-Free Investing',
    description: 'From analysis to execution, we help you make confident decisions with ease.',
    image: '/poster_hero_1.webp',
  },
];

const NextGenFinancing = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isCardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const activeItem = financingData.find(item => item.id === activeCard);

  return (
    <section style={{ backgroundColor: '#fdfcf7' }} className="w-full font-gestiva overflow-hidden md:p-24 ">
      <div className="w-full">
        <h2 className="text-[3rem] md:text-[4rem] font-bold text-center my-12 text-gray-800 next-gen-title">Next Gen Financing</h2>
        <div className="w-full">
          {financingData.map((item, index) => (
            <div key={item.id}>
              <div
                className="financing-item-container"
                onMouseEnter={() => {
                  setActiveCard(item.id);
                  setCardVisible(true);
                }}
                onMouseLeave={() => {
                  setCardVisible(false);
                  setActiveCard(null);
                }}
              >
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <h3
                    className={`text-3xl font-semibold hover-heading flex-grow ${
                      activeCard === item.id
                        ? 'text-black opacity-100'
                        : 'text-gray-700 opacity-80'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <span className="financing-item-id text-[3rem] md:text-[6rem]">
                    <span className="gradient-text">{item.id}</span>
                    <span className="solid-text">{item.id}</span>
                  </span>
                </div>
              </div>
              {index < financingData.length - 1 && <div className="horizontal-line" />}
            </div>
          ))}
        </div>
      </div>
      {isCardVisible && activeItem && (
        <div
          className="financing-card"
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            transform: 'translate(20px, -50%)',
            width: '450px',
            height: '550px',
            zIndex: 50,
            pointerEvents: 'none',
            opacity: isCardVisible ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-out',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg image-fade-in"
              key={activeItem.id}
            />
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
              }}
            />
            <div
              className="absolute inset-0 rounded-lg flex items-end p-6"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <div className="text-white">
                {activeItem.description.split(' ').map((word, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      className="animated-text-word"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {word}
                    </span>
                    {i < arr.length - 1 && ' '}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NextGenFinancing;