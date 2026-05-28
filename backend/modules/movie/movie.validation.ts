import { z } from "zod";

export const MovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is Required"),
  duration: z.string().min(1, "Duration is required"),
  genre: z.array(z.string()).nonempty("Atleasr one genre is required"),
  releaseDate: z.string().transform((val) => new Date(val)),
  language: z.array(z.string()).nonempty("Atleast one Language is required"),
  certification: z.string(),
  posterUrl: z.string().url("Poster must be a valid URL"),
  rating: z.number().min(0).max(10),
  votes: z.number().min(0),
  format: z.array(z.string()).default(["2D"]),
});

export type MovieInput = z.infer<typeof MovieSchema>;
