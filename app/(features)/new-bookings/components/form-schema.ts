import * as z from "zod";

export const personalDataSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number")
    .refine((val) => {
      const digitCount = val.replace(/[^\d]/g, "").length;
      return digitCount <= 12;
    }, "Please enter a valid phone number"),
  alternatePhone: z.string().optional(),
  nationality: z.string().optional(),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number")
    .optional()
    .refine((val) => {
      const digitCount = val?.replace(/[^\d]/g, "").length ?? 0;
      return digitCount <= 12;
    }, "Please enter a valid phone number"),
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
  discountAmount: z.number().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
