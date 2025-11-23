/**
 * CoverPhotoUpload Component
 * Reusable component for uploading a single cover photo
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface CoverPhotoUploadProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const CoverPhotoUpload: React.FC<CoverPhotoUploadProps> = ({
  name,
  label = 'Cover Photo',
  required = false,
  className = '',
}) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();

  const [preview, setPreview] = useState<string>('');
  const error = errors[name];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(name, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={className}>
      <Label>
        {label} {required && '*'}
      </Label>
      <div className="mt-2">
        {preview ? (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image
              src={preview}
              alt="Cover preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setPreview('');
                setValue(name, null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#01B6FF] transition-colors">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`${name}-input`}
            />
            <label
              htmlFor={`${name}-input`}
              className="cursor-pointer flex flex-col items-center"
            >
              <svg
                className="w-12 h-12 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-gray-600">Click to upload cover photo</p>
              <p className="text-gray-400 text-sm mt-1">
                PNG, JPG, JPEG up to 10MB
              </p>
            </label>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message as string}</p>
      )}
    </div>
  );
};
