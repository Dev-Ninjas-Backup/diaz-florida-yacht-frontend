/**
 * Boat Registration Types
 *
 * Type definitions for boat registration API requests and responses
 */

// Enums for boat properties - Aligned with backend
export enum BoatClass {
  SAILBOAT = 'SAILBOAT',
  MOTORBOAT = 'MOTORBOAT',
  YACHT = 'YACHT',
  FISHING = 'FISHING',
  PONTOON = 'PONTOON',
  SPEEDBOAT = 'SPEEDBOAT',
  CATAMARAN = 'CATAMARAN',
  OTHER = 'OTHER',
}

export enum Material {
  FIBERGLASS = 'FIBERGLASS',
  ALUMINUM = 'ALUMINUM',
  WOOD = 'WOOD',
  STEEL = 'STEEL',
  CARBON_FIBER = 'CARBON_FIBER',
  PLASTIC = 'PLASTIC',
  OTHER = 'OTHER',
}

export enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  OTHER = 'OTHER',
}

export enum PropellerType {
  FIXED = 'FIXED',
  FOLDING = 'FOLDING',
  FEATHERING = 'FEATHERING',
  SURFACE_PIERCING = 'SURFACE_PIERCING',
  CONTROLLABLE_PITCH = 'CONTROLLABLE_PITCH',
  OTHER = 'OTHER',
}

export enum Condition {
  NEW = 'NEW',
  USED = 'USED',
  REFURBISHED = 'REFURBISHED',
  DAMAGED = 'DAMAGED',
}

// Boat dimensions structure
export interface BoatDimensions {
  lengthFeet: number;
  lengthInches: number;
  beamFeet: number;
  beamInches: number;
  draftFeet: number;
  draftInches: number;
}

// Engine information
export interface EngineInfo {
  hours: number;
  horsepower: number;
  make: string;
  model: string;
  fuelType: FuelType;
  propellerType: PropellerType;
}

// Extra details key-value pairs
export interface ExtraDetail {
  key: string;
  value: string;
}

// Boat information structure (Step 2 data)
export interface BoatInfo {
  // Basic specifications
  buildYear: number;
  make: string;
  model: string;
  name: string;

  // Dimensions
  boatDimensions: BoatDimensions;

  // Classification
  boatClass: BoatClass;
  material: Material;
  condition: Condition;

  // Capacity
  cabinsNumber: number;
  headsNumber: number;
  enginesNumber: number;

  // Engines
  engines: EngineInfo[];
  fuelType: FuelType;

  // Pricing and location
  price: number;
  city: string;
  state: string;
  zip: string;

  // Description
  description: string;
  extraDetails?: ExtraDetail[];
}

// Seller information structure (Step 3 data)
export interface SellerInfo {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;

  // Location
  country: string;
  city: string;
  state: string;
  zip: string;
}

// Complete boat registration request
export interface BoatRegistrationRequest {
  planId: string;
  boatInfo: BoatInfo;
  sellerInfo: SellerInfo;
}

// Form data structure (what we'll send as FormData)
export interface BoatRegistrationFormData extends BoatRegistrationRequest {
  covers: File; // Cover photo
  galleries: File[]; // Gallery images (multiple)
}

// Form field values (internal form state)
export interface BoatRegistrationFormValues {
  // Step 1
  selectedPackage: string;

  // Step 2 - Boat Info
  buildYear: string;
  make: string;
  model: string;
  name: string;
  lengthFeet: string;
  lengthInches: string;
  beamFeet: string;
  beamInches: string;
  draftFeet: string;
  draftInches: string;
  class: string;
  material: string;
  fuelType: string;
  numEngines: string;
  numCabins: string;
  numHeads: string;
  condition: string;
  price: string;
  city: string;
  state: string;
  zip: string;
  description: string;

  // Engine details
  hours: string;
  make2: string;
  model2: string;
  totalPower: string;
  propellerType: string;
  engineFuelType: string;

  // Optional details
  moreDetails?: Array<{ title: string; description: string }>;
  embedUrl?: string;

  // Media
  coverPhoto?: File;
  mediaGallery?: File[];

  // Step 3 - Seller Info
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  country: string;
  username: string;
  password: string;
  confirmPassword: string;
}
