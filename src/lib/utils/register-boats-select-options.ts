  // Select options
  export const classOptions = [
    { value: 'cabin', label: 'Cabin' },
    { value: 'open', label: 'Open' },
  ];

  export const materialOptions = [
    { value: 'fiberglass', label: 'Fiberglass' },
    { value: 'aluminum', label: 'Aluminum' },
  ];

  export const fuelTypeOptions = [
    { value: 'gas', label: 'Gas' },
    { value: 'diesel', label: 'Diesel' },
  ];

  export const propellerTypeOptions = [
    { value: 'fixed', label: 'Fixed' },
    { value: 'variable', label: 'Variable' },
  ];

  export const conditionOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
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
  export const stateOptions = states.map((state) => ({ value: state, label: state }));