import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';


let stripeInstance: Promise<Stripe | null> | null = null;

export const getStripeInstance = (): Promise<Stripe | null> => {
  if (stripeInstance) {
    return stripeInstance;
  }

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error('Stripe publishable key is not configured');
    return Promise.resolve(null);
  }

  stripeInstance = loadStripe(publishableKey);
  return stripeInstance;
};

export const getStripeElementsOptions = (
  clientSecret: string,
): StripeElementsOptions => ({
  clientSecret,
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#2563eb', 
      colorBackground: '#ffffff',
      colorText: '#1f2937', 
      colorDanger: '#ef4444', 
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  },
  loader: 'auto',
});
