'use client';

import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import Step2Form from '@/app/register-boat/_components/RegisterBoat/_components/Step2Form/Step2Form';
import { BoatDetail } from '@/types/boat-detail-types';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

interface EditModeFormProps {
  boatData: BoatDetail;
}

export default function EditModeForm({ boatData }: EditModeFormProps) {
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
            {boatData.galleryImages.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded overflow-hidden border border-gray-200"
              >
                <Image
                  src={img.url || '/placeholder-boat.jpg'}
                  alt="Gallery"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload new images below to add more
          </p>
        </div>
      )}

      {/* Existing Video URL Display */}
      {boatData.videoURL && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm">Current Video URL</h4>
          <a
            href={boatData.videoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm break-all"
          >
            {boatData.videoURL}
          </a>
          <p className="text-xs text-gray-600 mt-2">
            Enter a new URL below to update
          </p>
        </div>
      )}

      {/* Regular Step2Form */}
      <Step2Form />
    </div>
  );
}
