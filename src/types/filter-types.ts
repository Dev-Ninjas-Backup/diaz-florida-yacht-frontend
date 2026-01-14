export interface FilterState {
  boatType: string;
  make: string;
  model: string;
  buildYearFrom: string;
  buildYearTo: string;
  priceMin: number | string;
  priceMax: number | string;
  lengthFrom: string;
  lengthTo: string;
  beamFrom: string;
  beamTo: string;
  numberOfEngines: string;
  numberOfCabins: string;
  numberOfHeads: string;
  additionalUnit: string;
}

export interface FilterOptions {
  boatTypes: string[];
  makes: string[];
  models: string[];
  engines: string[];
  cabins: string[];
  heads: string[];
  additionalUnits: string[];
}
