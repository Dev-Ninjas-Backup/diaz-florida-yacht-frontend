import React from 'react';

interface PreviewSectionProps {
  buildYear?: string;
  make?: string;
  model?: string;
  name?: string;
  price?: string;
  condition?: string;
  lengthFeet?: string;
  lengthInches?: string;
  city?: string;
  state?: string;
  coverPhoto?: File | null;
  boatPreviewFallback?: string;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  buildYear,
  make,
  model,
  name,
  price,
  condition,
  lengthFeet,
  lengthInches,
  city,
  state,
  coverPhoto,
  boatPreviewFallback,
}) => {
  return (
    <>
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        {coverPhoto ? (
          <img
            src={
              coverPhoto instanceof File
                ? URL.createObjectURL(coverPhoto)
                : boatPreviewFallback
            }
            alt="Boat preview"
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100">
            <p className="text-gray-400 text-sm">
              Upload cover photo to display
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-sm">
            {lengthFeet ? '● Verify' : '○ Pending'}
          </span>
        </div>
        <h4 className="font-semibold text-sm">
          {buildYear || make || model || name
            ? `${buildYear || ''} ${make || ''} ${model || ''} ${name || ''}`.trim()
            : 'Input data to display'}
        </h4>
        <div className="flex gap-4 text-xs text-gray-600">
          <span>Make: {make || <em className="text-gray-400">N/A</em>}</span>
          <span>Model: {model || <em className="text-gray-400">N/A</em>}</span>
          <span>
            Year: {buildYear || <em className="text-gray-400">N/A</em>}
          </span>
        </div>
        {lengthFeet && lengthInches && (
          <div className="text-xs text-gray-600">
            <span>
              Length: {lengthFeet}'{lengthInches}"
            </span>
          </div>
        )}
        {condition && (
          <div className="text-xs text-gray-600">
            <span>Condition: {condition}</span>
          </div>
        )}
        {city && state && (
          <div className="text-xs text-gray-600">
            <span>
              Location: {city}, {state}
            </span>
          </div>
        )}
        <p className="text-blue-600 font-semibold text-sm">
          Price:{' '}
          {price
            ? `$${Number(price).toLocaleString()}`
            : 'Input data to display'}
        </p>
      </div>
    </>
  );
};

export default PreviewSection;
