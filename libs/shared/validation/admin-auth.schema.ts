import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  twoFactorCode: z.string().trim().optional(),
});

export type AdminLoginForm = z.infer<typeof adminLoginSchema>;
