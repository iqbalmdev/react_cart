// validationSchemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// Infer TypeScript types from the schema
export type LoginFormValues = z.infer<typeof loginSchema>;
