// import dotenv and configure
import "dotenv/config";

// zod import
import { z } from "zod";

// define schema for environment variables
const envSchema = z.object({
    API_KEY: z.string().trim().nonempty("API_KEY is required"),
    AUTH_DOMAIN: z.string().trim().nonempty("AUTH_DOMAIN is required"),
    PROJECT_ID: z.string().trim().nonempty("PROJECT_ID is required"),
    STORAGE_BUCKET: z.string().trim().nonempty("STORAGE_BUCKET is required"),
    MESSAGING_SENDER_ID: z.string().trim().nonempty("MESSAGING_SENDER_ID is required"),
    APP_ID: z.string().trim().nonempty("APP_ID is required"),
});

// env export
export const env = envSchema.parse(process.env);