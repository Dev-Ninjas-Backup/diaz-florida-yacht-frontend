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

  // Load client secret when modal opens
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      return;
    }

    const secret = getClientSecretFromStorage();

    if (secret) {
      setClientSecret(secret);
      console.log('✅ Setup Intent Client Secret loaded');
    } else {
      console.error('❌ No setup intent client secret found in localStorage');
    }

    setIsLoading(false);
  }, [isOpen]);

  // Handle successful payment
  const handlePaymentSuccess = async () => {
    try {
      console.log('🎉 Payment completed successfully');

      const userId = getUserIdFromStorage();

      if (!userId) {
        console.error('❌ User ID not found in localStorage');
        throw new Error('User ID not found');
      }

      // Confirm subscription with backend
      const { data: confirmResponse } =
        await confirmSubscriptionPayment(userId);
      console.log('✅ Subscription confirmed:', confirmResponse);

      // Clear payment data from localStorage
      if (confirmResponse?.data?.user?.id) {
        clearPaymentStorage();
      }

      // Call success callback
      onPaymentSuccess();

      // Navigate to login page
      router.push('/login');

      // Close modal
      onClose();
    } catch (error) {
      console.error('❌ Error confirming subscription:', error);
      // You could show an error toast here
    }
  };

  // Handle payment error
  const handlePaymentError = (error: string) => {
    console.error('❌ Payment error:', error);
    // You could show an error toast here
  };

  return {
    clientSecret,
    isLoading,
    handlePaymentSuccess,
    handlePaymentError,
  };
};
