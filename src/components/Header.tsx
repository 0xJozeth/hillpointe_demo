"use client"

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 50) { // if scroll down hide the navbar
        setIsVisible(false);
      } else { // if scroll up show the navbar
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY); // remember current page location to use in the next move
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header className={`bg-transparent py-4 fixed z-50 w-full transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}> {/* Main header container */}
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold">
          <Image src='/hillpoint-white-branding.png' alt='logo' height={60} width={200}/>
        </Link>

        {/* navigation links */}
        <nav className="bg-slate-700/50 p-2 rounded-md backdrop-blur-md border border-white/20">
          <ul className="flex space-x-4">
            <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">About</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Programs</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Clients</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Approach</Link></li>
            <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Tech</Link></li>
          </ul>
        </nav>

        {/* contact/apply buttons */}
        <div className="flex items-center space-x-4">
          <Link href="#" className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-700 text-sm">
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="#" className="bg-white text-gray-800 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 text-sm">
            <span>Apply Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;