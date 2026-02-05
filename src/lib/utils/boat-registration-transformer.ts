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

function parseEngines(formData: BoatRegistrationFormValues): EngineInfo[] {
  if (formData.engines && formData.engines.length > 0) {
    return formData.engines.map((engine) => ({
      hours: parseInt(engine.hours) || 0,
      horsepower: parseInt(engine.totalPower) || 0,
      make: engine.make,
      model: engine.model,
      fuelType: engine.engineFuelType as FuelType,
      propellerType: engine.propellerType as PropellerType,
    }));
  }

  if (formData.hours || formData.make2 || formData.model2) {
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

  return [];
}

function parseExtraDetails(
  moreDetails?: Array<{ title: string; description: string }>,
): ExtraDetail[] {
  if (!moreDetails || moreDetails.length === 0) return [];

  return moreDetails
    .filter((detail) => detail.title && detail.description)
    ?.map((detail) => ({
      key: detail.title,
      value: detail.description,
    }));
}

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
    propMaterial: formData.propMaterial,
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
    videoURL: formData.embedUrl || '',
    extraDetails: parseExtraDetails(formData.moreDetails),
  };
}

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

export function transformToBoatRegistrationRequest(
  formData: BoatRegistrationFormValues,
): BoatRegistrationRequest {
  return {
    planId: formData.selectedPackage,
    boatInfo: transformToBoatInfo(formData),
    sellerInfo: transformToSellerInfo(formData),
  };
}

export function createBoatRegistrationFormData(
  formData: BoatRegistrationFormValues,
): FormData {
  const apiData = transformToBoatRegistrationRequest(formData);
  const formDataToSend = new FormData();

  formDataToSend.append('planId', apiData.planId);

  if (formData.promoCode && formData.promoCode.trim() !== '') {
    formDataToSend.append('promoCode', formData.promoCode.trim());
  }

  formDataToSend.append('boatInfo', JSON.stringify(apiData.boatInfo));

  formDataToSend.append('sellerInfo', JSON.stringify(apiData.sellerInfo));

  if (formData.coverPhoto) {
    formDataToSend.append('covers', formData.coverPhoto);
  }

  if (formData.mediaGallery && formData.mediaGallery.length > 0) {
    formData.mediaGallery.forEach((file) => {
      formDataToSend.append(`galleries`, file);
    });
  }

  return formDataToSend;
}

export function logBoatRegistrationData(
  formData: BoatRegistrationFormValues,
): void {
  const apiData = transformToBoatRegistrationRequest(formData);

  console.log('=== BOAT REGISTRATION DATA ===');
  console.log('\n📦 Plan ID:', apiData.planId);

  if (formData.promoCode) {
    console.log('🎟️  Promo Code:', formData.promoCode);
  }

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
