
import React from 'react';
import { GarlandStoreAddress, StorePhoneNumber } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-8 text-center">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} urazpro. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Visit our Garland Store: {GarlandStoreAddress} | Call Us: {StorePhoneNumber}
        </p>
        <p className="mt-1 text-xs">
          This is a demo application. AI responses are generated and may require verification.
        </p>
      </div>
    </footer>
  );
};

export default Footer;