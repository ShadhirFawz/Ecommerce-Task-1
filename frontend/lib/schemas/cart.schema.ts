import { z } from "../zod-setup";

export const CartItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  price: z.number(),
  image_url: z.string().url().optional(),
  quantity: z.number().int().min(1),
}).openapi("CartItem");

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  total: z.number(),
}).openapi("Cart");