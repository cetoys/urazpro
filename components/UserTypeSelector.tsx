
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { UserType } from '../types';

export const UserTypeSelector: React.FC = () => {
  const { userType, setUserType } = useAppContext();

  return (
    <div className="p-4 bg-secondary-light rounded-lg shadow mb-6 flex items-center justify-center space-x-4">
      <span className="font-medium text-neutral-700">Demo User Mode:</span>
      <div className="flex space-x-2">
        {(Object.keys(UserType) as Array<keyof typeof UserType>).map((key) => (
          <button
            key={key}
            onClick={() => setUserType(UserType[key])}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
              ${userType === UserType[key] 
                ? 'bg-primary text-white shadow-md scale-105' 
                : 'bg-white text-neutral-700 hover:bg-neutral-200'
              }`}
          >
            {UserType[key] === UserType.B2C ? 'Retail Customer (B2C)' : 'Contractor (B2B)'}
          </button>
        ))}
      </div>
    </div>
  );
};
