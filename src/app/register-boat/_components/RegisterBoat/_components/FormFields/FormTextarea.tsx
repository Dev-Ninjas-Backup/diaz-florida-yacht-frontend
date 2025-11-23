/**
 * FormTextarea Component
 * Reusable textarea field with label and error handling for React Hook Form
 */

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder = 'Type here',
  required = false,
  disabled = false,
  rows = 4,
  className = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label} {required && '*'}
      </Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        {...register(name)}
        className="w-full bg-white rounded-[12px] border-none shadow-none"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
      )}
    </div>
  );
};
