'use client';
import { FormInput } from '../FormFields/FormInput';
import { CoverPhotoUpload } from '../MediaUpload/CoverPhotoUpload';
import { GalleryUpload } from '../MediaUpload/GalleryUpload';

export function MediaGallerySection() {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">Media & Gallery</h3>
      <p className="text-sm text-gray-600 mb-4">
        Your package allows 25 images.
      </p>

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
        />
      </div>

      <div>
        <GalleryUpload
          name="mediaGallery"
          label="Upload Media Gallery"
          maxFiles={25}
        />
      </div>
    </div>
  );
}
