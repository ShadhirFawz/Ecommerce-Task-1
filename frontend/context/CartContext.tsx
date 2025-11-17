"use client";
import React, { createContext, useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotal: () => 0,
});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity } : p)));
  };

  const clearCart = () => setCart([]);

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = Number(item.price ?? 0);
      return sum + price * (item.quantity ?? 1);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}