'use client';

import stripeLogoImg from '@/assets/seller-dashboard/payment/Stripe.svg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Elements } from '@stripe/react-stripe-js';
import Image from 'next/image';
import { LoadingState } from './LoadingState';
import { getStripeElementsOptions, getStripeInstance } from './stripe-config';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentModalProps } from './types';
import { usePaymentFlow } from './usePaymentFlow';
import { getPackageInfo } from './utils';

export function PaymentModal({
  isOpen,
  onClose,
  selectedPlanDetails,
  onPaymentSuccess,
}: PaymentModalProps) {
  const packageInfo = getPackageInfo(selectedPlanDetails);

  const { clientSecret, isLoading, handlePaymentSuccess, handlePaymentError } =
    usePaymentFlow(isOpen, onClose, onPaymentSuccess);

  const stripePromise = getStripeInstance();

  const stripeOptions = clientSecret
    ? getStripeElementsOptions(clientSecret)
    : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 flex-wrap">
            <div className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
              FYT
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Powered by</span>
              <Image
                src={stripeLogoImg}
                alt="Stripe"
                width={60}
                height={20}
                className="object-contain"
              />
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Complete your payment to register your boat listing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
            <RadioGroup value="stripe" disabled>
              <div className="flex items-center space-x-3 p-3 border border-blue-200 rounded-lg bg-blue-50/50">
                <RadioGroupItem
                  value="stripe"
                  id="stripe"
                  className="border-blue-600"
                />
                <Label
                  htmlFor="stripe"
                  className="cursor-pointer text-sm text-gray-700 flex-1"
                >
                  <span className="font-medium">Stripe Payment</span>
                  <span className="text-gray-500 block text-xs mt-0.5">
                    Credit/Debit Card • Google Pay • Apple Pay
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : clientSecret && stripeOptions ? (
            <Elements stripe={stripePromise} options={stripeOptions}>
              <StripePaymentForm
                clientSecret={clientSecret}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                packageInfo={packageInfo}
              />
            </Elements>
          ) : (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">⚠️</div>
              <p className="text-gray-600 text-sm">
                Unable to load payment form
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Please try again or contact support
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
