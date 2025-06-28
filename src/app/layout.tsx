"use client";

import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Provider from "@/lib/trpc/Provider";
import { Toaster } from "sonner";
import LoadingScreen from '@/components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <AnimatePresence>
            {isLoading && <LoadingScreen />}
          </AnimatePresence>
          {!isLoading && (
            <>
              <Header />
              {children}
              <Toaster />
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}
