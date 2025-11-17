"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

interface StickyHeaderProps {
  productsCount: number;
}

export default function StickyHeader({ productsCount }: StickyHeaderProps) {
  const { cart } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isScrolled) return null;

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>🛍️</span>
              Store
            </Link>
            <span className="text-gray-500 dark:text-gray-400">|</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {productsCount} products
            </span>
          </div>
          
          <Link href="/cart">
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
              {itemCount > 0 && (
                <span className="bg-white text-blue-600 rounded-full w-6 h-6 text-xs flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}