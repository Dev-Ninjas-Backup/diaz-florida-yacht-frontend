import React from 'react';

interface SellerPreviewSectionProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  buildYear?: string;
  make?: string;
  model?: string;
  price?: string;
  city?: string;
  state?: string;
}

const SellerPreviewSection: React.FC<SellerPreviewSectionProps> = ({
  firstName,
  lastName,
  email,
  contactNumber,
  buildYear,
  make,
  model,
  price,
  city,
  state,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-sm mb-3">Seller Information</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">
              {firstName || lastName
                ? `${firstName || ''} ${lastName || ''}`.trim()
                : 'Input data to display'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">
              {email || (
                <em className="text-gray-400">Input data to display</em>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">
              {contactNumber || (
                <em className="text-gray-400">Input data to display</em>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Boat Summary on Step 3 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-sm mb-3">Boat Summary</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Boat:</span>
            <span className="font-medium">
              {buildYear || make || model
                ? `${buildYear || ''} ${make || ''} ${model || ''}`.trim()
                : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-blue-600">
              {price ? `$${Number(price).toLocaleString()}` : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">
              {city && state ? `${city}, ${state}` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPreviewSection;
