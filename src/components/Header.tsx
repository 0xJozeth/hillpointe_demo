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
                    ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'}
                    'bg-transparent py-4'}`} 
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-full"> 
          <div className={`transition-opacity duration-300 opacity-100 pt-6`}>
            <Link href="/">
              <Image src='/foundation-w.svg' alt='logo' height={60} width={200} className='h-auto w-28 md:w-52' />
            </Link>
          </div>

          <div className="fixed top-0 right-0 z-[80] h-16 w-40 text-white square-button flex flex-row items-center justify-center space-x-2 bg-black/50 hover:bg-black/75 transition-colors cursor-pointer">
            <button
              onClick={toggleFullScreenNav}
              className="flex gap-x-4 items-center justify-between"
              aria-label="Toggle menu"
              // style={{
              //   position: 'fixed',
              //   top: 0,
              //   right: 0,
              //   zIndex: 80,
              //   height: '60px',
              //   width: '160px',
              // }}
            >
              <span className="text-sm md:text-md font-semibold md:pl-6 pr-2 tracking-widest">MENU</span>
              <Image src="/align-left.svg" alt="Menu" width={24} height={24} className="filter-white " />
            </button>
          </div>
        </div>
      </header>

      <FullScreenNav isOpen={isFullScreenNavOpen} onClose={toggleFullScreenNav} />
    </>
  );
};

export default Header;