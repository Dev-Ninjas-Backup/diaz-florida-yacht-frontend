export interface Owner {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Engine {
  id: string;
  hours: number;
  horsepower: number;
  make: string;
  model: string;
  fuelType: string;
  propellerType: string;
  boatId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoatImage {
  id: string;
  fileId: string;
  url: string;
  mimeType: string;
  imageType: 'COVER' | 'GALLERY';
  createdAt: string;
  updatedAt: string;
}

export interface BoatDimensions {
  lengthFeet: number;
  lengthInches: number;
  beamFeet: number;
  beamInches: number;
  draftFeet: number;
  draftInches: number;
}

export interface ExtraDetail {
  key: string;
  value: string;
}

export interface IListing {
  id: string;
  listingId: string;
  userId: string;
  owner: Owner;
  name: string;
  price: number;
  description: string;
  buildYear: number;
  make: string;
  model: string;
  fuelType: string;
  class: string;
  material: string;
  condition: string;
  engineType: string;
  propType: string;
  propMaterial: string;
  electronics: string[];
  insideEquipment: string[];
  outsideEquipment: string[];
  electricalEquipment: string[];
  covers: string[];
  additionalEquipment: string[];
  length: number;
  beam: number;
  draft: number;
  boatDimensions: BoatDimensions;
  enginesNumber: number;
  cabinsNumber: number;
  headsNumber: number;
  city: string;
  state: string;
  zip: string;
  extraDetails: ExtraDetail[];
  status:
    | 'ACTIVE'
    | 'INACTIVE'
    | 'PENDING'
    | 'SOLD'
    | 'DRAFT'
    | 'ONBOARDING_PENDING';
  videoURL: string;
  engines: Engine[];
  coverImages: BoatImage[];
  galleryImages: BoatImage[];
  createdAt: string;
  updatedAt: string;
}

// Legacy interface for backward compatibility
export interface IListingLegacy {
  'Listing ID': string;
  image: string;
  Name: string;
  Price: string;
  'Publish Date': string;
  Status: 'Active' | 'Closed';
}
