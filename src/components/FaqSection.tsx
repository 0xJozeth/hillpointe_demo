"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What is Foundation's primary business?",
    answer: "Foundation provides real estate investment financing, merging expert insight with cutting-edge technology to make investment property financing smarter, faster, and more efficient."
  },
  {
    question: "What kind of loan programs do you offer?",
    answer: "We offer a range of programs including Rental Loans, Bridge Financing (like FND Bridge™, Fix & Flip), and Investor Second Mortgages (like FND Core™ and Closed End Second)."
  },
  {
    question: "What types of properties does Foundation finance?",
    answer: "We finance a variety of property types, including single-family homes, 1-4 unit properties, townhomes, condos, and multi-family properties (5+ units). We also handle short-term rentals and cross-portfolio loans."
  },
  {
    question: "How does Foundation use technology?",
    answer: "We use proprietary AI to provide real-time deal analysis and market insights. This technology helps our clients make informed decisions and gives them a competitive edge."
  },
  {
    question: "What makes Foundation different from other lenders?",
    answer: "Our blend of deep industry expertise and advanced technology allows us to provide clear guidance, fast execution, and a frictionless path to financing. We aim to level the playing field for our clients against cash buyers."
  },
  {
    question: "What are your typical loan amounts and terms?",
    answer: "Loan amounts and terms vary by program. For example, our Rental Loans range from $300,000 to $10,000,000 with 30-year fixed terms, while Bridge Financing can go up to $7,500,000 for terms up to 24 months."
  },
  {
    question: "What is the average closing time?",
    answer: "We pride ourselves on efficiency. Our average closing time is 10 days."
  },
  {
    question: "Who is the ideal client for Foundation?",
    answer: "We work with both seasoned real estate investors and those new to the field. Our platform is designed to empower any data-driven investor to build their portfolio with confidence."
  },
  {
    question: "In which states does Foundation operate?",
    answer: "Foundation provides financing across the United States, with the exceptions of Arizona, North Dakota, Nevada, South Dakota, and Wyoming."
  },
  {
    question: "How do I start an application?",
    answer: "You can start your application by clicking the 'Apply Now' button on our website. Our streamlined process is designed to be quick and eliminate unnecessary paperwork."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full overflow-hidden py-12 px-4 sm:px-8 md:px-24 bg-black relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/texture-1.jpg)',
          backgroundRepeat: 'repeat',
          opacity: 0.05,
          zIndex: 0,
        }}
      />
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center my-12 text-white font-gestiva">Frequently Asked Questions</h2>
        <div className="w-full">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-700">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-2xl font-semibold text-white flex-grow font-gestiva" style={{ fontFamily: 'Gestiva'}}>
                  {faq.question}
                </h3>
                <div className="w-8 h-8 relative flex-shrink-0 invert-100 transition-all">
                  <Image
                    src={openIndex === index ? '/minus.svg' : '/plus.svg'}
                    alt={openIndex === index ? 'Collapse' : 'Expand'}
                    width={32}
                    height={32}
                  />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                        opacity: { duration: 0.3, delay: 0.15 }
                      }
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                        opacity: { duration: 0.3 }
                      }
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="p-4 pt-0 text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;