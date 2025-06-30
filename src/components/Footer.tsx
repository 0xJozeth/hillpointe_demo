"use client";

import Link from "next/link";
import Image from 'next/image';

const Footer = () => {

  return (
    <footer 
      className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
        <Link href="/" className="text-white text-2xl font-bold">
              <Image src='/foundation-w.svg' alt='logo' height={60} width={200}/>
            </Link>
        </div>
        <div className="col-span-1">
          <h3 className="font-semibold">Navigation</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
            <li><Link href="/investments" className="hover:text-gray-300">Investments</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="font-semibold">Social</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-gray-300">LinkedIn</a></li>
            <li><a href="#" className="hover:text-gray-300">Twitter</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="font-semibold">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;