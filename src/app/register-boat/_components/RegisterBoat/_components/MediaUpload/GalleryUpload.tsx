import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface GalleryUploadProps {
  name: string;
  label?: string;
  required?: boolean;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

export const GalleryUpload: React.FC<GalleryUploadProps> = ({
  name,
  label = 'Gallery Images',
  required = false,
  maxFiles = 10,
  className = '',
  disabled = false,
}) => {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const [previews, setPreviews] = useState<string[]>([]);
  const galleryFiles = watch(name) || [];
  const error = errors[name];

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalFiles = previews.length + files.length;

    if (totalFiles > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const newPreviews: string[] = [];
    const newFiles = [...galleryFiles];

    files.forEach((file) => {
      newFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === files.length) {
          setPreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setValue(name, newFiles);
  };

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = galleryFiles.filter((_: File, i: number) => i !== index);
    setPreviews(newPreviews);
    setValue(name, newFiles);
  };

  return (
    <div className={className}>
      <Label>
        {label} {required && '*'}
      </Label>
      <div className="mt-2">
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {previews?.map((preview, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
              >
                <Image
                  src={preview}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {previews.length < maxFiles && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#01B6FF] transition-colors">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              className="hidden"
              id={`${name}-input`}
              disabled={disabled || maxFiles === 0}
            />
            <label
              htmlFor={`${name}-input`}
              className={`flex flex-col items-center ${disabled || maxFiles === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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
              <p className="text-gray-600">
                {disabled || maxFiles === 0
                  ? 'Select a package to upload gallery images'
                  : 'Click to upload gallery images'}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                PNG, JPG, JPEG up to 10MB each
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {previews.length} / {maxFiles} images uploaded
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
