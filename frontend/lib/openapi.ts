import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { ProductSchema } from "./schemas/product.schema";
import {
  AuthCredentialsSchema,
  AuthUserSchema,
  AuthMessageSchema,
} from "./schemas/auth.schema";

const registry = new OpenAPIRegistry();

/**
 * -----------------------
 * Register Schemas
 * -----------------------
 */
registry.register("Product", ProductSchema);
registry.register("AuthCredentials", AuthCredentialsSchema);
registry.register("AuthUser", AuthUserSchema);
registry.register("AuthMessage", AuthMessageSchema);

/**
 * -----------------------
 * Register API Paths
 * -----------------------
 */

/**
 * -----------------------
 * Product Endpoints
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
 * Auth Endpoints
 * -----------------------
 */
registry.registerPath({
  method: "post",
  path: "/auth/signup",
  description: "Create a new user account",
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuthCredentialsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: AuthUserSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/login",
  description: "Login user with email and password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuthCredentialsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: AuthUserSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/logout",
  description: "Logout current user",
  responses: {
    200: {
      description: "Logout successful",
      content: {
        "application/json": {
          schema: AuthMessageSchema,
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
