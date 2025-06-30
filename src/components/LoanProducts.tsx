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
        <div className="flex items-center justify-center">
          <div className="pl-4 -mt-48 w-1/3">
            <h2 className="text-8xl text-stone-100 uppercase tracking-tighter" style={{ fontFamily: 'Gestiva'}}>Our Loan Products</h2>
            <p className='pt-4 pl-2 text-sm opacity-50 text-stone-100'>Full Income
/
Bank Statements
/
DSCR</p>
          </div>
          <div className="w-2/3 relative">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto ">
              <TabsList className="grid w-full gap-2.5 grid-cols-4 bg-transparent p-0 rounded-t-lg overflow-hidden">
                {products?.map((product) => (
                  <TabsTrigger
                    key={product.id}
                    value={product.id.toString()}
                    className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold bg-white/80 backdrop-blur-sm text-black/30 uppercase text-sm tracking-wider transition-all z-10" 
                  >
                    {product.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="p-8 rounded-lg bg-white/80 backdrop-blur-sm mt-0 min-h-[380px] z-10">
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
                          <motion.div className="grid grid-cols-3 gap-4 items-start" variants={itemVariants}>
                            <div className="col-span-1">
                              <h3 className="text-4xl font-black uppercase tracking-tighter">
                                {product.title}
                              </h3>
                            </div>
                            <div className="col-span-1">
                              <p className="text-lg">{product.propertyType}</p>
                            </div>
                            <div className="col-span-1 text-right">
                              <p className="text-2xl font-bold text-stone-400">
                                {product.id.toString().padStart(2, '0')}
                              </p>
                            </div>
                          </motion.div>
                          <motion.hr variants={itemVariants} className="my-6 border-stone-300" />
                          <motion.div className="grid grid-cols-2 gap-x-8 gap-y-6" variants={itemVariants}>
                            <div>
                              <p className="font-bold text-stone-500">Loan Amount</p>
                              <p className="text-xl">
                                ${product.loanAmount.min} - ${product.loanAmount.max}
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-500">Max Loan to Value</p>
                              <p className="text-xl">{product.maxLtv * 100}% LTV</p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-500">Term Length</p>
                              <p className="text-xl">{product.termLength}</p>
                            </div>
                            <div>
                              <p className="font-bold text-stone-500">Additional</p>
                              <p className="text-xl">{product.additionalInfo}</p>
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