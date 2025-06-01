
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { useAppContext } from '../contexts/AppContext';

const B2BProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { userType } = useAppContext();

  useEffect(() => {
    // In a real app, fetch products from an API, possibly with B2B specific pricing
    setProducts(MOCK_PRODUCTS.filter(p => p.b2bPrice !== undefined || p.b2bNotes !== undefined)); // Show products relevant to B2B
  }, []);

  if (userType !== 'B2B') {
     return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-semibold text-neutral-700">Access Denied</h1>
        <p className="text-neutral-600">This page is for B2B users. Please switch user type if this is incorrect.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-2">Contractor & Pro Supplies</h1>
      <p className="text-lg text-center text-neutral-600 mb-10">Access special pricing and bulk order options for your business needs.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 p-6 bg-secondary-light rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-secondary-dark mb-3">Need a Custom Quote?</h2>
        <p className="text-neutral-700 mb-4">For large orders, custom projects, or specific requirements, please contact our B2B sales team or submit an RFQ through a product page.</p>
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Contact B2B Sales
        </button>
      </div>
    </div>
  );
};

export default B2BProductPage;
