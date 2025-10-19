import z from "zod";

export const step1Schema = z.object({
  selectedPackage: z.string().min(1, "Please select a package"),
})

export const step2Schema = z.object({
  buildYear: z.string().min(1, "Build year is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  length: z.string().min(1, "Length is required"),
  beam: z.string().min(1, "Beam is required"),
  maxDraft: z.string().min(1, "Max draft is required"),
  class: z.string().min(1, "Class is required"),
  material: z.string().min(1, "Material is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  numEngines: z.string().min(1, "Number of engines is required"),
  numCabins: z.string().min(1, "Number of cabins is required"),
  numHeads: z.string().min(1, "Number of heads is required"),
  hours: z.string().min(1, "Hours is required"),
  make2: z.string().min(1, "Make is required"),
  model2: z.string().min(1, "Model is required"),
  totalPower: z.string().min(1, "Total power is required"),
  propellerType: z.string().min(1, "Propeller type is required"),
  condition: z.string().min(1, "Condition is required"),
  price: z.string().min(1, "Price is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  moreDetails: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  embedUrl: z.string().optional(),
  coverPhoto: z.string().optional(),
  mediaGallery: z.array(z.string()).optional(),
})

export const step3Schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip code is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const paymentSchema = z.object({
  cardholderName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().min(1, "Card number is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  cvc: z.string().min(1, "CVC is required"),
})


export type Step1FormData = z.infer<typeof step1Schema>
export type Step2FormData = z.infer<typeof step2Schema>
export type Step3FormData = z.infer<typeof step3Schema>
export type PaymentFormData = z.infer<typeof paymentSchema>