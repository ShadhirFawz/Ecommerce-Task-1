"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    if (!user) {
      setMessage("Please log in to complete your order.");
      return;
    }
    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            total: getTotal(),
          },
        ])
        .select()
        .single();

      if (orderError || !order) throw orderError;

      // Insert order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemError) throw itemError;

      // Clear cart
      clearCart();

      setMessage("✅ Order placed successfully!");
      setTimeout(() => router.push("/"), 2000);
    } catch (err: any) {
      console.error("Checkout Error:", JSON.stringify(err, null, 2));
      setMessage("❌ Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Checkout
          </h1>

          {cart.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              Your cart is empty.
            </p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-4">
                <span className="text-gray-900 dark:text-white">Total:</span>
                <span className="text-2xl text-blue-600 dark:text-blue-400">
                  ${getTotal().toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full mt-6 py-3 rounded-lg font-semibold text-white cursor-pointer transition-all"
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>

              {message && (
                <p
                  className={`mt-4 text-center ${
                    message.startsWith("✅")
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}