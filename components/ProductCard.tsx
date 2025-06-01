
import React from 'react';
import { Product, UserType } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { userType, addLoyaltyPoints } = useAppContext();

  const displayPrice = userType === UserType.B2B && product.b2bPrice ? product.b2bPrice : product.b2cPrice;
  const stockStatus = userType === UserType.B2B && product.stockStatusB2B ? product.stockStatusB2B : product.stockStatusB2C;

  const handleAddToCart = () => {
    // Mock add to cart functionality
    alert(`${product.name} added to cart!`);
    if (userType === UserType.B2C) {
      addLoyaltyPoints(Math.floor(product.b2cPrice / 10)); // Example: 1 point per $10 spent
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-secondary-dark mb-2">{product.name}</h3>
        <p className="text-neutral-600 text-sm mb-3 flex-grow">{product.description}</p>
        <p className="text-xs text-neutral-500 mb-3">Category: {product.category}</p>
        
        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">
            ${displayPrice.toFixed(2)}
            {userType === UserType.B2B && product.b2bPrice && <span className="text-sm font-normal text-neutral-500"> (B2B Price)</span>}
          </p>
          <p className={`text-sm mt-1 ${stockStatus === 'In Stock' || (userType === UserType.B2B && product.stockStatusB2B && product.stockStatusB2B.toLowerCase().includes('in stock')) ? 'text-green-600' : 'text-red-600'}`}>
            {stockStatus}
          </p>
          {userType === UserType.B2B && product.b2bNotes && (
            <p className="text-xs text-neutral-500 mt-1 italic">{product.b2bNotes}</p>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className="mt-auto w-full bg-accent hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {userType === UserType.B2B ? 'Add to RFQ' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
