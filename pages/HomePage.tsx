import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { GarlandStoreAddress } from '../constants';

const HomePage: React.FC = () => {
  const { userType } = useAppContext();

  return (
    <div className="text-center">
      <header className="bg-gradient-to-r from-primary-light via-primary to-primary-dark p-12 rounded-lg shadow-xl mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to urazpro!</h1>
        <p className="text-xl text-white mb-8">Your trusted partner for all home improvement needs.</p>
        <div className="space-x-4">
          <Link
            to="/products" // Updated to point to consolidated products page
            className="bg-white text-primary-dark font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-neutral-100 transition-colors text-lg"
          >
            Shop {userType === 'B2C' ? 'Home Projects' : 'Pro Supplies'}
          </Link>
          <Link
            to="/content-ideation"
            className="bg-secondary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-secondary-dark transition-colors text-lg"
          >
            Get Content Ideas
          </Link>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-neutral-700 mb-6">Discover Our Range</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src="https://placehold.co/400x200/FF7D54/FFFFFF?text=Quality+Roofing" alt="Roofing" className="rounded-md mb-4 w-full h-40 object-cover"/>
            <h3 className="text-xl font-semibold text-secondary-dark mb-2">Quality Roofing</h3>
            <p className="text-neutral-600">Durable and stylish roofing solutions for every home.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src="https://placehold.co/400x200/A2D2FF/343A40?text=Elegant+Cabinetry" alt="Cabinetry" className="rounded-md mb-4 w-full h-40 object-cover"/>
            <h3 className="text-xl font-semibold text-secondary-dark mb-2">Elegant Cabinetry</h3>
            <p className="text-neutral-600">Transform your kitchen and bath with our custom cabinets.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src="https://placehold.co/400x200/FFD6A5/343A40?text=Premium+Flooring" alt="Flooring" className="rounded-md mb-4 w-full h-40 object-cover"/>
            <h3 className="text-xl font-semibold text-secondary-dark mb-2">Premium Flooring</h3>
            <p className="text-neutral-600">A wide selection of hardwood, laminate, and tile flooring.</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary-light p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-secondary-dark mb-4">Visit Our Showroom!</h2>
        <p className="text-lg text-neutral-700 mb-6">
          See our products in person and get expert advice at our Garland store. <br />
          {GarlandStoreAddress}
        </p>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GarlandStoreAddress)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-80 transition-colors text-lg"
        >
          Get Directions
        </a>
      </section>
    </div>
  );
};

export default HomePage;