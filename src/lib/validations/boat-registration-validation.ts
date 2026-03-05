import { z } from 'zod';

export const step1Schema = z.object({
  selectedPackage: z.string().min(1, 'Please select a package'),
  promoCode: z.string().optional(),
  promoFreeDays: z.number().optional(),
});

export const step2Schema = z.object({
  buildYear: z.string().min(1, 'Build year is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  name: z.string().min(1, 'Boat name is required'),

  lengthFeet: z.string().min(1, 'Length (feet) is required'),
  lengthInches: z
    .string()
    .min(1, 'Length (inches) is required')
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 0 && num < 12;
      },
      {
        message: 'Inches must be less than 12',
      },
    ),
  beamFeet: z.string().optional(),
  beamInches: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return !isNaN(num) && num >= 0 && num < 12;
      },
      { message: 'Inches must be less than 12' },
    ),
  draftFeet: z.string().optional(),
  draftInches: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return !isNaN(num) && num >= 0 && num < 12;
      },
      { message: 'Inches must be less than 12' },
    ),

  class: z.string().min(1, 'Boat class is required'),
  material: z.string().optional(),
  fuelType: z.string().min(1, 'Fuel type is required'),
  propMaterial: z.string().min(1, 'Propeller material is required'),
  condition: z.string().min(1, 'Condition is required'),

  numEngines: z.string().min(1, 'Number of engines is required'),
  numCabins: z.string().optional(),
  numHeads: z.string().optional(),

  engines: z
    .array(
      z.object({
        hours: z.string().optional(),
        make: z.string().min(1, 'Engine make is required'),
        model: z.string().optional(),
        totalPower: z.string().optional(),
        propellerType: z.string().optional(),
        engineFuelType: z.string().optional(),
      }),
    )
    .min(1, 'At least one engine is required'),

  hours: z.string().optional(),
  make2: z.string().optional(),
  model2: z.string().optional(),
  totalPower: z.string().optional(),
  propellerType: z.string().optional(),
  engineFuelType: z.string().optional(),

  price: z.string().min(1, 'Price is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip code is required'),

  description: z.string().min(10, 'Description must be at least 10 characters'),

  moreDetails: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  embedUrl: z.string().url().optional().or(z.literal('')),

  coverPhoto: z.instanceof(File).optional(),
  mediaGallery: z.array(z.instanceof(File)).optional(),
});

export const step3Schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    contactNumber: z.string().min(1, 'Contact number is required'),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'Zip code is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const completeBoatRegistrationSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type CompleteBoatRegistrationFormData = z.infer<
  typeof completeBoatRegistrationSchema
>;
