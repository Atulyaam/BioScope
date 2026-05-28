
import { z } from "zod";

export const TheaterSchema = z.object({
  name: z.string().min(1, "Name is required"),

  location: z.string().min(1, "Location is Required"),

  logo: z.string().min(1, "Logo is required"),

  city: z.string().min(1,"city is required"),

  state: z.string().min(1,"State is Required"),

 
});

export type MovieInput = z.infer<typeof TheaterSchema>;
