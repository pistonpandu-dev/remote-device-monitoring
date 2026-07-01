import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const deviceSchema = z.object({
  deviceName: z.string().min(1, 'Device name is required'),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  androidVersion: z.string().optional(),
  cpu: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  networkType: z.string().optional(),
});

export const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const inviteSchema = z.object({
  email: emailSchema,
});

export const settingsSchema = z.object({
  theme: z.enum(['light', 'dark']),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sound: z.boolean(),
  }),
  apiConfiguration: z.object({
    endpoint: z.string().url('Invalid API endpoint'),
    timeout: z.number().min(1, 'Timeout must be at least 1 second'),
  }),
});
