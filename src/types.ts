export interface DematLead {
  fullName: string;
  mobile: string;
  city: string;
  timestamp: string;
  source: 'direct' | 'hero' | 'benefits' | 'contacts';
}

export interface SipLead {
  fullName: string;
  mobile: string;
  monthlySip: number;
  expectedReturn: number;
  years: number;
  estimatedWealth: string;
  timestamp: string;
}

export interface MarketTickerItem {
  id: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isUp: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
