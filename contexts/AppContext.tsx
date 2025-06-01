
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useCallback } from 'react';
import { UserType, LoyaltyTier } from '../types';

interface AppContextProps {
  userType: UserType;
  setUserType: Dispatch<SetStateAction<UserType>>;
  loyaltyPoints: number;
  addLoyaltyPoints: (points: number) => void;
  redeemLoyaltyPoints: (points: number) => boolean;
  loyaltyTier: LoyaltyTier;
  isChatbotOpen: boolean;
  setIsChatbotOpen: Dispatch<SetStateAction<boolean>>;
  apiKeyStatus: 'valid' | 'missing' | 'unchecked';
  setApiKeyStatus: Dispatch<SetStateAction<'valid' | 'missing' | 'unchecked'>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(UserType.B2C);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'valid' | 'missing' | 'unchecked'>('unchecked');


  const addLoyaltyPoints = useCallback((points: number) => {
    setLoyaltyPoints(prevPoints => prevPoints + points);
  }, []);

  const redeemLoyaltyPoints = useCallback((pointsToRedeem: number) => {
    if (loyaltyPoints >= pointsToRedeem) {
      setLoyaltyPoints(prevPoints => prevPoints - pointsToRedeem);
      return true;
    }
    return false;
  }, [loyaltyPoints]);

  const loyaltyTier = (() => {
    if (loyaltyPoints >= 1000) return LoyaltyTier.Platinum;
    if (loyaltyPoints >= 500) return LoyaltyTier.Gold;
    if (loyaltyPoints >= 100) return LoyaltyTier.Silver;
    return LoyaltyTier.Bronze;
  })();

  return (
    <AppContext.Provider value={{ 
      userType, setUserType, 
      loyaltyPoints, addLoyaltyPoints, redeemLoyaltyPoints, loyaltyTier,
      isChatbotOpen, setIsChatbotOpen,
      apiKeyStatus, setApiKeyStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
