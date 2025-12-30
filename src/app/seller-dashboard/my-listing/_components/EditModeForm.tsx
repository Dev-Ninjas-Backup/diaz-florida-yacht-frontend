'use client';

import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import Step2Form from '@/app/register-boat/_components/RegisterBoat/_components/Step2Form/Step2Form';
import { BoatDetail } from '@/types/boat-detail-types';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface EditModeFormProps {
  boatData: BoatDetail;
  imagesToDelete: string[];
  onDeleteImage: (imageId: string) => void;
}

export default function EditModeForm({
  boatData,
  imagesToDelete,
  onDeleteImage,
}: EditModeFormProps) {
  const { setValue } = useFormContext();

  console.log('Boat Data: ', boatData);

  // Force set city value after component mounts to override CityField's reset
  useEffect(() => {
    if (boatData.city) {
      // Small delay to ensure CityField has initialized
      setTimeout(() => {
        setValue('city', boatData.city, { shouldValidate: true });
      }, 100);
    }
  }, [boatData.city, setValue]);

  return (
    <div>
      {/* Existing Cover Photo */}
      {boatData.coverImages.length > 0 && (
        <div className="mb-6">
          <Label>Current Cover Photo</Label>
          <div className="mt-2 relative w-full h-64 rounded-lg overflow-hidden border-2 border-blue-500">
            <Image
              src={boatData.coverImages[0].url || '/placeholder-boat.jpg'}
              alt="Current Cover"
              fill
              className="object-cover"
            />
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
              Current Cover
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload a new cover photo below to replace
          </p>
        </div>
      )}

      {/* Existing Gallery */}
      {boatData.galleryImages.length > 0 && (
        <div className="mb-6">
          <Label>
            Current Gallery Images ({boatData.galleryImages.length})
          </Label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {boatData.galleryImages.map((img) => {
              const isDeleted = imagesToDelete.includes(img.id);
              return (
                <div
                  key={img.id}
                  className={`relative aspect-square rounded overflow-hidden border ${
                    isDeleted ? 'border-red-500 opacity-50' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img.url || '/placeholder-boat.jpg'}
                    alt="Gallery"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onDeleteImage(img.id)}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    aria-label="Delete image"
                  >
                    <X size={16} />
                  </button>
                  {isDeleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <span className="text-white text-xs font-semibold">
                        Will be deleted
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload new images below to add more
          </p>
        </div>
      )}

      {/* Regular Step2Form */}
      <Step2Form />
    </div>
  );
}
