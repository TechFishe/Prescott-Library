import { defineCollection } from "astro:content";
import { calanderSchema } from "./_schemas";

const calendarCollection = defineCollection({
  type: "data",
  schema: calanderSchema
});

export const collections = {
  calendars: calendarCollection
};
