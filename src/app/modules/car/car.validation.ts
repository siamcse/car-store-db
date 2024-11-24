import { z } from 'zod';

export const carSchema = z.object({
  brand: z.string().trim().min(1, { message: 'Brand is required.' }),
  model: z.string().trim().min(1, { message: 'Model is required.' }),
  year: z
    .number()
    .int()
    .min(1886, { message: 'Year must be 1886 or later.' })
    .max(new Date().getFullYear(), {
      message: 'Year cannot exceed the current year.',
    }),
  price: z.number().min(0, { message: 'Price must be a positive number.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  description: z.string().trim(),
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Quantity must be a non-negative number.' }),
  inStock: z.boolean({ required_error: 'Stock status is required.' }),
  createdAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date string.',
    })
    .transform((val) => new Date(val)),
  updatedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date string.',
    })
    .transform((val) => new Date(val)),
  isDeleted: z.boolean().default(false),
});
