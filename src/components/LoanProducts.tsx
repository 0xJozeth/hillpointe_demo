import { useState } from 'react';
import { LoanProduct } from '@/lib/schemas';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';

interface LoanProductsProps {
  products: LoanProduct[];
}

const LoanProducts: React.FC<LoanProductsProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState(products[0].id.toString());

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section
      className="relative py-16 md:py-24 bg-black"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-8xl text-stone-100 uppercase tracking-tighter" style={{ fontFamily: 'Gestiva'}}>Our Loan Products</h2>
            <p className='pt-4 text-sm opacity-50 text-stone-100'>Full Income / Bank Statements / DSCR</p>
          </div>
          <div className="w-full lg:w-2/3 relative">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-transparent p-0 rounded-t-lg">
                {products?.map((product) => (
                  <TabsTrigger
                    key={product.id}
                    value={product.id.toString()}
                    className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold bg-white/80 backdrop-blur-sm text-black/30 uppercase text-xs md:text-sm tracking-wider transition-all z-10 py-3"
                  >
                    {product.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="p-4 md:p-8 rounded-lg bg-white/80 backdrop-blur-sm mt-16 md:mt-4 min-h-[420px] z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {(() => {
                      const product = products.find(p => p.id.toString() === activeTab);
                      if (!product) return null;
                      return (
                        <>
                          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start" variants={itemVariants}>
                            <div className="md:col-span-2">
                              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                                {product.title}
                              </h3>
                              <p className="text-lg mt-2 md:mt-0">{product.propertyType}</p>
                            </div>
                            <div className="text-left md:text-right">
                              <p className="text-2xl font-bold text-stone-400">
                                {product.id.toString().padStart(2, '0')}
                              </p>
                            </div>
                          </motion.div>
                          <motion.hr variants={itemVariants} className="my-4 md:my-6 border-stone-300" />
                          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
                            <div>
                              <p className="font-bold text-stone-500">Loan Amount</p>
                              <p className="text-lg md:text-xl">
                                ${product.loanAmount.min} - ${product.loanAmount.max}
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-500">Max Loan to Value</p>
                              <p className="text-lg md:text-xl">{product.maxLtv * 100}% LTV</p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-500">Term Length</p>
                              <p className="text-lg md:text-xl">{product.termLength}</p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-500">Additional</p>
                              <p className="text-lg md:text-xl">{product.additionalInfo}</p>
                            </div>
                          </motion.div>
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanProducts;