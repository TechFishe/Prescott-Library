import { z, defineCollection } from "astro:content";

const calanderCollection = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    name: z.string(),
    days: z.array(
      z.object({
        event: z.boolean(),
        name: z.string().optional(),
        time: z.string().optional(),
        place: z.string().optional()
      })
    )
  }))
});

export const collections = {
  'calanders': calanderCollection
}