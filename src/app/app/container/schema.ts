import { z } from "zod";

export const updateSetPointSchema = z.object({
  setPointValue: z.number().min(0, "Value must be 0 or greater"),
});

export type SetPointFormData = z.infer<typeof updateSetPointSchema>;
