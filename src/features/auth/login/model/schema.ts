import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const LOGIN_GENERIC_ERROR = 'Invalid email or password. Please try again.';
