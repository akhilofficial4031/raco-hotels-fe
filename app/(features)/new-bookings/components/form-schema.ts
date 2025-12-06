import * as z from "zod";

export const personalDataSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  alternatePhone: z.string().optional(),
  dateOfBirth: z.any().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  dietaryPreferences: z.string().optional(),
  specialRequests: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  loyaltyNumber: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
  notes: z.string().optional(),
});

export const addonSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  priceCents: z.number(),
  currencyCode: z.string(),
});

export const bookingSchema = personalDataSchema.extend({
  addons: z.array(z.number()),
  promoCode: z.string().optional(),
  totalAmount: z.number(),
  taxAmount: z.number().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
