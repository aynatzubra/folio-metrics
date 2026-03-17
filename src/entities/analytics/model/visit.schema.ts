import { z } from 'zod'

export const trackVisitSchema = z.object({
  sectionId: z.string().min(1),
  duration: z.number().int().nonnegative(),
  timestamp: z.number().int().optional(),
  visitorId: z.string().min(1),
  country: z.string().optional(),
  city: z.string().optional(),
})