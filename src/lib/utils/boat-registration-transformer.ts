/**
 * Boat Registration Form Data Transformer
 *
 * Utilities to transform form data into API-ready format
 */

import type {
  BoatClass,
  BoatDimensions,
  BoatInfo,
  BoatRegistrationFormValues,
  BoatRegistrationRequest,
  Condition,
  EngineInfo,
  ExtraDetail,
  FuelType,
  Material,
  PropellerType,
  SellerInfo,
} from '@/types/boat-registration-types';

/**
 * Parse dimensions from separate feet/inches fields
 */
function parseDimensions(formData: BoatRegistrationFormValues): BoatDimensions {
  return {
    lengthFeet: parseInt(formData.lengthFeet) || 0,
    lengthInches: parseInt(formData.lengthInches) || 0,
    beamFeet: parseInt(formData.beamFeet) || 0,
    beamInches: parseInt(formData.beamInches) || 0,
    draftFeet: parseInt(formData.draftFeet) || 0,
    draftInches: parseInt(formData.draftInches) || 0,
  };
}

/**
 * Parse engine information from form
 * Note: Currently stores one engine configuration. In the future, this could be expanded
 * to support multiple distinct engines if the form collects data for each engine separately.
 */
function parseEngines(formData: BoatRegistrationFormValues): EngineInfo[] {
  // Create a single engine entry with the provided specifications
  // The number of engines is tracked separately in enginesNumber field
  const engine: EngineInfo = {
    hours: parseInt(formData.hours) || 0,
    horsepower: parseInt(formData.totalPower) || 0,
    make: formData.make2,
    model: formData.model2,
    fuelType: (formData.engineFuelType || formData.fuelType) as FuelType,
    propellerType: formData.propellerType as PropellerType,
  };

  return [engine];
}

/**
 * Parse extra details from moreDetails array
 */
function parseExtraDetails(
  moreDetails?: Array<{ title: string; description: string }>,
): ExtraDetail[] {
  if (!moreDetails || moreDetails.length === 0) return [];

  return moreDetails
    .filter((detail) => detail.title && detail.description)
    .map((detail) => ({
      key: detail.title,
      value: detail.description,
    }));
}

/**
 * Transform form data to BoatInfo structure
 */
export function transformToBoatInfo(
  formData: BoatRegistrationFormValues,
): BoatInfo {
  return {
    buildYear: parseInt(formData.buildYear),
    make: formData.make,
    model: formData.model,
    name: formData.name,
    boatDimensions: parseDimensions(formData),
    boatClass: formData.class as BoatClass,
    material: formData.material as Material,
    condition: formData.condition as Condition,
    cabinsNumber: parseInt(formData.numCabins),
    headsNumber: parseInt(formData.numHeads),
    enginesNumber: parseInt(formData.numEngines),
    engines: parseEngines(formData),
    fuelType: formData.fuelType as FuelType,
    price: parseFloat(formData.price),
    city: formData.city,
    state: formData.state,
    zip: formData.zip,
    description: formData.description,
    extraDetails: parseExtraDetails(formData.moreDetails),
  };
}

/**
 * Transform form data to SellerInfo structure
 */
export function transformToSellerInfo(
  formData: BoatRegistrationFormValues,
): SellerInfo {
  return {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: formData.contactNumber,
    username: formData.username,
    password: formData.password,
    country: formData.country,
    city: formData.city,
    state: formData.state,
    zip: formData.zip,
  };
}

/**
 * Transform complete form data to API request structure
 */
export function transformToBoatRegistrationRequest(
  formData: BoatRegistrationFormValues,
): BoatRegistrationRequest {
  return {
    planId: formData.selectedPackage,
    boatInfo: transformToBoatInfo(formData),
    sellerInfo: transformToSellerInfo(formData),
  };
}

/**
 * Create FormData for multipart/form-data submission
 */
export function createBoatRegistrationFormData(
  formData: BoatRegistrationFormValues,
): FormData {
  const apiData = transformToBoatRegistrationRequest(formData);
  const formDataToSend = new FormData();

  // Add planId
  formDataToSend.append('planId', apiData.planId);

  // Add boatInfo as JSON string
  formDataToSend.append('boatInfo', JSON.stringify(apiData.boatInfo));

  // Add sellerInfo as JSON string
  formDataToSend.append('sellerInfo', JSON.stringify(apiData.sellerInfo));

  // Add cover photo
  if (formData.coverPhoto) {
    formDataToSend.append('covers', formData.coverPhoto);
  }

  // Add gallery images
  if (formData.mediaGallery && formData.mediaGallery.length > 0) {
    formData.mediaGallery.forEach((file) => {
      formDataToSend.append(`galleries`, file);
    });
  }

  return formDataToSend;
}

/**
 * Log form data in a readable format for debugging
 */
export function logBoatRegistrationData(
  formData: BoatRegistrationFormValues,
): void {
  const apiData = transformToBoatRegistrationRequest(formData);

  console.log('=== BOAT REGISTRATION DATA ===');
  console.log('\n📦 Plan ID:', apiData.planId);

  console.log('\n🚤 Boat Info:', {
    ...apiData.boatInfo,
    price: `$${apiData.boatInfo.price.toLocaleString()}`,
  });

  console.log('\n👤 Seller Info:', apiData.sellerInfo);

  console.log('\n📸 Media Files:');
  console.log('  - Cover Photo:', formData.coverPhoto?.name || 'None');
  console.log(
    '  - Gallery Images:',
    formData.mediaGallery?.length || 0,
    'files',
  );
  if (formData.mediaGallery && formData.mediaGallery.length > 0) {
    formData.mediaGallery.forEach((file, index) => {
      console.log(
        `    ${index + 1}. ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
      );
    });
  }

  console.log('\n=== END OF DATA ===\n');
}
