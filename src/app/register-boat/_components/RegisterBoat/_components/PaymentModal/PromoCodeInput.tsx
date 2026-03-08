'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validatePromoCode } from '@/services/promo';
import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

interface PromoCodeInputProps {
  onValidCode?: (freeDays: number, code: string) => void;
}

export const PromoCodeInput = ({ onValidCode }: PromoCodeInputProps) => {
  const [promoCode, setPromoCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    freeDays?: number;
  } | null>(null);

  const handleValidation = async () => {
    if (!promoCode.trim()) {
      setValidationResult(null);
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      console.log('Validating promo code:', promoCode.trim());
      const response = await validatePromoCode(promoCode.trim());
      console.log('Validation response:', response);

      if (response.success && response.data.isValid) {
        setValidationResult({
          isValid: true,
          message: `🎉 Promo code applied! You'll get ${response.data.freeDays} free days`,
          freeDays: response.data.freeDays,
        });
        onValidCode?.(response.data.freeDays || 0, promoCode.trim());
      } else {
        setValidationResult({
          isValid: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.error('Promo validation error:', error);
      setValidationResult({
        isValid: false,
        message: 'Failed to validate promo code',
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-2 bg-white p-6 rounded-2xl">
      <Label htmlFor="promoCode">Promo Code (Optional)</Label>
      <div className="relative">
        <Input
          id="promoCode"
          type="text"
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value.toUpperCase());
            setValidationResult(null);
          }}
          onBlur={handleValidation}
          placeholder="Enter promo code"
          className="pr-10"
          disabled={isValidating}
        />
        {isValidating && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
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
          </div>
        )}
        {validationResult && !isValidating && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {validationResult.isValid ? (
              <FiCheck className="h-5 w-5 text-green-600" />
            ) : (
              <FiX className="h-5 w-5 text-red-600" />
            )}
          </div>
        )}
      </div>
      {validationResult && (
        <div
          className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
            validationResult.isValid
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {validationResult.isValid ? (
            <FiCheck className="h-4 w-4 mt-0.5 flex-shrink-0" />
          ) : (
            <FiX className="h-4 w-4 mt-0.5 flex-shrink-0" />
          )}
          <p>{validationResult.message}</p>
        </div>
      )}
    </div>
  );
};
