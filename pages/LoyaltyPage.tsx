
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { LoyaltyTier } from '../types';

const tierBenefits = {
  [LoyaltyTier.Bronze]: ["Access to member-only sales", "5% off on first purchase after joining"],
  [LoyaltyTier.Silver]: ["All Bronze benefits", "1.25x points earning", "Early access to new products"],
  [LoyaltyTier.Gold]: ["All Silver benefits", "1.5x points earning", "Free standard shipping on select orders", "Birthday reward"],
  [LoyaltyTier.Platinum]: ["All Gold benefits", "2x points earning", "Dedicated support line", "Exclusive event invitations"],
};

const pointsToNextTier = (currentTier: LoyaltyTier, currentPoints: number): string => {
    switch(currentTier) {
        case LoyaltyTier.Bronze:
            return `${100 - currentPoints} points to Silver`;
        case LoyaltyTier.Silver:
            return `${500 - currentPoints} points to Gold`;
        case LoyaltyTier.Gold:
            return `${1000 - currentPoints} points to Platinum`;
        case LoyaltyTier.Platinum:
            return "You are at the highest tier!";
        default:
            return "";
    }
}

const LoyaltyPage: React.FC = () => {
  const { loyaltyPoints, loyaltyTier, addLoyaltyPoints, redeemLoyaltyPoints, userType } = useAppContext();

  const handleRedeem = () => {
    const pointsToRedeem = 50; // Example: Redeem 50 points for $5 discount
    if (redeemLoyaltyPoints(pointsToRedeem)) {
      alert(`Successfully redeemed ${pointsToRedeem} points!`);
    } else {
      alert(`Not enough points to redeem. You need at least ${pointsToRedeem} points.`);
    }
  };
  
  const nextTierProgress = loyaltyTier !== LoyaltyTier.Platinum ? pointsToNextTier(loyaltyTier, loyaltyPoints) : tierBenefits[LoyaltyTier.Platinum][0];


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-2">urazpro Rewards</h1>
      <p className="text-lg text-center text-neutral-600 mb-8">
        {userType === 'B2C' ? 'Earn points on every purchase and enjoy exclusive benefits!' : 'Special considerations for B2B accounts. Contact your representative.'}
      </p>

      <div className="bg-white p-8 rounded-lg shadow-xl mb-8 text-center">
        <h2 className="text-2xl font-semibold text-primary mb-2">Your Loyalty Status</h2>
        <p className="text-5xl font-bold text-secondary-dark mb-1">{loyaltyPoints}</p>
        <p className="text-neutral-600 mb-3">Points</p>
        <p className="text-xl font-medium text-primary-dark mb-4">Tier: {loyaltyTier}</p>
        {loyaltyTier !== LoyaltyTier.Platinum && <p className="text-sm text-neutral-500">{nextTierProgress}</p>}
      </div>
      
      {userType === 'B2C' && (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-secondary-dark mb-3">Tier Benefits ({loyaltyTier})</h3>
                <ul className="list-disc list-inside text-neutral-700 space-y-1">
                {tierBenefits[loyaltyTier].map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <button 
                    onClick={() => addLoyaltyPoints(25)} // Simulate earning points
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors"
                >
                    Simulate Earn 25 Points
                </button>
                <button 
                    onClick={handleRedeem}
                    disabled={loyaltyPoints < 50}
                    className="w-full bg-accent hover:bg-opacity-80 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors disabled:opacity-50"
                >
                    Redeem 50 Points (for $5 off - Mock)
                </button>
            </div>
        </>
      )}
       {userType === 'B2B' && (
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">B2B Rewards Information</h3>
          <p className="text-neutral-700">
            As a B2B partner, you have access to specialized pricing, volume discounts, and dedicated support. 
            While a points-based system might not directly apply, we offer structured rebates and project credits for our valued contractors. 
            Please discuss your specific needs and potential reward structures with your account manager.
          </p>
        </div>
      )}


      <div className="text-center text-sm text-neutral-500">
        <p>Terms and conditions apply to the loyalty program.</p>
        <p>Points and tier benefits are for demonstration purposes.</p>
      </div>
    </div>
  );
};

export default LoyaltyPage;