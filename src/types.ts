export interface LeadBooking {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  district?: string;
  serviceType: string;
  propertyType?: string;
  areaSize?: number;
  preferredDate: string;
  preferredTime: string;
  note?: string;
  estimatedPrice?: number;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge?: string;
  startingPrice: string;
  unit: string;
  features: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface PricePackage {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  unit: string;
  popular?: boolean;
  description: string;
  items: string[];
  ctaText: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  timeTaken: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar: string;
  serviceUsed: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface CompanyConfig {
  brandName: string;
  ownerName: string;
  hotline: string;
  hotlineDisplay: string;
  zaloNumber: string;
  facebookUrl: string;
  email: string;
  address: string;
  operatingHours: string;
  areasServed: string[];
  promoDiscountPercent: number;
  promoTitle: string;
  promoEndsAt: string;
}
