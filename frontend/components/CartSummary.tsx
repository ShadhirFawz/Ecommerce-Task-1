"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

export default function CartSummary() {
  const { cart, getTotal } = useContext(CartContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = getTotal();

  // Show/hide cart summary based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-hide cart summary after adding items
  useEffect(() => {
    if (itemCount > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [itemCount, cart]);

  if (itemCount === 0 && !isScrolled) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Link href="/cart">
          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {itemCount > 0 && (
              <>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-semibold animate-pulse">
                  {itemCount}
                </span>
                <span className="text-sm font-semibold ml-1">${total.toFixed(2)}</span>
              </>
            )}
            
            <span className="sr-only">View Cart</span>
          </button>
        </Link>
      </div>

      {/* Cart Notification Toast */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-semibold">Item added to cart!</p>
            <p className="text-sm opacity-90">{itemCount} items • ${total.toFixed(2)}</p>
          </div>
          <Link href="/cart">
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors ml-2">
              View
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}