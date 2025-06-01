import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product, UserType } from '../types';
import { useAppContext } from '../contexts/AppContext';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { userType } = useAppContext();

  useEffect(() => {
    if (userType === UserType.B2B) {
      setProducts(MOCK_PRODUCTS.filter(p => p.b2bPrice !== undefined || p.b2bNotes !== undefined));
    } else {
      setProducts(MOCK_PRODUCTS);
    }
  }, [userType]);

  const pageTitle = userType === UserType.B2B ? "Contractor & Pro Supplies" : "Shop Our Products";
  const pageSubtitle = userType === UserType.B2B 
    ? "Access special pricing and bulk order options for your business needs."
    : "Find everything you need for your next home improvement project.";

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-2">{pageTitle}</h1>
      <p className="text-lg text-center text-neutral-600 mb-10">{pageSubtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {userType === UserType.B2B && (
        <div className="mt-12 p-6 bg-secondary-light rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-secondary-dark mb-3">Need a Custom Quote?</h2>
          <p className="text-neutral-700 mb-4">For large orders, custom projects, or specific requirements, please contact our B2B sales team or submit an RFQ through a product card.</p>
          <button 
            onClick={() => alert('Contacting B2B Sales (Not Implemented)')}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Contact B2B Sales
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;