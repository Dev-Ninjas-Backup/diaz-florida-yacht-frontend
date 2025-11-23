/**
 * Boat Registration Validation Schemas
 *
 * Zod schemas for validating boat registration form data
 */

import { z } from 'zod';

// Step 1: Package Selection Schema
export const step1Schema = z.object({
  selectedPackage: z.string().min(1, 'Please select a package'),
});

// Step 2: Boat Information Schema
export const step2Schema = z.object({
  // Basic Info
  buildYear: z.string().min(1, 'Build year is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  name: z.string().min(1, 'Boat name is required'),

  // Dimensions
  lengthFeet: z.string().min(1, 'Length (feet) is required'),
  lengthInches: z.string().min(1, 'Length (inches) is required'),
  beamFeet: z.string().min(1, 'Beam (feet) is required'),
  beamInches: z.string().min(1, 'Beam (inches) is required'),
  draftFeet: z.string().min(1, 'Draft (feet) is required'),
  draftInches: z.string().min(1, 'Draft (inches) is required'),

  // Classification
  class: z.string().min(1, 'Boat class is required'),
  material: z.string().min(1, 'Material is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  condition: z.string().min(1, 'Condition is required'),

  // Capacity
  numEngines: z.string().min(1, 'Number of engines is required'),
  numCabins: z.string().min(1, 'Number of cabins is required'),
  numHeads: z.string().min(1, 'Number of heads is required'),

  // Engine Details
  hours: z.string().min(1, 'Engine hours is required'),
  make2: z.string().min(1, 'Engine make is required'),
  model2: z.string().min(1, 'Engine model is required'),
  totalPower: z.string().min(1, 'Total power (HP) is required'),
  propellerType: z.string().min(1, 'Propeller type is required'),
  engineFuelType: z.string().min(1, 'Engine fuel type is required'),

  // Pricing & Location
  price: z.string().min(1, 'Price is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip code is required'),

  // Description
  description: z.string().min(10, 'Description must be at least 10 characters'),

  // Optional fields
  moreDetails: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  embedUrl: z.string().url().optional().or(z.literal('')),

  // Media
  coverPhoto: z.instanceof(File).optional(),
  mediaGallery: z.array(z.instanceof(File)).optional(),
});

// Step 3: Seller Information Schema
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

// Combined schema for the entire form
export const completeBoatRegistrationSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

// Type exports
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type CompleteBoatRegistrationFormData = z.infer<
  typeof completeBoatRegistrationSchema
>;
