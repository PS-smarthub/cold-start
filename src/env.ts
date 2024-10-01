import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string(),
  AUTH_MICROSOFT_ENTRA_ID_ID: z.string(),
  AUTH_MICROSOFT_ENTRA_ID_SECRET: z.string(),
  AUTH_MICROSOFT_ENTRA_ID_TENANT_ID: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
