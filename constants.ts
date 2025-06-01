import { Product } from './types';

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Premium Oak Flooring',
    description: 'Durable and beautiful oak flooring, perfect for any room.',
    category: 'Flooring',
    imageUrl: 'https://placehold.co/400x300/FFD6A5/343A40?text=Oak+Flooring',
    b2cPrice: 75.99,
    b2bPrice: 60.00,
    stockStatusB2C: 'In Stock',
    stockStatusB2B: '1000 sqft in stock (Warehouse A), Price per sqft',
    b2bNotes: 'Minimum order 100 sqft for B2B price. Inquire for pallet pricing.',
  },
  {
    id: 'prod_002',
    name: 'Luxury Shaker Cabinets',
    description: 'Elegant Shaker style cabinets, available in multiple finishes.',
    category: 'Cabinetry',
    imageUrl: 'https://placehold.co/400x300/A2D2FF/343A40?text=Shaker+Cabinets',
    b2cPrice: 299.50,
    b2bPrice: 220.00,
    stockStatusB2C: 'Limited Stock',
    stockStatusB2B: 'Contact for availability and lead times. Price per linear foot.',
    b2bNotes: 'Custom configurations available for B2B. RFQ for large projects.',
  },
  {
    id: 'prod_003',
    name: 'Weatherproof Roofing Shingles',
    description: 'High-quality asphalt shingles, 30-year warranty.',
    category: 'Roofing',
    imageUrl: 'https://placehold.co/400x300/FF7D54/FFFFFF?text=Roofing+Shingles',
    b2cPrice: 35.00,
    b2bPrice: 25.00,
    stockStatusB2C: 'In Stock',
    stockStatusB2B: '500 bundles available. Price per bundle.',
    b2bNotes: 'Volume discounts available for >50 bundles.',
  },
  {
    id: 'prod_004',
    name: 'Energy Efficient Window Panel',
    description: 'Double-glazed window panel for improved insulation.',
    category: 'Windows',
    imageUrl: 'https://placehold.co/400x300/74BDCB/FFFFFF?text=Window+Panel',
    b2cPrice: 150.00,
    stockStatusB2C: 'In Stock',
    stockStatusB2B: 'Available on order. Custom sizes for B2B.',
    b2bNotes: 'Bulk order for construction projects.',
  },
];

export const GarlandStoreAddress = "1234 Cavalier Dr., Garland, TX";
export const StorePhoneNumber = "945-400-9421";

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'PROS', path: '/pros', title: "Contractors, Builders And HOA's" },
  { name: 'Blogs', path: '/blogs' },
  { name: 'News', path: '/news' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Testimonials', path: '/testimonials', title: "References and Testimonials" },
];