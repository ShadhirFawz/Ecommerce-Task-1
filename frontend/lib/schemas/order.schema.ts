import { z } from "../zod-setup";

export const OrderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1),
  price: z.number(),
}).openapi("OrderItem");

export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema),
}).openapi("CreateOrder");

export const OrderSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  total: z.number(),
  created_at: z.string(),
}).openapi("Order");
