'use client';

import { confirmSubscriptionPayment } from '@/services/main/subscription';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  clearPaymentStorage,
  getClientSecretFromStorage,
  getUserIdFromStorage,
} from './utils';

export const usePaymentFlow = (
  isOpen: boolean,
  onClose: () => void,
  onPaymentSuccess: () => void,
) => {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      return;
    }

    const secret = getClientSecretFromStorage();

    if (secret) {
      setClientSecret(secret);
    } else {
      console.error('No setup intent client secret found in localStorage');
    }

    setIsLoading(false);
  }, [isOpen]);

  const handlePaymentSuccess = async () => {
    try {
      const userId = getUserIdFromStorage();
      const boatId = localStorage.getItem('boatId');

      if (!userId) {
        console.error('❌ User ID not found in localStorage');
        throw new Error('User ID not found');
      }

      const { data: confirmResponse } =
        await confirmSubscriptionPayment(userId);

      if (confirmResponse?.data?.user?.id) {
        clearPaymentStorage();
      }

      onPaymentSuccess();

      if (boatId) {
        router.push(`/search-listing/${boatId}`);
      } else {
        router.push('/seller-dashboard');
      }

      onClose();
    } catch (error) {
      console.error('❌ Error confirming subscription:', error);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error('❌ Payment error:', error);
  };

  return {
    clientSecret,
    isLoading,
    handlePaymentSuccess,
    handlePaymentError,
  };
};
