/**
 * DimensionInput Component
 * Reusable dimension input with feet and inches fields
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface DimensionInputProps {
  namePrefix: string;
  label: string;
  required?: boolean;
  className?: string;
}

export const DimensionInput: React.FC<DimensionInputProps> = ({
  namePrefix,
  label,
  required = false,
  className = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const feetName = `${namePrefix}Feet`;
  const inchesName = `${namePrefix}Inches`;
  const feetError = errors[feetName];
  const inchesError = errors[inchesName];

  return (
    <div className={className}>
      <Label>
        {label} {required && '*'}
      </Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            {...register(feetName)}
            placeholder="Feet"
            type="number"
            className="w-full bg-white rounded-[12px] border-none shadow-none"
          />
          {feetError && (
            <p className="text-red-500 text-xs mt-1">
              {feetError.message as string}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register(inchesName)}
            placeholder="Inches"
            type="number"
            className="w-full bg-white rounded-[12px] border-none shadow-none"
          />
          {inchesError && (
            <p className="text-red-500 text-xs mt-1">
              {inchesError.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
