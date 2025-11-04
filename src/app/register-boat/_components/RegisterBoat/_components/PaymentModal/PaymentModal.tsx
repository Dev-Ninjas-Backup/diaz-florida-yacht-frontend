/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import stripe from '@/assets/seller-dashboard/payment/Stripe.svg';
import visa from '@/assets/seller-dashboard/payment/visa.svg';
import pay from '@/assets/seller-dashboard/payment/pay.svg';
import gpay from '@/assets/seller-dashboard/payment/GooglePay.svg';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  PaymentFormData,
  paymentSchema,
} from '@/app/register-boat/schema/registerBoatSchema';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

export function PaymentModal({
  isOpen,
  onClose,
  selectedPackage,
  onPaymentSuccess,
  onSubmitPayment,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const packageInfo =
    packageDetails[selectedPackage] || packageDetails.platinum;

  const onSubmit = async (data: PaymentFormData) => {
    const completeData = {
      paymentMethod,
      ...data,
      selectedPackage,
      packageInfo,
    };

    // Call the global handler to collect all form data
    onSubmitPayment(completeData);

    // Simulate payment processing
    setTimeout(() => {
      //   toast("Payment successful!");
      router.push('/seller-dashboard/my-listing');
      reset();
      onPaymentSuccess();
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 font-bold text-lg">
              FYT
            </div>
            {/* <span>Powered by</span>
            <span className="font-bold">stripe</span> */}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="cursor-pointer mt-2">
                  <Image src={stripe} alt="stripe" width={45} height={12} />
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="visa" id="visa" />
                <Label htmlFor="visa" className="cursor-pointer mt-2">
                  <Image src={visa} alt="stripe" width={45} height={12} />
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="mastercard" id="mastercard" />
                <Label htmlFor="mastercard" className="cursor-pointer mt-2">
                  <Image src={pay} alt="stripe" width={45} height={12} />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gpay" id="gpay" />
                <Label htmlFor="gpay" className="cursor-pointer mt-2">
                  <Image src={gpay} alt="stripe" width={50} height={30} />
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="font-semibold mb-4">Payment Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Package:</span>
                <span className="font-semibold">{packageInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Listing ID:</span>
                <span className="font-semibold">INV-20033</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Invoice ID:</span>
                <span className="font-semibold">INV-20033</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-gray-600">Total Payable:</span>
                <span className="font-bold text-lg text-primary">
                  {packageInfo.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Details Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="Enter name on card"
              {...register('cardholderName')}
              className={errors.cardholderName ? 'border-red-500' : ''}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardholderName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              {...register('cardNumber')}
              className={errors.cardNumber ? 'border-red-500' : ''}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                {...register('expiryDate')}
                className={errors.expiryDate ? 'border-red-500' : ''}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                {...register('cvc')}
                className={errors.cvc ? 'border-red-500' : ''}
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cvc.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Pay & Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
