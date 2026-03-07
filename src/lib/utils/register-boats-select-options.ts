export const steps = [
  { id: 1, label: 'Seller Information', key: 'sellerInfo' },
  { id: 2, label: 'Select Package', key: 'selectPackage' },
  { id: 3, label: 'Boat Information', key: 'boatInfo' },
  { id: 4, label: 'Pay & Post', key: 'payPost' },
];

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
];

export const buildYearOptions = [
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
  { value: '2013', label: '2013' },
  { value: '2012', label: '2012' },
  { value: '2011', label: '2011' },
  { value: '2010', label: '2010' },
  { value: '2009', label: '2009' },
  { value: '2008', label: '2008' },
  { value: '2007', label: '2007' },
  { value: '2006', label: '2006' },
  { value: '2005', label: '2005' },
  { value: '2004', label: '2004' },
  { value: '2003', label: '2003' },
  { value: '2002', label: '2002' },
  { value: '2001', label: '2001' },
  { value: '2000', label: '2000' },
  { value: '1999', label: '1999' },
  { value: '1998', label: '1998' },
  { value: '1997', label: '1997' },
  { value: '1996', label: '1996' },
  { value: '1995', label: '1995' },
  { value: '1990', label: '1990' },
  { value: '1985', label: '1985' },
  { value: '1980', label: '1980' },
];

export const makeOptions = [
  { value: 'azimut', label: 'Azimut' },
  { value: 'sunseeker', label: 'Sunseeker' },
  { value: 'ferretti', label: 'Ferretti' },
  { value: 'princess', label: 'Princess' },
  { value: 'benetti', label: 'Benetti' },
  { value: 'sanlorenzo', label: 'Sanlorenzo' },
  { value: 'sea-ray', label: 'Sea Ray' },
  { value: 'prestige', label: 'Prestige' },
  { value: 'jeanneau', label: 'Jeanneau' },
  { value: 'beneteau', label: 'Beneteau' },
  { value: 'lagoon', label: 'Lagoon' },
  { value: 'hatteras', label: 'Hatteras' },
  { value: 'viking', label: 'Viking' },
  { value: 'nautor-swan', label: 'Nautor Swan' },
  { value: 'broward', label: 'Broward' },
  { value: 'marquis', label: 'Marquis' },
  { value: 'cabo', label: 'Cabo' },
  { value: 'fairline', label: 'Fairline' },
  { value: 'pershing', label: 'Pershing' },
  { value: 'other', label: 'Other / Custom' },
];

export const modelOptions = [
  { value: 'azimut-55-fly', label: '55 Fly', make: 'azimut' },
  { value: 'azimut-62s', label: '62S', make: 'azimut' },
  { value: 'azimut-72', label: '72', make: 'azimut' },

  { value: 'sunseeker-manhattan-68', label: 'Manhattan 68', make: 'sunseeker' },
  { value: 'sunseeker-predator-74', label: 'Predator 74', make: 'sunseeker' },
  { value: 'sunseeker-75', label: '75', make: 'sunseeker' },
  { value: 'sunseeker-superhawk', label: 'Superhawk', make: 'sunseeker' },
  { value: 'sunseeker-131', label: '131', make: 'sunseeker' },

  { value: 'ferretti-550', label: '550', make: 'ferretti' },
  { value: 'ferretti-780', label: '780', make: 'ferretti' },

  { value: 'princess-v65', label: 'V65', make: 'princess' },
  { value: 'princess-s60', label: 'S60', make: 'princess' },

  { value: 'benetti-classic-121', label: 'Classic 121', make: 'benetti' },
  { value: 'benetti-88', label: '88', make: 'benetti' },

  { value: 'sanlorenzo-sl78', label: 'SL78', make: 'sanlorenzo' },
  { value: 'sanlorenzo-88', label: '88', make: 'sanlorenzo' },
  { value: 'sanlorenzo-460', label: '460', make: 'sanlorenzo' },

  { value: 'sea-ray-l650', label: 'L650', make: 'sea-ray' },
  { value: 'prestige-750', label: '750', make: 'prestige' },

  { value: 'jeanneau-sun-odyssey', label: 'Sun Odyssey', make: 'jeanneau' },
  { value: 'beneteau-swift-trawler', label: 'Swift Trawler', make: 'beneteau' },

  { value: 'lagoon-620', label: '620', make: 'lagoon' },

  { value: 'hatteras-gt59', label: 'GT59', make: 'hatteras' },
  { value: 'viking-66', label: '66', make: 'viking' },

  { value: 'nautor-swan-48', label: '48', make: 'nautor-swan' },
  { value: 'broward-80', label: '80', make: 'broward' },
  { value: 'marquis-720', label: '720', make: 'marquis' },
  { value: 'cabo-45', label: '45', make: 'cabo' },

  { value: 'fairline-targa', label: 'Targa', make: 'fairline' },
  { value: 'pershing-70', label: '70', make: 'pershing' },

  { value: 'other', label: 'Other / Custom', make: 'other' },
];

export const getModelsByMake = (make: string) =>
  modelOptions.filter((m) => m.make === make);

import { US_CITIES_BY_STATE, US_STATES } from '@/lib/data/us-states-cities';

export { US_STATES };

export const countryOptions = [{ value: 'usa', label: 'United States' }];

export const stateOptions = US_STATES?.map((s) => ({
  value: s.code,
  label: s.name,
}));

export function getCitiesForState(stateIdentifier: string): { name: string }[] {
  if (!stateIdentifier) return [];

  let cities = US_CITIES_BY_STATE[stateIdentifier.toUpperCase()];

  if (!cities) {
    const state = US_STATES.find(
      (s) => s.name.toLowerCase() === stateIdentifier.toLowerCase(),
    );
    if (state) {
      cities = US_CITIES_BY_STATE[state.code];
    }
  }

  return cities || [];
}
