"use client"

import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc/client';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: submitApplication } = trpc.submitApplication.useMutation({
    onSuccess: (data) => {
      console.log('Application submitted successfully:', data);
      alert('Application submitted successfully!');
    },
    onError: (error) => {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application. Please try again.');
    },
  });

  const handleApplyNow = () => {
    submitApplication({
      applicantName: 'John Doe',
      email: 'john.doe@example.com',
      loanType: 'Single Family',
    });
  };

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

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <header className={`bg-transparent py-4 fixed z-50 w-full transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-white text-2xl font-bold">
            <Image src='/hillpoint-white-branding.png' alt='logo' height={60} width={200}/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex bg-slate-700/50 p-2 rounded-md backdrop-blur-md border border-white/20">
            <ul className="flex space-x-4">
              <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">About</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Programs</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Clients</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Approach</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-300 px-3 py-2">Tech</Link></li>
            </ul>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="#" className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-700 text-sm">
              <span>Contact Us</span>
              <ArrowRight size={16} />
            </Link>
            <button onClick={handleApplyNow} className="bg-white text-gray-800 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 text-sm">
              <span>Apply Now</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(true)} className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-700 text-sm">
              <span>Menu</span>
              <Menu size={16} />
            </button>
            <Link href="#" className="bg-white text-gray-800 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 text-sm">
              <span>Apply</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-2 bg-white z-50 flex flex-col mx-1 p-0 lg:hidden rounded-lg shadow-lg w-full max-w-sm">
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)} className="bg-gray-200 text-gray-800 m-4 my-8 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-300">
              <span>Close</span>
              <X size={16} />
            </button>
          </div>
          <nav className="mobile-menu-nav flex-grow flex items-center justify-center">
            <ul className="mobile-menu-list flex flex-col space-y-8 text-center">
              <li><Link href="#" className="text-gray-800 hover:text-gray-600 text-sm font-bold" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link href="#" className="text-gray-800 hover:text-gray-600 text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Programs</Link></li>
              <li><Link href="#" className="text-gray-800 hover:text-gray-600 text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Clients</Link></li>
              <li><Link href="#" className="text-gray-800 hover:text-gray-600 text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Approach</Link></li>
              <li><Link href="#" className="text-gray-800 hover:text-gray-600 text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Tech</Link></li>
              <li><Link href="#" className="text-gray-800 hover:text-gray-600 text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;