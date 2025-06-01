import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const { userType, loyaltyPoints, loyaltyTier } = useAppContext();

  return (
    <header className="bg-secondary-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold text-primary-light hover:text-primary transition-colors">
          uraz<span className="text-white">pro</span>
        </NavLink>
        <nav className="mt-4 sm:mt-0">
          <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-3">
            {NAV_LINKS.map(link => (
              <li key={link.path} className="my-1 sm:my-0">
                <NavLink
                  to={link.path}
                  title={link.title || link.name} // Use link.title if available, otherwise link.name
                  className={({ isActive }) =>
                    `px-2 py-2 sm:px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary text-secondary-dark' : 'hover:bg-secondary hover:text-secondary-dark'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 sm:mt-0 text-right text-xs sm:text-sm">
          <div>Current User: <span className="font-semibold">{userType}</span></div>
          <div>Loyalty Points: <span className="font-semibold">{loyaltyPoints} ({loyaltyTier})</span></div>
        </div>
      </div>
    </header>
  );
};

export default Header;