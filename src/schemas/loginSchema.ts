import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z.string().regex(/^09\d{9}$/, 'phone number must start with 09 and be 11 digits long.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
