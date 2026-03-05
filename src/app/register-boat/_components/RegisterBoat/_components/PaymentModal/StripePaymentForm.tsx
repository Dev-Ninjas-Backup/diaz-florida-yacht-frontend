import { Button } from '@/components/ui/button';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { ErrorDisplay } from './ErrorDisplay';
import { PaymentSummary } from './PaymentSummary';
import { StripePaymentFormProps } from './types';

export const StripePaymentForm = ({
  onSuccess,
  onError,
  packageInfo,
  appliedPromo,
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Payment system is not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/seller-dashboard/my-listing`,
        },
        redirect: 'if_required',
      });

      if (error) {
        const errorMsg = error.message || 'Payment setup failed';
        setErrorMessage(errorMsg);
        onError(errorMsg);
      } else if (setupIntent?.status === 'succeeded') {
        onSuccess();
      } else {
        setErrorMessage('Payment setup completed but status is unclear');
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(errorMsg);
      onError(errorMsg);
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentSummary packageInfo={packageInfo} appliedPromo={appliedPromo} />

      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'google_pay', 'apple_pay'],
          }}
        />
      </div>

      {errorMessage && <ErrorDisplay message={errorMessage} />}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          'Pay & Post'
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        🔒 Your payment is secured by Stripe
      </p>
    </form>
  );
};
