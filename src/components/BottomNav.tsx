"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NAVIGATION_LINKS, NavLink } from '@/lib/navigation';

interface BottomNavProps {
  // this prop will eventually come from the hero animation state
  isHeroAnimationComplete: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ isHeroAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // scroll threshold
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hasScrolled && isHeroAnimationComplete) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [hasScrolled, isHeroAnimationComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-black text-white px-8 py-4 rounded-full shadow-lg relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 rounded-full"
          style={{ backgroundImage: "url('/texture-1.jpg')" }}
        />
        <ul className="flex items-center space-x-6 relative z-10 divide-x divide-white/30">
          {NAVIGATION_LINKS.map((link: NavLink) => (
            <li key={link.href} className="px-6 first:pl-0 last:pr-0">
              <Link
                href={link.href}
                className="text-base hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNav;