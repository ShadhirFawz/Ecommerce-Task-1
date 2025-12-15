import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { ProductSchema } from "./schemas/product.schema";

const registry = new OpenAPIRegistry();

/**
 * -----------------------
 * Register Schemas
 * -----------------------
 */
registry.register("Product", ProductSchema);

/**
 * -----------------------
 * Register API Paths
 * -----------------------
 */
registry.registerPath({
  method: "get",
  path: "/products",
  description: "Get all products",
  responses: {
    200: {
      description: "List of products",
      content: {
        "application/json": {
          schema: ProductSchema.array(),
        },
      },
    },
  },
});

/**
 * -----------------------
 * Generate OpenAPI Spec
 * -----------------------
 */
export function getApiDocs() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "API documentation for Ecommerce application",
    },
  });
}
