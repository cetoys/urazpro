
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { useAppContext } from '../contexts/AppContext';

const B2CProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { userType } = useAppContext();

  useEffect(() => {
    // In a real app, fetch products from an API
    setProducts(MOCK_PRODUCTS);
  }, []);
  
  if (userType !== 'B2C') {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-semibold text-neutral-700">Access Denied</h1>
        <p className="text-neutral-600">This page is for B2C users. Please switch user type if this is incorrect.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-2">Shop Our Products</h1>
      <p className="text-lg text-center text-neutral-600 mb-10">Find everything you need for your next home improvement project.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default B2CProductPage;
