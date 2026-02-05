




import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  maxWords?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder = 'Type here',
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  maxWords,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [wordCountError, setWordCountError] = useState('');
  const currentValue = watch(name) || '';

  
  

  
  const wordCount =
    currentValue.trim() === '' ? 0 : currentValue.trim().split(/\s+/).length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const words = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;

    if (maxWords && words > maxWords) {
      setWordCountError(
        `Description exceeds the maximum word limit of ${maxWords} words. Current: ${words} words.`,
      );
    } else {
      setWordCountError('');
    }

    setValue(name, value);
  };

  const error = errors[name];
  const displayError = wordCountError || (error?.message as string);

  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label} {required && '*'}
      </Label>
      {maxWords && maxWords > 0 && (
        <p className="text-sm text-gray-500 mt-1 mb-2">
          Word count: {wordCount} / {maxWords}
          {wordCount > maxWords && (
            <span className="text-red-500 ml-2 font-medium">
              ({wordCount - maxWords} words over limit)
            </span>
          )}
        </p>
      )}
      <Textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        {...register(name)}
        onChange={handleChange}
        className={`w-full bg-white rounded-[12px] border-none shadow-none ${
          wordCountError ? 'border-red-500 border' : ''
        }`}
      />
      {displayError && (
        <p className="text-red-500 text-sm mt-1">{displayError}</p>
      )}
      {maxWords === 0 && (
        <p className="text-yellow-600 text-sm mt-1">
          Please select a package to see word limit.
        </p>
      )}
    </div>
  );
};
