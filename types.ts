
export enum UserType {
  B2C = 'B2C', // Retail Customer
  B2B = 'B2B', // Contractor/Professional
}

export enum LoyaltyTier {
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold',
  Platinum = 'Platinum',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  b2cPrice: number;
  b2bPrice?: number; // Optional, as B2B might have custom pricing/RFQ
  stockStatusB2C: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  stockStatusB2B?: string; // e.g., "500 in stock (warehouse A); more available in 2 weeks"
  b2bNotes?: string; // e.g. "Price per pallet"
}

export interface ContentIdea {
  title: string;
  synopsis: string;
  talkingPoints: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web: GroundingChunkWeb;
}
export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}
