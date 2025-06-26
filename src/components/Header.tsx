"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import FullScreenNav from './FullScreenNav';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFullScreenNavOpen, setIsFullScreenNavOpen] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toggleFullScreenNav = () => {
    setIsFullScreenNavOpen(!isFullScreenNavOpen);
  };

  return (
    <>
      <header
        className={`fixed z-50 w-full transition-transform duration-300 ease-in-out
                    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
                    'bg-transparent py-4'}`} 
      >
        <div className="container mx-auto px-0 sm:px-4 flex items-center justify-between h-full"> 
          <div className={`transition-opacity duration-300 opacity-100 pt-6`}>
            <Link href="/" className="text-white text-2xl font-bold">
              <Image src='/hillpoint-white-branding.png' alt='logo' height={60} width={200}/>
            </Link>
          </div>
          <button
            onClick={toggleFullScreenNav}
            className="text-white pl-4 pr-3 py-3 square-button flex flex-row items-center justify-start space-x-2 bg-black/50 hover:bg-black/75 transition-colors cursor-pointer"
            aria-label="Toggle menu"
            style={{
              position: 'fixed', 
              top: 0,
              right: 0,
              zIndex: 80, 
              height: '60px', 
              width: '160px',
            }}
          >
            <span className="text-md font-semibold pl-6 pr-2 tracking-widest">MENU</span>
            <Image src="/align-left.svg" alt="Menu" width={24} height={24} className="filter-white" />
          </button>
        </div>
      </header>

      <FullScreenNav isOpen={isFullScreenNavOpen} onClose={toggleFullScreenNav} />
    </>
  );
};

export default Header;