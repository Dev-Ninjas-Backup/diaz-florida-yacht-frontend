/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * FormSelect Component
 * Reusable select field with label and error handling for React Hook Form
 */

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  search?: string;
  type?: string;
  limit?: number;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder = 'Select',
  required = false,
  disabled = false,
  className = '',
  search,
  type,
  limit,
}) => {
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const error = errors[name];

  const handleChange = (newValue: string) => {
    setValue(name, newValue);
    clearErrors(name);
  };

  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label} {required && '*'}
      </Label>
      <Select
        value={value || ''}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full bg-white rounded-[12px] border-none shadow-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
      )}
    </div>
  );
};
