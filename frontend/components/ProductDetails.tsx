"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  description?: string;
}

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="mt-20 container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Product Image */}
        <div>
          <img
            src={product.image_url || "https://via.placeholder.com/500"}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-md shadow-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            {product.description || "No description available."}
          </p>

          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ${product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 cursor-pointer rounded-lg shadow-md text-lg transition"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
