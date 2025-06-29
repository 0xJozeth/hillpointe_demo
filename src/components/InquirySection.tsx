"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import LearnMoreButton from './LearnMoreButton';
import { trpc } from '@/lib/trpc/client';
import { inquirySchema, type InquiryFormValues } from '@/lib/schemas';

const InquirySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
  });

  const { mutate, isSuccess } = trpc.submitInquiry.useMutation({
    onSuccess: () => {
      toast.success('Inquiry submitted successfully!');
      reset();
    },
    onError: (error) => {
      toast.error('Failed to submit inquiry', {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: InquiryFormValues) => {
    mutate(data);
  };

  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24"
      style={{ backgroundColor: 'rgba(245, 222, 179, 0.1)' }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/texture-1.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          opacity: 0.05,
        }}
      />

      {/* Main content area */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <motion.div
            className="flex flex-col justify-center pt-0 md:pt-8"
            variants={textContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <Image
                src="/professional-1.jpg"
                alt="Professional discussing real estate"
                width={500}
                height={750}
                className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[750px]"
              />
            </motion.div>
            <motion.p variants={itemVariants} className="text-sm text-gray-600 mb-2">
              Effortless Capital, Limitless Opportunities.
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl text-gray-900 mb-4 leading-tight"
              style={{ fontFamily: "'Gestiva', serif", fontWeight: 'bold' }}
            >
              Whether you&apos;re a seasoned investor or new to real estate, Foundation&reg; delivers seamless capital, AI-generated insights and expert guidance – empowering you to invest with confidence.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700">
              At Foundation, we&apos;re focused on fusing expert knowledge and insight with cutting-edge technology, elevating investment property financing to the next level.
            </motion.p>
          </motion.div>

          <div className="flex flex-col justify-center w-full my-auto">
            <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full">
              {isSuccess ? (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-green-600 mb-4">Thank You!</h3>
                  <p className="text-gray-700">Your inquiry has been submitted successfully. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Make an Inquiry</h3>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Inquiry
                    </label>
                    <textarea
                      id="inquiry"
                      rows={4}
                      {...register('inquiry')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.inquiry && <p className="mt-1 text-sm text-red-600">{errors.inquiry.message}</p>}
                  </div>
                  <div className="pt-2">
                    <LearnMoreButton
                      buttonText={isSubmitting ? 'Submitting...' : 'Submit'}
                      htmlType="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;