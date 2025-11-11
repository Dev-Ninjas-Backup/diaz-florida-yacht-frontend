/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import stripe from '@/assets/seller-dashboard/payment/Stripe.svg';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { confirmSubscriptionPayment } from '@/services/main/subscription';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: string;
  onPaymentSuccess: () => void;
  onSubmitPayment: (data: any) => void;
}

const packageDetails: Record<string, { name: string; price: string }> = {
  gold: { name: 'Gold Package', price: '$9.99' },
  platinum: { name: 'Platinum Package', price: '$15.99' },
  diamond: { name: 'Diamond Elite Brokerage', price: '$29.99' },
};

// Stripe Payment Form Component
function StripePaymentForm({
  // clientSecret is passed via Elements provider context, not used directly here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clientSecret,
  onSuccess,
  onError,
  packageInfo,
}: {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  packageInfo: { name: string; price: string };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Use confirmSetup for SetupIntent (subscription setup)
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/seller-dashboard/my-listing`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Payment setup failed');
        onError(error.message || 'Payment setup failed');
      } else if (setupIntent && setupIntent.status === 'succeeded') {
        console.log('Payment method setup successful!', setupIntent);
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
      onError(err.message || 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Payment Details */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Selected Package:</span>
          <span className="font-semibold">{packageInfo.name}</span>
        </div>
        <div className="border-t pt-2 flex justify-between">
          <span className="text-gray-600">Total Payable:</span>
          <span className="font-bold text-lg text-blue-600">
            {packageInfo.price}
          </span>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div className="border rounded-lg p-4">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Pay & Post'}
      </Button>
    </form>
  );
}

export function PaymentModal({
  isOpen,
  onClose,
  selectedPackage,
  onPaymentSuccess,
  // onSubmitPayment is kept for backward compatibility but not used with Stripe
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSubmitPayment,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const router = useRouter();

  const packageInfo =
    packageDetails[selectedPackage] || packageDetails.platinum;

  // Get client secret from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      const secret = localStorage.getItem('paymentIntentClientSecret');
      if (secret) {
        setClientSecret(secret);
        console.log('Setup Intent Client Secret loaded:', secret);
      } else {
        console.error('No setup intent client secret found in localStorage');
      }
    }
  }, [isOpen]);

  const handlePaymentSuccess = async () => {
    console.log('Payment completed successfully!');
    const userId = localStorage.getItem('userId');
    const { data: confirmSubscriptionResponse } =
      await confirmSubscriptionPayment(userId!);
      console.log('confirmSubscriptionResponse', confirmSubscriptionResponse);
    if (confirmSubscriptionResponse?.data?.user?.id) {
      // console.log('Subscription confirmed:', confirmSubscriptionResponse);
      localStorage.removeItem('paymentIntentClientSecret');
      localStorage.removeItem('paymentIntentId');
      localStorage.removeItem('userId');
    }

    // Clear localStorage

    // Call success callback
    onPaymentSuccess();

    // Navigate to dashboard
    router.push('/login');

    // Close modal
    onClose();
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // You can add toast notification here
  };

  // Stripe Elements options
  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#2563eb',
      },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 font-bold text-lg">
              FYT
            </div>
            <span className="text-gray-600">Powered by</span>
            <Image src={stripe} alt="Stripe" width={60} height={20} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="cursor-pointer">
                  <span className="text-sm">
                    Pay with Stripe (Credit/Debit Card, Google Pay, Apple Pay)
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Stripe Payment Form */}
          {clientSecret && paymentMethod === 'stripe' ? (
            <Elements stripe={stripePromise} options={options}>
              <StripePaymentForm
                clientSecret={clientSecret}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                packageInfo={packageInfo}
              />
            </Elements>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading payment form...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
