export const steps = [
  { id: 1, label: 'Select Package', key: 'selectPackage' },
  { id: 2, label: 'Boat Information', key: 'boatInfo' },
  { id: 3, label: 'Seller Information', key: 'sellerInfo' },
  { id: 4, label: 'Pay & Post', key: 'payPost' },
];



// Select options - Aligned with backend enums
export const classOptions = [
  { value: 'SAILBOAT', label: 'Sailboat' },
  { value: 'MOTORBOAT', label: 'Motorboat' },
  { value: 'YACHT', label: 'Yacht' },
  { value: 'FISHING', label: 'Fishing' },
  { value: 'PONTOON', label: 'Pontoon' },
  { value: 'SPEEDBOAT', label: 'Speedboat' },
  { value: 'CATAMARAN', label: 'Catamaran' },
  { value: 'OTHER', label: 'Other' },
];

export const materialOptions = [
  { value: 'FIBERGLASS', label: 'Fiberglass' },
  { value: 'ALUMINUM', label: 'Aluminum' },
  { value: 'WOOD', label: 'Wood' },
  { value: 'STEEL', label: 'Steel' },
  { value: 'CARBON_FIBER', label: 'Carbon Fiber' },
  { value: 'PLASTIC', label: 'Plastic' },
  { value: 'OTHER', label: 'Other' },
];

export const fuelTypeOptions = [
  { value: 'GASOLINE', label: 'Gasoline' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'ELECTRIC', label: 'Electric' },
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'OTHER', label: 'Other' },
];

export const propellerTypeOptions = [
  { value: 'FIXED', label: 'Fixed' },
  { value: 'FOLDING', label: 'Folding' },
  { value: 'FEATHERING', label: 'Feathering' },
  { value: 'SURFACE_PIERCING', label: 'Surface Piercing' },
  { value: 'CONTROLLABLE_PITCH', label: 'Controllable Pitch' },
  { value: 'OTHER', label: 'Other' },
];

export const conditionOptions = [
  { value: 'NEW', label: 'New' },
  { value: 'USED', label: 'Used' },
  { value: 'REFURBISHED', label: 'Refurbished' },
  { value: 'DAMAGED', label: 'Damaged' },
];

export const buildYearOptions = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
];

export const makeModelOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

const cities = [
  'Los Angeles',
  'San Francisco',
  'New York City',
  'Houston',
  'Dallas',
  'Miami',
  'Chicago',
  'Seattle',
  'Atlanta',
  'Phoenix',
];

const states = [
  'California',
  'New York',
  'Texas',
  'Florida',
  'Illinois',
  'Washington',
  'Ohio',
  'Georgia',
  'Pennsylvania',
  'Arizona',
];

// Select options
export const countryOptions = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

export const cityOptions = cities.map((city) => ({ value: city, label: city }));
export const stateOptions = states.map((state) => ({
  value: state,
  label: state,
}));
