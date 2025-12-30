export interface BoatOwner {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface BoatEngine {
  id: string;
  make: string | null;
  model: string | null;
  fuelType: string | null;
  horsepower: number | null;
  hours: number | null;
  propellerType: string | null;
}

export interface BoatImage {
  id: string;
  fileId: string;
  url: string | null;
  mimeType: string | null;
  imageType: string;
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

export interface BoatDetail {
  id: string;
  listingId: string;
  userId: string;
  owner: BoatOwner | null;
  name: string;
  price: number;
  description: string | null;
  buildYear: number;
  make: string;
  model: string;
  fuelType: string;
  class: string;
  material: string;
  condition: string;
  engineType: string | null;
  propType: string | null;
  propMaterial: string | null;
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
  extraDetails: Record<string, unknown>;
  status: string;
  videoURL: string | null;
  engines: BoatEngine[];
  coverImages: BoatImage[];
  galleryImages: BoatImage[];
  createdAt: string;
  updatedAt: string;
}
