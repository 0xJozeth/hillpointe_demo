"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { NAVIGATION_LINKS, NavLink } from '@/lib/navigation';

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenNav: React.FC<FullScreenNavProps> = ({ isOpen, onClose }) => {
  const [showMenuContent, setShowMenuContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false); // Reset for next potential close
      const openTimer = setTimeout(() => {
        setShowMenuContent(true);
      }, 300); // Delay for overlay animation
      return () => clearTimeout(openTimer);
    } else {
      setShowMenuContent(false); // Ensure menu content is hidden if isOpen is false
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isClosing) return; // Prevent multiple close triggers

    setIsClosing(true);
    setShowMenuContent(false); // Start menu content slide-out

    setTimeout(() => {
      onClose(); // Trigger overlay slide-out after menu content animation
    }, 500); // Menu content animation is 500ms
  };

  return (
    <>
      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'rgba(245, 222, 179, 0.5)' }} // Updated opacity
        aria-hidden={!isOpen}
      />

      {/* Half-screen black menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-black z-[70] transition-transform duration-500 ease-in-out
                    ${isOpen && showMenuContent ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!(isOpen && showMenuContent)}
      >
        <div className="flex flex-col items-center justify-center h-full relative">
          <button
            onClick={handleClose} // Use new handler
            className="absolute top-5 right-5 text-white hover:text-gray-300"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
          <nav>
            <ul className="space-y-8 text-center">
              {NAVIGATION_LINKS.map((link: NavLink) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white text-3xl hover:text-gray-400 transition-colors"
                    onClick={() => {
                      handleClose(); // Use new handler
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default FullScreenNav;