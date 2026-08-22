import { z } from 'zod';

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  mode: z.string().optional(),
  tier: z.string().optional(),
  note: z.string().min(1, 'A note about your matter is required'),
  honeypot: z.string().max(0).optional(), // must stay empty
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
