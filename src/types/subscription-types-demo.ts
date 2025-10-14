export interface SubscriptionPlan {
  id: number;
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
