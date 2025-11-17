"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  const { cart, getTotal } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-blue-200 dark:bg-gray-900 shadow-md py-4 mb-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        <Link
          href="/cart"
          className="flex items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          🛒 Cart
          <span className="bg-white text-blue-600 font-semibold px-2 py-1 rounded">
            {totalItems}
          </span>
          <span className="bg-white text-blue-600 font-semibold px-2 py-1 rounded">
            ${getTotal().toFixed(2)}
          </span>
        </Link>
      </div>
    </nav>
  );
}
