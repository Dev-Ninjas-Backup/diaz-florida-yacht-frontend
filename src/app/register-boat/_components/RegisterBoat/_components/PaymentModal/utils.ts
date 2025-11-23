import { PackageInfo, PlanDetails } from './types';

export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    usd: '$',
    eur: '€',
    gbp: '£',
  };
  return symbols[currency.toLowerCase()] || '';
};

export const formatPrice = (price: number, currency: string): string => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${price.toFixed(2)}`;
};

export const getPackageInfo = (
  planDetails?: PlanDetails | null,
): PackageInfo => {
  if (!planDetails) {
    return {
      name: 'Selected Package',
      price: '$0.00',
    };
  }

  return {
    name: planDetails.name,
    price: formatPrice(planDetails.price, planDetails.currency),
  };
};

export const getClientSecretFromStorage = (): string | null => {
  try {
    return localStorage.getItem('paymentIntentClientSecret');
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const clearPaymentStorage = (): void => {
  try {
    localStorage.removeItem('paymentIntentClientSecret');
    localStorage.removeItem('paymentIntentId');
    localStorage.removeItem('userId');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const getUserIdFromStorage = (): string | null => {
  try {
    return localStorage.getItem('userId');
  } catch (error) {
    console.error('Error reading userId from localStorage:', error);
    return null;
  }
};
