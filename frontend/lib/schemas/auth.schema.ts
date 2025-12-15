import { z } from "../zod-setup";

/**
 * Signup / Login Request
 */
export const AuthCredentialsSchema = z.object({
  email: z
    .string()
    .email()
    .openapi({
      example: "user@example.com",
      description: "User email address",
    }),

  password: z
    .string()
    .min(6)
    .openapi({
      example: "strongPassword123",
      description: "User password (min 6 characters)",
    }),
});

/**
 * Auth Response
 */
export const AuthUserSchema = z.object({
  id: z.string().uuid().openapi({ example: "uuid" }),
  email: z.string().email().openapi({ example: "user@example.com" }),
});

/**
 * Generic success message
 */
export const AuthMessageSchema = z.object({
  message: z.string().openapi({ example: "Success" }),
});
