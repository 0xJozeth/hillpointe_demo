import React from 'react';
import Image from 'next/image';

interface LearnMoreButtonProps {
  className?: string;
  buttonText?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({
  className = '',
  buttonText = 'LEARN MORE',
  htmlType = 'button',
}) => {

  return (
    <button
      type={htmlType}
      className={`
        relative group overflow-hidden
        bg-black text-white 
        w-72 h-16
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-white group-hover:focus:ring-black 
        focus:ring-offset-black group-hover:focus:ring-offset-[#fdfcf8]
        transition-all duration-500 ease-in-out cursor-pointer
        ${className}
      `}
      aria-label="Learn more about our services"
    >
      {/* Animated background layer - slides in from left */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0 w-full h-full bg-[#fdfcf8] /* New hover background */
          transform -translate-x-full group-hover:translate-x-0
          transition-transform duration-500 ease-in-out
          z-0
        "
      />

      {/* Content layer */}
      <span
        className="relative z-10 flex flex-row items-center justify-center space-x-3 group-hover:text-black transition-colors duration-500 ease-in-out"
      >
        <span className="text-lg font-semibold uppercase tracking-wider"> 
          {buttonText.toUpperCase()}
        </span>
        <Image
          src="/move-right.svg"
          alt="" 
          width={28} 
          height={28}
        />
      </span>
    </button>
  );
};

export default LearnMoreButton;