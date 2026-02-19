'use client';
import { FieldLimitations } from '@/types/subscription-types';
import { FormInput } from '../FormFields/FormInput';
import { CoverPhotoUpload } from '../MediaUpload/CoverPhotoUpload';
import { GalleryUpload } from '../MediaUpload/GalleryUpload';

interface MediaGallerySectionProps {
  fieldLimitations: FieldLimitations;
}

export function MediaGallerySection({
  fieldLimitations,
}: MediaGallerySectionProps) {
  const picLimit = fieldLimitations.picLimit || 0;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">Media & Gallery</h3>
      {picLimit > 0 ? (
        <p className="text-sm text-gray-600 mb-4">
          Your package allows {picLimit} gallery images + 1 cover photo.
        </p>
      ) : (
        <p className="text-sm text-yellow-600 mb-4">
          Please select a package first to see image upload limits.
        </p>
      )}

      <div className="mb-6">
        <FormInput
          name="embedUrl"
          label="Enter Embed URL (YouTube or Vimeo)"
          placeholder="https://youtube.com/embed/..."
        />
      </div>

      <div className="mb-6">
        <CoverPhotoUpload
          name="coverPhoto"
          label="Upload Cover Photo"
          required
          disabled={picLimit === 0}
        />
      </div>

      <div>
        <GalleryUpload
          name="mediaGallery"
          label="Upload Media Gallery"
          maxFiles={picLimit}
          disabled={picLimit === 0}
        />
      </div>
    </div>
  );
}
