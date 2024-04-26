import { z } from "astro:content";

export const calanderSchema = z.array(
  z.object({
    name: z.string(),
    days: z.array(
      z.object({
        day: z.string(),
        light: z.boolean(),
        date: z.number(),
        event: z.boolean(),
        name: z.string().optional(),
        time: z.string().optional(),
        place: z.string().optional()
      })
    )
  })
);
