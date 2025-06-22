"use client"
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import LoanProducts from '@/components/LoanProducts';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader';

export default function Home() {
  const { data: products, error, isLoading } = trpc.getLoanProducts.useQuery();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  if (showLoading || isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      {products && <LoanProducts products={products} />}
    </motion.div>
  );
}
