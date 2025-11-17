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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product); // Now this should work without TypeScript errors
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 group">
      <div className="relative overflow-hidden rounded-md mb-3">
        <img
          src={product?.image_url || "https://via.placeholder.com/300x200"}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          ${product.price}
        </div>
      </div>
      
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {product.title}
      </h2>

      {product.description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
      )}

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add to Cart
      </button>
    </div>
  );
}