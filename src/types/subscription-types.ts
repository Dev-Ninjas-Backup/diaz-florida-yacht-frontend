export interface SubscriptionPlan {
  id: number | string;
  name: string;
  price: number;
  currency: string;
  billingCycle: string;
  featured: boolean;
  featuredLabel?: string;
  features: string[];
  buttonText: string;
  buttonStyle: 'primary' | 'dark';
}

export interface SubscriptionApiResponse {
  id: string;
  title: string;
  planType: 'GOLD' | 'PLATINUM' | 'DIAMOND';
  description: string;
  benefits: string[];
  picLimit: number;
  wordLimit: number;
  isBest: boolean;
  isActive: boolean;
  stripeProductId: string;
  stripePriceId: string;
  currency: string;
  price: number;
  billingPeriodMonths: number;
  createdAt: string;
  updatedAt: string;
}

export interface FieldLimitations {
  picLimit: number;
  wordLimit: number;
}

export interface SubscriptionPlanDetails extends SubscriptionApiResponse {
  // Additional fields can be added here if needed
}
