import { LoanProduct } from '@/lib/schemas';

interface LoanProductsProps {
  products: LoanProduct[];
}

const LoanProducts: React.FC<LoanProductsProps> = ({ products }) => {
  return (
    <div className="section section-two">
      <h2 className="text-3xl font-bold text-center mb-8">Our Loan Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold">{product.title}</h3>
            <p>{product.propertyType}</p>
            <p>
              ${product.loanAmount.min} - ${product.loanAmount.max}
            </p>
            <p>Max LTV: {product.maxLtv * 100}%</p>
            <p>{product.termLength}</p>
            <p>{product.additionalInfo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanProducts;