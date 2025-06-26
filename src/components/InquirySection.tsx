"use client";

import React from 'react';
import LearnMoreButton from './LearnMoreButton'; 

const InquirySection = () => {
  return (
    <section
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="flex flex-col justify-center pt-0 md:pt-8"> 
            <p className="text-sm text-gray-600 mb-2">
              Effortless Capital, Limitless Opportunities.
            </p>
            <h2
              className="text-3xl md:text-4xl text-gray-900 mb-4 leading-tight"
              style={{ fontFamily: "'Gestiva', serif", fontWeight: 'normal' }}
            >
              Whether you&apos;re a seasoned investor or new to real estate, Foundation® delivers seamless capital, AI-generated insights and expert guidance – empowering you to invest with confidence.
            </h2>
            <p className="text-lg text-gray-700">
              At Foundation, we&apos;re focused on fusing expert knowledge and insight with cutting-edge technology, elevating investment property financing to the next level.
            </p>
          </div>

          <div className="flex flex-col justify-center w-full"> 
            <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full">
              <form className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Make an Inquiry</h3>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Inquiry
                  </label>
                  <textarea
                    name="inquiry"
                    id="inquiry"
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div className="pt-2">
                  <LearnMoreButton buttonText="Submit" htmlType="submit" className="w-full" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;