import { z } from "../zod-setup";

export const ProductSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      description: "Unique product identifier",
      example: "550e8400-e29b-41d4-a716-446655440000",
    }),

  title: z
    .string()
    .min(1)
    .openapi({
      description: "Product title",
      example: "Wireless Headphones",
    }),

  price: z
    .number()
    .positive()
    .openapi({
      description: "Product price",
      example: 99.99,
    }),

  image_url: z
    .string()
    .url()
    .openapi({
      description: "Product image URL",
      example: "https://example.com/product.jpg",
    }),

  description: z
    .string()
    .optional()
    .openapi({
      description: "Product description",
      example: "High quality wireless headphones",
    }),

  created_at: z
    .string()
    .datetime()
    .optional()
    .openapi({
      description: "Product creation timestamp",
      example: "2024-01-01T10:00:00Z",
    }),
});

export type Product = z.infer<typeof ProductSchema>;
