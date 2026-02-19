export interface BoatOwner {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface BoatEngine {
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

export interface BoatDetails {
  id: string;
  listingId: string;
  userId: string;
  owner: BoatOwner;
  name: string;
  price: number;
  description: string;
  buildYear: number;
  make: string;
  model: string;
  fuelType: string;
  class: string;
  material: string;
  condition: 'NEW' | 'USED';
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
  status: 'ACTIVE' | 'INACTIVE' | 'SOLD';
  videoURL: string;
  engines: BoatEngine[];
  coverImages: BoatImage[];
  galleryImages: BoatImage[];
  createdAt: string;
  updatedAt: string;
}

export interface BoatSpecification {
  name: string;
  value: string | number | boolean | null;
}

export function transformBoatDetailsToSpecifications(
  boat: BoatDetails,
): BoatSpecification[] {
  return [
    { name: 'Listing ID', value: boat.listingId || '-' },
    { name: 'Make', value: boat.make || '-' },
    { name: 'Model', value: boat.model || '-' },
    { name: 'Year', value: boat.buildYear || '-' },
    { name: 'Class', value: boat.class || '-' },
    { name: 'Condition', value: boat.condition || '-' },
    {
      name: 'Price',
      value: boat.price
        ? `$${boat.price.toLocaleString()}`
        : 'Price on request',
    },
    {
      name: 'Length',
      value: boat.boatDimensions
        ? `${boat.boatDimensions.lengthFeet}' ${boat.boatDimensions.lengthInches}"`
        : '-',
    },
    {
      name: 'Beam',
      value: boat.boatDimensions
        ? `${boat.boatDimensions.beamFeet}' ${boat.boatDimensions.beamInches}"`
        : '-',
    },
    {
      name: 'Draft',
      value: boat.boatDimensions
        ? `${boat.boatDimensions.draftFeet}' ${boat.boatDimensions.draftInches}"`
        : '-',
    },
    { name: 'Hull Material', value: boat.material || '-' },
    { name: 'Fuel Type', value: boat.fuelType || '-' },
    { name: 'Engine Type', value: boat.engineType || '-' },
    { name: 'Number of Engines', value: boat.enginesNumber || '-' },
    { name: 'Propeller Type', value: boat.propType || '-' },
    { name: 'Propeller Material', value: boat.propMaterial || '-' },
    { name: 'Number of Cabins', value: boat.cabinsNumber || '-' },
    { name: 'Number of Heads', value: boat.headsNumber || '-' },
    {
      name: 'Location',
      value:
        boat.city && boat.state
          ? `${boat.city}, ${boat.state}${boat.zip ? ' ' + boat.zip : ''}`
          : '-',
    },
    ...(boat.engines?.length > 0
      ? boat.engines.flatMap((engine, index) => [
          { name: `Engine ${index + 1} Make`, value: engine.make || '-' },
          { name: `Engine ${index + 1} Model`, value: engine.model || '-' },
          {
            name: `Engine ${index + 1} Horsepower`,
            value: engine.horsepower || '-',
          },
          { name: `Engine ${index + 1} Hours`, value: engine.hours || '-' },
          {
            name: `Engine ${index + 1} Fuel Type`,
            value: engine.fuelType || '-',
          },
          {
            name: `Engine ${index + 1} Propeller`,
            value: engine.propellerType || '-',
          },
        ])
      : []),
    ...(boat.electronics?.length > 0
      ? [{ name: 'Electronics', value: boat.electronics.join(', ') }]
      : []),
    ...(boat.insideEquipment?.length > 0
      ? [{ name: 'Inside Equipment', value: boat.insideEquipment.join(', ') }]
      : []),
    ...(boat.outsideEquipment?.length > 0
      ? [
          {
            name: 'Outside Equipment',
            value: boat.outsideEquipment.join(', '),
          },
        ]
      : []),
    ...(boat.electricalEquipment?.length > 0
      ? [
          {
            name: 'Electrical Equipment',
            value: boat.electricalEquipment.join(', '),
          },
        ]
      : []),
    ...(boat.covers?.length > 0
      ? [{ name: 'Covers', value: boat.covers.join(', ') }]
      : []),
    ...(boat.additionalEquipment?.length > 0
      ? [
          {
            name: 'Additional Equipment',
            value: boat.additionalEquipment.join(', '),
          },
        ]
      : []),
    ...(Array.isArray(boat.extraDetails)
      ? boat.extraDetails.map((detail) => ({
          name: detail.key,
          value: detail.value,
        }))
      : boat.extraDetails && typeof boat.extraDetails === 'object'
        ? Object.entries(boat.extraDetails).map(([key, value]) => ({
            name: key,
            value: String(value),
          }))
        : []),
  ];
}

export function transformBoatImagesToUrls(boat: BoatDetails): string[] {
  const coverUrls = boat.coverImages?.map((img) => img.url) || [];
  const galleryUrls = boat.galleryImages?.map((img) => img.url) || [];
  return [...coverUrls, ...galleryUrls];
}
