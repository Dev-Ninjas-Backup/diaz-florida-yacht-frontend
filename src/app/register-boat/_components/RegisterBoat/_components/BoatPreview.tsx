




import Image from 'next/image';
import React from 'react';

interface BoatPreviewProps {
  title?: string;
  className?: string;
  imageUrl?: string;
  details?: {
    label: string;
    value: string | number;
  }[];
}

export const BoatPreview: React.FC<BoatPreviewProps> = ({
  title = 'Your Boat',
  className = '',
  imageUrl,
  details = [],
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>

      
      {imageUrl && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Boat preview"
            fill
            className="object-cover"
          />
        </div>
      )}

      
      {details.length > 0 && (
        <div className="space-y-3">
          {details?.map((detail, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">{detail.label}:</span>
              <span className="text-gray-900 font-semibold text-sm">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {details.length === 0 && !imageUrl && (
        <p className="text-gray-400 text-center py-8">
          Fill in the form to see preview
        </p>
      )}
    </div>
  );
};
