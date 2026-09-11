// zod import
import { z } from "zod";

// define schema for environment variables
const envSchema = z.object({
    VITE_API_KEY: z.string().trim().nonempty("API_KEY is required"),
    VITE_AUTH_DOMAIN: z.string().trim().nonempty("AUTH_DOMAIN is required"),
    VITE_PROJECT_ID: z.string().trim().nonempty("PROJECT_ID is required"),
    VITE_STORAGE_BUCKET: z.string().trim().nonempty("STORAGE_BUCKET is required"),
    VITE_MESSAGING_SENDER_ID: z.string().trim().nonempty("MESSAGING_SENDER_ID is required"),
    VITE_APP_ID: z.string().trim().nonempty("APP_ID is required"),
});

// env export
export const env = envSchema.parse(import.meta.env);