






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


export interface BoatDimensions {
  lengthFeet: number;
  lengthInches: number;
  beamFeet: number;
  beamInches: number;
  draftFeet: number;
  draftInches: number;
}


export interface EngineInfo {
  hours: number;
  horsepower: number;
  make: string;
  model: string;
  fuelType: FuelType;
  propellerType: PropellerType;
}


export interface ExtraDetail {
  key: string;
  value: string;
}


export interface BoatInfo {
  
  buildYear: number;
  make: string;
  model: string;
  name: string;

  
  boatDimensions: BoatDimensions;

  
  boatClass: BoatClass;
  material: Material;
  propMaterial: string;
  condition: Condition;

  
  cabinsNumber: number;
  headsNumber: number;
  enginesNumber: number;

  
  engines: EngineInfo[];
  fuelType: FuelType;

  
  price: number;
  city: string;
  state: string;
  zip: string;

  
  description: string;
  videoURL?: string;
  extraDetails?: ExtraDetail[];
}


export interface SellerInfo {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;

  
  country: string;
  city: string;
  state: string;
  zip: string;
}


export interface BoatRegistrationRequest {
  planId: string;
  boatInfo: BoatInfo;
  sellerInfo: SellerInfo;
}


export interface BoatRegistrationFormData extends BoatRegistrationRequest {
  covers: File; 
  galleries: File[]; 
}


export interface BoatRegistrationFormValues {
  
  selectedPackage: string;
  promoCode?: string;

  
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
  propMaterial: string;
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

  
  hours: string;
  make2: string;
  model2: string;
  totalPower: string;
  propellerType: string;
  engineFuelType: string;

  
  engines: Array<{
    hours: string;
    make: string;
    model: string;
    totalPower: string;
    propellerType: string;
    engineFuelType: string;
  }>;

  
  moreDetails?: Array<{ title: string; description: string }>;
  embedUrl?: string;

  
  coverPhoto?: File;
  mediaGallery?: File[];

  
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  country: string;
  username: string;
  password: string;
  confirmPassword: string;
}
